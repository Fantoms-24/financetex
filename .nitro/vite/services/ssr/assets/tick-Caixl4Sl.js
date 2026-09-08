import { m as monthKey } from "./format-BOBMj6ZA.js";
import { a as q } from "./index-BHhsLFuo.js";
import { a as sendToUser, n as notifyHouseExcept } from "./push-DV3AKLI-.js";
import { T as TSS_SERVER_FUNCTION, b as getServerFnById, c as createServerFn } from "../server.js";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listBills = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a9f606e9d2caba5925308f4f8d77b001a0858b758cfa21dcdc63365ddc4662bd"));
const addBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0)),
  day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
  notify: d.notify === void 0 ? true : !!d.notify
})).handler(createSsrRpc("5081795819ee333c89978237b52decc57d71d4c483521311a7db54ccf8530524"));
const setBillPaid = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId),
  paid: !!d.paid
})).handler(createSsrRpc("bc91e7207852c034ca17d283f9d973e45acf0540f1d7bb09f22e029a01f15801"));
const toggleBillNotify = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId),
  notify: !!d.notify
})).handler(createSsrRpc("af27dd9f1a77c778c2ffc5418fbd1b845485ca99c358c738725e31da7b71c3b4"));
const deleteBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  billId: String(d.billId)
})).handler(createSsrRpc("82586bc8b0d13042fd95732411cd0a4bd068404143336868945ee60d79406545"));
function slotRank(offset) {
  if (offset === 2) return 0;
  if (offset === 1) return 1;
  if (offset === 0) return 2;
  return 3;
}
function parseAlertKey(key, cycle) {
  if (!key) return null;
  const [c, o] = String(key).split(":");
  if (c !== cycle) return null;
  const n = Number(o);
  return Number.isFinite(n) ? slotRank(n) : null;
}
function offsetLabel(offset) {
  if (offset === 0) return "Сегодня";
  if (offset === 1) return "Завтра";
  if (offset === 2) return "Через 2 дня";
  return "Просрочен";
}
function dueOffset(dayOfMonth, today) {
  const diff = dayOfMonth - today;
  if (diff === 2) return 2;
  if (diff === 1) return 1;
  if (diff === 0) return 0;
  if (diff < 0) return -1;
  return null;
}
async function runTick(now = /* @__PURE__ */ new Date()) {
  const cycle = monthKey(now);
  const today = now.getDate();
  const result = { checked: 0, sent: 0, failed: 0 };
  const personal = await q(
    `SELECT b.id, b.user_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            p.cycle AS paid
       FROM recurring_bills b
       LEFT JOIN bill_pays p ON p.bill_id = b.id AND p.cycle = $1 AND p.user_id = b.user_id
      WHERE b.notify = true`,
    [cycle]
  );
  for (const b of personal ?? []) {
    result.checked++;
    const offset = dueOffset(Number(b.day_of_month), today);
    if (offset === null) continue;
    if (b.paid) continue;
    const already = parseAlertKey(b.last_alert_key, cycle);
    if (already !== null && already >= slotRank(offset)) continue;
    const res = await sendToUser(b.user_id, {
      title: b.title,
      body: `${offsetLabel(offset)} — ${Number(b.amount).toLocaleString("ru-RU")} ₽`,
      data: { url: "/bills", type: "bill-reminder" }
    });
    result.sent += res.sent;
    result.failed += res.failed;
    if (res.error) result.error = res.error;
    if (res.sent > 0) {
      await q(`UPDATE recurring_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id]);
    }
  }
  const houseBills = await q(
    `SELECT b.id, b.house_id, b.title, b.amount, b.day_of_month, b.last_alert_key,
            h.name AS house_name
       FROM house_bills b
       JOIN houses h ON h.id = b.house_id`,
    []
  );
  for (const b of houseBills ?? []) {
    result.checked++;
    const offset = dueOffset(Number(b.day_of_month), today);
    if (offset === null) continue;
    const already = parseAlertKey(b.last_alert_key, cycle);
    if (already !== null && already >= slotRank(offset)) continue;
    const res = await notifyHouseExcept(b.house_id, null, {
      title: `${b.house_name} · ${b.title}`,
      body: `${offsetLabel(offset)} — ${Number(b.amount).toLocaleString("ru-RU")} ₽`,
      data: { url: `/groups/${b.house_id}`, type: "house-bill-reminder" }
    });
    result.sent += res.sent;
    result.failed += res.failed;
    if (res.error) result.error = res.error;
    if (res.sent > 0) {
      await q(`UPDATE house_bills SET last_alert_key = $1 WHERE id = $2`, [`${cycle}:${offset}`, b.id]);
    }
  }
  return result;
}
export {
  addBill as a,
  createSsrRpc as c,
  deleteBill as d,
  listBills as l,
  runTick as r,
  setBillPaid as s,
  toggleBillNotify as t
};
