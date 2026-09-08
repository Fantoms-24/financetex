// E2E действий с данными: вписать чек руками и добавить повторяющийся платёж.
// Ловит поломки в SQL-слое, которые не видны на загрузке страницы
// (например, несовпадение числа плейсхолдеров и параметров).
//
// Запуск: node scripts/verify-actions.mjs
// Требуется dev-сервер на 127.0.0.1:8080.

import { setTimeout as wait } from 'node:timers/promises'
import { openBrowser, signUpFresh, FILL_SUBMIT } from './_cdp.mjs'

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080'
const SUFFIX = Date.now().toString(36)
const LOGIN = `ac${SUFFIX}`
const NAME = `AC ${SUFFIX}`
const PASSWORD = '12345678'

const br = await openBrowser({ port: 9357, tag: 'actions' })

let fail = 0
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) fail++
}

await signUpFresh(br, ORIGIN, { name: NAME, login: LOGIN, password: PASSWORD })
check('вошли', (await br.path()) === '/', await br.path())

// --- 1. чек руками ---
await br.goto(`${ORIGIN}/receipts`)
await br.evalIn(`(() => {
  const b = Array.from(document.querySelectorAll('button')).find(x => /Вписать/.test(x.textContent||''));
  if (b) b.click();
  return 'ok';
})()`)
await wait(600)
await br.evalIn(FILL_SUBMIT(['Пятёрочка', 1250, 'хлеб и молоко']))
await wait(3500)
let t = await br.text()
console.log('\nчек:\n ', t.slice(0, 300), '\n')
check('чек лег в ящик (нет «Пока пусто»)', !/Пока пусто/.test(t))
check('в ящике видна сумма 1250', /1\s?250/.test(t))
check('в ящике видно «Пятёрочка»', /Пятёрочка/.test(t))

// --- 2. повторяющийся платёж ---
// Форма спрятана за «+» в шапке ({open ? <form> : null}) — сначала раскрываем.
await br.goto(`${ORIGIN}/bills`)
await br.evalIn(`(() => {
  const b = Array.from(document.querySelectorAll('button')).find(
    (x) => !(x.textContent || '').trim() && x.querySelector('svg'),
  );
  if (b) b.click();
  return b ? 'раскрыли' : 'не нашли +';
})()`)
await wait(600)
await br.evalIn(FILL_SUBMIT(['Интернет', 900, 15]))
await wait(3500)
t = await br.text()
console.log('платежи:\n ', t.slice(0, 300), '\n')
check('платёж добавился (нет «Пока пусто»)', !/Пока пусто/.test(t))
check('в списке виден «Интернет»', /Интернет/.test(t))
check('в списке видна сумма 900', /900/.test(t))

// --- 3. ошибки и 500-е по дороге ---
const jsErrors = br.events
  .filter((e) => e.method === 'Runtime.exceptionThrown')
  .map((e) => e.params?.exceptionDetails?.exception?.description || '')
  .filter((s) => !/ResizeObserver|hydrat/i.test(s))
const http5xx = br.events
  .filter((e) => e.method === 'Network.responseReceived')
  .filter((e) => (e.params?.response?.status || 0) >= 500)
  .map((e) => `${e.params.response.status} ${(e.params.response.url || '').slice(0, 90)}`)

check('без JS-исключений', jsErrors.length === 0, jsErrors[0]?.split('\n')[0] || '')
check('без 500-х', http5xx.length === 0, http5xx[0] || '')

console.log(fail === 0 ? '\nACTIONS OK' : `\nACTIONS FAIL (${fail})`)
br.close()
await wait(200)
process.exit(fail === 0 ? 0 : 1)
