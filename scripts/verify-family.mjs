// E2E семейной кассы: зарплата → платёж → доли по зарплате → оплата →
// список «Хотим» → чат → вход второго участника по коду.
// Всё через headless-Chrome, то есть глазами пользователя.
//
// Запуск: node scripts/verify-family.mjs
// Требуется dev-сервер на 127.0.0.1:8080.

import { setTimeout as wait } from 'node:timers/promises'
import { openBrowser, signUpFresh, FILL_BY } from './_cdp.mjs'

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080'
const S = Date.now().toString(36)
const NB = '[\\s\\u00a0\\u202f]' // Intl ru-RU разделяет разряды неразрывным пробелом

const br = await openBrowser({ port: 9358, tag: 'family' })
let fail = 0
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) fail++
}
/** Клик по кнопке с текстом. */
const click = (b, re) => b.evalIn(`(() => {
  const el = Array.from(document.querySelectorAll('button')).find(x => ${re}.test(x.textContent||''));
  if (el) { el.click(); return true; }
  return false;
})()`)
/** Значение поля по placeholder (в innerText значения инпутов не попадают). */
const value = (b, ph) => b.evalIn(
  `(() => { const i = document.querySelector('input[placeholder="${ph}"]'); return i ? i.value : 'нет поля' })()`,
)
/** Сохранить зарплату: заполнить и нажать «Ок» рядом. */
const setSalary = async (b, v) => {
  await b.evalIn(`(() => {
    const i = document.querySelector('input[placeholder="зарплата"]');
    if (!i) return 'нет поля';
    const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    s.call(i, ${JSON.stringify(String(v))});
    i.dispatchEvent(new Event('input', { bubbles: true }));
    i.dispatchEvent(new Event('change', { bubbles: true }));
    const btn = Array.from(i.parentElement.querySelectorAll('button')).find(x => /Ок/.test(x.textContent||''));
    if (btn) { btn.click(); return 'нажали'; }
    return 'нет кнопки';
  })()`)
  await wait(3000)
}

// --- участник 1: создаём кассу ---
await signUpFresh(br, ORIGIN, { name: `Семья ${S}`, login: `fam${S}`, password: '12345678' })
await br.goto(`${ORIGIN}/groups`)
await click(br, '/Создать/')
await wait(500)
await br.evalIn(FILL_BY([['Семья', `Семья ${S}`]]))
await wait(3500)

let t = await br.text()
const code = (t.match(/\b([A-Z0-9]{6,8})\b/) || [])[1]
check('касса создана, код есть', !!code, code || 'нет кода')

// входим внутрь
await br.evalIn(`(() => {
  const a = Array.from(document.querySelectorAll('a')).find(x => /\\/groups\\/h_/.test(x.getAttribute('href')||''));
  if (a) { location.href = a.getAttribute('href'); return true; }
  return false;
})()`)
await wait(3200)
const housePath = await br.path()
check('зашли внутрь кассы', /\/groups\/h_/.test(housePath), housePath)

// --- зарплата ---
await setSalary(br, 120000)
check('зарплата сохранилась', /120000/.test(String((await value(br, 'зарплата'))?.result?.value)))

// --- платёж поровну ---
// Форма раскрывается кнопкой С ТЕКСТОМ «Добавить платёж», а не иконкой-плюсом
// (плюс в шапке — это «копировать код»).
await click(br, '/Добавить платёж/')
await wait(600)
// Заполняем по placeholder: позиционно первый input на странице — зарплата,
// и название платежа уехало бы в неё.
await br.evalIn(FILL_BY([['Аренда', 'Аренда'], ['45000', 45000], ['день', 15]]))
await wait(3500)
t = await br.text()
console.log('\nплатежи кассы:\n ', t.slice(0, 420).replace(/\n+/g, ' | '), '\n')
check('платёж добавился', /Аренда/.test(t))
check('видна сумма 45 000', new RegExp(`45${NB}000`).test(t))
check('виден день 15 числа', /15 числа/.test(t))
check('видна доля', /ваша доля/.test(t))

// --- «Хотим» ---
await click(br, '/^Хотим$/')
await wait(700)
await click(br, '/Хотим купить/')
await wait(600)
await br.evalIn(FILL_BY([['Пылесос', 'Пылесос'], ['12000', 12000]]))
await wait(3500)
t = await br.text()
console.log('хотим:\n ', t.slice(0, 300).replace(/\n+/g, ' | '), '\n')
check('желание добавилось', /Пылесос/.test(t))
check('в желании видна сумма', new RegExp(`12${NB}000`).test(t))

// --- чат ---
await click(br, '/^Чат$/')
await wait(700)
await br.evalIn(FILL_BY([['написать в кассу', `Купил хлеб ${S}`]]))
await wait(3200)
t = await br.text()
console.log('чат:\n ', t.slice(0, 300).replace(/\n+/g, ' | '), '\n')
check('сообщение ушло в чат', new RegExp(`Купил хлеб ${S}`).test(t))

// --- второй участник по коду ---
const br2 = await openBrowser({ port: 9359, tag: 'family2' })
await signUpFresh(br2, ORIGIN, { name: `Второй ${S}`, login: `fam2${S}`, password: '12345678' })
await br2.goto(`${ORIGIN}/groups`)
await click(br2, '/Войти по коду/')
await wait(600)
const joinRes = await br2.evalIn(FILL_BY([['A2B3C4D', code || '']]))
await wait(3500)
let t2 = await br2.text()
console.log('\nвторой участник:\n ', t2.slice(0, 320).replace(/\n+/g, ' | '), '\n')
check('второй вошёл по коду', /Семья/.test(t2) && !/Пока пусто/.test(t2), `join=${joinRes?.result?.value}`)

// второй заходит в кассу и ставит зарплату 60 000
await br2.goto(`${ORIGIN}${housePath}`)
await wait(3500)
await setSalary(br2, 60000)
check('зарплата второго сохранилась', /60000/.test(String((await value(br2, 'зарплата'))?.result?.value)))

// --- доли по зарплате: 120 000 / 60 000 → 2/3 и 1/3 от 45 000 ---
await br.goto(`${ORIGIN}${housePath}`)
await wait(3500)
await click(br, '/Добавить платёж/')
await wait(600)
await click(br, '/^по зарплате$/')
await wait(300)
await br.evalIn(FILL_BY([['Аренда', 'Свет'], ['45000', 45000], ['день', 20]]))
await wait(4000)
t = await br.text()
console.log('\nплатёж по зарплате (первый):\n ', t.slice(0, 460).replace(/\n+/g, ' | '), '\n')
check('в кассе видно второго', new RegExp(`Второй ${S}`).test(t), (t.match(/Второй \w+/) || [])[0] || '')
check('доля первого — 30 000', new RegExp(`30${NB}000`).test(t))

await br2.goto(`${ORIGIN}${housePath}`)
await wait(4000)
t2 = await br2.text()
console.log('платёж по зарплате (второй):\n ', t2.slice(0, 460).replace(/\n+/g, ' | '), '\n')
check('доля второго — 15 000', new RegExp(`15${NB}000`).test(t2))
check('второй видит общую сумму 45 000', new RegExp(`45${NB}000`).test(t2))

// --- ошибки по дороге ---
for (const [label, b] of [['первый', br], ['второй', br2]]) {
  const js = b.events
    .filter((e) => e.method === 'Runtime.exceptionThrown')
    .map((e) => e.params?.exceptionDetails?.exception?.description || '')
    .filter((s) => !/ResizeObserver|hydrat/i.test(s))
  const h5 = b.events
    .filter((e) => e.method === 'Network.responseReceived')
    .filter((e) => (e.params?.response?.status || 0) >= 500)
    .map((e) => `${e.params.response.status} ${(e.params.response.url || '').slice(0, 80)}`)
  check(`${label}: без JS-исключений`, js.length === 0, js[0]?.split('\n')[0] || '')
  check(`${label}: без 500-х`, h5.length === 0, h5[0] || '')
}

br.close()
br2.close()
console.log(fail === 0 ? '\nFAMILY OK' : `\nFAMILY FAIL (${fail})`)
await wait(200)
process.exit(fail === 0 ? 0 : 1)
