// Статический сканер: ищем расхождение между числом $N-плейсхолдеров в SQL
// и числом переданных параметров. Именно так сломан был createHouse —
// «bind message supplies 5 parameters, but prepared statement requires 4»,
// и упало это только при реальном нажатии «Создать кассу».
//
// Запуск: node scripts/check-sql-arity.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(p)) out.push(p)
  }
  return out
}

/** Находит конец массива/вызова, считая вложенные скобки. */
function matchBracket(s, openIdx) {
  const open = s[openIdx]
  const close = open === '(' ? ')' : open === '[' ? ']' : '}'
  let depth = 0
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i]
    if (c === '`' && s[i - 1] !== '\\') {
      // пропускаем шаблонные строки целиком
      const end = s.indexOf('`', i + 1)
      if (end === -1) break
      i = end
      continue
    }
    if (c === "'" || c === '"') {
      const end = s.indexOf(c, i + 1)
      if (end === -1) break
      i = end
      continue
    }
    if (c === open) depth++
    else if (c === close) {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

/** Считает элементы верхнего уровня внутри [...]. */
function countTopLevel(s) {
  // Хвостовая запятая — обычный стиль ([a, b, c,]), элементом не считается.
  const inner = s.slice(1, -1).trim().replace(/,\s*$/, '')
  if (!inner) return 0
  let n = 1
  let depth = 0
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i]
    if (c === '`' ) { const e = inner.indexOf('`', i + 1); if (e === -1) break; i = e; continue }
    if (c === "'" || c === '"') { const e = inner.indexOf(c, i + 1); if (e === -1) break; i = e; continue }
    if ('([{'.includes(c)) depth++
    else if (')]}'.includes(c)) depth--
    else if (c === ',' && depth === 0) n++
  }
  return n
}

const files = walk(SRC)
let found = 0

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  // ищем q(`...` , [...]) и q1(`...` , [...]) и pg.query(...)
  const re = /\b(q|q1|query)\s*\(\s*`/g
  let m
  while ((m = re.exec(src))) {
    const sqlStart = m.index + m[0].length - 1
    const sqlEnd = src.indexOf('`', sqlStart + 1)
    if (sqlEnd === -1) continue
    const sql = src.slice(sqlStart + 1, sqlEnd)

    // после SQL ищем [
    let i = sqlEnd + 1
    while (i < src.length && /\s|,/.test(src[i])) i++
    if (src[i] !== '[') continue
    const arrEnd = matchBracket(src, i)
    if (arrEnd === -1) continue
    const arr = src.slice(i, arrEnd + 1)

    // максимальный номер плейсхолдера
    let max = 0
    for (const pm of sql.matchAll(/\$(\d+)/g)) max = Math.max(max, Number(pm[1]))
    if (max === 0) continue // без плейсхолдеров — нечего сверять

    const n = countTopLevel(arr)
    if (n !== max) {
      found++
      const line = src.slice(0, m.index).split('\n').length
      console.log(`${relative(ROOT, file)}:${line}`)
      console.log(`   плейсхолдеров: ${max}, параметров: ${n}`)
      const one = sql.replace(/\s+/g, ' ').trim()
      console.log(`   SQL: ${one.slice(0, 150)}`)
      console.log(`   ARR: ${arr.replace(/\s+/g, ' ').slice(0, 150)}`)
      console.log('')
    }
  }
}

console.log(found === 0 ? 'SQL ARITY OK — расхождений нет' : `SQL ARITY: найдено ${found}`)
process.exit(found === 0 ? 0 : 1)
