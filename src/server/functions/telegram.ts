import { createServerFn } from '@tanstack/react-start'
import { q, q1 } from '../db'
import { guarded } from '../session'
import { getBotInfo, saveTelegramConfig } from '../telegram'

export interface TelegramState {
  connected: boolean
  username: string | null
  chatId: string | null
  linkCode?: string | null
  botUrl?: string | null
  botName: string | null
  isBotConfigured: boolean
}

/**
 * Получение статуса привязки и генерация кода для Telegram
 */
export const getTelegramStatus = createServerFn({ method: 'GET' }).handler(async () =>
  guarded(async (user): Promise<TelegramState> => {
    const link = await q1<any>(
      `SELECT chat_id, username FROM user_telegram WHERE user_id = $1`,
      [user.id],
    )

    const info = await getBotInfo()
    const botName = info.username
    const isBotConfigured = Boolean(botName)

    if (link && link.chat_id) {
      return {
        connected: true,
        username: link.username || null,
        chatId: link.chat_id,
        botName,
        isBotConfigured,
        botUrl: botName ? `https://t.me/${botName}` : null,
      }
    }

    // Создаём 6-значный одноразовый код привязки
    const code = 'LST-' + Math.floor(1000 + Math.random() * 9000).toString()
    await q(`DELETE FROM telegram_link_tokens WHERE user_id = $1`, [user.id])
    await q(
      `INSERT INTO telegram_link_tokens (code, user_id, expires_at)
       VALUES ($1, $2, now() + interval '24 hours')`,
      [code, user.id],
    )

    return {
      connected: false,
      username: null,
      chatId: null,
      linkCode: code,
      botName,
      isBotConfigured,
      botUrl: botName ? `https://t.me/${botName}?start=${code}` : null,
    }
  }),
)

/**
 * Сохранение токена или имени бота из настроек
 */
export const saveBotSettings = createServerFn({ method: 'POST' })
  .validator((d: { botToken?: string; botName?: string }) => ({
    botToken: d.botToken !== undefined ? String(d.botToken).trim() : undefined,
    botName: d.botName !== undefined ? String(d.botName).trim() : undefined,
  }))
  .handler(async ({ data }) =>
    guarded(async () => {
      const res = await saveTelegramConfig(data.botToken, data.botName)
      return res
    }),
  )

/**
 * Отключение Telegram от аккаунта
 */
export const unlinkTelegram = createServerFn({ method: 'POST' }).handler(async () =>
  guarded(async (user) => {
    await q(`DELETE FROM user_telegram WHERE user_id = $1`, [user.id])
    await q(`DELETE FROM telegram_link_tokens WHERE user_id = $1`, [user.id])
    return { ok: true }
  }),
)
