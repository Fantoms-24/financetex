const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8979857832:AAEKQSw8Vs4Hjgzb4bbfI6zRemcYUUyMY7s'
const BACKEND_URL = process.env.BACKEND_URL || 'https://financetex.relaxdev.ru/api/telegram'
const TG_API_BASE = (process.env.TELEGRAM_API_URL || 'https://api.telegram.org').replace(/\/+$/, '')

console.log('[tg-bridge] Starting Telegram Polling Bridge...')
console.log('[tg-bridge] Backend URL:', BACKEND_URL)
console.log('[tg-bridge] Telegram API Base:', TG_API_BASE)

async function main() {
  try {
    const delRes = await globalThis.fetch(`${TG_API_BASE}/bot${BOT_TOKEN}/deleteWebhook`).then((r) => r.json())
    console.log('[tg-bridge] Webhook removed:', delRes)
  } catch (err) {
    console.warn('[tg-bridge] deleteWebhook warning:', err.message)
  }

  let offset = 0
  let isRunning = true

  process.on('SIGINT', () => {
    console.log('[tg-bridge] Stopping bridge...')
    isRunning = false
    process.exit(0)
  })

  while (isRunning) {
    try {
      const url = `${TG_API_BASE}/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=20`
      const res = await globalThis.fetch(url, { signal: AbortSignal.timeout(30000) })
      const data = await res.json()

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1
          const chatInfo = update.message?.chat?.id || update.callback_query?.message?.chat?.id || update.callback_query?.from?.id || 'unknown'
          const updateDesc = update.message?.text || (update.message?.photo ? '[Photo]' : '') || (update.message?.voice ? '[Voice]' : '') || (update.callback_query ? `[Callback: ${update.callback_query.data}]` : '')
          console.log(`[tg-bridge] Processing update #${update.update_id} from ${chatInfo}: ${updateDesc}`)

          // Acknowledge callback immediately to dismiss any loading spinner in client
          if (update.callback_query?.id) {
            globalThis.fetch(`${TG_API_BASE}/bot${BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ callback_query_id: update.callback_query.id }),
            }).catch(() => {})
          }

          try {
            const serverRes = await globalThis.fetch(BACKEND_URL, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(update),
            })
            const reply = await serverRes.json().catch(() => null)

            if (reply && (reply.method === 'sendMessage' || reply.text)) {
              const targetChatId = reply.chat_id || update.message?.chat?.id || update.callback_query?.message?.chat?.id || update.callback_query?.from?.id
              console.log(`[tg-bridge] Forwarding reply to chat ${targetChatId}...`)
              const payload = {
                chat_id: targetChatId,
                text: reply.text,
                parse_mode: reply.parse_mode || 'HTML',
              }
              if (reply.reply_markup) {
                payload.reply_markup = reply.reply_markup
              }

              const sendRes = await globalThis.fetch(`${TG_API_BASE}/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (sendRes.ok) {
                console.log('[tg-bridge] Reply sent successfully ✓')
              } else {
                const errText = await sendRes.text().catch(() => '')
                console.error(`[tg-bridge] sendMessage failed (${sendRes.status}):`, errText)
              }
            }
          } catch (err) {
            console.error('[tg-bridge] Error forwarding update to backend:', err.message)
          }
        }
      } else {
        if (!data.ok) {
          console.warn('[tg-bridge] getUpdates returned not ok:', data)
          await new Promise((r) => setTimeout(r, 3000))
        }
      }
    } catch (err) {
      if (err.name !== 'TimeoutError') {
        console.error('[tg-bridge] Polling error:', err.message)
      }
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}

main().catch(console.error)
