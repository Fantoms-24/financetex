// Обход всех экранов живым пользователем: регистрируется, ходит по роутам
// и печатает видимый текст + любые ошибки (исключения, 500-е).
// Нужно, чтобы поймать runtime-поломки, которых не видно на загрузке.
//
// Запуск: node scripts/walk-screens.mjs
// ORIGIN — откуда открывать (по умолчанию http://127.0.0.1:8080).
// Требуется dev-сервер.

import { setTimeout as wait } from 'node:timers/promises'
import { openBrowser, signUpFresh } from './_cdp.mjs'

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080'
const S = Date.now().toString(36)

const SCREENS = [
  '/', '/receipts', '/scan', '/groups', '/bills', '/agent', '/settings', '/admin',
]

const br = await openBrowser({ port: 9355, tag: 'walk' })
await signUpFresh(br, ORIGIN, { name: `WK ${S}`, login: `wk${S}`, password: '12345678' })

// Заглушка Chrome вместо приложения загружается «успешно»: без этой проверки
// обход молча зелёный на странице «Подключение не защищено».
const stub = await br.errorPage()
console.log(
  'после регистрации:',
  await br.path(),
  '|',
  stub ? `ЗАГЛУШКА БРАУЗЕРА: ${stub}` : (await br.text()).slice(0, 120),
  '\n',
)

let bad = 0
for (const p of SCREENS) {
  await br.goto(ORIGIN + p)

  const stubErr = await br.errorPage()
  const t = await br.text()

  const errs = br.events
    .filter((e) => e.method === 'Runtime.exceptionThrown')
    .map((e) => e.params?.exceptionDetails?.exception?.description || e.params?.exceptionDetails?.text || '')
    .filter((s) => !/ResizeObserver|hydrat/i.test(s))

  const http5xx = br.events
    .filter((e) => e.method === 'Network.responseReceived')
    .filter((e) => (e.params?.response?.status || 0) >= 500)
    .map((e) => `${e.params.response.status} ${(e.params.response.url || '').slice(0, 70)}`)

  const problems = [
    ...(stubErr ? [`заглушка браузера: ${stubErr}`] : []),
    ...errs.map((s) => 'JS: ' + s.split('\n')[0]),
    ...http5xx,
  ]
  const ok = problems.length === 0 && t.length > 40
  if (!ok) bad++

  console.log(`${ok ? 'ok  ' : 'FAIL'} ${p}  (символов: ${t.length})`)
  console.log(`     ${t.slice(0, 240)}`)
  for (const x of problems.slice(0, 4)) console.log(`     ! ${x}`)
}

br.close()
console.log(bad === 0 ? '\nWALK OK — все экраны отрисовались без ошибок' : `\nWALK FAIL (${bad})`)
await wait(200)
process.exit(bad === 0 ? 0 : 1)
