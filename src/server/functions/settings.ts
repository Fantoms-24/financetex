import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q } from '../db'

export const saveSettings = createServerFn({ method: 'POST' })
  .validator((d: { monthly_budget?: number | string; monthly_income?: number | string; allocations?: any }) => ({
    monthly_budget: d.monthly_budget === undefined ? undefined : Math.round(Math.max(0, Number(d.monthly_budget))),
    monthly_income: d.monthly_income === undefined ? undefined : Math.round(Math.max(0, Number(d.monthly_income))),
    allocations: d.allocations,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    for(const amount of [data.monthly_budget,data.monthly_income])if(amount!==undefined&&(!Number.isFinite(amount)||amount<0||amount>100000000))throw new Error('Проверьте сумму: от 0 до 100 000 000 ₽')
    if (data.monthly_budget !== undefined) {
      await q(
        `INSERT INTO user_settings (user_id, monthly_budget, seen_welcome) VALUES ($1, $2, true)
         ON CONFLICT (user_id) DO UPDATE SET monthly_budget = EXCLUDED.monthly_budget, seen_welcome = true, updated_at = now()`,
        [user.id, data.monthly_budget]
      )
    }
    if (data.monthly_income !== undefined) {
      await q(
        `INSERT INTO user_settings (user_id, monthly_income) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET monthly_income = EXCLUDED.monthly_income, updated_at = now()`,
        [user.id, data.monthly_income]
      )
    }
    if (data.allocations) {
      await q(
        `INSERT INTO user_settings (user_id, allocations) VALUES ($1, $2::jsonb)
         ON CONFLICT (user_id) DO UPDATE SET allocations = EXCLUDED.allocations, updated_at = now()`,
        [user.id, JSON.stringify(data.allocations)]
      )
    }
    return { ok: true }
  }))

/** Отмечает короткую стартовую настройку завершённой, даже если пользователь пропустил все поля. */
export const completeOnboarding = createServerFn({ method: 'POST' })
  .handler(async () => guarded(async (user) => {
    await q(
      `INSERT INTO user_settings (user_id, onboarding_completed) VALUES ($1, true)
       ON CONFLICT (user_id) DO UPDATE SET onboarding_completed = true, updated_at = now()`,
      [user.id],
    )
    return { ok: true }
  }))

export const saveProfile = createServerFn({ method: 'POST' })
  .validator((d: { display_name?: string; phone?: string; bank?: string }) => ({
    display_name: d.display_name === undefined ? undefined : String(d.display_name).trim(),
    phone: d.phone === undefined ? undefined : String(d.phone).trim(),
    bank: d.bank === undefined ? undefined : String(d.bank).trim(),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    const sets: string[] = []
    const params: any[] = [user.id]
    let i = 2
    if (data.display_name !== undefined) {
      sets.push(`display_name = $${i++}`)
      params.push(data.display_name || null)
    }
    if (data.phone !== undefined) {
      sets.push(`phone = $${i++}`)
      params.push(data.phone || null)
    }
    if (data.bank !== undefined) {
      sets.push(`bank = $${i++}`)
      params.push(data.bank || null)
    }
    if (!sets.length) return { ok: true }
    await q(`UPDATE profiles SET ${sets.join(', ')} WHERE user_id = $1`, params)
    return { ok: true }
  }))
