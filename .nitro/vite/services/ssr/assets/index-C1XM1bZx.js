const AUTH_TABLES = [
  `CREATE TABLE IF NOT EXISTS "user" (
     id text PRIMARY KEY,
     name text NOT NULL,
     email text NOT NULL UNIQUE,
     "emailVerified" boolean NOT NULL DEFAULT false,
     image text,
     "createdAt" timestamptz NOT NULL DEFAULT now(),
     "updatedAt" timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS "session" (
     id text PRIMARY KEY,
     "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
     token text NOT NULL UNIQUE,
     "expiresAt" timestamptz NOT NULL,
     "ipAddress" text,
     "userAgent" text,
     "createdAt" timestamptz NOT NULL DEFAULT now(),
     "updatedAt" timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS "account" (
     id text PRIMARY KEY,
     "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
     "accountId" text NOT NULL,
     "providerId" text NOT NULL,
     issuer text NOT NULL DEFAULT '',
     "accessToken" text,
     "refreshToken" text,
     "accessTokenExpiresAt" timestamptz,
     "refreshTokenExpiresAt" timestamptz,
     scope text,
     "idToken" text,
     password text,
     "createdAt" timestamptz NOT NULL DEFAULT now(),
     "updatedAt" timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS "verification" (
     id text PRIMARY KEY,
     identifier text NOT NULL,
     value text NOT NULL,
     "expiresAt" timestamptz NOT NULL,
     "createdAt" timestamptz,
     "updatedAt" timestamptz
   )`
];
const APP_TABLES = [
  `CREATE TABLE IF NOT EXISTS profiles (
     user_id text PRIMARY KEY,
     display_name text,
     phone text,
     bank text,
     role text NOT NULL DEFAULT 'user',
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS user_settings (
     user_id text PRIMARY KEY,
     currency text NOT NULL DEFAULT 'RUB',
     monthly_budget integer NOT NULL DEFAULT 45000,
     monthly_income integer NOT NULL DEFAULT 0,
     allocations jsonb NOT NULL DEFAULT '{}'::jsonb,
     seen_welcome boolean NOT NULL DEFAULT false,
     updated_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS receipts (
     id text PRIMARY KEY,
     user_id text NOT NULL,
     store text,
     purchased_at date,
     total integer NOT NULL DEFAULT 0,
     category text NOT NULL DEFAULT 'other',
     verdict text,
     note text,
     image text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS receipts_user_created_idx ON receipts (user_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS receipt_items (
     id text PRIMARY KEY,
     receipt_id text NOT NULL REFERENCES receipts(id) ON DELETE CASCADE,
     name text NOT NULL,
     qty numeric,
     price integer NOT NULL DEFAULT 0,
     category text NOT NULL DEFAULT 'other'
   )`,
  `CREATE INDEX IF NOT EXISTS receipt_items_receipt_idx ON receipt_items (receipt_id)`,
  `CREATE TABLE IF NOT EXISTS agent_messages (
     id text PRIMARY KEY,
     user_id text NOT NULL,
     role text NOT NULL,
     text text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS agent_messages_user_idx ON agent_messages (user_id, created_at)`,
  `CREATE TABLE IF NOT EXISTS recurring_bills (
     id text PRIMARY KEY,
     user_id text NOT NULL,
     title text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     day_of_month integer NOT NULL DEFAULT 1,
     notify boolean NOT NULL DEFAULT true,
     last_alert_key text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS recurring_bills_user_idx ON recurring_bills (user_id)`,
  `CREATE TABLE IF NOT EXISTS bill_pays (
     bill_id text NOT NULL,
     cycle text NOT NULL,
     user_id text NOT NULL,
     paid_at timestamptz NOT NULL DEFAULT now(),
     PRIMARY KEY (bill_id, cycle, user_id)
   )`,
  // ---- Кассы ----
  `CREATE TABLE IF NOT EXISTS houses (
     id text PRIMARY KEY,
     name text NOT NULL,
     code text UNIQUE NOT NULL,
     owner_id text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS house_members (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     user_id text NOT NULL,
     name text,
     salary_cents integer NOT NULL DEFAULT 0,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS house_members_unique ON house_members (house_id, user_id)`,
  `CREATE INDEX IF NOT EXISTS house_members_user_idx ON house_members (user_id)`,
  `CREATE TABLE IF NOT EXISTS house_bills (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     title text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     day_of_month integer NOT NULL DEFAULT 1,
     split text NOT NULL DEFAULT 'equal',
     payer_id text,
     last_alert_key text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS house_bills_house_idx ON house_bills (house_id)`,
  `CREATE TABLE IF NOT EXISTS house_bill_pays (
     bill_id text NOT NULL,
     cycle text NOT NULL,
     user_id text NOT NULL,
     paid_at timestamptz NOT NULL DEFAULT now(),
     PRIMARY KEY (bill_id, cycle, user_id)
   )`,
  `CREATE TABLE IF NOT EXISTS house_wishes (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     title text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     by_user text,
     bought_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS house_wishes_house_idx ON house_wishes (house_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS house_messages (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     user_id text NOT NULL,
     text text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS house_messages_house_idx ON house_messages (house_id, created_at)`,
  // ---- Пуши и конфиг ----
  `CREATE TABLE IF NOT EXISTS push_subs (
     id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
     user_id text,
     endpoint text UNIQUE NOT NULL,
     p256dh text,
     auth text,
     vapid_pub text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS push_subs_user_idx ON push_subs (user_id)`,
  `CREATE TABLE IF NOT EXISTS push_vapid (
     id smallint PRIMARY KEY DEFAULT 1,
     public text,
     private text,
     subject text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS app_config (
     key text PRIMARY KEY,
     value text,
     updated_at timestamptz NOT NULL DEFAULT now()
   )`
];
const HEAL_STATEMENTS = [
  // Better Auth 1.7 требует issuer в account (unique вместе с accountId)
  ["account", `ALTER TABLE "account" ADD COLUMN IF NOT EXISTS issuer text NOT NULL DEFAULT ''`],
  ["house_members", `ALTER TABLE house_members ADD COLUMN IF NOT EXISTS salary_cents integer NOT NULL DEFAULT 0`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS split text NOT NULL DEFAULT 'equal'`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS payer_id text`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS last_alert_key text`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS bought_at timestamptz`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS by_user text`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank text`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS monthly_income integer NOT NULL DEFAULT 0`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS allocations jsonb NOT NULL DEFAULT '{}'::jsonb`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS seen_welcome boolean NOT NULL DEFAULT false`],
  ["receipts", `ALTER TABLE receipts ADD COLUMN IF NOT EXISTS image text`],
  ["receipts", `ALTER TABLE receipts ADD COLUMN IF NOT EXISTS verdict text`],
  ["recurring_bills", `ALTER TABLE recurring_bills ADD COLUMN IF NOT EXISTS last_alert_key text`],
  ["push_subs", `ALTER TABLE push_subs ADD COLUMN IF NOT EXISTS vapid_pub text`],
  ["push_subs", `ALTER TABLE push_subs ALTER COLUMN id SET DEFAULT gen_random_uuid()::text`]
];
let initPromise = null;
function getDB() {
  if (!initPromise) initPromise = create();
  return initPromise;
}
async function create() {
  const rawUrl = (process.env.DATABASE_URL || "").trim();
  const isDummyUrl = !rawUrl || rawUrl.includes("ep-xxx") || rawUrl.includes("user:pass");
  const url = isDummyUrl ? "" : rawUrl;
  let db = null;
  if (url) {
    try {
      const { Pool } = await import("./index-DN3AMNn_.js");
      const pool = new Pool({
        connectionString: url,
        max: 6,
        idleTimeoutMillis: 2e4,
        connectionTimeoutMillis: 3e3,
        ...url.includes("localhost") || url.includes("127.0.0.1") ? {} : { ssl: { rejectUnauthorized: false } }
      });
      await pool.query("SELECT 1");
      db = {
        kind: "pg",
        async query(sql, params = []) {
          const r = await pool.query(sql, params);
          return r.rows;
        }
      };
    } catch (e) {
      console.warn("[db] Remote Postgres unavailable, falling back to local PGlite:", e?.message);
    }
  }
  if (!db) {
    let PGlite;
    try {
      ;
      ({ PGlite } = await import("./index-BBojcZ50.js").then((n) => n.i));
    } catch (e) {
      throw new Error(
        "Не задана DATABASE_URL, а локальная БД (PGlite) не загрузилась. На сервере задайте DATABASE_URL — подробности в .env.example."
      );
    }
    let pg;
    try {
      pg = new PGlite(process.env.PGLITE_DIR || ".pglite-data");
      await pg.waitReady;
    } catch (e) {
      try {
        pg = new PGlite();
        await pg.waitReady;
      } catch (err) {
        throw new Error(
          `Не задана DATABASE_URL, а локальная БД (PGlite) не поднялась: ${e?.message}. Запускайте локально через npm run dev либо задайте DATABASE_URL.`
        );
      }
    }
    db = {
      kind: "pglite",
      async query(sql, params = []) {
        const r = await pg.query(sql, params);
        return r.rows || [];
      }
    };
  }
  await migrate(db);
  return db;
}
async function migrate(db) {
  for (const sql of [...AUTH_TABLES, ...APP_TABLES]) {
    try {
      await db.query(sql);
    } catch (e) {
      console.error("[db] migrate failed:", e?.message);
    }
  }
  await heal(db);
}
async function heal(db) {
  for (const [table, sql] of HEAL_STATEMENTS) {
    try {
      await db.query(sql);
    } catch {
    }
  }
  const extra = [
    `CREATE UNIQUE INDEX IF NOT EXISTS house_members_unique ON house_members (house_id, user_id)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS push_subs_endpoint_uq ON push_subs (endpoint)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS account_issuer_account_id_uq ON "account" (issuer, "accountId")`
  ];
  for (const sql of extra) {
    try {
      await db.query(sql);
    } catch {
    }
  }
}
async function q(sql, params = []) {
  const db = await getDB();
  return db.query(sql, params);
}
async function q1(sql, params = []) {
  const rows = await q(sql, params);
  return rows[0] ?? null;
}
function newId(prefix = "") {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  const r2 = Math.random().toString(36).slice(2, 8);
  return `${prefix}${prefix ? "_" : ""}${t}${r}${r2}`;
}
export {
  q as a,
  getDB as g,
  newId as n,
  q1 as q
};
