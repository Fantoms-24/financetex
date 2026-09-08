import { c as createLucideIcon, b as createSsrRpc, e as useNavigate, u as useApp, j as jsxDevRuntimeExports } from "./router-jILV0Ki5.js";
import { c as createServerFn, r as reactExports } from "../server.js";
import { B as Button } from "./button-DVEG0ewd.js";
import { b as moneyShort, c as categoryLabel } from "./format-I651YhAt.js";
import "./tick-CZ14g1aT.js";
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
const __iconNode$3 = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$2);
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const scanReceipt = createServerFn({
  method: "POST"
}).validator((d) => ({
  image: String(d.image || "")
})).handler(createSsrRpc("a386805ff732ab7bb95a52410c227d70447a02555557035cf81d2d1c8af1990e"));
async function compressImage(file, maxSide = 1100, quality = 0.72) {
  const dataUrl = await readAsDataUrl(file);
  try {
    const img = await loadImage(dataUrl);
    const {
      width,
      height
    } = img;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    if (scale === 1 && file.size < 3e5) return dataUrl;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } catch {
    return dataUrl;
  }
}
function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("read"));
    reader.readAsDataURL(file);
  });
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image"));
    img.src = src;
  });
}
const VERDICT = {
  good: "норма",
  fair: "терпимо",
  overpriced: "дорого",
  impulse: "импульс"
};
function Scan() {
  const navigate = useNavigate();
  const {
    refresh
  } = useApp();
  const cameraRef = reactExports.useRef(null);
  const galleryRef = reactExports.useRef(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  async function pick(file) {
    if (!file) return;
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      setPreview(await compressImage(file));
    } catch {
      setError("Не получилось прочитать фото");
    } finally {
      setBusy(false);
    }
  }
  async function run() {
    if (!preview) return;
    setBusy(true);
    setError(null);
    try {
      const res = await scanReceipt({
        data: {
          image: preview
        }
      });
      if (res?.error) {
        setError(res.error);
        setBusy(false);
        return;
      }
      setResult(res);
      await refresh();
    } catch (e) {
      setError(e?.message || "Не получилось разобрать");
    } finally {
      setBusy(false);
    }
  }
  function reset() {
    setPreview(null);
    setResult(null);
    setError(null);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 pb-8 pt-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "t-display text-[26px] leading-none", children: "Скан" }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-[13px] text-muted", children: result ? "чек разобран" : "положите чек на ровное место" }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { ref: cameraRef, type: "file", accept: "image/*", capture: "environment", className: "hidden", onChange: (e) => pick(e.target.files?.[0]) }, void 0, false, {
      fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
      lineNumber: 111,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { ref: galleryRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => pick(e.target.files?.[0]) }, void 0, false, {
      fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
      lineNumber: 112,
      columnNumber: 7
    }, this),
    !preview ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "receipt-card rise flex min-h-[300px] flex-col items-center justify-center px-6 py-10 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-5 flex h-full w-full min-h-[190px] items-center justify-center rounded-[10px] border-2 border-dashed border-rule", style: {
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 28px, rgba(28,25,21,0.05) 28px 29px)"
      }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "t-display text-[15px] text-muted", children: "бумажный планшет" }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 118,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid w-full grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "md", onClick: () => cameraRef.current?.click(), children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Camera, { size: 18 }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 123,
            columnNumber: 15
          }, this),
          " Камера"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "md", onClick: () => galleryRef.current?.click(), children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ImagePlus, { size: 18 }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 126,
            columnNumber: 15
          }, this),
          " Галерея"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-4 text-[12.5px] leading-snug text-muted", children: "Не читается? Впишите чек руками в ящике." }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 130,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
      lineNumber: 114,
      columnNumber: 19
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "slip rise overflow-hidden p-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: preview, alt: "чек", className: "w-full rounded-[6px]" }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 135,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 134,
        columnNumber: 11
      }, this),
      result ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "receipt-card rise p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-display truncate text-[18px]", children: result.receipt?.store || result.store }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 140,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num text-[18px]", children: moneyShort(result.receipt?.total || result.total) }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 141,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 139,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-[12.5px] text-muted", children: [
          categoryLabel(result.receipt?.category || result.category),
          result.receipt?.verdict || result.verdict ? ` · ${VERDICT[result.receipt?.verdict || result.verdict] || result.receipt?.verdict || result.verdict}` : ""
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 143,
          columnNumber: 15
        }, this),
        (result.items ?? []).length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "rule mt-3 space-y-1 pt-3", children: (result.items ?? []).map((it, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-baseline justify-between gap-3 text-[13.5px]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "min-w-0 truncate", children: [
            it.name,
            it.qty ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted", children: [
              " ×",
              it.qty
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
              lineNumber: 152,
              columnNumber: 35
            }, this) : null
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 150,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "t-num shrink-0", children: moneyShort(it.price) }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 154,
            columnNumber: 23
          }, this)
        ] }, i, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 149,
          columnNumber: 69
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 148,
          columnNumber: 50
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", onClick: reset, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
              fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
              lineNumber: 160,
              columnNumber: 19
            }, this),
            " Ещё чек"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 159,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", onClick: () => navigate({
            to: "/receipts"
          }), children: "В ящик" }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 162,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 158,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 138,
        columnNumber: 21
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "paper", size: "lg", onClick: reset, disabled: busy, children: "Другое фото" }, void 0, false, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 169,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "sage", size: "lg", onClick: run, disabled: busy, children: [
          busy ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { size: 18, className: "animate-spin" }, void 0, false, {
            fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
            lineNumber: 173,
            columnNumber: 25
          }, this) : null,
          busy ? "Разбираю…" : "Разобрать чек"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
          lineNumber: 172,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 168,
        columnNumber: 22
      }, this),
      error ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2.5 text-[13px] text-stamp", children: error }, void 0, false, {
        fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
        lineNumber: 178,
        columnNumber: 20
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
      lineNumber: 133,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/scan.tsx?tsr-split=component",
    lineNumber: 103,
    columnNumber: 10
  }, this);
}
export {
  Scan as component
};
