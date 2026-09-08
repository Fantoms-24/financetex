import { c as createLucideIcon, u as useApp, j as jsxDevRuntimeExports, L as Link } from "./router-BzCAX3yA.js";
import { r as reactExports } from "../server.js";
import { B as Button } from "./button-m17wZ5AR.js";
import { I as Input } from "./input-CcWjlsU2.js";
import { g as getAdminState, s as saveLlm } from "./admin-B1rHx3T1.js";
import { C as ChevronLeft } from "./chevron-left-DgU8mge0.js";
import "./tick-DtarbO-h.js";
import "./format-I651YhAt.js";
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/settings", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronLeft, { size: 19 }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 34,
          columnNumber: 13
        }, this),
        " Настроить"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 33,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip px-5 py-10 text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[17px]", children: "Только для админа" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: "Раздел доступен тому, кто ставил ключ." }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 39,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 31,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/settings", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronLeft, { size: 19 }, void 0, false, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      " Настроить"
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 45,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display mb-4 text-[26px] leading-none", children: "Ключ для сканирования" }, void 0, false, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "receipt-card rise p-4", onSubmit: async (e) => {
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
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Адрес" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: baseUrl, onChange: (e) => setBaseUrl(e.target.value), placeholder: "https://api.tabitoken.com/v1" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Модель" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: model, onChange: (e) => setModel(e.target.value), placeholder: "gpt-4o-mini" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 73,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "API-ключ" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { type: "password", value: apiKey, onChange: (e) => setApiKey(e.target.value), placeholder: hasKey ? "ключ уже сохранён" : "sk-…" }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 77,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(KeyRound, { size: 16 }, void 0, false, {
          fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        " ",
        busy ? "Секунду…" : "Сохранить ключ"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      msg ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2.5 text-center text-[13px] text-sage", children: msg }, void 0, false, {
        fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
        lineNumber: 82,
        columnNumber: 16
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-4 text-[12.5px] leading-snug text-muted", children: "Без ключа скан чеков скажет: «админ ещё не вставил ключ». Всё остальное работает." }, void 0, false, {
      fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
      lineNumber: 85,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/admin.tsx?tsr-split=component",
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
export {
  Admin as component
};
