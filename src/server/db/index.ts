import { APP_TABLES, AUTH_TABLES, HEAL_STATEMENTS } from './schema'

export type Row = Record<string, any>

export interface DB {
  query<T = Row>(sql: string, params?: Array<unknown>): Promise<Array<T>>
  kind: 'pg' | 'pglite'
}

let initPromise: Promise<DB> | null = null

export function getDB(): Promise<DB> {
  if (!initPromise) initPromise = create()
  return initPromise
}

async function create(): Promise<DB> {
  const url = (process.env.DATABASE_URL || '').trim()
  let db: DB

  if (url) {
    const { Pool } = await import('pg')
    const pool = new Pool({
      connectionString: url,
      max: 6,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 15_000,
      ...(url.includes('localhost') || url.includes('127.0.0.1')
        ? {}
        : { ssl: { rejectUnauthorized: false } }),
    })
    db = {
      kind: 'pg',
      async query(sql, params = []) {
        const r = await pool.query(sql, params as Array<any>)
        return r.rows as Array<any>
      },
    }
  } else {
    // PGlite — только для локальной разработки и превью: в собранной
    // serverless-функции его .wasm/.data не находятся, поэтому там без
    // DATABASE_URL работать не будет. Падаем понятным сообщением, а не ENOENT.
    let PGlite: any
    try {
      ;({ PGlite } = await import('@electric-sql/pglite'))
    } catch (e) {
      throw new Error(
        'Не задана DATABASE_URL, а локальная БД (PGlite) не загрузилась. ' +
          'На сервере задайте DATABASE_URL — подробности в .env.example.',
      )
    }
    let pg: any
    try {
      pg = new PGlite(process.env.PGLITE_DIR || '.pglite-data')
      await pg.waitReady
    } catch (e) {
      throw new Error(
        `Не задана DATABASE_URL, а локальная БД (PGlite) не поднялась: ${(e as Error)?.message}. ` +
          'Запускайте локально через npm run dev либо задайте DATABASE_URL.',
      )
    }
    db = {
      kind: 'pglite',
      async query(sql, params = []) {
        const r = await pg.query(sql, params as Array<any>)
        return (r.rows || []) as Array<any>
      },
    }
  }

  await migrate(db)
  return db
}

export async function migrate(db: DB) {
  for (const sql of [...AUTH_TABLES, ...APP_TABLES]) {
    try {
      await db.query(sql)
    } catch (e) {
      console.error('[db] migrate failed:', (e as Error)?.message)
    }
  }
  await heal(db)
}

export async function heal(db: DB) {
  for (const [table, sql] of HEAL_STATEMENTS) {
    try {
      await db.query(sql)
    } catch {
      // таблицы могло не быть — её создаст migrate при следующем старте
    }
  }
  // Индексы-уникалки, которые нельзя выразить в CREATE TABLE без ошибок на старых БД
  const extra = [
    `CREATE UNIQUE INDEX IF NOT EXISTS house_members_unique ON house_members (house_id, user_id)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS push_subs_endpoint_uq ON push_subs (endpoint)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS account_issuer_account_id_uq ON "account" (issuer, "accountId")`,
  ]
  for (const sql of extra) {
    try {
      await db.query(sql)
    } catch {
      /* данные могут конфликтовать — не критично */
    }
  }
}

export async function q<T = Row>(sql: string, params: Array<unknown> = []): Promise<Array<T>> {
  const db = await getDB()
  return db.query<T>(sql, params)
}

export async function q1<T = Row>(sql: string, params: Array<unknown> = []): Promise<T | null> {
  const rows = await q<T>(sql, params)
  return rows[0] ?? null
}

/** Стабильный короткий id (не crypto.randomUUID — должен работать везде). */
export function newId(prefix = ''): string {
  const t = Date.now().toString(36)
  const r = Math.random().toString(36).slice(2, 8)
  const r2 = Math.random().toString(36).slice(2, 8)
  return `${prefix}${prefix ? '_' : ''}${t}${r}${r2}`
}
