import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, q as Route, n as useNavigate, u as useApp, L as Link, b as cn, U as Users, R as Receipt, S as ScanLine, H as House } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { p as plural, a as money, d as moneyShort, b as billDueLabel, c as categoryLabel, e as dateRu, t as timeRu } from "./format-bLET-Iix.js";
import { g as getHouse, a as Copy, s as setHouseBudget, k as kickMember, d as deleteHouse, b as leaveHouse, C as Crown, e as setSalary, f as addHouseBill, p as payHouseBill, h as deleteHouseBill, i as linkReceiptToHouse, m as addWish, n as depositGoal, t as toggleWish, o as deleteWish, q as askHouseAgent, r as sendHouseMessage, u as liveHouse } from "./houses-BrFqli6c.js";
import { T as Trash2, C as ChevronUp, a as ChevronDown, l as listReceipts } from "./receipts-ClnSozb3.js";
import { C as CircleAlert } from "./circle-alert-4YCx4HCP.js";
import { L as LogOut } from "./log-out-ZflWpQn2.js";
import { M as MessageSquare, S as Send } from "./send-Ca7a9xzc.js";
import { P as Plus } from "./plus-DHqwpiIx.js";
import { C as Check } from "./check-BtKpq9pj.js";
import { S as Sparkles } from "./sparkles-DmcIehh6.js";
import { L as LoaderCircle } from "./loader-circle-D9KxiRsp.js";
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
const __iconNode$b = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$b);
const __iconNode$a = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$a);
const __iconNode$9 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
      key: "1piglc"
    }
  ],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M2 8v1a2 2 0 0 0 2 2h1", key: "1env43" }]
];
const PiggyBank = createLucideIcon("piggy-bank", __iconNode$8);
const __iconNode$7 = [
  ["path", { d: "M13 16H8", key: "wsln4y" }],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
      key: "ycz6yz"
    }
  ]
];
const ReceiptText = createLucideIcon("receipt-text", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$6);
const __iconNode$5 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$4);
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
];
const Tv = createLucideIcon("tv", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const SPLIT_LABEL = {
  equal: "Поровну",
  salary: "По зарплате",
  payer: "Платит один"
};
const AVATAR_COLORS = ["bg-[#e3ece6] text-[#2c4737] border-[#bfd5c6]", "bg-[#faead9] text-[#7a481c] border-[#ebd0b5]", "bg-[#e2eaf5] text-[#244773] border-[#bccfe8]", "bg-[#fbe4e4] text-[#7a2e2e] border-[#ecc4c4]", "bg-[#ece4fb] text-[#4d2e7a] border-[#d8c7f2]", "bg-[#e4f7f5] text-[#1b5d56] border-[#beeae6]"];
function getInitials(name) {
  const clean = (name || "").trim();
  if (!clean) return "?";
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}
function getBillIcon(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("аренд") || t.includes("квартир") || t.includes("дом") || t.includes("ипотек")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 16 });
  }
  if (t.includes("интернет") || t.includes("wifi") || t.includes("вайфай") || t.includes("связь")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 16 });
  }
  if (t.includes("жкх") || t.includes("свет") || t.includes("вод") || t.includes("газ") || t.includes("коммунал")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16 });
  }
  if (t.includes("подписк") || t.includes("тв") || t.includes("кино") || t.includes("музык") || t.includes("янд")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { size: 16 });
  }
  if (t.includes("продукт") || t.includes("еда") || t.includes("магаз") || t.includes("рынок")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 16 });
}
function HousePage() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const {
    user
  } = useApp();
  const [snap, setSnap] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("bills");
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [copiedCode, setCopiedCode] = reactExports.useState(false);
  const [showMembersDetail, setShowMembersDetail] = reactExports.useState(false);
  const [openReceiptId, setOpenReceiptId] = reactExports.useState(null);
  const [agentBusy, setAgentBusy] = reactExports.useState(false);
  const versionRef = reactExports.useRef("");
  const load = reactExports.useCallback(async () => {
    const r = await getHouse({
      data: {
        houseId: id
      }
    }).catch(() => null);
    if (!r) return;
    if (r.error) {
      setError(r.error);
      return;
    }
    versionRef.current = r.version ?? "";
    setSnap(r);
  }, [id]);
  reactExports.useEffect(() => {
    setSnap(null);
    setError(null);
    load();
  }, [load]);
  reactExports.useEffect(() => {
    if (!id) return;
    let alive = true;
    const tick = async () => {
      try {
        const r = await liveHouse({
          data: {
            houseId: id
          }
        });
        if (!alive || !r || r.error) return;
        if (r.version && r.version !== versionRef.current) {
          versionRef.current = r.version;
          setSnap(r);
        }
      } catch {
      }
    };
    const t = setInterval(tick, 2500);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [id]);
  const copyCode = async (code) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2e3);
    } catch {
    }
  };
  const shareCode = async (code, houseName) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Касса «${houseName}» в ЧекАгенте`,
          text: `Присоединяйся к семейной кассе «${houseName}» в приложении ЧекАгент. Код приглашения: ${code}`,
          url: window.location.href
        });
        return;
      } catch {
      }
    }
    await copyCode(code);
  };
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stamp/10 text-stamp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 24 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "t-display text-[18px] text-ink", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[13px] text-muted", children: "Возможно, касса была удалена или вы вышли из неё" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 w-full", variant: "sage", onClick: () => navigate({
        to: "/groups"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
        " Вернуться к кассам"
      ] })
    ] }) });
  }
  if (!snap || !snap.house) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 animate-[breathe_1.4s_ease-in-out_infinite] rounded-[18px] border border-rule/60 bg-paper/50" }) });
  }
  const isOwner = snap.house.owner_id === user?.id;
  snap.bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const myUserId = user?.id || "";
  const myTotalShare = snap.bills.reduce((sum, b) => {
    const share = snap.shares?.[b.id]?.[myUserId] ?? 0;
    return sum + share;
  }, 0);
  const paidBills = snap.bills.filter((b) => snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle));
  const paidCount = paidBills.length;
  const totalBillsCount = snap.bills.length;
  const percentPaid = totalBillsCount > 0 ? Math.round(paidCount / totalBillsCount * 100) : 0;
  const myPaidShare = snap.bills.reduce((sum, b) => {
    const isPaid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle);
    if (isPaid) {
      return sum + (snap.shares?.[b.id]?.[myUserId] ?? 0);
    }
    return sum;
  }, 0);
  const myUnpaidShare = Math.max(0, myTotalShare - myPaidShare);
  const totalSalaries = snap.members.reduce((s, m) => s + Math.max(0, m.salary), 0);
  const activeGoalsCount = snap.wishes.filter((w) => !w.bought_at).length;
  const receiptsSum = snap.receipts.reduce((s, r) => s + (Number(r.total) || 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-28 pt-3 sm:pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-3 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/groups", className: "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 text-[13px] font-medium text-ink shadow-sm transition hover:bg-white active:scale-95", "aria-label": "Назад к кассам", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Кассы" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => copyCode(snap.house.code), className: "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 font-mono text-[12.5px] font-medium tracking-wide text-sage shadow-sm transition hover:bg-white active:scale-95", title: "Нажмите, чтобы скопировать код", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: copiedCode ? "Скопировано!" : snap.house.code })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => shareCode(snap.house.code, snap.house.name), className: "inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule bg-paper text-muted shadow-sm transition hover:bg-white hover:text-ink active:scale-95", "aria-label": "Поделиться кассой", title: "Поделиться", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 15 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSettings(!showSettings), className: cn("inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule shadow-sm transition active:scale-95", showSettings ? "bg-sage text-onsage border-sage" : "bg-paper text-muted hover:bg-white hover:text-ink"), "aria-label": "Настройки кассы", title: "Управление кассой", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 15 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-baseline justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display truncate text-[25px] font-semibold leading-tight text-ink", children: snap.house.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13, className: "shrink-0 text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            snap.members.length,
            " ",
            plural(snap.members.length, "участник", "участника", "участников")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: snap.members.map((m) => m.name).join(", ") })
        ] })
      ] }) })
    ] }),
    showSettings ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 16, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[15px] font-semibold text-ink", children: "Управление кассой" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSettings(false), className: "text-[12px] text-muted hover:text-ink", children: "Закрыть" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-[12px] border border-rule/60 bg-white/70 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted", children: "Месячный бюджет кассы" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num text-[16px] font-bold text-ink", children: snap.house.monthly_budget > 0 ? money(snap.house.monthly_budget) : "Не установлен" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditBudgetModal, { currentBudget: snap.house.monthly_budget, onSave: async (val) => {
            await setHouseBudget({
              data: {
                houseId: id,
                budget: val
              }
            });
            await load();
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted", children: "Общий лимит расходов семьи на месяц для аналитики и контроля трат." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 rounded-[12px] border border-dashed border-sage/40 bg-sage/5 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-sage", children: "Код для близких" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[16px] font-bold tracking-widest text-ink", children: snap.house.code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", onClick: () => copyCode(snap.house.code), className: "h-8 gap-1 text-[12px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13 }),
          " ",
          copiedCode ? "Скопировано" : "Копировать"
        ] })
      ] }) }),
      isOwner && snap.members.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[12px] font-medium uppercase tracking-wider text-muted", children: "Участники" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: snap.members.filter((m) => m.user_id !== user?.id).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-[10px] border border-rule/60 bg-white/70 px-3 py-2 text-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
            if (!confirm(`Исключить участника «${m.name}» из кассы?`)) return;
            await kickMember({
              data: {
                houseId: id,
                userId: m.user_id
              }
            });
            await load();
          }, className: "flex items-center gap-1 text-[12px] text-stamp hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
            " Исключить"
          ] })
        ] }, m.user_id)) })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-rule/60 pt-3", children: isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-muted", children: "Вы создатель этой кассы" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10", onClick: async () => {
          if (!confirm("Удалить кассу полностью? Все платежи, чеки и переписка будут стёрты.")) return;
          await deleteHouse({
            data: {
              houseId: id
            }
          });
          navigate({
            to: "/groups"
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
          " Удалить кассу"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-muted", children: "Покинуть совместную кассу" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10", onClick: async () => {
          if (!confirm("Выйти из кассы? Вы перестанете получать уведомления.")) return;
          await leaveHouse({
            data: {
              houseId: id
            }
          });
          navigate({
            to: "/groups"
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13 }),
          " Выйти"
        ] })
      ] }) })
    ] }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[20px] border border-rule bg-gradient-to-b from-[#faf7ef] to-[#f4eee2] p-4 shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[12.5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold uppercase tracking-wider text-muted", children: [
          "Расходы ",
          formatCycleMonth(snap.cycle)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-medium text-sage", children: [
          paidCount,
          " из ",
          totalBillsCount,
          " счетов закрыто"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[14px] border border-rule/70 bg-white/70 p-3 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] text-muted", children: "Всего за месяц" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num mt-0.5 text-[20px] font-bold text-ink", children: moneyShort(snap.analytics.totalSpent) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] text-muted", children: "счета + чеки кассы" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[14px] border border-sage/30 bg-sage/10 p-3 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] font-medium text-sage", children: "Ваша доля счетов" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num mt-0.5 text-[20px] font-bold text-ink", children: moneyShort(myTotalShare) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] text-sage", children: myUnpaidShare === 0 && myTotalShare > 0 ? "оплачено полностью" : `осталось ${moneyShort(myUnpaidShare)}` })
        ] })
      ] }),
      totalBillsCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11.5px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Прогресс закрытия счетов" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-ink", children: [
            percentPaid,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-2 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-sage transition-all duration-500", style: {
          width: `${percentPaid}%`
        } }) })
      ] }) : null
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowMembersDetail(!showMembersDetail), className: "flex w-full items-center justify-between text-left transition hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5 shrink-0 overflow-hidden", children: snap.members.slice(0, 4).map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ring-2 ring-paper", AVATAR_COLORS[idx % AVATAR_COLORS.length]), children: getInitials(m.name) }, m.user_id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display block text-[14.5px] font-semibold text-ink leading-tight", children: "Участники и доходы" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11.5px] text-muted leading-tight", children: "доли при делении «по зарплате»" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[12.5px] text-muted shrink-0 pl-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal", children: showMembersDetail ? "Скрыть" : "Подробнее" }),
          showMembersDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
        ] })
      ] }),
      showMembersDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2 border-t border-rule/60 pt-3", children: snap.members.map((m, idx) => {
        const isMe = m.user_id === user?.id;
        const isCreator = m.user_id === snap.house?.owner_id;
        const proportion = totalSalaries > 0 ? Math.round(m.salary / totalSalaries * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center justify-between gap-3 rounded-[12px] p-2.5 transition", isMe ? "bg-cream/80 border border-rule/70" : "bg-white/60 border border-rule/40"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold", AVATAR_COLORS[idx % AVATAR_COLORS.length]), children: getInitials(m.name) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[13.5px] font-semibold text-ink leading-tight", children: m.name }),
                isMe ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-[4px] bg-sage/15 px-1 py-0.2 text-[9.5px] font-bold text-sage leading-tight", children: "вы" }) : null,
                isCreator ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Создатель кассы", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 12, className: "text-amber-600 shrink-0" }) }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11.5px] text-muted leading-tight", children: m.salary > 0 ? `${moneyShort(m.salary)} в мес. · ${proportion}%` : "доход не указан" })
            ] })
          ] }),
          isMe ? /* @__PURE__ */ jsxRuntimeExports.jsx(SalaryWidget, { initialSalary: m.salary, onSave: async (newSal) => {
            await setSalary({
              data: {
                houseId: id,
                amount: newSal
              }
            });
            await load();
          } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-[12.5px] font-medium text-muted", children: m.salary > 0 ? moneyShort(m.salary) : "—" })
        ] }, m.user_id);
      }) }) : null
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 py-1", children: [{
      id: "bills",
      label: "Платежи",
      count: snap.bills.length,
      icon: Receipt
    }, {
      id: "receipts",
      label: "Чеки",
      count: snap.receipts.length,
      icon: ReceiptText
    }, {
      id: "goals",
      label: "Копилки",
      count: activeGoalsCount,
      icon: PiggyBank
    }, {
      id: "analytics",
      label: "Аналитика",
      count: 0,
      icon: ChartColumn
    }, {
      id: "chat",
      label: "Чат & AI",
      count: snap.messages.length,
      icon: MessageSquare
    }].map((item) => {
      const active = tab === item.id;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(item.id), className: cn("flex shrink-0 items-center gap-1.5 rounded-[12px] border px-3 py-2 text-[12.5px] font-medium transition-all active:scale-95 whitespace-nowrap shadow-xs", active ? "border-sage bg-sage text-onsage font-semibold shadow-sm" : "border-rule/80 bg-paper text-muted hover:border-sage/40 hover:text-ink"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
        item.count > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("ml-0.5 inline-flex h-4 min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none", active ? "bg-white/25 text-onsage" : "bg-rule-soft text-muted"), children: item.count }) : null
      ] }, item.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4", children: [
      tab === "bills" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: snap.bills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 22 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[16.5px] font-semibold text-ink leading-tight", children: "Регулярных платежей пока нет" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted", children: "Добавьте аренду, интернет, ЖКУ или другие ежемесячные счета, чтобы не забывать о них" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddBillModal, { members: snap.members, onAdd: async (v) => {
          await addHouseBill({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        }, trigger: (open) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "sage", size: "md", className: "gap-1.5 rounded-[12px] px-4 text-[13.5px]", onClick: open, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " Добавить первый платёж"
        ] }) }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        snap.bills.map((b) => {
          const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle);
          const due = billDueLabel(b.day_of_month);
          const share = snap.shares?.[b.id]?.[myUserId] ?? 0;
          const payerMember = snap.members.find((m) => m.user_id === b.payer_id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-[16px] border p-3.5 transition-all shadow-paper", paid ? "border-sage/30 bg-[#fafcf9]" : "border-rule bg-paper"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border", paid ? "border-sage/40 bg-sage/10 text-sage" : "border-rule/80 bg-white text-ink shadow-xs"), children: paid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }) : getBillIcon(b.title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "t-display text-[15.5px] font-semibold text-ink leading-snug", children: b.title }),
                    paid ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-[5px] bg-sage/15 px-1.5 py-0.5 text-[10.5px] font-bold text-sage leading-none", children: "оплачен" }) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(due.key === "today" || due.key === "overdue" ? "text-stamp font-medium" : ""), children: due.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.split === "payer" && payerMember ? `платит ${payerMember.name}` : SPLIT_LABEL[b.split] || "Поровну" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num text-[17px] font-bold text-ink leading-tight", children: moneyShort(b.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11.5px] text-sage font-medium leading-tight", children: [
                  "ваша доля: ",
                  moneyShort(share)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5 border-t border-rule/50 pt-2.5", children: snap.members.map((m) => {
              const mShare = snap.shares?.[b.id]?.[m.user_id] ?? 0;
              const isM = m.user_id === user?.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("rounded-[7px] px-2 py-0.5 text-[11px] font-medium leading-none", isM ? "bg-sage/12 text-sage font-semibold" : "bg-cream text-muted"), children: [
                m.name,
                ": ",
                moneyShort(mShare)
              ] }, m.user_id);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between border-t border-rule/40 pt-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
                await payHouseBill({
                  data: {
                    houseId: id,
                    billId: b.id,
                    paid: !paid
                  }
                });
                await load();
              }, className: cn("inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[12.5px] font-medium transition active:scale-95 shadow-xs", paid ? "border-sage/40 bg-white text-sage hover:bg-sage/5" : "border-sage bg-sage text-onsage hover:bg-sage/95"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: paid ? "Отменить оплату" : "Отметить оплаченным" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                if (!confirm(`Удалить платёж «${b.title}»?`)) return;
                await deleteHouseBill({
                  data: {
                    houseId: id,
                    billId: b.id
                  }
                });
                await load();
              }, className: "flex h-8 w-8 items-center justify-center rounded-[8px] text-muted/50 transition hover:bg-stamp/10 hover:text-stamp", title: "Удалить платёж", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
            ] })
          ] }, b.id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AddBillModal, { members: snap.members, onAdd: async (v) => {
          await addHouseBill({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        } })
      ] }) }) : null,
      tab === "receipts" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] uppercase tracking-wider text-muted font-semibold", children: "Чеки кассы" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num text-[17px] font-bold text-ink leading-tight", children: money(receiptsSum) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/scan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", className: "gap-1 rounded-[10px] text-[12px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 14 }),
              " Скан чека"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AttachReceiptModal, { houseId: id, onAttached: async () => {
              await load();
            } })
          ] })
        ] }),
        snap.receipts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[16.5px] font-semibold text-ink leading-tight", children: "Общих чеков пока нет" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted", children: "Сканируйте покупки в магазине или привязывайте чеки из личного ящика к этой кассе" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/scan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "sage", size: "md", className: "gap-1.5 rounded-[12px] px-4 text-[13.5px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 16 }),
            " Сканировать чек"
          ] }) }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: snap.receipts.map((r) => {
          const isOpen = openReceiptId === r.id;
          const isMyReceipt = r.user_id === user?.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[16px] border border-rule bg-paper transition-all shadow-paper overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpenReceiptId(isOpen ? null : r.id), className: "flex w-full items-center justify-between p-3.5 text-left transition hover:bg-black/[0.015]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pr-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[15px] font-semibold text-ink", children: r.store }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-cream border border-rule/80 px-2 py-0.5 text-[10.5px] font-medium text-muted", children: categoryLabel(r.category) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dateRu(r.purchased_at || r.created_at) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sage font-medium", children: [
                    "Купил(а) ",
                    r.payer_name
                  ] }),
                  r.note ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-ink/70", children: r.note })
                  ] }) : null
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-[16.5px] font-bold text-ink", children: moneyShort(r.total) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }) })
              ] })
            ] }),
            isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-rule/60 bg-black/[0.015] px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-muted", children: "Чек в общей кассе" }),
              isMyReceipt ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                await linkReceiptToHouse({
                  data: {
                    houseId: id,
                    receiptId: r.id,
                    link: false
                  }
                });
                await load();
              }, className: "text-[12px] font-medium text-stamp hover:underline", children: "Отвязать от кассы" }) : null
            ] }) }) : null
          ] }, r.id);
        }) })
      ] }) : null,
      tab === "goals" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: snap.wishes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PiggyBank, { size: 22 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[16.5px] font-semibold text-ink leading-tight", children: "Копилок и целей пока нет" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted", children: "Копите вместе на отпуск, новый холодильник, ремонт или подарки близким" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddGoalModal, { onAdd: async (v) => {
          await addWish({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        }, trigger: (open) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "sage", size: "md", className: "gap-1.5 rounded-[12px] px-4 text-[13.5px]", onClick: open, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " Создать первую цель"
        ] }) }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: snap.wishes.map((w) => {
          const isComplete = !!w.bought_at || w.amount > 0 && w.collected >= w.amount;
          const percent = w.amount > 0 ? Math.min(100, Math.round(w.collected / w.amount * 100)) : 0;
          const remaining = Math.max(0, w.amount - w.collected);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-[16px] border p-4 transition-all shadow-paper", isComplete ? "border-sage/40 bg-[#fafcf9]" : "border-rule bg-paper"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border", isComplete ? "border-sage/40 bg-sage/15 text-sage" : "border-amber-800/30 bg-amber-800/10 text-amber-850"), children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "t-display text-[16px] font-semibold text-ink leading-tight", children: w.title }),
                    isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-[5px] bg-sage/15 px-1.5 py-0.5 text-[10px] font-bold text-sage leading-none", children: "достигнуто!" }) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11.5px] text-muted", children: [
                    w.by_name ? `автор: ${w.by_name}` : "общая цель",
                    w.target_date ? ` · до ${dateRu(w.target_date)}` : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num text-[17px] font-bold text-ink leading-tight", children: moneyShort(w.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted", children: "цель" })
              ] })
            ] }),
            w.amount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11.5px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-ink", children: [
                  "Собрано: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sage font-bold", children: moneyShort(w.collected) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: isComplete ? "100%" : `осталось ${moneyShort(remaining)} (${percent}%)` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all duration-500", isComplete ? "bg-sage" : "bg-amber-700"), style: {
                width: `${percent}%`
              } }) })
            ] }) : null,
            w.deposits && w.deposits.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t border-rule/50 pt-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5", children: [
                "Взносы участников (",
                w.deposits.length,
                "):"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: w.deposits.slice(0, 4).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[12px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted", children: [
                  d.name,
                  " ",
                  d.note ? `(${d.note})` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num font-semibold text-ink", children: [
                  "+",
                  moneyShort(d.amount)
                ] })
              ] }, d.id)) })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 flex items-center justify-between gap-2 border-t border-rule/50 pt-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DepositModal, { goalTitle: w.title, onDeposit: async (amt, note) => {
                  await depositGoal({
                    data: {
                      houseId: id,
                      wishId: w.id,
                      amount: amt,
                      note
                    }
                  });
                  await load();
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                  await toggleWish({
                    data: {
                      houseId: id,
                      wishId: w.id
                    }
                  });
                  await load();
                }, className: "rounded-[10px] border border-rule bg-white px-2.5 py-1.5 text-[12px] font-medium text-muted hover:text-ink shadow-xs transition", children: isComplete ? "В процесс" : "Куплено" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                if (!confirm(`Удалить «${w.title}»?`)) return;
                await deleteWish({
                  data: {
                    houseId: id,
                    wishId: w.id
                  }
                });
                await load();
              }, className: "flex h-8 w-8 items-center justify-center text-muted/50 hover:text-stamp transition", title: "Удалить цель", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
            ] })
          ] }, w.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AddGoalModal, { onAdd: async (v) => {
          await addWish({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        } })
      ] }) }) : null,
      tab === "analytics" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-4 shadow-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] font-semibold uppercase tracking-wider text-muted", children: "Бюджет кассы" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EditBudgetModal, { currentBudget: snap.analytics.budget, onSave: async (val) => {
              await setHouseBudget({
                data: {
                  houseId: id,
                  budget: val
                }
              });
              await load();
            }, trigger: (open) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: open, className: "text-[12px] font-medium text-sage hover:underline", children: snap.analytics.budget > 0 ? "Изменить" : "+ Задать бюджет" }) })
          ] }),
          snap.analytics.budget > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[32px] font-bold leading-none text-ink", children: money(snap.analytics.left) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12.5px] text-muted", children: "остаток лимита" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11.5px] text-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Израсходовано ",
                  snap.analytics.percentSpent,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-num", children: [
                  "Лимит: ",
                  money(snap.analytics.budget)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all duration-500", snap.analytics.percentSpent > 90 ? "bg-stamp" : snap.analytics.percentSpent > 75 ? "bg-amber-600" : "bg-sage"), style: {
                width: `${Math.max(3, snap.analytics.percentSpent)}%`
              } }) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13.5px] text-ink font-medium", children: "Семейный лимит не установлен" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12px] text-muted", children: "Задайте общий бюджет кассы на месяц, чтобы контролировать перерасход." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2 border-t border-rule/60 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[10px] bg-cream/70 p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted", children: "Потрачено в кассе" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-num mt-0.5 text-[15px] font-bold text-ink", children: money(snap.analytics.totalSpent) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[10px] bg-cream/70 p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted", children: "Количество чеков" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "t-num mt-0.5 text-[15px] font-bold text-ink", children: [
                snap.receipts.length,
                " шт."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-4 shadow-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[15.5px] font-semibold text-ink leading-tight mb-1", children: "Вклад участников в траты" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted mb-3", children: "оплаченные счета + покупки по чекам за этот месяц" }),
          snap.analytics.byMember.length === 0 || snap.analytics.totalSpent === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-2 text-center text-[12.5px] text-muted", children: "Трат в этом месяце пока не было." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: snap.analytics.byMember.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[13px] mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-6 w-6 items-center justify-center rounded-full border text-[9.5px] font-bold", AVATAR_COLORS[idx % AVATAR_COLORS.length]), children: getInitials(m.name) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: m.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num font-bold text-ink", children: money(m.total) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11.5px] text-muted", children: [
                  "(",
                  m.percent,
                  "%)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all duration-500", idx === 0 ? "bg-sage" : idx === 1 ? "bg-amber-700" : "bg-blue-700"), style: {
              width: `${Math.max(4, m.percent)}%`
            } }) })
          ] }, m.user_id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-4 shadow-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[15.5px] font-semibold text-ink leading-tight mb-1", children: "Расходы по категориям" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted mb-3", children: "структура трат кассы за месяц" }),
          snap.analytics.byCategory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-2 text-center text-[12.5px] text-muted", children: "Данных по категориям пока нет." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: snap.analytics.byCategory.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[12.5px] mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: cat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num font-semibold text-ink", children: money(cat.total) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted", children: [
                  "(",
                  cat.percent,
                  "%)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-sage/80", style: {
              width: `${Math.max(3, cat.percent)}%`
            } }) })
          ] }, cat.category)) })
        ] })
      ] }) : null,
      tab === "chat" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-[14px] border border-sage/30 bg-sage/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, className: "text-sage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display text-[13.5px] font-semibold text-sage", children: "Семейный советник ЧекАгент" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted mb-2.5", children: "Задайте вопрос по финансам кассы или используйте быстрые команды:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: agentBusy, onClick: async () => {
              setAgentBusy(true);
              try {
                await askHouseAgent({
                  data: {
                    houseId: id,
                    prompt: "Подведи финансовые итоги кассы за этот месяц"
                  }
                });
                await load();
              } finally {
                setAgentBusy(false);
              }
            }, className: "rounded-[9px] border border-sage/40 bg-white px-2.5 py-1 text-[11.5px] font-medium text-sage hover:bg-sage/10 transition shadow-xs disabled:opacity-50", children: [
              agentBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 11, className: "inline animate-spin mr-1" }) : null,
              "📊 Итоги месяца"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: agentBusy, onClick: async () => {
              setAgentBusy(true);
              try {
                await askHouseAgent({
                  data: {
                    houseId: id,
                    prompt: "Подскажи, где семья может оптимизировать расходы"
                  }
                });
                await load();
              } finally {
                setAgentBusy(false);
              }
            }, className: "rounded-[9px] border border-sage/40 bg-white px-2.5 py-1 text-[11.5px] font-medium text-sage hover:bg-sage/10 transition shadow-xs disabled:opacity-50", children: "💡 Где сэкономить?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: agentBusy, onClick: async () => {
              setAgentBusy(true);
              try {
                await askHouseAgent({
                  data: {
                    houseId: id,
                    prompt: "Оцени вклады участников и прогресс по копилкам"
                  }
                });
                await load();
              } finally {
                setAgentBusy(false);
              }
            }, className: "rounded-[9px] border border-sage/40 bg-white px-2.5 py-1 text-[11.5px] font-medium text-sage hover:bg-sage/10 transition shadow-xs disabled:opacity-50", children: "⚖️ Анализ вкладов" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto px-1 py-1 no-scrollbar", children: snap.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-[13px] text-muted", children: "Пока сообщений нет. Напишите что-нибудь в общую кассу или запросите отчёт у Агента!" }) : snap.messages.map((m) => {
          const isAgent = m.is_agent || m.user_id === "agent";
          const isMe = m.user_id === user?.id;
          if (isAgent) {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-1 rounded-[14px] border border-sage/40 bg-[#f4f8f5] p-3 shadow-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-sage text-onsage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 11 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold text-sage", children: "ЧекАгент · Советник" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted/70 ml-auto", children: timeRu(m.created_at) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13.5px] leading-relaxed text-ink whitespace-pre-wrap", children: m.text })
            ] }, m.id);
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col", isMe ? "items-end" : "items-start"), children: [
            !isMe ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-0.5 ml-1 text-[11px] font-semibold text-sage", children: m.name }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("max-w-[82%] rounded-[14px] px-3.5 py-2 text-[14px] leading-snug shadow-xs break-words", isMe ? "bg-sage text-onsage rounded-tr-xs" : "bg-white border border-rule text-ink rounded-tl-xs"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: m.text }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 px-1 text-[10px] text-muted/70", children: timeRu(m.created_at) })
          ] }, m.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChatInputBar, { onSend: async (text) => {
          await sendHouseMessage({
            data: {
              houseId: id,
              text
            }
          });
          await load();
        } })
      ] }) : null
    ] })
  ] });
}
function formatCycleMonth(cycle) {
  if (!cycle) return "текущий месяц";
  const parts = cycle.split("-");
  if (parts.length < 2) return cycle;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  return `${months[monthIdx] || parts[1]} ${year}`;
}
function SalaryWidget({
  initialSalary,
  onSave
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [val, setVal] = reactExports.useState(initialSalary ? String(initialSalary) : "");
  const [busy, setBusy] = reactExports.useState(false);
  if (!editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(true), className: "inline-flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-rule bg-white px-2.5 text-[12px] font-medium text-ink shadow-xs transition hover:border-sage hover:text-sage active:scale-95 leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initialSalary ? moneyShort(initialSalary) : "+ доход" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: val, onChange: (e) => setVal(e.target.value.replace(/[^\d]/g, "")), placeholder: "доход", inputMode: "numeric", autoFocus: true, className: "h-8 w-24 px-2 text-right text-[12px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "sage", disabled: busy, className: "h-8 px-2.5 text-[12px] leading-none", onClick: async () => {
      setBusy(true);
      await onSave(Math.round(Number(val || 0)));
      setBusy(false);
      setEditing(false);
    }, children: "Ок" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "flex h-8 w-6 items-center justify-center text-[12px] text-muted hover:text-ink leading-none", onClick: () => {
      setVal(initialSalary ? String(initialSalary) : "");
      setEditing(false);
    }, children: "✕" })
  ] });
}
function EditBudgetModal({
  currentBudget,
  onSave,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [val, setVal] = reactExports.useState(currentBudget ? String(currentBudget) : "");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    if (trigger) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: trigger(() => setOpen(true)) });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "paper", onClick: () => setOpen(true), className: "h-8 rounded-[8px] text-[12px]", children: currentBudget > 0 ? "Изменить" : "Задать" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-3 rounded-[12px] border border-rule bg-white p-3 shadow-sm", onSubmit: async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onSave(Math.round(Number(val.replace(/[^\d]/g, "") || 0)));
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-ink", children: "Месячный лимит кассы" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "text-[11px] text-muted hover:text-ink", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: val, onChange: (e) => setVal(e.target.value.replace(/[^\d]/g, "")), placeholder: "Сумма в ₽ (например: 80000)", inputMode: "numeric", autoFocus: true, className: "h-9 text-[13px] mb-2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setOpen(false), className: "flex-1 text-[12px] h-8", children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "sm", disabled: busy, className: "flex-1 text-[12px] h-8", children: busy ? "…" : "Сохранить" })
    ] })
  ] });
}
function DepositModal({
  goalTitle,
  onDeposit
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [amount, setAmount] = reactExports.useState("1000");
  const [note, setNote] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", onClick: () => setOpen(true), className: "h-8 gap-1 rounded-[10px] text-[12px] px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
      " Внести взнос"
    ] });
  }
  const PRESETS = [500, 1e3, 3e3, 5e3];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rounded-[14px] border border-sage/40 bg-white p-3 shadow-md w-full", onSubmit: async (e) => {
    e.preventDefault();
    const amt = Math.round(Number(amount.replace(/[^\d]/g, "") || 0));
    if (!amt) return;
    setBusy(true);
    try {
      await onDeposit(amt, note.trim() || void 0);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] font-semibold text-ink", children: [
        "Взнос в «",
        goalTitle,
        "»"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "text-[11px] text-muted hover:text-ink", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex gap-1", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setAmount(String(p)), className: cn("rounded-[6px] border px-2 py-0.5 text-[11px] font-medium transition", amount === String(p) ? "border-sage bg-sage text-onsage" : "border-rule bg-cream text-muted"), children: [
      "+",
      p
    ] }, p)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "Сумма взноса в ₽", inputMode: "numeric", autoFocus: true, className: "h-9 text-[13px] mb-2", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: note, onChange: (e) => setNote(e.target.value), placeholder: "Заметка (необязательно)", className: "h-9 text-[12.5px] mb-2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setOpen(false), className: "flex-1 text-[12px] h-8", children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "sm", disabled: busy, className: "flex-1 text-[12px] h-8", children: busy ? "…" : "Внести" })
    ] })
  ] });
}
function AttachReceiptModal({
  houseId,
  onAttached
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [myReceipts, setMyReceipts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const openModal = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await listReceipts({
        data: {
          limit: 40
        }
      });
      const filtered = (res?.receipts ?? []).filter((r) => r.house_id !== houseId);
      setMyReceipts(filtered);
    } finally {
      setLoading(false);
    }
  };
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "paper", onClick: openModal, className: "gap-1 rounded-[10px] text-[12px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
      " Прикрепить"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] rounded-[20px] border border-rule bg-paper p-4 shadow-paper-lg max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-rule/60 pb-2.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "t-display text-[16px] font-semibold text-ink", children: "Прикрепить чек к кассе" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted", children: "Выберите чек из своего личного ящика" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "flex h-7 w-7 items-center justify-center rounded-full bg-cream text-muted hover:text-ink", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-2 no-scrollbar py-1", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-[13px] text-muted", children: "Загрузка чеков…" }) : myReceipts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-[13px] text-muted", children: "Нет доступных личных чеков. Отсканируйте новый чек в разделе «Скан»." }) : myReceipts.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-[12px] border border-rule/60 bg-white p-3 shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-semibold text-ink truncate", children: r.store || "Чек" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11.5px] text-muted", children: [
          dateRu(r.purchased_at || r.created_at),
          " · ",
          categoryLabel(r.category)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num font-bold text-ink", children: moneyShort(r.total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "sage", className: "h-7 px-2 text-[11.5px]", onClick: async () => {
          await linkReceiptToHouse({
            data: {
              houseId,
              receiptId: r.id,
              link: true
            }
          });
          setOpen(false);
          await onAttached();
        }, children: "+ В кассу" })
      ] })
    ] }, r.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-rule/60 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "paper", size: "md", className: "w-full", onClick: () => setOpen(false), children: "Закрыть" }) })
  ] }) });
}
function AddBillModal({
  members,
  onAdd,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [day, setDay] = reactExports.useState("10");
  const [split, setSplit] = reactExports.useState("equal");
  const [payer, setPayer] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const PRESETS = ["Аренда", "Интернет", "ЖКУ", "Подписки", "Продукты"];
  if (!open) {
    if (trigger) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: trigger(() => setOpen(true)) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "paper", size: "md", className: "w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
      " Добавить регулярный платёж"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", onSubmit: async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const amt = Math.round(Number(amount.replace(/[^\d]/g, "") || 0));
    if (!amt) return;
    setBusy(true);
    try {
      await onAdd({
        title: title.trim(),
        amount: amt,
        day_of_month: Math.min(31, Math.max(1, parseInt(day, 10) || 1)),
        split,
        payer_id: split === "payer" ? payer || members[0]?.user_id || null : null
      });
      setTitle("");
      setAmount("");
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "t-display text-[15.5px] font-semibold text-ink leading-none", children: "Новый регулярный платёж" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "text-[12px] text-muted hover:text-ink transition leading-none", children: "Отмена" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex flex-wrap gap-1", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTitle(p), className: "rounded-[7px] border border-rule bg-white px-2 py-0.5 text-[11.5px] text-muted transition hover:border-sage hover:text-sage leading-none", children: p }, p)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Название (например: Интернет)", className: "h-10 text-[13.5px]", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "Сумма в ₽", inputMode: "numeric", className: "h-10 text-[13.5px]", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: day, onChange: (e) => setDay(e.target.value.replace(/[^\d]/g, "")), placeholder: "Число месяца (1–31)", inputMode: "numeric", className: "h-10 text-[13.5px]", required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Как делим" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [{
        val: "equal",
        label: "Поровну"
      }, {
        val: "salary",
        label: "По доходу"
      }, {
        val: "payer",
        label: "Один платит"
      }].map(({
        val,
        label
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSplit(val), className: cn("min-h-[36px] rounded-[10px] border text-[12px] font-medium transition leading-none", split === val ? "border-sage bg-sage text-onsage shadow-xs font-semibold" : "border-rule bg-white text-muted hover:border-rule-soft"), children: label }, val)) })
    ] }),
    split === "payer" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Кто оплачивает" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: payer, onChange: (e) => setPayer(e.target.value), className: "field h-10 w-full rounded-[10px] border border-rule bg-white px-3 text-[13px] text-ink outline-none", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.user_id, children: m.name }, m.user_id)) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), className: "flex-1 text-[13px]", children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, className: "flex-1 text-[13px]", children: busy ? "Сохранение…" : "Добавить счёт" })
    ] })
  ] });
}
function AddGoalModal({
  onAdd,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [initialAmount, setInitialAmount] = reactExports.useState("");
  const [targetDate, setTargetDate] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    if (trigger) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: trigger(() => setOpen(true)) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "paper", size: "md", className: "w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
      " Создать новую копилку / цель"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", onSubmit: async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await onAdd({
        title: title.trim(),
        amount: Math.round(Number(amount.replace(/[^\d]/g, "") || 0)),
        initialAmount: Math.round(Number(initialAmount.replace(/[^\d]/g, "") || 0)),
        target_date: targetDate.trim() || null
      });
      setTitle("");
      setAmount("");
      setInitialAmount("");
      setTargetDate("");
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "t-display text-[15px] font-semibold text-ink leading-none", children: "Новая цель или копилка" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "text-[12px] text-muted hover:text-ink transition leading-none", children: "Отмена" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Название цели (отпуск, ремонт, новый диван...)", className: "h-10 text-[13.5px]", autoFocus: true, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "Целевая сумма в ₽", inputMode: "numeric", className: "h-10 text-[13.5px]", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: initialAmount, onChange: (e) => setInitialAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "Уже накоплено в ₽", inputMode: "numeric", className: "h-10 text-[13.5px]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: targetDate, onChange: (e) => setTargetDate(e.target.value), placeholder: "Срок сбора", className: "h-10 text-[13.5px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), className: "flex-1 text-[13px]", children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, className: "flex-1 text-[13px]", children: busy ? "Секунду…" : "Создать цель" })
    ] })
  ] });
}
function ChatInputBar({
  onSend
}) {
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex items-center gap-2 border-t border-rule/60 pt-3", onSubmit: async (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "Написать в кассу или советнику…", className: "h-11 rounded-[12px] bg-white text-[13.5px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy || !text.trim(), className: "h-11 w-11 shrink-0 rounded-[12px]", "aria-label": "Отправить сообщение", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }) })
  ] });
}
export {
  HousePage as component
};
