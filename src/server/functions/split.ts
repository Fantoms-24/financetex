import { createServerFn } from '@tanstack/react-start'
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
    const res = await joinSplitMember(data.code, data.name)
    return res
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
    const res = await toggleItemClaim(data.code, data.memberId, data.itemId, data.claimed)
    return res
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
    const res = await toggleItemShared(data.code, data.itemId, data.isShared)
    return res
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
    const res = await setMemberPaidStatus(data.code, data.memberId, data.paid)
    return res
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
    const res = await addCustomItemToSplit(data.code, data.name, data.price, data.isShared)
    return res
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
