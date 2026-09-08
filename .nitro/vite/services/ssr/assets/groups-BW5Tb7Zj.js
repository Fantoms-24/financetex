import { r as reactExports, j as jsxRuntimeExports, O as Outlet } from "../server.js";
import { c as createLucideIcon, u as useApp, l as useRouterState, U as Users, H as House, b as cn, L as Link } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { p as plural } from "./format-bLET-Iix.js";
import { l as listHouses, C as Crown, a as Copy, c as createHouse, j as joinHouse } from "./houses-BrFqli6c.js";
import { P as Plus } from "./plus-DHqwpiIx.js";
import { K as KeyRound } from "./key-round-BeSdF5_8.js";
import { X } from "./x-DF3G7ELa.js";
import { A as ArrowRight } from "./arrow-right-DQGtIdBA.js";
import { C as Check } from "./check-BtKpq9pj.js";
import { S as ShieldCheck } from "./shield-check-B1RRRVs6.js";
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
const __iconNode$1 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$1);
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
const PRESET_NAMES = ["Семья", "Квартира", "Отпуск", "Дача", "Ремонт", "Соседи"];
function Groups() {
  const {
    user,
    boot,
    refresh
  } = useApp();
  const [houses, setHouses] = reactExports.useState(boot.houses);
  const [mode, setMode] = reactExports.useState("none");
  const [name, setName] = reactExports.useState("Семья");
  const [code, setCode] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(null);
  const reload = reactExports.useCallback(async () => {
    const r = await listHouses().catch(() => null);
    setHouses(r?.houses ?? []);
  }, []);
  reactExports.useEffect(() => {
    if (user) reload();
  }, [user, reload]);
  const childActive = useRouterState({
    select: (s) => s.matches.some((m) => m.routeId !== "/groups" && (m.routeId || "").startsWith("/groups"))
  });
  if (childActive) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  async function create(e) {
    e.preventDefault();
    if (busy || !name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const r = await createHouse({
        data: {
          name: name.trim()
        }
      });
      if (r?.error) return setError(r.error);
      setMode("none");
      await reload();
      await refresh();
    } finally {
      setBusy(false);
    }
  }
  async function join(e) {
    e.preventDefault();
    if (busy || !code.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const r = await joinHouse({
        data: {
          code: code.trim()
        }
      });
      if (r?.error) return setError(r.error);
      setCode("");
      setMode("none");
      await reload();
      await refresh();
    } finally {
      setBusy(false);
    }
  }
  async function copyCode(c, id) {
    try {
      await navigator.clipboard.writeText(c);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pb-12 pt-4 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[12px] font-medium text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Совместный бюджет" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink", children: "Кассы и семья" })
      ] }),
      mode === "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", onClick: () => setMode("create"), className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Касса" })
      ] })
    ] }),
    mode === "none" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMode("create"), className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20, strokeWidth: 2.2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14.5px] font-semibold text-ink", children: "Создать кассу" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11.5px] text-muted", children: "Семья, квартира или отпуск" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMode("join"), className: "group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-amber-700/10 text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 20, strokeWidth: 2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14.5px] font-semibold text-ink", children: "Войти по коду" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11.5px] text-muted", children: "По коду от близкого" })
        ] })
      ] })
    ] }) : null,
    mode === "create" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: create, className: "relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 17, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[16px] font-medium text-ink", children: "Новая касса" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("none"), className: "rounded-lg p-1 text-muted hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Название кассы" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Семья, Дом, Поездка…", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 17 }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: PRESET_NAMES.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setName(preset), className: cn("rounded-full border px-2.5 py-0.5 text-[11px] transition-colors", name === preset ? "border-sage bg-sage text-onsage" : "border-rule/80 bg-black/[0.02] text-muted hover:bg-black/[0.05]"), children: preset }, preset)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", className: "flex-1", onClick: () => setMode("none"), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", className: "flex-1", disabled: busy || !name.trim(), children: busy ? "Создание…" : "Создать кассу" })
        ] })
      ] })
    ] }) : null,
    mode === "join" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: join, className: "relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 17, className: "text-amber-800" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[16px] font-medium text-ink", children: "Присоединиться к кассе" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("none"), className: "rounded-lg p-1 text-muted hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Код приглашения" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted", children: "7 символов" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: code, onChange: (e) => setCode(e.target.value.toUpperCase()), placeholder: "A2B3C4D", autoCapitalize: "characters", autoComplete: "off", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 17 }), className: "font-mono tracking-[0.2em]", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11.5px] text-muted", children: "Введите код, которым с вами поделился создатель кассы." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", className: "flex-1", onClick: () => setMode("none"), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", className: "flex-1", disabled: busy || !code.trim(), children: busy ? "Проверка…" : "Войти в кассу" })
        ] })
      ] })
    ] }) : null,
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[14px] border border-stamp/30 bg-stamp/10 px-3.5 py-2.5 text-[13px] text-stamp", children: error }) : null,
    houses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[20px] border border-rule/80 bg-paper p-8 text-center shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mt-3 text-[17px] font-medium text-ink", children: "У вас пока нет активных касс" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1.5 max-w-[290px] text-[13px] leading-snug text-muted", children: "Создайте кассу «Семья» или «Квартира», чтобы вместе вести учёт общих расходов, чеков и счетов ЖКХ." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", onClick: () => setMode("create"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " Создать первую кассу"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "paper", onClick: () => setMode("join"), children: "Войти по коду" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1 text-[12px] font-semibold uppercase tracking-wider text-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Ваши группы (",
          houses.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Код для друзей" })
      ] }),
      houses.map((h) => {
        const isOwner = h.owner_id === user?.id;
        const isCopied = copied === h.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[20px] border border-rule/80 bg-paper shadow-paper transition-all hover:border-sage/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/groups/$id", params: {
            id: h.id
          }, className: "group block p-4 transition-colors hover:bg-black/[0.015]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 20 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "t-display text-[18px] font-semibold leading-tight text-ink", children: h.name }),
                  isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-medium text-amber-800", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 11 }),
                    " Создатель"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-sage/10 px-2 py-0.5 text-[10.5px] font-medium text-sage", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 11 }),
                    " Участник"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
                    h.members,
                    " ",
                    plural(h.members, "участник", "участника", "участников")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sage transition-colors group-hover:underline", children: "Открыть дашборд →" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.03] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-rule/60 bg-black/[0.015] px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Код:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13.5px] font-semibold tracking-widest text-ink", children: h.code })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => copyCode(h.code, h.id), className: cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium transition-all active:scale-95", isCopied ? "bg-sage text-onsage shadow-sm" : "bg-paper text-sage border border-rule/80 hover:bg-sage/10"), children: [
              isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isCopied ? "Скопировано" : "Скопировать код" })
            ] })
          ] })
        ] }, h.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-[18px] border border-rule/60 bg-paper/60 p-4 text-[12.5px] leading-relaxed text-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, className: "mt-0.5 shrink-0 text-sage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: "Как устроена касса?" }),
        " Все участники могут сканировать чеки в общий котёл, видеть актуальный баланс расходов и рассчитывать, кто сколько внёс, без споров и путаницы."
      ] })
    ] })
  ] });
}
export {
  Groups as component
};
