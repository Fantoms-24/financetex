import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { c as createLucideIcon, u as useApp, b as cn } from "./router-eDuhfEID.js";
import { b as billDueLabel, a as moneyShort } from "./format-BOBMj6ZA.js";
import { l as listBills, s as setBillPaid, t as toggleBillNotify, d as deleteBill, a as addBill } from "./tick-Caixl4Sl.js";
import { P as Plus } from "./plus-DuXTGlhn.js";
import { C as Check } from "./check-BAk9Tl6l.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display text-[26px] leading-none", children: "Платежи" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] text-muted", children: bills.length > 0 ? "напомним за 2 дня, за день и в день" : "личные повторяющиеся" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: open ? "ghost" : "paper", onClick: () => setOpen(!open), children: open ? "Скрыть" : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }) })
    ] }),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: create, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Интернет", className: "mb-2.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 grid grid-cols-2 gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "900", inputMode: "numeric" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: day, onChange: (e) => setDay(e.target.value.replace(/[^\d]/g, "").slice(0, 2)), placeholder: "день", inputMode: "numeric" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: "Добавить платёж" })
    ] }) : null,
    bills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px]", children: "Пока пусто" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: "Добавьте аренду, свет или интернет — напомним до списания." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: bills.map((b) => {
      const due = billDueLabel(b.day_of_month);
      const paid = !!b.paid_cycle;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip rise px-4 py-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display min-w-0 truncate text-[16px]", children: b.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0 text-[16px]", children: moneyShort(b.amount) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            b.day_of_month,
            " числа"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rule", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(due.key === "today" || due.key === "overdue" ? "text-stamp" : ""), children: due.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule mt-2.5 flex items-center justify-between pt-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
            await setBillPaid({
              data: {
                billId: b.id,
                paid: !paid
              }
            });
            await reload();
          }, className: cn("flex min-h-[34px] items-center gap-1.5 rounded-[9px] border px-2.5 text-[13px]", paid ? "border-sage/40 bg-sage/10 text-sage" : "border-rule text-muted"), children: [
            paid ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : null,
            paid ? "оплатили" : "оплатил этот цикл"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
              await toggleBillNotify({
                data: {
                  billId: b.id,
                  notify: !b.notify
                }
              });
              await reload();
            }, className: "flex min-h-[34px] items-center gap-1.5 rounded-[9px] px-2 text-[13px] text-muted", "aria-label": "напоминания", children: b.notify ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 15, className: "text-sage" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 15 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
              if (!confirm(`Убрать «${b.title}»?`)) return;
              await deleteBill({
                data: {
                  billId: b.id
                }
              });
              await reload();
              await refresh();
            }, className: "min-h-[34px] rounded-[9px] px-2 text-[13px] text-stamp", children: "убрать" })
          ] })
        ] })
      ] }, b.id);
    }) })
  ] });
}
export {
  Bills as component
};
