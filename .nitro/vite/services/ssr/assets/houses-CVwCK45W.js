import { c as createLucideIcon, b as createSsrRpc } from "./router-BzCAX3yA.js";
import { c as createServerFn } from "../server.js";
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const listHouses = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6519f13c1dcea5ac83a20d25682b6e34bc8a4b6765a36744130a4141defd77b9"));
const createHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  name: String(d.name || "").trim() || "Семья"
})).handler(createSsrRpc("8fabb80901657b91426f59789fbf67320062b4fa4737049a497f268aec98dbac"));
const joinHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  code: String(d.code || "").trim().toUpperCase()
})).handler(createSsrRpc("65abe2bc656545b71211156b534bbac3645b2dfa973663a058afba2991867943"));
const getHouse = createServerFn({
  method: "GET"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(createSsrRpc("9cde712ba23a9efcf7902764c6fabd15698b731bbd8461e5e07eec4816dc2cac"));
const liveHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  since: d.since ? String(d.since) : null
})).handler(createSsrRpc("ffe35df63d769995e656e2e7aafacff0ed27cfaa8231d3167b3c196ac05f9180"));
const addHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0)),
  day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
  split: ["equal", "salary", "payer"].includes(d.split) ? d.split : "equal",
  payer_id: d.payer_id || null
})).handler(createSsrRpc("a7b792eff07a2e251a08b4f9b5bf95bf6be523b692b65c406036b073f369aaa7"));
const addWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0))
})).handler(createSsrRpc("037ec6b25e2e6f8b162463e50ef270a9a04d2b094bf8dfa30f2a50ca50200f17"));
const toggleWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  wishId: String(d.wishId)
})).handler(createSsrRpc("29a308df4dd3b3618a7d2fc0ba98f54753c5592cdf33ecffc6327567982a4b19"));
const deleteWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  wishId: String(d.wishId)
})).handler(createSsrRpc("8d909da606cb1d84cd777b7c82192da847859836e22bf7921b3f1b3d2de68dfb"));
const deleteHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  billId: String(d.billId)
})).handler(createSsrRpc("397a8fc8d345d946eff03f25cc1ddac4e3ab0fb44dbea9802ca66c684284f002"));
const setSalary = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  amount: Math.round(Math.max(0, Number(d.amount || 0)))
})).handler(createSsrRpc("e45c0addc09705b4d2adfb4de72882940a6c9fde492debe64498b3789f41e5c8"));
const payHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  billId: String(d.billId),
  paid: !!d.paid
})).handler(createSsrRpc("49255daae6f1b7d13070b3a1fd7aed618ee45f49a3db2a6498c49c2a7669b2e3"));
const sendHouseMessage = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  text: String(d.text || "").trim()
})).handler(createSsrRpc("43041027fef6bf41159f38c548421c1b55ee9590badbc9b44492bf343e350f65"));
const kickMember = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  userId: String(d.userId)
})).handler(createSsrRpc("5e8630bca32d9ae5a6084490b993f63c003bd82d0ca72dd968471394d7fe4945"));
const leaveHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(createSsrRpc("4feb2b5c752d0fe68e0f8361003cec723df4ba8da424ab982fb1ce000fc27376"));
const deleteHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(createSsrRpc("df2d5d049c9f80c99733b2857e90fd4251a3827399b1879a4531e55989d6b3d1"));
export {
  Copy as C,
  leaveHouse as a,
  addHouseBill as b,
  createHouse as c,
  deleteHouse as d,
  deleteHouseBill as e,
  addWish as f,
  getHouse as g,
  deleteWish as h,
  sendHouseMessage as i,
  joinHouse as j,
  kickMember as k,
  listHouses as l,
  liveHouse as m,
  payHouseBill as p,
  setSalary as s,
  toggleWish as t
};
