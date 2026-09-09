export const AUTH_TABLES = [
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
]

export const APP_TABLES = [
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
     house_id text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS receipts_user_created_idx ON receipts (user_id, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS receipts_house_idx ON receipts (house_id, created_at DESC)`,
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
     monthly_budget integer NOT NULL DEFAULT 0,
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
     collected integer NOT NULL DEFAULT 0,
     target_date date,
     by_user text,
     bought_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS house_wishes_house_idx ON house_wishes (house_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS house_goal_deposits (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     wish_id text NOT NULL REFERENCES house_wishes(id) ON DELETE CASCADE,
     user_id text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     note text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS house_goal_deposits_wish_idx ON house_goal_deposits (wish_id, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS house_goal_deposits_house_idx ON house_goal_deposits (house_id, created_at DESC)`,
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
   )`,
  `CREATE TABLE IF NOT EXISTS user_goals (
     id text PRIMARY KEY,
     user_id text NOT NULL,
     title text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     collected integer NOT NULL DEFAULT 0,
     icon text NOT NULL DEFAULT 'target',
     color text NOT NULL DEFAULT '#3d5c4a',
     target_date date,
     completed_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS user_goals_user_idx ON user_goals (user_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS user_goal_deposits (
     id text PRIMARY KEY,
     goal_id text NOT NULL,
     user_id text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     note text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS user_goal_deposits_goal_idx ON user_goal_deposits (goal_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS user_telegram (
     user_id text PRIMARY KEY,
     chat_id text NOT NULL UNIQUE,
     username text,
     first_name text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS user_telegram_chat_idx ON user_telegram (chat_id)`,
  `CREATE TABLE IF NOT EXISTS telegram_link_tokens (
     code text PRIMARY KEY,
     user_id text NOT NULL,
     expires_at timestamptz NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS receipt_splits (
     id text PRIMARY KEY,
     code text NOT NULL UNIQUE,
     receipt_id text,
     user_id text NOT NULL,
     title text NOT NULL,
     total integer NOT NULL DEFAULT 0,
     tip_percent integer NOT NULL DEFAULT 0,
     tip_amount integer NOT NULL DEFAULT 0,
     organizer_name text NOT NULL DEFAULT 'Организатор',
     organizer_phone text,
     organizer_bank text,
     status text NOT NULL DEFAULT 'active',
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS receipt_splits_code_idx ON receipt_splits (code)`,
  `CREATE INDEX IF NOT EXISTS receipt_splits_user_idx ON receipt_splits (user_id, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS receipt_split_items (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     name text NOT NULL,
     qty numeric NOT NULL DEFAULT 1,
     price integer NOT NULL DEFAULT 0,
     is_shared boolean NOT NULL DEFAULT false,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS receipt_split_items_split_idx ON receipt_split_items (split_id)`,
  `CREATE TABLE IF NOT EXISTS receipt_split_members (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     name text NOT NULL,
     is_organizer boolean NOT NULL DEFAULT false,
     paid boolean NOT NULL DEFAULT false,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS receipt_split_members_split_idx ON receipt_split_members (split_id)`,
  `CREATE TABLE IF NOT EXISTS receipt_split_claims (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     item_id text NOT NULL,
     member_id text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS receipt_split_claims_unique ON receipt_split_claims (item_id, member_id)`
]

export const HEAL_STATEMENTS: Array<[string, string]> = [
  // Better Auth 1.7 требует issuer в account (unique вместе с accountId)
  ["account", `ALTER TABLE "account" ADD COLUMN IF NOT EXISTS issuer text NOT NULL DEFAULT ''`],
  ["house_members", `ALTER TABLE house_members ADD COLUMN IF NOT EXISTS salary_cents integer NOT NULL DEFAULT 0`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS split text NOT NULL DEFAULT 'equal'`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS payer_id text`],
  ["house_bills", `ALTER TABLE house_bills ADD COLUMN IF NOT EXISTS last_alert_key text`],
  ["houses", `ALTER TABLE houses ADD COLUMN IF NOT EXISTS monthly_budget integer NOT NULL DEFAULT 0`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS collected integer NOT NULL DEFAULT 0`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS target_date date`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS bought_at timestamptz`],
  ["house_wishes", `ALTER TABLE house_wishes ADD COLUMN IF NOT EXISTS by_user text`],
  ["receipts", `ALTER TABLE receipts ADD COLUMN IF NOT EXISTS house_id text`],
  ["receipts", `ALTER TABLE receipts ADD COLUMN IF NOT EXISTS image text`],
  ["receipts", `ALTER TABLE receipts ADD COLUMN IF NOT EXISTS verdict text`],
  ["house_goal_deposits", `CREATE TABLE IF NOT EXISTS house_goal_deposits (
     id text PRIMARY KEY,
     house_id text NOT NULL,
     wish_id text NOT NULL,
     user_id text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     note text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["house_goal_deposits", `CREATE INDEX IF NOT EXISTS house_goal_deposits_wish_idx ON house_goal_deposits (wish_id, created_at DESC)`],
  ["receipts", `CREATE INDEX IF NOT EXISTS receipts_house_idx ON receipts (house_id, created_at DESC)`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text`],
  ["profiles", `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank text`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS monthly_income integer NOT NULL DEFAULT 0`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS allocations jsonb NOT NULL DEFAULT '{}'::jsonb`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS seen_welcome boolean NOT NULL DEFAULT false`],
  ["recurring_bills", `ALTER TABLE recurring_bills ADD COLUMN IF NOT EXISTS last_alert_key text`],
  ["push_subs", `ALTER TABLE push_subs ADD COLUMN IF NOT EXISTS vapid_pub text`],
  ["push_subs", `ALTER TABLE push_subs ALTER COLUMN id SET DEFAULT gen_random_uuid()::text`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS evening_checkin boolean NOT NULL DEFAULT true`],
  ["user_settings", `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS last_checkin_date text`],
  ["user_goals", `CREATE TABLE IF NOT EXISTS user_goals (
     id text PRIMARY KEY,
     user_id text NOT NULL,
     title text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     collected integer NOT NULL DEFAULT 0,
     icon text NOT NULL DEFAULT 'target',
     color text NOT NULL DEFAULT '#3d5c4a',
     target_date date,
     completed_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["user_goal_deposits", `CREATE TABLE IF NOT EXISTS user_goal_deposits (
     id text PRIMARY KEY,
     goal_id text NOT NULL,
     user_id text NOT NULL,
     amount integer NOT NULL DEFAULT 0,
     note text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["user_telegram", `CREATE TABLE IF NOT EXISTS user_telegram (
     user_id text PRIMARY KEY,
     chat_id text NOT NULL UNIQUE,
     username text,
     first_name text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["telegram_link_tokens", `CREATE TABLE IF NOT EXISTS telegram_link_tokens (
     code text PRIMARY KEY,
     user_id text NOT NULL,
     expires_at timestamptz NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["receipt_splits", `CREATE TABLE IF NOT EXISTS receipt_splits (
     id text PRIMARY KEY,
     code text NOT NULL UNIQUE,
     receipt_id text,
     user_id text NOT NULL,
     title text NOT NULL,
     total integer NOT NULL DEFAULT 0,
     tip_percent integer NOT NULL DEFAULT 0,
     tip_amount integer NOT NULL DEFAULT 0,
     organizer_name text NOT NULL DEFAULT 'Организатор',
     organizer_phone text,
     organizer_bank text,
     status text NOT NULL DEFAULT 'active',
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["receipt_split_items", `CREATE TABLE IF NOT EXISTS receipt_split_items (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     name text NOT NULL,
     qty numeric NOT NULL DEFAULT 1,
     price integer NOT NULL DEFAULT 0,
     is_shared boolean NOT NULL DEFAULT false,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["receipt_split_members", `CREATE TABLE IF NOT EXISTS receipt_split_members (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     name text NOT NULL,
     is_organizer boolean NOT NULL DEFAULT false,
     paid boolean NOT NULL DEFAULT false,
     created_at timestamptz NOT NULL DEFAULT now()
   )`],
  ["receipt_split_claims", `CREATE TABLE IF NOT EXISTS receipt_split_claims (
     id text PRIMARY KEY,
     split_id text NOT NULL,
     item_id text NOT NULL,
     member_id text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`]
]
