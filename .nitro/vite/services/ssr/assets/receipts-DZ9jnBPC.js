<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/receipts-E2dDgrmW.js
import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { n as newId, a as q, q as q1 } from "./index-Da2oQDqR.js";
========
import { c as createServerRpc, g as guarded } from "./session-Bz02G02e.js";
import { c as createServerFn } from "../server.js";
import { n as newId, a as q, q as q1 } from "./index-C1XM1bZx.js";
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/receipts-DZ9jnBPC.js
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
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
  purchased_at: d.purchased_at || null,
  houseId: d.houseId ? String(d.houseId).trim() : null
})).handler(addReceipt_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const id = newId("r");
<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/receipts-E2dDgrmW.js
  await q(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note, house_id)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7, $8)`, [id, user.id, data.store, data.purchased_at, data.total, data.category, data.note, data.houseId]);
========
  await q(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, note)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7)`, [id, user.id, data.store, data.purchased_at, data.total, data.category, data.note]);
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/receipts-DZ9jnBPC.js
  return {
    ok: true,
    id
  };
}));
const setReceiptHouse_createServerFn_handler = createServerRpc({
  id: "d8e75f5695aaacfcc0316a305680b68f522ca6d7f38601287bf654721c478d12",
  name: "setReceiptHouse",
  filename: "src/server/functions/receipts.ts"
}, (opts) => setReceiptHouse.__executeServer(opts));
const setReceiptHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  id: String(d.id),
  houseId: d.houseId ? String(d.houseId).trim() : null
})).handler(setReceiptHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  await q(`UPDATE receipts SET house_id = $1 WHERE id = $2 AND user_id = $3`, [data.houseId, data.id, user.id]);
  return {
    ok: true
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
<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/receipts-E2dDgrmW.js
  const r = await q1(`SELECT r.id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.id = $1 AND (r.user_id = $2 OR (r.house_id IS NOT NULL AND EXISTS (SELECT 1 FROM house_members m WHERE m.house_id = r.house_id AND m.user_id = $2)))`, [data.id, user.id]);
========
  const r = await q1(`SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
         FROM receipts WHERE id = $1 AND user_id = $2`, [data.id, user.id]);
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/receipts-DZ9jnBPC.js
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
<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/receipts-E2dDgrmW.js
  const rows = await q(`SELECT r.id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at, r.house_id,
              h.name AS house_name
         FROM receipts r
         LEFT JOIN houses h ON h.id = r.house_id
        WHERE r.user_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
========
  const rows = await q(`SELECT id, store, purchased_at, total, category, verdict, note, image, created_at
         FROM receipts
        WHERE user_id = $1
        ORDER BY purchased_at DESC NULLS LAST, created_at DESC
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/receipts-DZ9jnBPC.js
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
  listReceipts_createServerFn_handler,
  setReceiptHouse_createServerFn_handler
};
