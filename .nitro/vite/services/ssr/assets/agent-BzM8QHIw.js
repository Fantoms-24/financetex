import { c as createServerFn, r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, a as createSsrRpc, u as useApp, L as Link } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { a as money } from "./format-bLET-Iix.js";
import { C as ChevronLeft } from "./chevron-left-B-5dlWQN.js";
import { S as Sparkles } from "./sparkles-DmcIehh6.js";
import { M as MessageSquare, S as Send } from "./send-Ca7a9xzc.js";
import { A as ArrowUpRight } from "./arrow-up-right-DmHj3eaG.js";
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
const __iconNode = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode);
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
const QUICK_PROMPTS = ["Сколько потрачено в этом месяце?", "На какую категорию больше всего трат?", "Какой комфортный бюджет на день?", "Какие были самые крупные покупки?"];
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
  async function executeSend(queryText) {
    if (!queryText.trim() || busy) return;
    const mine = queryText.trim();
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
      const reply = r?.reply || "Не получилось ответить. Попробуйте сформулировать вопрос иначе.";
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
  function handleSubmit(e) {
    e.preventDefault();
    executeSend(text);
  }
  const monthlyBudget = boot.settings?.monthly_budget || 0;
  const spent = boot.month.spent;
  const remaining = monthlyBudget > 0 ? monthlyBudget - spent : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100svh-env(safe-area-inset-top)-84px-env(safe-area-inset-bottom))] flex-col px-4 pt-3 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-20 -mx-4 mb-3 border-b border-rule/60 bg-paper/95 px-4 pb-3 pt-1 backdrop-blur-md sm:-mx-5 sm:px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-1 rounded-lg py-1 pr-2 text-[14px] font-medium text-sage hover:text-ink", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Главная" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-8 w-8 items-center justify-center rounded-xl bg-sage/10 text-sage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-semibold leading-none text-ink", children: "Финансовый советник" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-muted", children: "Анализирует чеки и бюджет" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-sage/10 px-2 py-0.5 text-[11px] font-medium text-sage", children: "AI" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 pb-4", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-5 shadow-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sage", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 22 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display text-[17px] font-medium text-ink", children: "Рад помочь с вашим бюджетом!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[13.5px] leading-relaxed text-ink/80", children: [
            "Я изучил ваши чеки и кассы. В этом месяце потрачено",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-ink font-semibold", children: money(spent) }),
            monthlyBudget > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "из лимита в",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-ink font-semibold", children: money(monthlyBudget) }),
              ".",
              remaining !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: remaining >= 0 ? " text-sage" : " text-stamp", children: [
                " ",
                "(остаток: ",
                money(remaining),
                ")"
              ] })
            ] }) : ".",
            boot.houses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " В кассе «",
              boot.houses[0].name,
              "» также отслеживаю общие расходы."
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-rule/60 bg-black/[0.015] p-3 text-[12px] text-muted", children: "Задайте любой вопрос о покупках, комфортном дневном лимите или способах экономии." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-[11.5px] font-semibold uppercase tracking-wider text-muted", children: "Частые вопросы:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: QUICK_PROMPTS.map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => executeSend(prompt), className: "flex items-center justify-between rounded-[16px] border border-rule/80 bg-paper p-3 text-left text-[13px] text-ink shadow-sm transition-all hover:border-sage/40 hover:bg-black/[0.01] active:scale-[0.99]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14, className: "text-sage" }),
              prompt
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 15, className: "shrink-0 text-muted" })
          ] }, prompt)) })
        ] })
      ] }) : messages.map((m) => {
        const isUser = m.role === "user";
        if (isUser) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[85%] rounded-[20px] rounded-br-sm bg-sage px-4 py-2.5 text-[14px] leading-relaxed text-onsage shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap", children: m.text }) }) }, m.id);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 15 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[88%] rounded-[20px] rounded-tl-sm border border-rule/80 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink shadow-paper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap", children: m.text }) })
        ] }, m.id);
      }),
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 15 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[18px] rounded-tl-sm border border-rule/80 bg-paper px-4 py-3 shadow-paper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[13px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-sage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.2s]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.4s]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Изучаю ваши чеки…" })
        ] }) })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 z-20 -mx-4 border-t border-rule/80 bg-paper/95 px-4 pt-2.5 pb-2 backdrop-blur-md sm:-mx-5 sm:px-5", children: [
      messages.length > 0 && !busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-1", children: QUICK_PROMPTS.map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => executeSend(prompt), className: "shrink-0 rounded-full border border-rule/80 bg-paper px-3 py-1 text-[11.5px] text-muted transition-all hover:border-sage/40 hover:text-ink active:scale-95", children: prompt }, prompt)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "Спросить про траты, чеки, бюджет…", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 17 }), disabled: busy }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy || !text.trim(), className: "shrink-0", "aria-label": "Отправить вопрос", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }) })
      ] })
    ] })
  ] });
}
export {
  Agent as component
};
