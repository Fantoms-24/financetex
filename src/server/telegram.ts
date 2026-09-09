import { newId, q, q1 } from './db'
import { categoryLabel, money, monthKey, parseMagicExpense } from '~/lib/format'

export function getBotToken(): string {
  return (process.env.TELEGRAM_BOT_TOKEN || '').trim()
}

export function getBotUsername(): string {
  return (process.env.TELEGRAM_BOT_NAME || 'listok_finance_bot').replace('@', '').trim()
}

/**
 * Отправка сообщения в Telegram чат
 */
export async function sendTelegram(chatId: string | number, text: string): Promise<boolean> {
  const token = getBotToken()
  if (!token) {
    console.log(`[telegram:mock] To ${chatId}: ${text}`)
    return false
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
    return res.ok
  } catch (err) {
    console.error('[telegram] Failed to send message:', err)
    return false
  }
}

/**
 * Обработка входящего обновления от Telegram Webhook
 */
export async function processTelegramWebhook(body: any): Promise<{ ok: boolean; status?: string }> {
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
        await q(
          `INSERT INTO user_telegram (user_id, chat_id, username, first_name)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id) DO UPDATE
             SET chat_id = $2, username = $3, first_name = $4`,
          [tokenRow.user_id, chatId, username, fromUser.first_name || ''],
        )
        await q(`DELETE FROM telegram_link_tokens WHERE code = $1`, [rawCode])

        await sendTelegram(
          chatId,
          `🌿 <b>Листок успешно подключен!</b>\n\n` +
            `Привет, ${fromUser.first_name || 'друг'}! Теперь вы можете прямо сюда отправлять любые траты.\n\n` +
            `Например:\n` +
            `• <code>Такси 450</code>\n` +
            `• <code>Пятёрочка 1820</code>\n` +
            `• <code>Обед 650</code>\n` +
            `• <code>250 кофе</code>\n\n` +
            `Листок моментально запишет расход и покажет ваш актуальный остаток на день.`,
        )
        return { ok: true, status: 'linked' }
      }
    }

    const existing = await q1<any>(`SELECT user_id FROM user_telegram WHERE chat_id = $1`, [chatId])
    if (existing) {
      await sendTelegram(
        chatId,
        `🌿 <b>Вы уже подключены к Листку!</b>\n\n` +
          `Просто напишите сумму и название траты (например: <code>Такси 350</code>), и я внесу её в журнал.`,
      )
    } else {
      await sendTelegram(
        chatId,
        `🌿 <b>Привет от Листка!</b>\n\n` +
          `Чтобы подключить аккаунт:\n` +
          `1. Откройте приложение <b>Листок</b>\n` +
          `2. Зайдите в <b>Настройки</b> → <b>Telegram-бот</b>\n` +
          `3. Нажмите кнопку подключения или отправьте мне полученный код.`,
      )
    }
    return { ok: true }
  }

  // 2. Команда /unlink
  if (text === '/unlink' || text === '/disconnect') {
    await q(`DELETE FROM user_telegram WHERE chat_id = $1`, [chatId])
    await sendTelegram(chatId, `🌿 Telegram отключен от вашего аккаунта в Листке.`)
    return { ok: true }
  }

  // 3. Проверяем привязку для обычных сообщений
  const userRow = await q1<any>(`SELECT user_id FROM user_telegram WHERE chat_id = $1`, [chatId])
  if (!userRow || !userRow.user_id) {
    await sendTelegram(
      chatId,
      `🌿 Чтобы записывать расходы через Telegram, сначала подключите бота в приложении Листок (раздел <b>Настройки</b>).`,
    )
    return { ok: true }
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

    await sendTelegram(
      chatId,
      `🌿 <b>Ваш баланс в Листке:</b>\n\n` +
        `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
        `💳 Потрачено за месяц: ${money(spent)}\n` +
        `📦 Остаток на месяц: <b>${money(left)}</b> (из ${money(budget)})`,
    )
    return { ok: true }
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

    await sendTelegram(
      chatId,
      `🌿 <b>Расход записан в Листок!</b>\n\n` +
        `💳 <b>${store}</b>: ${money(parsed.amount)}\n` +
        `📂 Категория: <i>${categoryLabel(category)}</i>\n\n` +
        `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
        `📦 Остаток на месяц: <b>${money(left)}</b>`,
    )
    return { ok: true, status: 'recorded' }
  }

  await sendTelegram(
    chatId,
    `🌿 Не удалось определить сумму.\n\n` +
      `Попробуйте написать проще, например:\n` +
      `• <code>Такси 450</code>\n` +
      `• <code>Продукты 1850</code>\n` +
      `• <code>350 кофе</code>\n\n` +
      `Или отправьте <code>/balance</code> для проверки остатка.`,
  )

  return { ok: true }
}
