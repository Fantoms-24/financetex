import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useApp, L as Link } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { g as getAdminState, s as saveLlm } from "./admin-zgPNyibn.js";
import { C as ChevronLeft } from "./chevron-left-M2JCYZNt.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./tick-Caixl4Sl.js";
import "./format-BOBMj6ZA.js";
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
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
function Admin() {
  const {
    user
  } = useApp();
  const [allowed, setAllowed] = reactExports.useState(false);
  const [baseUrl, setBaseUrl] = reactExports.useState("");
  const [apiKey, setApiKey] = reactExports.useState("");
  const [model, setModel] = reactExports.useState("");
  const [hasKey, setHasKey] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user) return;
    getAdminState().then((r) => {
      setAllowed(!!r?.isAdmin);
      if (r?.isAdmin) {
        setBaseUrl(r.baseUrl || "");
        setModel(r.model || "");
        setHasKey(!!r.hasKey);
      }
    }).catch(() => {
    });
  }, [user]);
  if (!allowed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 19 }),
        " Настроить"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip px-5 py-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px]", children: "Только для админа" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] text-muted", children: "Раздел доступен тому, кто ставил ключ." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 19 }),
      " Настроить"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display mb-4 text-[26px] leading-none", children: "Ключ для сканирования" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "receipt-card rise p-4", onSubmit: async (e) => {
      e.preventDefault();
      setBusy(true);
      setMsg(null);
      const r = await saveLlm({
        data: {
          baseUrl,
          apiKey,
          model
        }
      });
      setHasKey(!!r?.hasKey);
      setMsg(r?.error || "Сохранили");
      setBusy(false);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Адрес" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: baseUrl, onChange: (e) => setBaseUrl(e.target.value), placeholder: "https://api.tabitoken.com/v1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Модель" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: model, onChange: (e) => setModel(e.target.value), placeholder: "gpt-4o-mini" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "API-ключ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: apiKey, onChange: (e) => setApiKey(e.target.value), placeholder: hasKey ? "ключ уже сохранён" : "sk-…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 16 }),
        " ",
        busy ? "Секунду…" : "Сохранить ключ"
      ] }),
      msg ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-center text-[13px] text-sage", children: msg }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[12.5px] leading-snug text-muted", children: "Без ключа скан чеков скажет: «админ ещё не вставил ключ». Всё остальное работает." })
  ] });
}
export {
  Admin as component
};
