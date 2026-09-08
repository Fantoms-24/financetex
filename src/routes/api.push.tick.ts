import { createFileRoute } from '@tanstack/react-router'
import { runTick } from '~/server/tick'

/**
 * Крон-тик напоминаний: Vercel Cron дёргает GET раз в сутки (0 5 * * *).
 * Если задан CRON_SECRET, требуем совпадения — иначе пускаем без ключа,
 * чтобы тик не сломался молча на проде.
 */
function authorized(request: Request): boolean {
  const secret = (process.env.CRON_SECRET || '').trim()
  if (!secret) return true
  const auth = request.headers.get('authorization') || ''
  if (auth === `Bearer ${secret}`) return true
  return request.headers.get('x-vercel-cron') === '1'
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function tick(request: Request): Promise<Response> {
  if (!authorized(request)) return json({ ok: false, error: 'нет доступа' }, 401)
  try {
    const res = await runTick()
    return json({ ok: true, ...res })
  } catch (e: unknown) {
    return json({ ok: false, error: (e as Error)?.message || 'сбой тика' }, 500)
  }
}

export const Route = createFileRoute('/api/push/tick')({
  server: {
    handlers: {
      GET: ({ request }) => tick(request),
      POST: ({ request }) => tick(request),
    },
  },
})
