import { c as createLucideIcon, p as pushState, i as isStandalone, l as isIos, k as pushSupported, j as jsxDevRuntimeExports, o as enablePush, u as useApp, t as tickBills, L as Link, S as ScanLine, U as Users } from "./router-jILV0Ki5.js";
import { r as reactExports } from "../server.js";
import { B as Button } from "./button-DVEG0ewd.js";
import { g as greeting, p as plural, a as money } from "./format-I651YhAt.js";
import { C as ChevronRight } from "./chevron-right-CckRugxy.js";
import "./tick-CZ14g1aT.js";
import "./index-C1XM1bZx.js";
import "./push-B0yND836.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "push-nudge rise p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0 flex-1", children: needHome ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[15.5px] leading-snug", children: "На iPhone сначала на Домой" }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 41,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[13px] leading-snug text-muted", children: "Поделиться → На экран Домой, потом откройте с иконки. Без этого пуши не приходят." }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 42,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 inline-flex items-center gap-1.5 text-[13px] text-sage", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Share, { size: 14 }, void 0, false, {
        fileName: "/app/applet/src/components/PushNudge.tsx",
        lineNumber: 46,
        columnNumber: 17
      }, this),
      " Поделиться → На экран Домой"
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 45,
      columnNumber: 15
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PushNudge.tsx",
    lineNumber: 40,
    columnNumber: 13
  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[15.5px] leading-snug", children: "Включить уведомления" }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 51,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[13px] leading-snug text-muted", children: "Платежи, покупки и сообщения кассы — даже с выключенным экраном." }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 52,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "sm", className: "mt-3", onClick: on, disabled: busy, children: busy ? "Секунду…" : "Включить" }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 55,
      columnNumber: 15
    }, this),
    error ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 text-[12.5px] text-stamp", children: error }, void 0, false, {
      fileName: "/app/applet/src/components/PushNudge.tsx",
      lineNumber: 58,
      columnNumber: 24
    }, this) : null
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PushNudge.tsx",
    lineNumber: 50,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/PushNudge.tsx",
    lineNumber: 38,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/PushNudge.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/PushNudge.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[26px] leading-tight", children: [
      greeting(),
      ", ",
      user?.displayName || "друг"
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 26,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "receipt-card rise p-5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[12px] uppercase tracking-[0.09em] text-muted", children: daysLeft > 0 ? `ещё на ${daysLeft} ${plural(daysLeft, "день", "дня", "дней")}` : "месяц на исходе" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display t-num mt-1 text-[34px] leading-none", children: money(left) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-[6px] w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full rounded-full bg-sage transition-[width] duration-500", style: {
          width: `${Math.max(2, used)}%`
        } }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 40,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 39,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 flex items-center justify-between text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            "потрачено ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num", children: money(boot.month.spent) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
              lineNumber: 46,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
            lineNumber: 45,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num", children: [
            "из ",
            money(budget)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
            lineNumber: 48,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 44,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/scan", className: "scan-cta rise mt-4 flex min-h-[54px] items-center justify-center gap-2 text-[16px] font-medium", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScanLine, { size: 19, strokeWidth: 2 }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      "Сканировать чек"
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/receipts", className: "desk-card rise p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Files, { size: 20, strokeWidth: 1.8, className: "text-sage" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mt-3 text-[17px]", children: "Чеки" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-[12.5px] text-muted", children: boot.month.count > 0 ? `${boot.month.count} ${plural(boot.month.count, "чек", "чека", "чеков")} за месяц` : "ящик пока пуст" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 64,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/groups", className: "desk-card rise p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 20, strokeWidth: 1.8, className: "text-sage" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mt-3 text-[17px]", children: "Кассы" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 71,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-[12.5px] text-muted", children: boot.houses.length > 0 ? `${boot.houses[0].name}` : "семья и квартира" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 72,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 69,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PushNudge, {}, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-5 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/agent", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: "Агент" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 17, className: "text-muted" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/bills", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: "Платежи" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2 text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[13px]", children: boot.bills.length > 0 ? `${boot.bills.length}` : "нет" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
            lineNumber: 89,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 17 }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
            lineNumber: 92,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 88,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/settings", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: "Настроить" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 96,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 17, className: "text-muted" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
        lineNumber: 95,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/index.tsx?tsr-split=component",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
export {
  Menu as component
};
