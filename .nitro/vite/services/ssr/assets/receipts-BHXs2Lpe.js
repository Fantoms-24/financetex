import { c as createServerFn, r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { c as createLucideIcon, u as useApp, b as cn } from "./router-eDuhfEID.js";
import { p as plural, d as money, e as dateRu, a as moneyShort, c as categoryLabel } from "./format-BOBMj6ZA.js";
import { c as createSsrRpc } from "./tick-Caixl4Sl.js";
import { P as Plus } from "./plus-DuXTGlhn.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./store-BVRg5jbE.js";
import "./index-BHhsLFuo.js";
import "./push-DV3AKLI-.js";
import "node:util";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "http";
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const addReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  store: String(d.store || "").trim() || "Без названия",
  total: Math.round(Number(d.total || 0)),
  note: String(d.note || "").trim() || null,
  category: String(d.category || "other"),
  purchased_at: d.purchased_at || null
})).handler(createSsrRpc("da6d0c53bd2585ea4b92274514798a4f335cb75abaf08d3f2d6db2c8e4913cd6"));
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
const VERDICT = {
  good: "норма",
  fair: "терпимо",
  overpriced: "дорого",
  impulse: "импульс"
};
function Receipts() {
  const {
    user,
    boot,
    refresh
  } = useApp();
  const [items, setItems] = reactExports.useState(boot.receipts);
  const [open, setOpen] = reactExports.useState(false);
  const [store, setStore] = reactExports.useState("");
  const [total, setTotal] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [openId, setOpenId] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!user) return;
    listReceipts({
      data: {
        limit: 120
      }
    }).then((r) => setItems(r?.receipts ?? [])).catch(() => {
    });
  }, [user]);
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    const amount = Math.round(Number(total.replace(/[^\d.,]/g, "").replace(",", ".") || 0));
    if (!amount) return;
    setBusy(true);
    try {
      await addReceipt({
        data: {
          store: store || "Без названия",
          total: amount,
          note
        }
      });
      setStore("");
      setTotal("");
      setNote("");
      setOpen(false);
      await refresh();
      const r = await listReceipts({
        data: {
          limit: 120
        }
      });
      setItems(r?.receipts ?? []);
    } finally {
      setBusy(false);
    }
  }
  async function toggle(id) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    setDetail([]);
    const r = await getReceipt({
      data: {
        id
      }
    }).catch(() => null);
    setDetail(r?.items ?? []);
  }
  async function drop(id) {
    await deleteReceipt({
      data: {
        id
      }
    });
    setOpenId(null);
    await refresh();
    const r = await listReceipts({
      data: {
        limit: 120
      }
    });
    setItems(r?.receipts ?? []);
  }
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const r of items) {
      const key = r.purchased_at || "без даты";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    }
    return Array.from(map.entries());
  }, [items]);
  const monthTotal = boot.month.spent;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display text-[26px] leading-none", children: "Ящик чеков" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] text-muted", children: items.length > 0 ? `${items.length} ${plural(items.length, "чек", "чека", "чеков")} · ${money(monthTotal)} за месяц` : "ящик пока пуст" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: open ? "ghost" : "paper", onClick: () => setOpen(!open), children: [
        open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        open ? "Скрыть" : "Вписать"
      ] })
    ] }),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mb-3 text-[15px]", children: "Записать вручную" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Магазин" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: store, onChange: (e) => setStore(e.target.value), placeholder: "Пятёрочка" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Сумма, ₽" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: total, onChange: (e) => setTotal(e.target.value), placeholder: "1250", inputMode: "numeric" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Заметка" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: note, onChange: (e) => setNote(e.target.value), placeholder: "необязательно" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: "Положить в ящик" })
    ] }) : null,
    grouped.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px]", children: "Пока пусто" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: "Отсканируйте чек или впишите сумму руками — и он ляжет в ящик." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: grouped.map(([day, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 px-1 text-[12px] uppercase tracking-[0.09em] text-muted", children: [
        dateRu(day),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 t-num text-muted/70", children: money(list.reduce((s, r) => s + r.total, 0)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: list.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip rise px-4 py-3.5", style: {
        transform: "rotate(-0.2deg)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full text-left", onClick: () => toggle(r.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display truncate text-[16px]", children: r.store || "Без названия" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0 text-[16px]", children: moneyShort(r.total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: categoryLabel(r.category) }),
            r.verdict ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rule", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(r.verdict === "impulse" || r.verdict === "overpriced" ? "text-stamp" : ""), children: VERDICT[r.verdict] || r.verdict })
            ] }) : null,
            r.note ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rule", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: r.note })
            ] }) : null
          ] })
        ] }),
        openId === r.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule mt-3 pt-3", children: [
          detail.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-3 space-y-1", children: detail.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-baseline justify-between gap-3 text-[13px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate", children: [
              it.name,
              it.qty ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted", children: [
                " ×",
                it.qty
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0", children: moneyShort(it.price) })
          ] }, it.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-[12.5px] text-muted", children: "Позиции не записаны" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "stamp", onClick: () => drop(r.id), children: "Убрать из ящика" })
        ] }) : null
      ] }, r.id)) })
    ] }, day)) })
  ] });
}
export {
  Receipts as component
};
