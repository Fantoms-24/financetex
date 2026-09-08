import { monthKey } from '~/lib/format'
import { q } from './db'
import { notifyHouseExcept, sendToUser } from './push'
import { slotRank, parseAlertKey } from './functions/bills'

function offsetLabel(offset: number): string {
  if (offset === 0) return 'Сегодня'
  if (offset === 1) return 'Завтра'
  if (offset === 2) return 'Через 2 дня'
  return 'Просрочен'
}

interface DueBill {
  id: string
  title: string
  amount: number
  day_of_month: number
  last_alert_key: string | null
}

/** offset: 2 / 1 / 0 / −1 (просрочен). null — сегодня напоминать не надо. */
function dueOffset(dayOfMonth: number, today: number): number | null {
  const diff = dayOfMonth - today
  if (diff === 2) return 2
  if (diff === 1) return 1
  if (diff === 0) return 0
  if (diff < 0) return -1
  return null
}

export interface TickResult {
  checked: number
  sent: number
  failed: number
  error?: string
}

/**
 * Ежедневный обход платежей. Слот не сгорает вхолостую:
 * last_alert_key пишем только если реально ушло (sent > 0).
 */
export async function runTick(now: Date = new Date()): Promise<TickResult> {
  const cycle = monthKey(now)
  const today = now.getDate()
  const result: TickResult = { checked: 0, sent: 0, failed: 0 }

  // ---- личные платежи ----
  const personal = await q<DueBill & { user_id: string; paid: string | null }>(
    `SELECT b.id, b.user_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            p.cycle AS paid
       FROM recurring_bills b
       LEFT JOIN bill_pays p ON p.bill_id = b.id AND p.cycle = $1 AND p.user_id = b.user_id
      WHERE b.notify = true`,
    [cycle],
  )

  for (const b of personal ?? []) {
    result.checked++
    const offset = dueOffset(Number(b.day_of_month), today)
    if (offset === null) continue
    if (b.paid) continue

    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue

    const res = await sendToUser(b.user_id, {
      title: b.title,
      body: `${offsetLabel(offset)} — ${Number(b.amount).toLocaleString('ru-RU')} ₽`,
      data: { url: '/bills', type: 'bill-reminder' },
    })

    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error

    // слот не сгорает: ключ пишем только при реальной доставке
    if (res.sent > 0) {
      await q(`UPDATE recurring_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id])
    }
  }

  // ---- платежи касс ----
  const houseBills = await q<DueBill & { house_id: string; house_name: string }>(
    `SELECT b.id, b.house_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            h.name AS house_name
       FROM house_bills b
       JOIN houses h ON h.id = b.house_id`,
    [],
  )

  for (const b of houseBills ?? []) {
    result.checked++
    const offset = dueOffset(Number(b.day_of_month), today)
    if (offset === null) continue

    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue

    const res = await notifyHouseExcept(b.house_id, null, {
      title: `${b.house_name} · ${b.title}`,
      body: `${offsetLabel(offset)} — ${Number(b.amount).toLocaleString('ru-RU')} ₽`,
      data: { url: `/groups/${b.house_id}`, type: 'house-bill-reminder' },
    })

    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error

    if (res.sent > 0) {
      await q(`UPDATE house_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id])
    }
  }

  return result
}
