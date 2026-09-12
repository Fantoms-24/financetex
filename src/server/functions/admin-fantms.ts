import { createServerFn } from '@tanstack/react-start'
import {
  isFantmsPasswordInitialized,
  initFantmsMasterPassword,
  verifyFantmsLogin,
  changeFantmsMasterPassword,
  validateFantmsSession,
  revokeFantmsSession,
  getFantmsOverviewData,
  pingLlmService,
  checkTelegramDeepStatus,
  setTelegramWebhookAuto,
  runDatabaseHealing,
} from '../fantms'
import { getLlmConfig, getFullLlmConfig, saveLlmConfig } from '../config'
import { saveTelegramConfig } from '../telegram'
import { runTick, runEveningCheckin } from '../tick'

async function assertAdminToken(token?: string | null): Promise<void> {
  const valid = await validateFantmsSession(token)
  if (!valid) {
    throw new Error('UNAUTHORIZED_FANTMS_ADMIN')
  }
}

/**
 * Проверка статуса админки: инициализирован ли пароль и валиден ли переданный токен
 */
export const getFantmsStatus = createServerFn({ method: 'GET' })
  .validator((d?: { token?: string | null }) => ({
    token: d?.token ? String(d.token).trim() : null,
  }))
  .handler(async ({ data }) => {
    const isInitialized = await isFantmsPasswordInitialized()
    const isAuthenticated = await validateFantmsSession(data?.token)
    return {
      isInitialized,
      isAuthenticated,
    }
  })

/**
 * Первоначальное задание мастер-пароля
 */
export const initFantmsPassword = createServerFn({ method: 'POST' })
  .validator((d: { password: string }) => ({
    password: String(d.password || ''),
  }))
  .handler(async ({ data }) => {
    const res = await initFantmsMasterPassword(data.password)
    return res
  })

/**
 * Вход в панель управления по мастер-паролю
 */
export const loginFantms = createServerFn({ method: 'POST' })
  .validator((d: { password: string }) => ({
    password: String(d.password || ''),
  }))
  .handler(async ({ data }) => {
    const res = await verifyFantmsLogin(data.password)
    return res
  })

/**
 * Выход из панели управления
 */
export const logoutFantms = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    if (data.token) {
      await revokeFantmsSession(data.token)
    }
    return { ok: true }
  })

/**
 * Смена мастер-пароля
 */
export const changeFantmsPassword = createServerFn({ method: 'POST' })
  .validator((d: { token: string; oldPass: string; newPass: string }) => ({
    token: String(d.token || '').trim(),
    oldPass: String(d.oldPass || ''),
    newPass: String(d.newPass || ''),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await changeFantmsMasterPassword(data.oldPass, data.newPass)
    return res
  })

/**
 * Получение системного обзора и статистики
 */
export const getFantmsOverview = createServerFn({ method: 'GET' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const overview = await getFantmsOverviewData()
    return { ok: true, ...overview }
  })

/**
 * Сохранение параметров ИИ
 */
export const saveFantmsLlm = createServerFn({ method: 'POST' })
  .validator((d: {
    token: string
    baseUrl?: string
    apiKey?: string
    model?: string
    fallbackBaseUrl?: string
    fallbackApiKey?: string
    fallbackModel?: string
  }) => ({
    token: String(d.token || '').trim(),
    baseUrl: d.baseUrl !== undefined ? String(d.baseUrl).trim() : undefined,
    apiKey: d.apiKey !== undefined ? String(d.apiKey).trim() : undefined,
    model: d.model !== undefined ? String(d.model).trim() : undefined,
    fallbackBaseUrl: d.fallbackBaseUrl !== undefined ? String(d.fallbackBaseUrl).trim() : undefined,
    fallbackApiKey: d.fallbackApiKey !== undefined ? String(d.fallbackApiKey).trim() : undefined,
    fallbackModel: d.fallbackModel !== undefined ? String(d.fallbackModel).trim() : undefined,
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    await saveLlmConfig({
      baseUrl: data.baseUrl,
      apiKey: data.apiKey,
      model: data.model,
      fallbackBaseUrl: data.fallbackBaseUrl,
      fallbackApiKey: data.fallbackApiKey,
      fallbackModel: data.fallbackModel,
    })
    const full = await getFullLlmConfig()
    return {
      ok: true,
      hasKey: Boolean(full.primary.apiKey),
      model: full.primary.model,
      baseUrl: full.primary.baseUrl,
      hasFallbackKey: Boolean(full.fallback.apiKey),
      fallbackModel: full.fallback.model,
      fallbackBaseUrl: full.fallback.baseUrl,
    }
  })

/**
 * Тестирование связи с ИИ
 */
export const testFantmsLlm = createServerFn({ method: 'POST' })
  .validator((d: { token: string; target?: 'primary' | 'fallback' | 'auto' }) => ({
    token: String(d.token || '').trim(),
    target: d.target || 'auto',
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await pingLlmService(data.target)
    return res
  })

/**
 * Сохранение конфигурации Telegram-бота
 */
export const saveFantmsTelegram = createServerFn({ method: 'POST' })
  .validator((d: { token: string; botToken?: string; botName?: string; apiUrl?: string }) => ({
    token: String(d.token || '').trim(),
    botToken: d.botToken !== undefined ? String(d.botToken).trim() : undefined,
    botName: d.botName !== undefined ? String(d.botName).trim() : undefined,
    apiUrl: d.apiUrl !== undefined ? String(d.apiUrl).trim() : undefined,
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await saveTelegramConfig(data.botToken, data.botName, data.apiUrl)
    return res
  })

/**
 * Глубокая проверка Telegram-бота
 */
export const testFantmsTelegram = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await checkTelegramDeepStatus()
    return res
  })

/**
 * Перепривязка Webhook Telegram
 */
export const setFantmsWebhook = createServerFn({ method: 'POST' })
  .validator((d: { token: string; webhookUrl?: string }) => ({
    token: String(d.token || '').trim(),
    webhookUrl: d.webhookUrl !== undefined ? String(d.webhookUrl).trim() : undefined,
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await setTelegramWebhookAuto(data.webhookUrl)
    return res
  })

/**
 * Восстановление целостности БД
 */
export const healDatabaseAction = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await runDatabaseHealing()
    return res
  })

/**
 * Запуск тика напоминаний по счетам
 */
export const triggerTickAction = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await runTick()
    return { ok: true, ...res }
  })

/**
 * Запуск вечерней проверки
 */
export const triggerEveningAction = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await runEveningCheckin()
    return { ok: true, ...res }
  })
