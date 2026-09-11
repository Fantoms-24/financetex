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

export function getToken(): string | null {
  const b = readToken()
  if (b) return b
  const raw = rawCookie()
  if (!raw) return null
  const m = /(?:^|;\s*)(?:__Secure-)?chekagent\.session_token=([^;]+)/.exec(raw)
  return m ? decodeURIComponent(m[1]) : null
}

function normalizeToken(raw: string | null): string | null {
  const v = (raw || '').trim()
  if (!v) return null
  const dot = v.indexOf('.')
  return dot > 0 ? v.slice(0, dot) : v
}

export async function getSessionUserByToken(rawToken: string | null): Promise<SessionUser | null> {
  const token = normalizeToken(rawToken)
  if (!token) return null
  try {
    const row = await q1<{
      user_id: string
      name: string | null
      email: string | null
      expires_at: string | Date | null
    }>(
      `SELECT u.id AS user_id, u.name, u.email, s."expiresAt" AS expires_at
         FROM "session" s
         JOIN "user" u ON u.id = s."userId"
        WHERE s.token = $1`,
      [token]
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
  } catch (error) {
    throw error
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  return getSessionUserByToken(getToken())
}

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
    [userId, name]
  )
  await q(
    `INSERT INTO user_settings (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
    [userId]
  )
}

export function friendly(e: any): string {
  const msg = e?.message || String(e || '')
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
  } catch (e: any) {
    return { error: friendly(e) }
  }
}
