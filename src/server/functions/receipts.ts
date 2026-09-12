import { createServerFn } from '@tanstack/react-start'
import { createHash } from 'node:crypto'
import { guarded } from '../session'
import { q, q1, newId, transaction } from '../db'
import { requireHouseMember, positiveAmount, validDate } from '../access'
import { notifyHouseExcept } from '../push'
import { CATEGORIES } from '~/lib/format'

type ReceiptInput = {
  id?: string; store?: string; total?: number | string; note?: string; category?: string;
  purchased_at?: string | null; houseId?: string | null; requestId?: string;
  image?: string | null; items?: Array<{name: string; qty?: number | null; price: number; category?: string}>
}
const categoryOf = (value?: string) => CATEGORIES.some(c => c.id === value) ? value! : 'other'

export const addReceipt = createServerFn({ method: 'POST' }).validator((data: ReceiptInput) => data)
  .handler(async ({ data }) => guarded(async user => transaction(async () => {
    await requireHouseMember(data.houseId, user.id)
    const amount = positiveAmount(data.total)
    const date = validDate(data.purchased_at)
    if (data.image && (!data.image.startsWith('data:image/') || data.image.length > 7000000)) throw new Error('Фото слишком большое или не поддерживается')
    const source = data.image ? 'scan:' + createHash('sha256').update(data.image).digest('hex') : data.requestId ? 'manual:' + data.requestId : null
    // Serialize retries for this user so uncertain network responses cannot create duplicates.
    await q('SELECT user_id FROM profiles WHERE user_id = $1 FOR UPDATE', [user.id])
    if (source) {
      const existing = await q1<any>('SELECT id,deleted_at FROM receipts WHERE user_id = $1 AND source_key = $2', [user.id, source])
      if (existing) {
        if(existing.deleted_at)await q('UPDATE receipts SET deleted_at=NULL WHERE id=$1',[existing.id])
        return { ok: true, id: existing.id, duplicate: !existing.deleted_at, restored:!!existing.deleted_at }
      }
    }
    const id = newId('r')
    await q(`INSERT INTO receipts (id,user_id,store,purchased_at,total,category,note,house_id,source_key,image)
      VALUES ($1,$2,$3,coalesce($4::date,current_date),$5,$6,$7,$8,$9,$10)`,
      [id,user.id,String(data.store || '').trim().slice(0,200) || 'Покупка',date,amount,categoryOf(data.category),
        String(data.note || '').trim().slice(0,2000) || null,data.houseId || null,source,data.image || null])
    for (const item of (data.items || []).slice(0,200)) {
      const price = Number(item.price)
      if (!Number.isFinite(price) || price < 0) throw new Error('Проверьте суммы позиций чека')
      await q('INSERT INTO receipt_items (id,receipt_id,name,qty,price,category) VALUES ($1,$2,$3,$4,$5,$6)',
        [newId('ri'),id,String(item.name).slice(0,200),Math.max(0.001,Number(item.qty) || 1),Math.round(price),categoryOf(item.category)])
    }
    if (data.houseId) {
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      const uName = user.displayName || user.name || 'Участник'
      const storeName = String(data.store || '').trim().slice(0, 200) || 'Покупка'
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Вместе',
        body: `${uName} добавил(а) чек: ${storeName} (${Number(amount).toLocaleString('ru-RU')} ₽)`,
        data: { url: `/groups/${data.houseId}`, type: 'house-receipt' },
      }).catch(() => {})
    }
    return { ok: true, id }
  })))

export const updateReceipt = createServerFn({ method: 'POST' }).validator((data: ReceiptInput & {id:string}) => data)
  .handler(async ({data}) => guarded(async user => {
    await requireHouseMember(data.houseId,user.id)
    const receipt = await q1<any>('SELECT source_key FROM receipts WHERE id=$1 AND user_id=$2 AND deleted_at IS NULL',[data.id,user.id])
    if (!receipt) throw new Error('Покупка не найдена')
    if(await q1('SELECT bill_id FROM bill_pays WHERE receipt_id=$1',[data.id]))throw new Error('Этот расход связан с платежом. Сначала отмените отметку оплаты в «Плане».')
    if (/^(bill|goal):/.test(receipt.source_key || '')) throw new Error('Эта операция связана с планом. Измените её в платежах или истории цели.')
    await q('UPDATE receipts SET store=$1,total=$2,category=$3,note=$4,purchased_at=coalesce($5::date,current_date),house_id=$6 WHERE id=$7 AND user_id=$8',
      [String(data.store || '').trim() || 'Покупка',positiveAmount(data.total),categoryOf(data.category),data.note || null,validDate(data.purchased_at),data.houseId || null,data.id,user.id])
    return {ok:true}
  }))

export const setReceiptHouse = createServerFn({method:'POST'}).validator((d:{id:string;houseId?:string|null})=>d)
 .handler(async({data})=>guarded(async user=>{
   await requireHouseMember(data.houseId,user.id)
   await q('UPDATE receipts SET house_id=$1 WHERE id=$2 AND user_id=$3 AND deleted_at IS NULL AND (source_key IS NULL OR source_key NOT LIKE $4 AND source_key NOT LIKE $5)',[data.houseId||null,data.id,user.id,'bill:%','goal:%'])
   if (data.houseId) {
     const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
     const r = await q1<{ store: string; total: number }>(`SELECT store, total FROM receipts WHERE id = $1`, [data.id])
     const uName = user.displayName || user.name || 'Участник'
     const amtStr = r?.total ? ` (${Number(r.total).toLocaleString('ru-RU')} ₽)` : ''
     await notifyHouseExcept(data.houseId, user.id, {
       title: house?.name || 'Вместе',
       body: `${uName} прикрепил(а) чек: ${r?.store || 'Покупка'}${amtStr}`,
       data: { url: `/groups/${data.houseId}`, type: 'house-receipt' },
     }).catch(() => {})
   }
   return {ok:true}
 }))

export const deleteReceipt = createServerFn({method:'POST'}).validator((d:{id:string})=>d)
 .handler(async({data})=>guarded(async user=>{
   const r=await q1<any>('SELECT house_id, store, source_key FROM receipts WHERE id=$1 AND user_id=$2',[data.id,user.id])
   if(await q1('SELECT bill_id FROM bill_pays WHERE receipt_id=$1',[data.id]))throw new Error('Сначала отмените отметку оплаты в «Плане»')
   if (/^(bill|goal):/.test(r?.source_key || '')) throw new Error('Отмените платёж или взнос в разделе «План», чтобы сохранить правильный остаток.')
   await q('UPDATE receipts SET deleted_at=now() WHERE id=$1 AND user_id=$2',[data.id,user.id])
   if (r?.house_id) {
     const house = await q1<{ name: string }>('SELECT name FROM houses WHERE id = $1', [r.house_id])
     const uName = user.displayName || user.name || 'Участник'
     await notifyHouseExcept(r.house_id, user.id, {
       title: house?.name || 'Вместе',
       body: `${uName} удалил(а) чек «${r.store || 'Покупка'}»`,
       data: { url: `/groups/${r.house_id}`, type: 'house-receipt' },
     }).catch(() => {})
   }
   return {ok:true}
 }))
export const restoreReceipt = createServerFn({method:'POST'}).validator((d:{id:string})=>d)
 .handler(async({data})=>guarded(async user=>{
   const r=await q1<any>('SELECT house_id FROM receipts WHERE id=$1 AND user_id=$2',[data.id,user.id])
   if(!r)throw new Error('Покупка не найдена')
   await requireHouseMember(r.house_id,user.id)
   await q('UPDATE receipts SET deleted_at=NULL WHERE id=$1 AND user_id=$2',[data.id,user.id])
   return {ok:true}
 }))

export const getReceipt = createServerFn({method:'GET'}).validator((d:{id:string})=>d)
 .handler(async({data})=>guarded(async user=>{
   const r=await q1<any>(`SELECT r.*,r.purchased_at::text AS purchased_at,h.name AS house_name FROM receipts r LEFT JOIN houses h ON h.id=r.house_id
     WHERE r.id=$1 AND r.deleted_at IS NULL AND (r.user_id=$2 OR EXISTS(SELECT 1 FROM house_members WHERE house_id=r.house_id AND user_id=$2))`,[data.id,user.id])
   if(!r)return {receipt:null,items:[]}
   const items=await q<any>('SELECT id,name,qty,price,category FROM receipt_items WHERE receipt_id=$1',[data.id])
   return {receipt:{...r,total:Number(r.total),purchased_at:r.purchased_at?.slice(0,10)||null},items:items.map(i=>({...i,price:Number(i.price),qty:Number(i.qty)||1}))}
 }))

type HistoryInput={total?:number;limit?:number;offset?:number;from?:string;to?:string;search?:string;category?:string;houseId?:string}
export const listReceipts = createServerFn({method:'GET'}).validator((d?:HistoryInput)=>d||{})
 .handler(async({data})=>guarded(async user=>{
   const limit=Math.min(300,Math.max(1,Number(data.limit)||120))
   const offset=Math.max(0,Number(data.offset)||0)
   const params:any[]=[user.id]
   const where=['r.user_id=$1','r.deleted_at IS NULL']
   const add=(clause:string,value:any)=>{params.push(value);where.push(clause.replace('?', '$'+params.length))}
   if(data.total!==undefined)add('r.total=?',positiveAmount(data.total))
   if(data.from)add('coalesce(r.purchased_at,r.created_at::date)>=?::date',validDate(data.from))
   if(data.to)add('coalesce(r.purchased_at,r.created_at::date)<=?::date',validDate(data.to))
   if(data.search)add("(coalesce(r.store,'') || ' ' || coalesce(r.note,'')) ILIKE ?",'%'+data.search+'%')
   if(data.category && data.category!=='all')add('r.category=?',data.category)
   if(data.houseId==='personal')where.push('r.house_id IS NULL')
   else if(data.houseId && data.houseId!=='all')add('r.house_id=?',data.houseId)
   const condition=where.join(' AND ')
   const stats=await q1<any>('SELECT coalesce(sum(r.total),0) AS total,count(*) AS count FROM receipts r WHERE '+condition,params)
   const categories=await q<any>('SELECT r.category,coalesce(sum(r.total),0) AS total FROM receipts r WHERE '+condition+' GROUP BY r.category ORDER BY total DESC',params)
   const rows=await q<any>(`SELECT r.id,r.store,coalesce(r.purchased_at,r.created_at::date)::text AS purchased_at,r.total,r.category,r.note,r.verdict,r.source_key,r.house_id,r.created_at,h.name AS house_name
     FROM receipts r LEFT JOIN houses h ON h.id=r.house_id WHERE ${condition}
     ORDER BY coalesce(r.purchased_at,r.created_at::date) DESC,r.created_at DESC,r.id DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`,[...params,limit,offset])
   return {receipts:rows.map(r=>({...r,total:Number(r.total),purchased_at:r.purchased_at?.slice(0,10)})),total:Number(stats?.total||0),count:Number(stats?.count||0),
     categories:categories.map(c=>({...c,total:Number(c.total)})),hasMore:offset+rows.length<Number(stats?.count||0)}
 }))
