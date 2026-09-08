import { j as jsxRuntimeExports, r as reactExports } from "../server.js";
import { d as useNavigate, u as useApp, b as cn, s as signIn, e as signUp } from "./router-eDuhfEID.js";
import { B as Button } from "./button-Cn3HzEib.js";
import { I as Input } from "./input-9YwI1fst.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./tick-Caixl4Sl.js";
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
import "./store-BVRg5jbE.js";
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
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (!login.trim()) return setError("Впишите логин");
    if (password.length < 8) return setError("Пароль — минимум 8 символов");
    setBusy(true);
    try {
      const res = mode === "in" ? await signIn({
        data: {
          login,
          password
        }
      }) : await signUp({
        data: {
          login,
          password,
          name
        }
      });
      if (!res.ok || !res.token) {
        setError(res.error || "Не получилось войти");
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
      setError(e2?.message || "Не получилось войти");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[100svh] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-sage px-6 pb-10 pt-[calc(env(safe-area-inset-top)+40px)] text-onsage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[430px] flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 64 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "t-display mt-4 text-[30px] leading-none", children: "ЧекАгент" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[300px] text-[13.5px] leading-snug text-onsage/75", children: "Карманный финансист. Чеки, бюджет и кассы на одном листке." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-[9px] left-0 right-0 flex justify-center gap-[7px] overflow-hidden", children: Array.from({
        length: 26
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[18px] w-[18px] shrink-0 rounded-full bg-cream" }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-transparent px-5 pb-10 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[430px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex rounded-[12px] border border-rule bg-paper p-1 shadow-paper", children: [["in", "Войти"], ["up", "Создать"]].map(([m, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        setMode(m);
        setError(null);
      }, className: cn("min-h-[42px] flex-1 rounded-[9px] text-[14px] transition-colors", mode === m ? "bg-sage text-onsage shadow-paper" : "text-muted"), children: label }, m)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "receipt-card p-5", children: [
        mode === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Имя" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Как к вам обращаться", autoComplete: "name" })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Логин" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: login, onChange: (e) => setLogin(e.target.value), placeholder: "vasya", autoCapitalize: "none", autoCorrect: "off", autoComplete: "username", inputMode: "email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11.5px] text-muted", children: "Без собаки — добавим @chekagent.app сами" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Пароль" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "минимум 8 символов", autoComplete: mode === "in" ? "current-password" : "new-password" })
        ] }),
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp", children: error }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "sage", size: "lg", className: "w-full", disabled: busy, children: busy ? "Секунду…" : mode === "in" ? "Войти" : "Создать и войти" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-[12px] leading-relaxed text-muted", children: [
        "Поставите на Домой — будут приходить напоминания",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "о платежах, покупках и сообщениях в кассе."
      ] })
    ] }) })
  ] });
}
export {
  Login as component
};
