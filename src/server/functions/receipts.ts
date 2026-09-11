import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, q1, newId } from '../db'

export const addReceipt = createServerFn({ method: 'POST' })
  .validator((d: { store?: string; total?: number | string; note?: string; category?: string; purchased_at?: string | null; houseId?: string | null }) => ({
    store: String(d.store || '').trim() || 'Без названия',
    total: Math.round(Number(d.total || 0)),
    note: String(d.note || '').trim() || null,
    category: String(d.category || 'other'),
    purchased_at: d.purchased_at || null,
    houseId: d.houseId ? String(d.houseId).trim() : null,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    const id = newId('r')
    await q(
      `INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note, house_id)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7, $8)`,
      [id, user.id, data.store, data.purchased_at, data.total, data.category, data.note, data.houseId]
    )
    return { ok: true, id }
  }))

export const setReceiptHouse = createServerFn({ method: 'POST' })
  .validator((d: { id: string; houseId?: string | null }) => ({
    id: String(d.id),
    houseId: d.houseId ? String(d.houseId).trim() : null,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await q(`UPDATE receipts SET house_id = $1 WHERE id = $2 AND user_id = $3`, [
      data.houseId,
      data.id,
      user.id,
    ])
    return { ok: true }
  }))

export const deleteReceipt = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => ({
    id: String(d.id),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await q(`DELETE FROM receipts WHERE id = $1 AND user_id = $2`, [data.id, user.id])
    return { ok: true }
  }))

export const getReceipt = createServerFn({ method: 'GET' })
  .validator((d: { id: string }) => ({
    id: String(d.id),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    const r = await q1<any>(
      `SELECT r.id, r.store, r.purchased_at::text AS purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.id = $1 AND (r.user_id = $2 OR (r.house_id IS NOT NULL AND EXISTS (SELECT 1 FROM house_members m WHERE m.house_id = r.house_id AND m.user_id = $2)))`,
      [data.id, user.id]
    )
    if (!r) return { receipt: null, items: [] }
    const items = await q<any>(
      `SELECT id, name, qty, price, category FROM receipt_items WHERE receipt_id = $1`,
      [data.id]
    )
    return {
      receipt: {
        ...r,
        purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
        total: Number(r.total),
      },
      items: (items ?? []).map((i: any) => ({
        ...i,
        price: Number(i.price),
        qty: i.qty == null ? null : Number(i.qty),
      })),
    }
  }))

export const listReceipts = createServerFn({ method: 'GET' })
  .validator((d?: { limit?: number }) => ({
    limit: Math.min(Number(d?.limit || 120), 300),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    const rows = await q<any>(
      `SELECT r.id, r.store, r.purchased_at::text AS purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.user_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
        LIMIT $2`,
      [user.id, data.limit]
    )
    return {
      receipts: (rows ?? []).map((r: any) => ({
        ...r,
        purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
        total: Number(r.total),
      })),
    }
  }))
