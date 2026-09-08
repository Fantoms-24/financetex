import { T as TSS_SERVER_FUNCTION, g as getRequestHeader } from "../server.js";
import { q as q1, a as q } from "./index-Da2oQDqR.js";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function readToken() {
  let bearer = null;
  let cookieHeader = "";
  try {
    const h = getRequestHeader("authorization") || "";
    if (h.toLowerCase().startsWith("bearer ")) bearer = h.slice(7).trim();
    if (!bearer) {
      const custom = getRequestHeader("x-chekagent-token");
      if (custom && typeof custom === "string") bearer = custom.trim();
    }
    cookieHeader = getRequestHeader("cookie") || "";
  } catch {
    return null;
  }
  if (!bearer && !cookieHeader) return null;
  return bearer;
}
function rawCookie() {
  try {
    return getRequestHeader("cookie") || "";
  } catch {
    return "";
  }
}
function getToken() {
  const b = readToken();
  if (b) return b;
  const raw = rawCookie();
  if (!raw) return null;
  const m = /(?:^|;\s*)(?:__Secure-)?chekagent\.session_token=([^;]+)/.exec(raw);
  return m ? decodeURIComponent(m[1]) : null;
}
function normalizeToken(raw) {
  const v = (raw || "").trim();
  if (!v) return null;
  const dot = v.indexOf(".");
  return dot > 0 ? v.slice(0, dot) : v;
}
async function getSessionUserByToken(rawToken) {
  const token = normalizeToken(rawToken);
  if (!token) return null;
  try {
    const row = await q1(
      `SELECT u.id AS user_id, u.name, u.email, s."expiresAt" AS expires_at
         FROM "session" s
         JOIN "user" u ON u.id = s."userId"
        WHERE s.token = $1`,
      [token]
    );
    if (!row?.user_id) return null;
    const exp = row.expires_at ? new Date(row.expires_at).getTime() : 0;
    if (exp && exp < Date.now()) return null;
    await ensureProfile(row.user_id, row.name || (row.email || "").split("@")[0] || "Друг");
    const prof = await getProfile(row.user_id);
    return {
      id: row.user_id,
      name: row.name || "",
      email: row.email || "",
      displayName: prof?.display_name || row.name || (row.email || "").split("@")[0] || "Друг",
      role: prof?.role || "user",
      phone: prof?.phone ?? null,
      bank: prof?.bank ?? null
    };
  } catch {
    return null;
  }
}
async function getSessionUser() {
  return getSessionUserByToken(getToken());
}
async function revokeCurrentSession() {
  const token = normalizeToken(getToken());
  if (!token) return;
  await q(`DELETE FROM "session" WHERE token = $1`, [token]);
}
async function requireUser() {
  const u = await getSessionUser();
  if (!u) throw new Error("Войдите, чтобы продолжить");
  return u;
}
async function getProfile(userId) {
  return q1(`SELECT user_id, display_name, phone, bank, role FROM profiles WHERE user_id = $1`, [userId]);
}
async function ensureProfile(userId, name) {
  await q(
    `INSERT INTO profiles (user_id, display_name, role) VALUES ($1, $2, 'user')
     ON CONFLICT (user_id) DO NOTHING`,
    [userId, name]
  );
  await q(
    `INSERT INTO user_settings (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
    [userId]
  );
}
function friendly(e) {
  const msg = e?.message || String(e || "");
  if (/войдите/i.test(msg)) return "Войдите, чтобы продолжить";
  if (/уже есть|exists|duplicate/i.test(msg)) return "Такой логин уже занят";
  if (/8 символ|password/i.test(msg)) return "Пароль — минимум 8 символов";
  if (msg.length > 120) return "Что-то пошло не так. Попробуйте ещё раз";
  return msg || "Что-то пошло не так";
}
async function guarded(fn) {
  try {
    const user = await requireUser();
    return await fn(user);
  } catch (e) {
    return { error: friendly(e) };
  }
}
export {
  getSessionUser as a,
  getSessionUserByToken as b,
  createServerRpc as c,
  friendly as f,
  guarded as g,
  revokeCurrentSession as r
};
