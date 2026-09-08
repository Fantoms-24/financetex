import { c as createLucideIcon, R as Route, e as useNavigate, u as useApp, j as jsxDevRuntimeExports, L as Link, d as cn, U as Users, r as Receipt, H as House } from "./router-BzCAX3yA.js";
import { r as reactExports } from "../server.js";
import { B as Button } from "./button-m17wZ5AR.js";
import { I as Input } from "./input-CcWjlsU2.js";
import { p as plural, b as moneyShort, e as billDueLabel, t as timeRu } from "./format-I651YhAt.js";
import { g as getHouse, C as Copy, k as kickMember, d as deleteHouse, a as leaveHouse, s as setSalary, b as addHouseBill, e as deleteHouseBill, p as payHouseBill, f as addWish, t as toggleWish, h as deleteWish, i as sendHouseMessage, m as liveHouse } from "./houses-CVwCK45W.js";
import { L as LogOut } from "./log-out-DwxoWH30.js";
import { P as Plus } from "./plus-DT__xlP8.js";
import { C as Check } from "./check-jnQlsn4g.js";
import { S as Send } from "./send-BfklNrhT.js";
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
const __iconNode$g = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$g);
const __iconNode$f = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$f);
const __iconNode$e = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$e);
const __iconNode$d = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$d);
const __iconNode$c = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$c);
const __iconNode$b = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$b);
const __iconNode$a = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$a);
const __iconNode$9 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$8);
const __iconNode$7 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$7);
const __iconNode$6 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$6);
const __iconNode$5 = [
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
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$3);
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(House, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 80,
      columnNumber: 12
    }, this);
  }
  if (t.includes("интернет") || t.includes("wifi") || t.includes("вайфай") || t.includes("связь")) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Wifi, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 83,
      columnNumber: 12
    }, this);
  }
  if (t.includes("жкх") || t.includes("свет") || t.includes("вод") || t.includes("газ") || t.includes("коммунал")) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 86,
      columnNumber: 12
    }, this);
  }
  if (t.includes("подписк") || t.includes("тв") || t.includes("кино") || t.includes("музык") || t.includes("янд")) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tv, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 89,
      columnNumber: 12
    }, this);
  }
  if (t.includes("продукт") || t.includes("еда") || t.includes("магаз") || t.includes("рынок")) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ShoppingBag, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 92,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Receipt, { size: 16 }, void 0, false, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 94,
    columnNumber: 10
  }, this);
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stamp/10 text-stamp", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleAlert, { size: 24 }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 187,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 186,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "t-display text-[18px] text-ink", children: error }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 189,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[13px] text-muted", children: "Возможно, касса была удалена или вы вышли из неё" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 190,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { className: "mt-4 w-full", variant: "sage", onClick: () => navigate({
        to: "/groups"
      }), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 16 }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        " Вернуться к кассам"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 191,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 185,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 184,
      columnNumber: 12
    }, this);
  }
  if (!snap || !snap.house) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-44 animate-[breathe_1.4s_ease-in-out_infinite] rounded-[18px] border border-rule/60 bg-paper/50" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 201,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 200,
      columnNumber: 12
    }, this);
  }
  const isOwner = snap.house.owner_id === user?.id;
  const totalBillsAmount = snap.bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
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
  const unboughtWishesCount = snap.wishes.filter((w) => !w.bought_at).length;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-28 pt-3 sm:pb-24", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-3 px-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/groups", className: "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 text-[13px] font-medium text-ink shadow-sm transition hover:bg-white active:scale-95", "aria-label": "Назад к кассам", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 15 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 230,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Кассы" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 231,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 229,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => copyCode(snap.house.code), className: "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 font-mono text-[12.5px] font-medium tracking-wide text-sage shadow-sm transition hover:bg-white active:scale-95", title: "Нажмите, чтобы скопировать код", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { size: 13, className: "shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 236,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: copiedCode ? "Скопировано!" : snap.house.code }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 237,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 235,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => shareCode(snap.house.code, snap.house.name), className: "inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule bg-paper text-muted shadow-sm transition hover:bg-white hover:text-ink active:scale-95", "aria-label": "Поделиться кассой", title: "Поделиться", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Share2, { size: 15 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 241,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 240,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setShowSettings(!showSettings), className: cn("inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule shadow-sm transition active:scale-95", showSettings ? "bg-sage text-onsage border-sage" : "bg-paper text-muted hover:bg-white hover:text-ink"), "aria-label": "Настройки кассы", title: "Управление кассой", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings2, { size: 15 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 245,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 244,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 234,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 228,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex items-baseline justify-between gap-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display truncate text-[25px] font-semibold leading-tight text-ink", children: snap.house.name }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 253,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 flex items-center gap-1.5 text-[12.5px] text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 13, className: "shrink-0 text-sage" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 255,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: [
            snap.members.length,
            " ",
            plural(snap.members.length, "участник", "участника", "участников")
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 256,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "·" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 257,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "truncate", children: snap.members.map((m) => m.name).join(", ") }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 258,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 254,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 252,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 251,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 227,
      columnNumber: 7
    }, this),
    showSettings ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings2, { size: 16, className: "text-sage" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 269,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "t-display text-[15px] font-semibold text-ink", children: "Управление кассой" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 270,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 268,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setShowSettings(false), className: "text-[12px] text-muted hover:text-ink", children: "Закрыть" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 272,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 267,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 rounded-[12px] border border-dashed border-sage/40 bg-sage/5 p-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11.5px] font-medium uppercase tracking-wider text-sage", children: "Код для близких" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 281,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-mono text-[16px] font-bold tracking-widest text-ink", children: snap.house.code }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 282,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 280,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "sage", onClick: () => copyCode(snap.house.code), className: "h-8 gap-1 text-[12px]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { size: 13 }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 285,
              columnNumber: 19
            }, this),
            " ",
            copiedCode ? "Скопировано" : "Копировать"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 284,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 279,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[11.5px] text-muted", children: "Отправьте этот код тем, с кем делите бюджет. Они введут его в разделе «Кассы → Войти»." }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 288,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 278,
        columnNumber: 13
      }, this),
      isOwner && snap.members.length > 1 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-2 text-[12px] font-medium uppercase tracking-wider text-muted", children: "Участники" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 295,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: snap.members.filter((m) => m.user_id !== user?.id).map((m) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between rounded-[10px] border border-rule/60 bg-white/70 px-3 py-2 text-[13px]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium text-ink", children: m.name }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 298,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
            if (!confirm(`Исключить участника «${m.name}» из кассы?`)) return;
            await kickMember({
              data: {
                houseId: id,
                userId: m.user_id
              }
            });
            await load();
          }, className: "flex items-center gap-1 text-[12px] text-stamp hover:underline", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 13 }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 309,
              columnNumber: 27
            }, this),
            " Исключить"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 299,
            columnNumber: 25
          }, this)
        ] }, m.user_id, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 297,
          columnNumber: 78
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 296,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 294,
        columnNumber: 51
      }, this) : null,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-rule/60 pt-3", children: isOwner ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[12px] text-muted", children: "Вы создатель этой кассы" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 318,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10", onClick: async () => {
          if (!confirm("Удалить кассу полностью? Все платежи, список желаний и переписка будут стёрты.")) return;
          await deleteHouse({
            data: {
              houseId: id
            }
          });
          navigate({
            to: "/groups"
          });
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 13 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 330,
            columnNumber: 21
          }, this),
          " Удалить кассу"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 319,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 317,
        columnNumber: 26
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[12px] text-muted", children: "Покинуть совместную кассу" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 333,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10", onClick: async () => {
          if (!confirm("Выйти из кассы? Вы перестанете получать уведомления о платежах.")) return;
          await leaveHouse({
            data: {
              houseId: id
            }
          });
          navigate({
            to: "/groups"
          });
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { size: 13 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 345,
            columnNumber: 21
          }, this),
          " Выйти"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 334,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 332,
        columnNumber: 26
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 316,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 266,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 265,
      columnNumber: 23
    }, this) : null,
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative overflow-hidden rounded-[20px] border border-rule bg-gradient-to-b from-[#faf7ef] to-[#f4eee2] p-4 shadow-paper", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between text-[12.5px]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1.5 font-medium text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: "text-sage" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            "Обязательства за ",
            formatCycleMonth(snap.cycle)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 359,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 357,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium", percentPaid === 100 && totalBillsCount > 0 ? "bg-sage/15 text-sage" : "bg-cream text-muted border border-rule/70"), children: totalBillsCount === 0 ? "Нет платежей" : percentPaid === 100 ? "Все оплачены ✓" : `${paidCount} из ${totalBillsCount} оплачено` }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 361,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 356,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[14px] border border-rule/70 bg-white/70 p-3 shadow-xs", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[11.5px] text-muted", children: "Общая сумма" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 369,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-num mt-0.5 text-[20px] font-bold text-ink", children: moneyShort(totalBillsAmount) }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 370,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10.5px] text-muted", children: "в месяц на всех" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 371,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 368,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[14px] border border-sage/30 bg-sage/10 p-3 shadow-xs", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[11.5px] font-medium text-sage", children: "Ваша доля" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 375,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-num mt-0.5 text-[20px] font-bold text-ink", children: moneyShort(myTotalShare) }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 376,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10.5px] text-sage", children: myUnpaidShare === 0 && myTotalShare > 0 ? "оплачено полностью" : `осталось ${moneyShort(myUnpaidShare)}` }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 377,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 374,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 367,
        columnNumber: 11
      }, this),
      totalBillsCount > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between text-[11.5px] text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Прогресс закрытия" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 386,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-ink", children: [
            percentPaid,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 387,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 385,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 h-2 w-full overflow-hidden rounded-full bg-rule-soft", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full rounded-full bg-sage transition-all duration-500", style: {
          width: `${percentPaid}%`
        } }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 390,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 389,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 384,
        columnNumber: 34
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 354,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 353,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setShowMembersDetail(!showMembersDetail), className: "flex w-full items-center justify-between text-left transition hover:opacity-90", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2.5 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex -space-x-1.5 shrink-0 overflow-hidden", children: snap.members.slice(0, 4).map((m, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ring-2 ring-paper", AVATAR_COLORS[idx % AVATAR_COLORS.length]), children: getInitials(m.name) }, m.user_id, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 404,
            columnNumber: 59
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 403,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-display block text-[14.5px] font-semibold text-ink leading-tight", children: "Участники и доходы" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 409,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-[11.5px] text-muted leading-tight", children: "доли при делении «по зарплате»" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 410,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 408,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 402,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 text-[12.5px] text-muted shrink-0 pl-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-normal", children: showMembersDetail ? "Скрыть" : "Подробнее" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 414,
            columnNumber: 15
          }, this),
          showMembersDetail ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { size: 15 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 415,
            columnNumber: 36
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 15 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 415,
            columnNumber: 62
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 413,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 401,
        columnNumber: 11
      }, this),
      showMembersDetail ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 space-y-2 border-t border-rule/60 pt-3", children: [
        snap.members.map((m, idx) => {
          const isMe = m.user_id === user?.id;
          const isCreator = m.user_id === snap.house?.owner_id;
          const proportion = totalSalaries > 0 ? Math.round(m.salary / totalSalaries * 100) : 0;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex items-center justify-between gap-3 rounded-[12px] p-2.5 transition", isMe ? "bg-cream/80 border border-rule/70" : "bg-white/60 border border-rule/40"), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-w-0 items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold", AVATAR_COLORS[idx % AVATAR_COLORS.length]), children: getInitials(m.name) }, void 0, false, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 426,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "truncate text-[13.5px] font-semibold text-ink leading-none", children: m.name }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 431,
                    columnNumber: 27
                  }, this),
                  isCreator ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-0.5 rounded-[4px] px-1 py-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100/90 border border-amber-200/60 leading-none", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { size: 9, className: "shrink-0" }, void 0, false, {
                      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                      lineNumber: 433,
                      columnNumber: 31
                    }, this),
                    " владелец"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 432,
                    columnNumber: 40
                  }, this) : null,
                  isMe ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center text-[11px] font-medium text-sage leading-none", children: "· вы" }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 435,
                    columnNumber: 35
                  }, this) : null
                ] }, void 0, true, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 430,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[11px] text-muted leading-tight", children: totalSalaries > 0 ? `доля в расходах ~${proportion}%` : "доход не указан" }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 437,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 429,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 425,
              columnNumber: 21
            }, this),
            isMe ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SalaryWidget, { initialSalary: m.salary, onSave: async (val) => {
              await setSalary({
                data: {
                  houseId: id,
                  amount: val
                }
              });
              await load();
            } }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 443,
              columnNumber: 29
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num shrink-0 text-[13px] font-semibold text-ink", children: m.salary ? moneyShort(m.salary) : "—" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 451,
              columnNumber: 23
            }, this)
          ] }, m.user_id, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 424,
            columnNumber: 20
          }, this);
        }),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex items-start gap-2 rounded-[10px] bg-cream/70 border border-rule/60 p-2.5 text-[11.5px] leading-relaxed text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "shrink-0 text-[13px] leading-none mt-0.5", children: "💡" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 457,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Укажите доходы участников, чтобы касса автоматически распределяла общие счета пропорционально заработку." }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 458,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 456,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 419,
        columnNumber: 32
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 400,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 399,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex rounded-[14px] border border-rule bg-paper p-1 shadow-paper", children: [{
      id: "bills",
      label: "Платежи",
      count: snap.bills.length,
      icon: Receipt
    }, {
      id: "wishes",
      label: "Желания",
      count: unboughtWishesCount,
      icon: Sparkles
    }, {
      id: "chat",
      label: "Чат",
      count: snap.messages.length,
      icon: MessageSquare
    }].map((item) => {
      const active = tab === item.id;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setTab(item.id), className: cn("relative flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-[11px] px-2 text-[13px] font-medium transition-all duration-200 active:scale-95 whitespace-nowrap leading-none", active ? "bg-sage text-onsage shadow-sm font-semibold" : "text-muted hover:text-ink hover:bg-cream/50"), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 15, className: "shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 486,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.label }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 487,
          columnNumber: 17
        }, this),
        item.count > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn("ml-0.5 inline-flex h-4 min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none", active ? "bg-white/25 text-onsage" : "bg-rule-soft text-muted"), children: item.count }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 488,
          columnNumber: 35
        }, this) : null
      ] }, item.id, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 485,
        columnNumber: 18
      }, this);
    }) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 466,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 465,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4", children: [
      tab === "bills" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: snap.bills.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Receipt, { size: 22 }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 502,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 501,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "t-display text-[16.5px] font-semibold text-ink leading-tight", children: "Регулярных платежей пока нет" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 504,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted", children: "Добавьте аренду, интернет, ЖКУ или другие ежемесячные счета, чтобы не забывать о них" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 505,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AddBillModal, { members: snap.members, onAdd: async (v) => {
          await addHouseBill({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        }, trigger: (open) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "md", className: "gap-1.5 rounded-[12px] px-4 text-[13.5px]", onClick: open, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 518,
            columnNumber: 25
          }, this),
          " Добавить первый платёж"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 517,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 509,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 508,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 500,
        columnNumber: 40
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        snap.bills.map((b) => {
          const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle);
          const due = billDueLabel(b.day_of_month);
          const share = snap.shares?.[b.id]?.[myUserId] ?? 0;
          const payerMember = snap.members.find((m) => m.user_id === b.payer_id);
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("rounded-[16px] border p-3.5 transition-all shadow-paper", paid ? "border-sage/30 bg-[#fafcf9]" : "border-rule bg-paper"), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-2.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border", paid ? "border-sage/40 bg-sage/10 text-sage" : "border-rule bg-cream text-muted"), children: getBillIcon(b.title) }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 530,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "t-display truncate text-[16px] font-semibold text-ink leading-snug", children: b.title }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 534,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 flex flex-wrap items-center gap-1.5 text-[11px] leading-none", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center rounded-[5px] bg-cream px-1.5 py-0.5 font-medium text-muted leading-none", children: [
                      b.day_of_month,
                      " числа"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                      lineNumber: 537,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn("inline-flex items-center rounded-[5px] px-1.5 py-0.5 font-medium leading-none", due.key === "today" || due.key === "overdue" ? "bg-stamp/10 text-stamp" : "bg-rule-soft text-muted"), children: due.label }, void 0, false, {
                      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                      lineNumber: 542,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center rounded-[5px] bg-cream px-1.5 py-0.5 text-muted leading-none", children: b.split === "payer" && payerMember ? `Платит ${payerMember.name}` : SPLIT_LABEL[b.split] || b.split }, void 0, false, {
                      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                      lineNumber: 547,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 535,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 533,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 529,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num block text-[17px] font-bold text-ink leading-none", children: moneyShort(b.amount) }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 555,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-[10.5px] text-muted leading-tight", children: "общий счёт" }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 556,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 554,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 528,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex items-center justify-between border-t border-rule/60 pt-2.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-1 text-[12.5px] leading-none", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted", children: "Ваша часть:" }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 563,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num font-bold text-ink text-[13.5px]", children: moneyShort(share) }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 564,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 562,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
                  if (!confirm(`Удалить платёж «${b.title}»?`)) return;
                  await deleteHouseBill({
                    data: {
                      houseId: id,
                      billId: b.id
                    }
                  });
                  await load();
                }, className: "flex h-8 w-8 items-center justify-center rounded-[8px] text-muted/60 hover:text-stamp hover:bg-stamp/10 transition", title: "Удалить платёж", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 14 }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 579,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 569,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
                  await payHouseBill({
                    data: {
                      houseId: id,
                      billId: b.id,
                      paid: !paid
                    }
                  });
                  await load();
                }, className: cn("inline-flex min-h-[34px] items-center gap-1.5 rounded-[9px] px-3 text-[12.5px] font-medium transition active:scale-95 leading-none", paid ? "border border-sage/40 bg-sage/10 text-sage hover:bg-sage/15" : "border border-rule bg-white text-ink hover:border-sage shadow-xs"), children: [
                  paid ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { size: 15 }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 592,
                    columnNumber: 37
                  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Circle, { size: 15 }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 592,
                    columnNumber: 66
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: paid ? "Оплачено" : "Я оплатил" }, void 0, false, {
                    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                    lineNumber: 593,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                  lineNumber: 582,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 567,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 561,
              columnNumber: 23
            }, this)
          ] }, b.id, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 527,
            columnNumber: 20
          }, this);
        }),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AddBillModal, { members: snap.members, onAdd: async (v) => {
          await addHouseBill({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        } }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 601,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 521,
        columnNumber: 24
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 499,
        columnNumber: 28
      }, this) : null,
      tab === "wishes" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: snap.wishes.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { size: 22 }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 617,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 616,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "t-display text-[16.5px] font-semibold text-ink leading-tight", children: "Список желаний пуст" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 619,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted", children: "Записывайте совместные покупки: от кофемашины до нового дивана" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 620,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AddWishModal, { onAdd: async (v) => {
          await addWish({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        }, trigger: (open) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "md", className: "gap-1.5 rounded-[12px] px-4 text-[13.5px]", onClick: open, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 633,
            columnNumber: 25
          }, this),
          " Добавить желание"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 632,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 624,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 623,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 615,
        columnNumber: 41
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: snap.wishes.map((w) => {
          const isBought = !!w.bought_at;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex items-center gap-3 rounded-[14px] border p-3 transition shadow-sm", isBought ? "border-rule/50 bg-cream/40 opacity-70" : "border-rule bg-paper hover:border-sage/40"), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
              await toggleWish({
                data: {
                  houseId: id,
                  wishId: w.id
                }
              });
              await load();
            }, className: cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] border transition active:scale-90", isBought ? "border-sage bg-sage text-onsage" : "border-rule bg-white hover:border-sage text-transparent"), "aria-label": isBought ? "Отметить не купленным" : "Отметить купленным", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { size: 14, className: isBought ? "opacity-100" : "opacity-0" }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 650,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 641,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: cn("t-display truncate text-[14.5px] font-medium leading-snug", isBought ? "text-muted line-through" : "text-ink"), children: w.title }, void 0, false, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 654,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-[11px] text-muted leading-tight", children: [
                w.by_name ? `добавил(а) ${w.by_name}` : "общая идея",
                isBought ? " · куплено" : ""
              ] }, void 0, true, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 657,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 653,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 shrink-0", children: [
              w.amount > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn("t-num rounded-[6px] px-2 py-0.5 text-[13px] font-semibold leading-none", isBought ? "bg-cream text-muted line-through" : "bg-cream text-ink"), children: moneyShort(w.amount) }, void 0, false, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 664,
                columnNumber: 43
              }, this) : null,
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
                if (!confirm(`Удалить «${w.title}» из списка?`)) return;
                await deleteWish({
                  data: {
                    houseId: id,
                    wishId: w.id
                  }
                });
                await load();
              }, className: "flex h-7 w-7 items-center justify-center text-muted/50 hover:text-stamp transition", title: "Удалить желание", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 14 }, void 0, false, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 678,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
                lineNumber: 668,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 663,
              columnNumber: 25
            }, this)
          ] }, w.id, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 640,
            columnNumber: 22
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 637,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AddWishModal, { onAdd: async (v) => {
          await addWish({
            data: {
              houseId: id,
              ...v
            }
          });
          await load();
        } }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 686,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 636,
        columnNumber: 24
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 614,
        columnNumber: 29
      }, this) : null,
      tab === "chat" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2 flex items-center justify-between border-b border-rule/60 pb-2 text-[12px] text-muted", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Сообщения и уведомления" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 701,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[11px]", children: "приходят пушем" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 702,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 700,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto px-1 py-1 no-scrollbar", children: snap.messages.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "py-8 text-center text-[13px] text-muted", children: "Пока сообщений нет. Напишите что-нибудь в общую кассу!" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 706,
          columnNumber: 45
        }, this) : snap.messages.map((m) => {
          const isMe = m.user_id === user?.id;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex flex-col", isMe ? "items-end" : "items-start"), children: [
            !isMe ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mb-0.5 ml-1 text-[11px] font-semibold text-sage", children: m.name }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 711,
              columnNumber: 32
            }, this) : null,
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("max-w-[82%] rounded-[14px] px-3.5 py-2 text-[14px] leading-snug shadow-xs break-words", isMe ? "bg-sage text-onsage rounded-tr-xs" : "bg-white border border-rule text-ink rounded-tl-xs"), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: m.text }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 715,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 714,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mt-0.5 px-1 text-[10px] text-muted/70", children: timeRu(m.created_at) }, void 0, false, {
              fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
              lineNumber: 717,
              columnNumber: 23
            }, this)
          ] }, m.id, true, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 710,
            columnNumber: 20
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 705,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChatInputBar, { onSend: async (text) => {
          await sendHouseMessage({
            data: {
              houseId: id,
              text
            }
          });
          await load();
        } }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 724,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 699,
        columnNumber: 27
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 497,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 225,
    columnNumber: 10
  }, this);
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setEditing(true), className: "inline-flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-rule bg-white px-2.5 text-[12px] font-medium text-ink shadow-xs transition hover:border-sage hover:text-sage active:scale-95 leading-none", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: initialSalary ? moneyShort(initialSalary) : "+ доход" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 758,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 757,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex shrink-0 items-center gap-1", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: val, onChange: (e) => setVal(e.target.value.replace(/[^\d]/g, "")), placeholder: "доход", inputMode: "numeric", autoFocus: true, className: "h-8 w-24 px-2 text-right text-[12px]" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 762,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "sage", disabled: busy, className: "h-8 px-2.5 text-[12px] leading-none", onClick: async () => {
      setBusy(true);
      await onSave(Math.round(Number(val || 0)));
      setBusy(false);
      setEditing(false);
    }, children: "Ок" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 763,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", className: "flex h-8 w-6 items-center justify-center text-[12px] text-muted hover:text-ink leading-none", onClick: () => {
      setVal(initialSalary ? String(initialSalary) : "");
      setEditing(false);
    }, children: "✕" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 771,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 761,
    columnNumber: 10
  }, this);
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
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: trigger(() => setOpen(true)) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 804,
        columnNumber: 14
      }, this);
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", className: "w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 807,
        columnNumber: 9
      }, this),
      " Добавить регулярный платёж"
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 806,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", onSubmit: async (e) => {
    e.preventDefault();
    const amt = Math.round(Number(amount.replace(/[^\d]/g, "") || 0));
    if (!title.trim() || !amt) return;
    setBusy(true);
    try {
      await onAdd({
        title: title.trim(),
        amount: amt,
        day_of_month: Math.min(31, Math.max(1, Number(day || 1))),
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
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "t-display text-[15px] font-semibold text-ink leading-none", children: "Новый регулярный счёт" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 831,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setOpen(false), className: "text-[12px] text-muted hover:text-ink transition leading-none", children: "Отмена" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 832,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 830,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex flex-wrap gap-1.5", children: PRESETS.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setTitle(p), className: "rounded-[8px] border border-rule/70 bg-white px-2.5 py-1 text-[11.5px] font-medium text-muted hover:border-sage hover:text-sage transition leading-none", children: p }, p, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 839,
      columnNumber: 27
    }, this)) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 838,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5 mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Название счёта" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 846,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Например, Интернет в квартире", className: "h-10 text-[13.5px]", required: true }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 847,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 845,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-2.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Сумма (₽)" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 852,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "3 500", inputMode: "numeric", className: "h-10 text-[13.5px]", required: true }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 853,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 851,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Число месяца" }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 856,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: day, onChange: (e) => setDay(e.target.value.replace(/[^\d]/g, "").slice(0, 2)), placeholder: "10", inputMode: "numeric", className: "h-10 text-[13.5px]", required: true }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
            lineNumber: 857,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
          lineNumber: 855,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 850,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 844,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[11.5px] font-medium text-muted leading-tight", children: "Как делим этот счёт" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 864,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-3 gap-1.5", children: [["equal", "Поровну"], ["salary", "По доходу"], ["payer", "Платит 1"]].map(([val, label]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setSplit(val), className: cn("min-h-[36px] rounded-[10px] border text-[12px] font-medium transition leading-none", split === val ? "border-sage bg-sage text-onsage shadow-xs font-semibold" : "border-rule bg-white text-muted hover:border-rule-soft"), children: label }, val, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 866,
        columnNumber: 116
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 865,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 863,
      columnNumber: 7
    }, this),
    split === "payer" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1 block text-[11.5px] font-medium text-muted leading-tight", children: "Кто оплачивает" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 873,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { value: payer, onChange: (e) => setPayer(e.target.value), className: "field h-10 w-full rounded-[10px] border border-rule bg-white px-3 text-[13px] text-ink outline-none", children: members.map((m) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: m.user_id, children: m.name }, m.user_id, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 875,
        columnNumber: 31
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 874,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 872,
      columnNumber: 28
    }, this) : null,
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), className: "flex-1 text-[13px]", children: "Отмена" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 882,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", disabled: busy, className: "flex-1 text-[13px]", children: busy ? "Сохранение…" : "Добавить счёт" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 885,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 881,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 810,
    columnNumber: 10
  }, this);
}
function AddWishModal({
  onAdd,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    if (trigger) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: trigger(() => setOpen(true)) }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 907,
        columnNumber: 14
      }, this);
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", className: "w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 910,
        columnNumber: 9
      }, this),
      " Добавить совместное желание"
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 909,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "rounded-[16px] border border-rule bg-paper p-4 shadow-paper", onSubmit: async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await onAdd({
        title: title.trim(),
        amount: Math.round(Number(amount.replace(/[^\d]/g, "") || 0))
      });
      setTitle("");
      setAmount("");
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "t-display text-[15px] font-semibold text-ink leading-none", children: "Новое совместное желание" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 930,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setOpen(false), className: "text-[12px] text-muted hover:text-ink transition leading-none", children: "Отмена" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 931,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 929,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5 mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Что хотим купить? (робот-пылесос, билеты...)", className: "h-10 text-[13.5px]", autoFocus: true, required: true }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 937,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "Примерная стоимость в ₽ (необязательно)", inputMode: "numeric", className: "h-10 text-[13.5px]" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 938,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 936,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), className: "flex-1 text-[13px]", children: "Отмена" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 942,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", disabled: busy, className: "flex-1 text-[13px]", children: busy ? "Секунду…" : "В список" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
        lineNumber: 945,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 941,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 913,
    columnNumber: 10
  }, this);
}
function ChatInputBar({
  onSend
}) {
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "flex items-center gap-2 border-t border-rule/60 pt-3", onSubmit: async (e) => {
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
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "Написать в кассу…", className: "h-11 rounded-[12px] bg-white text-[13.5px]" }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 969,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy || !text.trim(), className: "h-11 w-11 shrink-0 rounded-[12px]", "aria-label": "Отправить сообщение", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Send, { size: 16 }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 971,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
      lineNumber: 970,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.$id.tsx?tsr-split=component",
    lineNumber: 958,
    columnNumber: 10
  }, this);
}
export {
  HousePage as component
};
