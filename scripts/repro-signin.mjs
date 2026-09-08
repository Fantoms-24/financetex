// Воспроизведение входа «по-настоящему»: headless-Chrome через CDP
// открывает /login, регистрирует свежего пользователя, затем входит им же
// и печатает тело ответа signIn. Нужен, когда форма отдаёт общее
// «Не получилось войти» и непонятно, что именно вернул сервер.
//
// Запуск: node scripts/repro-signin.mjs
// Требуется поднятый dev-сервер на 127.0.0.1:8080.

import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9344
const APP = process.env.URL || 'http://127.0.0.1:8080/login'
const SUFFIX = Date.now().toString(36)
const LOGIN = (process.env.LOGIN || `rp${SUFFIX}`)
const NAME = (process.env.NAME || `RP ${SUFFIX}`)
const PASSWORD = process.env.PASSWORD || '12345678'

const userDir = `C:\\Users\\vasya\\AppData\\Local\\Temp\\chrome-repro-${SUFFIX}`
const chrome = spawn(
  CHROME,
  [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    '--no-default-browser-check', `--user-data-dir=${userDir}`,
    `--remote-debugging-port=${PORT}`, '--remote-allow-origins=*', 'about:blank',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
)

let killed = false
const cleanup = () => { if (!killed) { killed = true; try { chrome.kill('SIGTERM') } catch {} } }
process.on('exit', cleanup)

let info
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
    if (r.ok) { info = await r.json(); break }
  } catch {}
  await wait(150)
}
if (!info) { console.error('DevTools не поднялся'); cleanup(); process.exit(2) }

const ws = new WebSocket(info.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  ws.addEventListener('open', () => res(), { once: true })
  ws.addEventListener('error', () => rej(new Error('ws error')), { once: true })
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
  } else if (m.method) events.push(m)
})
const send = (method, params = {}, sessionId) => {
  const id = ++nextId
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify(sessionId ? { id, sessionId, method, params } : { id, method, params }))
  })
}

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, sessionId)
await send('Runtime.enable', {}, sessionId)
await send('Network.enable', { enableRequestHeaders: true }, sessionId)

const navDone = new Promise((res) => {
  const h = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.method === 'Page.loadEventFired' && m.sessionId === sessionId) { ws.removeEventListener('message', h); res() }
  }
  ws.addEventListener('message', h)
})
await send('Page.navigate', { url: APP }, sessionId)
await navDone
await wait(1200)

const fill = (mode, values) => `
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const setVal = (el, value) => {
      const proto = window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (let i = 0; i < 60; i++) { if (document.querySelector('form')) break; await sleep(80); }
    // ${mode === 'up' ? 'переключаем на «Создать»' : 'оставляем «Войти»'}
    ${mode === 'up'
      ? `const tab = Array.from(document.querySelectorAll('button')).find(b => /^\\s*Создать\\s*$/.test(b.textContent||'')); if (tab) tab.click(); await sleep(250);` : ''}
    const inputs = Array.from(document.querySelectorAll('input'));
    ${JSON.stringify(values)}.forEach((v, i) => { if (inputs[i]) setVal(inputs[i], v); });
    await sleep(150);
    const form = document.querySelector('form');
    if (form) form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    console.log('REPRO submitted inputs=' + inputs.length);
  })()
`

const evalIn = (expr) =>
  send('Runtime.evaluate', { expression: expr, awaitPromise: true }, sessionId)

console.log(`=== 1) signUp ${LOGIN} ===`)
await evalIn(fill('up', [NAME, LOGIN, PASSWORD]))
await wait(3000)

const dumpResponses = async (label) => {
  console.log(`--- ответы ${label} ---`)
  for (const e of events) {
    if (e.method !== 'Network.responseReceived' || e.sessionId !== sessionId) continue
    const r = e.params
    const url = r.response?.url || ''
    if (!/\/_serverFn\//.test(url)) continue
    // вытаскиваем имя экспорта из base64 в URL
    let fn = '?'
    try {
      const b64 = url.split('/_serverFn/')[1]
      fn = JSON.parse(Buffer.from(b64, 'base64').toString('utf8')).export || '?'
    } catch {}
    let body = ''
    try {
      const out = await send('Network.getResponseBody', { requestId: r.requestId }, sessionId)
      body = out.body || ''
    } catch (err) {
      body = '<нет тела: ' + err.message + '>'
    }
    if (!/signIn|signUp/.test(fn)) continue
    console.log(`  ${r.response?.status}  ${fn}`)
    console.log('  тело:', body.slice(0, 900))
  }
}
await dumpResponses('signUp')

// Чистим cookie И localStorage: токен лежит в localStorage (persist
// `chekagent-v7`), и без его очистки /login сразу редиректит на меню —
// signIn просто не успевает выстрелить.
events.length = 0
await send('Network.clearBrowserCookies', {}, sessionId)
await send(
  'Storage.clearDataForOrigin',
  { origin: new URL(APP).origin, storageTypes: 'local_storage,session_storage,indexeddb' },
  sessionId,
)
await send('Page.navigate', { url: APP }, sessionId)
await wait(3000)
const afterClear = await send(
  'Runtime.evaluate',
  { expression: `localStorage.getItem('chekagent-v7') ? 'TOKEN ЖИВ' : 'чисто'`, returnByValue: true },
  sessionId,
)
console.log('\nпосле очистки localStorage:', afterClear.result?.value)

console.log(`\n=== 2) signIn ${LOGIN} ===`)
await evalIn(fill('in', [LOGIN, PASSWORD]))
await wait(3000)
await dumpResponses('signIn')

console.log('\n=== видно на странице ===')
const dom = await send('Runtime.evaluate', {
  expression: `document.body.innerText.replace(/\\s+/g,' ').trim().slice(0,600)`,
  returnByValue: true,
}, sessionId)
console.log(dom.result?.value)

cleanup()
await wait(200)
process.exit(0)
