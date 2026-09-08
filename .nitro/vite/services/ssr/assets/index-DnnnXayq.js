import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, p as pushState, i as isStandalone, j as isIos, h as pushSupported, m as enablePush, u as useApp, t as tickBills, L as Link, S as ScanLine, U as Users } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { g as greeting, p as plural, d as money } from "./format-BOBMj6ZA.js";
import { C as ChevronRight } from "./chevron-right-C8htGL7S.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./tick-Caixl4Sl.js";
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
import "./store-BVRg5jbE.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15 2a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 21 8v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
      key: "1vo8kb"
    }
  ],
  ["path", { d: "M15 2v4a2 2 0 0 0 2 2h4", key: "sud9ri" }],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1", key: "l4dndm" }]
];
const Files = createLucideIcon("files", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 2v13", key: "1km8f5" }],
  ["path", { d: "m16 6-4-4-4 4", key: "13yo43" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }]
];
const Share = createLucideIcon("share", __iconNode);
function PushNudge() {
  const [state, setState] = reactExports.useState(() => pushState());
  const [standalone, setStandalone] = reactExports.useState(false);
  const [ios, setIos] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setStandalone(isStandalone());
    setIos(isIos());
    setState(pushState());
    const t = setInterval(() => setState(pushState()), 1500);
    return () => clearInterval(t);
  }, []);
  if (!pushSupported()) return null;
  if (state.granted && standalone) return null;
  async function on() {
    setBusy(true);
    setError(null);
    const res = await enablePush();
    setBusy(false);
    if (!res.ok) setError(res.error || "Не получилось");
    else setState(pushState());
  }
  const needHome = ios && !standalone;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "push-nudge rise p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: needHome ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[15.5px] leading-snug", children: "На iPhone сначала на Домой" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[13px] leading-snug text-muted", children: "Поделиться → На экран Домой, потом откройте с иконки. Без этого пуши не приходят." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 text-[13px] text-sage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share, { size: 14 }),
      " Поделиться → На экран Домой"
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[15.5px] leading-snug", children: "Включить уведомления" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[13px] leading-snug text-muted", children: "Платежи, покупки и сообщения кассы — даже с выключенным экраном." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "sage", size: "sm", className: "mt-3", onClick: on, disabled: busy, children: busy ? "Секунду…" : "Включить" }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[12.5px] text-stamp", children: error }) : null
  ] }) }) }) });
}
function Menu() {
  const {
    user,
    boot
  } = useApp();
  const ticked = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (ticked.current || !user) return;
    ticked.current = true;
    tickBills().catch(() => {
    });
  }, [user]);
  const budget = boot.settings.monthly_budget || 45e3;
  const left = budget - boot.month.spent;
  const used = Math.min(100, budget > 0 ? Math.round(boot.month.spent / budget * 100) : 0);
  const daysLeft = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).getDate() - (/* @__PURE__ */ new Date()).getDate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "t-display text-[26px] leading-tight", children: [
      greeting(),
      ", ",
      user?.displayName || "друг"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "receipt-card rise p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] uppercase tracking-[0.09em] text-muted", children: daysLeft > 0 ? `ещё на ${daysLeft} ${plural(daysLeft, "день", "дня", "дней")}` : "месяц на исходе" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display t-num mt-1 text-[34px] leading-none", children: money(left) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[6px] w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-sage transition-[width] duration-500", style: {
          width: `${Math.max(2, used)}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "потрачено ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num", children: money(boot.month.spent) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num", children: [
            "из ",
            money(budget)
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/scan", className: "scan-cta rise mt-4 flex min-h-[54px] items-center justify-center gap-2 text-[16px] font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 19, strokeWidth: 2 }),
      "Сканировать чек"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/receipts", className: "desk-card rise p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { size: 20, strokeWidth: 1.8, className: "text-sage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mt-3 text-[17px]", children: "Чеки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12.5px] text-muted", children: boot.month.count > 0 ? `${boot.month.count} ${plural(boot.month.count, "чек", "чека", "чеков")} за месяц` : "ящик пока пуст" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/groups", className: "desk-card rise p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20, strokeWidth: 1.8, className: "text-sage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mt-3 text-[17px]", children: "Кассы" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12.5px] text-muted", children: boot.houses.length > 0 ? `${boot.houses[0].name}` : "семья и квартира" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PushNudge, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/agent", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: "Агент" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "text-muted" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bills", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: "Платежи" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px]", children: boot.bills.length > 0 ? `${boot.bills.length}` : "нет" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: "Настроить" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "text-muted" })
      ] })
    ] })
  ] });
}
export {
  Menu as component
};
