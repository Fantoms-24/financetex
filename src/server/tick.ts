import { monthKey } from '~/lib/format'
import { q, q1 } from './db'
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

    const isTomorrow = offset === 1
    const pushTitle = isTomorrow ? `🔔 Завтра платёж: ${b.title}` : b.title
    const pushBody = isTomorrow
      ? `Завтра спишется ${Number(b.amount).toLocaleString('ru-RU')} ₽ за «${b.title}». Проверьте баланс на карте 💳`
      : `${offsetLabel(offset)} списание ${Number(b.amount).toLocaleString('ru-RU')} ₽`

    const res = await sendToUser(b.user_id, {
      title: pushTitle,
      body: pushBody,
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

    const isTomorrow = offset === 1
    const pushTitle = isTomorrow ? `🔔 ${b.house_name} · Завтра платёж` : b.house_name
    const pushBody = isTomorrow
      ? `Завтра спишется ${b.title} (${Number(b.amount).toLocaleString('ru-RU')} ₽)`
      : `${offsetLabel(offset)} платёж: ${b.title} (${Number(b.amount).toLocaleString('ru-RU')} ₽)`

    const res = await notifyHouseExcept(b.house_id, null, {
      title: pushTitle,
      body: pushBody,
      data: { url: `/groups/${b.house_id}`, type: 'house-bill-reminder' },
    })
    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error
    if (res.sent > 0) {
      await q(`UPDATE house_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id])
    }
  }

  // Вечерний чекин итогов дня (если запуск происходит с 20:30 до 22:30)
  const hour = now.getHours()
  if (hour >= 20 && hour <= 22) {
    await runEveningCheckin(now).catch(() => {})
  }

  return result
}

export async function runEveningCheckin(
  now: Date = new Date(),
  forceUserId?: string,
): Promise<{ sent: number; failed: number }> {
  const todayKey = now.toISOString().slice(0, 10)
  const result = { sent: 0, failed: 0 }

  const users = forceUserId
    ? await q<{ user_id: string }>(`SELECT DISTINCT user_id FROM push_subs WHERE user_id = $1`, [forceUserId])
    : await q<{ user_id: string }>(
        `SELECT DISTINCT s.user_id
           FROM push_subs s
           LEFT JOIN user_settings us ON us.user_id = s.user_id
          WHERE s.user_id IS NOT NULL
            AND (us.evening_checkin IS NULL OR us.evening_checkin = true)
            AND (us.last_checkin_date IS NULL OR us.last_checkin_date != $1)`,
        [todayKey],
      )

  for (const u of users ?? []) {
    if (!u.user_id) continue

    // Проверяем траты пользователя за сегодняшний день
    const spentRow = await q1<{ total: number }>(
      `SELECT coalesce(sum(total), 0)::bigint AS total
         FROM receipts
        WHERE user_id = $1
          AND (purchased_at::date = $2::date OR (purchased_at IS NULL AND created_at::date = $2::date))`,
      [u.user_id, todayKey],
    ).catch(() => null)

    const daySpent = Number(spentRow?.total || 0)
    let pushTitle = '🌿 Листок · День экономии'
    let pushBody = 'День подошёл к концу. Листок сохранил 🌿 хороший день экономии!'

    if (daySpent > 0) {
      pushTitle = '🌿 Листок · Итоги дня'
      pushBody = `День подошёл к концу: сегодня учтено ${daySpent.toLocaleString('ru-RU')} ₽. Листок сохранил ваш баланс 🌿`
    }

    const res = await sendToUser(u.user_id, {
      title: pushTitle,
      body: pushBody,
      data: { url: '/', type: 'evening-checkin' },
    })
    result.sent += res.sent
    result.failed += res.failed
    if (res.sent > 0 && !forceUserId) {
      await q(
        `UPDATE user_settings SET last_checkin_date = $1 WHERE user_id = $2`,
        [todayKey, u.user_id],
      )
    }
  }

  return result
}

// Автономный фоновый планировщик для RelaxDev (Node.js сервер)
let schedulerStarted = false

export function startBackgroundScheduler(): void {
  if (schedulerStarted || typeof window !== 'undefined') return
  schedulerStarted = true

  // Проверка каждые 15 минут
  const intervalMs = 15 * 60 * 1000
  setInterval(async () => {
    try {
      const now = new Date()
      // Московское время (UTC+3)
      const mskTime = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60 * 1000)
      const hour = mskTime.getHours()
      const minute = mskTime.getMinutes()

      // 1. Утренние напоминания о счетах: 09:00 - 09:20 MSK
      if (hour === 9 && minute < 20) {
        console.log('[scheduler] Running morning bills tick (09:00 MSK)...')
        await runTick(mskTime)
      }

      // 2. Вечерний чекин в 21:00: 21:00 - 21:20 MSK
      if (hour === 21 && minute < 20) {
        console.log('[scheduler] Running evening checkin (21:00 MSK)...')
        await runEveningCheckin(mskTime)
      }
    } catch (err) {
      console.error('[scheduler] Background push error:', err)
    }
  }, intervalMs)

  console.log('[scheduler] Background push scheduler active (09:00 bills, 21:00 checkin MSK)')
}

