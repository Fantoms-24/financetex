import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, newId } from '../db'
import { monthKey } from '~/lib/format'

async function listFor(userId: string) {
  const rows = await q<any>(
    `SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, p.cycle AS paid_cycle
       FROM recurring_bills b
       LEFT JOIN bill_pays p ON p.bill_id = b.id AND p.cycle = $2 AND p.user_id = b.user_id
      WHERE b.user_id = $1
      ORDER BY b.day_of_month`,
    [userId, monthKey()]
  )
  return (rows ?? []).map((b: any) => ({
    id: b.id,
    title: b.title,
    amount: Number(b.amount),
    day_of_month: Number(b.day_of_month),
    notify: !!b.notify,
    paid_cycle: b.paid_cycle ?? null,
  }))
}

export const listBills = createServerFn({ method: 'GET' })
  .handler(async () => guarded(async (user) => ({
    bills: await listFor(user.id),
  })))

export const addBill = createServerFn({ method: 'POST' })
  .validator((d: { title?: string; amount?: number | string; day_of_month?: number | string; notify?: boolean }) => ({
    title: String(d.title || '').trim(),
    amount: Math.round(Number(d.amount || 0)),
    day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
    notify: d.notify === undefined ? true : !!d.notify,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    if (!data.title) return { error: 'Впишите название' }
    await q(
      `INSERT INTO recurring_bills (id, user_id, title, amount, day_of_month, notify)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newId('b'), user.id, data.title, data.amount, data.day_of_month, data.notify]
    )
    return { bills: await listFor(user.id) }
  }))

export const setBillPaid = createServerFn({ method: 'POST' })
  .validator((d: { billId: string; paid: boolean }) => ({
    billId: String(d.billId),
    paid: !!d.paid,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    const cycle = monthKey()
    if (data.paid) {
      await q(
        `INSERT INTO bill_pays (bill_id, cycle, user_id) VALUES ($1, $2, $3)
         ON CONFLICT (bill_id, cycle, user_id) DO NOTHING`,
        [data.billId, cycle, user.id]
      )
    } else {
      await q(
        `DELETE FROM bill_pays WHERE bill_id = $1 AND cycle = $2 AND user_id = $3`,
        [data.billId, cycle, user.id]
      )
    }
    return { bills: await listFor(user.id) }
  }))

export const toggleBillNotify = createServerFn({ method: 'POST' })
  .validator((d: { billId: string; notify: boolean }) => ({
    billId: String(d.billId),
    notify: !!d.notify,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await q(
      `UPDATE recurring_bills SET notify = $1 WHERE id = $2 AND user_id = $3`,
      [data.notify, data.billId, user.id]
    )
    return { bills: await listFor(user.id) }
  }))

export const deleteBill = createServerFn({ method: 'POST' })
  .validator((d: { billId: string }) => ({
    billId: String(d.billId),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await q(`DELETE FROM bill_pays WHERE bill_id = $1 AND user_id = $2`, [data.billId, user.id])
    await q(`DELETE FROM recurring_bills WHERE id = $1 AND user_id = $2`, [data.billId, user.id])
    return { bills: await listFor(user.id) }
  }))
