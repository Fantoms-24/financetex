import { createServerFn } from '@tanstack/react-start'
import { newId, q, q1 } from '../db'
import { guarded } from '../session'
import { notifyHouseExcept } from '../push'
import { monthKey } from '~/lib/format'

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

export interface Wish {
  id: string
  title: string
  amount: number
  by_user: string | null
  by_name: string | null
  bought_at: string | null
  created_at: string
}

export interface Msg {
  id: string
  user_id: string
  name: string
  text: string
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
    const rows = await q<{ id: string; name: string; code: string; owner_id: string; members: number }>(
      `SELECT h.id, h.name, h.code, h.owner_id,
              (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members
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
  const [house, members, bills, wishes, messages, pays] = await Promise.all([
    q1<{ id: string; name: string; code: string; owner_id: string; created_at: string }>(
      `SELECT id, name, code, owner_id, created_at FROM houses WHERE id = $1`,
      [houseId],
    ),
    membersOf(houseId),
    q<HouseBill>(
      `SELECT id, title, amount, day_of_month, split, payer_id, created_at
         FROM house_bills WHERE house_id = $1 ORDER BY day_of_month, created_at`,
      [houseId],
    ),
    q<Wish & { uname: string | null; email: string | null; display_name: string | null }>(
      `SELECT w.id, w.title, w.amount, w.by_user, w.bought_at, w.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_wishes w
         LEFT JOIN profiles p ON p.user_id = w.by_user
         LEFT JOIN "user" u ON u.id = w.by_user
        WHERE w.house_id = $1
        ORDER BY w.bought_at NULLS FIRST, w.created_at DESC`,
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
  const billIds = new Set((bills ?? []).map((b) => b.id))
  const relevantPays = (pays ?? []).filter((p) => billIds.has(p.bill_id))

  return {
    house,
    members,
    bills: (bills ?? []).map((b) => ({ ...b, amount: Number(b.amount), day_of_month: Number(b.day_of_month) })),
    wishes: (wishes ?? []).map((w) => ({
      id: w.id,
      title: w.title,
      amount: Number(w.amount),
      by_user: w.by_user,
      by_name: w.display_name || w.uname || w.email?.split('@')[0] || null,
      bought_at: w.bought_at ? new Date(w.bought_at).toISOString() : null,
      created_at: new Date(w.created_at).toISOString(),
    })),
    messages: (messages ?? [])
      .map((m) => ({
        id: m.id,
        user_id: m.user_id,
        name: m.display_name || m.uname || m.email?.split('@')[0] || 'Человек',
        text: m.text,
        created_at: new Date(m.created_at).toISOString(),
      }))
      .reverse(),
    pays: relevantPays.map((p) => ({ ...p, paid_at: new Date(p.paid_at).toISOString() })),
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
      const shares: Record<string, Record<string, number>> = {}
      for (const b of snap.bills) shares[b.id] = computeShares(b, snap.members)
      return { ...snap, shares, you: user.id, serverTime: new Date().toISOString() }
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
      const version = [snap.members.length, snap.bills.length, snap.wishes.length, snap.messages.length, lastMsg, lastWish, lastPay].join('|')

      const shares: Record<string, Record<string, number>> = {}
      for (const b of snap.bills) shares[b.id] = computeShares(b, snap.members)

      return { ...snap, shares, version, you: user.id, serverTime: new Date().toISOString() }
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
        body: `Новый платёж: ${data.title}`,
        data: { url: `/groups/${data.houseId}`, type: 'house-bill' },
      })
      return { ok: true as const, id }
    }),
  )

export const addWish = createServerFn({ method: 'POST' })
  .validator((d: { houseId: string; title: string; amount: number }) => ({
    houseId: String(d.houseId),
    title: String(d.title || '').trim(),
    amount: Math.round(Number(d.amount || 0)),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.title) return { error: 'Впишите название' } as const
      if (!(await isMember(data.houseId, user.id))) return { error: 'Вы не в этой кассе' } as const
      await q(`INSERT INTO house_wishes (id, house_id, title, amount, by_user) VALUES ($1, $2, $3, $4, $5)`, [
        newId('hw'),
        data.houseId,
        data.title,
        data.amount,
        user.id,
      ])
      const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: `Хотят купить: ${data.title}`,
        data: { url: `/groups/${data.houseId}`, type: 'house-wish' },
      })
      return { ok: true as const }
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
        const bill = await q1<{ title: string }>(`SELECT title FROM house_bills WHERE id = $1`, [data.billId])
        const house = await q1<{ name: string }>(`SELECT name FROM houses WHERE id = $1`, [data.houseId])
        await notifyHouseExcept(data.houseId, user.id, {
          title: house?.name || 'Касса',
          body: `${user.displayName} оплатил: ${bill?.title || 'платёж'}`,
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
      await notifyHouseExcept(data.houseId, user.id, {
        title: house?.name || 'Касса',
        body: data.text.slice(0, 120),
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
