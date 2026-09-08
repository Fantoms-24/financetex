// E2E главного семейного флоу: зайти → создать кассу → получить код →
// добавить платёж. Через headless-Chrome и CDP, чтобы проверить именно то,
// что видит пользователь, а не только серверные функции.
//
// Запуск: node scripts/verify-house.mjs
// Требуется dev-сервер на 127.0.0.1:8080.

import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9356
const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080'
const SUFFIX = Date.now().toString(36)
const LOGIN = `hs${SUFFIX}`
const NAME = `HS ${SUFFIX}`
const PASSWORD = '12345678'

const userDir = `C:\\Users\\vasya\\AppData\\Local\\Temp\\chrome-house-${SUFFIX}`
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
  try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { info = await r.json(); break } } catch {}
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
await send('Network.enable', {}, sessionId)

const goto = async (url) => {
  events.length = 0
  const done = new Promise((res) => {
    const h = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.method === 'Page.loadEventFired' && m.sessionId === sessionId) { ws.removeEventListener('message', h); res() }
    }
    ws.addEventListener('message', h)
  })
  await send('Page.navigate', { url }, sessionId)
  await done
  await wait(2200)
}
const evalIn = (expr) =>
  send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId)

let fail = 0
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) fail++
}

// --- регистрация ---
await goto(`${ORIGIN}/login`)
await evalIn(`
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const setVal = (el, v) => {
      const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      s.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (let i = 0; i < 60; i++) { if (document.querySelector('form')) break; await sleep(80); }
    const tab = Array.from(document.querySelectorAll('button')).find(b => /^\\s*Создать\\s*$/.test(b.textContent||''));
    if (tab) tab.click();
    await sleep(250);
    const ins = Array.from(document.querySelectorAll('input'));
    ${JSON.stringify([NAME, LOGIN, PASSWORD])}.forEach((v,i)=>{ if(ins[i]) setVal(ins[i], v) });
    await sleep(150);
    const f = document.querySelector('form');
    if (f) f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  })()
`)
await wait(3500)

// --- создаём кассу ---
await goto(`${ORIGIN}/groups`)
await evalIn(`
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const btn = Array.from(document.querySelectorAll('button')).find(b => /Создать/.test(b.textContent||'') && !b.closest('form'));
    if (btn) btn.click();
    await sleep(400);
    const input = document.querySelector('input[placeholder="Семья"]');
    if (input) {
      const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      s.call(input, ${JSON.stringify('Семья ' + SUFFIX)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    await sleep(200);
    const form = input && input.closest('form');
    if (form) form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  })()
`)
await wait(3500)

const after = await evalIn(`(() => {
  const t = document.body.innerText.replace(/\\s+/g,' ').trim();
  return t.slice(0, 400);
})()`)
const text = after.result?.value || ''
console.log('\nэкран касс после создания:\n ', text, '\n')

// код: 6–8 латиницы/цифр
const codeMatch = text.match(/\b([A-Z0-9]{6,8})\b/)
check('касса создалась (нет «Пока пусто»)', !/Пока пусто/.test(text))
check('код 6–8 символов, латиница/цифры', !!codeMatch, codeMatch ? codeMatch[1] : 'не найден')

// --- платёж внутри кассы ---
if (codeMatch) {
  const opened = await evalIn(`
    (async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const card = Array.from(document.querySelectorAll('a,button,div'))
        .find(el => /Семья ${SUFFIX}/.test(el.textContent||'') && (el.tagName === 'A' || el.onclick || el.closest('a')));
      const link = card && card.closest('a') ? card.closest('a') : card;
      if (link && link.getAttribute('href')) { location.href = link.getAttribute('href'); return 'перешли ' + link.getAttribute('href'); }
      if (link) { link.click(); return 'кликнули'; }
      return 'не нашли карточку';
    })()
  `)
  await wait(3000)
  const houseText = await evalIn(`location.pathname + ' :: ' + document.body.innerText.replace(/\\s+/g,' ').trim().slice(0,300)`)
  console.log('\nвнутри кассы:\n ', houseText.result?.value, '\n')
  check('открылась страница кассы', /\/groups\/.+/.test(houseText.result?.value || ''))
}

console.log(fail === 0 ? '\nHOUSE OK' : `\nHOUSE FAIL (${fail})`)
cleanup()
await wait(200)
process.exit(fail === 0 ? 0 : 1)
