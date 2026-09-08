import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler, type Dialect, type Driver } from 'kysely'
import { getDB } from './index'

class BridgeDriver implements Driver {
  async init(): Promise<void> {}
  async acquireConnection() {
    const db = await getDB()
    return {
      async executeQuery<R>(compiledQuery: { sql: string; parameters?: ReadonlyArray<unknown> }) {
        const rows = await db.query(compiledQuery.sql, compiledQuery.parameters as Array<any> ?? [])
        return {
          rows: (rows ?? []) as Array<R>,
          numAffectedRows: BigInt(rows?.length ?? 0),
        }
      },
      async *streamQuery() {},
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
  if (!instance) instance = new Kysely({ dialect })
  return instance
}
