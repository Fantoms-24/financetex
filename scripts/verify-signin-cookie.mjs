// Прогон реальной формы входа через headless-Chrome + DevTools Protocol.
// Цель: после правки defaultCookieAttributes / putCookie убедиться, что
// Set-Cookie больше НЕ содержит SameSite=None без Secure.
//
// Использование: node scripts/verify-signin-cookie.mjs
// Требует запущенный dev-сервер на 127.0.0.1:8080 и свободный порт 9333.

import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9333
const URL = process.env.URL || 'http://127.0.0.1:8080/login'
const SUFFIX = Date.now().toString(36)
const LOGIN = `cd${SUFFIX}`
const NAME = `CD ${SUFFIX}`
const PASSWORD = '12345678'

const userDir = `C:\\Users\\vasya\\AppData\\Local\\Temp\\chrome-verify-${SUFFIX}`

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDir}`,
    `--remote-debugging-port=${PORT}`,
    '--remote-allow-origins=*',
    'about:blank',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
)

let killed = false
const cleanup = () => {
  if (killed) return
  killed = true
  try {
    chrome.kill('SIGTERM')
  } catch {}
}
process.on('exit', cleanup)
process.on('uncaughtException', (e) => {
  console.error('uncaught', e)
  cleanup()
  process.exit(2)
})

// ждём, пока DevTools поднимется
let info
for (let i = 0; i < 50; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
    if (r.ok) {
      info = await r.json()
      break
    }
  } catch {}
  await wait(150)
}
if (!info) {
  console.error('chrome DevTools не поднялся на порту', PORT)
  cleanup()
  process.exit(2)
}
const wsUrl = info.webSocketDebuggerUrl
const ws = new WebSocket(wsUrl)
await new Promise((res, rej) => {
  ws.addEventListener('open', () => res(), { once: true })
  ws.addEventListener('error', (e) => rej(new Error('ws error')), { once: true })
})

let nextId = 0
const pending = new Map()
const events = []
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id)
    pending.delete(m.id)
    m.error ? reject(new Error(m.error.message)) : resolve(m.result)
  } else if (m.method) {
    events.push(m)
  }
})
function send(method, params = {}, sessionId) {
  const id = ++nextId
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    const payload = sessionId ? { id, sessionId, method, params } : { id, method, params }
    ws.send(JSON.stringify(payload))
  })
}

// create target
const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, sessionId)
await send('Network.enable', {}, sessionId)
await send('Runtime.enable', {}, sessionId)

// ждём окончания навигации
const navDone = new Promise((resolve) => {
  const handler = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.method === 'Page.loadEventFired' && m.sessionId === sessionId) {
      ws.removeEventListener('message', handler)
      resolve()
    }
  }
  ws.addEventListener('message', handler)
})
await send('Page.navigate', { url: URL }, sessionId)
await navDone
await wait(800) // пусть форма отрисуется

// 1) заполнить и отправить форму входа
//    ждём появления инпутов и формы
await send(
  'Runtime.evaluate',
  {
    expression: `
      (async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const setVal = (el, value) => {
          const proto = el.tagName === 'TEXTAREA'
            ? window.HTMLTextAreaElement.prototype
            : window.HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
          setter.call(el, value);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        };
        // ждём форму
        for (let i = 0; i < 50; i++) {
          if (document.querySelector('form')) break;
          await sleep(80);
        }
        // переключаемся на «Создать»
        const tabBtn = Array.from(document.querySelectorAll('button'))
          .find((b) => /Создать/.test(b.textContent || ''));
        if (tabBtn) tabBtn.click();
        await sleep(200);
        const inputs = Array.from(document.querySelectorAll('input'));
        console.log('VERIFIER inputs', inputs.length);
        if (inputs.length < 3) {
          console.log('VERIFIER not enough inputs');
          return;
        }
        setVal(inputs[0], ${JSON.stringify(NAME)});
        setVal(inputs[1], ${JSON.stringify(LOGIN)});
        setVal(inputs[2], ${JSON.stringify(PASSWORD)});
        await sleep(150);
        const form = document.querySelector('form');
        if (form && form.requestSubmit) form.requestSubmit();
        else if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        console.log('VERIFIER submitted', ${JSON.stringify(LOGIN)});
      })()
    `,
    awaitPromise: true,
  },
  sessionId,
)

// 2) ждём ответа на запрос (POST /_serverFn/... или аналог)
await wait(3000)

// 2.5) диагностический дамп: console.log из страницы + сетевые ответы
console.log('=== console из страницы ===')
for (const e of events) {
  if (e.method === 'Runtime.consoleAPICalled' && e.sessionId === sessionId) {
    const args = (e.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ')
    console.log('  ' + args)
  }
}

// 2.5) диагностический дамп: все ответы на POST с телом, статусом и cookies
console.log('=== сетевые ответы, похожие на signin/signup ===')
for (const e of events) {
  if (e.method !== 'Network.responseReceived' || e.sessionId !== sessionId) continue
  const r = e.params
  const url = r.response?.url || ''
  if (!/sign|auth|serverFn|_serverFn|chekagent/i.test(url)) continue
  const h = r.response?.headers || {}
  const sc = []
  for (const k of Object.keys(h)) if (k.toLowerCase() === 'set-cookie') sc.push(...(Array.isArray(h[k]) ? h[k] : [h[k]]))
  console.log(`  ${r.response?.status}  ${url}  set-cookie=${sc.length}`)
  for (const v of sc) console.log('     ', v)
}

// 3) собираем set-cookie из последних ответов
//    В Chrome 115+ `Network.getResponseHeaders` удалён, headers лежат
//    прямо в `response.headers` события `responseReceived`. Дополнительно
//    включаем `responseReceivedExtraInfo`, где сырые Set-Cookie (если есть).
await send('Network.enable', { enableRequestHeaders: true }, sessionId)
const responseHeaders = events
  .filter((e) => e.method === 'Network.responseReceived' && e.sessionId === sessionId)
  .map((e) => e.params)

const setCookies = new Map() // requestId -> string[]

// первый проход: response.headers
for (const r of responseHeaders) {
  const url = r.response?.url || ''
  if (!/sign|auth|serverFn|_serverFn/i.test(url)) continue
  const h = r.response?.headers || {}
  for (const k of Object.keys(h)) {
    if (k.toLowerCase() === 'set-cookie') {
      const arr = Array.isArray(h[k]) ? h[k] : [h[k]]
      if (!setCookies.has(r.requestId)) setCookies.set(r.requestId, [])
      setCookies.get(r.requestId).push(...arr)
    }
  }
}

// второй проход: responseReceivedExtraInfo для точности
const extras = events.filter(
  (e) => e.method === 'Network.responseReceivedExtraInfo' && e.sessionId === sessionId,
)
for (const ex of extras) {
  const block = ex.params?.headers || {}
  for (const k of Object.keys(block)) {
    if (k.toLowerCase() !== 'set-cookie') continue
    const arr = Array.isArray(block[k]) ? block[k] : [block[k]]
    if (!setCookies.has(ex.params.requestId)) setCookies.set(ex.params.requestId, [])
    setCookies.get(ex.params.requestId).push(...arr)
  }
}

let bad = 0
const fails = []
for (const [reqId, cookies] of setCookies) {
  const url = responseHeaders.find((r) => r.requestId === reqId)?.response?.url || reqId
  for (const v of cookies) {
    console.log('  set-cookie:', v)
    if (/samesite=none/i.test(v) && !/secure/i.test(v)) {
      bad++
      fails.push(url + ' :: ' + v)
    }
  }
}

console.log('')
if (bad === 0) {
  console.log('COOKIE OK — SameSite=None без Secure не встретилось')
} else {
  console.log('COOKIE FAIL:')
  for (const f of fails) console.log('  -', f)
}

cleanup()
await wait(200)
process.exit(bad === 0 ? 0 : 1)
