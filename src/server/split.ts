import { randomBytes } from 'node:crypto'
import { newId, q, q1 } from './db'

export interface SplitItemInput {
  name: string
  qty?: number
  price: number
  isShared?: boolean
}

export interface CreateSplitParams {
  receiptId?: string | null
  userId: string
  title: string
  total: number
  tipPercent?: number
  organizerName: string
  organizerPhone?: string | null
  organizerBank?: string | null
  items?: SplitItemInput[]
}

function generateSplitCode(): string {
  return randomBytes(18).toString('base64url').toLowerCase()
}

export async function createSplitSession(params: CreateSplitParams): Promise<{ id: string; code: string }> {
  const id = newId('split')
  let code = generateSplitCode()

  // Гарантируем уникальность кода
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await q1<any>(`SELECT id FROM receipt_splits WHERE code = $1`, [code])
    if (!existing) break
    code = generateSplitCode()
  }

  const tipPercent = Math.max(0, Math.min(100, Math.round(Number(params.tipPercent || 0))))
  const baseTotal = Math.max(0, Math.round(Number(params.total || 0)))
  const tipAmount = Math.round((baseTotal * tipPercent) / 100)

  await q(
    `INSERT INTO receipt_splits (
       id, code, receipt_id, user_id, title, total, tip_percent, tip_amount,
       organizer_name, organizer_phone, organizer_bank, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'active')`,
    [
      id,
      code,
      params.receiptId || null,
      params.userId,
      params.title.trim() || 'Счёт в ресторане',
      baseTotal,
      tipPercent,
      tipAmount,
      params.organizerName.trim() || 'Организатор',
      params.organizerPhone?.trim() || null,
      params.organizerBank?.trim() || null,
    ],
  )

  // Добавляем организатора как первого участника
  const orgMemberId = newId('sm')
  await q(
    `INSERT INTO receipt_split_members (id, split_id, name, is_organizer, paid)
     VALUES ($1, $2, $3, true, true)`,
    [orgMemberId, id, params.organizerName.trim() || 'Организатор'],
  )

  // Если переданы позиции, сохраняем их
  if (params.items && params.items.length > 0) {
    for (const item of params.items) {
      const itemId = newId('si')
      await q(
        `INSERT INTO receipt_split_items (id, split_id, name, qty, price, is_shared)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          itemId,
          id,
          item.name.trim() || 'Позиция',
          item.qty || 1,
          Math.max(0, Math.round(item.price || 0)),
          Boolean(item.isShared),
        ],
      )
    }
  } else if (params.receiptId) {
    // Если позиции не переданы напрямую, но есть receipt_id, скопируем из receipt_items
    const existingItems = await q<any>(
      `SELECT name, qty, price FROM receipt_items WHERE receipt_id = $1`,
      [params.receiptId],
    )
    if (existingItems && existingItems.length > 0) {
      for (const it of existingItems) {
        const itemId = newId('si')
        await q(
          `INSERT INTO receipt_split_items (id, split_id, name, qty, price, is_shared)
           VALUES ($1, $2, $3, $4, $5, false)`,
          [itemId, id, it.name, it.qty || 1, Number(it.price || 0)],
        )
      }
    }
  }

  return { id, code }
}

export interface SplitItemView {
  id: string
  name: string
  qty: number
  price: number
  is_shared: boolean
  claimers: Array<{ member_id: string; member_name: string }>
}

export interface SplitMemberView {
  id: string
  name: string
  is_organizer: boolean
  paid: boolean
  personal_amount: number
  shared_amount: number
  tip_amount: number
  total_amount: number
  items_count: number
}

export interface SplitPublicData {
  viewer_member_ids?: string[]
  viewer_is_owner?: boolean
  split: {
    id: string
    code: string
    title: string
    total: number
    tip_percent: number
    tip_amount: number
    grand_total: number
    organizer_name: string
    organizer_phone: string | null
    organizer_bank: string | null
    status: string
    created_at: string
  }
  items: SplitItemView[]
  members: SplitMemberView[]
  stats: {
    total_bill: number
    claimed_bill: number
    unclaimed_bill: number
    total_paid: number
    all_paid: boolean
  }
}

export async function getSplitData(code: string): Promise<SplitPublicData | null> {
  const cleanCode = code.trim().toLowerCase()
  const split = await q1<any>(
    `SELECT id, code, title, total, tip_percent, tip_amount,
            organizer_name, organizer_phone, organizer_bank, status,
            created_at::text AS created_at
       FROM receipt_splits
      WHERE code = $1`,
    [cleanCode],
  )

  if (!split) return null

  const splitId = split.id
  const total = Number(split.total || 0)
  const tipPercent = Number(split.tip_percent || 0)
  const tipAmount = Number(split.tip_amount || Math.round((total * tipPercent) / 100))
  const grandTotal = total + tipAmount

  // Получаем позиции
  const rawItems = await q<any>(
    `SELECT id, name, qty, price, is_shared
       FROM receipt_split_items
      WHERE split_id = $1
      ORDER BY created_at ASC`,
    [splitId],
  )

  // Получаем участников
  const rawMembers = await q<any>(
    `SELECT id, name, is_organizer, paid
       FROM receipt_split_members
      WHERE split_id = $1
      ORDER BY is_organizer DESC, created_at ASC`,
    [splitId],
  )

  // Получаем выбор позиций
  const rawClaims = await q<any>(
    `SELECT c.item_id, c.member_id, m.name AS member_name
       FROM receipt_split_claims c
       JOIN receipt_split_members m ON m.id = c.member_id
      WHERE c.split_id = $1`,
    [splitId],
  )

  // Группируем claimers по item_id
  const claimsByItem = new Map<string, Array<{ member_id: string; member_name: string }>>()
  for (const c of rawClaims ?? []) {
    if (!claimsByItem.has(c.item_id)) {
      claimsByItem.set(c.item_id, [])
    }
    claimsByItem.get(c.item_id)!.push({ member_id: c.member_id, member_name: c.member_name })
  }

  const items: SplitItemView[] = (rawItems ?? []).map((it: any) => ({
    id: it.id,
    name: it.name,
    qty: Number(it.qty || 1),
    price: Number(it.price || 0),
    is_shared: Boolean(it.is_shared),
    claimers: claimsByItem.get(it.id) || [],
  }))

  const membersCount = (rawMembers ?? []).length

  // Вычисляем общую сумму shared позиций
  const sharedItemsTotal = items
    .filter((it) => it.is_shared)
    .reduce((sum, it) => sum + it.price, 0)
  const sharedPerMember = membersCount > 0 ? Math.round(sharedItemsTotal / membersCount) : 0

  // Расчёт для каждого участника
  const members: SplitMemberView[] = (rawMembers ?? []).map((m: any) => {
    let personal = 0
    let itemsCount = 0

    for (const it of items) {
      if (it.is_shared) continue
      const claimers = it.claimers
      const isClaimedByMe = claimers.some((c) => c.member_id === m.id)
      if (isClaimedByMe) {
        itemsCount++
        personal += Math.round(it.price / Math.max(1, claimers.length))
      }
    }

    const subtotal = personal + (items.length > 0 ? sharedPerMember : 0)
    const memberTip = tipPercent > 0 ? Math.round((subtotal * tipPercent) / 100) : 0
    const totalAmount = subtotal + memberTip

    return {
      id: m.id,
      name: m.name,
      is_organizer: Boolean(m.is_organizer),
      paid: Boolean(m.paid),
      personal_amount: personal,
      shared_amount: items.length > 0 ? sharedPerMember : 0,
      tip_amount: memberTip,
      total_amount: totalAmount,
      items_count: itemsCount,
    }
  })

  // Статистика
  const claimedSum = items
    .filter((it) => it.is_shared || it.claimers.length > 0)
    .reduce((sum, it) => sum + it.price, 0)
  const unclaimedSum = Math.max(0, total - claimedSum)
  const totalPaid = members.filter((m) => m.paid).reduce((sum, m) => sum + m.total_amount, 0)
  const allPaid = members.length > 0 && members.every((m) => m.paid)

  return {
    split: {
      id: split.id,
      code: split.code,
      title: split.title,
      total,
      tip_percent: tipPercent,
      tip_amount: tipAmount,
      grand_total: grandTotal,
      organizer_name: split.organizer_name,
      organizer_phone: split.organizer_phone,
      organizer_bank: split.organizer_bank,
      status: split.status,
      created_at: split.created_at,
    },
    items,
    members,
    stats: {
      total_bill: total,
      claimed_bill: claimedSum,
      unclaimed_bill: unclaimedSum,
      total_paid: totalPaid,
      all_paid: allPaid,
    },
  }
}

export async function joinSplitMember(code: string, name: string): Promise<{ ok: boolean; memberId?: string }> {
  const cleanCode = code.trim().toLowerCase()
  const cleanName = name.trim()
  if (!cleanName) return { ok: false }

  const split = await q1<any>(`SELECT id FROM receipt_splits WHERE code = $1`, [cleanCode])
  if (!split) return { ok: false }

  // Проверяем, может уже есть участник с таким именем
  const existing = await q1<any>(
    `SELECT id FROM receipt_split_members WHERE split_id = $1 AND lower(name) = lower($2)`,
    [split.id, cleanName],
  )
  if (existing) {
    return { ok: true, memberId: existing.id }
  }

  const memberId = newId('sm')
  await q(
    `INSERT INTO receipt_split_members (id, split_id, name, is_organizer, paid)
     VALUES ($1, $2, $3, false, false)`,
    [memberId, split.id, cleanName],
  )
  return { ok: true, memberId }
}

export async function toggleItemClaim(
  code: string,
  memberId: string,
  itemId: string,
  claimed: boolean,
): Promise<{ ok: boolean }> {
  const cleanCode = code.trim().toLowerCase()
  const split = await q1<any>(`SELECT id FROM receipt_splits WHERE code = $1`, [cleanCode])
  if (!split) return { ok: false }

  if (claimed) {
    const claimId = newId('sc')
    await q(
      `INSERT INTO receipt_split_claims (id, split_id, item_id, member_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (item_id, member_id) DO NOTHING`,
      [claimId, split.id, itemId, memberId],
    )
  } else {
    await q(
      `DELETE FROM receipt_split_claims
        WHERE split_id = $1 AND item_id = $2 AND member_id = $3`,
      [split.id, itemId, memberId],
    )
  }
  return { ok: true }
}

export async function toggleItemShared(code: string, itemId: string, isShared: boolean): Promise<{ ok: boolean }> {
  const cleanCode = code.trim().toLowerCase()
  const split = await q1<any>(`SELECT id FROM receipt_splits WHERE code = $1`, [cleanCode])
  if (!split) return { ok: false }

  await q(
    `UPDATE receipt_split_items
        SET is_shared = $1
      WHERE split_id = $2 AND id = $3`,
    [isShared, split.id, itemId],
  )
  return { ok: true }
}

export async function setMemberPaidStatus(code: string, memberId: string, paid: boolean): Promise<{ ok: boolean }> {
  const cleanCode = code.trim().toLowerCase()
  const split = await q1<any>(`SELECT id FROM receipt_splits WHERE code = $1`, [cleanCode])
  if (!split) return { ok: false }

  await q(
    `UPDATE receipt_split_members
        SET paid = $1
      WHERE split_id = $2 AND id = $3`,
    [paid, split.id, memberId],
  )
  return { ok: true }
}

export async function addCustomItemToSplit(
  code: string,
  name: string,
  price: number,
  isShared = false,
): Promise<{ ok: boolean; itemId?: string }> {
  const cleanCode = code.trim().toLowerCase()
  const split = await q1<any>(`SELECT id, total FROM receipt_splits WHERE code = $1`, [cleanCode])
  if (!split) return { ok: false }

  const itemId = newId('si')
  const cleanPrice = Math.max(0, Math.round(price))
  await q(
    `INSERT INTO receipt_split_items (id, split_id, name, qty, price, is_shared)
     VALUES ($1, $2, $3, 1, $4, $5)`,
    [itemId, split.id, name.trim() || 'Позиция', cleanPrice, isShared],
  )

  // Обновляем общую сумму чека
  await q(
    `UPDATE receipt_splits
        SET total = total + $1,
            tip_amount = round((total + $1) * tip_percent / 100)
      WHERE id = $2`,
    [cleanPrice, split.id],
  )

  return { ok: true, itemId }
}
