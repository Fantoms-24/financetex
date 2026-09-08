<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/bootstrap-BlBkgUUY.js
import { c as createServerRpc, a as getSessionUser } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { q as q1, a as q } from "./index-Da2oQDqR.js";
import { m as monthKey } from "./format-bLET-Iix.js";
========
import { c as createServerRpc, a as getSessionUser } from "./session-CVdEiwDp.js";
import { c as createServerFn } from "../server.js";
import { q as q1, a as q } from "./index-CJWAeYEQ.js";
import { m as monthKey } from "./format-I651YhAt.js";
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/bootstrap-9Mr_WMYl.js
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
const EMPTY_SETTINGS = {
  currency: "RUB",
  monthly_budget: 45e3,
  monthly_income: 0,
  allocations: {}
};
const bootstrapApp_createServerFn_handler = createServerRpc({
  id: "9d398ff5ab695745178dbb88db2aed1ec541d32e09bf74c8a04cbf25d3fb0fed",
  name: "bootstrapApp",
  filename: "src/server/functions/bootstrap.ts"
}, (opts) => bootstrapApp.__executeServer(opts));
const bootstrapApp = createServerFn({
  method: "GET"
}).handler(bootstrapApp_createServerFn_handler, async () => {
  const user = await getSessionUser();
  if (!user) {
    return {
      user: null,
      settings: EMPTY_SETTINGS,
      month: {
        key: monthKey(),
        spent: 0,
        budget: 45e3,
        left: 45e3,
        count: 0,
        byCategory: []
      },
      receipts: [],
      bills: [],
      houses: []
    };
  }
  const settingsRow = await q1(`SELECT currency, monthly_budget, monthly_income, allocations
       FROM user_settings WHERE user_id = $1`, [user.id]);
  const settings = {
    currency: settingsRow?.currency || "RUB",
    monthly_budget: Number(settingsRow?.monthly_budget ?? 45e3),
    monthly_income: Number(settingsRow?.monthly_income ?? 0),
    allocations: settingsRow?.allocations && typeof settingsRow.allocations === "object" ? settingsRow.allocations : {}
  };
  const startOfMonth = `${monthKey()}-01`;
  const [spent, receipts, byCat, bills, houses] = await Promise.all([q1(`SELECT coalesce(sum(total), 0)::bigint AS total, count(*)::int AS cnt
         FROM receipts
<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/bootstrap-BlBkgUUY.js
        WHERE user_id = $1 AND purchased_at >= $2::date`, [user.id, startOfMonth]), q(`SELECT r.id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.user_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
========
        WHERE user_id = $1 AND purchased_at >= $2::date`, [user.id, startOfMonth]), q(`SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
         FROM receipts
        WHERE user_id = $1
        ORDER BY purchased_at DESC NULLS LAST, created_at DESC
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/bootstrap-9Mr_WMYl.js
        LIMIT 60`, [user.id]), q(`SELECT category, coalesce(sum(total), 0)::bigint AS total
         FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date
        GROUP BY category
        ORDER BY total DESC`, [user.id, startOfMonth]), q(`SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, p.cycle AS paid_cycle
         FROM recurring_bills b
         LEFT JOIN bill_pays p
                ON p.bill_id = b.id AND p.cycle = $2 AND p.user_id = b.user_id
        WHERE b.user_id = $1
        ORDER BY b.day_of_month`, [user.id, monthKey()]), q(`SELECT h.id, h.name, h.code, h.owner_id,
              (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members
         FROM houses h
         JOIN house_members me ON me.house_id = h.id AND me.user_id = $1
        ORDER BY h.created_at`, [user.id])]);
  const spentNum = Number(spent?.total ?? 0);
  return {
    user,
    settings,
    month: {
      key: monthKey(),
      spent: spentNum,
      budget: settings.monthly_budget,
      left: settings.monthly_budget - spentNum,
      count: Number(spent?.cnt ?? 0),
      byCategory: (byCat ?? []).map((r) => ({
        category: r.category,
        total: Number(r.total)
      }))
    },
    receipts: (receipts ?? []).map((r) => ({
      ...r,
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total)
    })),
    bills: (bills ?? []).map((b) => ({
      ...b,
      amount: Number(b.amount),
      day_of_month: Number(b.day_of_month)
    })),
    houses: houses ?? []
  };
});
export {
  bootstrapApp_createServerFn_handler
};
