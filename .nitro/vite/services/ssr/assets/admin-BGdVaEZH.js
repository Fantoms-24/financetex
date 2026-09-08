import { c as createServerRpc, g as guarded } from "./session-0MkT4WQQ.js";
import { c as createServerFn } from "../server.js";
import { q as q1, a as q } from "./index-BHhsLFuo.js";
import { g as getLlmConfig, s as saveLlmConfig } from "./config-D7ZdXDHQ.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
async function ensureFirstAdmin(userId) {
  const row = await q1(`SELECT count(*)::int AS c FROM profiles WHERE role = 'admin'`);
  if ((row?.c ?? 0) === 0) {
    await q(`UPDATE profiles SET role = 'admin' WHERE user_id = $1`, [userId]);
    return true;
  }
  return false;
}
const getAdminState_createServerFn_handler = createServerRpc({
  id: "f9e281fd18d4b9142de9f5cf5e4d11ef494a7e0fd7c5cfad849e466a1940b406",
  name: "getAdminState",
  filename: "src/server/functions/admin.ts"
}, (opts) => getAdminState.__executeServer(opts));
const getAdminState = createServerFn({
  method: "GET"
}).handler(getAdminState_createServerFn_handler, async () => guarded(async (user) => {
  if ((user.role || "") !== "admin") {
    const became = await ensureFirstAdmin(user.id);
    if (!became) return {
      isAdmin: false
    };
  }
  const cfg = await getLlmConfig();
  return {
    isAdmin: true,
    baseUrl: cfg.baseUrl,
    model: cfg.model,
    hasKey: !!cfg.apiKey
  };
}));
const saveLlm_createServerFn_handler = createServerRpc({
  id: "54902348e78831e3b0fb09c978db9c79dbd4e1cc95c3e765ba7bbacf91713e78",
  name: "saveLlm",
  filename: "src/server/functions/admin.ts"
}, (opts) => saveLlm.__executeServer(opts));
const saveLlm = createServerFn({
  method: "POST"
}).validator((d) => ({
  baseUrl: d.baseUrl === void 0 ? void 0 : String(d.baseUrl).trim(),
  apiKey: d.apiKey === void 0 ? void 0 : String(d.apiKey).trim(),
  model: d.model === void 0 ? void 0 : String(d.model).trim()
})).handler(saveLlm_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if ((user.role || "") !== "admin") {
    const became = await ensureFirstAdmin(user.id);
    if (!became) return {
      error: "Только для админа"
    };
  }
  await saveLlmConfig({
    baseUrl: data.baseUrl === "" ? void 0 : data.baseUrl,
    apiKey: data.apiKey === "" ? void 0 : data.apiKey,
    model: data.model === "" ? void 0 : data.model
  });
  const cfg = await getLlmConfig();
  return {
    ok: true,
    hasKey: !!cfg.apiKey
  };
}));
export {
  getAdminState_createServerFn_handler,
  saveLlm_createServerFn_handler
};
