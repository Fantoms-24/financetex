import { createFileRoute } from '@tanstack/react-router'
import { cronAuthorized, cronJson } from '~/server/cron-auth'
import { runEveningCheckin } from '~/server/tick'

async function evening(request: Request): Promise<Response> {
  if (!cronAuthorized(request)) return cronJson({ ok: false, error: 'нет доступа' }, 401)
  try {
    const result = await runEveningCheckin()
    return cronJson({ ok: result.failed === 0, ...result }, result.failed === 0 ? 200 : 503)
  } catch (error) {
    return cronJson({ ok: false, error: (error as Error)?.message || 'сбой вечерней проверки' }, 500)
  }
}

export const Route = createFileRoute('/api/push/evening')({
  server: { handlers: { GET: ({ request }) => evening(request) } },
})
