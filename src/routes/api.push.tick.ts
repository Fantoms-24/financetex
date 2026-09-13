import { createFileRoute } from '@tanstack/react-router'
import { runTick } from '~/server/tick'
import { cronAuthorized, cronJson } from '~/server/cron-auth'

/**
 * Крон-тик напоминаний: Vercel Cron дёргает GET в 09:00 по Москве (06:00 UTC).
 * На проде CRON_SECRET обязателен; Vercel сам присылает его в Authorization.
 */
async function tick(request: Request): Promise<Response> {
  if (!cronAuthorized(request)) return cronJson({ ok: false, error: 'нет доступа' }, 401)
  try {
    const res = await runTick()
    return cronJson({ ok: res.failed === 0, ...res }, res.failed === 0 ? 200 : 503)
  } catch (e: unknown) {
    return cronJson({ ok: false, error: (e as Error)?.message || 'сбой тика' }, 500)
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
