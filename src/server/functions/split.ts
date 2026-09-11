import { createServerFn } from '@tanstack/react-start'
import { createHash, randomBytes } from 'node:crypto'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { getSessionUser } from '../session'
import { q, transaction } from '../db'
import { guarded } from '../session'
import { q1 } from '../db'
import {
  createSplitSession,
  getSplitData,
  joinSplitMember,
  toggleItemClaim,
  toggleItemShared,
  setMemberPaidStatus,
  addCustomItemToSplit,
  type SplitPublicData,
  type SplitItemInput,
} from '../split'

async function authorize(code:string,memberId?:string,itemId?:string) {
 const split=await q1<any>('SELECT id,user_id FROM receipt_splits WHERE code=$1',[code])
 if(!split)throw new Error('Счёт не найден')
 if(itemId&&!await q1('SELECT id FROM receipt_split_items WHERE id=$1 AND split_id=$2',[itemId,split.id]))throw new Error('Позиция не найдена')
 if(memberId&&!await q1('SELECT id FROM receipt_split_members WHERE id=$1 AND split_id=$2',[memberId,split.id]))throw new Error('Участник не найден')
 const user=await getSessionUser()
 if(user?.id===split.user_id)return
 if(!memberId)throw new Error('Это действие доступно организатору')
 const token=getCookie('listok-split-'+memberId)
 const row=token&&await q1<any>('SELECT token_hash FROM split_access WHERE split_id=$1 AND member_id=$2',[split.id,memberId])
 if(!row||createHash('sha256').update(token!).digest('hex')!==row.token_hash)throw new Error('Вы можете менять только свои позиции. Присоединитесь к счёту под своим именем.')
}
async function safePublic<T>(fn:()=>Promise<T>){try{return await fn()}catch(e:any){return {ok:false as const,error:e.message||'Не удалось сохранить'}}}

export type { SplitPublicData, SplitItemInput }

/**
 * Создание новой сессии разделения счёта (требует авторизации организатора)
 */
export const createSplit = createServerFn({ method: 'POST' })
  .validator(
    (d: {
      receiptId?: string | null
      title: string
      total: number
      tipPercent?: number
      organizerName: string
      organizerPhone?: string | null
      organizerBank?: string | null
      items?: SplitItemInput[]
    }) => ({
      receiptId: d.receiptId ? String(d.receiptId).trim() : null,
      title: String(d.title || 'Счёт в заведении').trim(),
      total: Math.max(0, Math.round(Number(d.total || 0))),
      tipPercent: Math.max(0, Math.min(100, Math.round(Number(d.tipPercent || 0)))),
      organizerName: String(d.organizerName || 'Организатор').trim(),
      organizerPhone: d.organizerPhone ? String(d.organizerPhone).trim() : null,
      organizerBank: d.organizerBank ? String(d.organizerBank).trim() : null,
      items: Array.isArray(d.items) ? d.items : undefined,
    }),
  )
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if(data.receiptId&&!await q1('SELECT id FROM receipts WHERE id=$1 AND user_id=$2 AND deleted_at IS NULL',[data.receiptId,user.id]))throw new Error('Чек не найден')
      const res = await createSplitSession({
        ...data,
        userId: user.id,
      })
      return { ok: true, id: res.id, code: res.code }
    }),
  )

/**
 * Публичное получение данных сплита по коду (доступно без авторизации)
 */
export const getSplitPublic = createServerFn({ method: 'GET' })
  .validator((d: { code: string }) => ({
    code: String(d.code || '').trim().toLowerCase(),
  }))
  .handler(async ({ data }) => {
    if (!data.code) return { data: null }
    const res = await getSplitData(data.code)
    if(res){
      const split=await q1<any>('SELECT user_id FROM receipt_splits WHERE id=$1',[res.split.id])
      const user=await getSessionUser()
      res.viewer_is_owner=user?.id===split?.user_id
      res.viewer_member_ids=[]
      for(const member of res.members){
        try{await authorize(data.code,member.id);res.viewer_member_ids.push(member.id)}catch{}
      }
    }
    return { data: res }
  })

/**
 * Публичное присоединение участника к сплиту по имени (доступно без авторизации)
 */
export const joinSplit = createServerFn({ method: 'POST' })
  .validator((d: { code: string; name: string }) => ({
    code: String(d.code || '').trim().toLowerCase(),
    name: String(d.name || '').trim(),
  }))
  .handler(async ({ data }) => {
    return safePublic(()=>transaction(async()=>{
      const split=await q1<any>('SELECT id FROM receipt_splits WHERE code=$1 FOR UPDATE',[data.code])
      if(!split)throw new Error('Счёт не найден')
      const existing=await q1<any>('SELECT id FROM receipt_split_members WHERE split_id=$1 AND lower(name)=lower($2)',[split.id,data.name])
      if(existing){await authorize(data.code,existing.id);return {ok:true,memberId:existing.id}}
      const res=await joinSplitMember(data.code,data.name.slice(0,80))
      if(res.memberId){
        const token=randomBytes(32).toString('hex')
        await q('INSERT INTO split_access (split_id,member_id,token_hash) VALUES ($1,$2,$3)',[split.id,res.memberId,createHash('sha256').update(token).digest('hex')])
        setCookie('listok-split-'+res.memberId,token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30})
      }
      return res
    }))
  })

/**
 * Публичный выбор или отмена выбора позиции (доступно без авторизации)
 */
export const claimSplitItem = createServerFn({ method: 'POST' })
  .validator((d: { code: string; memberId: string; itemId: string; claimed: boolean }) => ({
    code: String(d.code || '').trim().toLowerCase(),
    memberId: String(d.memberId || '').trim(),
    itemId: String(d.itemId || '').trim(),
    claimed: Boolean(d.claimed),
  }))
  .handler(async ({ data }) => {
    return safePublic(async()=>{await authorize(data.code,data.memberId,data.itemId)
    const res = await toggleItemClaim(data.code, data.memberId, data.itemId, data.claimed)
    return res
    })
  })

/**
 * Переключение статуса позиции «Общее (на всех)» (доступно без авторизации)
 */
export const toggleSplitShared = createServerFn({ method: 'POST' })
  .validator((d: { code: string; itemId: string; isShared: boolean }) => ({
    code: String(d.code || '').trim().toLowerCase(),
    itemId: String(d.itemId || '').trim(),
    isShared: Boolean(d.isShared),
  }))
  .handler(async ({ data }) => {
    return safePublic(async()=>{await authorize(data.code,undefined,data.itemId)
    const res = await toggleItemShared(data.code, data.itemId, data.isShared)
    return res
    })
  })

/**
 * Отметка об оплате участником (доступно без авторизации)
 */
export const markMemberPaid = createServerFn({ method: 'POST' })
  .validator((d: { code: string; memberId: string; paid: boolean }) => ({
    code: String(d.code || '').trim().toLowerCase(),
    memberId: String(d.memberId || '').trim(),
    paid: Boolean(d.paid),
  }))
  .handler(async ({ data }) => {
    return safePublic(async()=>{await authorize(data.code,data.memberId)
    const res = await setMemberPaidStatus(data.code, data.memberId, data.paid)
    return res
    })
  })

/**
 * Добавление новой произвольной позиции прямо в процессе разделения
 */
export const addSplitItem = createServerFn({ method: 'POST' })
  .validator((d: { code: string; name: string; price: number; isShared?: boolean }) => ({
    code: String(d.code || '').trim().toLowerCase(),
    name: String(d.name || '').trim(),
    price: Math.max(0, Math.round(Number(d.price || 0))),
    isShared: Boolean(d.isShared),
  }))
  .handler(async ({ data }) => {
    return safePublic(async()=>{await authorize(data.code)
    const res = await addCustomItemToSplit(data.code, data.name, data.price, data.isShared)
    return res
    })
  })

/**
 * Получение профильных данных организатора (имя, телефон, банк)
 */
export const getOrganizerDefaults = createServerFn({ method: 'GET' }).handler(async () =>
  guarded(async (user) => {
    const profile = await q1<any>(
      `SELECT display_name, phone, bank FROM profiles WHERE user_id = $1`,
      [user.id],
    )
    return {
      name: profile?.display_name || user.displayName || user.name || 'Организатор',
      phone: profile?.phone || '',
      bank: profile?.bank || 'Т-Банк',
    }
  }),
)
