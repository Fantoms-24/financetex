import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { q as q1, n as newId, a as q } from "./index-Da2oQDqR.js";
import { n as notifyHouseExcept } from "./push-B0fcuhky.js";
import { g as getLlmConfig } from "./config-B3z1tKPy.js";
import { m as monthKey, c as categoryLabel } from "./format-bLET-Iix.js";
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
  const [house, members, bills, wishes, deposits, receipts, messages, pays] = await Promise.all([q1(`SELECT id, name, code, owner_id, coalesce(monthly_budget, 0)::int AS monthly_budget, created_at FROM houses WHERE id = $1`, [houseId]), membersOf(houseId), q(`SELECT id, title, amount, day_of_month, split, payer_id, created_at
         FROM house_bills WHERE house_id = $1 ORDER BY day_of_month, created_at`, [houseId]), q(`SELECT w.id, w.title, w.amount, coalesce(w.collected, 0)::int AS collected, w.target_date,
              w.by_user, w.bought_at, w.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_wishes w
         LEFT JOIN profiles p ON p.user_id = w.by_user
         LEFT JOIN "user" u ON u.id = w.by_user
        WHERE w.house_id = $1
        ORDER BY w.bought_at NULLS FIRST, w.created_at DESC`, [houseId]), q(`SELECT d.id, d.wish_id, d.user_id, d.amount, d.note, d.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM house_goal_deposits d
         LEFT JOIN profiles p ON p.user_id = d.user_id
         LEFT JOIN "user" u ON u.id = d.user_id
        WHERE d.house_id = $1
        ORDER BY d.created_at DESC
        LIMIT 200`, [houseId]), q(`SELECT r.id, r.user_id, r.store, r.purchased_at, r.total, r.category, r.verdict, r.note, r.image, r.created_at,
              p.display_name, u.name AS uname, u.email AS email
         FROM receipts r
         LEFT JOIN profiles p ON p.user_id = r.user_id
         LEFT JOIN "user" u ON u.id = r.user_id
        WHERE r.house_id = $1
        ORDER BY r.purchased_at DESC NULLS LAST, r.created_at DESC
        LIMIT 100`, [houseId]), q(`SELECT m.id, m.user_id, m.text, m.created_at,
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
  const startOfMonth = `${cycle}-01`;
  const billIds = new Set((bills ?? []).map((b) => b.id));
  const relevantPays = (pays ?? []).filter((p) => billIds.has(p.bill_id));
  const paidBillsList = (bills ?? []).filter((b) => relevantPays.some((p) => p.bill_id === b.id && p.cycle === cycle));
  const paidBillsSum = paidBillsList.reduce((s, b) => s + Number(b.amount || 0), 0);
  const monthReceipts = (receipts ?? []).filter((r) => {
    const d = r.purchased_at ? String(r.purchased_at).slice(0, 10) : String(r.created_at).slice(0, 10);
    return d >= startOfMonth;
  });
  const receiptsSum = monthReceipts.reduce((s, r) => s + Number(r.total || 0), 0);
  const totalSpent = paidBillsSum + receiptsSum;
  const budget = Number(house?.monthly_budget || 0);
  const left = budget > 0 ? Math.max(0, budget - totalSpent) : 0;
  const percentSpent = budget > 0 ? Math.min(100, Math.round(totalSpent / budget * 100)) : 0;
  const catSums = {};
  if (paidBillsSum > 0) catSums["bills"] = (catSums["bills"] || 0) + paidBillsSum;
  for (const r of monthReceipts) {
    const cat = r.category || "other";
    catSums[cat] = (catSums[cat] || 0) + Number(r.total || 0);
  }
  const byCategory = Object.entries(catSums).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => ({
    category: cat,
    label: cat === "bills" ? "Счета и жильё" : categoryLabel(cat),
    total: amount,
    percent: totalSpent > 0 ? Math.round(amount / totalSpent * 100) : 0
  }));
  const shares = {};
  for (const b of bills ?? []) shares[b.id] = computeShares(b, members);
  const memberSums = {};
  for (const m of members) memberSums[m.user_id] = 0;
  for (const b of paidBillsList) {
    const bShares = shares[b.id] || {};
    for (const [uid, amt] of Object.entries(bShares)) {
      memberSums[uid] = (memberSums[uid] || 0) + amt;
    }
  }
  for (const r of monthReceipts) {
    memberSums[r.user_id] = (memberSums[r.user_id] || 0) + Number(r.total || 0);
  }
  const byMember = members.map((m) => {
    const amt = memberSums[m.user_id] || 0;
    return {
      user_id: m.user_id,
      name: m.name,
      total: amt,
      percent: totalSpent > 0 ? Math.round(amt / totalSpent * 100) : 0
    };
  }).sort((a, b) => b.total - a.total);
  const analytics = {
    budget,
    totalSpent,
    left,
    percentSpent,
    byCategory,
    byMember
  };
  const depositsByWish = {};
  for (const d of deposits ?? []) {
    if (!depositsByWish[d.wish_id]) depositsByWish[d.wish_id] = [];
    depositsByWish[d.wish_id].push({
      id: d.id,
      wish_id: d.wish_id,
      user_id: d.user_id,
      name: d.display_name || d.uname || d.email?.split("@")[0] || "Участник",
      amount: Number(d.amount || 0),
      note: d.note ?? null,
      created_at: new Date(d.created_at).toISOString()
    });
  }
  return {
    house: house ? {
      ...house,
      monthly_budget: Number(house.monthly_budget || 0)
    } : null,
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
      collected: Number(w.collected || 0),
      target_date: w.target_date ? String(w.target_date).slice(0, 10) : null,
      by_user: w.by_user,
      by_name: w.display_name || w.uname || w.email?.split("@")[0] || null,
      bought_at: w.bought_at ? new Date(w.bought_at).toISOString() : null,
      created_at: new Date(w.created_at).toISOString(),
      deposits: depositsByWish[w.id] || []
    })),
    receipts: (receipts ?? []).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      store: r.store || "Чек",
      purchased_at: r.purchased_at ? String(r.purchased_at).slice(0, 10) : null,
      total: Number(r.total || 0),
      category: r.category || "other",
      verdict: r.verdict || null,
      note: r.note || null,
      image: r.image || null,
      payer_name: r.display_name || r.uname || r.email?.split("@")[0] || "Участник",
      created_at: new Date(r.created_at).toISOString()
    })),
    messages: (messages ?? []).map((m) => ({
      id: m.id,
      user_id: m.user_id,
      name: m.user_id === "agent" ? "ЧекАгент" : m.display_name || m.uname || m.email?.split("@")[0] || "Человек",
      text: m.text,
      is_agent: m.user_id === "agent",
      created_at: new Date(m.created_at).toISOString()
    })).reverse(),
    pays: relevantPays.map((p) => ({
      ...p,
      paid_at: new Date(p.paid_at).toISOString()
    })),
    analytics,
    shares,
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
  return {
    ...snap,
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
  const lastReceipt = snap.receipts.length ? snap.receipts[0].created_at : "";
  const version = [snap.members.length, snap.bills.length, snap.wishes.length, snap.receipts.length, snap.messages.length, snap.analytics.totalSpent, lastMsg, lastWish, lastPay, lastReceipt].join("|");
  return {
    ...snap,
    version,
    you: user.id,
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  };
}));
const setHouseBudget_createServerFn_handler = createServerRpc({
  id: "84be0c356d13d5c169b38841a5d298d0156857ffd10fb31ae307e8499b4faa35",
  name: "setHouseBudget",
  filename: "src/server/functions/houses.ts"
}, (opts) => setHouseBudget.__executeServer(opts));
const setHouseBudget = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  budget: Math.round(Math.max(0, Number(d.budget || 0)))
})).handler(setHouseBudget_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  await q(`UPDATE houses SET monthly_budget = $1 WHERE id = $2`, [data.budget, data.houseId]);
  return {
    ok: true,
    budget: data.budget
  };
}));
const depositGoal_createServerFn_handler = createServerRpc({
  id: "152d02407d6a2fc2a704450bef648c2e9671cf8367f2b7c1f57b2f1b479eb878",
  name: "depositGoal",
  filename: "src/server/functions/houses.ts"
}, (opts) => depositGoal.__executeServer(opts));
const depositGoal = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  wishId: String(d.wishId),
  amount: Math.round(Math.max(1, Number(d.amount || 0))),
  note: String(d.note || "").trim() || null
})).handler(depositGoal_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const wish = await q1(`SELECT title, amount, coalesce(collected, 0)::int AS collected, bought_at FROM house_wishes WHERE id = $1 AND house_id = $2`, [data.wishId, data.houseId]);
  if (!wish) return {
    error: "Цель не найдена"
  };
  const depositId = newId("hgd");
  await q(`INSERT INTO house_goal_deposits (id, house_id, wish_id, user_id, amount, note)
         VALUES ($1, $2, $3, $4, $5, $6)`, [depositId, data.houseId, data.wishId, user.id, data.amount, data.note]);
  const nextCollected = wish.collected + data.amount;
  const isComplete = nextCollected >= wish.amount && wish.amount > 0;
  const boughtAt = isComplete && !wish.bought_at ? (/* @__PURE__ */ new Date()).toISOString() : wish.bought_at;
  await q(`UPDATE house_wishes SET collected = $1, bought_at = $2 WHERE id = $3`, [nextCollected, boughtAt, data.wishId]);
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  const uName = user.displayName || user.name || "Участник";
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: `${uName} внёс ${data.amount.toLocaleString("ru-RU")} ₽ в копилку «${wish.title}»`,
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-deposit"
    }
  }).catch(() => {
  });
  return {
    ok: true,
    collected: nextCollected,
    isComplete
  };
}));
const askHouseAgent_createServerFn_handler = createServerRpc({
  id: "2a6ec28a703bed4068e657875157f388fb0ddc101d95a92e49f40060a51d2c18",
  name: "askHouseAgent",
  filename: "src/server/functions/houses.ts"
}, (opts) => askHouseAgent.__executeServer(opts));
const askHouseAgent = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  prompt: String(d.prompt || "").trim()
})).handler(askHouseAgent_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const snap = await snapshot(data.houseId);
  if (!snap.house) return {
    error: "Касса не найдена"
  };
  if (data.prompt) {
    await q(`INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, $3, $4)`, [newId("hm"), data.houseId, user.id, data.prompt.slice(0, 2e3)]);
  }
  const {
    baseUrl,
    apiKey,
    model
  } = await getLlmConfig();
  if (!apiKey) {
    const text = "Админ ещё не указал API-ключ в настройках, поэтому я пока не могу проанализировать финансы кассы.";
    await q(`INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, 'agent', $3)`, [newId("hm"), data.houseId, text]);
    return {
      ok: true,
      reply: text
    };
  }
  const mems = snap.members.map((m) => `${m.name} (зарплата ${m.salary.toLocaleString("ru-RU")} ₽)`).join(", ");
  const cats = snap.analytics.byCategory.map((c) => `${c.label}: ${c.total.toLocaleString("ru-RU")} ₽ (${c.percent}%)`).join(", ");
  const membersContr = snap.analytics.byMember.map((m) => `${m.name}: ${m.total.toLocaleString("ru-RU")} ₽ (${m.percent}%)`).join(", ");
  const unpaidBills = snap.bills.filter((b) => !snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle));
  const unpaidText = unpaidBills.length ? unpaidBills.map((b) => `${b.title} (${b.amount} ₽, ${b.day_of_month} числа)`).join("; ") : "все обязательные счета закрыты";
  const activeGoals = snap.wishes.filter((w) => !w.bought_at && w.amount > 0);
  const goalsText = activeGoals.length ? activeGoals.map((w) => `«${w.title}»: ${w.collected.toLocaleString("ru-RU")} из ${w.amount.toLocaleString("ru-RU")} ₽`).join("; ") : "активных копилок нет";
  const context = [`Касса: «${snap.house.name}». Участники: ${mems}.`, `Месячный бюджет кассы: ${snap.analytics.budget > 0 ? snap.analytics.budget.toLocaleString("ru-RU") + " ₽" : "не задан"}.`, `Потрачено в этом месяце: ${snap.analytics.totalSpent.toLocaleString("ru-RU")} ₽.`, cats ? `По категориям: ${cats}.` : "Трат в этом месяце пока нет.", `Вклад участников в траты: ${membersContr}.`, `Неоплаченные счета: ${unpaidText}.`, `Копилки: ${goalsText}.`].join(" ");
  const system = `Ты — ЧекАгент, карманный финансовый советник семейной кассы.
Говоришь по-русски, тепло, дружелюбно, лаконично и по делу, как заметка в блокноте.
Без корпоративного жаргона, без слов «нейросеть», «AI», «умные алгоритмы».
Вот данные семейной кассы: ${context}
Ответь 2–5 ёмкими фразами. Если спросили «Итоги месяца» или «Анализ» — кратко резюмируй расходы, упомяни неоплаченные счета и похвали за прогресс по копилкам. Если задан конкретный вопрос — ответь строго на него.`;
  let reply = "";
  try {
    const resp = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [{
          role: "system",
          content: system
        }, ...data.prompt ? [{
          role: "user",
          content: data.prompt
        }] : [{
          role: "user",
          content: "Подведи финансовые итоги кассы за этот месяц и дай краткий совет."
        }]]
      }),
      signal: AbortSignal.timeout(6e4)
    });
    if (!resp.ok) throw new Error(`llm ${resp.status}`);
    const json = await resp.json();
    reply = String(json?.choices?.[0]?.message?.content || "").trim();
  } catch {
    reply = "Не получилось связаться с сервисом. Попробуйте ещё раз чуть позже.";
  }
  if (!reply) reply = "В кассе пока мало данных для анализа. Добавьте чеки и платежи!";
  await q(`INSERT INTO house_messages (id, house_id, user_id, text) VALUES ($1, $2, 'agent', $3)`, [newId("hm"), data.houseId, reply.slice(0, 4e3)]);
  const houseName = snap.house.name;
  await notifyHouseExcept(data.houseId, user.id, {
    title: `ЧекАгент (${houseName})`,
    body: reply.slice(0, 120),
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-agent"
    }
  }).catch(() => {
  });
  return {
    ok: true,
    reply
  };
}));
const linkReceiptToHouse_createServerFn_handler = createServerRpc({
  id: "d39a65c0655715f742e8120cef22dfc54937a687c016bfdd2ca72fce50dc5452",
  name: "linkReceiptToHouse",
  filename: "src/server/functions/houses.ts"
}, (opts) => linkReceiptToHouse.__executeServer(opts));
const linkReceiptToHouse = createServerFn({
  method: "POST"
}).validator((d) => ({
  houseId: String(d.houseId),
  receiptId: String(d.receiptId),
  link: !!d.link
})).handler(linkReceiptToHouse_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const target = data.link ? data.houseId : null;
  await q(`UPDATE receipts SET house_id = $1 WHERE id = $2 AND user_id = $3`, [target, data.receiptId, user.id]);
  return {
    ok: true
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
  amount: Math.round(Number(d.amount || 0)),
  target_date: d.target_date ? String(d.target_date).slice(0, 10) : null,
  initialAmount: Math.round(Math.max(0, Number(d.initialAmount || 0)))
})).handler(addWish_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.title) return {
    error: "Впишите название"
  };
  if (!await isMember(data.houseId, user.id)) return {
    error: "Вы не в этой кассе"
  };
  const wishId = newId("hw");
  const isComplete = data.amount > 0 && data.initialAmount >= data.amount;
  await q(`INSERT INTO house_wishes (id, house_id, title, amount, collected, target_date, by_user, bought_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [wishId, data.houseId, data.title, data.amount, data.initialAmount, data.target_date, user.id, isComplete ? (/* @__PURE__ */ new Date()).toISOString() : null]);
  if (data.initialAmount > 0) {
    await q(`INSERT INTO house_goal_deposits (id, house_id, wish_id, user_id, amount, note)
           VALUES ($1, $2, $3, $4, $5, 'Стартовый взнос')`, [newId("hgd"), data.houseId, wishId, user.id, data.initialAmount]);
  }
  const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
  await notifyHouseExcept(data.houseId, user.id, {
    title: house?.name || "Касса",
    body: `Новая цель: ${data.title} (${data.amount.toLocaleString("ru-RU")} ₽)`,
    data: {
      url: `/groups/${data.houseId}`,
      type: "house-wish"
    }
  }).catch(() => {
  });
  return {
    ok: true,
    id: wishId
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
  askHouseAgent_createServerFn_handler,
  createHouse_createServerFn_handler,
  deleteHouseBill_createServerFn_handler,
  deleteHouse_createServerFn_handler,
  deleteWish_createServerFn_handler,
  depositGoal_createServerFn_handler,
  getHouse_createServerFn_handler,
  joinHouse_createServerFn_handler,
  kickMember_createServerFn_handler,
  leaveHouse_createServerFn_handler,
  linkReceiptToHouse_createServerFn_handler,
  listHouses_createServerFn_handler,
  liveHouse_createServerFn_handler,
  payHouseBill_createServerFn_handler,
  sendHouseMessage_createServerFn_handler,
  setHouseBudget_createServerFn_handler,
  setSalary_createServerFn_handler,
  toggleWish_createServerFn_handler
};
