import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getRequestHeader, setCookie } from '@tanstack/react-start/server'
import { getAuth, normalizeEmail } from '../auth'
import { friendly, getSessionUser, getSessionUserByToken, revokeCurrentSession, type SessionUser } from '../session'

function incomingHeaders(): Headers {
  const h = new Headers()
  const pass = ['origin', 'referer', 'cookie', 'user-agent', 'x-forwarded-host', 'x-forwarded-proto']
  for (const k of pass) {
    try {
      const v = getRequestHeader(k as any)
      if (v) h.set(k, String(v))
    } catch {
      /* вне запроса */
    }
  }
  return h
}

function isSecure(): boolean {
  const prod = (process.env.BETTER_AUTH_URL || process.env.APP_URL || '').trim()
  if (prod.startsWith('https://')) return true
  try {
    const o = getRequestHeader('origin') as string | undefined
    if (o && o.startsWith('https://')) return true
  } catch {
    /* */
  }
  return false
}

export const COOKIE_NAME = 'chekagent.session_token'

function putCookie(token: string) {
  const sec = isSecure()
  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: sec,
    // SameSite=None без Secure отвергается браузером. На http — Lax
    // (same-origin и так работает), на https — None (cross-origin iframe).
    sameSite: sec ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 60,
  })
}

export interface AuthResult {
  ok: boolean
  token: string | null
  user: SessionUser | null
  error?: string
}

/**
 * Better Auth 1.7 отдаёт токен по-разному:
 *   signUpEmail -> { token, user }
 *   signInEmail -> { token, user }
 *   но в других версиях бывает { user, session: { token } }.
 * Принимаем оба варианта, чтобы вход не ломался от смены минорной версии.
 */
export function pickToken(res: any): string | null {
  return (
    res?.token ||
    res?.session?.token ||
    res?.session?.id ||
    null
  )
}

async function shape(user: any, token: string | null): Promise<AuthResult> {
  if (!user?.id || !token) return { ok: false, token: null, user: null, error: 'Не получилось войти' }
  putCookie(token)
  // Профиль — по токену явно, а не через getSessionUser(): сессия только что
  // создана, в заголовках запроса её ещё нет (ни bearer, ни cookie), поэтому
  // getSessionUser() здесь всегда null и вход ломался на живом токене.
  const su = await getSessionUserByToken(token)
  if (!su) return { ok: false, token: null, user: null, error: 'Не получилось войти' }
  return { ok: true, token, user: su }
}

export const signIn = createServerFn({ method: 'POST' })
  .validator((d: { login: string; password: string }) => ({
    login: String(d.login || '').trim(),
    password: String(d.password || ''),
  }))
  .handler(async ({ data }): Promise<AuthResult> => {
    try {
      if (!data.login) return { ok: false, token: null, user: null, error: 'Впишите логин' }
      if (data.password.length < 8) return { ok: false, token: null, user: null, error: 'Пароль — минимум 8 символов' }

      const res: any = await getAuth().api.signInEmail({
        body: { email: normalizeEmail(data.login), password: data.password },
        headers: incomingHeaders(),
      })
      return await shape(res?.user, pickToken(res))
    } catch (e: any) {
      const code = e?.body?.code || e?.code
      if (code === 'INVALID_EMAIL_OR_PASSWORD' || e?.status === 401) {
        return { ok: false, token: null, user: null, error: 'Неверный логин или пароль' }
      }
      return { ok: false, token: null, user: null, error: friendly(e) }
    }
  })

export const signUp = createServerFn({ method: 'POST' })
  .validator((d: { login: string; password: string; name?: string }) => ({
    login: String(d.login || '').trim(),
    password: String(d.password || ''),
    name: String(d.name || '').trim(),
  }))
  .handler(async ({ data }): Promise<AuthResult> => {
    try {
      if (!data.login) return { ok: false, token: null, user: null, error: 'Впишите логин' }
      if (data.password.length < 8) return { ok: false, token: null, user: null, error: 'Пароль — минимум 8 символов' }

      const res: any = await getAuth().api.signUpEmail({
        body: {
          email: normalizeEmail(data.login),
          password: data.password,
          name: data.name || data.login,
        },
        headers: incomingHeaders(),
      })
      return await shape(res?.user, pickToken(res))
    } catch (e: any) {
      const code = e?.body?.code || e?.code
      if (code === 'USER_ALREADY_EXISTS' || /already/i.test(String(e?.message))) {
        return { ok: false, token: null, user: null, error: 'Такой логин уже занят' }
      }
      return { ok: false, token: null, user: null, error: friendly(e) }
    }
  })

export const getMe = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ user: SessionUser | null }> => {
    const user = await getSessionUser()
    return { user }
  },
)

export const signOut = createServerFn({ method: 'POST' }).handler(async () => {
  try {
    await revokeCurrentSession()
  } catch {
    /* уже вышли */
  }
  try {
    await getAuth().api.signOut({ headers: incomingHeaders() })
  } catch {
    /* не критично: сессия уже погашена в БД */
  }
  try {
    deleteCookie(COOKIE_NAME, { path: '/' })
  } catch {
    /* */
  }
  return { ok: true }
})
