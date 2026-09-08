import { createServerFn } from '@tanstack/react-start'
import { newId, q, q1 } from '../db'
import { guarded } from '../session'
import { notifyHouseExcept } from '../push'
import { getLlmConfig } from '../config'
import { monthKey, categoryLabel } from '~/lib/format'

export interface Member {
  id: string
  user_id: string
  name: string
  salary: number
}

export interface HouseBill {
  id: string
  title: string
  amount: number
  day_of_month: number
  split: 'equal' | 'salary' | 'payer'
  payer_id: string | null
  created_at: string
}

export interface GoalDeposit {
  id: string
  wish_id: string
  user_id: string
  name: string
  amount: number
  note: string | null
  created_at: string
}

export interface Wish {
  id: string
  title: string
  amount: number
  collected: number
  target_date: string | null
  by_user: string | null
  by_name: string | null
  bought_at: string | null
  created_at: string
  deposits?: Array<GoalDeposit>
}

export interface HouseReceipt {
  id: string
  user_id: string
  store: string
  purchased_at: string | null
  total: number
  category: string
  verdict: string | null
  note: string | null
  image: string | null
  payer_name: string
  created_at: string
}

export interface HouseAnalytics {
  budget: number
  totalSpent: number
  left: number
  percentSpent: number
  byCategory: Array<{ category: string; label: string; total: number; percent: number }>
  byMember: Array<{ user_id: string; name: string; total: number; percent: number }>
}

export interface Msg {
  id: string
  user_id: string
  name: string
  text: string
  is_agent?: boolean
  created_at: string
}

export interface Pay {
  bill_id: string
  cycle: string
  user_id: string
  paid_at: string
}

function code(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 7; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  return out
}

async function isMember(houseId: string, userId: string): Promise<boolean> {
  const row = await q1(`SELECT 1 AS x FROM house_members WHERE house_id = $1 AND user_id = $2`, [houseId, userId])
  return !!row
}

async function memberName(userId: string): Promise<string> {
  const p = await q1<{ display_name: string | null }>(`SELECT display_name FROM profiles WHERE user_id = $1`, [userId])
  if (p?.display_name) return p.display_name
  const u = await q1<{ name: string; email: string }>(`SELECT name, email FROM "user" WHERE id = $1`, [userId])
  return u?.name || u?.email?.split('@')[0] || 'Человек'
}

async function membersOf(houseId: string): Promise<Array<Member>> {
  const rows = await q<Member & { display_name: string | null; uname: string | null; email: string | null }>(
    `SELECT m.id, m.user_id, m.salary_cents AS salary,
            p.display_name,
            u.name AS uname,
            u.email AS email
       FROM house_members m
       LEFT JOIN profiles p ON p.user_id = m.user_id
       LEFT JOIN "user" u ON u.id = m.user_id
      WHERE m.house_id = $1
      ORDER BY m.created_at`,
    [houseId],
  )
  return (rows ?? []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    name: r.display_name || r.uname || r.email?.split('@')[0] || 'Человек',
    salary: Number(r.salary || 0),
  }))
}

/** Доли: поровну / по доле зарплаты / платит один. Целые рубли, без копеек. */
function computeShares(
  bill: { amount: number; split: string; payer_id: string | null },
  members: Array<Member>,
): Record<string, number> {
  const out: Record<string, number> = {}
  const amount = Math.round(Number(bill.amount || 0))
  if (!members.length) return out

  if (bill.split === 'payer') {
    for (const m of members) out[m.user_id] = 0
    const target = bill.payer_id && out[bill.payer_id] !== undefined ? bill.payer_id : members[0].user_id
    out[target] = amount
    return out
  }

  if (bill.split === 'salary') {
    const total = members.reduce((s, m) => s + Math.max(0, m.salary), 0)
    if (total > 0) {
      let given = 0
      members.forEach((m, idx) => {
        const share = idx === members.length - 1 ? amount - given : Math.round((amount * Math.max(0, m.salary)) / total)
        out[m.user_id] = share
        given += share
      })
      return out
    }
  }

  const base = Math.floor(amount / members.length)
  let given = 0
  members.forEach((m, idx) => {
    const share = idx === members.length - 1 ? amount - given : base
    out[m.user_id] = share
    given += share
  })
  return out
}

export const listHouses = createServerFn({ method: 'GET' }).handler(async () =>
  guarded(async (user) => {
    const rows = await q<{
      id: string
      name: string
      code: string
      owner_id: string
      monthly_budget: number
      members: number
      total_spent: number
      receipts_count: number
      bills_count: number
    }>(
      `SELECT h.id, h.name, h.code, h.owner_id, coalesce(h.monthly_budget, 0)::int AS monthly_budget,
              (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members,
              (SELECT coalesce(sum(r.total), 0)::int FROM receipts r WHERE r.house_id = h.id) AS total_spent,
              (SELECT count(*)::int FROM receipts r WHERE r.house_id = h.id) AS receipts_count,
              (SELECT count(*)::int FROM house_bills b WHERE b.house_id = h.id) AS bills_count
         FROM houses h
         JOIN house_members me ON me.house_id = h.id AND me.user_id = $1
        ORDER BY h.created_at DESC`,
      [user.id],
    )
    return { houses: rows ?? [] }
  }),
)

export const createHouse = createServerFn({ method: 'POST' })
  .validator((d: { name: string }) => ({ name: String(d.name || '').trim() || 'Семья' }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      let newCode = code()
      for (let i = 0; i < 6; i++) {
        const exists = await q1(`SELECT 1 AS x FROM houses WHERE code = $1`, [newCode])
        if (!exists) break
        newCode = code()
      }
      const id = newId('h')
      await q(`INSERT INTO houses (id, name, code, owner_id) VALUES ($1, $2, $3, $4)`, [
        id,
        data.name,
        newCode,
        user.id,
      ])
      // В SQL 4 плейсхолдера: salary_cents стоит литералом 0 — зарплату
      // участник укажет позже. Пятый параметр здесь ломает запрос:
      // «bind message supplies 5 parameters, but prepared statement requires 4».
      await q(
        `INSERT INTO house_members (id, house_id, user_id, name, salary_cents)
         VALUES ($1, $2, $3, $4, 0)
         ON CONFLICT (house_id, user_id) DO NOTHING`,
        [newId('hm'), id, user.id, await memberName(user.id)],
      )
      return { ok: true as const, id, code: newCode }
    }),
  )

export const joinHouse = createServerFn({ method: 'POST' })
  .validator((d: { code: string }) => ({ code: String(d.code || '').trim().toUpperCase() }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.code) return { error: 'Впишите код кассы' } as const
      const house = await q1<{ id: string; name: string }>(`SELECT id, name FROM houses WHERE code = $1`, [data.code])
      if (!house) return { error: 'Такой код не найден' } as const
      await q(
        `INSERT INTO house_members (id, house_id, user_id, name, salary_cents)
         VALUES ($1, $2, $3, $4, 0)
         ON CONFLICT (house_id, user_id) DO NOTHING`,
        [newId('hm'), house.id, user.id, await memberName(user.id)],
      )
      await notifyHouseExcept(house.id, user.id, {
        title: house.name,
        body: `${await memberName(user.id)} вошёл в кассу`,
        data: { url: `/groups/${house.id}`, type: 'house-join' },
      })
      return { ok: true as const, id: house.id }
    }),
  )

async function snapshot(houseId: string) {
  const [house, members, bills, wishes, deposits, receipts, messages, pays] = await Promise.all([
    q1<{ id: string; name: string; code: string; owner_id: string; monthly_budget: number; created_at: string }>(
      `SELECT id, name, code, owner_id, coalesce(monthly_budget, 0)::int AS monthly_budget, created_at FROM houses WHERE id = $1`,
      [houseId],
    ),
    membersOf(houseId),
    q<HouseBill>(
      `SELECT id, title, amount, day_of_month, split, payer_id, created_at
         FROM house_bills WHERE house_id = $1 ORDER BY day_of_month, created_at`,
      [houseId],
    ),
    q<Wish & { uname: string | null; email: string | null; display_name: string | null }>(
      `SELECT w.id, w.title, w.amount, coalesce(w.collected, 0)::int AS collected, w.target_date,
              w.by_user, w.bought_at, w.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_wishes w
         LEFT JOIN profiles p ON p.user_id = w.by_user
         LEFT JOIN "user" u ON u.id = w.by_user
        WHERE w.house_id = $1
        ORDER BY w.bought_at NULLS FIRST, w.created_at DESC`,
      [houseId],
    ),
    q<GoalDeposit & { uname: string | null; email: string | null; display_name: string | null }>(
      `SELECT d.id, d.wish_id, d.user_id, d.amount, d.note, d.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_goal_deposits d
         LEFT JOIN profiles p ON p.user_id = d.user_id
         LEFT JOIN "user" u ON u.id = d.user_id
        WHERE d.house_id = $1
        ORDER BY d.created_at DESC
        LIMIT 200`,
      [houseId],
    ),
    q<HouseReceipt & { uname: string | null; email: string | null; display_name: string | null }>(
      `SELECT r.id, r.user_id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM receipts r
         LEFT JOIN profiles p ON p.user_id = r.user_id
         LEFT JOIN "user" u ON u.id = r.user_id
        WHERE r.house_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
        LIMIT 100`,
      [houseId],
    ),
    q<Msg & { uname: string | null; email: string | null; display_name: string | null }>(
      `SELECT m.id, m.user_id, m.text, m.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_messages m
         LEFT JOIN profiles p ON p.user_id = m.user_id
         LEFT JOIN "user" u ON u.id = m.user_id
        WHERE m.house_id = $1
        ORDER BY m.created_at DESC
        LIMIT 200`,
      [houseId],
    ),
    q<Pay>(
      `SELECT p.bill_id, p.cycle, p.user_id, p.paid_at
         FROM house_bill_pays p
         JOIN house_bills b ON b.id = p.bill_id
        WHERE b.house_id = $1`,
      [houseId],
    ),
  ])

  const cycle = monthKey()
  const startOfMonth = `${cycle}-01`
  const billIds = new Set((bills ?? []).map((b) => b.id))
  const relevantPays = (pays ?? []).filter((p) => billIds.has(p.bill_id))

  // Счета, оплаченные в этом месяце
  const paidBillsList = (bills ?? []).filter((b) => relevantPays.some((p) => p.bill_id === b.id && p.cycle === cycle))
  const paidBillsSum = paidBillsList.reduce((s, b) => s + Number(b.amount || 0), 0)

  // Чеки кассы за текущий месяц
  const monthReceipts = (receipts ?? []).filter((r) => {
    const d = r.purchased_at ? String(r.purchased_at).slice(0, 10) : String(r.created_at).slice(0, 10)
    return d >= startOfMonth
  })
  const receiptsSum = monthReceipts.reduce((s, r) => s + Number(r.total || 0), 0)
  const totalSpent = paidBillsSum + receiptsSum
  const budget = Number(house?.monthly_budget || 0)
  const left = budget > 0 ? Math.max(0, budget - totalSpent) : 0
  const percentSpent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0

  // Разбивка расходов по категориям
  const catSums: Record<string, number> = {}
  if (paidBillsSum > 0) catSums['bills'] = (catSums['bills'] || 0) + paidBillsSum
  for (const r of monthReceipts) {
    const cat = r.category || 'other'
    catSums[cat] = (catSums[cat] || 0) + Number(r.total || 0)
  }
  const byCategory = Object.entries(catSums)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amount]) => ({
      category: cat,
      label: cat === 'bills' ? 'Счета и жильё' : categoryLabel(cat),
      total: amount,
      percent: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
    }))

  // Расчёт долей по счетам
  const shares: Record<string, Record<string, number>> = {}
  for (const b of bills ?? []) shares[b.id] = computeShares(b, members)

  // Вклад каждого участника в общие расходы кассы
  const memberSums: Record<string, number> = {}
  for (const m of members) memberSums[m.user_id] = 0
  for (const b of paidBillsList) {
    const bShares = shares[b.id] || {}
    for (const [uid, amt] of Object.entries(bShares)) {
      memberSums[uid] = (memberSums[uid] || 0) + amt
    }
  }
  for (const r of monthReceipts) {
    memberSums[r.user_id] = (memberSums[r.user_id] || 0) + Number(r.total || 0)
  }
  const byMember = members
    .map((m) => {
      const amt = memberSums[m.user_id] || 0
      return {
        user_id: m.user_id,
        name: m.name,
        total: amt,
        percent: totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0,
      }
    })
    .sort((a, b) => b.total - a.total)

  const analytics: HouseAnalytics = {
    budget,
    totalSpent,
    left,
    percentSpent,
    byCategory,
    byMember,
  }

  // Привязка взносов к копилкам
  const depositsByWish: Record<string, Array<GoalDeposit>> = {}
  for (const d of deposits ?? []) {
    if (!depositsByWish[d.wish_id]) depositsByWish[d.wish_id] = []
    depositsByWish[d.wish_id].push({
      id: d.id,
      wish_id: d.wish_id,
      user_id: d.user_id,
      name: d.display_name || d.uname || d.email?.split('@')[0] || 'Участник',
      amount: Number(d.amount || 0),
      note: d.note ?? null,
      created_at: new Date(d.created_at).toISOString(),
    })
  }

  return {
    house: house ? { ...house, monthly_budget: Number(house.monthly_budget || 0) } : null,
    members,
    bills: (bills ?? []).map((b) => ({ ...b, amount: Number(b.amount), day_of_month: Number(b.day_of_month) })),
    wishes: (wishes ?? []).map((w) => ({
      id: w.id,
      title: w.title,
      amount: Number(w.amount),
      collected: Number(w.collected || 0),
      target_date: w.target_date ? String(w.target_date).slice(0, 10) : null,
      by_user: w.by_user,
      by_name: w.display_name || w.uname || w.email?.split('@')[0] || null,
      bought_at: w.bought_at ? new Date(w.bought_at).toISOString() : null,
      created_at: new Date(w.created_at).toISOString(),
      deposits: depositsByWish[w.id] || [],
    })),
    receipts: (receipts ?? []).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      store: r.store || 'Чек',
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total || 0),
      category: r.category || 'other',
      verdict: r.verdict || null,
      note: r.note || null,
      image: r.image || null,
      payer_name: r.display_name || r.uname || r.email?.split('@')[0] || 'Участник',
      created_at: new Date(r.created_at).toISOString(),
    })),
    messages: (messages ?? [])
      .map((m) => ({
        id: m.id,
        user_id: m.user_id,
        name: m.user_id === 'agent' ? 'Листок' : (m.display_name || m.uname || m.email?.split('@')[0] || 'Человек'),
        text: m.text,
        is_agent: m.user_id === 'agent',
        created_at: new Date(m.created_at).toISOString(),
      }))
      .reverse(),
    pays: relevantPays.map((p) => ({ ...p, paid_at: new Date(p.paid_at).toISOString() })),
    analytics,
    shares,
    cycle,
  }
}

export const getHouse = createServerFn({ method: 'GET' })
  .validator((d: { houseId: string }) => ({ houseId: String(d.houseId) }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const snap = await snapshot(data.houseId)
      if (!snap.house) return { error: 'Касса не найдена' } as const
      return { ...snap, you: user.id, serverTime: new Date().toISOString() }
    }),
  )

export const liveHouse = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; since?: string }) => ({
    houseId: String(d.houseId),
    since: d.since ? String(d.since) : null,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const snap = await snapshot(data.houseId)
      if (!snap.house) return { error: 'Касса не найдена' } as const

      const lastMsg = snap.messages.length ? snap.messages[snap.messages.length - 1].created_at : ''
      const lastWish = snap.wishes.length ? snap.wishes[0].created_at : ''
      const lastPay = snap.pays.length
        ? snap.pays.reduce((a, b) => (a.paid_at > b.paid_at ? a : b)).paid_at
        : ''
      const lastReceipt = snap.receipts.length ? snap.receipts[0].created_at : ''
      const version = [
        snap.members.length,
        snap.bills.length,
        snap.wishes.length,
        snap.receipts.length,
        snap.messages.length,
        snap.analytics.totalSpent,
        lastMsg,
        lastWish,
        lastPay,
        lastReceipt,
      ].join('|')

      return { ...snap, version, you: user.id, serverTime: new Date().toISOString() }
    }),
  )

export const setHouseBudget = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; budget: number }) => ({
    houseId: String(d.houseId),
    budget: Math.round(Math.max(0, Number(d.budget || 0))),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`UPDATE houses SET monthly_budget = $1 WHERE id = $2`, [data.budget, data.houseId])
      return { ok: true as const, budget: data.budget }
    }),
  )

export const depositGoal = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; wishId: string; amount: number; note?: string }) => ({
    houseId: String(d.houseId),
    wishId: String(d.wishId),
    amount: Math.round(Math.max(1, Number(d.amount || 0))),
    note: String(d.note || '').trim() || null,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const wish = await q1<{ title: string; amount: number; collected: number; bought_at: string | null }>(
        `SELECT title, amount, coalesce(collected, 0)::int AS collected, bought_at FROM house_wishes WHERE id = $1 AND house_id = $2`,
        [data.wishId, data.houseId],
      )
      if (!wish) return { error: 'Цель не найдена' } as const
      const depositId = newId('hgd')
      await q(
        `INSERT INTO house_goal_deposits (id, house_id, wish_id, user_id, amount, note)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [depositId, data.houseId, data.wishId, user.id, data.amount, data.note],
      )
      const nextCollected = wish.collected + data.amount
      const isComplete = nextCollected >= wish.amount && wish.amount > 0
      const boughtAt = isComplete && !wish.bought_at ? new Date().toISOString() : wish.bought_at
      await q(
        `UPDATE house_wishes SET collected = $1, bought_at = $2 WHERE id = $3`,
        [nextCollected, boughtAt, data.wishId],
      )
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      const uName = user.displayName || user.name || 'Участник'
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: `${uName} внёс ${Number(data.amount).toLocaleString('ru-RU')} ₽ в «${wish.title}»`,
        data: { url: `/groups/${data.houseId}`, type: 'house-deposit' },
      }).catch(() => {})
      return { ok: true as const, collected: nextCollected, isComplete }
    }),
  )

export const askHouseAgent = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; prompt?: string }) => ({
    houseId: String(d.houseId),
    prompt: String(d.prompt || '').trim(),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const snap = await snapshot(data.houseId)
      if (!snap.house) return { error: 'Касса не найдена' } as const

      // Если пользователь задал явный вопрос, сохраняем его в чат
      if (data.prompt) {
        await q(
          `INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, $3, $4)`,
          [newId('hm'), data.houseId, user.id, data.prompt.slice(0, 2000)],
        )
      }

      const { baseUrl, apiKey, model } = await getLlmConfig()
      if (!apiKey) {
        const text = 'Админ ещё не указал API-ключ в настройках, поэтому я пока не могу проанализировать финансы кассы.'
        await q(
          `INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, 'agent', $3)`,
          [newId('hm'), data.houseId, text],
        )
        return { ok: true as const, reply: text }
      }

      // Собираем контекст кассы
      const mems = snap.members.map((m) => `${m.name} (зарплата ${m.salary.toLocaleString('ru-RU')} ₽)`).join(', ')
      const cats = snap.analytics.byCategory.map((c) => `${c.label}: ${c.total.toLocaleString('ru-RU')} ₽ (${c.percent}%)`).join(', ')
      const membersContr = snap.analytics.byMember.map((m) => `${m.name}: ${m.total.toLocaleString('ru-RU')} ₽ (${m.percent}%)`).join(', ')
      const unpaidBills = snap.bills.filter((b) => !snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle))
      const unpaidText = unpaidBills.length
        ? unpaidBills.map((b) => `${b.title} (${b.amount} ₽, ${b.day_of_month} числа)`).join('; ')
        : 'все обязательные счета закрыты'
      const activeGoals = snap.wishes.filter((w) => !w.bought_at && w.amount > 0)
      const goalsText = activeGoals.length
        ? activeGoals.map((w) => `«${w.title}»: ${w.collected.toLocaleString('ru-RU')} из ${w.amount.toLocaleString('ru-RU')} ₽`).join('; ')
        : 'активных копилок нет'

      const context = [
        `Касса: «${snap.house.name}». Участники: ${mems}.`,
        `Месячный бюджет кассы: ${snap.analytics.budget > 0 ? snap.analytics.budget.toLocaleString('ru-RU') + ' ₽' : 'не задан'}.`,
        `Потрачено в этом месяце: ${snap.analytics.totalSpent.toLocaleString('ru-RU')} ₽.`,
        cats ? `По категориям: ${cats}.` : 'Трат в этом месяце пока нет.',
        `Вклад участников в траты: ${membersContr}.`,
        `Неоплаченные счета: ${unpaidText}.`,
        `Копилки: ${goalsText}.`,
      ].join(' ')

      const system = `Ты — Листок, карманный финансовый советник семейной кассы.
Говоришь по-русски, тепло, дружелюбно, лаконично и по делу, как заметка в блокноте.
Без корпоративного жаргона, без слов «нейросеть», «AI», «умные алгоритмы».
Вот данные семейной кассы: ${context}
Ответь 2–5 ёмкими фразами. Если спросили «Итоги месяца» или «Анализ» — кратко резюмируй расходы, упомяни неоплаченные счета и похвали за прогресс по копилкам. Если задан конкретный вопрос — ответь строго на него.`

      let reply = ''
      try {
        const resp = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.4,
            messages: [
              { role: 'system', content: system },
              ...(data.prompt ? [{ role: 'user', content: data.prompt }] : [{ role: 'user', content: 'Подведи финансовые итоги кассы за этот месяц и дай краткий совет.' }]),
            ],
          }),
          signal: AbortSignal.timeout(60000),
        })
        if (!resp.ok) throw new Error(`llm ${resp.status}`)
        const json = await resp.json()
        reply = String(json?.choices?.[0]?.message?.content || '').trim()
      } catch {
        reply = 'Не получилось связаться с сервисом. Попробуйте ещё раз чуть позже.'
      }

      if (!reply) reply = 'В кассе пока мало данных для анализа. Добавьте чеки и платежи!'

      await q(
        `INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, 'agent', $3)`,
        [newId('hm'), data.houseId, reply.slice(0, 4000)],
      )

      const houseName = snap.house.name
      await notifyHouseExcept(data.houseId, user.id, {
        title: `Листок (${houseName})`,
        body: reply.slice(0, 120),
        data: { url: `/groups/${data.houseId}`, type: 'house-agent' },
      }).catch(() => {})

      return { ok: true as const, reply }
    }),
  )

export const linkReceiptToHouse = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; receiptId: string; link: boolean }) => ({
    houseId: String(d.houseId),
    receiptId: String(d.receiptId),
    link: !!d.link,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const target = data.link ? data.houseId : null
      await q(`UPDATE receipts SET house_id = $1 WHERE id = $2 AND user_id = $3`, [
        target,
        data.receiptId,
        user.id,
      ])
      return { ok: true as const }
    }),
  )

export const addHouseBill = createServerFn({ method: 'POST' })
  .validator(
    (d: { houseId: string; title: string; amount: number; day_of_month: number; split: string; payer_id?: string | null }) => ({
      houseId: String(d.houseId),
      title: String(d.title || '').trim(),
      amount: Math.round(Number(d.amount || 0)),
      day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
      split: ['equal', 'salary', 'payer'].includes(d.split) ? d.split : 'equal',
      payer_id: d.payer_id || null,
    }),
  )
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.title) return { error: 'Впишите название' } as const
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const id = newId('hb')
      await q(
        `INSERT INTO house_bills (id, house_id, title, amount, day_of_month, split, payer_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, data.houseId, data.title, data.amount, data.day_of_month, data.split, data.payer_id],
      )
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: `Новый платёж: ${data.title} (${Number(data.amount).toLocaleString('ru-RU')} ₽)`,
        data: { url: `/groups/${data.houseId}`, type: 'house-bill' },
      })
      return { ok: true as const, id }
    }),
  )

export const addWish = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; title: string; amount: number; target_date?: string | null; initialAmount?: number }) => ({
    houseId: String(d.houseId),
    title: String(d.title || '').trim(),
    amount: Math.round(Number(d.amount || 0)),
    target_date: d.target_date ? String(d.target_date).slice(0, 10) : null,
    initialAmount: Math.round(Math.max(0, Number(d.initialAmount || 0))),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.title) return { error: 'Впишите название' } as const
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const wishId = newId('hw')
      const isComplete = data.amount > 0 && data.initialAmount >= data.amount
      await q(
        `INSERT INTO house_wishes (id, house_id, title, amount, collected, target_date, by_user, bought_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          wishId,
          data.houseId,
          data.title,
          data.amount,
          data.initialAmount,
          data.target_date,
          user.id,
          isComplete ? new Date().toISOString() : null,
        ],
      )
      if (data.initialAmount > 0) {
        await q(
          `INSERT INTO house_goal_deposits (id, house_id, wish_id, user_id, amount, note)
           VALUES ($1, $2, $3, $4, $5, 'Стартовый взнос')`,
          [newId('hgd'), data.houseId, wishId, user.id, data.initialAmount],
        )
      }
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: `Новая цель: ${data.title} (${data.amount.toLocaleString('ru-RU')} ₽)`,
        data: { url: `/groups/${data.houseId}`, type: 'house-wish' },
      }).catch(() => {})
      return { ok: true as const, id: wishId }
    }),
  )

export const toggleWish = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; wishId: string }) => ({
    houseId: String(d.houseId),
    wishId: String(d.wishId),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const w = await q1<{ title: string; bought_at: string | null }>(
        `SELECT title, bought_at FROM house_wishes WHERE id = $1 AND house_id = $2`,
        [data.wishId, data.houseId],
      )
      if (!w) return { error: 'Не найдено' } as const
      const next = w.bought_at ? null : new Date().toISOString()
      await q(`UPDATE house_wishes SET bought_at = $1 WHERE id = $2`, [next, data.wishId])
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: next ? `Взяли: ${w.title}` : `Снова в списке: ${w.title}`,
        data: { url: `/groups/${data.houseId}`, type: 'house-wish' },
      })
      return { ok: true as const }
    }),
  )

export const deleteWish = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; wishId: string }) => ({
    houseId: String(d.houseId),
    wishId: String(d.wishId),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`DELETE FROM house_wishes WHERE id = $1 AND house_id = $2`, [data.wishId, data.houseId])
      return { ok: true as const }
    }),
  )

export const deleteHouseBill = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; billId: string }) => ({
    houseId: String(d.houseId),
    billId: String(d.billId),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`DELETE FROM house_bill_pays WHERE bill_id = $1`, [data.billId])
      await q(`DELETE FROM house_bills WHERE id = $1 AND house_id = $2`, [data.billId, data.houseId])
      return { ok: true as const }
    }),
  )

export const setSalary = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; amount: number }) => ({
    houseId: String(d.houseId),
    amount: Math.round(Math.max(0, Number(d.amount || 0))),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`UPDATE house_members SET salary_cents = $1 WHERE house_id = $2 AND user_id = $3`, [
        data.amount,
        data.houseId,
        user.id,
      ])
      return { ok: true as const }
    }),
  )

export const payHouseBill = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; billId: string; paid: boolean }) => ({
    houseId: String(d.houseId),
    billId: String(d.billId),
    paid: !!d.paid,
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      const cycle = monthKey()
      if (data.paid) {
        await q(
          `INSERT INTO house_bill_pays (bill_id, cycle, user_id) VALUES ($1, $2, $3)
           ON CONFLICT (bill_id, cycle, user_id) DO NOTHING`,
          [data.billId, cycle, user.id],
        )
      } else {
        await q(`DELETE FROM house_bill_pays WHERE bill_id = $1 AND cycle = $2 AND user_id = $3`, [
          data.billId,
          cycle,
          user.id,
        ])
      }
      if (data.paid) {
        const bill = await q1<{ title: string; amount: number }>(`SELECT title, amount FROM house_bills WHERE id = $1`, [data.billId])
        const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
        const uName = user.displayName || user.name || 'Участник'
        const amtStr = bill?.amount ? ` (${Number(bill.amount).toLocaleString('ru-RU')} ₽)` : ''
        await notifyHouseExcept(data.houseId, user.id, {
          title: house?.name || 'Касса',
          body: `${uName} оплатил: ${bill?.title || 'платёж'}${amtStr}`,
          data: { url: `/groups/${data.houseId}`, type: 'house-pay' },
        })
      }
      return { ok: true as const, cycle }
    }),
  )

export const sendHouseMessage = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; text: string }) => ({
    houseId: String(d.houseId),
    text: String(d.text || '').trim(),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.text) return { ok: true as const }
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, $3, $4)`, [
        newId('hm'),
        data.houseId,
        user.id,
        data.text.slice(0, 2000),
      ])
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      const uName = user.displayName || user.name || 'Участник'
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: `${uName}: ${data.text.slice(0, 100)}`,
        data: { url: `/groups/${data.houseId}`, type: 'house-message' },
      })
      return { ok: true as const }
    }),
  )

export const kickMember = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; userId: string }) => ({
    houseId: String(d.houseId),
    userId: String(d.userId),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      const house = await q1<{ owner_id: string }>(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId])
      if (!house) return { error: 'Касса не найдена' } as const
      if (house.owner_id !== user.id) return { error: 'Только владелец может выгнать' } as const
      if (data.userId === user.id) return { error: 'Себя не выгнать — выйдите из кассы' } as const
      await q(`DELETE FROM house_members WHERE house_id = $1 AND user_id = $2`, [data.houseId, data.userId])
      return { ok: true as const }
    }),
  )

export const leaveHouse = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string }) => ({ houseId: String(d.houseId) }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      const house = await q1<{ owner_id: string }>(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId])
      if (house && house.owner_id === user.id) return { error: 'Владелец не может выйти — удалите кассу' } as const
      await q(`DELETE FROM house_members WHERE house_id = $1 AND user_id = $2`, [data.houseId, user.id])
      return { ok: true as const }
    }),
  )

export const deleteHouse = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string }) => ({ houseId: String(d.houseId) }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      const house = await q1<{ owner_id: string }>(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId])
      if (!house) return { ok: true as const }
      if (house.owner_id !== user.id) return { error: 'Только владелец может удалить кассу' } as const
      await q(`DELETE FROM house_members WHERE house_id = $1`, [data.houseId])
      await q(`DELETE FROM house_messages WHERE house_id = $1`, [data.houseId])
      await q(`DELETE FROM house_wishes WHERE house_id = $1`, [data.houseId])
      const ids = await q<{ id: string }>(`SELECT id FROM house_bills WHERE house_id = $1`, [data.houseId])
      for (const b of ids ?? []) await q(`DELETE FROM house_bill_pays WHERE bill_id = $1`, [b.id])
      await q(`DELETE FROM house_bills WHERE house_id = $1`, [data.houseId])
      await q(`DELETE FROM houses WHERE id = $1`, [data.houseId])
      return { ok: true as const }
    }),
  )
