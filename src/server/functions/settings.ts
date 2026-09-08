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
    if (data.monthly_budget !== undefined) {
      await q(
        `INSERT INTO user_settings (user_id, monthly_budget) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET monthly_budget = EXCLUDED.monthly_budget, updated_at = now()`,
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
