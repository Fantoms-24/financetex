import { createServerFn } from '@tanstack/react-start'
import { q, q1 } from '../db'
import { guarded } from '../session'
import { getBotUsername } from '../telegram'

export interface TelegramState {
  connected: boolean
  username: string | null
  chatId: string | null
  linkCode?: string | null
  botUrl?: string
  botName: string
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

    const botName = getBotUsername()

    if (link && link.chat_id) {
      return {
        connected: true,
        username: link.username || null,
        chatId: link.chat_id,
        botName,
        botUrl: `https://t.me/${botName}`,
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
      botUrl: `https://t.me/${botName}?start=${code}`,
    }
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
