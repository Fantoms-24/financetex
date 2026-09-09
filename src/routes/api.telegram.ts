import dns from 'node:dns'
import { createFileRoute } from '@tanstack/react-router'
import { processTelegramWebhook, getBotToken, getBotInfo } from '~/server/telegram'
import { checkTelegramDeepStatus, setTelegramWebhookAuto } from '~/server/fantms'

try {
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first')
  }
} catch {}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function handleWebhook(request: Request): Promise<Response> {
  try {
    const body = await request.json()
    console.log('[api/telegram] Received webhook update:', JSON.stringify(body))
    const res = await processTelegramWebhook(body)
    console.log('[api/telegram] Processed webhook update result:', JSON.stringify(res))
    if (res?.reply) {
      return json(res.reply, 200)
    }
    return json({ ok: true })
  } catch (err: any) {
    console.error('[api/telegram] Webhook error:', err?.message || err, err?.stack)
    return json({ ok: true, note: 'recovered', error: err?.message })
  }
}

export const Route = createFileRoute('/api/telegram')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const action = url.searchParams.get('action')
        let setupResult = null
        if (action === 'setWebhook') {
          setupResult = await setTelegramWebhookAuto()
        }
        const token = await getBotToken()
        const info = await getBotInfo().catch((e) => ({ error: (e as Error)?.message }))
        const deep = await checkTelegramDeepStatus().catch((e) => ({ error: (e as Error)?.message }))

        return json({
          ok: true,
          service: 'Listok Telegram Bot Webhook',
          hasToken: Boolean(token),
          tokenPrefix: token ? `${token.slice(0, 6)}...${token.slice(-4)}` : null,
          info,
          deep,
          setupResult,
        })
      },
      POST: ({ request }) => handleWebhook(request),
    },
  },
})
