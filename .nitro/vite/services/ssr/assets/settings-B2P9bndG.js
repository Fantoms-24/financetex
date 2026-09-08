import { b as createSsrRpc, u as useApp, i as isStandalone, p as pushState, g as currentEndpoint, h as pushSubscribe, j as jsxDevRuntimeExports, k as pushSupported, l as isIos, m as disablePush, L as Link, v as vapidPublic, n as pushTest, o as enablePush } from "./router-jILV0Ki5.js";
import { c as createServerFn, r as reactExports } from "../server.js";
import { B as Button } from "./button-DVEG0ewd.js";
import { I as Input } from "./input-DEDqgiJZ.js";
import { g as getAdminState } from "./admin-DlkUQFw3.js";
import { C as ChevronRight } from "./chevron-right-CckRugxy.js";
import { L as LogOut } from "./log-out-B8ot84YO.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display text-[26px] leading-none", children: "Настроить" }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: user?.email }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 112,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "t-display mb-2 text-[17px]", children: "Уведомления" }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 text-[13px] leading-snug text-muted", children: !pushSupported() ? "Браузер не умеет пуши" : perm.granted ? standalone ? "Включены. Приходят даже с выключенным экраном" : isIos() ? "Разрешение есть. Откройте приложение с иконки Домой" : "Разрешение есть" : "Выключены — напоминания не придут" }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-2.5", children: [
        perm.granted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", disabled: busy, onClick: onTest, children: "Прислать тест" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 121,
          columnNumber: 27
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "md", disabled: busy, onClick: onEnablePush, children: "Включить" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 123,
          columnNumber: 25
        }, this),
        perm.granted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "md", disabled: busy, onClick: async () => {
          await disablePush();
          setPerm(pushState());
        }, children: "Отключить" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 126,
          columnNumber: 27
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", disabled: busy, onClick: onTest, children: "Прислать тест" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 131,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      testResult ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2.5 text-[13px] text-sage", children: testResult }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 135,
        columnNumber: 23
      }, this) : null,
      testError ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2.5 text-[13px] text-stamp", children: testError }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 136,
        columnNumber: 22
      }, this) : null,
      isIos() && !standalone ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2.5 text-[12.5px] leading-snug text-muted", children: "На iPhone сначала на Домой: Поделиться → На экран Домой." }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 137,
        columnNumber: 35
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: save, className: "receipt-card rise mb-4 p-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "t-display mb-3 text-[17px]", children: "Профиль и лимит" }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Имя" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Как обращаться" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 148,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Лимит месяца, ₽" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 151,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: budget, onChange: (e) => setBudget(e.target.value.replace(/[^\d]/g, "")), inputMode: "numeric" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Телефон для СБП" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+7 900 000-00-00", inputMode: "tel" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 160,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Банк" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 163,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: bank, onChange: (e) => setBank(e.target.value), placeholder: "Тинькофф" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 166,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 162,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "md", className: "w-full", disabled: busy, children: saved ? "Сохранили" : "Сохранить" }, void 0, false, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 168,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
      lineNumber: 142,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper", children: [
      isAdmin ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/admin", className: "flex min-h-[52px] items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: "Ключ для сканирования" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 175,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 17, className: "text-muted" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 176,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 174,
        columnNumber: 20
      }, this) : null,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: async () => {
        await logout();
        window.location.href = "/login";
      }, className: "flex min-h-[52px] w-full items-center justify-between px-4 text-left", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: "Выйти" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 182,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { size: 17, className: "text-muted" }, void 0, false, {
          fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
          lineNumber: 183,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
        lineNumber: 178,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
      lineNumber: 173,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/settings.tsx?tsr-split=component",
    lineNumber: 109,
    columnNumber: 10
  }, this);
}
export {
  Settings as component
};
