const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8979857832:AAEKQSw8Vs4Hjgzb4bbfI6zRemcYUUyMY7s'
const BACKEND_URL = process.env.BACKEND_URL || 'https://financetex.relaxdev.ru/api/telegram'
const TG_API_BASE = (process.env.TELEGRAM_API_URL || 'https://api.telegram.org').replace(/\/+$/, '')

console.log('🌿 [Listok Telegram Bot Worker] Starting...')
console.log('🔗 Backend URL:', BACKEND_URL)
console.log('📡 Telegram API Base:', TG_API_BASE)

async function main() {
  try {
    const delRes = await fetch(`${TG_API_BASE}/bot${BOT_TOKEN}/deleteWebhook`).then((r) => r.json())
    console.log('⚡ Webhook reset status:', delRes)
  } catch (err) {
    console.warn('⚠️ Webhook reset notice:', err.message)
  }

  let offset = 0
  let isRunning = true

  process.on('SIGINT', () => {
    console.log('🛑 Stopping bot worker...')
    isRunning = false
    process.exit(0)
  })

  while (isRunning) {
    try {
      const url = `${TG_API_BASE}/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=20`
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
      const data = await res.json()

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1
          console.log(`📩 Update #${update.update_id} from ${update.message?.chat?.id || 'unknown'}: ${update.message?.text || ''}`)

          try {
            const serverRes = await fetch(BACKEND_URL, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(update),
            })
            const reply = await serverRes.json()

            if (reply && (reply.method === 'sendMessage' || reply.text)) {
              console.log(`💬 Forwarding reply to chat ${reply.chat_id || update.message?.chat?.id}...`)
              await fetch(`${TG_API_BASE}/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  chat_id: reply.chat_id || update.message?.chat?.id,
                  text: reply.text,
                  parse_mode: reply.parse_mode || 'HTML',
                }),
              })
              console.log('✅ Reply delivered successfully')
            }
          } catch (err) {
            console.error('❌ Error forwarding update to backend:', err.message)
          }
        }
      } else if (!data.ok) {
        console.warn('⚠️ getUpdates not ok:', data)
        await new Promise((r) => setTimeout(r, 3000))
      }
    } catch (err) {
      if (err.name !== 'TimeoutError') {
        console.error('⚠️ Polling error:', err.message)
      }
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}

main().catch(console.error)
