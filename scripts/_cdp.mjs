// Общая обвязка: поднять headless-Chrome, подключиться по DevTools Protocol,
// дать пару помощников (переход, eval, очистка хранилищ, вход).
// Используется скриптами проверок, чтобы не копировать 60 строк CDP в каждый.

import { execFileSync, spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import { setTimeout as wait } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

/**
 * Отпечаток открытого ключа самоподписанного сертификата из .dev-cert.
 * headless-Chrome не слушает --ignore-certificate-errors, но пускает
 * на страницу, если отпечаток ключа внести в белый список.
 */
function spkiHash() {
  try {
    if (!fs.existsSync('.dev-cert/cert.pem')) return null
    const pem = execFileSync('openssl', ['x509', '-in', '.dev-cert/cert.pem', '-pubkey', '-noout'])
    const der = execFileSync('openssl', ['pkey', '-pubin', '-outform', 'der'], {
      input: pem,
      maxBuffer: 1 << 20,
    })
    return createHash('sha256').update(der).digest('base64')
  } catch {
    return null
  }
}

export async function openBrowser({ port, tag }) {
  const userDir = `C:\\Users\\vasya\\AppData\\Local\\Temp\\chrome-${tag}-${Date.now().toString(36)}`
  const hash = spkiHash()
  const chrome = spawn(
    CHROME,
    [
      '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
      '--no-default-browser-check', `--user-data-dir=${userDir}`,
      // dev:https — самоподписанный сертификат, иначе Chrome не пустит на страницу
      ...(hash ? [`--ignore-certificate-errors-spki-list=${hash}`] : []),
      `--remote-debugging-port=${port}`, '--remote-allow-origins=*', 'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )

  let killed = false
  const close = () => { if (!killed) { killed = true; try { chrome.kill('SIGTERM') } catch {} } }
  process.on('exit', close)

  let info
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (r.ok) { info = await r.json(); break }
    } catch {}
    await wait(150)
  }
  if (!info) { close(); throw new Error('DevTools не поднялся на порту ' + port) }

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

  // dev:https — свой сертификат. Флаг --ignore-certificate-errors в headless
  // игнорируется, работает только домен Security, и включать его надо на
  // браузерном соединении, до создания вкладки.
  await send('Security.enable').catch(() => {})
  await send('Security.setIgnoreCertificateErrors', { ignore: true }).catch(() => {})

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  await send('Page.enable', {}, sessionId)
  await send('Runtime.enable', {}, sessionId)
  await send('Network.enable', {}, sessionId)
  await send('Security.enable', {}, sessionId).catch(() => {})
  await send('Security.setIgnoreCertificateErrors', { ignore: true }, sessionId).catch(() => {})

  const evalIn = (expr) =>
    send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId)

  const goto = async (url) => {
    events.length = 0
    const done = new Promise((res) => {
      const h = (ev) => {
        const m = JSON.parse(ev.data)
        if (m.method === 'Page.loadEventFired' && m.sessionId === sessionId) {
          ws.removeEventListener('message', h)
          res()
        }
      }
      ws.addEventListener('message', h)
    })
    await send('Page.navigate', { url }, sessionId)
    await done
    await wait(2200)
  }

  const text = async () => (await evalIn(`document.body.innerText.replace(/\\s+/g,' ').trim()`)).result?.value || ''
  const path = async () => (await evalIn(`location.pathname`)).result?.value || ''

  /**
   * Страница-заглушка Chrome вместо приложения (нет сервера, битой сертификат
   * и т.п.). Такая страница успешно «загружается», и проверки молча проходят
   * на пустом месте — поэтому её надо ловить явно.
   */
  const errorPage = async () => {
    const t = await text()
    const m = t.match(/NET::ERR_[A-Z_]+|ERR_CERT_[A-Z_]+/)
    if (/Подключение не защищено|This site can't be reached|не удалось получить доступ/i.test(t)) {
      return m ? m[0] : 'страница-заглушка Chrome'
    }
    return m ? m[0] : null
  }

  /** Чистит cookie и localStorage: по любому из них сессия восстановится. */
  const clearSession = async (origin) => {
    await send('Network.clearBrowserCookies', {}, sessionId)
    await send(
      'Storage.clearDataForOrigin',
      { origin, storageTypes: 'local_storage,session_storage,indexeddb' },
      sessionId,
    )
  }

  return { close, send, sessionId, evalIn, goto, text, path, errorPage, clearSession, events }
}

/**
 * Заполняет инпуты по placeholder и сабмитит форму, в которой они лежат.
 * Надёжнее позиционного FILL_SUBMIT: на странице кассы первый input — это
 * зарплата, и позиционная раскладка уезжает (название платежа получает сумму).
 *
 *   FILL_BY([['Аренда', 'Аренда'], ['45000', 45000], ['день', 15]])
 */
export const FILL_BY = (pairs) => `
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const setVal = (el, v) => {
      const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      s.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (let i = 0; i < 60; i++) { if (document.querySelector('input')) break; await sleep(80); }
    let form = null;
    for (const [ph, v] of ${JSON.stringify(pairs.map(([a, b]) => [a, String(b)]))}) {
      const el = document.querySelector('input[placeholder="' + ph + '"]');
      if (!el) return 'нет поля: ' + ph;
      setVal(el, v);
      form = el.closest('form') || form;
    }
    await sleep(150);
    if (!form) return 'нет формы';
    form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    return 'ok';
  })()
`

/** Клик по кнопке с текстом внутри формы/страницы. */
export const CLICK_TEXT = (re) => `
  (() => {
    const b = Array.from(document.querySelectorAll('button')).find((x) => ${re}.test(x.textContent || ''));
    if (b) { b.click(); return true; }
    return false;
  })()
`

/** Заполняет инпуты по порядку и сабмитит форму. */
export const FILL_SUBMIT = (values) => `
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const setVal = (el, v) => {
      const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      s.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    for (let i = 0; i < 60; i++) { if (document.querySelector('input')) break; await sleep(80); }
    const ins = Array.from(document.querySelectorAll('input'));
    ${JSON.stringify(values)}.forEach((v, i) => { if (ins[i]) setVal(ins[i], String(v)); });
    await sleep(150);
    const f = document.querySelector('form');
    if (!f) return 'нет формы';
    f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    return 'ok';
  })()
`

/** Регистрация свежего пользователя на /login. */
export async function signUpFresh(br, origin, { name, login, password }) {
  await br.goto(`${origin}/login`)
  await br.evalIn(`
    (async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let i = 0; i < 60; i++) { if (document.querySelector('form')) break; await sleep(80); }
      const tab = Array.from(document.querySelectorAll('button')).find(b => /^\\s*Создать\\s*$/.test(b.textContent||''));
      if (tab) tab.click();
      await sleep(250);
    })()
  `)
  await br.evalIn(FILL_SUBMIT([name, login, password]))
  await wait(3500)
}
