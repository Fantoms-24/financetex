import { newId, q, q1 } from './db'
import { categoryLabel, money, monthKey, parseMagicExpense } from '~/lib/format'
import { getLlmConfig } from './config'
import { createSplitSession } from './split'

export async function getBotToken(): Promise<string> {
  const envToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
  if (envToken) return envToken
  const row = await q1<any>(`SELECT value FROM app_config WHERE key = 'telegram_bot_token'`)
  return (row?.value || '').trim()
}

export async function getTelegramApiBase(): Promise<string> {
  const envUrl = (process.env.TELEGRAM_API_URL || '').trim()
  if (envUrl) return envUrl.replace(/\/+$/, '')
  const row = await q1<any>(`SELECT value FROM app_config WHERE key = 'telegram_api_url'`)
  return (row?.value || 'https://api.telegram.org').trim().replace(/\/+$/, '')
}

let cachedBotInfo: { username: string; firstName: string } | null = null

export async function getBotInfo(): Promise<{ username: string | null; firstName: string | null }> {
  if (cachedBotInfo) return cachedBotInfo

  const token = await getBotToken()
  if (token) {
    try {
      const apiBase = await getTelegramApiBase()
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
  apiUrl?: string,
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
  if (apiUrl !== undefined) {
    const cleanUrl = apiUrl.trim()
    await q(
      `INSERT INTO app_config (key, value, updated_at) VALUES ('telegram_api_url', $1, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [cleanUrl],
    )
  }

  const info = await getBotInfo()
  const token = await getBotToken()
  if (token) {
    try {
      const apiBase = await getTelegramApiBase()
      const appUrl = (process.env.BETTER_AUTH_URL || 'https://financetex.relaxdev.ru').replace(/\/+$/, '')
      const webhookRes = await fetch(
        `${apiBase}/bot${token}/setWebhook?url=${encodeURIComponent(`${appUrl}/api/telegram`)}&drop_pending_updates=true`,
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
export async function sendTelegram(chatId: string | number, text: string, replyMarkup?: any): Promise<boolean> {
  const token = await getBotToken()
  if (!token) {
    console.warn(`[telegram:mock] No bot token configured! To ${chatId}: ${text}`)
    return false
  }

  try {
    const apiBase = await getTelegramApiBase()
    const payload: any = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }
    if (replyMarkup) payload.reply_markup = replyMarkup

    const res = await fetch(`${apiBase}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
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
          reply_markup: replyMarkup,
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

/**
 * Скачивание файла (фото или аудио) из Telegram
 */
export async function downloadTelegramFile(fileId: string): Promise<Buffer | null> {
  const token = await getBotToken()
  if (!token) return null
  const apiBase = await getTelegramApiBase()

  try {
    const fileRes = await fetch(`${apiBase}/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`, {
      signal: AbortSignal.timeout(15000),
    }).then((r) => r.json())

    if (!fileRes?.ok || !fileRes.result?.file_path) {
      console.error('[telegram] getFile failed:', fileRes)
      return null
    }

    const fileUrl = `${apiBase}/file/bot${token}/${fileRes.result.file_path}`
    const fileResp = await fetch(fileUrl, { signal: AbortSignal.timeout(45000) })
    if (!fileResp.ok) {
      console.error('[telegram] File download failed status:', fileResp.status)
      return null
    }

    const ab = await fileResp.arrayBuffer()
    return Buffer.from(ab)
  } catch (err) {
    console.error('[telegram] downloadTelegramFile error:', err)
    return null
  }
}

/**
 * Подтверждение нажатия инлайн-кнопки
 */
export async function answerCallbackQuery(callbackQueryId: string, text?: string): Promise<boolean> {
  const token = await getBotToken()
  if (!token) return false
  const apiBase = await getTelegramApiBase()

  try {
    await fetch(`${apiBase}/bot${token}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text || undefined,
      }),
      signal: AbortSignal.timeout(10000),
    })
    return true
  } catch {
    return false
  }
}

/**
 * Расчет текущего баланса пользователя
 */
async function calculateBalance(userId: string) {
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

  return { budget, spent, left, dailyLeft }
}

function makeReply(chatId: string | number, text: string, replyMarkup?: any) {
  // Фоновая попытка (если доступен прокси или прямая сеть)
  sendTelegram(chatId, text, replyMarkup).catch(() => {})
  // Прямой ответ Telegram в тело HTTP-ответа вебхука (работает даже при блокировке исходящих соединений!)
  const replyObj: any = {
    method: 'sendMessage',
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  }
  if (replyMarkup) replyObj.reply_markup = replyMarkup
  return replyObj
}

/**
 * Обработка входящего обновления от Telegram Webhook
 */
export async function processTelegramWebhook(body: any): Promise<{ ok: boolean; status?: string; reply?: any }> {
  if (!body) return { ok: true, status: 'empty' }

  // =========================================================================
  // 0. Обработка нажатий инлайн-кнопок (Callback Query)
  // =========================================================================
  if (body.callback_query) {
    const cb = body.callback_query
    const callbackId = cb.id
    const chatId = String(cb.message?.chat?.id || cb.from?.id || '')
    const data = String(cb.data || '').trim()
    const fromUser = cb.from || {}

    // Гасим спиннер на кнопке в Telegram
    answerCallbackQuery(callbackId).catch(() => {})

    const userRow = await q1<any>(`SELECT user_id FROM user_telegram WHERE chat_id = $1`, [chatId])
    if (!userRow || !userRow.user_id) {
      return {
        ok: true,
        reply: makeReply(chatId, '🌿 Пожалуйста, сначала подключите свой аккаунт в приложении Листок (раздел Настройки → Telegram-бот).')
      }
    }

    const userId = userRow.user_id

    // Клик по кнопке [ 🍕 Разделить счёт ]
    if (data.startsWith('split:')) {
      const receiptId = data.slice(6).trim()
      const receipt = await q1<any>(
        `SELECT id, store, total, category, purchased_at FROM receipts WHERE id = $1 AND user_id = $2`,
        [receiptId, userId]
      )

      if (!receipt) {
        return {
          ok: true,
          reply: makeReply(chatId, '🌿 Чек не найден или уже был удален.')
        }
      }

      const items = await q<any>(
        `SELECT name, qty, price FROM receipt_items WHERE receipt_id = $1`,
        [receiptId]
      )

      const userInfo = await q1<any>(
        `SELECT u.name, s.phone, s.bank
           FROM "user" u
           LEFT JOIN user_settings s ON s.user_id = u.id
          WHERE u.id = $1`,
        [userId]
      )

      const session = await createSplitSession({
        receiptId: receipt.id,
        userId,
        title: receipt.store || 'Счёт в кафе',
        total: Number(receipt.total || 0),
        organizerName: userInfo?.name || fromUser.first_name || 'Организатор',
        organizerPhone: userInfo?.phone || null,
        organizerBank: userInfo?.bank || null,
        items: (items || []).map((it: any) => ({
          name: it.name,
          qty: Number(it.qty || 1),
          price: Number(it.price || 0),
        })),
      })

      const appUrl = (process.env.BETTER_AUTH_URL || 'https://financetex.relaxdev.ru').replace(/\/+$/, '')
      const splitUrl = `${appUrl}/split/${session.code}`
      const shareText = `Ребята, разделите чек за ${receipt.store} (${money(receipt.total)}) 🍕`
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(splitUrl)}&text=${encodeURIComponent(shareText)}`

      const replyText =
        `🍕 <b>Чек готов к разделу с друзьями!</b>\n\n` +
        `🏪 <b>${escapeHtml(receipt.store)}</b>: <b>${money(receipt.total)}</b>\n` +
        (items && items.length > 0 ? `📋 Позиций: ${items.length}\n` : '') +
        `\nДрузья открывают ссылку на смартфонах без регистрации, выбирают свои блюда и видят, сколько перевести вам по СБП:\n` +
        `👉 <b>${splitUrl}</b>`

      const replyMarkup = {
        inline_keyboard: [
          [
            { text: '📤 Переслать друзьям в чат', url: shareUrl },
            { text: '🌐 Открыть сплит', url: splitUrl }
          ]
        ]
      }

      return {
        ok: true,
        status: 'split_created',
        reply: makeReply(chatId, replyText, replyMarkup)
      }
    }

    return { ok: true, status: 'callback_handled' }
  }

  if (!body.message) return { ok: true, status: 'no_message' }

  const msg = body.message
  const chatId = String(msg.chat?.id || '')
  const text = String(msg.text || msg.caption || '').trim()
  const fromUser = msg.from || {}
  const username = fromUser.username ? `@${fromUser.username}` : fromUser.first_name || null

  if (!chatId) return { ok: true }

  // =========================================================================
  // 1. Команда /start с кодом привязки или без
  // =========================================================================
  if (text.startsWith('/start')) {
    const parts = text.split(/\s+/)
    const rawCode = (parts[1] || '').trim().toUpperCase()

    if (rawCode) {
      const tokenRow = await q1<any>(
        `SELECT user_id FROM telegram_link_tokens WHERE code = $1 AND expires_at > now()`,
        [rawCode],
      )

      if (tokenRow && tokenRow.user_id) {
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
          `• 📸 <b>Фото чека</b> — ИИ считает позиции и сумму\n` +
          `• 🎙️ <b>Голосовое</b> — наговорите траты микрофоном\n` +
          `• <code>/split 2500 Ужин</code> — ссылка на сбор денег\n` +
          `• <code>/balance</code> — остаток на день`

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
        `• Отправьте текст: <code>Такси 350</code> или <code>Кофе 250</code>\n` +
        `• Пришлите 📸 <b>фото чека</b> — ИИ сам разберёт товары\n` +
        `• Запишите 🎙️ <b>голосовое сообщение</b>\n` +
        `• Разделите счёт: <code>/split 3000 Кафе</code>\n` +
        `• Или отправьте <code>/balance</code> для проверки остатка.`

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

  // =========================================================================
  // 2. Команда /unlink
  // =========================================================================
  if (text === '/unlink' || text === '/disconnect') {
    await q(`DELETE FROM user_telegram WHERE chat_id = $1`, [chatId])
    const replyText = `🌿 Telegram отключен от вашего аккаунта в Листке.`
    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  // =========================================================================
  // 3. Проверяем привязку аккаунта
  // =========================================================================
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
          `• 📸 <b>Фото чека</b> для автораспознавания\n` +
          `• 🎙️ <b>Голосовые сообщения</b>`

        return { ok: true, status: 'linked', reply: makeReply(chatId, replyText) }
      }
    }

    const replyText =
      `🌿 Чтобы записывать расходы через Telegram, сначала подключите бота в приложении Листок (раздел <b>Настройки</b> → <b>Telegram-бот</b>).`

    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  const userId = userRow.user_id

  // =========================================================================
  // 4. 📸 Обработка фото чеков (ИИ-сканер в кармане)
  // =========================================================================
  const photoArray = msg.photo
  const doc = msg.document
  let photoFileId: string | null = null

  if (Array.isArray(photoArray) && photoArray.length > 0) {
    photoFileId = photoArray[photoArray.length - 1].file_id
  } else if (doc && String(doc.mime_type || '').startsWith('image/')) {
    photoFileId = doc.file_id
  }

  if (photoFileId) {
    const imgBuf = await downloadTelegramFile(photoFileId)
    if (!imgBuf) {
      return {
        ok: true,
        reply: makeReply(chatId, '🌿 Не удалось загрузить фото из Telegram. Попробуйте отправить его ещё раз.'),
      }
    }

    const { baseUrl, apiKey, model } = await getLlmConfig()
    if (!apiKey) {
      const replyText =
        `📸 <b>Фото чека получено!</b>\n\n` +
        `Но распознавание ИИ ещё не настроено в системе. Администратор должен указать API-ключ ИИ в панели управления:\n` +
        `https://financetex.relaxdev.ru/fantms`
      return { ok: true, reply: makeReply(chatId, replyText) }
    }

    const prompt = `Разбери чек на фото. Ответь ТОЛЬКО валидным JSON без пояснений и markdown:
{"store":"название магазина или заведения","purchased_at":"YYYY-MM-DD","total":1234,"category":"food","items":[{"name":"название позиции","qty":1,"price":123,"category":"food"}]}
Правила:
- total и price — целые рубли, без копеек и без символа валюты.
- category одно из: food, prepared, household, hygiene, health, drinks, snacks, other.
- purchased_at — дата с чека в формате YYYY-MM-DD. Если не видно, подставь сегодняшнюю.
- items — список товаров из чека с ценой за единицу и количеством. Если позиций нет, оставь пустой массив [].`

    let parsedReceipt: any = null
    try {
      const base64Image = `data:image/jpeg;base64,${imgBuf.toString('base64')}`
      const resp = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: base64Image } },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(60000),
      })

      if (resp.ok) {
        const raw = await resp.json()
        const content = raw?.choices?.[0]?.message?.content || ''
        const match = content.match(/\{[\s\S]*\}/)
        if (match) {
          parsedReceipt = JSON.parse(match[0])
        }
      } else {
        console.error('[telegram:scan] Vision error status:', resp.status, await resp.text().catch(() => ''))
      }
    } catch (e: any) {
      console.error('[telegram:scan] Vision API error:', e)
    }

    if (!parsedReceipt || !parsedReceipt.total || Number(parsedReceipt.total) <= 0) {
      return {
        ok: true,
        reply: makeReply(
          chatId,
          '🌿 Не удалось четко распознать чек на фото. Пожалуйста, сфотографируйте чек ровнее или введите сумму текстом (например: <code>Пятёрочка 1240</code>).'
        ),
      }
    }

    const receiptId = newId('r')
    const store = String(parsedReceipt.store || 'Покупка по фото').trim()
    const total = Math.max(1, Math.round(Number(parsedReceipt.total || 0)))
    const category = String(parsedReceipt.category || 'food').trim()
    const purchasedAt = String(parsedReceipt.purchased_at || new Date().toISOString().slice(0, 10)).slice(0, 10)

    await q(
      `INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note)
       VALUES ($1, $2, $3, $4::date, $5, $6, $7)`,
      [receiptId, userId, store, purchasedAt, total, category, 'Распознано по фото из Telegram'],
    )

    const items = Array.isArray(parsedReceipt.items) ? parsedReceipt.items : []
    for (const it of items) {
      const name = String(it.name || '').trim()
      const price = Math.round(Number(it.price || 0))
      const qty = Math.max(1, Math.round(Number(it.qty || 1)))
      if (name && price > 0) {
        const itemId = newId('ri')
        await q(
          `INSERT INTO receipt_items (id, receipt_id, name, qty, price, category)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [itemId, receiptId, name, qty, price, it.category || category],
        )
      }
    }

    const { left, dailyLeft } = await calculateBalance(userId)

    let itemsList = ''
    if (items.length > 0) {
      const top = items.slice(0, 5).map((it: any) => `• ${escapeHtml(it.name)} — ${money(Number(it.price || 0) * Number(it.qty || 1))}`).join('\n')
      const more = items.length > 5 ? `\n<i>...и еще ${items.length - 5} поз.</i>` : ''
      itemsList = `\n📋 <b>Позиции в чеке:</b>\n${top}${more}\n`
    }

    const replyText =
      `📸 <b>Чек распознан и сохранён!</b>\n\n` +
      `🏪 <b>${escapeHtml(store)}</b>: <b>${money(total)}</b>\n` +
      `📂 Категория: <i>${categoryLabel(category)}</i>\n` +
      itemsList +
      `\n☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b>`

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '🍕 Разделить этот счёт с друзьями', callback_data: `split:${receiptId}` }
        ]
      ]
    }

    return { ok: true, status: 'receipt_scanned', reply: makeReply(chatId, replyText, replyMarkup) }
  }

  // =========================================================================
  // 5. 🎙️ Голосовой ввод трат (Voice-to-Expense)
  // =========================================================================
  const voiceObj = msg.voice || msg.audio
  if (voiceObj && voiceObj.file_id) {
    const audioBuf = await downloadTelegramFile(voiceObj.file_id)
    if (!audioBuf) {
      return {
        ok: true,
        reply: makeReply(chatId, '🌿 Не удалось скачать голосовое сообщение из Telegram. Попробуйте еще раз.')
      }
    }

    const { baseUrl, apiKey, model } = await getLlmConfig()
    if (!apiKey) {
      const replyText =
        `🎙️ <b>Голосовое сообщение получено!</b>\n\n` +
        `Для распознавания голоса администратор должен указать API-ключ ИИ в панели управления: https://financetex.relaxdev.ru/fantms`
      return { ok: true, reply: makeReply(chatId, replyText) }
    }

    // 1. Транскрибация через Whisper API
    let transcribedText = ''
    try {
      const formData = new FormData()
      formData.append('file', new Blob([audioBuf], { type: voiceObj.mime_type || 'audio/ogg' }), 'voice.ogg')
      formData.append('model', 'whisper-1')
      formData.append('language', 'ru')

      const whisperRes = await fetch(`${baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${apiKey}`,
        },
        body: formData,
        signal: AbortSignal.timeout(30000),
      })

      if (whisperRes.ok) {
        const data = await whisperRes.json()
        transcribedText = String(data?.text || '').trim()
      } else {
        console.error('[telegram:voice] Whisper error status:', whisperRes.status, await whisperRes.text().catch(() => ''))
      }
    } catch (e: any) {
      console.error('[telegram:voice] Whisper request failed:', e)
    }

    if (!transcribedText) {
      return {
        ok: true,
        reply: makeReply(chatId, '🌿 Не удалось разобрать слова в аудиосообщении. Попробуйте записать голос громче или отправить текстом.')
      }
    }

    // 2. Извлечение трат через языковую модель
    let parsedItems: Array<{ store: string; amount: number; category: string }> = []
    try {
      const parsePrompt = `Пользователь надиктовал свои расходы голосом:
"${transcribedText}"

Разбери фразу и извлеки ВСЕ траты/покупки.
Ответь ТОЛЬКО валидным JSON-массивом без пояснений и markdown:
[{"store":"название покупки или магазина","amount":123,"category":"food|household|hygiene|health|drinks|snacks|other"}]
Правила:
- amount: целое число рублей (слова переведи в цифры: "восемьсот пятьдесят" -> 850, "две тысячи" -> 2000).
- category: выбери одно из: food (еда/продукты), prepared (кафе/рестораны), household (быт/дом), hygiene (гигиена), health (аптека/здоровье), drinks (напитки), snacks (снеки), other (прочее/авто/такси).
- Если во фразе несколько покупок, верни отдельный объект для каждой.
- Если во фразе нет трат, верни [].`

      const parseResp = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0,
          messages: [{ role: 'user', content: parsePrompt }],
        }),
        signal: AbortSignal.timeout(20000),
      })

      if (parseResp.ok) {
        const data = await parseResp.json()
        const content = data?.choices?.[0]?.message?.content || ''
        const match = content.match(/\[\s*\{[\s\S]*\}\s*\]/) || content.match(/\[[\s\S]*\]/)
        if (match) {
          parsedItems = JSON.parse(match[0])
        }
      }
    } catch (e) {
      console.error('[telegram:voice] LLM parse error:', e)
    }

    // Фоллбэк: если модель вернула пустой список, пробуем регулярный парсер
    if (!parsedItems || parsedItems.length === 0) {
      const magic = parseMagicExpense(transcribedText)
      if (magic.amount && magic.amount > 0) {
        parsedItems = [{
          store: magic.title || 'Покупка голосом',
          amount: magic.amount,
          category: magic.category || 'other',
        }]
      }
    }

    if (!parsedItems || parsedItems.length === 0) {
      return {
        ok: true,
        reply: makeReply(
          chatId,
          `🎙️ <i>«${escapeHtml(transcribedText)}»</i>\n\n` +
          `🌿 Речь распознана, но сумму или название расхода найти не удалось. Попробуйте сказать конкретнее, например: <i>«Такси 450 рублей»</i> или <i>«Аптека 1200»</i>.`
        )
      }
    }

    // Сохраняем каждую трату
    for (const it of parsedItems) {
      const amt = Math.max(1, Math.round(Number(it.amount || 0)))
      if (amt > 0) {
        const id = newId('r')
        const st = String(it.store || 'Голосовой расход').trim()
        const cat = String(it.category || 'other').trim()
        await q(
          `INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note)
           VALUES ($1, $2, $3, current_date, $4, $5, $6)`,
          [id, userId, st, amt, cat, `Голосовой ввод: «${transcribedText}»`]
        )
      }
    }

    const { left, dailyLeft } = await calculateBalance(userId)

    const itemsReport = parsedItems
      .filter(it => Number(it.amount) > 0)
      .map(it => `• <b>${escapeHtml(it.store)}</b>: ${money(it.amount)} (<i>${categoryLabel(it.category)}</i>)`)
      .join('\n')

    const replyText =
      `🎙️ <i>«${escapeHtml(transcribedText)}»</i>\n\n` +
      `🌿 <b>Записано в Листок:</b>\n` +
      itemsReport +
      `\n\n☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b>`

    return { ok: true, status: 'voice_recorded', reply: makeReply(chatId, replyText) }
  }

  // =========================================================================
  // 6. 🍕 Команда /split [сумма] [цель]
  // =========================================================================
  if (text.startsWith('/split')) {
    const rest = text.slice(6).trim()
    if (!rest) {
      const replyText =
        `🍕 <b>Разделение счёта с друзьями</b>\n\n` +
        `Чтобы мгновенно создать ссылку для сбора денег:\n` +
        `• Отправьте команду с суммой, например:\n` +
        `  <code>/split 3500 Пицца в Додо</code>\n` +
        `• Или просто пришлите <b>фото чека</b> — Листок считает позиции и выдаст кнопку <b>«Разделить счёт»</b>.`

      return { ok: true, reply: makeReply(chatId, replyText) }
    }

    const parsed = parseMagicExpense(rest)
    const totalAmount = parsed.amount || parseInt(rest.replace(/[^\d]/g, ''), 10) || 0

    if (totalAmount <= 0) {
      return {
        ok: true,
        reply: makeReply(chatId, '🌿 Укажите сумму для сплита, например: <code>/split 2500 Ресторан</code>')
      }
    }

    const title = parsed.title || 'Счёт в компании'
    const userInfo = await q1<any>(
      `SELECT u.name, s.phone, s.bank
         FROM "user" u
         LEFT JOIN user_settings s ON s.user_id = u.id
        WHERE u.id = $1`,
      [userId]
    )

    const session = await createSplitSession({
      userId,
      title,
      total: totalAmount,
      organizerName: userInfo?.name || fromUser.first_name || 'Организатор',
      organizerPhone: userInfo?.phone || null,
      organizerBank: userInfo?.bank || null,
    })

    const appUrl = (process.env.BETTER_AUTH_URL || 'https://financetex.relaxdev.ru').replace(/\/+$/, '')
    const splitUrl = `${appUrl}/split/${session.code}`
    const shareText = `Ребята, разделите счёт за ${title} (${money(totalAmount)}) 🍕`
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(splitUrl)}&text=${encodeURIComponent(shareText)}`

    const replyText =
      `🍕 <b>Сбор на ${money(totalAmount)} открыт!</b>\n\n` +
      `Цель: <b>${escapeHtml(title)}</b>\n\n` +
      `Отправьте ссылку друзьям в чат, чтобы они скинулись:\n` +
      `👉 <b>${splitUrl}</b>`

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '📤 Переслать друзьям в чат', url: shareUrl },
          { text: '🌐 Открыть сплит', url: splitUrl }
        ]
      ]
    }

    return { ok: true, status: 'split_created', reply: makeReply(chatId, replyText, replyMarkup) }
  }

  // =========================================================================
  // 7. Команда /balance
  // =========================================================================
  if (text === '/balance' || text === '/today' || text === 'Баланс' || text === 'баланс') {
    const { budget, spent, left, dailyLeft } = await calculateBalance(userId)

    const replyText =
      `🌿 <b>Ваш баланс в Листке:</b>\n\n` +
      `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `💳 Потрачено за месяц: ${money(spent)}\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b> (из ${money(budget)})`

    return { ok: true, reply: makeReply(chatId, replyText) }
  }

  // =========================================================================
  // 8. Разбор быстрого текстового расхода (например: Такси 450)
  // =========================================================================
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

    const { left, dailyLeft } = await calculateBalance(userId)

    const replyText =
      `🌿 <b>Расход записан в Листок!</b>\n\n` +
      `💳 <b>${escapeHtml(store)}</b>: ${money(parsed.amount)}\n` +
      `📂 Категория: <i>${categoryLabel(category)}</i>\n\n` +
      `☀️ Свободно на сегодня: <b>${money(dailyLeft)}</b>\n` +
      `📦 Остаток на месяц: <b>${money(left)}</b>`

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '🍕 Разделить этот расход', callback_data: `split:${id}` }
        ]
      ]
    }

    return { ok: true, status: 'recorded', reply: makeReply(chatId, replyText, replyMarkup) }
  }

  // =========================================================================
  // 9. Подсказка по командам
  // =========================================================================
  const replyText =
    `🌿 <b>Как вносить расходы в Листок:</b>\n\n` +
    `• <b>Текстом:</b> <code>Такси 450</code>, <code>Обед 650</code>, <code>250 кофе</code>\n` +
    `• 📸 <b>Фотографией:</b> сфотографируйте чек или скриншот из банка\n` +
    `• 🎙️ <b>Голосом:</b> надиктуйте траты аудиосообщением\n` +
    `• 🍕 <b>Сплит счёта:</b> <code>/split 3000 Ужин</code>\n` +
    `• ☀️ <b>Баланс:</b> <code>/balance</code>`

  return { ok: true, reply: makeReply(chatId, replyText) }
}
