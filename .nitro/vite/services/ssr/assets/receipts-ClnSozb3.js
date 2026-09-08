import { c as createLucideIcon, a as createSsrRpc } from "./router-bVUirNDJ.js";
import { c as createServerFn } from "../server.js";
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const addReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  store: String(d.store || "").trim() || "Без названия",
  total: Math.round(Number(d.total || 0)),
  note: String(d.note || "").trim() || null,
  category: String(d.category || "other"),
  purchased_at: d.purchased_at || null,
  houseId: d.houseId ? String(d.houseId).trim() : null
})).handler(createSsrRpc("da6d0c53bd2585ea4b92274514798a4f335cb75abaf08d3f2d6db2c8e4913cd6"));
const setReceiptHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  id: String(d.id),
  houseId: d.houseId ? String(d.houseId).trim() : null
})).handler(createSsrRpc("d8e75f5695aaacfcc0316a305680b68f522ca6d7f38601287bf654721c478d12"));
const deleteReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  id: String(d.id)
})).handler(createSsrRpc("f78cce0a2c32a0b8127d5e2705adb0c7cefae74fe8d4e5af98d9938d2ebde2fe"));
const getReceipt = createServerFn({
  method: "GET"
}).validator((d) => ({
  id: String(d.id)
})).handler(createSsrRpc("ab794dcb45b0df414946f9f494a155f5402554b195020f76c1c73742176db9a0"));
const listReceipts = createServerFn({
  method: "GET"
}).validator((d) => ({
  limit: Math.min(Number(d?.limit || 120), 300)
})).handler(createSsrRpc("2ab254e8b5902245d6145fd66f2d18b0e3a1e1c0ec024799e05a967d2d1c8fb2"));
export {
  ChevronUp as C,
  Trash2 as T,
  ChevronDown as a,
  addReceipt as b,
  deleteReceipt as d,
  getReceipt as g,
  listReceipts as l,
  setReceiptHouse as s
};
