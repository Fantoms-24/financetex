import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { a as q, n as newId } from "./index-Da2oQDqR.js";
import { m as monthKey } from "./format-bLET-Iix.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
async function listFor(userId) {
  const rows = await q(`SELECT b.id, b.title, b.amount, b.day_of_month, b.notify, p.cycle AS paid_cycle
       FROM recurring_bills b
       LEFT JOIN bill_pays p ON p.bill_id = b.id AND p.cycle = $2 AND p.user_id = b.user_id
      WHERE b.user_id = $1
      ORDER BY b.day_of_month`, [userId, monthKey()]);
  return (rows ?? []).map((b) => ({
    id: b.id,
    title: b.title,
    amount: Number(b.amount),
    day_of_month: Number(b.day_of_month),
    notify: !!b.notify,
    paid_cycle: b.paid_cycle ?? null
  }));
}
const listBills_createServerFn_handler = createServerRpc({
  id: "a9f606e9d2caba5925308f4f8d77b001a0858b758cfa21dcdc63365ddc4662bd",
  name: "listBills",
  filename: "src/server/functions/bills.ts"
}, (opts) => listBills.__executeServer(opts));
const listBills = createServerFn({
  method: "GET"
}).handler(listBills_createServerFn_handler, async () => guarded(async (user) => ({
  bills: await listFor(user.id)
})));
const addBill_createServerFn_handler = createServerRpc({
  id: "5081795819ee333c89978237b52decc57d71d4c483521311a7db54ccf8530524",
  name: "addBill",
  filename: "src/server/functions/bills.ts"
}, (opts) => addBill.__executeServer(opts));
const addBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0)),
  day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
  notify: d.notify === void 0 ? true : !!d.notify
})).handler(addBill_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.title) return {
    error: "Впишите название"
  };
  await q(`INSERT INTO recurring_bills (id, user_id, title, amount, day_of_month, notify)
       VALUES ($1, $2, $3, $4, $5, $6)`, [newId("b"), user.id, data.title, data.amount, data.day_of_month, data.notify]);
  return {
    bills: await listFor(user.id)
  };
}));
const setBillPaid_createServerFn_handler = createServerRpc({
  id: "bc91e7207852c034ca17d283f9d973e45acf0540f1d7bb09f22e029a01f15801",
  name: "setBillPaid",
  filename: "src/server/functions/bills.ts"
}, (opts) => setBillPaid.__executeServer(opts));
const setBillPaid = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId),
  paid: !!d.paid
})).handler(setBillPaid_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const cycle = monthKey();
  if (data.paid) {
    await q(`INSERT INTO bill_pays (bill_id, cycle, user_id) VALUES ($1, $2, $3)
         ON CONFLICT (bill_id, cycle, user_id) DO NOTHING`, [data.billId, cycle, user.id]);
  } else {
    await q(`DELETE FROM bill_pays WHERE bill_id = $1 AND cycle = $2 AND user_id = $3`, [data.billId, cycle, user.id]);
  }
  return {
    bills: await listFor(user.id)
  };
}));
const toggleBillNotify_createServerFn_handler = createServerRpc({
  id: "af27dd9f1a77c778c2ffc5418fbd1b845485ca99c358c738725e31da7b71c3b4",
  name: "toggleBillNotify",
  filename: "src/server/functions/bills.ts"
}, (opts) => toggleBillNotify.__executeServer(opts));
const toggleBillNotify = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId),
  notify: !!d.notify
})).handler(toggleBillNotify_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  await q(`UPDATE recurring_bills SET notify = $1 WHERE id = $2 AND user_id = $3`, [data.notify, data.billId, user.id]);
  return {
    bills: await listFor(user.id)
  };
}));
const deleteBill_createServerFn_handler = createServerRpc({
  id: "82586bc8b0d13042fd95732411cd0a4bd068404143336868945ee60d79406545",
  name: "deleteBill",
  filename: "src/server/functions/bills.ts"
}, (opts) => deleteBill.__executeServer(opts));
const deleteBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId)
})).handler(deleteBill_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  await q(`DELETE FROM bill_pays WHERE bill_id = $1 AND user_id = $2`, [data.billId, user.id]);
  await q(`DELETE FROM recurring_bills WHERE id = $1 AND user_id = $2`, [data.billId, user.id]);
  return {
    bills: await listFor(user.id)
  };
}));
export {
  addBill_createServerFn_handler,
  deleteBill_createServerFn_handler,
  listBills_createServerFn_handler,
  setBillPaid_createServerFn_handler,
  toggleBillNotify_createServerFn_handler
};
