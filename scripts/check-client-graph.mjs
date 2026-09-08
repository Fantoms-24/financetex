// Обходит граф клиентских модулей dev-сервера, начиная с точки входа.
// Vite отдаёт 500 с текстом ошибки на любой модуль, который не смог
// трансформироваться — именно так ловятся «пустая страница» из-за
// упавшей гидратации.
const BASE = process.env.BASE || 'http://127.0.0.1:8080'
const ENTRY = '/@id/virtual:tanstack-start-dev-client-entry'
const MAX = Number(process.env.MAX || 400)

const seen = new Map()
const bad = []
const queue = [ENTRY]

const IMPORT_RE = /(?:^|[\s;])(?:import|export)[\s\S]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g

function extract(code) {
  const out = new Set()
  for (const m of code.matchAll(IMPORT_RE)) {
    const spec = m[1] || m[2] || m[3]
    if (spec) out.add(spec)
  }
  return [...out]
}

// Пропускаем то, что не похоже на модуль: голые имена из комментариев и док-блоков
// (например «MyComponent» внутри react-refresh). Реальный модуль — это виртуальный
// (/@...) или путь с расширением.
function looksLikeModule(spec) {
  if (spec.startsWith('/@')) return true
  return /\.(m?[jt]sx?|css)(\?|$)/.test(spec)
}

function resolveSpec(spec, fromUrl) {
  if (!looksLikeModule(spec)) return null
  if (spec.startsWith('/')) return spec
  if (spec.startsWith('./') || spec.startsWith('../')) {
    try {
      return new URL(spec, BASE + fromUrl).pathname + new URL(spec, BASE + fromUrl).search
    } catch {
      return null
    }
  }
  return null // внешние и bare-модули пропускаем
}

while (queue.length && seen.size < MAX) {
  const url = queue.shift()
  if (seen.has(url)) continue
  seen.set(url, true)

  let res
  try {
    res = await fetch(BASE + url)
  } catch (e) {
    bad.push([url, 'fetch: ' + e.message])
    continue
  }
  if (!res.ok) {
    bad.push([url, res.status + ' ' + (await res.text()).slice(0, 200)])
    continue
  }
  const code = await res.text()
  // Строго с начала: внутри /@vite/client и react-refresh встречается
  // подстрока «Internal Server Error» — это не признак ошибки.
  if (/^\s*<(!DOCTYPE|html)/i.test(code)) {
    bad.push([url, 'html instead of js'])
    continue
  }
  if (res.headers.get('content-type')?.includes('javascript')) {
    for (const spec of extract(code)) {
      const next = resolveSpec(spec, url)
      if (next && !seen.has(next)) queue.push(next)
    }
  }
}

console.log('пройдено модулей:', seen.size)
if (bad.length) {
  console.log('\nПРОБЛЕМЫ:')
  for (const [u, why] of bad) console.log(' -', u, '→', why)
} else {
  console.log('битых модулей нет')
}
process.exit(bad.length ? 1 : 0)
