import { newId, q, q1 } from './db'
import { categoryLabel, money, monthKey, parseMagicExpense } from '~/lib/format'

export async function getBotToken(): Promise<string> {
  const envToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
  if (envToken) return envToken
  const row = await q1<any>(`SELECT value FROM app_config WHERE key = 'telegram_bot_token'`)
  return (row?.value || '').trim()
}

export function getTelegramApiBase(): string {
  return (process.env.TELEGRAM_API_URL || 'https://api.telegram.org').replace(/\/+$/, '')
}

let cachedBotInfo: { username: string; firstName: string } | null = null

export async function getBotInfo(): Promise<{ username: string | null; firstName: string | null }> {
  if (cachedBotInfo) return cachedBotInfo

  const token = await getBotToken()
  if (token) {
    try {
      const apiBase = getTelegramApiBase()
      const res = await fetch(`${apiBase}/bot${token}/getMe`, {
        signal: AbortSignal.timeout(15000),
      }).then((r) => r.json())
      if (res?.ok && res?.result?.username) {
        cachedBotInfo = {
          username: res.result.username,
          firstName: res.result.first_name || '',
        }
        await q(
          `INSERT INTO app_config (key, value, updated_at) VALUES ('telegram_bot_name', $1, now())
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
          [res.result.username],
        )
        return cachedBotInfo
      } else {
        console.error('[telegram] getMe returned error:', res)
      }
    } catch (e: any) {
      console.error('[telegram] Failed to query getMe:', e?.message || e, e?.cause)
    }
  }

  const envName = (process.env.TELEGRAM_BOT_NAME || '').replace('@', '').trim()
  if (envName && envName !== 'listok_finance_bot') {
    return { username: envName, firstName: null }
  }

  const row = await q1<any>(`SELECT value FROM app_config WHERE key = 'telegram_bot_name'`)
  const dbName = (row?.value || '').replace('@', '').trim()
  if (dbName) {
    return { username: dbName, firstName: null }
  }

  return { username: null, firstName: null }
}

export async function saveTelegramConfig(
  botToken?: string,
  botName?: string,
): Promise<{ ok: boolean; username?: string | null; error?: string }> {
  if (botToken !== undefined) {
    const cleanToken = botToken.trim()
    await q(
      `INSERT INTO app_config (key, value, updated_at) VALUES ('telegram_bot_token', $1, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [cleanToken],
    )
    cachedBotInfo = null
  }
  if (botName !== undefined) {
    const cleanName = botName.replace('@', '').trim()
    await q(
      `INSERT INTO app_config (key, value, updated_at) VALUES ('telegram_bot_name', $1, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [cleanName],
    )
    cachedBotInfo = null
  }

  const info = await getBotInfo()
  const token = await getBotToken()
  if (token) {
    try {
      const appUrl = (process.env.BETTER_AUTH_URL || 'https://financetex.relaxdev.ru').replace(/\/+$/, '')
      const webhookRes = await fetch(
        `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(`${appUrl}/api/telegram`)}&drop_pending_updates=true`,
      ).then((r) => r.json())
      console.log('[telegram] saveTelegramConfig setWebhook result:', webhookRes)
    } catch (err) {
      console.error('[telegram] Failed to setWebhook in saveTelegramConfig:', err)
    }
  }

  return { ok: true, username: info.username }
}

function escapeHtml(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Отправка сообщения в Telegram чат
 */
export async function sendTelegram(chatId: string | number, text: string): Promise<boolean> {
  const token = await getBotToken()
  if (!token) {
    console.warn(`[telegram:mock] No bot token configured! To ${chatId}: ${text}`)
    return false
  }

  try {
    const apiBase = getTelegramApiBase()
    const res = await fetch(`${apiBase}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error(`[telegram] sendMessage HTML failed (${res.status}): ${errText}`)
      // Fallback: Telegram rejects message if HTML entities are invalid
      const plainText = text.replace(/<[^>]+>/g, '')
      const retryRes = await fetch(`${apiBase}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: plainText,
        }),
        signal: AbortSignal.timeout(15000),
      })
      if (!retryRes.ok) {
        const retryErr = await retryRes.text().catch(() => '')
        console.error(`[telegram] sendMessage plain text fallback failed (${retryRes.status}): ${retryErr}`)
        return false
      }
      return true
    }

    return true
  } catch (err) {
    console.error('[telegram] Failed to send message:', err)
    return false
  }
}

function makeReply(chatId: string | number, text: string) {
  // Фоновая попытка (если доступен прокси или прямая сеть)
  sendTelegram(chatId, text).catch(() => {})
  // Прямой ответ Telegram в тело HTTP-ответа вебхука (работает даже при блокировке исходящих соединений!)
  return {
    method: 'sendMessage',
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  }
}

/**
 * Обработка входящего обновления от Telegram Webhook
 */
export async function processTelegramWebhook(body: any): Promise<{ ok: boolean; status?: string; reply?: any }> {
  if (!body || !body.message) return { ok: true, status: 'no_message' }

  const msg = body.message
  const chatId = String(msg.chat?.id || '')
  const text = String(msg.text || '').trim()
  const fromUser = msg.from || {}
  const username = fromUser.username ? `@${fromUser.username}` : fromUser.first_name || null

  if (!chatId || !text) return { ok: true }

  // 1. Команда /start с кодом привязки или без
  if (text.startsWith('/start')) {
    const parts = text.split(/\s+/)
    const rawCode = (parts[1] || '').trim().toUpperCase()

    if (rawCode) {
      const tokenRow = await q1<any>(
        `SELECT user_id FROM telegram_link_tokens WHERE code = $1 AND expires_at > now()`,
        [rawCode],
      )

      if (tokenRow && tokenRow.user_id) {
        // Предотвращаем конфликт уникальности по user_id или chat_id
        await q(`DELETE FROM user_telegram WHERE user_id = $1 OR chat_id = $2`, [tokenRow.user_id, chatId])
        await q(
          `INSERT INTO user_telegram (user_id, chat_id, username, first_name)
           VALUES ($1, $2, $3, $4)`,
          [tokenRow.user_id, chatId, username, fromUser.first_name || ''],
        )
        await q(`DELETE FROM telegram_link_tokens WHERE code = $1`, [rawCode])

        const replyText =
          `🌿 <b>Листок успешно подключен!</b>\n\n` +
          `Привет, ${escapeHtml(fromUser.first_name || 'друг')}! Теперь вы можете прямо сюда отправлять любые траты.\n\n` +
          `Например:\n` +
          `• <code>Такси 450</code>\n` +
          `• <code>Пятёрочка 1820</code>\n` +
          `• <code>Обед 650</code>\n` +
          `• <code>250 кофе</code>\n\n` +
          `Листок моментально запишет расход и покажет ваш актуальный остаток на день.`

        return { ok: true, status: 'linked', reply: makeReply(chatId, replyText) }
      } else {
        const replyText =
          `🌿 <b>Код привязки не найден или его срок истёк.</b>\n\n` +
          `Откройте приложение <b>Листок</b> (https://financetex.relaxdev.ru), перейдите в <b>Настройки</b> → <b>Telegram-бот</b> и нажмите «Подключить в 1 клик» снова.`

        return { ok: true, status: 'code_expired', reply: makeReply(chatId, replyText) }
      }
    }

    const existing = await q1<any>(`SELECT user_id FROM user_telegram WHERE chat_id = $1`, [chatId])
    if (existing) {
      const replyText =
        `🌿 <b>Вы подключены к Листку!</b>\n\n` +
        `Просто напишите сумму и название траты прямо в этот чат (например: <code>Такси 350</code> или <code>Кофе 250</code>), и я внесу её в журнал расходов.\n\n` +
        `Или отправьте <code>/balance</code> для проверки остатка на сегодня.`

      return { ok: true, reply: makeReply(chatId, replyText) }
    } else {
      const replyText =
        `🌿 <b>Привет от Листка!</b>\n\n` +
        `Я помогаю вести учет расходов и экономить без рутины прямо из Telegram.\n\n` +
        `Чтобы связать бота с вашим аккаунтом:\n` +
        `1. Откройте приложение <b>Листок</b> (https://financetex.relaxdev.ru)\n` +
        `2. Перейдите в <b>Настройки</b> → <b>Telegram-бот</b>\n` +
        `3. Нажмите кнопку <b>«Подключить в 1 клик»</b> или отправьте сюда ваш код привязки (например: <code>LST-1234</code>).`

      return { ok: true, reply: makeReply(chatId, replyText) }
    }
  }

  // 2. Команда /unlink
  if (text === '/unlink' || text === '/disconnect') {
    await q(`DELETE FROM user_telegram WHERE chat_id = $1`, [chatId])
    const replyText = `🌿 Telegram отключен от вашего аккаунта в Листке.`
    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  // 3. Проверяем привязку для обычных сообщений
  const userRow = await q1<any>(`SELECT user_id FROM user_telegram WHERE chat_id = $1`, [chatId])
  if (!userRow || !userRow.user_id) {
    // Пользователь мог отправить код привязки напрямую (например: LST-1234)
    const upperCode = text.toUpperCase().trim()
    if (upperCode.startsWith('LST-') || /^[A-Z0-9-]{6,12}$/.test(upperCode)) {
      const tokenRow = await q1<any>(
        `SELECT user_id FROM telegram_link_tokens WHERE code = $1 AND expires_at > now()`,
        [upperCode],
      )
      if (tokenRow && tokenRow.user_id) {
        await q(`DELETE FROM user_telegram WHERE user_id = $1 OR chat_id = $2`, [tokenRow.user_id, chatId])
        await q(
          `INSERT INTO user_telegram (user_id, chat_id, username, first_name)
           VALUES ($1, $2, $3, $4)`,
          [tokenRow.user_id, chatId, username, fromUser.first_name || ''],
        )
        await q(`DELETE FROM telegram_link_tokens WHERE code = $1`, [upperCode])

        const replyText =
          `🌿 <b>Листок успешно подключен!</b>\n\n` +
          `Привет, ${escapeHtml(fromUser.first_name || 'друг')}! Теперь вы можете прямо сюда отправлять любые траты.\n\n` +
          `Например:\n` +
          `• <code>Такси 450</code>\n` +
          `• <code>Пятёрочка 1820</code>\n` +
          `• <code>250 кофе</code>`

        return { ok: true, status: 'linked', reply: makeReply(chatId, replyText) }
      }
    }

    const replyText =
      `🌿 Чтобы записывать расходы через Telegram, сначала подключите бота в приложении Листок (раздел <b>Настройки</b> → <b>Telegram-бот</b>).`

    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  const userId = userRow.user_id

  // 4. Команда баланса
  if (text === '/balance' || text === '/today' || text === 'Баланс' || text === 'баланс') {
    const settings = await q1<any>(
      `SELECT monthly_budget FROM user_settings WHERE user_id = $1`,
      [userId],
    )
    const budget = Number(settings?.monthly_budget || 45000)
    const startOfMonth = `${monthKey()}-01`

    const spentRow = await q1<any>(
      `SELECT coalesce(sum(total), 0)::bigint AS total
         FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date`,
      [userId, startOfMonth],
    )
    const spent = Number(spentRow?.total || 0)
    const left = budget - spent

    const now = new Date()
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const daysLeft = Math.max(1, lastDay - now.getDate())
    const dailyLeft = Math.max(0, Math.round(left / daysLeft))

    const replyText =
      `🌿 <b>Ваш баланс в Листке:</b>\n\n` +
      `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `💳 Потрачено за месяц: ${money(spent)}\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b> (из ${money(budget)})`

    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  // 5. Разбор быстрого расхода
  const parsed = parseMagicExpense(text)
  if (parsed.amount && parsed.amount > 0) {
    const id = newId('r')
    const store = parsed.title || 'Покупка из Telegram'
    const category = parsed.category || 'other'

    await q(
      `INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note)
       VALUES ($1, $2, $3, current_date, $4, $5, $6)`,
      [id, userId, store, parsed.amount, category, 'Записано через Telegram'],
    )

    const settings = await q1<any>(
      `SELECT monthly_budget FROM user_settings WHERE user_id = $1`,
      [userId],
    )
    const budget = Number(settings?.monthly_budget || 45000)
    const startOfMonth = `${monthKey()}-01`

    const spentRow = await q1<any>(
      `SELECT coalesce(sum(total), 0)::bigint AS total
         FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date`,
      [userId, startOfMonth],
    )
    const spent = Number(spentRow?.total || 0)
    const left = budget - spent

    const now = new Date()
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const daysLeft = Math.max(1, lastDay - now.getDate())
    const dailyLeft = Math.max(0, Math.round(left / daysLeft))

    const replyText =
      `🌿 <b>Расход записан в Листок!</b>\n\n` +
      `💳 <b>${escapeHtml(store)}</b>: ${money(parsed.amount)}\n` +
      `📂 Категория: <i>${categoryLabel(category)}</i>\n\n` +
      `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b>`

    return { ok: true, status: 'recorded', reply: makeReply(chatId, replyText) }
  }

  const replyText =
    `🌿 Не удалось определить сумму.\n\n` +
    `Попробуйте написать проще, например:\n` +
    `• <code>Такси 450</code>\n` +
    `• <code>Продукты 1850</code>\n` +
    `• <code>350 кофе</code>\n\n` +
    `Или отправьте <code>/balance</code> для проверки остатка.`

  return { ok: true, reply: makeReply(chatId, replyText) }
}
