import webpush from 'web-push'
import { newId, q, q1 } from './db'

export interface PushPayload {
  title: string
  body: string
  data?: { url?: string; type?: string; [k: string]: unknown }
}

let vapidReady: { publicKey: string; privateKey: string; subject: string } | null = null

/** subject для Apple — строго mailto:… или https://host без пути. */
export function sanitizeSubject(raw: string | undefined, fallbackHost?: string): string {
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

/** Стабильная VAPID-пара: из env, иначе из таблицы push_vapid (создаётся один раз). */
export async function getVapid(): Promise<{ publicKey: string; privateKey: string; subject: string }> {
  if (vapidReady) return vapidReady

  const envPub = process.env.VAPID_PUBLIC_KEY?.trim()
  const envPriv = process.env.VAPID_PRIVATE_KEY?.trim()
  const subject = sanitizeSubject(process.env.VAPID_SUBJECT, hostFromEnv())

  if (envPub && envPriv) {
    vapidReady = { publicKey: envPub, privateKey: envPriv, subject }
    webpush.setVapidDetails(subject, envPub, envPriv)
    return vapidReady
  }

  let row = await q1<{ public: string; private: string; subject: string | null }>(
    `SELECT public, private, subject FROM push_vapid WHERE id = 1`,
  )

  if (!row?.public || !row?.private) {
    const keys = webpush.generateVAPIDKeys()
    await q(
      `INSERT INTO push_vapid (id, public, private, subject, created_at) VALUES (1, $1, $2, $3, now())
       ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public, private = EXCLUDED.private, subject = EXCLUDED.subject`,
      [keys.publicKey, keys.privateKey, subject],
    )
    row = { public: keys.publicKey, private: keys.privateKey, subject }
    console.warn('[push] VAPID keys generated and stored — задайте их в env, чтобы не ротировать на деплое')
  }

  const useSubject = sanitizeSubject(row.subject || undefined, hostFromEnv())
  vapidReady = { publicKey: row.public, privateKey: row.private, subject: useSubject }
  webpush.setVapidDetails(useSubject, row.public, row.private)
  return vapidReady
}

export async function getVapidPublic(): Promise<string> {
  return (await getVapid()).publicKey
}

type Sub = { id: string; endpoint: string; p256dh: string; auth: string; user_id: string | null }

async function deliver(subs: Array<Sub>, payload: PushPayload): Promise<{ sent: number; failed: number; error?: string }> {
  if (!subs.length) return { sent: 0, failed: 0 }
  const { publicKey, privateKey, subject } = await getVapid()
  webpush.setVapidDetails(subject, publicKey, privateKey)

  let sent = 0
  let failed = 0
  let lastError: string | undefined

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify(payload),
          { TTL: 60 * 60 * 12, urgency: 'high', topic: payload.data?.type || 'chekagent' },
        )
        sent++
      } catch (e: any) {
        failed++
        const code = e?.statusCode ?? e?.status
        lastError = `${code ?? 'ERR'}: ${e?.body || e?.message || 'unknown'}`
        if (code === 404 || code === 410 || code === 403) {
          await q(`DELETE FROM push_subs WHERE id = $1`, [s.id]).catch(() => {})
        }
      }
    }),
  )

  return { sent, failed, error: lastError }
}

export async function sendToUser(userId: string, payload: PushPayload) {
  const subs = await q<Sub>(
    `SELECT id, endpoint, p256dh, auth, user_id FROM push_subs WHERE user_id = $1`,
    [userId],
  )
  return deliver(subs, payload)
}

/** Пуш всем участникам кассы, кроме автора. Экран выключен / приложение закрыто — неважно. */
export async function notifyHouseExcept(houseId: string, authorId: string | null, payload: PushPayload) {
  const subs = await q<Sub>(
    `SELECT s.id, s.endpoint, s.p256dh, s.auth, s.user_id
       FROM push_subs s
       JOIN house_members m ON m.user_id = s.user_id AND m.house_id = $1
      WHERE ($2::text IS NULL OR s.user_id <> $2)`,
    [houseId, authorId],
  )
  return deliver(subs, payload)
}

export async function saveSubscription(userId: string, sub: { endpoint: string; keys: { p256dh: string; auth: string } }) {
  const vapidPub = await getVapidPublic().catch(() => '')
  await q(
    `INSERT INTO push_subs (id, user_id, endpoint, p256dh, auth, vapid_pub, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, now())
     ON CONFLICT (endpoint) DO UPDATE
        SET user_id = EXCLUDED.user_id,
            p256dh = EXCLUDED.p256dh,
            auth = EXCLUDED.auth,
            vapid_pub = EXCLUDED.vapid_pub`,
    [newId('ps'), userId, sub.endpoint, sub.keys?.p256dh || '', sub.keys?.auth || '', vapidPub],
  )
}

export async function removeSubscription(endpoint: string) {
  await q(`DELETE FROM push_subs WHERE endpoint = $1`, [endpoint])
}

export async function countSubscriptions(userId: string) {
  const row = await q1<{ c: number }>(`SELECT count(*)::int AS c FROM push_subs WHERE user_id = $1`, [userId])
  return row?.c ?? 0
}
