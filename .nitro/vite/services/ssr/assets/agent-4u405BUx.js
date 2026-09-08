import { b as createSsrRpc, u as useApp, j as jsxDevRuntimeExports, L as Link } from "./router-jILV0Ki5.js";
import { c as createServerFn, r as reactExports } from "../server.js";
import { B as Button } from "./button-DVEG0ewd.js";
import { I as Input } from "./input-DEDqgiJZ.js";
import { C as ChevronLeft } from "./chevron-left-Cwo_Q2Vr.js";
import { S as Send } from "./send-Drk2JPhq.js";
import "./tick-CZ14g1aT.js";
import "./format-I651YhAt.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-[100svh] flex-col", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "safe-top flex items-center gap-2 px-3 pb-2 pt-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/", className: "flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronLeft, { size: 19 }, void 0, false, {
          fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        " Меню"
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[17px] leading-none", children: "Агент" }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 68,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-[64px]" }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 70,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 space-y-3 px-4 pb-3", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "letter px-5 py-7", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display mb-2 text-[17px]", children: "Письмо от финансиста" }, void 0, false, {
          fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[14px] leading-relaxed", children: [
          "За месяц потрачено ",
          boot.month.spent.toLocaleString("ru-RU"),
          " ₽",
          boot.settings.monthly_budget ? ` из ${boot.settings.monthly_budget.toLocaleString("ru-RU")} ₽.` : ".",
          boot.houses.length ? ` В кассе «${boot.houses[0].name}» считаю доли.` : "",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
            lineNumber: 81,
            columnNumber: 15
          }, this),
          "Спросите что угодно по вашим чекам и кассам — отвечу коротко."
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
          lineNumber: 76,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 74,
        columnNumber: 34
      }, this) : messages.map((m) => m.role === "assistant" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "letter px-4 py-3.5", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "whitespace-pre-wrap text-[14px] leading-relaxed", children: m.text }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 85,
        columnNumber: 17
      }, this) }, m.id, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 84,
        columnNumber: 63
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "scribble px-4 py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "whitespace-pre-wrap text-[14px] leading-relaxed", children: m.text }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 87,
        columnNumber: 17
      }, this) }, m.id, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 86,
        columnNumber: 24
      }, this)),
      busy ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "letter px-4 py-3.5", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[13.5px] text-muted", children: "смотрю ваши чеки…" }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 91,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 90,
        columnNumber: 17
      }, this) : null,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref: bottomRef }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 93,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "flex items-center gap-2 border-t border-rule bg-paper/95 px-3 py-2.5 backdrop-blur-sm", style: {
      paddingBottom: "calc(10px + env(safe-area-inset-bottom))"
    }, onSubmit: send, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "спросить про траты" }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy, "aria-label": "отправить", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Send, { size: 17 }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 101,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
      lineNumber: 96,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/agent.tsx?tsr-split=component",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
export {
  Agent as component
};
