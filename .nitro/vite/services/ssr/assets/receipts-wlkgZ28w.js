import { c as createLucideIcon, b as createSsrRpc, u as useApp, j as jsxDevRuntimeExports, d as cn } from "./router-BzCAX3yA.js";
import { c as createServerFn, r as reactExports } from "../server.js";
import { B as Button } from "./button-m17wZ5AR.js";
import { I as Input } from "./input-CcWjlsU2.js";
import { p as plural, a as money, d as dateRu, b as moneyShort, c as categoryLabel } from "./format-I651YhAt.js";
import { P as Plus } from "./plus-DT__xlP8.js";
import "./tick-DtarbO-h.js";
import "./index-CJWAeYEQ.js";
import "node:module";
import "./push-D1zq6L-q.js";
import "crypto";
import "node:util";
import "buffer";
import "stream";
import "util";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "http";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "async_hooks";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display text-[26px] leading-none", children: "Ящик чеков" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 108,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: items.length > 0 ? `${items.length} ${plural(items.length, "чек", "чека", "чеков")} · ${money(monthTotal)} за месяц` : "ящик пока пуст" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 107,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: open ? "ghost" : "paper", onClick: () => setOpen(!open), children: [
        open ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 16 }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 114,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 114,
          columnNumber: 37
        }, this),
        open ? "Скрыть" : "Вписать"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 113,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    open ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: save, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mb-3 text-[15px]", children: "Записать вручную" }, void 0, false, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Магазин" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: store, onChange: (e) => setStore(e.target.value), placeholder: "Пятёрочка" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 123,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Сумма, ₽" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 126,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: total, onChange: (e) => setTotal(e.target.value), placeholder: "1250", inputMode: "numeric" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 127,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Заметка" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 130,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: note, onChange: (e) => setNote(e.target.value), placeholder: "необязательно" }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 131,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: "Положить в ящик" }, void 0, false, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 133,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
      lineNumber: 119,
      columnNumber: 15
    }, this) : null,
    grouped.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[17px]", children: "Пока пусто" }, void 0, false, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 139,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: "Отсканируйте чек или впишите сумму руками — и он ляжет в ящик." }, void 0, false, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 140,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
      lineNumber: 138,
      columnNumber: 31
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-5", children: grouped.map(([day, list]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-2 px-1 text-[12px] uppercase tracking-[0.09em] text-muted", children: [
        dateRu(day),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-2 t-num text-muted/70", children: money(list.reduce((s, r) => s + r.total, 0)) }, void 0, false, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 147,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 145,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5", children: list.map((r) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise px-4 py-3.5", style: {
        transform: "rotate(-0.2deg)"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "w-full text-left", onClick: () => toggle(r.id), children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline justify-between gap-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-display truncate text-[16px]", children: r.store || "Без названия" }, void 0, false, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 157,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num shrink-0 text-[16px]", children: moneyShort(r.total) }, void 0, false, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 158,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 156,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: categoryLabel(r.category) }, void 0, false, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 161,
              columnNumber: 25
            }, this),
            r.verdict ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-rule", children: "·" }, void 0, false, {
                fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
                lineNumber: 163,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn(r.verdict === "impulse" || r.verdict === "overpriced" ? "text-stamp" : ""), children: VERDICT[r.verdict] || r.verdict }, void 0, false, {
                fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
                lineNumber: 164,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 162,
              columnNumber: 38
            }, this) : null,
            r.note ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-rule", children: "·" }, void 0, false, {
                fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
                lineNumber: 169,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "truncate", children: r.note }, void 0, false, {
                fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
                lineNumber: 170,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 168,
              columnNumber: 35
            }, this) : null
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 160,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 155,
          columnNumber: 21
        }, this),
        openId === r.id ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rule mt-3 pt-3", children: [
          detail.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "mb-3 space-y-1", children: detail.map((it) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-baseline justify-between gap-3 text-[13px]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "min-w-0 truncate", children: [
              it.name,
              it.qty ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted", children: [
                " ×",
                it.qty
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
                lineNumber: 180,
                columnNumber: 45
              }, this) : null
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 178,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num shrink-0", children: moneyShort(it.price) }, void 0, false, {
              fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
              lineNumber: 182,
              columnNumber: 33
            }, this)
          ] }, it.id, true, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 177,
            columnNumber: 47
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 176,
            columnNumber: 46
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 text-[12.5px] text-muted", children: "Позиции не записаны" }, void 0, false, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 184,
            columnNumber: 35
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "stamp", onClick: () => drop(r.id), children: "Убрать из ящика" }, void 0, false, {
            fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
            lineNumber: 185,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
          lineNumber: 175,
          columnNumber: 40
        }, this) : null
      ] }, r.id, true, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 152,
        columnNumber: 32
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
        lineNumber: 151,
        columnNumber: 15
      }, this)
    ] }, day, true, {
      fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
      lineNumber: 144,
      columnNumber: 41
    }, this)) }, void 0, false, {
      fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
      lineNumber: 143,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/receipts.tsx?tsr-split=component",
    lineNumber: 105,
    columnNumber: 10
  }, this);
}
export {
  Receipts as component
};
