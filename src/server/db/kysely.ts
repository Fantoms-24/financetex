import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  type CompiledQuery,
  type DatabaseConnection,
  type Dialect,
  type Driver,
  type QueryResult,
} from 'kysely'
import { getDB, type DB } from './index'

/**
 * Драйвер, который исполняет скомпилированный kysely-SQL через наш единый слой БД
 * (Neon/pg на проде, PGlite в превью). Один источник правды — один пул.
 */
class BridgeDriver implements Driver {
  async init(): Promise<void> {}

  async acquireConnection(): Promise<DatabaseConnection> {
    const db: DB = await getDB()
    return {
      async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
        const rows = (await db.query(compiledQuery.sql, (compiledQuery.parameters ?? []) as Array<unknown>)) as Array<R>
        return {
          rows: rows ?? [],
          numAffectedRows: BigInt(rows?.length ?? 0),
        } as QueryResult<R>
      },
      async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
        /* поток не нужен */
      },
    }
  }

  async beginTransaction(): Promise<void> {}
  async commitTransaction(): Promise<void> {}
  async rollbackTransaction(): Promise<void> {}
  async releaseConnection(): Promise<void> {}
  async destroy(): Promise<void> {}
}

const dialect: Dialect = {
  createAdapter: () => new PostgresAdapter(),
  createDriver: () => new BridgeDriver(),
  createIntrospector: (db) => new PostgresIntrospector(db),
  createQueryCompiler: () => new PostgresQueryCompiler(),
}

let instance: Kysely<any> | null = null

export function getKysely(): Kysely<any> {
  if (!instance) instance = new Kysely<any>({ dialect })
  return instance
}
