import { j as jsxRuntimeExports, r as reactExports } from "../server.js";
import { c as createLucideIcon, n as useNavigate, u as useApp, b as cn, R as Receipt, U as Users, s as signIn, o as signUp } from "./router-bVUirNDJ.js";
import { B as Button } from "./button-Dh2QK49O.js";
import { I as Input } from "./input-CyMaXwJk.js";
import { S as Sparkles } from "./sparkles-DmcIehh6.js";
import { C as CircleAlert } from "./circle-alert-4YCx4HCP.js";
import { L as LoaderCircle } from "./loader-circle-D9KxiRsp.js";
import { A as ArrowRight } from "./arrow-right-DQGtIdBA.js";
import { S as ShieldCheck } from "./shield-check-B1RRRVs6.js";
import { W as Wallet } from "./wallet-Ckzbmj4j.js";
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
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function Logo({ size = 64, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 64 64",
      className,
      role: "img",
      "aria-label": "ЧекАгент",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "64", height: "64", rx: "15", fill: "#3d5c4a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "rotate(-9 32 32)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M22 13h20a1.5 1.5 0 0 1 1.5 1.5v34.2c0 .9-.8 1.5-1.7 1.4l-3.3-.5-3.2.6-3.3-.6-3.2.6-3.3-.6-3.2.6-3.3-.6-2.4.4a1.5 1.5 0 0 1-1.6-1.5V14.5A1.5 1.5 0 0 1 22 13Z",
              fill: "#faf6ee"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25.5", cy: "19", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25.5", cy: "26", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25.5", cy: "33", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25.5", cy: "40", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "18", width: "12", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "25", width: "9", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "32", width: "11", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "33", cy: "43", r: "8.2", fill: "none", stroke: "#8f3d32", strokeWidth: "1.5", opacity: "0.85" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(33 43)", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-2.6-4.6h3.9a2.55 2.55 0 0 1 0 5.1h-3.9",
                fill: "none",
                stroke: "#8f3d32",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M-2.6 0.5v5.2", fill: "none", stroke: "#8f3d32", strokeWidth: "1.5", strokeLinecap: "round" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M-4.4 2.4h5.9M-4.4 5.4h5.9", stroke: "#8f3d32", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        ] })
      ]
    }
  );
}
function Login() {
  const navigate = useNavigate();
  const {
    setSession,
    refresh
  } = useApp();
  const [mode, setMode] = reactExports.useState("in");
  const [login, setLogin] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (!login.trim()) return setError("Впишите логин для аккаунта");
    if (password.length < 4) return setError("Пароль должен содержать минимум 4 символа");
    setBusy(true);
    try {
      const res = mode === "in" ? await signIn({
        data: {
          login: login.trim(),
          password
        }
      }) : await signUp({
        data: {
          login: login.trim(),
          password,
          name: name.trim()
        }
      });
      if (!res || !res.ok || !res.token) {
        setError(res?.error || "Не удалось войти. Проверьте логин и пароль.");
        setBusy(false);
        return;
      }
      setSession(res.token, res.user);
      navigate({
        to: "/",
        replace: true
      });
      refresh().catch(() => {
      });
    } catch (e2) {
      console.error("[login] submit error:", e2);
      const msg = e2?.message || "";
      if (/500|failed to load/i.test(msg)) {
        setError("Серверная ошибка (500). Проверьте DATABASE_URL и логи сервера.");
      } else {
        setError(msg || "Не удалось связаться с сервером");
      }
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-[100svh] flex-col justify-between overflow-x-hidden bg-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "pointer-events-none absolute -top-24 left-1/2 h-[340px] w-[500px] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 pb-10 pt-[calc(env(safe-area-inset-top)+24px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1.5 rounded-[22px] bg-sage/15 blur-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 70, className: "relative drop-shadow-sm transition-transform hover:scale-105" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1.5 rounded-full border border-sage/20 bg-sage/8 px-3 py-0.5 text-[11.5px] font-medium tracking-wide text-sage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, className: "text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Умный финансовый помощник" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display mt-2.5 text-[32px] font-medium leading-none tracking-tight text-ink", children: "ЧекАгент" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[14px] leading-relaxed text-muted", children: mode === "in" ? "Войдите, чтобы открыть свои чеки, бюджет и кассы" : "Создайте аккаунт за 10 секунд — без почты и смс" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex rounded-2xl border border-rule/80 bg-paper/90 p-1.5 shadow-paper backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", id: "auth-tab-signin", onClick: () => {
          setMode("in");
          setError(null);
        }, className: cn("relative z-10 flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[12px] text-[14px] font-medium transition-all duration-200", mode === "in" ? "bg-sage text-onsage shadow-sm" : "text-muted hover:text-ink"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Войти" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", id: "auth-tab-signup", onClick: () => {
          setMode("up");
          setError(null);
        }, className: cn("relative z-10 flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[12px] text-[14px] font-medium transition-all duration-200", mode === "up" ? "bg-sage text-onsage shadow-sm" : "text-muted hover:text-ink"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Регистрация" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-5 shadow-paper-lg sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
          mode === "up" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "auth-name", className: "block text-[12px] font-semibold uppercase tracking-wider text-muted", children: "Ваше имя" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "auth-name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Александр", autoComplete: "name", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "auth-login", className: "block text-[12px] font-semibold uppercase tracking-wider text-muted", children: "Логин" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted", children: "без символа @" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "auth-login", value: login, onChange: (e) => setLogin(e.target.value), placeholder: "alex", autoCapitalize: "none", autoCorrect: "off", autoComplete: "username", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "auth-password", className: "block text-[12px] font-semibold uppercase tracking-wider text-muted", children: "Пароль" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "auth-password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Не менее 4 символов", autoComplete: mode === "in" ? "current-password" : "new-password", startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18 }), endIcon: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((prev) => !prev), className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink active:scale-95", "aria-label": showPassword ? "Скрыть пароль" : "Показать пароль", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }) }) })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "alert", className: "flex items-start gap-2.5 rounded-xl border border-stamp/30 bg-stamp/8 p-3 text-[13px] leading-snug text-stamp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, className: "mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "auth-submit-btn", type: "submit", variant: "sage", size: "lg", disabled: busy, className: "mt-2 w-full gap-2 rounded-xl text-[15.5px] font-medium shadow-md transition-all active:scale-[0.99]", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Проверяем данные…" })
          ] }) : mode === "in" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Войти в аккаунт" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Зарегистрироваться" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 border-t border-rule/60 pt-4 text-[12px] text-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16, className: "shrink-0 text-sage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Данные зашифрованы и хранятся в защищённой базе" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-[11px] font-medium text-ink", children: "Сканер чеков" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted", children: "Фото и QR" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-[11px] font-medium text-ink", children: "Учёт бюджета" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted", children: "Дневные лимиты" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-[11px] font-medium text-ink", children: "Общие кассы" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted", children: "Семья и друзья" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-[12px] leading-relaxed text-muted", children: [
        "Приложение можно добавить на рабочий стол как PWA",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "для быстрых пуш-уведомлений и офлайн-доступа"
      ] })
    ] })
  ] });
}
export {
  Login as component
};
