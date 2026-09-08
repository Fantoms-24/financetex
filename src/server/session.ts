'use server'

import { getRequestHeader } from '@tanstack/react-start/server'
import { q, q1 } from './db'

export interface SessionUser {
  id: string
  name: string
  email: string
  displayName: string
  role: string
  phone: string | null
  bank: string | null
}

export interface UserSettings {
  currency: string
  monthly_budget: number
  monthly_income: number
  allocations: Record<string, number>
  seen_welcome: boolean
}

function readToken(): string | null {
  let bearer: string | null = null
  let cookieHeader = ''
  try {
    const h = getRequestHeader('authorization') || ''
    if (h.toLowerCase().startsWith('bearer ')) bearer = h.slice(7).trim()
    if (!bearer) {
      const custom = getRequestHeader('x-chekagent-token')
      if (custom && typeof custom === 'string') bearer = custom.trim()
    }
    cookieHeader = getRequestHeader('cookie') || ''
  } catch {
    return null
  }
  if (!bearer && !cookieHeader) return null
  return bearer
}

function rawCookie(): string {
  try {
    return getRequestHeader('cookie') || ''
  } catch {
    return ''
  }
}

/** Токен берём из bearer (превью-Grok режет cookie) или из cookie (прод). */
export function getToken(): string | null {
  const b = readToken()
  if (b) return b
  const raw = rawCookie()
  if (!raw) return null
  const m = /(?:^|;\s*)(?:__Secure-)?chekagent\.session_token=([^;]+)/.exec(raw)
  return m ? decodeURIComponent(m[1]) : null
}

/** Better Auth сам проверяет сессию — не гадаем, как он хранит токен. */
/**
 * Better Auth 1.7 кладёт в cookie подписанное значение «<token>.<подпись>»,
 * а в теле ответа отдаёт голый token. Нам нужен один и тот же токен
 * и для bearer (превью-Grok режет cookie), и для cookie (прод),
 * поэтому откусываем подпись, если она есть.
 */
export function normalizeToken(raw: string | null | undefined): string | null {
  const v = (raw || '').trim()
  if (!v) return null
  const dot = v.indexOf('.')
  return dot > 0 ? v.slice(0, dot) : v
}

/**
 * Ядро: профиль по явному токену.
 *
 * Обязательно для момента входа/регистрации. Там сессия только что создана,
 * заголовки запроса её ещё не знают — ни bearer (клиент токена ещё не видел),
 * ни cookie (она уедет только в ответе). Если читать getToken(), получим null
 * и форма покажет «Не получилось войти» при живом и валидном токене.
 */
export async function getSessionUserByToken(
  rawToken: string | null | undefined,
): Promise<SessionUser | null> {
  const token = normalizeToken(rawToken)
  if (!token) return null

  try {
    const row = await q1<{
      user_id: string
      name: string
      email: string
      expires_at: string | Date
    }>(
      `SELECT u.id AS user_id, u.name, u.email, s."expiresAt" AS expires_at
         FROM "session" s
         JOIN "user" u ON u.id = s."userId"
        WHERE s.token = $1`,
      [token],
    )
    if (!row?.user_id) return null

    const exp = row.expires_at ? new Date(row.expires_at).getTime() : 0
    if (exp && exp < Date.now()) return null

    await ensureProfile(row.user_id, row.name || (row.email || '').split('@')[0] || 'Друг')
    const prof = await getProfile(row.user_id)
    return {
      id: row.user_id,
      name: row.name || '',
      email: row.email || '',
      displayName: prof?.display_name || row.name || (row.email || '').split('@')[0] || 'Друг',
      role: prof?.role || 'user',
      phone: prof?.phone ?? null,
      bank: prof?.bank ?? null,
    }
  } catch {
    return null
  }
}

/**
 * Сессию читаем сами: auth.api.getSession() верифицирует подпись cookie и
 * не понимает наш bearer, из-за чего каждый запрос считался бы «не вошли».
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  return getSessionUserByToken(getToken())
}

/** Выход: гасим сессию в БД, а не только cookie. */
export async function revokeCurrentSession(): Promise<void> {
  const token = normalizeToken(getToken())
  if (!token) return
  await q(`DELETE FROM "session" WHERE token = $1`, [token])
}

export async function requireUser(): Promise<SessionUser> {
  const u = await getSessionUser()
  if (!u) throw new Error('Войдите, чтобы продолжить')
  return u
}

export async function getProfile(userId: string) {
  return q1<{
    user_id: string
    display_name: string | null
    phone: string | null
    bank: string | null
    role: string
  }>(`SELECT user_id, display_name, phone, bank, role FROM profiles WHERE user_id = $1`, [userId])
}

export async function ensureProfile(userId: string, name: string) {
  await q(
    `INSERT INTO profiles (user_id, display_name, role) VALUES ($1, $2, 'user')
     ON CONFLICT (user_id) DO NOTHING`,
    [userId, name],
  )
  await q(
    `INSERT INTO user_settings (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
    [userId],
  )
}

export async function isAdmin(userId: string): Promise<boolean> {
  const p = await getProfile(userId)
  return (p?.role || '') === 'admin'
}

/** Ошибки — по-русски и коротко. */
export function friendly(e: unknown): string {
  const msg = (e as any)?.message || String(e || '')
  if (/войдите/i.test(msg)) return 'Войдите, чтобы продолжить'
  if (/уже есть|exists|duplicate/i.test(msg)) return 'Такой логин уже занят'
  if (/8 символ|password/i.test(msg)) return 'Пароль — минимум 8 символов'
  if (msg.length > 120) return 'Что-то пошло не так. Попробуйте ещё раз'
  return msg || 'Что-то пошло не так'
}

export async function guarded<T>(fn: (user: SessionUser) => Promise<T>): Promise<T | { error: string }> {
  try {
    const user = await requireUser()
    return await fn(user)
  } catch (e) {
    return { error: friendly(e) } as { error: string }
  }
}
