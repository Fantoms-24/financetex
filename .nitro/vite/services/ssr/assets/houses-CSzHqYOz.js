import { c as createServerRpc, g as guarded } from "./session-CVdEiwDp.js";
import { c as createServerFn } from "../server.js";
import { q as q1, n as newId, a as q } from "./index-CJWAeYEQ.js";
import { n as notifyHouseExcept } from "./push-D1zq6L-q.js";
import { m as monthKey } from "./format-I651YhAt.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
import "node:util";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "http";
function code() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 7; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}
async function isMember(houseId, userId) {
  const row = await q1(`SELECT 1 AS x FROM house_members WHERE house_id = $1 AND user_id = $2`, [houseId, userId]);
  return !!row;
}
async function memberName(userId) {
  const p = await q1(`SELECT display_name FROM profiles WHERE user_id = $1`, [userId]);
  if (p?.display_name) return p.display_name;
  const u = await q1(`SELECT name, email FROM "user" WHERE id = $1`, [userId]);
  return u?.name || u?.email?.split("@")[0] || "Человек";
}
async function membersOf(houseId) {
  const rows = await q(`SELECT m.id, m.user_id, m.salary_cents AS salary,
            p.display_name,
            u.name AS uname,
            u.email AS email
       FROM house_members m
       LEFT JOIN profiles p ON p.user_id = m.user_id
       LEFT JOIN "user" u ON u.id = m.user_id
      WHERE m.house_id = $1
      ORDER BY m.created_at`, [houseId]);
  return (rows ?? []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    name: r.display_name || r.uname || r.email?.split("@")[0] || "Человек",
    salary: Number(r.salary || 0)
  }));
}
function computeShares(bill, members) {
  const out = {};
  const amount = Math.round(Number(bill.amount || 0));
  if (!members.length) return out;
  if (bill.split === "payer") {
    for (const m of members) out[m.user_id] = 0;
    const target = bill.payer_id && out[bill.payer_id] !== void 0 ? bill.payer_id : members[0].user_id;
    out[target] = amount;
    return out;
  }
  if (bill.split === "salary") {
    const total = members.reduce((s, m) => s + Math.max(0, m.salary), 0);
    if (total > 0) {
      let given2 = 0;
      members.forEach((m, idx) => {
        const share = idx === members.length - 1 ? amount - given2 : Math.round(amount * Math.max(0, m.salary) / total);
        out[m.user_id] = share;
        given2 += share;
      });
      return out;
    }
  }
  const base = Math.floor(amount / members.length);
  let given = 0;
  members.forEach((m, idx) => {
    const share = idx === members.length - 1 ? amount - given : base;
    out[m.user_id] = share;
    given += share;
  });
  return out;
}
const listHouses_createServerFn_handler = createServerRpc({
  id: "6519f13c1dcea5ac83a20d25682b6e34bc8a4b6765a36744130a4141defd77b9",
  name: "listHouses",
  filename: "src/server/functions/houses.ts"
}, (opts) => listHouses.__executeServer(opts));
const listHouses = createServerFn({
  method: "GET"
}).handler(listHouses_createServerFn_handler, async () => guarded(async (user) => {
  const rows = await q(`SELECT h.id, h.name, h.code, h.owner_id,
              (SELECT count(*)::int FROM house_members m WHERE m.house_id = h.id) AS members
         FROM houses h
         JOIN house_members me ON me.house_id = h.id AND me.user_id = $1
        ORDER BY h.created_at DESC`, [user.id]);
  return {
    houses: rows ?? []
  };
}));
const createHouse_createServerFn_handler = createServerRpc({
  id: "8fabb80901657b91426f59789fbf67320062b4fa4737049a497f268aec98dbac",
  name: "createHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => createHouse.__executeServer(opts));
const createHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  name: String(d.name || "").trim() || "Семья"
})).handler(createHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  let newCode = code();
  for (let i = 0; i < 6; i++) {
    const exists = await q1(`SELECT 1 AS x FROM houses WHERE code = $1`, [newCode]);
    if (!exists) break;
    newCode = code();
  }
  const id = newId("h");
  await q(`INSERT INTO houses (id, name, code, owner_id) VALUES ($1, $2, $3, $4)`, [id, data.name, newCode, user.id]);
  await q(`INSERT INTO house_members (id, house_id, user_id, name, salary_cents)
         VALUES ($1, $2, $3, $4, 0)
         ON CONFLICT (house_id, user_id) DO NOTHING`, [newId("hm"), id, user.id, await memberName(user.id)]);
  return {
    ok: true,
    id,
    code: newCode
  };
}));
const joinHouse_createServerFn_handler = createServerRpc({
  id: "65abe2bc656545b71211156b534bbac3645b2dfa973663a058afba2991867943",
  name: "joinHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => joinHouse.__executeServer(opts));
const joinHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  code: String(d.code || "").trim().toUpperCase()
})).handler(joinHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.code) return {
    error: "Впишите код кассы"
  };
  const house = await q1(`SELECT id, name FROM houses WHERE code = $1`, [data.code]);
  if (!house) return {
    error: "Такой код не найден"
  };
  await q(`INSERT INTO house_members (id, house_id, user_id, name, salary_cents)
         VALUES ($1, $2, $3, $4, 0)
         ON CONFLICT (house_id, user_id) DO NOTHING`, [newId("hm"), house.id, user.id, await memberName(user.id)]);
  await notifyHouseExcept(house.id, user.id, {
    title: house.name,
    body: `${await memberName(user.id)} вошёл в кассу`,
    data: {
      url: `/groups/${house.id}`,
      type: "house-join"
    }
  });
  return {
    ok: true,
    id: house.id
  };
}));
async function snapshot(houseId) {
  const [house, members, bills, wishes, messages, pays] = await Promise.all([q1(`SELECT id, name, code, owner_id, created_at FROM houses WHERE id = $1`, [houseId]), membersOf(houseId), q(`SELECT id, title, amount, day_of_month, split, payer_id, created_at
         FROM house_bills WHERE house_id = $1 ORDER BY day_of_month, created_at`, [houseId]), q(`SELECT w.id, w.title, w.amount, w.by_user, w.bought_at, w.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_wishes w
         LEFT JOIN profiles p ON p.user_id = w.by_user
         LEFT JOIN "user" u ON u.id = w.by_user
        WHERE w.house_id = $1
        ORDER BY w.bought_at NULLS FIRST, w.created_at DESC`, [houseId]), q(`SELECT m.id, m.user_id, m.text, m.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_messages m
         LEFT JOIN profiles p ON p.user_id = m.user_id
         LEFT JOIN "user" u ON u.id = m.user_id
        WHERE m.house_id = $1
        ORDER BY m.created_at DESC
        LIMIT 200`, [houseId]), q(`SELECT p.bill_id, p.cycle, p.user_id, p.paid_at
         FROM house_bill_pays p
         JOIN house_bills b ON b.id = p.bill_id
        WHERE b.house_id = $1`, [houseId])]);
  const cycle = monthKey();
  const billIds = new Set((bills ?? []).map((b) => b.id));
  const relevantPays = (pays ?? []).filter((p) => billIds.has(p.bill_id));
  return {
    house,
    members,
    bills: (bills ?? []).map((b) => ({
      ...b,
      amount: Number(b.amount),
      day_of_month: Number(b.day_of_month)
    })),
    wishes: (wishes ?? []).map((w) => ({
      id: w.id,
      title: w.title,
      amount: Number(w.amount),
      by_user: w.by_user,
      by_name: w.display_name || w.uname || w.email?.split("@")[0] || null,
      bought_at: w.bought_at ? new Date(w.bought_at).toISOString() : null,
      created_at: new Date(w.created_at).toISOString()
    })),
    messages: (messages ?? []).map((m) => ({
      id: m.id,
      user_id: m.user_id,
      name: m.display_name || m.uname || m.email?.split("@")[0] || "Человек",
      text: m.text,
      created_at: new Date(m.created_at).toISOString()
    })).reverse(),
    pays: relevantPays.map((p) => ({
      ...p,
      paid_at: new Date(p.paid_at).toISOString()
    })),
    cycle
  };
}
const getHouse_createServerFn_handler = createServerRpc({
  id: "9cde712ba23a9efcf7902764c6fabd15698b731bbd8461e5e07eec4816dc2cac",
  name: "getHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => getHouse.__executeServer(opts));
const getHouse = createServerFn({
  method: "GET"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(getHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const snap = await snapshot(data.houseId);
  if (!snap.house) return {
    error: "Касса не найдена"
  };
  const shares = {};
  for (const b of snap.bills) shares[b.id] = computeShares(b, snap.members);
  return {
    ...snap,
    shares,
    you: user.id,
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  };
}));
const liveHouse_createServerFn_handler = createServerRpc({
  id: "ffe35df63d769995e656e2e7aafacff0ed27cfaa8231d3167b3c196ac05f9180",
  name: "liveHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => liveHouse.__executeServer(opts));
const liveHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  since: d.since ? String(d.since) : null
})).handler(liveHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const snap = await snapshot(data.houseId);
  if (!snap.house) return {
    error: "Касса не найдена"
  };
  const lastMsg = snap.messages.length ? snap.messages[snap.messages.length - 1].created_at : "";
  const lastWish = snap.wishes.length ? snap.wishes[0].created_at : "";
  const lastPay = snap.pays.length ? snap.pays.reduce((a, b) => a.paid_at > b.paid_at ? a : b).paid_at : "";
  const version = [snap.members.length, snap.bills.length, snap.wishes.length, snap.messages.length, lastMsg, lastWish, lastPay].join("|");
  const shares = {};
  for (const b of snap.bills) shares[b.id] = computeShares(b, snap.members);
  return {
    ...snap,
    shares,
    version,
    you: user.id,
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  };
}));
const addHouseBill_createServerFn_handler = createServerRpc({
  id: "a7b792eff07a2e251a08b4f9b5bf95bf6be523b692b65c406036b073f369aaa7",
  name: "addHouseBill",
  filename: "src/server/functions/houses.ts"
}, (opts) => addHouseBill.__executeServer(opts));
const addHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0)),
  day_of_month: Math.min(31, Math.max(1, Math.round(Number(d.day_of_month || 1)))),
  split: ["equal", "salary", "payer"].includes(d.split) ? d.split : "equal",
  payer_id: d.payer_id || null
})).handler(addHouseBill_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.title) return {
    error: "Впишите название"
  };
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const id = newId("hb");
  await q(`INSERT INTO house_bills (id, house_id, title, amount, day_of_month, split, payer_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id, data.houseId, data.title, data.amount, data.day_of_month, data.split, data.payer_id]);
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: `Новый платёж: ${data.title}`,
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-bill"
    }
  });
  return {
    ok: true,
    id
  };
}));
const addWish_createServerFn_handler = createServerRpc({
  id: "037ec6b25e2e6f8b162463e50ef270a9a04d2b094bf8dfa30f2a50ca50200f17",
  name: "addWish",
  filename: "src/server/functions/houses.ts"
}, (opts) => addWish.__executeServer(opts));
const addWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  title: String(d.title || "").trim(),
  amount: Math.round(Number(d.amount || 0))
})).handler(addWish_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.title) return {
    error: "Впишите название"
  };
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`INSERT INTO house_wishes (id, house_id, title, amount, by_user) VALUES ($1, $2, $3, $4, $5)`, [newId("hw"), data.houseId, data.title, data.amount, user.id]);
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: `Хотят купить: ${data.title}`,
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-wish"
    }
  });
  return {
    ok: true
  };
}));
const toggleWish_createServerFn_handler = createServerRpc({
  id: "29a308df4dd3b3618a7d2fc0ba98f54753c5592cdf33ecffc6327567982a4b19",
  name: "toggleWish",
  filename: "src/server/functions/houses.ts"
}, (opts) => toggleWish.__executeServer(opts));
const toggleWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  wishId: String(d.wishId)
})).handler(toggleWish_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const w = await q1(`SELECT title, bought_at FROM house_wishes WHERE id = $1 AND house_id = $2`, [data.wishId, data.houseId]);
  if (!w) return {
    error: "Не найдено"
  };
  const next = w.bought_at ? null : (/* @__PURE__ */ new Date()).toISOString();
  await q(`UPDATE house_wishes SET bought_at = $1 WHERE id = $2`, [next, data.wishId]);
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: next ? `Взяли: ${w.title}` : `Снова в списке: ${w.title}`,
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-wish"
    }
  });
  return {
    ok: true
  };
}));
const deleteWish_createServerFn_handler = createServerRpc({
  id: "8d909da606cb1d84cd777b7c82192da847859836e22bf7921b3f1b3d2de68dfb",
  name: "deleteWish",
  filename: "src/server/functions/houses.ts"
}, (opts) => deleteWish.__executeServer(opts));
const deleteWish = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  wishId: String(d.wishId)
})).handler(deleteWish_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`DELETE FROM house_wishes WHERE id = $1 AND house_id = $2`, [data.wishId, data.houseId]);
  return {
    ok: true
  };
}));
const deleteHouseBill_createServerFn_handler = createServerRpc({
  id: "397a8fc8d345d946eff03f25cc1ddac4e3ab0fb44dbea9802ca66c684284f002",
  name: "deleteHouseBill",
  filename: "src/server/functions/houses.ts"
}, (opts) => deleteHouseBill.__executeServer(opts));
const deleteHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  billId: String(d.billId)
})).handler(deleteHouseBill_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`DELETE FROM house_bill_pays WHERE bill_id = $1`, [data.billId]);
  await q(`DELETE FROM house_bills WHERE id = $1 AND house_id = $2`, [data.billId, data.houseId]);
  return {
    ok: true
  };
}));
const setSalary_createServerFn_handler = createServerRpc({
  id: "e45c0addc09705b4d2adfb4de72882940a6c9fde492debe64498b3789f41e5c8",
  name: "setSalary",
  filename: "src/server/functions/houses.ts"
}, (opts) => setSalary.__executeServer(opts));
const setSalary = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  amount: Math.round(Math.max(0, Number(d.amount || 0)))
})).handler(setSalary_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`UPDATE house_members SET salary_cents = $1 WHERE house_id = $2 AND user_id = $3`, [data.amount, data.houseId, user.id]);
  return {
    ok: true
  };
}));
const payHouseBill_createServerFn_handler = createServerRpc({
  id: "49255daae6f1b7d13070b3a1fd7aed618ee45f49a3db2a6498c49c2a7669b2e3",
  name: "payHouseBill",
  filename: "src/server/functions/houses.ts"
}, (opts) => payHouseBill.__executeServer(opts));
const payHouseBill = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  billId: String(d.billId),
  paid: !!d.paid
})).handler(payHouseBill_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const cycle = monthKey();
  if (data.paid) {
    await q(`INSERT INTO house_bill_pays (bill_id, cycle, user_id) VALUES ($1, $2, $3)
           ON CONFLICT (bill_id, cycle, user_id) DO NOTHING`, [data.billId, cycle, user.id]);
  } else {
    await q(`DELETE FROM house_bill_pays WHERE bill_id = $1 AND cycle = $2 AND user_id = $3`, [data.billId, cycle, user.id]);
  }
  if (data.paid) {
    const bill = await q1(`SELECT title FROM house_bills WHERE id = $1`, [data.billId]);
    const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
    await notifyHouseExcept(data.houseId, user.id, {
      title: house?.name || "Касса",
      body: `${user.displayName} оплатил: ${bill?.title || "платёж"}`,
      data: {
        url: `/groups/${data.houseId}`,
        type: "house-pay"
      }
    });
  }
  return {
    ok: true,
    cycle
  };
}));
const sendHouseMessage_createServerFn_handler = createServerRpc({
  id: "43041027fef6bf41159f38c548421c1b55ee9590badbc9b44492bf343e350f65",
  name: "sendHouseMessage",
  filename: "src/server/functions/houses.ts"
}, (opts) => sendHouseMessage.__executeServer(opts));
const sendHouseMessage = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  text: String(d.text || "").trim()
})).handler(sendHouseMessage_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.text) return {
    ok: true
  };
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, $3, $4)`, [newId("hm"), data.houseId, user.id, data.text.slice(0, 2e3)]);
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: data.text.slice(0, 120),
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-message"
    }
  });
  return {
    ok: true
  };
}));
const kickMember_createServerFn_handler = createServerRpc({
  id: "5e8630bca32d9ae5a6084490b993f63c003bd82d0ca72dd968471394d7fe4945",
  name: "kickMember",
  filename: "src/server/functions/houses.ts"
}, (opts) => kickMember.__executeServer(opts));
const kickMember = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  userId: String(d.userId)
})).handler(kickMember_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const house = await q1(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId]);
  if (!house) return {
    error: "Касса не найдена"
  };
  if (house.owner_id !== user.id) return {
    error: "Только владелец может выгнать"
  };
  if (data.userId === user.id) return {
    error: "Себя не выгнать — выйдите из кассы"
  };
  await q(`DELETE FROM house_members WHERE house_id = $1 AND user_id = $2`, [data.houseId, data.userId]);
  return {
    ok: true
  };
}));
const leaveHouse_createServerFn_handler = createServerRpc({
  id: "4feb2b5c752d0fe68e0f8361003cec723df4ba8da424ab982fb1ce000fc27376",
  name: "leaveHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => leaveHouse.__executeServer(opts));
const leaveHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(leaveHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const house = await q1(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId]);
  if (house && house.owner_id === user.id) return {
    error: "Владелец не может выйти — удалите кассу"
  };
  await q(`DELETE FROM house_members WHERE house_id = $1 AND user_id = $2`, [data.houseId, user.id]);
  return {
    ok: true
  };
}));
const deleteHouse_createServerFn_handler = createServerRpc({
  id: "df2d5d049c9f80c99733b2857e90fd4251a3827399b1879a4531e55989d6b3d1",
  name: "deleteHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => deleteHouse.__executeServer(opts));
const deleteHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId)
})).handler(deleteHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const house = await q1(`SELECT owner_id FROM houses WHERE id = $1`, [data.houseId]);
  if (!house) return {
    ok: true
  };
  if (house.owner_id !== user.id) return {
    error: "Только владелец может удалить кассу"
  };
  await q(`DELETE FROM house_members WHERE house_id = $1`, [data.houseId]);
  await q(`DELETE FROM house_messages WHERE house_id = $1`, [data.houseId]);
  await q(`DELETE FROM house_wishes WHERE house_id = $1`, [data.houseId]);
  const ids = await q(`SELECT id FROM house_bills WHERE house_id = $1`, [data.houseId]);
  for (const b of ids ?? []) await q(`DELETE FROM house_bill_pays WHERE bill_id = $1`, [b.id]);
  await q(`DELETE FROM house_bills WHERE house_id = $1`, [data.houseId]);
  await q(`DELETE FROM houses WHERE id = $1`, [data.houseId]);
  return {
    ok: true
  };
}));
export {
  addHouseBill_createServerFn_handler,
  addWish_createServerFn_handler,
  createHouse_createServerFn_handler,
  deleteHouseBill_createServerFn_handler,
  deleteHouse_createServerFn_handler,
  deleteWish_createServerFn_handler,
  getHouse_createServerFn_handler,
  joinHouse_createServerFn_handler,
  kickMember_createServerFn_handler,
  leaveHouse_createServerFn_handler,
  listHouses_createServerFn_handler,
  liveHouse_createServerFn_handler,
  payHouseBill_createServerFn_handler,
  sendHouseMessage_createServerFn_handler,
  setSalary_createServerFn_handler,
  toggleWish_createServerFn_handler
};
