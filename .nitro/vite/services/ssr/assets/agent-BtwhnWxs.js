<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/agent-CIBogNYf.js
import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { a as q, n as newId } from "./index-Da2oQDqR.js";
import { g as getLlmConfig } from "./config-B3z1tKPy.js";
import { m as monthKey, c as categoryLabel } from "./format-bLET-Iix.js";
========
import { c as createServerRpc, g as guarded } from "./session-Bz02G02e.js";
import { c as createServerFn } from "../server.js";
import { a as q, n as newId } from "./index-C1XM1bZx.js";
import { g as getLlmConfig } from "./config-DSmv9iQV.js";
import { m as monthKey, c as categoryLabel } from "./format-I651YhAt.js";
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/agent-BtwhnWxs.js
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:module";
const agentHistory_createServerFn_handler = createServerRpc({
  id: "33c215974f917d4915c446c514b3028e148aeafd36e6d8d131932865a5e5df24",
  name: "agentHistory",
  filename: "src/server/functions/agent.ts"
}, (opts) => agentHistory.__executeServer(opts));
const agentHistory = createServerFn({
  method: "GET"
}).handler(agentHistory_createServerFn_handler, async () => guarded(async (user) => {
  const rows = await q(`SELECT id, role, text, created_at FROM agent_messages
        WHERE user_id = $1 ORDER BY created_at ASC LIMIT 200`, [user.id]);
  return {
    messages: rows ?? []
  };
}));
const agentClear_createServerFn_handler = createServerRpc({
  id: "c54d4fd82ad0b0a641aa49fcba30cfdf9e310885efd64ea56402ce5bda8a305f",
  name: "agentClear",
  filename: "src/server/functions/agent.ts"
}, (opts) => agentClear.__executeServer(opts));
const agentClear = createServerFn({
  method: "POST"
}).handler(agentClear_createServerFn_handler, async () => guarded(async (user) => {
  await q(`DELETE FROM agent_messages WHERE user_id = $1`, [user.id]);
  return {
    ok: true
  };
}));
async function buildContext(userId) {
  const startOfMonth = `${monthKey()}-01`;
  const [spent, byCat, houses] = await Promise.all([q(`SELECT coalesce(sum(total), 0)::bigint AS total FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date`, [userId, startOfMonth]), q(`SELECT category, coalesce(sum(total), 0)::bigint AS total FROM receipts
        WHERE user_id = $1 AND purchased_at >= $2::date GROUP BY category ORDER BY total DESC`, [userId, startOfMonth]), q(`SELECT h.name, b.amount, b.split, b.day_of_month
         FROM house_bills b
         JOIN houses h ON h.id = b.house_id
         JOIN house_members m ON m.house_id = h.id AND m.user_id = $1`, [userId])]);
  const total = Number(spent?.[0]?.total ?? 0);
  const cats = (byCat ?? []).map((c) => `${categoryLabel(c.category)}: ${Number(c.total).toLocaleString("ru-RU")} ₽`).join(", ");
  const houseText = (houses ?? []).length ? (houses ?? []).map((h) => `${h.name} — ${Number(h.amount).toLocaleString("ru-RU")} ₽, ${h.day_of_month} числа, делим: ${h.split}`).join("; ") : "касс нет";
  return [`Потрачено с начала месяца: ${total.toLocaleString("ru-RU")} ₽.`, cats ? `По категориям: ${cats}.` : "Чеков за месяц пока нет.", `Кассы и общие платежи: ${houseText}.`].join(" ");
}
const agentSend_createServerFn_handler = createServerRpc({
  id: "a0e22974c810e11c83cef592f7ac16efeac83723a1fdc00420c19d827d555f0e",
  name: "agentSend",
  filename: "src/server/functions/agent.ts"
}, (opts) => agentSend.__executeServer(opts));
const agentSend = createServerFn({
  method: "POST"
}).validator((d) => ({
  text: String(d.text || "").trim()
})).handler(agentSend_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.text) return {
    ok: true
  };
  await q(`INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'user', $3)`, [newId("am"), user.id, data.text.slice(0, 2e3)]);
  const {
    baseUrl,
    apiKey,
    model
  } = await getLlmConfig();
  if (!apiKey) {
    const text = "Админ ещё не вставил ключ, поэтому я пока без связи с сервисом. Но по вашим чекам и кассам отвечу, как только ключ появится.";
    await q(`INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'assistant', $3)`, [newId("am"), user.id, text]);
    return {
      ok: true,
      reply: text
    };
  }
  const context = await buildContext(user.id);
  const history = await q(`SELECT role, text FROM agent_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT 12`, [user.id]);
  const system = `Ты — ЧекАгент, карманный финансист. Говоришь по-русски, коротко и по-человечески, как запись в блокноте.Не используй слова «нейросеть», «AI», «smart insights». Без маркетинга и канцелярита.Данные человека: ${context}Отвечай 2–5 короткими фразами. Если не хватает данных — скажи прямо.`;
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
        }, ...(history ?? []).reverse().map((h) => ({
          role: h.role === "assistant" ? "assistant" : "user",
          content: h.text
        }))]
      }),
      signal: AbortSignal.timeout(6e4)
    });
    if (!resp.ok) throw new Error(`llm ${resp.status}`);
    const json = await resp.json();
    reply = String(json?.choices?.[0]?.message?.content || "").trim();
  } catch {
    reply = "Не дотянулся до сервиса. Попробуйте ещё раз через минутку";
  }
  if (!reply) reply = "Не нашёл, что ответить. Задайте вопрос по-другому";
  await q(`INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'assistant', $3)`, [newId("am"), user.id, reply.slice(0, 4e3)]);
  return {
    ok: true,
    reply
  };
}));
export {
  agentClear_createServerFn_handler,
  agentHistory_createServerFn_handler,
  agentSend_createServerFn_handler
};
