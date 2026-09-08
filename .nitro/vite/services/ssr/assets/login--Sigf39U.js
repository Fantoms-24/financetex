import { j as jsxDevRuntimeExports, e as useNavigate, u as useApp, d as cn, s as signIn, f as signUp } from "./router-jILV0Ki5.js";
import { r as reactExports } from "../server.js";
import { B as Button } from "./button-DVEG0ewd.js";
import { I as Input } from "./input-DEDqgiJZ.js";
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
function Logo({ size = 64, className }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 64 64",
      className,
      role: "img",
      "aria-label": "ЧекАгент",
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("rect", { width: "64", height: "64", rx: "15", fill: "#3d5c4a" }, void 0, false, {
          fileName: "/app/applet/src/components/Logo.tsx",
          lineNumber: 11,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("g", { transform: "rotate(-9 32 32)", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "path",
            {
              d: "M22 13h20a1.5 1.5 0 0 1 1.5 1.5v34.2c0 .9-.8 1.5-1.7 1.4l-3.3-.5-3.2.6-3.3-.6-3.2.6-3.3-.6-3.2.6-3.3-.6-2.4.4a1.5 1.5 0 0 1-1.6-1.5V14.5A1.5 1.5 0 0 1 22 13Z",
              fill: "#faf6ee"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Logo.tsx",
              lineNumber: 14,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "25.5", cy: "19", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "25.5", cy: "26", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 20,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "25.5", cy: "33", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 21,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "25.5", cy: "40", r: "1.25", fill: "#3d5c4a", opacity: "0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("rect", { x: "30", y: "18", width: "12", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 24,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("rect", { x: "30", y: "25", width: "9", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 25,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("rect", { x: "30", y: "32", width: "11", height: "1.6", rx: "0.8", fill: "#3d5c4a", opacity: "0.32" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 26,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "33", cy: "43", r: "8.2", fill: "none", stroke: "#8f3d32", strokeWidth: "1.5", opacity: "0.85" }, void 0, false, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 28,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("g", { transform: "translate(33 43)", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "path",
              {
                d: "M-2.6-4.6h3.9a2.55 2.55 0 0 1 0 5.1h-3.9",
                fill: "none",
                stroke: "#8f3d32",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Logo.tsx",
                lineNumber: 30,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M-2.6 0.5v5.2", fill: "none", stroke: "#8f3d32", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, false, {
              fileName: "/app/applet/src/components/Logo.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M-4.4 2.4h5.9M-4.4 5.4h5.9", stroke: "#8f3d32", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, false, {
              fileName: "/app/applet/src/components/Logo.tsx",
              lineNumber: 38,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Logo.tsx",
            lineNumber: 29,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Logo.tsx",
          lineNumber: 12,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/Logo.tsx",
      lineNumber: 3,
      columnNumber: 5
    },
    this
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
    if (password.length < 4) return setError("Пароль — минимум 4 символа");
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-[100svh] flex-col", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-sage px-6 pb-10 pt-[calc(env(safe-area-inset-top)+40px)] text-onsage", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto flex max-w-[430px] flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Logo, { size: 64 }, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display mt-4 text-[30px] leading-none", children: "ЧекАгент" }, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 max-w-[300px] text-[13.5px] leading-snug text-onsage/75", children: "Карманный финансист. Чеки, бюджет и кассы на одном листке." }, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -bottom-[9px] left-0 right-0 flex justify-center gap-[7px] overflow-hidden", children: Array.from({
        length: 26
      }).map((_, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "h-[18px] w-[18px] shrink-0 rounded-full bg-cream" }, i, false, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 78,
        columnNumber: 26
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 75,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 bg-transparent px-5 pb-10 pt-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto w-full max-w-[430px]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-5 flex rounded-[12px] border border-rule bg-paper p-1 shadow-paper", children: [["in", "Войти"], ["up", "Создать"]].map(([m, label]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => {
        setMode(m);
        setError(null);
      }, className: cn("min-h-[42px] flex-1 rounded-[9px] text-[14px] transition-colors", mode === m ? "bg-sage text-onsage shadow-paper" : "text-muted"), children: label }, m, false, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 86,
        columnNumber: 98
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: submit, className: "receipt-card p-5", children: [
        mode === "up" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Имя" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 96,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Как к вам обращаться", autoComplete: "name" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 97,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 95,
          columnNumber: 30
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Логин" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: login, onChange: (e) => setLogin(e.target.value), placeholder: "vasya", autoCapitalize: "none", autoCorrect: "off", autoComplete: "username", inputMode: "email" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 102,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[11.5px] text-muted", children: "Без собаки — добавим @chekagent.app сами" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 103,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 100,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted", children: "Пароль" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 107,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "минимум 4 символа", autoComplete: mode === "in" ? "current-password" : "new-password" }, void 0, false, {
            fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
            lineNumber: 108,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        error ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp", children: error }, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 111,
          columnNumber: 22
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", variant: "sage", size: "lg", className: "w-full", disabled: busy, children: busy ? "Секунду…" : mode === "in" ? "Войти" : "Создать и войти" }, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 115,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-6 text-center text-[12px] leading-relaxed text-muted", children: [
        "Поставите на Домой — будут приходить напоминания",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
          fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        "о платежах, покупках и сообщениях в кассе."
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
      lineNumber: 84,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
      lineNumber: 83,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/login.tsx?tsr-split=component",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}
export {
  Login as component
};
