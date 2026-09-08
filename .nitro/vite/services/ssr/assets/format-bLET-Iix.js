const CATEGORIES = [
  { id: "food", label: "Еда" },
  { id: "prepared", label: "Готовая еда" },
  { id: "household", label: "Дом" },
  { id: "hygiene", label: "Гигиена" },
  { id: "health", label: "Здоровье" },
  { id: "drinks", label: "Напитки" },
  { id: "snacks", label: "Снеки" },
  { id: "other", label: "Разное" }
];
function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "Разное";
}
function money(n) {
  const v = Math.round(Number(n || 0));
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(v);
}
function moneyShort(n) {
  return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    Math.round(Number(n || 0))
  )} ₽`;
}
function dayKey(d) {
  const dt = typeof d === "string" ? new Date(d) : d;
  const y = dt.getFullYear();
  const m = `${dt.getMonth() + 1}`.padStart(2, "0");
  const day = `${dt.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function monthKey(d = /* @__PURE__ */ new Date()) {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}`;
}
function dateRu(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "";
  const today = /* @__PURE__ */ new Date();
  const y = new Date(today.getTime() - 864e5);
  if (dayKey(dt) === dayKey(today)) return "сегодня";
  if (dayKey(dt) === dayKey(y)) return "вчера";
  return dt.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
function timeRu(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}
function greeting(date = /* @__PURE__ */ new Date()) {
  const h = date.getHours();
  if (h < 5) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}
function plural(n, one, few, many) {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}
function billDueLabel(dayOfMonth, now = /* @__PURE__ */ new Date()) {
  const diff = dayOfMonth - now.getDate();
  if (diff === 0) return { key: "today", label: "Сегодня" };
  if (diff === 1) return { key: "in-1", label: "Завтра" };
  if (diff === 2) return { key: "in-2", label: "Через 2 дня" };
  if (diff < 0) return { key: "overdue", label: "Просрочен" };
  return { key: "in-2", label: `${diff} ${plural(diff, "день", "дня", "дней")}` };
}
export {
  CATEGORIES as C,
  money as a,
  billDueLabel as b,
  categoryLabel as c,
  moneyShort as d,
  dateRu as e,
  greeting as g,
  monthKey as m,
  plural as p,
  timeRu as t
};
