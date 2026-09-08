// Проверка устанавливаемости: защищённый контекст, живой service worker
// с fetch-хендлером и манифест с иконками. Без этого Chrome на телефоне
// предлагает только ярлык, а не «Установить приложение».
//
// Запуск: node scripts/verify-pwa.mjs
// ORIGIN — откуда открывать (по умолчанию https://192.168.1.67:8080).

import { setTimeout as wait } from 'node:timers/promises'
import { openBrowser, signUpFresh } from './_cdp.mjs'

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080'
const S = Date.now().toString(36)

let fail = 0
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) fail++
}

const br = await openBrowser({ port: 9360, tag: 'pwa' })
await signUpFresh(br, ORIGIN, { name: `PWA ${S}`, login: `pwa${S}`, password: '12345678' })
await wait(2500)

const sw = await br.evalIn(`(async () => {
  const out = { secure: window.isSecureContext, hasSW: 'serviceWorker' in navigator };
  if (!out.hasSW) return out;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    out.scope = reg.scope;
    out.state = reg.active ? reg.active.state : 'нет active';
    out.scriptURL = reg.active ? reg.active.scriptURL : null;
  } catch (e) { out.error = String(e && e.message || e); }
  return out;
})()`)
const r = sw?.result?.value || {}

check('защищённый контекст', r.secure === true, String(r.secure))
check('service worker доступен', r.hasSW === true)
check('sw зарегистрирован', !!r.scope, r.scope || r.error || '')
check('sw активен', r.state === 'activated', r.state || '')

// Манифест: Chrome требует имя, standalone и иконки 192/512.
const man = await br.evalIn(`(async () => {
  const res = await fetch('/manifest.webmanifest');
  const m = await res.json();
  return {
    status: res.status,
    name: m.name || null,
    short: m.short_name || null,
    start: m.start_url || null,
    display: m.display || null,
    sizes: (m.icons || []).map(i => (i.sizes || '').split('x')[0]),
  };
})()`)
const m = man?.result?.value || {}
check('манифест отдаётся', m.status === 200, String(m.status))
check('в манифесте есть имя', !!m.name && !!m.short, `${m.name} / ${m.short}`)
check('standalone', m.display === 'standalone' || m.display === 'fullscreen', String(m.display))
check('иконка 192', (m.sizes || []).includes('192'), (m.sizes || []).join(','))
check('иконка 512', (m.sizes || []).includes('512'), (m.sizes || []).join(','))

// Иконки должны реально открываться, иначе установка сорвётся.
const icons = await br.evalIn(`(async () => {
  const urls = ['/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];
  const out = {};
  for (const u of urls) { const r = await fetch(u); out[u] = r.status; }
  return out;
})()`)
const ic = icons?.result?.value || {}
check('иконки отвечают 200', Object.values(ic).every((v) => v === 200), JSON.stringify(ic))

br.close()
console.log(fail === 0 ? '\nPWA OK — устанавливаемо' : `\nPWA FAIL (${fail})`)
await wait(200)
process.exit(fail === 0 ? 0 : 1)
