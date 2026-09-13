export interface ReminderBill {
  id: string
  title: string
  amount: number
  day_of_month: number
  notify: boolean
  paused?: boolean
  paid_cycle?: string | null
}

export function notificationId(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0
  return 300000 + (Math.abs(hash) % 1_500_000_000)
}

/** One alarm per morning avoids Android's per-app idle-alarm quota.
 * Keep a rolling year, including paid bills' next unpaid cycles. */
export function buildBillReminderPlan(bills: ReminderBill[], now = new Date()) {
  const days = new Map<string, { at: Date; titles: string[]; total: number }>()
  for (let month = 0; month < 12; month++) {
    const first = new Date(now.getFullYear(), now.getMonth() + month, 1)
    const cycle = `${first.getFullYear()}-${String(first.getMonth() + 1).padStart(2, '0')}`
    const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
    for (const bill of bills) {
      if (!bill.notify || bill.paused || bill.paid_cycle === cycle) continue
      const due = new Date(first.getFullYear(), first.getMonth(), Math.min(lastDay, Math.max(1, bill.day_of_month)), 9)
      const at = new Date(due)
      at.setDate(at.getDate() - 1)
      let prefix = 'Завтра'
      if (at <= now) { at.setTime(due.getTime()); prefix = 'Сегодня' }
      if (at <= now) continue
      const key = `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, '0')}-${String(at.getDate()).padStart(2, '0')}`
      const group = days.get(key) || { at, titles: [], total: 0 }
      group.titles.push(`${prefix}: ${bill.title}`)
      group.total += Number(bill.amount)
      days.set(key, group)
    }
  }
  return [...days.entries()].sort((a, b) => a[1].at.getTime() - b[1].at.getTime()).map(([key, day]) => ({
    id: notificationId(`bills:${key}`),
    title: day.titles.length === 1 ? day.titles[0] : `Платежи: ${day.titles.length}`,
    body: `${day.titles.slice(0, 5).join('; ')}${day.titles.length > 5 ? '; …' : ''}. Всего ${Math.round(day.total).toLocaleString('ru-RU')} ₽.`,
    at: day.at,
  }))
}
