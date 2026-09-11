import { AsyncLocalStorage } from 'node:async_hooks'
import { APP_TABLES, AUTH_TABLES, HEAL_STATEMENTS } from './schema'

export type Row = Record<string, any>

export interface DB {
  query<T = Row>(sql: string, params?: Array<unknown>): Promise<Array<T>>
  transaction<T>(fn: (db: Pick<DB, 'query'>) => Promise<T>): Promise<T>
  kind: 'pg' | 'pglite'
}

const transactionContext = new AsyncLocalStorage<Pick<DB, 'query'>>()
let initPromise: Promise<DB> | null = null

export function getDB(): Promise<DB> {
  if (!initPromise) initPromise = create().catch(error => { initPromise = null; throw error })
  return initPromise
}

async function create(): Promise<DB> {
  const rawUrl = (process.env.DATABASE_URL || '').trim()
  const isDummyUrl = !rawUrl || rawUrl.includes('ep-xxx') || rawUrl.includes('user:pass')
  const url = isDummyUrl ? '' : rawUrl
  let db: DB | null = null

  if (url) {
    try {
      const mod: any = await import('pg')
      let PoolClass = mod?.Pool || mod?.default?.Pool || mod?.default || mod
      if (typeof PoolClass !== 'function' && PoolClass?.Pool) {
        PoolClass = PoolClass.Pool
      }
      const isLocal = url.includes('localhost') || url.includes('127.0.0.1') || url.includes('sslmode=disable')
      const pool = new PoolClass({
        connectionString: url,
        max: 6, idleTimeoutMillis: 20_000, connectionTimeoutMillis: 5_000,
        ...(isLocal ? {} : { ssl: { rejectUnauthorized: true } }),
      })
      try { await pool.query('SELECT 1') }
      catch(error){await pool.end().catch(()=>{});throw error}
      console.log('[db] Connected to remote Postgres successfully')
      db = {
        kind: 'pg',
        async transaction(fn) {
          const client = await pool.connect()
          try {
            await client.query('BEGIN')
            const result = await fn({ query: async (sql, params = []) => (await client.query(sql, params)).rows })
            await client.query('COMMIT')
            return result
          } catch (error) { await client.query('ROLLBACK'); throw error }
          finally { client.release() }
        },
        async query(sql, params = []) {
          const r = await pool.query(sql, params as Array<any>)
          return r.rows as Array<any>
        },
      }
    } catch (e) {
      throw new Error('Основное хранилище недоступно. Данные не переключены и не потеряны. Повторите позже.')
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
      throw new Error('Не удалось открыть сохранённые данные. Проверьте доступность хранилища и повторите запуск.')
    }
    db = {
      kind: 'pglite',
      async transaction(fn) {
        return pgliteInstance.transaction(async (tx: any) => fn({
          query: async (sql, params = []) => (await tx.query(sql, params)).rows || [],
        }))
      },
      async query(sql, params = []) {
        const r = await pgliteInstance.query(sql, params as Array<any>)
        return (r.rows || []) as Array<any>
      },
    }
  }

  await migrate(db)
  import('../tick').then((m) => m.startBackgroundScheduler?.()).catch(() => {})
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
  // Additive, idempotent schema changes; never replace existing data.
  for (const sql of [
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recovery_code_hash text",
    "CREATE UNIQUE INDEX IF NOT EXISTS recovery_code_hash_uq ON profiles(recovery_code_hash) WHERE recovery_code_hash IS NOT NULL",
    "ALTER TABLE bill_pays ADD COLUMN IF NOT EXISTS receipt_id text",
    "ALTER TABLE bill_pays ADD COLUMN IF NOT EXISTS receipt_created boolean NOT NULL DEFAULT false",
    "CREATE UNIQUE INDEX IF NOT EXISTS bill_pays_receipt_uq ON bill_pays(receipt_id) WHERE receipt_id IS NOT NULL",
    "ALTER TABLE receipts ADD COLUMN IF NOT EXISTS source_key text",
    "ALTER TABLE receipts ADD COLUMN IF NOT EXISTS deleted_at timestamptz",
    "CREATE UNIQUE INDEX IF NOT EXISTS receipts_source_key_uq ON receipts (user_id, source_key) WHERE source_key IS NOT NULL",
    "ALTER TABLE recurring_bills ADD COLUMN IF NOT EXISTS paused boolean NOT NULL DEFAULT false",
    "ALTER TABLE user_goal_deposits ADD COLUMN IF NOT EXISTS request_id text",
    "ALTER TABLE user_goal_deposits ADD COLUMN IF NOT EXISTS reversed_at timestamptz",
    "CREATE UNIQUE INDEX IF NOT EXISTS goal_deposit_request_uq ON user_goal_deposits (user_id, request_id) WHERE request_id IS NOT NULL",
    "ALTER TABLE house_goal_deposits ADD COLUMN IF NOT EXISTS request_id text",
    "CREATE UNIQUE INDEX IF NOT EXISTS house_deposit_request_uq ON house_goal_deposits (user_id, request_id) WHERE request_id IS NOT NULL",
    "CREATE TABLE IF NOT EXISTS split_access (split_id text NOT NULL, member_id text NOT NULL, token_hash text NOT NULL, PRIMARY KEY (split_id, member_id))",
  ]) await db.query(sql)
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
  const db = transactionContext.getStore() || await getDB()
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

export async function transaction<T>(fn: () => Promise<T>): Promise<T> {
  if (transactionContext.getStore()) return fn()
  const db = await getDB()
  return db.transaction(tx => transactionContext.run(tx, fn))
}
