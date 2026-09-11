'use server'

import { networkInterfaces } from 'node:os'
import { betterAuth, type BetterAuthOptions } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { getKysely } from './db/kysely'

const DEV_SECRET = 'chekagent-dev-secret-please-set-BETTER_AUTH_SECRET-32ch'

/** Логин без @ → {login}@chekagent.app */
export function normalizeEmail(login: string): string {
  const v = (login || '').trim()
  return v.includes('@') ? v.toLowerCase() : `${v.toLowerCase()}@chekagent.app`
}

function trustedOrigins(): Array<string> {
  const list = process.env.NODE_ENV === 'production' ? [] : [
    'http://localhost:8080','http://127.0.0.1:8080','http://localhost:3000','http://127.0.0.1:3000',
  ]
  const prod = (process.env.BETTER_AUTH_URL || process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || '').trim()
  if (prod) list.push(prod.replace(/\/+$/, ''))
  const renderExternal = process.env.RENDER_EXTERNAL_URL?.trim()
  if (renderExternal) list.push(renderExternal.replace(/\/+$/, ''))
  const vercel = process.env.VERCEL_URL
  if (vercel) list.push(`https://${vercel}`)
  const extra = (process.env.TRUSTED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  // Телефон в той же Wi-Fi сети ходит на LAN-IP, а он меняется от сети к сети.
  // В dev доверяем своим локальным адресам — на проде их просто не будет.
  if (process.env.NODE_ENV !== 'production') {
    for (const iface of Object.values(networkInterfaces())) {
      for (const n of iface || []) {
        if (n.family === 'IPv4' && !n.internal) {
          extra.push(`http://${n.address}:8080`, `https://${n.address}:8080`)
        }
      }
    }
  }

  return [...new Set([...list, ...extra])]
}

let instance: ReturnType<typeof betterAuth> | null = null

/** VK ID включается только когда на сервере есть оба ключа. Никогда не отдаём их в браузер. */
export function isVkAuthEnabled(): boolean {
  return Boolean(
    (process.env.VK_CLIENT_ID || '').trim() &&
    (process.env.VK_CLIENT_SECRET || '').trim(),
  )
}

export function getAuth() {
  if (instance) return instance

  const prodUrl = (process.env.BETTER_AUTH_URL || process.env.APP_URL || '').trim()
  const secure = prodUrl.startsWith('https://')
  const vkClientId = (process.env.VK_CLIENT_ID || '').trim()
  const vkClientSecret = (process.env.VK_CLIENT_SECRET || '').trim()

  if (process.env.NODE_ENV === 'production' && ((process.env.BETTER_AUTH_SECRET || '').trim().length < 32 || process.env.BETTER_AUTH_SECRET===DEV_SECRET)) {
    throw new Error('Для запуска сервера задайте отдельный секрет авторизации')
  }
  const opts: BetterAuthOptions = {
    basePath: '/api/auth',
    secret: (process.env.BETTER_AUTH_SECRET || '').trim() || DEV_SECRET,
    baseURL: prodUrl || undefined,
    database: { db: getKysely(), type: 'postgres', casing: 'camel', transaction: false },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      requireEmailVerification: false,
      autoSignIn: true,
    },
    session: {
      // «не стирать токен таймером»
      expiresIn: 60 * 60 * 24 * 60,
      updateAge: 60 * 60 * 24 * 7,
      freshAge: 60 * 60 * 24 * 30,
      cookieCache: { enabled: false },
    },
    user: { changeEmail: { enabled: false }, deleteUser: { enabled: false } },
    // Новая VK-личность не должна получать доступ к существующему бюджету
    // только из-за совпадения строки email. Явную привязку добавим отдельным
    // действием из уже авторизованного аккаунта.
    account: { accountLinking: { disableImplicitLinking: true } },
    socialProviders: isVkAuthEnabled()
      ? {
          vk: {
            clientId: vkClientId,
            clientSecret: vkClientSecret,
            // VK ID не всегда возвращает email (например, если он не был
            // предоставлен в профиле). Для «Листка» он не нужен: личность
            // определяется постоянным VK user_id. Better Auth, напротив,
            // требует email для первой записи пользователя — создаём
            // технический, стабильный адрес только в этом редком случае.
            // Реальный email, если VK его прислал, не заменяем.
            mapProfileToUser: (profile) => {
              const vkUserId = String(profile?.user?.user_id || '').trim()
              return vkUserId
                ? { email: profile.user.email || `vk-${vkUserId}@id.listok.local` }
                : {}
            },
          },
        }
      : undefined,
    trustedOrigins: trustedOrigins(),
    plugins: [tanstackStartCookies()],
    advanced: {
      cookiePrefix: 'chekagent',
      useSecureCookies: secure,
      // превью Grok шлёт Origin: https://grok.com — иначе 403 Invalid origin
      disableCSRFCheck: false,
      defaultCookieAttributes: {
        httpOnly: true,
        secure,
        // sameSite=None без Secure браузер отвергает («SameSite=None cookies must
        // have the Secure attribute»). На http (dev) — Lax, на https (Vercel /
        // Grok-iframe) — None. Better Auth печёт атрибуты в инстанс, поэтому
        // выбираем один раз, ориентируясь на продовый URL.
        sameSite: 'lax',
        path: '/',
      },
      // id генерируем в JS: в таблицах id text PRIMARY KEY без DEFAULT,
      // поэтому generateId:false приводил к «null value in column "id"».
    },
  }

  instance = betterAuth(opts)
  return instance
}

export const AUTH_COOKIE_RE = /(?:^|;\s*)(?:__Secure-)?chekagent\.session_token=([^;]+)/
