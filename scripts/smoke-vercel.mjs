// Дымовой прогон собранной Vercel-функции: поднимаем fetch-хендлер
// на локальном порту и проверяем, что страницы и sw.js отдаются.
// Нужен только для проверки артефакта сборки, на деплое не участвует.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const funcDir = join(root, '.vercel/output/functions/__fallback.func')
const staticDir = join(root, '.vercel/output/static')

const mod = await import(`file://${join(funcDir, 'index.mjs').replace(/\\/g, '/')}`)
const app = mod.default

const MIME = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  // статика отдаётся так же, как её отдал бы Vercel по handle: filesystem
  try {
    const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '')
    const buf = await readFile(join(staticDir, rel))
    res.writeHead(200, {
      'content-type': MIME[extname(rel)] || 'application/octet-stream',
      ...(rel === 'sw.js' ? { 'Service-Worker-Allowed': '/' } : {}),
    })
    res.end(buf)
    return
  } catch {
    /* не статика — идём в функцию */
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
  })
  try {
    const out = await app.fetch(request, { waitUntil: () => {} })
    res.writeHead(out.status, Object.fromEntries(out.headers))
    res.end(Buffer.from(await out.arrayBuffer()))
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('handler error: ' + (err?.stack || String(err)))
  }
})

await new Promise((r) => server.listen(4319, '127.0.0.1', r))

const paths = [
  '/', '/login', '/receipts', '/scan', '/groups', '/bills', '/agent',
  '/settings', '/admin', '/sw.js', '/manifest.webmanifest',
]
let bad = 0
const fail = (p, why) => {
  bad++
  console.log('FAIL', p, why)
}

for (const p of paths) {
  try {
    const r = await fetch('http://127.0.0.1:4319' + p, { redirect: 'manual' })
    if (r.status >= 400) {
      fail(p, 'status ' + r.status)
      continue
    }
    console.log(String(r.status).padEnd(4), p)
  } catch (e) {
    fail(p, e.message)
  }
}

// Мало получить 200: Start без shellComponent в корневом роуте отдаёт
// голый фрагмент без <html>/<head>. Браузер это не оживляет до конца,
// страница выглядит пустой, а PWA не видит manifest и theme-color.
// Поэтому проверяем именно документ, а не только код ответа.
{
  const r = await fetch('http://127.0.0.1:4319/', { redirect: 'manual' })
  const html = await r.text()
  const must = [
    ['<!DOCTYPE html>', /<!DOCTYPE html>/i],
    ['<html lang="ru">', /<html[^>]+lang="ru"/i],
    ['<head>', /<head>/i],
    ['viewport', /name="viewport"/i],
    ['theme-color', /name="theme-color"[^>]*#f3eee4/i],
    ['manifest', /rel="manifest"[^>]*manifest\.webmanifest/i],
    ['apple-touch-icon', /rel="apple-touch-icon"/i],
    ['stylesheet', /<link[^>]+rel="stylesheet"/i],
  ]
  console.log('\n=== документ / ===')
  for (const [label, re] of must) {
    const ok = re.test(html)
    if (!ok) fail('/', 'нет ' + label)
    console.log((ok ? 'ok   ' : 'FAIL ') + label)
  }
}

server.close()
console.log(bad === 0 ? '\nSMOKE OK' : `\nSMOKE FAIL (${bad})`)
process.exit(bad === 0 ? 0 : 1)
