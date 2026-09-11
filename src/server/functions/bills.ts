import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, q1, newId, transaction } from '../db'
import { monthKey } from '~/lib/format'

async function listFor(userId: string) {
  const rows = await q<any>(
    `SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, b.paused, p.cycle AS paid_cycle
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
    paused: !!b.paused,
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
    if (!Number.isFinite(data.amount) || data.amount <= 0 || data.amount > 100000000) return { error: 'Проверьте сумму платежа' }
    await q(
      `INSERT INTO recurring_bills (id, user_id, title, amount, day_of_month, notify)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newId('b'), user.id, data.title, data.amount, data.day_of_month, data.notify]
    )
    return { bills: await listFor(user.id) }
  }))

export const setBillPaid = createServerFn({ method: 'POST' })
  .validator((d: { billId: string; paid: boolean; receiptId?: string }) => ({
    billId: String(d.billId),
    paid: !!d.paid,
    receiptId:d.receiptId||null,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await transaction(async () => {
      const bill = await q1<any>('SELECT * FROM recurring_bills WHERE id = $1 AND user_id = $2 FOR UPDATE', [data.billId, user.id])
      if (!bill) throw new Error('Платёж не найден')
      if(bill.paused&&data.paid)throw new Error('Сначала возобновите платёж')
      const cycle = monthKey()
      const source = `bill:${data.billId}:${cycle}`
      const paid=await q1<any>('SELECT receipt_id,receipt_created FROM bill_pays WHERE bill_id=$1 AND cycle=$2 AND user_id=$3',[bill.id,cycle,user.id])
      if (data.paid) {
        if(paid)return
        if(data.receiptId){
          const existing=await q1<any>(`SELECT id FROM receipts WHERE id=$1 AND user_id=$2 AND deleted_at IS NULL
            AND total=$3 AND coalesce(purchased_at,created_at::date)>=($4||'-01')::date
            AND coalesce(purchased_at,created_at::date)<($4||'-01')::date+interval '1 month'
            AND (source_key IS NULL OR source_key NOT LIKE 'bill:%' AND source_key NOT LIKE 'goal:%') FOR UPDATE`,[data.receiptId,user.id,bill.amount,cycle])
          if(!existing)throw new Error('Выберите расход за этот месяц с такой же суммой')
          if(await q1('SELECT bill_id FROM bill_pays WHERE receipt_id=$1',[existing.id]))throw new Error('Этот расход уже связан с другим платежом')
          await q('INSERT INTO bill_pays(bill_id,cycle,user_id,receipt_id,receipt_created) VALUES ($1,$2,$3,$4,false)',[bill.id,cycle,user.id,existing.id])
        }else{
          const receipt=await q1<any>(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note, source_key)
            VALUES ($1,$2,$3,current_date,$4,'household','Регулярный платёж',$5)
            ON CONFLICT(user_id,source_key) WHERE source_key IS NOT NULL DO UPDATE SET deleted_at=NULL RETURNING id`,
            [newId('r'),user.id,bill.title,bill.amount,source])
          await q('INSERT INTO bill_pays(bill_id,cycle,user_id,receipt_id,receipt_created) VALUES ($1,$2,$3,$4,true)',[bill.id,cycle,user.id,receipt.id])
        }
      } else {
        await q('DELETE FROM bill_pays WHERE bill_id = $1 AND cycle = $2 AND user_id = $3', [bill.id, cycle, user.id])
        if(paid?.receipt_created||!paid?.receipt_id)await q('UPDATE receipts SET deleted_at=now() WHERE user_id=$1 AND source_key=$2',[user.id,source])
      }
    })
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
  .handler(async ({ data }) => guarded(async (user) => transaction(async()=>{
    await q("UPDATE receipts SET source_key='archived-'||source_key WHERE user_id=$1 AND source_key LIKE $2",[user.id,'bill:'+data.billId+':%'])
    await q(`DELETE FROM bill_pays WHERE bill_id = $1 AND user_id = $2`, [data.billId, user.id])
    await q(`DELETE FROM recurring_bills WHERE id = $1 AND user_id = $2`, [data.billId, user.id])
    return { bills: await listFor(user.id) }
  })))

export const updateBill = createServerFn({ method: 'POST' })
  .validator((d: { id: string; title: string; amount: number; day_of_month: number; paused?: boolean }) => d)
  .handler(async ({ data }) => guarded(async user => {
    if (!data.title.trim() || !Number.isFinite(data.amount) || data.amount < 1 || data.amount > 100000000 || !Number.isInteger(data.day_of_month) || data.day_of_month < 1 || data.day_of_month > 31) throw new Error('Проверьте название, сумму и день платежа')
    const paid=await q1<any>('SELECT b.amount FROM recurring_bills b JOIN bill_pays p ON p.bill_id=b.id AND p.user_id=b.user_id AND p.cycle=$3 WHERE b.id=$1 AND b.user_id=$2',[data.id,user.id,monthKey()])
    if(paid&&Number(paid.amount)!==Math.round(data.amount))throw new Error('Сначала отмените отметку оплаты, затем измените сумму и отметьте оплату заново.')
    await q('UPDATE recurring_bills SET title = $1, amount = $2, day_of_month = $3, paused = $4 WHERE id = $5 AND user_id = $6',
      [data.title.trim(), Math.round(data.amount), data.day_of_month, Boolean(data.paused), data.id, user.id])
    return { bills: await listFor(user.id) }
  }))
