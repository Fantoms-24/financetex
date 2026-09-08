import { monthKey } from '~/lib/format'
import { q } from './db'
import { sendToUser, notifyHouseExcept } from './push'

function slotRank(offset: number): number {
  if (offset === 2) return 0
  if (offset === 1) return 1
  if (offset === 0) return 2
  return 3
}

function parseAlertKey(key: string | null, cycle: string): number | null {
  if (!key) return null
  const [c, o] = String(key).split(':')
  if (c !== cycle) return null
  const n = Number(o)
  return Number.isFinite(n) ? slotRank(n) : null
}

function offsetLabel(offset: number): string {
  if (offset === 0) return 'Сегодня'
  if (offset === 1) return 'Завтра'
  if (offset === 2) return 'Через 2 дня'
  return 'Просрочен'
}

function dueOffset(dayOfMonth: number, today: number): number | null {
  const diff = dayOfMonth - today
  if (diff === 2) return 2
  if (diff === 1) return 1
  if (diff === 0) return 0
  if (diff < 0) return -1
  return null
}

export async function runTick(now: Date = new Date()): Promise<{ checked: number; sent: number; failed: number; error?: string }> {
  const cycle = monthKey(now)
  const today = now.getDate()
  const result: { checked: number; sent: number; failed: number; error?: string } = { checked: 0, sent: 0, failed: 0 }

  const personal = await q<{
    id: string
    user_id: string
    title: string
    amount: number
    day_of_month: number
    last_alert_key: string | null
    paid: string | null
  }>(
    `SELECT b.id, b.user_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            p.cycle AS paid
       FROM recurring_bills b
       LEFT JOIN bill_pays p ON p.bill_id = b.id AND p.cycle = $1 AND p.user_id = b.user_id
      WHERE b.notify = true`,
    [cycle]
  )

  for (const b of personal ?? []) {
    result.checked++
    const offset = dueOffset(Number(b.day_of_month), today)
    if (offset === null) continue
    if (b.paid) continue
    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue
    const res = await sendToUser(b.user_id, {
      title: `⚡ Листок · ${b.title}`,
      body: `${offsetLabel(offset)} списание ${Number(b.amount).toLocaleString('ru-RU')} ₽. Нажмите для отметки.`,
      data: { url: '/bills', type: 'bill-reminder' },
    })
    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error
    if (res.sent > 0) {
      await q(`UPDATE recurring_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id])
    }
  }

  const houseBills = await q<{
    id: string
    house_id: string
    title: string
    amount: number
    day_of_month: number
    last_alert_key: string | null
    house_name: string
  }>(
    `SELECT b.id, b.house_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            h.name AS house_name
       FROM house_bills b
       JOIN houses h ON h.id = b.house_id`,
    []
  )

  for (const b of houseBills ?? []) {
    result.checked++
    const offset = dueOffset(Number(b.day_of_month), today)
    if (offset === null) continue
    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue
    const res = await notifyHouseExcept(b.house_id, null, {
      title: `👥 ${b.house_name} · ${b.title}`,
      body: `${offsetLabel(offset)} списание ${Number(b.amount).toLocaleString('ru-RU')} ₽`,
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
