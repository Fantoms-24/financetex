import { createServerFn } from '@tanstack/react-start'
import { newId, q, q1 } from '../db'
import { guarded } from '../session'

export interface UserGoal {
  id: string
  title: string
  amount: number
  collected: number
  icon: string
  color: string
  target_date: string | null
  completed_at: string | null
  created_at: string
}

export interface UserGoalDeposit {
  id: string
  goal_id: string
  amount: number
  note: string | null
  created_at: string
}

export const listGoals = createServerFn({ method: 'GET' }).handler(async () =>
  guarded(async (user) => {
    const rows = await q<any>(
      `SELECT id, title, amount, collected, icon, color,
              target_date::text AS target_date,
              completed_at::text AS completed_at,
              created_at::text AS created_at
         FROM user_goals
        WHERE user_id = $1
        ORDER BY completed_at NULLS FIRST, created_at DESC`,
      [user.id],
    )
    return {
      goals: (rows ?? []).map((r) => ({
        ...r,
        amount: Number(r.amount || 0),
        collected: Number(r.collected || 0),
      })),
    }
  }),
)

export const createGoal = createServerFn({ method: 'POST' })
  .validator((d: { title: string; amount: number | string; icon?: string; color?: string; targetDate?: string | null }) => ({
    title: String(d.title || '').trim() || 'Копилка',
    amount: Math.round(Number(d.amount || 0)),
    icon: String(d.icon || 'target').trim(),
    color: String(d.color || '#3d5c4a').trim(),
    targetDate: d.targetDate ? String(d.targetDate).trim() : null,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.title || data.amount <= 0) {
        return { ok: false, error: 'Укажите название и целевую сумму' }
      }
      const id = newId('g')
      await q(
        `INSERT INTO user_goals (id, user_id, title, amount, collected, icon, color, target_date)
         VALUES ($1, $2, $3, $4, 0, $5, $6, $7::date)`,
        [id, user.id, data.title, data.amount, data.icon, data.color, data.targetDate],
      )
      return { ok: true, id }
    }),
  )

export const depositToGoal = createServerFn({ method: 'POST' })
  .validator((d: { goalId: string; amount: number | string; note?: string; recordExpense?: boolean }) => ({
    goalId: String(d.goalId),
    amount: Math.round(Number(d.amount || 0)),
    note: d.note ? String(d.note).trim() : null,
    recordExpense: Boolean(d.recordExpense),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (data.amount <= 0) {
        return { ok: false, error: 'Сумма пополнения должна быть больше 0' }
      }

      const goal = await q1<any>(
        `SELECT id, title, amount, collected FROM user_goals WHERE id = $1 AND user_id = $2`,
        [data.goalId, user.id],
      )
      if (!goal) return { ok: false, error: 'Цель не найдена' }

      const depId = newId('gd')
      await q(
        `INSERT INTO user_goal_deposits (id, goal_id, user_id, amount, note)
         VALUES ($1, $2, $3, $4, $5)`,
        [depId, data.goalId, user.id, data.amount, data.note],
      )

      const nextCollected = Number(goal.collected || 0) + data.amount
      const isCompleted = nextCollected >= Number(goal.amount || 0)

      await q(
        `UPDATE user_goals
            SET collected = $1,
                completed_at = CASE WHEN $2 THEN coalesce(completed_at, now()) ELSE NULL END
          WHERE id = $3 AND user_id = $4`,
        [nextCollected, isCompleted, data.goalId, user.id],
      )

      // Опционально записать в чеки как расход месяца
      if (data.recordExpense) {
        const recId = newId('r')
        await q(
          `INSERT INTO receipts (id, user_id, store, total, category, note)
           VALUES ($1, $2, $3, $4, 'other', $5)`,
          [recId, user.id, `В копилку: ${goal.title}`, data.amount, data.note || 'Отложено в цель'],
        )
      }

      return { ok: true, collected: nextCollected, completed: isCompleted }
    }),
  )

export const deleteGoal = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => ({ id: String(d.id) }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      await q(`DELETE FROM user_goals WHERE id = $1 AND user_id = $2`, [data.id, user.id])
      return { ok: true }
    }),
  )
