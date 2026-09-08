// Проверка крона напоминаний без HTTP: грузим серверные модули через
// Vite SSR и гоняем runTick на настоящей (локальной) БД.
// Ключевой критерий ТЗ: слот не сгорает вхолостую — last_alert_key
// пишется только когда пуш реально ушёл (sent > 0).
import { createServer } from 'vite'
import { rmSync } from 'node:fs'

const dir = '.pglite-ticktest'
rmSync(dir, { recursive: true, force: true })
process.env.PGLITE_DIR = dir
// VAPID НЕ трогаем: .env в process.env подкладывает vite.config через loadEnv.
// Раньше здесь стояло `|| ''` — пустая строка перебивала .env, и тик уходил
// по пути «ключей нет» (генерировал и складывал их в БД), то есть проверял
// не тот сценарий, что работает на проде.

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let fail = 0
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) fail++
}

try {
  const db = await vite.ssrLoadModule('/src/server/db/index.ts')
  const tick = await vite.ssrLoadModule('/src/server/tick.ts')

  await db.getDB()

  const uid = 'u_tick'
  await db.q(
    `INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
     VALUES ($1, 'Тик', 'tick@chekagent.app', false, now(), now())
     ON CONFLICT (id) DO NOTHING`,
    [uid],
  )

  const today = new Date()
  const day2 = today.getDate() + 2
  const bid = db.newId('b')
  await db.q(
    `INSERT INTO recurring_bills (id, user_id, title, amount, day_of_month, notify)
     VALUES ($1, $2, 'Квартира', 45000, $3, true)`,
    [bid, uid, day2],
  )

  const keyOf = async () =>
    (await db.q1(`SELECT last_alert_key AS k FROM recurring_bills WHERE id = $1`, [bid]))?.k ?? null

  // 1. Подписок нет → sent = 0 → ключ НЕ должен записаться.
  const r1 = await tick.runTick(today)
  const k1 = await keyOf()
  check('прогон без подписок: checked >= 1', r1.checked >= 1, JSON.stringify(r1))
  check('прогон без подписок: sent = 0', r1.sent === 0, `sent=${r1.sent}`)
  check('слот не сгорел: last_alert_key пуст', k1 === null, `key=${k1}`)

  // 2. Есть подписка, но доставка падает → sent = 0 → слот тоже не сгорает.
  await db.q(
    `INSERT INTO push_subs (id, user_id, endpoint, p256dh, auth)
     VALUES ($1, $2, $3, 'p256dh-test', 'auth-test')
     ON CONFLICT (endpoint) DO NOTHING`,
    [db.newId('s'), uid, 'https://example.invalid/push/tick-test'],
  )
  const r2 = await tick.runTick(today)
  const k2 = await keyOf()
  check('прогон с битой подпиской: sent = 0', r2.sent === 0, JSON.stringify(r2))
  check('слот не сгорел при failed: ключ пуст', k2 === null, `key=${k2}`)

  // 3. Платеж уже оплачен в этом цикле → напоминание не шлём.
  const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  await db.q(
    `INSERT INTO bill_pays (bill_id, cycle, user_id) VALUES ($1, $2, $3)
     ON CONFLICT DO NOTHING`,
    [bid, monthKey(today), uid],
  )
  const before = await keyOf()
  const r3 = await tick.runTick(today)
  const after = await keyOf()
  check('оплаченный платёж не напоминаем', before === after && r3.sent === 0, JSON.stringify(r3))

  // 4. Дата вне окна 2/1/0 → напоминания нет (слот не тратим).
  const far = new Date(today)
  far.setDate(15)
  await db.q(`DELETE FROM bill_pays WHERE bill_id = $1`, [bid])
  await db.q(`UPDATE recurring_bills SET day_of_month = $2 WHERE id = $1`, [bid, 20])
  const r4 = await tick.runTick(today)
  check('день вне окна 2/1/0 — молчим', r4.sent === 0, JSON.stringify(r4))

  // 5. Порядок слотов: 2 дня → 1 день → сегодня, каждый по одному разу.
  const bills = await vite.ssrLoadModule('/src/server/functions/bills.ts')
  const { slotRank, parseAlertKey } = bills
  const cyc = monthKey(today)
  check('slotRank монотонен 2д<1д<0д', slotRank(2) < slotRank(1) && slotRank(1) < slotRank(0))
  check(
    'после «через 2 дня» слот «завтра» ещё не сгорел',
    !(parseAlertKey(`${cyc}:2`, cyc) >= slotRank(1)),
  )
  check(
    'повтор того же слота отсекается',
    parseAlertKey(`${cyc}:0`, cyc) >= slotRank(0),
  )
  check('чужой цикл не учитывается', parseAlertKey(`1999-01:0`, cyc) === null)
  check('пустой ключ → null', parseAlertKey(null, cyc) === null)
} catch (e) {
  fail++
  console.error('ERROR', e)
} finally {
  await vite.close()
}

console.log(fail === 0 ? '\nTICK OK' : `\nTICK FAIL (${fail})`)
process.exit(fail === 0 ? 0 : 1)
