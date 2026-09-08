<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/scan-CEyFIBY-.js
import { c as createServerRpc, g as guarded } from "./session-Wdl18LHu.js";
import { c as createServerFn } from "../server.js";
import { n as newId, a as q, q as q1 } from "./index-Da2oQDqR.js";
import { g as getLlmConfig } from "./config-B3z1tKPy.js";
import { n as notifyHouseExcept } from "./push-B0fcuhky.js";
========
import { c as createServerRpc, g as guarded } from "./session-Bz02G02e.js";
import { c as createServerFn } from "../server.js";
import { n as newId, a as q } from "./index-C1XM1bZx.js";
import { g as getLlmConfig } from "./config-DSmv9iQV.js";
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/scan-DGn4FjQX.js
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
const CATEGORIES = ["food", "prepared", "household", "hygiene", "health", "drinks", "snacks", "other"];
const VERDICTS = ["good", "fair", "overpriced", "impulse"];
function extractJson(text) {
  const clean = String(text || "").replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(clean.slice(start, end + 1));
      } catch {
      }
    }
    return null;
  }
}
function asNumber(v, fallback = 0) {
  const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n) : fallback;
}
function asCategory(v) {
  const s = String(v || "").toLowerCase().trim();
  const map = {
    еда: "food",
    продукты: "food",
    готовая: "prepared",
    готоваяеда: "prepared",
    дом: "household",
    быт: "household",
    хозяйственное: "household",
    гигиена: "hygiene",
    здоровье: "health",
    аптека: "health",
    напитки: "drinks",
    снеки: "snacks",
    сладости: "snacks",
    разное: "other"
  };
  if (CATEGORIES.includes(s)) return s;
  return map[s] || "other";
}
const scanReceipt_createServerFn_handler = createServerRpc({
  id: "a386805ff732ab7bb95a52410c227d70447a02555557035cf81d2d1c8af1990e",
  name: "scanReceipt",
  filename: "src/server/functions/scan.ts"
}, (opts) => scanReceipt.__executeServer(opts));
const scanReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  image: String(d.image || ""),
  houseId: d.houseId ? String(d.houseId).trim() : null
})).handler(scanReceipt_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  const {
    baseUrl,
    apiKey,
    model
  } = await getLlmConfig();
  if (!apiKey) {
    return {
      error: "Админ ещё не вставил ключ. Скан недоступен"
    };
  }
  if (!data.image.startsWith("data:image/")) {
    return {
      error: "Не получилось прочитать фото"
    };
  }
  const prompt = `Разбери чек на фото. Ответь ТОЛЬКО валидным JSON без пояснений и markdown:
{"store":"название магазина","purchased_at":"YYYY-MM-DD","total":1234,"category":"food","verdict":"good","items":[{"name":"Молоко","qty":1,"price":89,"category":"food"}]}
Правила:
- total и price — целые рубли, без копеек и без символа валюты.
- category одно из: food, prepared, household, hygiene, health, drinks, snacks, other.
- verdict одно из: good, fair, overpriced, impulse.
- purchased_at — дата с чека в формате YYYY-MM-DD. Если не видно, подставь сегодняшнюю.
- Если что-то не читается, всё равно верни JSON с тем, что удалось понять.`;
  let content = "";
  try {
    const resp = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: [{
          role: "user",
          content: [{
            type: "text",
            text: prompt
          }, {
            type: "image_url",
            image_url: {
              url: data.image
            }
          }]
        }]
      }),
      signal: AbortSignal.timeout(6e4)
    });
    if (!resp.ok) {
      return {
        error: `Сервис распознавания не ответил (${resp.status})`
      };
    }
    const json = await resp.json();
    content = json?.choices?.[0]?.message?.content || "";
  } catch {
    return {
      error: "Сервис распознавания недоступен. Попробуйте ещё раз"
    };
  }
  const parsed = extractJson(content);
  if (!parsed) return {
    error: "Не разобрал чек. Попробуйте ещё раз или впишите вручную"
  };
  const items = Array.isArray(parsed.items) ? parsed.items.map((i) => ({
    name: String(i?.name || "").trim() || "Позиция",
    qty: i?.qty == null || i?.qty === "" ? null : asNumber(i.qty, 1),
    price: asNumber(i?.price ?? i?.amount ?? i?.sum, 0),
    category: asCategory(i?.category)
  })).filter((i) => i.price > 0 || i.name).slice(0, 200) : [];
  const itemsSum = items.reduce((s, i) => s + i.price, 0);
  const total = asNumber(parsed.total ?? parsed.sum ?? parsed.amount, itemsSum) || itemsSum;
  const store = String(parsed.store || parsed.merchant || "").trim() || "Без названия";
  const purchasedAtRaw = String(parsed.purchased_at || parsed.date || "").trim();
  const purchasedAt = /^\d{4}-\d{2}-\d{2}$/.test(purchasedAtRaw) ? purchasedAtRaw : null;
  const dominant = items.length ? items.reduce((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + i.price;
    return acc;
  }, {}) : {};
  const category = asCategory(parsed.category || (Object.keys(dominant).length ? Object.entries(dominant).sort((a, b) => b[1] - a[1])[0][0] : "other"));
  const verdictRaw = String(parsed.verdict || "").toLowerCase().trim();
  const verdict = VERDICTS.includes(verdictRaw) ? verdictRaw : null;
  const id = newId("r");
<<<<<<<< HEAD:.nitro/vite/services/ssr/assets/scan-CEyFIBY-.js
  await q(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, verdict, image, house_id)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7, $8, $9)`, [id, user.id, store, purchasedAt, total, category, verdict, data.image, data.houseId]);
  for (const it of items) {
    await q(`INSERT INTO receipt_items (id, receipt_id, name, qty, price, category)
         VALUES ($1, $2, $3, $4, $5, $6)`, [newId("ri"), id, it.name, it.qty, it.price, it.category]);
  }
  if (data.houseId) {
    const house = await q1(`SELECT name FROM houses WHERE id = $1`, [data.houseId]);
    await notifyHouseExcept(data.houseId, user.id, {
      title: house?.name || "Касса",
      body: `${user.displayName} добавил чек: ${store} (${total} ₽)`,
      data: {
        url: `/groups/${data.houseId}`,
        type: "house-receipt"
      }
    }).catch(() => {
    });
========
  await q(`INSERT INTO receipts (id, user_id, store, purchased_at, total, category, verdict, image)
       VALUES ($1, $2, $3, coalesce($4::date, current_date), $5, $6, $7, $8)`, [id, user.id, store, purchasedAt, total, category, verdict, data.image]);
  for (const it of items) {
    await q(`INSERT INTO receipt_items (id, receipt_id, name, qty, price, category)
         VALUES ($1, $2, $3, $4, $5, $6)`, [newId("ri"), id, it.name, it.qty, it.price, it.category]);
>>>>>>>> e27f76616f1195142e46232034799f9498f1f9bd:.nitro/vite/services/ssr/assets/scan-DGn4FjQX.js
  }
  return {
    ok: true,
    id,
    receipt: {
      id,
      store,
      purchased_at: purchasedAt,
      total,
      category,
      verdict,
      house_id: data.houseId
    },
    items
  };
}));
export {
  scanReceipt_createServerFn_handler
};
