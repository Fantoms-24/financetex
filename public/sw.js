/* Листок · service worker v1.0.4
   Пуш показываем сразу из SW — баннер дойдёт и с выключенным экраном iPhone/Android. */

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

/** Поддерживаем и наш формат, и FCM-форму { notification, data }. */
function normalize(payload) {
  const p = payload || {}
  const n = p.notification || {}

  const title = p.title || n.title || (p.data && p.data.title) || 'Листок'
  const body = p.body || n.body || (p.data && p.data.body) || ''

  const rawData = Object.assign({}, p.data || {}, n.data || {})
  const url = rawData.url || n.click_action || (p.data && p.data.url) || '/'
  const type = rawData.type || 'default'

  return { title: String(title), body: String(body), url: String(url), type: String(type) }
}

self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      let payload = null
      if (event.data) {
        try {
          payload = event.data.json()
        } catch {
          try {
            payload = { title: 'Листок', body: event.data.text() || '' }
          } catch {
            payload = null
          }
        }
      }

      const { title, body, url, type } = normalize(payload)

      const collapsing =
        type === 'default' ||
        type === 'bill-reminder' ||
        type === 'house-bill-reminder' ||
        type === 'test'

      const tag = collapsing ? `listok-${type}` : undefined

      // Минимальный набор опций, 100% совместимый со всеми браузерами (iOS Safari PWA, macOS, Android Chrome, Windows)
      const options = {
        body: body || '',
        lang: 'ru',
        dir: 'ltr',
        badge: '/icon-192.png',
        icon: '/icon-192.png',
        data: { url: url || '/', type: type || 'default', dateOfArrival: Date.now() },
      }

      // Добавляем tag только если он определён, и НЕ передаем renotify: true во избежание TypeError в Safari WebKit
      if (tag) {
        options.tag = tag
        options.renotify = false
      }

      try {
        await self.registration.showNotification(title || 'Листок', options)
      } catch (err) {
        // Ультра-защитный фолбэк при любых капризах браузера
        try {
          await self.registration.showNotification(title || 'Листок', {
            body: body || '',
            icon: '/icon-192.png',
            data: { url: url || '/', type: type || 'default' },
          })
        } catch (innerErr) {
          console.error('[SW] push notification failed:', innerErr)
        }
      }
    })(),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = (event.notification.data && event.notification.data.url) || '/'

  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const url = new URL(target, self.location.origin)

      for (const client of all) {
        if (new URL(client.url).origin === self.location.origin && 'focus' in client) {
          await client.focus()
          if ('navigate' in client) {
            try {
              await client.navigate(url.toString())
            } catch {
              /* старый клиент не умеет navigate */
            }
          }
          return
        }
      }

      if (self.clients.openWindow) await self.clients.openWindow(url.toString())
    })(),
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

/* Офлайн-кэша нет намеренно: чеки, кассы и бюджет всегда живые с сервера,
   подсунуть сохранённые цифры — значит показать неправду.
   Обработчик fetch всё равно нужен: без него Chrome не считает приложение
   устанавливаемым и предлагает только ярлык на экран, без «Установить». */
const OFFLINE_HTML = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#f3eee4">
<title>ЧекАгент</title>
<style>body{margin:0;min-height:100svh;display:grid;place-items:center;background:#f3eee4;
color:#1c1915;font:15px/1.5 "Segoe UI",system-ui,sans-serif;text-align:center;padding:24px}
p{margin:0}small{display:block;margin-top:8px;color:#6e675c}</style></head>
<body><div><p>Нет связи.</p><small>Откроется, когда интернет вернётся.</small></div></body></html>`

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || req.mode !== 'navigate') return
  if (new URL(req.url).origin !== self.location.origin) return

  event.respondWith(
    fetch(req).catch(
      () =>
        new Response(OFFLINE_HTML, {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }),
    ),
  )
})
