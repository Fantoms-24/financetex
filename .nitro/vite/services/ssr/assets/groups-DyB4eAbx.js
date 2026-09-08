import { u as useApp, a as useRouterState, j as jsxDevRuntimeExports, U as Users, L as Link } from "./router-BzCAX3yA.js";
import { r as reactExports, O as Outlet } from "../server.js";
import { B as Button } from "./button-m17wZ5AR.js";
import { I as Input } from "./input-CcWjlsU2.js";
import { p as plural } from "./format-I651YhAt.js";
import { l as listHouses, C as Copy, c as createHouse, j as joinHouse } from "./houses-CVwCK45W.js";
import { P as Plus } from "./plus-DT__xlP8.js";
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
  if (childActive) return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Outlet, {}, void 0, false, {
    fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
    lineNumber: 44,
    columnNumber: 27
  }, this);
  async function create(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await createHouse({
        data: {
          name
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
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await joinHouse({
        data: {
          code
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
      setTimeout(() => setCopied(null), 1600);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display text-[26px] leading-none", children: "Кассы" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: houses.length > 0 ? "общие деньги, платежи и покупки" : "семья и квартира" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 96,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    mode === "none" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "md", onClick: () => setMode("create"), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 17 }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 103,
          columnNumber: 13
        }, this),
        " Создать"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", onClick: () => setMode("join"), children: "Войти по коду" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 101,
      columnNumber: 26
    }, this) : null,
    mode === "create" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: create, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mb-3 text-[15px]", children: "Новая касса" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Семья", className: "mb-4" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 112,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "ghost", onClick: () => setMode("none"), children: "Отмена" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "Создать" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 117,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 113,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 110,
      columnNumber: 28
    }, this) : null,
    mode === "join" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: join, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mb-3 text-[15px]", children: "Код кассы" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 124,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: code, onChange: (e) => setCode(e.target.value.toUpperCase()), placeholder: "A2B3C4D", autoCapitalize: "characters", autoComplete: "off", className: "mb-4 font-mono tracking-[0.25em]" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "ghost", onClick: () => setMode("none"), children: "Отмена" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 127,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "Войти" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 126,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 123,
      columnNumber: 26
    }, this) : null,
    error ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp", children: error }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 136,
      columnNumber: 16
    }, this) : null,
    houses.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 22, strokeWidth: 1.6, className: "mx-auto mb-3 text-sage" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 139,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[17px]", children: "Пока пусто" }, void 0, false, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 140,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: [
        "Создайте кассу «Семья» и дайте код жене или родственнику.",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 143,
          columnNumber: 13
        }, this),
        "Платежи, зарплаты и список покупок будут видны обоим."
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 138,
      columnNumber: 30
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: houses.map((h) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "envelope rise", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/groups/$id", params: {
        id: h.id
      }, className: "block px-4 pb-4 pt-[52px]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-display text-[19px]", children: h.name }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
            lineNumber: 152,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[12.5px] text-muted", children: [
            h.members,
            " ",
            plural(h.members, "человек", "человека", "человек")
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
            lineNumber: 153,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 151,
          columnNumber: 17
        }, this),
        h.owner_id === user?.id ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[12.5px] text-muted", children: "ваша касса" }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 157,
          columnNumber: 44
        }, this) : null
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 148,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rule flex items-center justify-between px-4 py-2.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-[13px] tracking-[0.22em] text-muted", children: h.code }, void 0, false, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 160,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => copyCode(h.code, h.id), className: "flex min-h-[36px] items-center gap-1.5 rounded-[8px] px-2 text-[13px] text-sage", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { size: 14 }, void 0, false, {
            fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
            lineNumber: 162,
            columnNumber: 19
          }, this),
          copied === h.id ? "скопировали" : "код"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
          lineNumber: 161,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
        lineNumber: 159,
        columnNumber: 15
      }, this)
    ] }, h.id, true, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 147,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
      lineNumber: 146,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/groups.tsx?tsr-split=component",
    lineNumber: 93,
    columnNumber: 10
  }, this);
}
export {
  Groups as component
};
