import webpush from 'web-push'
import { q, q1, newId } from './db'
import { createHash } from 'node:crypto'

let vapidReady: { publicKey: string; privateKey: string; subject: string } | null = null
let vapidLoading: Promise<{ publicKey: string; privateKey: string; subject: string }> | null = null
const PUSH_HOSTS = new Set([
  'fcm.googleapis.com',
  'android.googleapis.com',
  'web.push.apple.com',
  'push.services.mozilla.com',
  'updates.push.services.mozilla.com',
])

export function validPushSubscription(sub: { endpoint?: string; p256dh?: string; auth?: string }): boolean {
  try {
    const endpoint = String(sub.endpoint || '')
    const url = new URL(endpoint)
    const host = url.hostname.toLowerCase()
    const allowedHost = PUSH_HOSTS.has(host) || host.endsWith('.notify.windows.com')
    const keyPattern = /^[A-Za-z0-9_\-=]+$/
    return endpoint.length <= 4096 && url.protocol === 'https:' && !url.username && !url.password && allowedHost
      && String(sub.p256dh || '').length >= 40 && String(sub.p256dh || '').length <= 256 && keyPattern.test(String(sub.p256dh))
      && String(sub.auth || '').length >= 8 && String(sub.auth || '').length <= 128 && keyPattern.test(String(sub.auth))
  } catch {
    return false
  }
}

function sanitizeSubject(raw?: string, fallbackHost?: string): string {
  const s = (raw || '').trim()
  if (/^mailto:.+@.+\..+/.test(s)) return s
  if (/^https:\/\/[^\s/]+$/.test(s)) return s
  if (/^https?:\/\/([^\s/]+)/.test(s)) return `https://${RegExp.$1}`
  if (s && !s.includes('@') && !s.includes(':')) return `https://${s}`
  return fallbackHost ? `https://${fallbackHost}` : 'mailto:hello@chekagent.app'
}

function hostFromEnv(): string | undefined {
  const u = process.env.BETTER_AUTH_URL || process.env.APP_URL || process.env.VERCEL_URL
  if (!u) return undefined
  try {
    return new URL(u.startsWith('http') ? u : `https://${u}`).host
  } catch {
    return undefined
  }
}

export async function getVapid(): Promise<{ publicKey: string; privateKey: string; subject: string }> {
  if (vapidReady) return vapidReady
  if (!vapidLoading) vapidLoading = loadVapid().catch(error => { vapidLoading = null; throw error })
  return vapidLoading
}

async function loadVapid(): Promise<{ publicKey: string; privateKey: string; subject: string }> {
  const envPub = process.env.VAPID_PUBLIC_KEY?.trim()
  const envPriv = process.env.VAPID_PRIVATE_KEY?.trim()
  const subject = sanitizeSubject(process.env.VAPID_SUBJECT, hostFromEnv())

  if (envPub && envPriv) {
    vapidReady = { publicKey: envPub, privateKey: envPriv, subject }
    webpush.setVapidDetails(subject, envPub, envPriv)
    return vapidReady
  }

  let row = await q1<{ public: string; private: string; subject: string }>(
    `SELECT public, private, subject FROM push_vapid WHERE id = 1`
  )

  if (!row?.public || !row?.private) {
    const keys = webpush.generateVAPIDKeys()
    await q(
      `INSERT INTO push_vapid (id, public, private, subject, created_at) VALUES (1, $1, $2, $3, now())
       ON CONFLICT (id) DO NOTHING`,
      [keys.publicKey, keys.privateKey, subject]
    )
    row = await q1<{ public: string; private: string; subject: string }>(`SELECT public, private, subject FROM push_vapid WHERE id = 1`)
    console.warn('[push] VAPID keys generated and stored — задайте их в env, чтобы не ротировать на деплое')
  }

  if (!row?.public || !row.private) throw new Error('Не удалось загрузить ключи уведомлений')

  const useSubject = sanitizeSubject(row.subject || undefined, hostFromEnv())
  vapidReady = { publicKey: row.public, privateKey: row.private, subject: useSubject }
  webpush.setVapidDetails(useSubject, row.public, row.private)
  return vapidReady
}

export async function getVapidPublic(): Promise<string> {
  return (await getVapid()).publicKey
}

async function deliver(
  subs: Array<{ id?: string; endpoint: string; p256dh: string; auth: string; user_id?: string }>,
  payload: any
): Promise<{ sent: number; failed: number; error?: string }> {
  if (!subs.length) return { sent: 0, failed: 0 }
  const invalid = subs.filter(s => !validPushSubscription(s))
  const deliverable = subs.filter(s => validPushSubscription(s))
  await Promise.all(invalid.map(s => s.id ? q(`DELETE FROM push_subs WHERE id = $1`, [s.id]).catch(() => {}) : Promise.resolve()))
  if (!deliverable.length) return { sent: 0, failed: invalid.length, error: invalid.length ? 'Сохранённая подписка повреждена и удалена' : undefined }
  const { publicKey, privateKey, subject } = await getVapid()
  webpush.setVapidDetails(subject, publicKey, privateKey)

  let sent = 0
  let failed = invalid.length
  let lastError: string | undefined = invalid.length ? 'Сохранённая подписка повреждена и удалена' : undefined

  await Promise.all(
    deliverable.map(async (s) => {
      const eventKey = payload.data?.eventId as string | undefined
      const tracked = Boolean(eventKey && s.id)
      try {
        if (tracked) {
          const claim = await q1(`INSERT INTO push_deliveries (event_key, subscription_id, claimed_until)
            VALUES ($1, $2, now() + interval '2 minutes')
            ON CONFLICT (event_key, subscription_id) DO UPDATE SET claimed_until = EXCLUDED.claimed_until
            WHERE push_deliveries.delivered_at IS NULL AND push_deliveries.claimed_until <= now()
            RETURNING event_key`, [eventKey, s.id])
          if (!claim) {
            const previous = await q1<{ delivered_at: string | null }>(`SELECT delivered_at FROM push_deliveries WHERE event_key = $1 AND subscription_id = $2`, [eventKey, s.id])
            if (previous?.delivered_at) sent++
            else failed++ // Another worker owns it; don't mark the entire reminder complete.
            return
          }
        }
        const options: webpush.RequestOptions = {
          TTL: payload.data?.type === 'test' ? 60
            : payload.data?.type === 'evening-checkin' ? 2 * 60 * 60
            : eventKey ? 4 * 60 * 60
            : 12 * 60 * 60,
          urgency: 'high',
          timeout: 10000,
        }
        // Only retries of this exact event may replace one another.
        if (eventKey) options.topic = createHash('sha256').update(eventKey).digest('base64url').slice(0, 32)

        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify(payload),
          options
        )
        if (tracked) await q(`UPDATE push_deliveries SET delivered_at = now() WHERE event_key = $1 AND subscription_id = $2`, [eventKey, s.id])
        sent++
      } catch (e: any) {
        failed++
        const code = e?.statusCode ?? e?.status
        lastError = `${code ?? 'ERR'}: ${e?.body || e?.message || 'unknown'}`
        console.error(`[push] delivery failed: ${lastError}`)
        if (tracked) await q(`UPDATE push_deliveries SET claimed_until = now() WHERE event_key = $1 AND subscription_id = $2 AND delivered_at IS NULL`, [eventKey, s.id]).catch(() => {})
        // 404 и 410 означают, что подписка окончательно отозвана клиентом
        if (code === 404 || code === 410) {
          if (s.id) {
            await q(`DELETE FROM push_subs WHERE id = $1`, [s.id]).catch(() => {})
          }
        }
      }
    })
  )

  return { sent, failed, error: lastError }
}

export async function sendToUser(userId: string, payload: any): Promise<{ sent: number; failed: number; error?: string }> {
  const subs = await q<{ id: string; endpoint: string; p256dh: string; auth: string; user_id: string }>(
    `SELECT id, endpoint, p256dh, auth, user_id FROM push_subs WHERE user_id = $1`,
    [userId]
  )
  return deliver(subs, payload)
}

export async function notifyHouseExcept(
  houseId: string,
  authorId: string | null,
  payload: any
): Promise<{ sent: number; failed: number; error?: string }> {
  const subs = await q<{ id: string; endpoint: string; p256dh: string; auth: string; user_id: string }>(
    `SELECT s.id, s.endpoint, s.p256dh, s.auth, s.user_id
       FROM push_subs s
       JOIN house_members m ON m.user_id = s.user_id AND m.house_id = $1
      WHERE ($2::text IS NULL OR s.user_id <> $2)`,
    [houseId, authorId]
  )
  return deliver(subs, payload)
}

export async function saveSubscription(
  userId: string,
  sub: { endpoint: string; keys: { p256dh: string; auth: string } }
): Promise<void> {
  const vapidPub = await getVapidPublic().catch(() => '')
  await q(
    `INSERT INTO push_subs (id, user_id, endpoint, p256dh, auth, vapid_pub, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, now())
     ON CONFLICT (endpoint) DO UPDATE
        SET user_id = EXCLUDED.user_id,
            p256dh = EXCLUDED.p256dh,
            auth = EXCLUDED.auth,
            vapid_pub = EXCLUDED.vapid_pub`,
    [newId('ps'), userId, sub.endpoint, sub.keys?.p256dh || '', sub.keys?.auth || '', vapidPub]
  )
}

export async function removeSubscription(userId: string, endpoint: string): Promise<void> {
  await q(`DELETE FROM push_subs WHERE endpoint = $1 AND user_id = $2`, [endpoint, userId])
}

export async function countSubscriptions(userId: string): Promise<number> {
  const rows = await q<{ id: string; endpoint: string; p256dh: string; auth: string }>(
    `SELECT id, endpoint, p256dh, auth FROM push_subs WHERE user_id = $1`,
    [userId],
  )
  const invalid = rows.filter(row => !validPushSubscription(row))
  if (invalid.length) await q(`DELETE FROM push_subs WHERE id = ANY($1::text[])`, [invalid.map(row => row.id)])
  return rows.length - invalid.length
}
