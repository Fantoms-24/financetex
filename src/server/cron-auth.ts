export function cronAuthorized(request: Request): boolean {
  const secret = (process.env.CRON_SECRET || '').trim()
  if (!secret) return process.env.NODE_ENV !== 'production'
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export function cronJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}
