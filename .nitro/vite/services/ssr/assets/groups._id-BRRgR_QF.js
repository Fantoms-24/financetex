import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, R as Route, d as useNavigate, u as useApp, b as cn } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import { a as moneyShort, b as billDueLabel } from "./format-BOBMj6ZA.js";
import { g as getHouse, s as setSalary, p as payHouseBill, a as addHouseBill, t as toggleWish, b as addWish, d as sendHouseMessage, e as deleteHouse, f as leaveHouse, k as kickMember, h as liveHouse, C as Copy } from "./houses-AH9K5ZiI.js";
import { C as Check } from "./check-BAk9Tl6l.js";
import { P as Plus } from "./plus-DuXTGlhn.js";
import { S as Send } from "./send-CL9hgYNy.js";
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
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const SPLIT_LABEL = {
  equal: "поровну",
  salary: "по зарплате",
  payer: "платит один"
};
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
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[17px]", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-3", variant: "paper", onClick: () => navigate({
        to: "/groups"
      }), children: "К кассам" })
    ] }) });
  }
  if (!snap || !snap.house) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 animate-[breathe_1.4s_ease-in-out_infinite] rounded-[16px] bg-rule-soft" }) });
  }
  snap.members.find((m) => m.user_id === user?.id);
  const isOwner = snap.house.owner_id === user?.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "envelope mb-4 px-4 pb-4 pt-[54px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display text-[24px] leading-none", children: snap.house.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code: snap.house.code })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12.5px] text-muted", children: snap.members.map((m) => m.name).join(", ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Люди", hint: "доли считаются от зарплаты", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: snap.members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "t-display min-w-0 flex-1 truncate text-[15px]", children: [
        m.name,
        m.user_id === user?.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: " · вы" }) : null
      ] }),
      m.user_id === user?.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(SalaryInput, { salary: m.salary, onSave: async (v) => {
        await setSalary({
          data: {
            houseId: id,
            amount: v
          }
        });
        await load();
      } }, `${m.user_id}-${m.salary}`) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-[13.5px] text-muted", children: moneyShort(m.salary) })
    ] }, m.user_id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex gap-1 rounded-[12px] border border-rule bg-paper p-1 shadow-paper", children: [["bills", "Платежи"], ["wishes", "Хотим"], ["chat", "Чат"]].map(([t, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: cn("min-h-[40px] flex-1 rounded-[9px] text-[13.5px] transition-colors", tab === t ? "bg-sage text-onsage" : "text-muted"), children: label }, t)) }),
    tab === "bills" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Платежи", hint: "напомним за 2 дня, за день и в день", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 space-y-2.5", children: snap.bills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-center text-[13.5px] text-muted", children: "платежей пока нет" }) : snap.bills.map((b) => {
        const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle);
        const due = billDueLabel(b.day_of_month);
        const share = snap.shares?.[b.id]?.[user?.id || ""] ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip px-3.5 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-display min-w-0 truncate text-[15.5px]", children: b.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0 text-[15.5px]", children: moneyShort(b.amount) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-2 text-[12px] text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              b.day_of_month,
              " числа"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rule", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: SPLIT_LABEL[b.split] || b.split }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rule", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: due.key === "today" || due.key === "overdue" ? "text-stamp" : "", children: due.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule mt-2.5 flex items-center justify-between pt-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12.5px] text-muted", children: [
              "ваша доля ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-ink", children: moneyShort(share) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
              await payHouseBill({
                data: {
                  houseId: id,
                  billId: b.id,
                  paid: !paid
                }
              });
              await load();
            }, className: cn("flex min-h-[34px] items-center gap-1.5 rounded-[9px] border px-2.5 text-[13px]", paid ? "border-sage/40 bg-sage/10 text-sage" : "border-rule text-muted"), children: [
              paid ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : null,
              paid ? "оплатили" : "я оплатил"
            ] })
          ] })
        ] }, b.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddBill, { members: snap.members, onAdd: async (v) => {
        await addHouseBill({
          data: {
            houseId: id,
            ...v
          }
        });
        await load();
      } })
    ] }) : null,
    tab === "wishes" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Хотим купить", hint: "видно всем в кассе", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 space-y-2.5", children: snap.wishes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-center text-[13.5px] text-muted", children: "список пуст" }) : snap.wishes.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slip flex items-center gap-3 px-3.5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          await toggleWish({
            data: {
              houseId: id,
              wishId: w.id
            }
          });
          await load();
        }, className: cn("flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] border", w.bought_at ? "border-sage bg-sage text-onsage" : "border-rule"), "aria-label": "взяли", children: w.bought_at ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 15 }) : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("t-display truncate text-[15px]", w.bought_at ? "text-muted line-through" : ""), children: w.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted", children: w.by_name ? `хотел ${w.by_name}` : "хотят" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0 text-[14.5px]", children: moneyShort(w.amount) })
      ] }, w.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddWish, { onAdd: async (v) => {
        await addWish({
          data: {
            houseId: id,
            ...v
          }
        });
        await load();
      } })
    ] }) : null,
    tab === "chat" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Чат кассы", hint: "сообщение придёт пушем", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 max-h-[46vh] space-y-2 overflow-y-auto", children: snap.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-center text-[13.5px] text-muted", children: "пока тихо" }) : snap.messages.map((m) => {
        const mine = m.user_id === user?.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex", mine ? "justify-end" : "justify-start"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-[80%] px-3 py-2", mine ? "scribble" : "letter"), children: [
          !mine ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0.5 text-[11.5px] text-sage", children: m.name }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] leading-snug", children: m.text })
        ] }) }, m.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChatInput, { onSend: async (text) => {
        await sendHouseMessage({
          data: {
            houseId: id,
            text
          }
        });
        await load();
      } })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 px-4", children: [
      isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-muted", children: [
        "Вы владелец.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-stamp underline", onClick: async () => {
          if (!confirm("Удалить кассу? Платежи и чат исчезнут.")) return;
          await deleteHouse({
            data: {
              houseId: id
            }
          });
          navigate({
            to: "/groups"
          });
        }, children: "Удалить кассу" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-stamp underline", onClick: async () => {
        if (!confirm("Выйти из кассы?")) return;
        await leaveHouse({
          data: {
            houseId: id
          }
        });
        navigate({
          to: "/groups"
        });
      }, children: "Выйти из кассы" }) }),
      isOwner && snap.members.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[12px] uppercase tracking-[0.09em] text-muted", children: "Выгнать" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: snap.members.filter((m) => m.user_id !== user?.id).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
          if (!confirm(`Выгнать ${m.name}?`)) return;
          await kickMember({
            data: {
              houseId: id,
              userId: m.user_id
            }
          });
          await load();
        }, className: "flex min-h-[34px] items-center gap-1.5 rounded-[9px] border border-rule px-2.5 text-[13px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
          " ",
          m.name
        ] }, m.user_id)) })
      ] }) : null
    ] })
  ] });
}
function CopyCode({
  code
}) {
  const [done, setDone] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
    try {
      await navigator.clipboard.writeText(code);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
    }
  }, className: "flex min-h-[34px] items-center gap-1.5 rounded-[8px] px-2 font-mono text-[13px] tracking-[0.2em] text-sage", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13 }),
    done ? "готово" : code
  ] });
}
function Section({
  title,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "t-display text-[17px]", children: title }),
      hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] text-muted", children: hint }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "receipt-card p-4", children })
  ] });
}
function SalaryInput({
  salary,
  onSave
}) {
  const [v, setV] = reactExports.useState(salary ? String(salary) : "");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: v, onChange: (e) => setV(e.target.value.replace(/[^\d]/g, "")), placeholder: "зарплата", inputMode: "numeric", className: "h-[38px] w-[104px] min-h-0 py-0 text-right text-[13.5px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "paper", disabled: busy, onClick: async () => {
      setBusy(true);
      await onSave(Math.round(Number(v || 0)));
      setBusy(false);
    }, children: "Ок" })
  ] });
}
function AddBill({
  members,
  onAdd
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [day, setDay] = reactExports.useState("1");
  const [split, setSplit] = reactExports.useState("equal");
  const [payer, setPayer] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "paper", size: "md", className: "w-full", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
      " Добавить платёж"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rule pt-3", onSubmit: async (e) => {
    e.preventDefault();
    const amt = Math.round(Number(amount.replace(/[^\d]/g, "") || 0));
    if (!title.trim() || !amt) return;
    setBusy(true);
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
    setBusy(false);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Аренда", className: "mb-2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 grid grid-cols-2 gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "45000", inputMode: "numeric" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: day, onChange: (e) => setDay(e.target.value.replace(/[^\d]/g, "").slice(0, 2)), placeholder: "день", inputMode: "numeric" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2.5 flex gap-1 rounded-[10px] border border-rule bg-cream/60 p-1", children: [["equal", "поровну"], ["salary", "по зарплате"], ["payer", "платит один"]].map(([v, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSplit(v), className: cn("min-h-[36px] flex-1 rounded-[7px] text-[12px]", split === v ? "bg-sage text-onsage" : "text-muted"), children: label }, v)) }),
    split === "payer" ? /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: payer, onChange: (e) => setPayer(e.target.value), className: "field mb-2.5", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.user_id, children: m.name }, m.user_id)) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "Добавить" })
    ] })
  ] });
}
function AddWish({
  onAdd
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "paper", size: "md", className: "w-full", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
      " Хотим купить"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rule pt-3", onSubmit: async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await onAdd({
      title: title.trim(),
      amount: Math.round(Number(amount.replace(/[^\d]/g, "") || 0))
    });
    setTitle("");
    setAmount("");
    setOpen(false);
    setBusy(false);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Пылесос", className: "mb-2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")), placeholder: "12000", inputMode: "numeric", className: "mb-2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Отмена" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", disabled: busy, children: busy ? "Секунду…" : "В список" })
    ] })
  ] });
}
function ChatInput({
  onSend
}) {
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "rule flex items-center gap-2 pt-3", onSubmit: async (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    await onSend(text.trim());
    setText("");
    setBusy(false);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: text, onChange: (e) => setText(e.target.value), placeholder: "написать в кассу" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "icon", disabled: busy, "aria-label": "отправить", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 17 }) })
  ] });
}
export {
  HousePage as component
};
