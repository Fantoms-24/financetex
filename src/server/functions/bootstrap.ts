import { createServerFn } from '@tanstack/react-start'
import { q, q1 } from '../db'
import { getSessionUser, type SessionUser } from '../session'
import { monthKey } from '~/lib/format'

export interface ReceiptItem {
  id: string
  name: string
  qty: number | null
  price: number
  category: string
}

export interface Receipt {
  id: string
  store: string | null
  purchased_at: string | null
  total: number
  category: string
  verdict: string | null
  note: string | null
  image: string | null
  created_at: string
  items?: Array<ReceiptItem>
}

export interface Bill {
  id: string
  title: string
  amount: number
  day_of_month: number
  notify: boolean
  paid_cycle: string | null
}

export interface HouseShort {
  id: string
  name: string
  code: string
  owner_id: string
  members: number
}

export interface Bootstrap {
  user: SessionUser | null
  settings: { currency: string; monthly_budget: number; monthly_income: number; allocations: Record<string, number> }
  month: { key: string; spent: number; budget: number; left: number; count: number; byCategory: Array<{ category: string; total: number }> }
  receipts: Array<Receipt>
  bills: Array<Bill>
  houses: Array<HouseShort>
  error?: string
}

const EMPTY_SETTINGS = {
  currency: 'RUB',
  monthly_budget: 45000,
  monthly_income: 0,
  allocations: {} as Record<string, number>,
}

export const bootstrapApp = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Bootstrap> => {
    const user = await getSessionUser()
    if (!user) {
      return {
        user: null,
        settings: EMPTY_SETTINGS,
        month: { key: monthKey(), spent: 0, budget: 45000, left: 45000, count: 0, byCategory: [] },
        receipts: [],
        bills: [],
        houses: [],
      }
    }

    const settingsRow = await q1<{
      currency: string
      monthly_budget: number
      monthly_income: number
      allocations: any
    }>(
      `SELECT currency, monthly_budget, monthly_income, allocations
         FROM user_settings WHERE user_id = $1`,
      [user.id],
    )

    const settings = {
      currency: settingsRow?.currency || 'RUB',
      monthly_budget: Number(settingsRow?.monthly_budget ?? 45000),
      monthly_income: Number(settingsRow?.monthly_income ?? 0),
      allocations: (settingsRow?.allocations && typeof settingsRow.allocations === 'object'
        ? settingsRow.allocations
        : {}) as Record<string, number>,
    }

    const startOfMonth = `${monthKey()}-01`

    const [spent, receipts, byCat, bills, houses] = await Promise.all([
      q1<{ total: number; cnt: number }>(
        `SELECT coalesce(sum(total), 0)::bigint AS total, count(*)::int AS cnt
           FROM receipts
          WHERE user_id = $1 AND purchased_at >= $2::date`,
        [user.id, startOfMonth],
      ),
      q<Receipt>(
        `SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
           FROM receipts
          WHERE user_id = $1
          ORDER BY purchased_at DESC NULLS LAST, created_at DESC
          LIMIT 60`,
        [user.id],
      ),
      q<{ category: string; total: number }>(
        `SELECT category, coalesce(sum(total), 0)::bigint AS total
           FROM receipts
          WHERE user_id = $1 AND purchased_at >= $2::date
          GROUP BY category
          ORDER BY total DESC`,
        [user.id, startOfMonth],
      ),
      q<Bill & { cycle: string | null }>(
        `SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, p.cycle AS paid_cycle
           FROM recurring_bills b
           LEFT JOIN bill_pays p
                  ON p.bill_id = b.id AND p.cycle = $2 AND p.user_id = b.user_id
          WHERE b.user_id = $1
          ORDER BY b.day_of_month`,
        [user.id, monthKey()],
      ) as Promise<Array<Bill>>,
      q<HouseShort>(
        `SELECT h.id, h.name, h.code, h.owner_id,
                (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members
           FROM houses h
           JOIN house_members me ON me.house_id = h.id AND me.user_id = $1
          ORDER BY h.created_at`,
        [user.id],
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
        byCategory: (byCat ?? []).map((r) => ({ category: r.category, total: Number(r.total) })),
      },
      receipts: (receipts ?? []).map((r) => ({
        ...r,
        purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
        total: Number(r.total),
      })),
      bills: (bills ?? []).map((b) => ({ ...b, amount: Number(b.amount), day_of_month: Number(b.day_of_month) })),
      houses: houses ?? [],
    }
  },
)
