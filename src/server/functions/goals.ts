import { createServerFn } from '@tanstack/react-start'
import { newId, q, q1, transaction } from '../db'
import { positiveAmount, validDate } from '../access'
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
      if (!data.title || !Number.isFinite(data.amount) || data.amount <= 0) {
        return { ok: false, error: 'Укажите название и целевую сумму' }
      }
      const id = newId('g')
      await q(
        `INSERT INTO user_goals (id, user_id, title, amount, collected, icon, color, target_date)
         VALUES ($1, $2, $3, $4, 0, $5, $6, $7::date)`,
        [id, user.id, data.title, data.amount, data.icon, data.color, validDate(data.targetDate)],
      )
      return { ok: true, id }
    }),
  )

export const depositToGoal = createServerFn({ method: 'POST' })
  .validator((d: { goalId: string; amount: number | string; note?: string; recordExpense?: boolean; requestId?: string }) => ({
    goalId: String(d.goalId),
    amount: Math.round(Number(d.amount || 0)),
    note: d.note ? String(d.note).trim() : null,
    recordExpense: Boolean(d.recordExpense),
    requestId: d.requestId || null,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => transaction(async () => {
      if (data.amount <= 0) {
        return { ok: false, error: 'Сумма пополнения должна быть больше 0' }
      }

      const goal = await q1<any>(
        `SELECT id, title, amount, collected FROM user_goals WHERE id = $1 AND user_id = $2 FOR UPDATE`,
        [data.goalId, user.id],
      )
      if (!goal) return { ok: false, error: 'Цель не найдена' }

      positiveAmount(data.amount)
      if (data.requestId) {
        const prior = await q1('SELECT id FROM user_goal_deposits WHERE user_id=$1 AND request_id=$2', [user.id,data.requestId])
        if (prior) return {ok:true, collected:Number(goal.collected), completed:Number(goal.collected)>=Number(goal.amount)}
      }
      const depId = newId('gd')
      await q(
        `INSERT INTO user_goal_deposits (id, goal_id, user_id, amount, note, request_id)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [depId, data.goalId, user.id, data.amount, data.note, data.requestId],
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
          `INSERT INTO receipts (id, user_id, store, total, category, note, purchased_at, source_key)
           VALUES ($1, $2, $3, $4, 'other', $5, current_date, $6)`,
          [recId, user.id, `В копилку: ${goal.title}`, data.amount, data.note || 'Отложено в цель', 'goal:' + depId],
        )
      }

      return { ok: true, collected: nextCollected, completed: isCompleted }
    })),
  )

export const deleteGoal = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => ({ id: String(d.id) }))
  .handler(async ({ data }) =>
    guarded(async (user) => transaction(async()=>{
      await q("UPDATE receipts SET source_key='archived-'||source_key WHERE user_id=$1 AND source_key IN (SELECT 'goal:'||id FROM user_goal_deposits WHERE goal_id=$2 AND user_id=$1)",[user.id,data.id])
      await q(`DELETE FROM user_goals WHERE id = $1 AND user_id = $2`, [data.id, user.id])
      return { ok: true }
    })),
  )

export const goalHistory = createServerFn({method:'GET'}).validator((d:{goalId:string})=>d)
.handler(async({data})=>guarded(async user=>{
  const goal=await q1('SELECT id FROM user_goals WHERE id=$1 AND user_id=$2',[data.goalId,user.id])
  if(!goal)throw new Error('Цель не найдена')
  return {deposits:await q<any>('SELECT id,amount,note,created_at::text,reversed_at::text FROM user_goal_deposits WHERE goal_id=$1 AND user_id=$2 ORDER BY created_at DESC',[data.goalId,user.id])}
}))
export const reverseGoalDeposit = createServerFn({method:'POST'}).validator((d:{id:string})=>d)
.handler(async({data})=>guarded(async user=>transaction(async()=>{
  const dep=await q1<any>('SELECT * FROM user_goal_deposits WHERE id=$1 AND user_id=$2 FOR UPDATE',[data.id,user.id])
  if(!dep)throw new Error('Взнос не найден')
  if(dep.reversed_at)return {ok:true}
  await q('UPDATE user_goals SET collected=greatest(0,collected-$1),completed_at=NULL WHERE id=$2 AND user_id=$3',[dep.amount,dep.goal_id,user.id])
  await q('UPDATE user_goal_deposits SET reversed_at=now() WHERE id=$1',[dep.id])
  await q('UPDATE receipts SET deleted_at=now() WHERE source_key=$1 AND user_id=$2',['goal:'+dep.id,user.id])
  return {ok:true}
})))
