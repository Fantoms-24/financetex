import { createFileRoute } from '@tanstack/react-router'
import { processTelegramWebhook } from '~/server/telegram'

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function handleWebhook(request: Request): Promise<Response> {
  try {
    const body = await request.json()
    const res = await processTelegramWebhook(body)
    return json(res)
  } catch (err: any) {
    console.error('[api/telegram] Webhook error:', err)
    return json({ ok: true, note: 'recovered' })
  }
}

export const Route = createFileRoute('/api/telegram')({
  server: {
    handlers: {
      GET: () => json({ ok: true, service: 'Listok Telegram Bot Webhook' }),
      POST: ({ request }) => handleWebhook(request),
    },
  },
})
