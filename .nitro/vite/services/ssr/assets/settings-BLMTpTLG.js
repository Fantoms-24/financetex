import { c as createServerFn, r as reactExports, j as jsxRuntimeExports } from "../server.js";
import { a as createSsrRpc, u as useApp, i as isStandalone, p as pushState, d as currentEndpoint, e as pushSubscribe, f as pushSupported, g as isIos, h as disablePush, L as Link, v as vapidPublic, j as pushTest, k as enablePush } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { g as getAdminState } from "./admin-BQrcAdkI.js";
import { C as ChevronRight } from "./chevron-right-D-j5iAsg.js";
import { L as LogOut } from "./log-out-ZflWpQn2.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./tick-DRof54z-.js";
import "./format-bLET-Iix.js";
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
const saveSettings = createServerFn({
  method: "POST"
}).validator((d) => ({
  monthly_budget: d.monthly_budget === void 0 ? void 0 : Math.round(Math.max(0, Number(d.monthly_budget))),
  monthly_income: d.monthly_income === void 0 ? void 0 : Math.round(Math.max(0, Number(d.monthly_income))),
  allocations: d.allocations
})).handler(createSsrRpc("7059b4e40911b9d797c4121eefdcde07879b23e777a1627069c2b2d6a9646d5f"));
const saveProfile = createServerFn({
  method: "POST"
}).validator((d) => ({
  display_name: d.display_name === void 0 ? void 0 : String(d.display_name).trim(),
  phone: d.phone === void 0 ? void 0 : String(d.phone).trim(),
  bank: d.bank === void 0 ? void 0 : String(d.bank).trim()
})).handler(createSsrRpc("8467b19019654362fe30d9c2e1cb95e6d6f2b4e6afef8151b225adfa9ebef586"));
function Settings() {
  const {
    user,
    boot,
    refresh,
    logout
  } = useApp();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [bank, setBank] = reactExports.useState("");
  const [budget, setBudget] = reactExports.useState("");
  const [saved, setSaved] = reactExports.useState(false);
  const [perm, setPerm] = reactExports.useState({
    permission: "default",
    granted: false
  });
  const [standalone, setStandalone] = reactExports.useState(false);
  const [testResult, setTestResult] = reactExports.useState(null);
  const [testError, setTestError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) return;
    setName(user.displayName || "");
    setPhone(user.phone || "");
    setBank(user.bank || "");
    setBudget(String(boot.settings.monthly_budget || 45e3));
    setStandalone(isStandalone());
    setPerm(pushState());
    currentEndpoint().then(async (ep) => {
      if (!ep) return;
      try {
        const reg = await navigator.serviceWorker.getRegistration("/");
        const sub = await reg?.pushManager.getSubscription();
        const keys = sub?.toJSON()?.keys || {};
        if (sub) {
          await pushSubscribe({
            data: {
              endpoint: sub.endpoint,
              p256dh: keys.p256dh || "",
              auth: keys.auth || ""
            }
          });
        }
      } catch {
      }
    }).catch(() => {
    });
    getAdminState().then((r) => setIsAdmin(!!r?.isAdmin)).catch(() => {
    });
  }, [user, boot.settings.monthly_budget]);
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    await saveProfile({
      data: {
        display_name: name,
        phone,
        bank
      }
    });
    const b = Math.round(Number(budget.replace(/[^\d]/g, "") || 45e3));
    await saveSettings({
      data: {
        monthly_budget: b
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    setBusy(false);
    await refresh();
  }
  async function onEnablePush() {
    setBusy(true);
    setTestError(null);
    const res = await enablePush();
    setPerm(pushState());
    setBusy(false);
    if (!res.ok) setTestError(res.error || "Не получилось");
  }
  async function onTest() {
    setBusy(true);
    setTestResult(null);
    setTestError(null);
    const key = await vapidPublic().catch(() => ({
      publicKey: ""
    }));
    if (!key?.publicKey) {
      setTestError("Ключ пушей не задан на сервере");
      setBusy(false);
      return;
    }
    const r = await pushTest().catch(() => null);
    if (!r) {
      setTestError("Не получилось отправить");
    } else {
      setTestResult(`устройств в канале: ${r.devices ?? 0}, ушло: ${r.sent ?? 0}`);
      if (r.error) setTestError(String(r.error));
    }
    setBusy(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display text-[26px] leading-none", children: "Настроить" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] text-muted", children: user?.email })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "t-display mb-2 text-[17px]", children: "Уведомления" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-[13px] leading-snug text-muted", children: !pushSupported() ? "Браузер не умеет пуши" : perm.granted ? standalone ? "Включены. Приходят даже с выключенным экраном" : isIos() ? "Разрешение есть. Откройте приложение с иконки Домой" : "Разрешение есть" : "Выключены — напоминания не придут" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
        perm.granted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "paper", size: "md", disabled: busy, onClick: onTest, children: "Прислать тест" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "sage", size: "md", disabled: busy, onClick: onEnablePush, children: "Включить" }),
        perm.granted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "md", disabled: busy, onClick: async () => {
          await disablePush();
          setPerm(pushState());
        }, children: "Отключить" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "paper", size: "md", disabled: busy, onClick: onTest, children: "Прислать тест" })
      ] }),
      testResult ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-[13px] text-sage", children: testResult }) : null,
      testError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-[13px] text-stamp", children: testError }) : null,
      isIos() && !standalone ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-[12.5px] leading-snug text-muted", children: "На iPhone сначала на Домой: Поделиться → На экран Домой." }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "t-display mb-3 text-[17px]", children: "Профиль и лимит" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Имя" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Как обращаться" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Лимит месяца, ₽" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: budget, onChange: (e) => setBudget(e.target.value.replace(/[^\d]/g, "")), inputMode: "numeric" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Телефон для СБП" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+7 900 000-00-00", inputMode: "tel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Банк" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bank, onChange: (e) => setBank(e.target.value), placeholder: "Тинькофф" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: saved ? "Сохранили" : "Сохранить" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper", children: [
      isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: "Ключ для сканирования" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "text-muted" })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
        await logout();
        window.location.href = "/login";
      }, className: "flex min-h-[52px] w-full items-center justify-between px-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: "Выйти" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 17, className: "text-muted" })
      ] })
    ] })
  ] });
}
export {
  Settings as component
};
