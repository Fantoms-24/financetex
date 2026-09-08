import { APP_TABLES, AUTH_TABLES, HEAL_STATEMENTS } from './schema'
import { createRequire } from 'node:module'

const req = createRequire(import.meta.url)

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
  const rawUrl = (process.env.DATABASE_URL || '').trim()
  const isDummyUrl = !rawUrl || rawUrl.includes('ep-xxx') || rawUrl.includes('user:pass')
  const url = isDummyUrl ? '' : rawUrl
  let db: DB | null = null

  if (url) {
    try {
      let PoolClass: any
      try {
        const pgMod = req('pg')
        PoolClass = pgMod?.Pool || pgMod?.default?.Pool || pgMod
      } catch {
        const mod: any = await import('pg')
        PoolClass = mod?.Pool || mod?.default?.Pool || mod?.default || mod
      }
      if (typeof PoolClass !== 'function' && PoolClass?.Pool) {
        PoolClass = PoolClass.Pool
      }
      const pool = new PoolClass({
        connectionString: url,
        max: 6,
        idleTimeoutMillis: 20_000,
        connectionTimeoutMillis: 5_000,
        ...(url.includes('localhost') || url.includes('127.0.0.1')
          ? {}
          : { ssl: { rejectUnauthorized: false } }),
      })
      await pool.query('SELECT 1')
      console.log('[db] Connected to remote Postgres successfully')
      db = {
        kind: 'pg',
        async query(sql, params = []) {
          const r = await pool.query(sql, params as Array<any>)
          return r.rows as Array<any>
        },
      }
    } catch (e) {
      console.error('[db] Remote Postgres connection failed, falling back to local PGlite:', (e as Error)?.message || e)
    }
  }

  if (!db) {
    let PGlite: any
    try {
      ;({ PGlite } = await import('@electric-sql/pglite'))
    } catch (e) {
      throw new Error(
        'Не задана DATABASE_URL, а локальная БД (PGlite) не загрузилась. ' +
          'На сервере задайте DATABASE_URL — подробности в .env.example.',
      )
    }
    let pgliteInstance: any
    try {
      pgliteInstance = new PGlite(process.env.PGLITE_DIR || '.pglite-data')
      await pgliteInstance.waitReady
    } catch (e) {
      try {
        pgliteInstance = new PGlite()
        await pgliteInstance.waitReady
      } catch (err) {
        throw new Error(
          `Не задана DATABASE_URL, а локальная БД (PGlite) не поднялась: ${(e as Error)?.message}. ` +
            'Запускайте локально через npm run dev либо задайте DATABASE_URL.',
        )
      }
    }
    db = {
      kind: 'pglite',
      async query(sql, params = []) {
        const r = await pgliteInstance.query(sql, params as Array<any>)
        return (r.rows || []) as Array<any>
      },
    }
  }

  await migrate(db)
  return db
}

export async function migrate(db: DB) {
  try {
    const allTablesSql = [...AUTH_TABLES, ...APP_TABLES].join(';\n')
    await db.query(allTablesSql)
  } catch {
    for (const sql of [...AUTH_TABLES, ...APP_TABLES]) {
      try {
        await db.query(sql)
      } catch (e) {
        console.error('[db] migrate failed:', (e as Error)?.message)
      }
    }
  }
  await heal(db)
}

export async function heal(db: DB) {
  try {
    const healSql = HEAL_STATEMENTS.map(([, sql]) => sql).join(';\n')
    await db.query(healSql)
  } catch {
    for (const [table, sql] of HEAL_STATEMENTS) {
      try {
        await db.query(sql)
      } catch {
        // таблицы могло не быть — её создаст migrate при следующем старте
      }
    }
  }
  // Индексы-уникалки, которые нельзя выразить в CREATE TABLE без ошибок на старых БД
  const extra = [
    `CREATE UNIQUE INDEX IF NOT EXISTS house_members_unique ON house_members (house_id, user_id)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS push_subs_endpoint_uq ON push_subs (endpoint)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS account_issuer_account_id_uq ON "account" (issuer, "accountId")`,
  ]
  try {
    await db.query(extra.join(';\n'))
  } catch {
    for (const sql of extra) {
      try {
        await db.query(sql)
      } catch {
        /* данные могут конфликтовать — не критично */
      }
    }
  }
}

// Фоновый прогрев соединения с базой при запуске сервера
if (typeof process !== 'undefined' && process.env?.DATABASE_URL) {
  getDB().catch((err) => {
    console.warn('[db] Background pre-warm failed:', (err as Error)?.message)
  })
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
