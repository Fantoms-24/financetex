import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, p as pushState, i as isStandalone, g as isIos, f as pushSupported, k as enablePush, u as useApp, t as tickBills, L as Link, b as cn, R as Receipt, S as ScanLine, U as Users, M as MessageSquareQuote } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { g as greeting, p as plural, a as money, e as dateRu } from "./format-bLET-Iix.js";
import { C as Calendar, T as TrendingDown } from "./trending-down-DPk-j6rW.js";
import { A as ArrowRight } from "./arrow-right-DQGtIdBA.js";
import { A as ArrowUpRight } from "./arrow-up-right-DmHj3eaG.js";
import { S as Sparkles } from "./sparkles-DmcIehh6.js";
import { C as ChevronRight } from "./chevron-right-D-j5iAsg.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./tick-DRof54z-.js";
import "./index-Da2oQDqR.js";
import "node:module";
import "./push-B0fcuhky.js";
import "node:util";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "http";
const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$3);
const __iconNode$2 = [
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
const Files = createLucideIcon("files", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
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
  const dailyLeft = Math.max(0, Math.round(left / Math.max(1, daysLeft)));
  const todayStr = reactExports.useMemo(() => {
    try {
      return new Intl.DateTimeFormat("ru-RU", {
        weekday: "short",
        day: "numeric",
        month: "long"
      }).format(/* @__PURE__ */ new Date());
    } catch {
      return "Сегодня";
    }
  }, []);
  const initials = (user?.displayName || user?.name || "U").slice(0, 2).toUpperCase();
  const recentReceipts = (boot.receipts || []).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pb-12 pt-4 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[12px] font-medium capitalize text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: todayStr })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "t-display mt-0.5 text-[26px] font-medium leading-tight text-ink", children: [
          greeting(),
          ", ",
          user?.displayName || user?.name || "друг",
          "!"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", className: "group flex h-10 w-10 items-center justify-center rounded-2xl border border-rule/80 bg-paper shadow-sm transition-all hover:scale-105 active:scale-95", "aria-label": "Настройки профиля", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold text-sage transition-colors group-hover:text-ink", children: initials }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-[22px] border border-rule/80 bg-paper p-5 shadow-paper-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sage/10 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] font-semibold uppercase tracking-wider text-muted", children: "Остаток бюджета" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", daysLeft > 3 ? "bg-sage/10 text-sage" : "bg-stamp/10 text-stamp"), children: daysLeft > 0 ? `ещё ${daysLeft} ${plural(daysLeft, "день", "дня", "дней")}` : "конец месяца" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("t-display t-num text-[36px] font-semibold leading-none", left >= 0 ? "text-ink" : "text-stamp"), children: money(left) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] text-muted", children: "до конца месяца" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11.5px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Расход ",
            used,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num", children: [
            "Лимит: ",
            money(budget)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-[8px] w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all duration-500", used > 90 ? "bg-stamp" : used > 75 ? "bg-amber-600" : "bg-sage"), style: {
          width: `${Math.max(3, used)}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 border-t border-rule/60 pt-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12, className: "text-sage" }),
            " Потрачено"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num mt-0.5 text-[14px] font-medium text-ink", children: money(boot.month.spent) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, className: "text-sage" }),
            " В день"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num mt-0.5 text-[14px] font-medium text-ink", children: [
            "~",
            money(dailyLeft)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 12, className: "text-sage" }),
            " Чеков"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num mt-0.5 text-[14px] font-medium text-ink", children: [
            boot.month.count,
            " шт."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/scan", className: "group relative flex min-h-[58px] items-center justify-between overflow-hidden rounded-[18px] bg-sage px-4 py-3 text-onsage shadow-md transition-all hover:brightness-105 active:scale-[0.99]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-onsage/15 text-onsage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 22, strokeWidth: 2.2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15.5px] font-semibold leading-tight", children: "Сканировать чек" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-onsage/75", children: "Моментальный разбор по фото или QR-коду" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-onsage/15 transition-transform group-hover:translate-x-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/receipts", className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { size: 19, strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16, className: "text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sage" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px] font-medium text-ink", children: "Чеки" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12px] text-muted", children: boot.month.count > 0 ? `${boot.month.count} ${plural(boot.month.count, "чек", "чека", "чеков")}` : "Пока нет чеков" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/groups", className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-amber-700/10 text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 19, strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16, className: "text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-800" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px] font-medium text-ink", children: "Кассы" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[12px] text-muted", children: boot.houses.length > 0 ? `${boot.houses[0].name}` : "Семья и общие траты" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bills", className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700/10 text-blue-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 19, strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16, className: "text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-800" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px] font-medium text-ink", children: "Платежи" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12px] text-muted", children: boot.bills.length > 0 ? `${boot.bills.length} ${plural(boot.bills.length, "счет", "счета", "счетов")}` : "ЖКХ, подписки" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/agent", className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-purple-700/10 text-purple-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 19, strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16, className: "text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-800" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px] font-medium text-ink", children: "Агент" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12px] text-muted", children: "Финансовый советник" })
        ] })
      ] })
    ] }),
    recentReceipts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-semibold uppercase tracking-wider text-muted", children: "Недавние покупки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/receipts", className: "text-[12.5px] font-medium text-sage hover:underline", children: [
          "Все чеки (",
          boot.month.count,
          ") →"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper", children: recentReceipts.map((rc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/receipts", className: "flex items-center justify-between px-4 py-3 transition-colors hover:bg-black/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[14.5px] font-medium text-ink", children: rc.store || "Чек без магазина" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11.5px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dateRu(rc.purchased_at || rc.created_at) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: rc.category || "Покупки" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "t-num ml-3 text-[15px] font-semibold text-ink", children: money(rc.total) })
      ] }, rc.id)) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PushNudge, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/agent", className: "flex min-h-[50px] items-center justify-between px-4 text-[14.5px] transition-colors hover:bg-black/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { size: 17, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Задать вопрос финансисту" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "text-muted" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings", className: "flex min-h-[50px] items-center justify-between px-4 text-[14.5px] transition-colors hover:bg-black/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 17, className: "text-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Настройки и лимиты" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "text-muted" })
      ] })
    ] })
  ] });
}
export {
  Menu as component
};
