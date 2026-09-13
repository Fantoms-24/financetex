import { dueDay } from '~/lib/finance'
import { monthKey } from '~/lib/format'
import { createHash } from 'node:crypto'
import { q, q1 } from './db'
import { sendToUser } from './push'

export function slotRank(offset: number): number {
  if (offset === 2) return 0
  if (offset === 1) return 1
  if (offset === 0) return 2
  return 3
}

export function parseAlertKey(key: string | null, cycle: string): number | null {
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

function reminderRevision(...parts: Array<string | number>): string {
  return createHash('sha256').update(parts.join('\u0000')).digest('base64url').slice(0, 10)
}

export async function runTick(now: Date = new Date()): Promise<{ checked: number; eligible: number; sent: number; failed: number; error?: string }> {
  const cycle = monthKey(now)
  const today = now.getDate()
  const result: { checked: number; eligible: number; sent: number; failed: number; error?: string } = { checked: 0, eligible: 0, sent: 0, failed: 0 }

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
      WHERE b.notify = true AND b.paused = false`,
    [cycle]
  )

  for (const b of personal ?? []) {
    result.checked++
    const offset = dueOffset(dueDay(Number(b.day_of_month),now), today)
    if (offset === null) continue
    if (b.paid) continue
    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue
    result.eligible++

    const isTomorrow = offset === 1
    const pushTitle = isTomorrow ? `🔔 Завтра платёж: ${b.title}` : b.title
    const pushBody = isTomorrow
      ? `Завтра спишется ${Number(b.amount).toLocaleString('ru-RU')} ₽ за «${b.title}». Проверьте баланс на карте 💳`
      : `${offsetLabel(offset)} списание ${Number(b.amount).toLocaleString('ru-RU')} ₽`

    const res = await sendToUser(b.user_id, {
      title: pushTitle,
      body: pushBody,
      data: {
        url: '/bills',
        type: 'bill-reminder',
        eventId: `bill:${b.id}:${cycle}:${offset}:${reminderRevision(b.title, b.amount, b.day_of_month)}`,
      },
    })
    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error
    if (res.sent > 0 && res.failed === 0) {
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
    const offset = dueOffset(dueDay(Number(b.day_of_month),now), today)
    if (offset === null) continue
    const already = parseAlertKey(b.last_alert_key, cycle)
    if (already !== null && already >= slotRank(offset)) continue
    result.eligible++

    const isTomorrow = offset === 1
    const pushTitle = isTomorrow ? `🔔 ${b.house_name} · Завтра платёж` : b.house_name
    const pushBody = isTomorrow
      ? `Завтра спишется ${b.title} (${Number(b.amount).toLocaleString('ru-RU')} ₽)`
      : `${offsetLabel(offset)} платёж: ${b.title} (${Number(b.amount).toLocaleString('ru-RU')} ₽)`

    const recipients=await q<{user_id:string}>(`SELECT m.user_id FROM house_members m WHERE m.house_id=$1 AND NOT EXISTS (SELECT 1 FROM house_bill_pays p WHERE p.bill_id=$2 AND p.cycle=$3 AND p.user_id=m.user_id)`,[b.house_id,b.id,cycle])
    const delivery=await Promise.all(recipients.map(m=>sendToUser(m.user_id, {
      title: pushTitle,
      body: pushBody,
      data: {
        url: `/groups/${b.house_id}`,
        type: 'house-bill-reminder',
        eventId: `house-bill:${b.id}:${cycle}:${offset}:${reminderRevision(b.title, b.amount, b.day_of_month)}`,
      },
    })))
    const res=delivery.reduce((sum,r)=>({sent:sum.sent+r.sent,failed:sum.failed+r.failed,error:r.error||sum.error}),{sent:0,failed:0,error:undefined as string|undefined})
    result.sent += res.sent
    result.failed += res.failed
    if (res.error) result.error = res.error
    if (res.sent > 0 && res.failed === 0) {
      await q(`UPDATE house_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id])
    }
  }

  return result
}

export async function runEveningCheckin(
  now: Date = new Date(),
  forceUserId?: string,
): Promise<{ sent: number; failed: number }> {
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
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
        WHERE user_id = $1 AND deleted_at IS NULL
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
      data: { url: '/', type: 'evening-checkin', ...(!forceUserId && { eventId: `evening:${u.user_id}:${todayKey}` }) },
    })
    result.sent += res.sent
    result.failed += res.failed
    if (res.sent > 0 && res.failed === 0 && !forceUserId) {
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
let schedulerRun: Promise<void> | null = null
let lastBillsDay = ''
let lastEveningDay = ''

function moscowTime(now: Date): Date {
  return new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60 * 1000)
}

async function schedulerPulse(now = new Date()): Promise<void> {
  const mskTime = moscowTime(now)
  const day = `${mskTime.getFullYear()}-${String(mskTime.getMonth() + 1).padStart(2, '0')}-${String(mskTime.getDate()).padStart(2, '0')}`
  const hour = mskTime.getHours()

  // A restart after the target time catches up the same day. Event-level delivery
  // records prevent a retry or a second server instance from producing duplicates.
  if (hour >= 9 && hour < 12 && lastBillsDay !== day) {
    await q(`DELETE FROM push_deliveries WHERE created_at < now() - interval '90 days'`).catch(() => {})
    const result = await runTick(mskTime)
    if (result.eligible === 0 && result.failed === 0) lastBillsDay = day
  }
  if (hour >= 21 && hour < 23 && lastEveningDay !== day) {
    const result = await runEveningCheckin(mskTime)
    if (result.sent > 0 && result.failed === 0) lastEveningDay = day
  }
}

function queueSchedulerPulse(): void {
  if (schedulerRun) return
  schedulerRun = schedulerPulse()
    .catch((error) => console.error('[scheduler] notification check failed:', error))
    .finally(() => { schedulerRun = null })
}

export function startBackgroundScheduler(): void {
  if (schedulerStarted || typeof window !== 'undefined' || process.env.DISABLE_NOTIFICATION_SCHEDULER === '1') return
  schedulerStarted = true

  // Vercel uses the two authenticated jobs in vercel.json. Starting another
  // pulse inside the same serverless invocation would race the requested job.
  if (process.env.VERCEL) return

  queueSchedulerPulse()
  // Node servers keep this timer. Serverless instances still perform the
  // immediate catch-up pulse on each cold start.
  if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const timer = setInterval(queueSchedulerPulse, 60 * 1000)
    timer.unref?.()
  }

  console.log('[scheduler] notification scheduler active (09:00 bills, 21:00 check-in MSK)')
}
