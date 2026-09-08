import { c as createServerRpc, g as guarded } from "./session-Bz02G02e.js";
import { c as createServerFn } from "../server.js";
import { n as newId, a as q, q as q1 } from "./index-C1XM1bZx.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const addReceipt_createServerFn_handler = createServerRpc({
  id: "da6d0c53bd2585ea4b92274514798a4f335cb75abaf08d3f2d6db2c8e4913cd6",
  name: "addReceipt",
  filename: "src/server/functions/receipts.ts"
}, (opts) => addReceipt.__executeServer(opts));
const addReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  store: String(d.store || "").trim() || "Без названия",
  total: Math.round(Number(d.total || 0)),
  note: String(d.note || "").trim() || null,
  category: String(d.category || "other"),
  purchased_at: d.purchased_at || null
})).handler(addReceipt_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const id = newId("r");
  await q(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7)`, [id, user.id, data.store, data.purchased_at, data.total, data.category, data.note]);
  return {
    ok: true,
    id
  };
}));
const deleteReceipt_createServerFn_handler = createServerRpc({
  id: "f78cce0a2c32a0b8127d5e2705adb0c7cefae74fe8d4e5af98d9938d2ebde2fe",
  name: "deleteReceipt",
  filename: "src/server/functions/receipts.ts"
}, (opts) => deleteReceipt.__executeServer(opts));
const deleteReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  id: String(d.id)
})).handler(deleteReceipt_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  await q(`DELETE FROM receipts WHERE id = $1 AND user_id = $2`, [data.id, user.id]);
  return {
    ok: true
  };
}));
const getReceipt_createServerFn_handler = createServerRpc({
  id: "ab794dcb45b0df414946f9f494a155f5402554b195020f76c1c73742176db9a0",
  name: "getReceipt",
  filename: "src/server/functions/receipts.ts"
}, (opts) => getReceipt.__executeServer(opts));
const getReceipt = createServerFn({
  method: "GET"
}).validator((d) => ({
  id: String(d.id)
})).handler(getReceipt_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const r = await q1(`SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
         FROM receipts WHERE id = $1 AND user_id = $2`, [data.id, user.id]);
  if (!r) return {
    receipt: null,
    items: []
  };
  const items = await q(`SELECT id, name, qty, price, category FROM receipt_items WHERE receipt_id = $1`, [data.id]);
  return {
    receipt: {
      ...r,
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total)
    },
    items: (items ?? []).map((i) => ({
      ...i,
      price: Number(i.price),
      qty: i.qty == null ? null : Number(i.qty)
    }))
  };
}));
const listReceipts_createServerFn_handler = createServerRpc({
  id: "2ab254e8b5902245d6145fd66f2d18b0e3a1e1c0ec024799e05a967d2d1c8fb2",
  name: "listReceipts",
  filename: "src/server/functions/receipts.ts"
}, (opts) => listReceipts.__executeServer(opts));
const listReceipts = createServerFn({
  method: "GET"
}).validator((d) => ({
  limit: Math.min(Number(d?.limit || 120), 300)
})).handler(listReceipts_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const rows = await q(`SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
         FROM receipts
        WHERE user_id = $1
        ORDER BY purchased_at DESC NULLS LAST, created_at DESC
        LIMIT $2`, [user.id, data.limit]);
  return {
    receipts: (rows ?? []).map((r) => ({
      ...r,
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total)
    }))
  };
}));
export {
  addReceipt_createServerFn_handler,
  deleteReceipt_createServerFn_handler,
  getReceipt_createServerFn_handler,
  listReceipts_createServerFn_handler
};
