import { r as reactExports, j as jsxRuntimeExports, O as Outlet } from "../server.js";
import { u as useApp, a as useRouterState, U as Users, L as Link } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { p as plural } from "./format-BOBMj6ZA.js";
import { l as listHouses, C as Copy, c as createHouse, j as joinHouse } from "./houses-AH9K5ZiI.js";
import { P as Plus } from "./plus-DuXTGlhn.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display text-[26px] leading-none", children: "Кассы" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] text-muted", children: houses.length > 0 ? "общие деньги, платежи и покупки" : "семья и квартира" })
    ] }),
    mode === "none" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "sage", size: "md", onClick: () => setMode("create"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 17 }),
        " Создать"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "paper", size: "md", onClick: () => setMode("join"), children: "Войти по коду" })
    ] }) : null,
    mode === "create" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: create, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mb-3 text-[15px]", children: "Новая касса" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Семья", className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setMode("none"), children: "Отмена" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "Создать" })
      ] })
    ] }) : null,
    mode === "join" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: join, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mb-3 text-[15px]", children: "Код кассы" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: code, onChange: (e) => setCode(e.target.value.toUpperCase()), placeholder: "A2B3C4D", autoCapitalize: "characters", autoComplete: "off", className: "mb-4 font-mono tracking-[0.25em]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setMode("none"), children: "Отмена" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "Войти" })
      ] })
    ] }) : null,
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp", children: error }) : null,
    houses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip rise px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22, strokeWidth: 1.6, className: "mx-auto mb-3 text-sage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px]", children: "Пока пусто" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-[13px] leading-snug text-muted", children: [
        "Создайте кассу «Семья» и дайте код жене или родственнику.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Платежи, зарплаты и список покупок будут видны обоим."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: houses.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "envelope rise", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/groups/$id", params: {
        id: h.id
      }, className: "block px-4 pb-4 pt-[52px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display text-[19px]", children: h.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12.5px] text-muted", children: [
            h.members,
            " ",
            plural(h.members, "человек", "человека", "человек")
          ] })
        ] }),
        h.owner_id === user?.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12.5px] text-muted", children: "ваша касса" }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule flex items-center justify-between px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13px] tracking-[0.22em] text-muted", children: h.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => copyCode(h.code, h.id), className: "flex min-h-[36px] items-center gap-1.5 rounded-[8px] px-2 text-[13px] text-sage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 }),
          copied === h.id ? "скопировали" : "код"
        ] })
      ] })
    ] }, h.id)) })
  ] });
}
export {
  Groups as component
};
