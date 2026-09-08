import { c as createLucideIcon, b as createSsrRpc, u as useApp, j as jsxDevRuntimeExports, d as cn } from "./router-BzCAX3yA.js";
import { c as createServerFn, r as reactExports } from "../server.js";
import { B as Button } from "./button-m17wZ5AR.js";
import { I as Input } from "./input-CcWjlsU2.js";
import { e as billDueLabel, b as moneyShort } from "./format-I651YhAt.js";
import { P as Plus } from "./plus-DT__xlP8.js";
import { C as Check } from "./check-jnQlsn4g.js";
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
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode);
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
function Bills() {
  const {
    user,
    refresh
  } = useApp();
  const [bills, setBills] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [day, setDay] = reactExports.useState("1");
  const [busy, setBusy] = reactExports.useState(false);
  const reload = reactExports.useCallback(async () => {
    const r = await listBills().catch(() => null);
    setBills(r?.bills ?? []);
  }, []);
  reactExports.useEffect(() => {
    if (user) reload();
  }, [user, reload]);
  async function create(e) {
    e.preventDefault();
    const amt = Math.round(Number(amount.replace(/[^\d]/g, "") || 0));
    if (!title.trim() || !amt) return;
    setBusy(true);
    await addBill({
      data: {
        title: title.trim(),
        amount: amt,
        day_of_month: Number(day || 1)
      }
    });
    setTitle("");
    setAmount("");
    setDay("1");
    setOpen(false);
    setBusy(false);
    await reload();
    await refresh();
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display text-[26px] leading-none", children: "Платежи" }, void 0, false, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: bills.length > 0 ? "напомним за 2 дня, за день и в день" : "личные повторяющиеся" }, void 0, false, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 59,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: open ? "ghost" : "paper", onClick: () => setOpen(!open), children: open ? "Скрыть" : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 64,
        columnNumber: 30
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 63,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    open ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: create, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Интернет", className: "mb-2.5" }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 grid grid-cols-2 gap-2.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "900", inputMode: "numeric" }, void 0, false, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 71,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: day, onChange: (e) => setDay(e.target.value.replace(/[^\d]/g, "").slice(0, 2)), placeholder: "день", inputMode: "numeric" }, void 0, false, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 72,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 70,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: "Добавить платёж" }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 74,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
      lineNumber: 68,
      columnNumber: 15
    }, this) : null,
    bills.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[17px]", children: "Пока пусто" }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: "Добавьте аренду, свет или интернет — напомним до списания." }, void 0, false, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
      lineNumber: 79,
      columnNumber: 29
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5", children: bills.map((b) => {
      const due = billDueLabel(b.day_of_month);
      const paid = !!b.paid_cycle;
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise px-4 py-3.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-display min-w-0 truncate text-[16px]", children: b.title }, void 0, false, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 90,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num shrink-0 text-[16px]", children: moneyShort(b.amount) }, void 0, false, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 91,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 flex items-center gap-2 text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            b.day_of_month,
            " числа"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 94,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-rule", children: "·" }, void 0, false, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 95,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn(due.key === "today" || due.key === "overdue" ? "text-stamp" : ""), children: due.label }, void 0, false, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 96,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rule mt-2.5 flex items-center justify-between pt-2.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
            await setBillPaid({
              data: {
                billId: b.id,
                paid: !paid
              }
            });
            await reload();
          }, className: cn("flex min-h-[34px] items-center gap-1.5 rounded-[9px] border px-2.5 text-[13px]", paid ? "border-sage/40 bg-sage/10 text-sage" : "border-rule text-muted"), children: [
            paid ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { size: 14 }, void 0, false, {
              fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
              lineNumber: 109,
              columnNumber: 29
            }, this) : null,
            paid ? "оплатили" : "оплатил этот цикл"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 100,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
              await toggleBillNotify({
                data: {
                  billId: b.id,
                  notify: !b.notify
                }
              });
              await reload();
            }, className: "flex min-h-[34px] items-center gap-1.5 rounded-[9px] px-2 text-[13px] text-muted", "aria-label": "напоминания", children: b.notify ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bell, { size: 15, className: "text-sage" }, void 0, false, {
              fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
              lineNumber: 123,
              columnNumber: 35
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BellOff, { size: 15 }, void 0, false, {
              fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
              lineNumber: 123,
              columnNumber: 78
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
              if (!confirm(`Убрать «${b.title}»?`)) return;
              await deleteBill({
                data: {
                  billId: b.id
                }
              });
              await reload();
              await refresh();
            }, className: "min-h-[34px] rounded-[9px] px-2 text-[13px] text-stamp", children: "убрать" }, void 0, false, {
              fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
              lineNumber: 125,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
            lineNumber: 113,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
          lineNumber: 99,
          columnNumber: 17
        }, this)
      ] }, b.id, true, {
        fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
        lineNumber: 88,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
      lineNumber: 84,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/bills.tsx?tsr-split=component",
    lineNumber: 55,
    columnNumber: 10
  }, this);
}
export {
  Bills as component
};
