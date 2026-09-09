import { createServerFn } from '@tanstack/react-start'
import { getSessionUser, type SessionUser } from '../session'
import { q, q1 } from '../db'
import { monthKey } from '~/lib/format'

export interface Receipt {
  id: string
  store: string | null
  purchased_at: string | null
  total: number
  category: string
  verdict: string | null
  note: string | null
  image: string | null
  house_id?: string | null
  house_name?: string | null
  created_at: string
}

export interface ReceiptItem {
  id: string
  name: string
  qty: number | null
  price: number
  category: string
}

export interface UserSettings {
  currency: string
  monthly_budget: number
  monthly_income: number
  allocations: Record<string, number>
}

export interface MonthSummary {
  key: string
  spent: number
  budget: number
  left: number
  count: number
  byCategory: Array<{ category: string; total: number }>
}

export interface Bill {
  id: string
  title: string
  amount: number
  day_of_month: number
  notify: boolean
  paid_cycle?: string | null
}

export interface HouseItem {
  id: string
  name: string
  code: string
  owner_id: string
  members: number
  monthly_budget?: number
  total_spent?: number
  receipts_count?: number
  bills_count?: number
}

export interface UserGoal {
  id: string
  title: string
  amount: number
  collected: number
  icon: string
  color: string
  target_date: string | null
  completed_at: string | null
  created_at: string
}

export interface TelegramInfo {
  connected: boolean
  username: string | null
}

export interface Bootstrap {
  user: SessionUser | null
  settings: UserSettings
  month: MonthSummary
  receipts: Receipt[]
  bills: Bill[]
  houses: HouseItem[]
  goals: UserGoal[]
  telegram: TelegramInfo
}

const EMPTY_SETTINGS: UserSettings = {
  currency: 'RUB',
  monthly_budget: 45000,
  monthly_income: 0,
  allocations: {},
}

export const bootstrapApp = createServerFn({ method: 'GET' }).handler(async (): Promise<Bootstrap> => {
  const user = await getSessionUser()
  if (!user) {
    return {
      user: null,
      settings: EMPTY_SETTINGS,
      month: {
        key: monthKey(),
        spent: 0,
        budget: 45000,
        left: 45000,
        count: 0,
        byCategory: [],
      },
      receipts: [],
      bills: [],
      houses: [],
      goals: [],
      telegram: { connected: false, username: null },
    }
  }

  const settingsRow = await q1<{
    currency: string | null
    monthly_budget: number | null
    monthly_income: number | null
    allocations: any
  }>(
    `SELECT currency, monthly_budget, monthly_income, allocations
       FROM user_settings WHERE user_id = $1`,
    [user.id]
  )

  const settings: UserSettings = {
    currency: settingsRow?.currency || 'RUB',
    monthly_budget: Number(settingsRow?.monthly_budget ?? 45000),
    monthly_income: Number(settingsRow?.monthly_income ?? 0),
    allocations: settingsRow?.allocations && typeof settingsRow.allocations === 'object' ? settingsRow.allocations : {},
  }

  const startOfMonth = `${monthKey()}-01`
  const [spent, receipts, byCat, bills, houses, goals, tgRow] = await Promise.all([
    q1<{ total: string | number; cnt: number }>(
      `SELECT coalesce(sum(total), 0)::bigint AS total, count(*)::int AS cnt
         FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date`,
      [user.id, startOfMonth]
    ),
    q<any>(
      `SELECT r.id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.user_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
        LIMIT 120`,
      [user.id]
    ),
    q<{ category: string; total: string | number }>(
      `SELECT category, coalesce(sum(total), 0)::bigint AS total
         FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date
        GROUP BY category
        ORDER BY total DESC`,
      [user.id, startOfMonth]
    ),
    q<any>(
      `SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, p.cycle AS paid_cycle
         FROM recurring_bills b
         LEFT JOIN bill_pays p
                ON p.bill_id = b.id AND p.cycle = $2 AND p.user_id = b.user_id
        WHERE b.user_id = $1
        ORDER BY b.day_of_month`,
      [user.id, monthKey()]
    ),
    q<any>(
      `SELECT h.id, h.name, h.code, h.owner_id,
              coalesce(h.monthly_budget, 0)::int AS monthly_budget,
              (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members,
              (SELECT coalesce(sum(r.total), 0)::int FROM receipts r WHERE r.house_id = h.id) AS total_spent,
              (SELECT count(*)::int FROM receipts r WHERE r.house_id = h.id) AS receipts_count,
              (SELECT count(*)::int FROM house_bills b WHERE b.house_id = h.id) AS bills_count
         FROM houses h
         JOIN house_members me ON me.house_id = h.id AND me.user_id = $1
        ORDER BY h.created_at DESC`,
      [user.id]
    ),
    q<any>(
      `SELECT id, title, amount, collected, icon, color,
              target_date::text AS target_date,
              completed_at::text AS completed_at,
              created_at::text AS created_at
         FROM user_goals
        WHERE user_id = $1
        ORDER BY completed_at NULLS FIRST, created_at DESC`,
      [user.id]
    ),
    q1<any>(
      `SELECT chat_id, username FROM user_telegram WHERE user_id = $1`,
      [user.id]
    ),
  ])

  const spentNum = Number(spent?.total ?? 0)

  return {
    user,
    settings,
    month: {
      key: monthKey(),
      spent: spentNum,
      budget: settings.monthly_budget,
      left: settings.monthly_budget - spentNum,
      count: Number(spent?.cnt ?? 0),
      byCategory: (byCat ?? []).map((r) => ({
        category: r.category,
        total: Number(r.total),
      })),
    },
    receipts: (receipts ?? []).map((r: any) => ({
      ...r,
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total),
    })),
    bills: (bills ?? []).map((b: any) => ({
      ...b,
      amount: Number(b.amount),
      day_of_month: Number(b.day_of_month),
    })),
    houses: houses ?? [],
    goals: (goals ?? []).map((g: any) => ({
      ...g,
      amount: Number(g.amount || 0),
      collected: Number(g.collected || 0),
    })),
    telegram: {
      connected: Boolean(tgRow && tgRow.chat_id),
      username: tgRow?.username || null,
    },
  }
})
