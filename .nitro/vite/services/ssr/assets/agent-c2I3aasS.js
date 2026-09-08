import { c as createServerFn, r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { u as useApp, L as Link } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { c as createSsrRpc } from "./tick-Caixl4Sl.js";
import { C as ChevronLeft } from "./chevron-left-M2JCYZNt.js";
import { S as Send } from "./send-CL9hgYNy.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./store-BVRg5jbE.js";
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
const agentHistory = createServerFn({
  method: "GET"
}).handler(createSsrRpc("33c215974f917d4915c446c514b3028e148aeafd36e6d8d131932865a5e5df24"));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("c54d4fd82ad0b0a641aa49fcba30cfdf9e310885efd64ea56402ce5bda8a305f"));
const agentSend = createServerFn({
  method: "POST"
}).validator((d) => ({
  text: String(d.text || "").trim()
})).handler(createSsrRpc("a0e22974c810e11c83cef592f7ac16efeac83723a1fdc00420c19d827d555f0e"));
function Agent() {
  const {
    user,
    boot
  } = useApp();
  const [messages, setMessages] = reactExports.useState([]);
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!user) return;
    agentHistory().then((r) => setMessages(r?.messages ?? [])).catch(() => {
    });
  }, [user]);
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [messages.length, busy]);
  async function send(e) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    const mine = text.trim();
    setText("");
    setBusy(true);
    setMessages((m) => [...m, {
      id: `t-${Date.now()}`,
      role: "user",
      text: mine,
      created_at: ""
    }]);
    try {
      const r = await agentSend({
        data: {
          text: mine
        }
      });
      const reply = r?.reply || "Не получилось ответить";
      setMessages((m) => [...m, {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: reply,
        created_at: ""
      }]);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[100svh] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "safe-top flex items-center gap-2 px-3 pb-2 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 19 }),
        " Меню"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px] leading-none", children: "Агент" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-[64px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 px-4 pb-3", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "letter px-5 py-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mb-2 text-[17px]", children: "Письмо от финансиста" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] leading-relaxed", children: [
          "За месяц потрачено ",
          boot.month.spent.toLocaleString("ru-RU"),
          " ₽",
          boot.settings.monthly_budget ? ` из ${boot.settings.monthly_budget.toLocaleString("ru-RU")} ₽.` : ".",
          boot.houses.length ? ` В кассе «${boot.houses[0].name}» считаю доли.` : "",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Спросите что угодно по вашим чекам и кассам — отвечу коротко."
        ] })
      ] }) : messages.map((m) => m.role === "assistant" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "letter px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-[14px] leading-relaxed", children: m.text }) }, m.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scribble px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-[14px] leading-relaxed", children: m.text }) }, m.id)),
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "letter px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13.5px] text-muted", children: "смотрю ваши чеки…" }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex items-center gap-2 border-t border-rule bg-paper/95 px-3 py-2.5 backdrop-blur-sm", style: {
      paddingBottom: "calc(10px + env(safe-area-inset-bottom))"
    }, onSubmit: send, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "спросить про траты" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy, "aria-label": "отправить", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 17 }) })
    ] })
  ] });
}
export {
  Agent as component
};
