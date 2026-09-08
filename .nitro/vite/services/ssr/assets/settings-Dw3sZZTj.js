<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/settings-Dj-K24R1.js
import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { a as q } from "./index-Da2oQDqR.js";
========
import { c as createServerRpc, g as guarded } from "./session-Bz02G02e.js";
import { c as createServerFn } from "../server.js";
import { a as q } from "./index-C1XM1bZx.js";
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/settings-Dw3sZZTj.js
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
const saveSettings_createServerFn_handler = createServerRpc({
  id: "7059b4e40911b9d797c4121eefdcde07879b23e777a1627069c2b2d6a9646d5f",
  name: "saveSettings",
  filename: "src/server/functions/settings.ts"
}, (opts) => saveSettings.__executeServer(opts));
const saveSettings = createServerFn({
  method: "POST"
}).validator((d) => ({
  monthly_budget: d.monthly_budget === void 0 ? void 0 : Math.round(Math.max(0, Number(d.monthly_budget))),
  monthly_income: d.monthly_income === void 0 ? void 0 : Math.round(Math.max(0, Number(d.monthly_income))),
  allocations: d.allocations
})).handler(saveSettings_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (data.monthly_budget !== void 0) {
    await q(`INSERT INTO user_settings (user_id, monthly_budget) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET monthly_budget = EXCLUDED.monthly_budget, updated_at = now()`, [user.id, data.monthly_budget]);
  }
  if (data.monthly_income !== void 0) {
    await q(`INSERT INTO user_settings (user_id, monthly_income) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET monthly_income = EXCLUDED.monthly_income, updated_at = now()`, [user.id, data.monthly_income]);
  }
  if (data.allocations) {
    await q(`INSERT INTO user_settings (user_id, allocations) VALUES ($1, $2::jsonb)
         ON CONFLICT (user_id) DO UPDATE SET allocations = EXCLUDED.allocations, updated_at = now()`, [user.id, JSON.stringify(data.allocations)]);
  }
  return {
    ok: true
  };
}));
const saveProfile_createServerFn_handler = createServerRpc({
  id: "8467b19019654362fe30d9c2e1cb95e6d6f2b4e6afef8151b225adfa9ebef586",
  name: "saveProfile",
  filename: "src/server/functions/settings.ts"
}, (opts) => saveProfile.__executeServer(opts));
const saveProfile = createServerFn({
  method: "POST"
}).validator((d) => ({
  display_name: d.display_name === void 0 ? void 0 : String(d.display_name).trim(),
  phone: d.phone === void 0 ? void 0 : String(d.phone).trim(),
  bank: d.bank === void 0 ? void 0 : String(d.bank).trim()
})).handler(saveProfile_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const sets = [];
  const params = [user.id];
  let i = 2;
  if (data.display_name !== void 0) {
    sets.push(`display_name = $${i++}`);
    params.push(data.display_name || null);
  }
  if (data.phone !== void 0) {
    sets.push(`phone = $${i++}`);
    params.push(data.phone || null);
  }
  if (data.bank !== void 0) {
    sets.push(`bank = $${i++}`);
    params.push(data.bank || null);
  }
  if (!sets.length) return {
    ok: true
  };
  await q(`UPDATE profiles SET ${sets.join(", ")} WHERE user_id = $1`, params);
  return {
    ok: true
  };
}));
export {
  saveProfile_createServerFn_handler,
  saveSettings_createServerFn_handler
};
