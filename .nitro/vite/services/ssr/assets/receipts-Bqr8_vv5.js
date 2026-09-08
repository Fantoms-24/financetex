import { r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useApp, R as Receipt, L as Link, S as ScanLine, b as cn, U as Users } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { a as money, p as plural, C as CATEGORIES, e as dateRu, c as categoryLabel, d as moneyShort } from "./format-bLET-Iix.js";
import { l as listReceipts, C as ChevronUp, a as ChevronDown, T as Trash2, b as addReceipt, g as getReceipt, s as setReceiptHouse, d as deleteReceipt } from "./receipts-ClnSozb3.js";
import { X } from "./x-DF3G7ELa.js";
import { P as Plus } from "./plus-DHqwpiIx.js";
import { T as TrendingDown, C as Calendar } from "./trending-down-DPk-j6rW.js";
import { W as Wallet } from "./wallet-Ckzbmj4j.js";
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
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
const __iconNode = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
];
const Store = createLucideIcon("store", __iconNode);
const VERDICT = {
  good: {
    label: "норма",
    color: "bg-sage/10 text-sage border-sage/20"
  },
  fair: {
    label: "терпимо",
    color: "bg-amber-500/10 text-amber-800 border-amber-500/20"
  },
  overpriced: {
    label: "дорого",
    color: "bg-stamp/10 text-stamp border-stamp/20"
  },
  impulse: {
    label: "импульс",
    color: "bg-stamp/10 text-stamp border-stamp/20"
  }
};
const QUICK_STORES = ["Пятёрочка", "ВкусВилл", "Магнит", "Самокат", "Озон", "Аптека"];
function Receipts() {
  const {
    user,
    boot,
    refresh
  } = useApp();
  const [items, setItems] = reactExports.useState(boot.receipts || []);
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [store, setStore] = reactExports.useState("");
  const [total, setTotal] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("food");
  const [note, setNote] = reactExports.useState("");
  const [formHouseId, setFormHouseId] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [openId, setOpenId] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState([]);
  const [loadingDetail, setLoadingDetail] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) return;
    listReceipts({
      data: {
        limit: 120
      }
    }).then((r) => setItems(r?.receipts ?? [])).catch(() => {
    });
  }, [user]);
  async function updateReceiptHouse(receiptId, nextHouseId) {
    await setReceiptHouse({
      data: {
        id: receiptId,
        houseId: nextHouseId
      }
    });
    setItems((prev) => prev.map((it) => {
      if (it.id !== receiptId) return it;
      const targetH = boot.houses.find((h) => h.id === nextHouseId);
      return {
        ...it,
        house_id: nextHouseId,
        house_name: targetH?.name || null
      };
    }));
    await refresh();
  }
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    const amount = Math.round(Number(total.replace(/[^\d.,]/g, "").replace(",", ".") || 0));
    if (!amount) return;
    setBusy(true);
    try {
      await addReceipt({
        data: {
          store: store.trim() || "Без названия",
          total: amount,
          category,
          note: note.trim() || void 0,
          houseId: formHouseId
        }
      });
      setStore("");
      setTotal("");
      setNote("");
      setCategory("food");
      setFormHouseId(null);
      setOpen(false);
      await refresh();
      const r = await listReceipts({
        data: {
          limit: 120
        }
      });
      setItems(r?.receipts ?? []);
    } finally {
      setBusy(false);
    }
  }
  async function toggle(id) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    setDetail([]);
    setLoadingDetail(true);
    try {
      const r = await getReceipt({
        data: {
          id
        }
      }).catch(() => null);
      setDetail(r?.items ?? []);
    } finally {
      setLoadingDetail(false);
    }
  }
  async function drop(id) {
    await deleteReceipt({
      data: {
        id
      }
    });
    setOpenId(null);
    await refresh();
    const r = await listReceipts({
      data: {
        limit: 120
      }
    });
    setItems(r?.receipts ?? []);
  }
  const filtered = reactExports.useMemo(() => {
    return items.filter((r) => {
      const matchSearch = !search.trim() || (r.store || "").toLowerCase().includes(search.toLowerCase()) || (r.note || "").toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "all" || r.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [items, search, selectedCategory]);
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const r of filtered) {
      const key = r.purchased_at || "без даты";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    }
    return Array.from(map.entries());
  }, [filtered]);
  const monthTotal = boot.month.spent;
  const avgCheck = items.length > 0 ? Math.round(monthTotal / items.length) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pb-12 pt-4 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[12px] font-medium text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 14, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Учёт расходов" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink", children: "Чеки и покупки" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/scan", className: "flex h-9 w-9 items-center justify-center rounded-xl border border-rule/80 bg-paper text-ink shadow-sm transition-all hover:border-sage/40 active:scale-95", title: "Сканировать чек", "aria-label": "Сканировать чек", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 18, className: "text-sage" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: open ? "ghost" : "sage", onClick: () => setOpen(!open), className: "gap-1.5", children: [
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: open ? "Закрыть" : "Вписать" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-3 gap-2.5 rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12, className: "text-sage" }),
          "За месяц"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num mt-1 text-[16px] font-semibold text-ink", children: money(monthTotal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] text-muted", children: "всего трат" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col border-x border-rule/60 px-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 12, className: "text-sage" }),
          "Чеков"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num mt-1 text-[16px] font-semibold text-ink", children: items.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] text-muted", children: plural(items.length, "запись", "записи", "записей") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pl-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 12, className: "text-sage" }),
          "Средний"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num mt-1 text-[16px] font-semibold text-ink", children: money(avgCheck) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] text-muted", children: "за один чек" })
      ] })
    ] }),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 17, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display text-[16px] font-medium text-ink", children: "Вписать чек вручную" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-lg p-1 text-muted hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Магазин / Сервис" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: store, onChange: (e) => setStore(e.target.value), placeholder: "Пятёрочка, ВкусВилл, Аптека…", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-1.5", children: QUICK_STORES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStore(s), className: cn("rounded-full border px-2.5 py-0.5 text-[11px] transition-colors", store === s ? "border-sage bg-sage text-onsage" : "border-rule/80 bg-black/[0.02] text-muted hover:bg-black/[0.05]"), children: s }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Сумма чека, ₽" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: total, onChange: (e) => setTotal(e.target.value), placeholder: "1 250", inputMode: "numeric", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Категория" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory(cat.id), className: cn("rounded-xl border px-2.5 py-1 text-[11.5px] font-medium transition-all", category === cat.id ? "border-sage bg-sage text-onsage shadow-sm" : "border-rule/80 bg-paper text-muted hover:text-ink"), children: cat.label }, cat.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Заметка (необязательно)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: note, onChange: (e) => setNote(e.target.value), placeholder: "Например: кофе на прогулке, подарок" })
        ] }),
        boot.houses && boot.houses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted", children: "Куда записать чек" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFormHouseId(null), className: cn("rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition", formHouseId === null ? "bg-sage text-onsage shadow-xs" : "bg-cream text-muted hover:text-ink"), children: "Личный" }),
            boot.houses.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFormHouseId(h.id), className: cn("flex items-center gap-1 rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition", formHouseId === h.id ? "bg-amber-800 text-onsage shadow-xs" : "bg-cream text-muted hover:text-ink"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.name })
            ] }, h.id))
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: busy ? "Сохранение…" : "Положить чек в ящик" })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Поиск по магазину или заметке…", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 }), endIcon: search ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSearch(""), className: "text-muted hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 }) }) : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 py-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedCategory("all"), className: cn("shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-all", selectedCategory === "all" ? "border-sage bg-sage text-onsage shadow-sm" : "border-rule/80 bg-paper text-muted hover:text-ink"), children: [
          "Все (",
          items.length,
          ")"
        ] }),
        CATEGORIES.map((cat) => {
          const count = items.filter((r) => r.category === cat.id).length;
          if (count === 0 && selectedCategory !== cat.id) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedCategory(cat.id), className: cn("shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-all", selectedCategory === cat.id ? "border-sage bg-sage text-onsage shadow-sm" : "border-rule/80 bg-paper text-muted hover:text-ink"), children: [
            cat.label,
            " ",
            count > 0 ? `(${count})` : ""
          ] }, cat.id);
        })
      ] })
    ] }),
    grouped.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[20px] border border-rule/80 bg-paper p-8 text-center shadow-paper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 24 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "t-display mt-3 text-[17px] font-medium text-ink", children: search || selectedCategory !== "all" ? "Ничего не найдено" : "В ящике пока нет чеков" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1.5 max-w-[280px] text-[13px] leading-snug text-muted", children: search || selectedCategory !== "all" ? "Попробуйте изменить поисковый запрос или сбросить фильтр." : "Отсканируйте бумажный чек, загрузите фото или впишите сумму вручную." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/scan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "sage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 16 }),
          " Сканировать"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "paper", onClick: () => setOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " Вписать вручную"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: grouped.map(([day, list]) => {
      const daySum = list.reduce((s, r) => s + r.total, 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-sage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dateRu(day) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-[12.5px] font-semibold text-ink/80", children: money(daySum) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper", children: list.map((r) => {
          const isOpen = openId === r.id;
          const verdictInfo = r.verdict ? VERDICT[r.verdict] : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "transition-colors hover:bg-black/[0.015]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "flex w-full items-center justify-between p-3.5 text-left", onClick: () => toggle(r.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pr-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[15px] font-semibold text-ink", children: r.store || "Без названия" }),
                  r.house_name ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-amber-800/10 px-2 py-0.5 text-[10.5px] font-semibold text-amber-800", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
                    r.house_name
                  ] }) : null,
                  verdictInfo ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full border px-2 py-0.5 text-[10.5px] font-medium leading-none", verdictInfo.color), children: verdictInfo.label }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[12px] text-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: categoryLabel(r.category) }),
                  r.note ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-ink/70", children: r.note })
                  ] }) : null
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num text-[16px] font-semibold text-ink", children: moneyShort(r.total) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }) })
              ] })
            ] }),
            isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-rule/60 bg-black/[0.015] px-4 py-3", children: [
              loadingDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-2 text-[12.5px] text-muted", children: "Загрузка позиций…" }) : detail.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-medium uppercase tracking-wider text-muted", children: [
                  "Позиции из чека (",
                  detail.length,
                  "):"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-rule/40 rounded-xl border border-rule/60 bg-paper p-2", children: detail.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-baseline justify-between gap-3 py-1.5 text-[13px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate text-ink", children: [
                    it.name,
                    it.qty ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted", children: [
                      " ×",
                      it.qty
                    ] }) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t-num shrink-0 font-medium text-ink", children: moneyShort(it.price) })
                ] }, it.id)) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-1 text-[12px] text-muted", children: "Отдельные позиции не были распознаны или записаны." }),
              boot.houses && boot.houses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-rule/50 pt-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[12px] font-medium text-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13, className: "text-amber-800" }),
                  "Куда отнесён:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateReceiptHouse(r.id, null), className: cn("rounded-[8px] px-2 py-1 text-[11px] font-medium transition", !r.house_id ? "bg-sage text-onsage shadow-xs" : "bg-cream text-muted hover:text-ink"), children: "Личные" }),
                  boot.houses.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => updateReceiptHouse(r.id, h.id), className: cn("flex items-center gap-1 rounded-[8px] px-2 py-1 text-[11px] font-medium transition", r.house_id === h.id ? "bg-amber-800 text-onsage shadow-xs" : "bg-cream text-muted hover:text-ink"), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 10 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.name })
                  ] }, h.id))
                ] })
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => drop(r.id), className: "gap-1.5 text-stamp hover:bg-stamp/10 hover:text-stamp", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Удалить чек" })
              ] }) })
            ] }) : null
          ] }, r.id);
        }) })
      ] }, day);
    }) })
  ] });
}
export {
  Receipts as component
};
