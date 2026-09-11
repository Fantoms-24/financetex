import { createHash, randomBytes } from 'node:crypto'
import { q, q1 } from './db'
import { HEAL_STATEMENTS } from './db/schema'
import { getAllConfig, setConfig, getLlmConfig, saveLlmConfig } from './config'
import { getBotInfo, getBotToken, getTelegramApiBase, saveTelegramConfig } from './telegram'
import { runTick, runEveningCheckin } from './tick'
import { countSubscriptions, getVapidPublic } from './push'

const FANTMS_PASS_KEY = 'fantms_admin_password_hash'
const FANTMS_SALT_KEY = 'fantms_admin_password_salt'
const FANTMS_SESSIONS_KEY = 'fantms_admin_sessions'

function hashPassword(password: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex')
}

/**
 * Проверка, задан ли уже мастер-пароль админ-панели
 */
export async function isFantmsPasswordInitialized(): Promise<boolean> {
  const row = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_PASS_KEY])
  return Boolean(row?.value && row.value.trim().length > 0)
}

/**
 * Инициализация мастер-пароля при первом входе
 */
export async function initFantmsMasterPassword(password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  const initialized = await isFantmsPasswordInitialized()
  if (initialized) {
    return { ok: false, error: 'Мастер-пароль уже установлен. Используйте форму входа.' }
  }

  const clean = password.trim()
  if (clean.length < 4) {
    return { ok: false, error: 'Пароль должен содержать минимум 4 символа.' }
  }

  const salt = randomBytes(16).toString('hex')
  const hash = hashPassword(clean, salt)

  await setConfig(FANTMS_SALT_KEY, salt)
  await setConfig(FANTMS_PASS_KEY, hash)

  const token = await createFantmsSession()
  return { ok: true, token }
}

/**
 * Вход по мастер-паролю
 */
export async function verifyFantmsLogin(password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  const passRow = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_PASS_KEY])
  const saltRow = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_SALT_KEY])

  if (!passRow?.value || !saltRow?.value) {
    return { ok: false, error: 'Мастер-пароль ещё не настроен.' }
  }

  const expectedHash = passRow.value.trim()
  const salt = saltRow.value.trim()
  const inputHash = hashPassword(password.trim(), salt)

  if (inputHash !== expectedHash) {
    return { ok: false, error: 'Неверный мастер-пароль администратора.' }
  }

  const token = await createFantmsSession()
  return { ok: true, token }
}

/**
 * Смена мастер-пароля (требует текущий пароль)
 */
export async function changeFantmsMasterPassword(
  oldPass: string,
  newPass: string,
): Promise<{ ok: boolean; error?: string }> {
  const check = await verifyFantmsLogin(oldPass)
  if (!check.ok) {
    return { ok: false, error: 'Текущий пароль указан неверно.' }
  }

  const cleanNew = newPass.trim()
  if (cleanNew.length < 4) {
    return { ok: false, error: 'Новый пароль должен содержать от 4 символов.' }
  }

  const newSalt = randomBytes(16).toString('hex')
  const newHash = hashPassword(cleanNew, newSalt)

  await setConfig(FANTMS_SALT_KEY, newSalt)
  await setConfig(FANTMS_PASS_KEY, newHash)

  return { ok: true }
}

/**
 * Создание сессии администратора
 */
async function createFantmsSession(): Promise<string> {
  const token = randomBytes(24).toString('hex')
  const sessionsRow = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_SESSIONS_KEY])
  let sessions: Array<{ token: string; expires: number }> = []
  try {
    if (sessionsRow?.value) {
      sessions = JSON.parse(sessionsRow.value)
    }
  } catch {}

  const now = Date.now()
  // Чистим старые сессии (храним 14 дней)
  sessions = sessions.filter((s) => s.expires > now)
  sessions.push({ token, expires: now + 14 * 24 * 3600 * 1000 })

  await setConfig(FANTMS_SESSIONS_KEY, JSON.stringify(sessions))
  return token
}

/**
 * Проверка валидности сессии администратора
 */
export async function validateFantmsSession(token?: string | null): Promise<boolean> {
  if (!token) return false
  const sessionsRow = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_SESSIONS_KEY])
  if (!sessionsRow?.value) return false

  try {
    const sessions: Array<{ token: string; expires: number }> = JSON.parse(sessionsRow.value)
    const now = Date.now()
    return sessions.some((s) => s.token === token && s.expires > now)
  } catch {
    return false
  }
}

/**
 * Отзыв сессии (выход)
 */
export async function revokeFantmsSession(token: string): Promise<void> {
  const sessionsRow = await q1<any>(`SELECT value FROM app_config WHERE key = $1`, [FANTMS_SESSIONS_KEY])
  if (!sessionsRow?.value) return

  try {
    const sessions: Array<{ token: string; expires: number }> = JSON.parse(sessionsRow.value)
    const filtered = sessions.filter((s) => s.token !== token)
    await setConfig(FANTMS_SESSIONS_KEY, JSON.stringify(filtered))
  } catch {}
}

/**
 * Системная сводка и ключевые метрики приложения
 */
export async function getFantmsOverviewData() {
  const [usersCount, receiptsStats, housesCount, splitsCount, pushSubsCount, recentUsers] =
    await Promise.all([
      q1<{ c: number }>(`SELECT count(*)::int AS c FROM "user"`),
      q1<{ c: number; total: string | number }>(
        `SELECT count(*)::int AS c, coalesce(sum(total), 0)::bigint AS total FROM receipts`,
      ),
      q1<{ c: number }>(`SELECT count(*)::int AS c FROM houses`),
      q1<{ c: number }>(`SELECT count(*)::int AS c FROM receipt_splits`),
      q1<{ c: number }>(`SELECT count(*)::int AS c FROM push_subs`),
      q<any>(
        `SELECT u.id, u.name, u.email, u."createdAt"::text AS created_at,
                count(r.id)::int AS receipts_count,
                coalesce(sum(r.total), 0)::bigint AS spent_total
           FROM "user" u
           LEFT JOIN receipts r ON r.user_id = u.id
          GROUP BY u.id, u.name, u.email, u."createdAt"
          ORDER BY u."createdAt" DESC
          LIMIT 15`,
      ),
    ])

  const llm = await getLlmConfig()
  const tgInfo = await getBotInfo()
  const vapid = await getVapidPublic()

  return {
    metrics: {
      users: usersCount?.c || 0,
      receipts: receiptsStats?.c || 0,
      totalSpent: Number(receiptsStats?.total || 0),
      houses: housesCount?.c || 0,
      splits: splitsCount?.c || 0,
      pushSubscribers: pushSubsCount?.c || 0,
    },
    recentUsers: (recentUsers ?? []).map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.created_at,
      receiptsCount: Number(u.receipts_count || 0),
      spentTotal: Number(u.spent_total || 0),
    })),
    services: {
      llmConfigured: Boolean(llm.apiKey),
      llmModel: llm.model,
      llmBaseUrl: llm.baseUrl,
      telegramConfigured: Boolean(tgInfo.username),
      telegramBotName: tgInfo.username,
      telegramBotTokenConfigured: Boolean(await getBotToken()),
      telegramApiUrl: await getTelegramApiBase(),
      vapidPublicKey: vapid,
    },
  }
}

/**
 * Пинг-тест подключения к ИИ
 */
export async function pingLlmService(): Promise<{ ok: boolean; pingMs?: number; reply?: string; error?: string }> {
  const { baseUrl, apiKey, model } = await getLlmConfig()
  if (!apiKey) {
    return { ok: false, error: 'API-ключ не заполнен. Вставьте ключ и сохраните.' }
  }

  const start = Date.now()
  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Ответь словом "OK"' }],
        max_tokens: 10,
        temperature: 0,
      }),
      signal: AbortSignal.timeout(15000),
    })

    const duration = Date.now() - start
    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      return {
        ok: false,
        pingMs: duration,
        error: `Ошибка сервиса (${res.status}): ${errText.slice(0, 160)}`,
      }
    }

    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'OK'
    return { ok: true, pingMs: duration, reply }
  } catch (err: any) {
    return { ok: false, pingMs: Date.now() - start, error: err?.message || 'Таймаут подключения к LLM' }
  }
}

/**
 * Детальная проверка Telegram-бота и Webhook
 */
export async function checkTelegramDeepStatus(): Promise<{
  ok: boolean
  botInfo?: any
  webhookInfo?: any
  error?: string
  cause?: string | null
  causeCode?: string | null
}> {
  const token = await getBotToken()
  if (!token) {
    return { ok: false, error: 'Токен бота не заполнен' }
  }

  try {
    const apiBase = await getTelegramApiBase()
    const [meRes, hookRes] = await Promise.all([
      fetch(`${apiBase}/bot${token}/getMe`, { signal: AbortSignal.timeout(15000) }).then((r) =>
        r.json(),
      ),
      fetch(`${apiBase}/bot${token}/getWebhookInfo`, {
        signal: AbortSignal.timeout(15000),
      }).then((r) => r.json()),
    ])

    return {
      ok: Boolean(meRes?.ok),
      botInfo: meRes?.result || null,
      webhookInfo: hookRes?.result || null,
      error: meRes?.ok ? undefined : meRes?.description || 'Не удалось получить данные бота',
    }
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message || 'Ошибка связи с Telegram API',
      cause: e?.cause ? String(e.cause?.message || e.cause?.code || e.cause) : null,
      causeCode: e?.cause?.code ? String(e.cause.code) : null,
    }
  }
}

/**
 * Принудительная установка Webhook на наш сервер или прокси
 */
export async function setTelegramWebhookAuto(
  customWebhookUrl?: string,
): Promise<{ ok: boolean; url?: string; description?: string }> {
  const token = await getBotToken()
  if (!token) return { ok: false, description: 'Токен бота отсутствует' }

  const appUrl = (process.env.BETTER_AUTH_URL || 'https://financetex.relaxdev.ru').replace(/\/+$/, '')
  const webhookUrl = (customWebhookUrl || `${appUrl}/api/telegram`).trim()

  try {
    const apiBase = await getTelegramApiBase()
    const res = await fetch(
      `${apiBase}/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`,
      {
        signal: AbortSignal.timeout(12000),
      },
    ).then((r) => r.json())

    return {
      ok: Boolean(res?.ok),
      url: webhookUrl,
      description: res?.description || (res?.ok ? 'Вебхук успешно установлен' : 'Ошибка установки вебхука'),
    }
  } catch (e: any) {
    return { ok: false, url: webhookUrl, description: e?.message || 'Ошибка сети' }
  }
}

/**
 * Восстановление схемы базы данных (Heal statements)
 */
export async function runDatabaseHealing(): Promise<{ ok: boolean; appliedCount: number; errors: string[] }> {
  let appliedCount = 0
  const errors: string[] = []

  for (const [name, sql] of HEAL_STATEMENTS) {
    try {
      await q(sql)
      appliedCount++
    } catch (e: any) {
      errors.push(`[${name}] ${e?.message || 'error'}`)
    }
  }

  return { ok: errors.length === 0, appliedCount, errors }
}
