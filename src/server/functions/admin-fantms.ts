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
import { getLlmConfig, saveLlmConfig } from '../config'
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
  .validator((d: { token: string; baseUrl?: string; apiKey?: string; model?: string }) => ({
    token: String(d.token || '').trim(),
    baseUrl: d.baseUrl !== undefined ? String(d.baseUrl).trim() : undefined,
    apiKey: d.apiKey !== undefined ? String(d.apiKey).trim() : undefined,
    model: d.model !== undefined ? String(d.model).trim() : undefined,
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    await saveLlmConfig({
      baseUrl: data.baseUrl,
      apiKey: data.apiKey,
      model: data.model,
    })
    const cfg = await getLlmConfig()
    return { ok: true, hasKey: Boolean(cfg.apiKey), model: cfg.model, baseUrl: cfg.baseUrl }
  })

/**
 * Тестирование связи с ИИ
 */
export const testFantmsLlm = createServerFn({ method: 'POST' })
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await pingLlmService()
    return res
  })

/**
 * Сохранение конфигурации Telegram-бота
 */
export const saveFantmsTelegram = createServerFn({ method: 'POST' })
  .validator((d: { token: string; botToken?: string; botName?: string }) => ({
    token: String(d.token || '').trim(),
    botToken: d.botToken !== undefined ? String(d.botToken).trim() : undefined,
    botName: d.botName !== undefined ? String(d.botName).trim() : undefined,
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await saveTelegramConfig(data.botToken, data.botName)
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
  .validator((d: { token: string }) => ({
    token: String(d.token || '').trim(),
  }))
  .handler(async ({ data }) => {
    await assertAdminToken(data.token)
    const res = await setTelegramWebhookAuto()
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
