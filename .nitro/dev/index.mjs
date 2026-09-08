globalThis.__nitro_main__ = import.meta.url; globalThis.__nitro_main__ = import.meta.url;
import { Server } from "node:http";
import nodeCrypto from "node:crypto";
import { parentPort, threadId } from "node:worker_threads";
import { FastResponse, toNodeHandler } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/node_modules/srvx/dist/adapters/node.mjs";
import { isSocketSupported, getSocketAddress } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/get-port-please/dist/index.mjs";
import { getRequestURL, defineHandler, HTTPError, toEventHandler, defineLazyEventHandler, H3Core, toRequest, H3 } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/h3/dist/_entries/node.mjs";
import { createHooks } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/hookable/dist/index.mjs";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import consola from "file://C:/Users/vasya/Desktop/New-Project/node_modules/consola/dist/index.mjs";
import { ErrorParser } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/youch-core/build/index.js";
import { Youch } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/youch/build/index.js";
import { SourceMapConsumer } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/source-map/source-map.js";
import { decodePath, withLeadingSlash, withoutTrailingSlash, joinURL } from "file://C:/Users/vasya/Desktop/New-Project/node_modules/nitro/dist/node_modules/ufo/dist/index.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
function defineNitroErrorHandler(handler) {
  return handler;
}
const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    return new FastResponse(
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2),
      res
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled;
  const status = error.status || 500;
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (status === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.req.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !event.req.headers.get("accept")?.includes("text/html");
  const headers2 = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (status === 404 || !event.res.headers.has("cache-control")) {
    headers2["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    status,
    statusText: error.statusText,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.req.method,
      headers: Object.fromEntries(event.req.headers.entries())
    }
  });
  return {
    status,
    statusText: error.statusText,
    headers: headers2,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}
const errorHandlers = [errorHandler$0];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const plugins = [];
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
const assets = {
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": '"1e66-UOzAM1Gb1vx5Q/ZSvUGgpB0qBiA"',
    "mtime": "2026-09-04T00:07:18.998Z",
    "size": 7782,
    "path": "apple-touch-icon.png"
  },
  "/icon-192.png": {
    "type": "image/png",
    "etag": '"20ef-y8KTWvBjihLREVxMwCNuHaKk0Es"',
    "mtime": "2026-09-04T00:07:18.234Z",
    "size": 8431,
    "path": "icon-192.png"
  },
  "/icon-512.png": {
    "type": "image/png",
    "etag": '"aadf-zjoyi1uDac09L43OuilIEcF2/oQ"',
    "mtime": "2026-09-04T00:07:18.612Z",
    "size": 43743,
    "path": "icon-512.png"
  },
  "/icon-maskable-512.png": {
    "type": "image/png",
    "etag": '"5422-tgw6wZf+7rW7XG7egDG5CLulOeE"',
    "mtime": "2026-09-04T00:07:18.950Z",
    "size": 21538,
    "path": "icon-maskable-512.png"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"4ee-M9m50SYNJUARrPHFYuHWJtRZkgo"',
    "mtime": "2026-09-04T00:07:38.799Z",
    "size": 1262,
    "path": "manifest.webmanifest"
  },
  "/sw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1300-P3Zzcy48X/WZNL+2bIXjDsYMrxI"',
    "mtime": "2026-09-07T20:35:17.752Z",
    "size": 4864,
    "path": "sw.js"
  },
  "/assets/admin-Beip_XZQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"cfd-i2o0LpOICnyPYdk+RRVlEQJvtnY"',
    "mtime": "2026-09-07T20:38:26.807Z",
    "size": 3325,
    "path": "assets/admin-Beip_XZQ.js"
  },
  "/assets/admin-wXlpCzWd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"113-34v93QeFoHKCtrtYOc1uer3p3pc"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 275,
    "path": "assets/admin-wXlpCzWd.js"
  },
  "/assets/agent-DZpjks-R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"cf2-GEC3wZVqljL0JZ8YRxFSrvpQNgI"',
    "mtime": "2026-09-07T20:38:26.807Z",
    "size": 3314,
    "path": "assets/agent-DZpjks-R.js"
  },
  "/assets/bills-6HHAJn6X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13ed-1OGGtITeSmHUs1gWrhR+fa0+Ar4"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 5101,
    "path": "assets/bills-6HHAJn6X.js"
  },
  "/assets/button-FHMY_M2p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11cf-Uuw4ySdno/OU83ELUYCc7G0b4m0"',
    "mtime": "2026-09-07T20:38:26.889Z",
    "size": 4559,
    "path": "assets/button-FHMY_M2p.js"
  },
  "/assets/check-MUL-eUOe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"78-Dz2F0nyAhcyED6ePJYZlsqUVlt4"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 120,
    "path": "assets/check-MUL-eUOe.js"
  },
  "/assets/chevron-left-BEW30dbx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-rAjhonq2ThIByuRwahggUGdrpG0"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 131,
    "path": "assets/chevron-left-BEW30dbx.js"
  },
  "/assets/chevron-right-DbuXDdMX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-s9hlOJzMzAMF52uGdReUjW/7duM"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 131,
    "path": "assets/chevron-right-DbuXDdMX.js"
  },
  "/assets/format-DCooEb0f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"695-Ooi9m0wmZx/h++z9TBVyQ3so2gs"',
    "mtime": "2026-09-07T20:38:26.847Z",
    "size": 1685,
    "path": "assets/format-DCooEb0f.js"
  },
  "/assets/groups-DPDTFW3I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"123c-ChNiot7YZsqyblkXpbmE4Y0Fe70"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 4668,
    "path": "assets/groups-DPDTFW3I.js"
  },
  "/assets/groups._id-C9Hg8D5W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d6-Z6eyANmk/+eV9WJDv07I7ZLdYYM"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 12758,
    "path": "assets/groups._id-C9Hg8D5W.js"
  },
  "/assets/houses-CyawuFND.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6d3-0iHlcVEuEGDEShdtLcwxYoZUMFU"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 1747,
    "path": "assets/houses-CyawuFND.js"
  },
  "/assets/index-BHHIIx0z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"59bce-OfbggzDnTByHzJdYtKnfoA7QIf0"',
    "mtime": "2026-09-07T20:38:26.807Z",
    "size": 367566,
    "path": "assets/index-BHHIIx0z.js"
  },
  "/assets/index-Bq0bktSM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1667-v3tCkW/YNIGqz+Mf++FDvtpsYcc"',
    "mtime": "2026-09-07T20:38:26.807Z",
    "size": 5735,
    "path": "assets/index-Bq0bktSM.js"
  },
  "/assets/index-b_8VcDGU.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"a01c-hvzsChSkhBXALirksgI2H/7qYog"',
    "mtime": "2026-09-07T20:38:26.785Z",
    "size": 40988,
    "path": "assets/index-b_8VcDGU.css"
  },
  "/assets/input-DKAS6M9c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-ZyF4AWxHripYf/utWaISHP+KmI8"',
    "mtime": "2026-09-07T20:38:26.868Z",
    "size": 337,
    "path": "assets/input-DKAS6M9c.js"
  },
  "/assets/login-ClVeXUgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1561-DREXRoq4ZGbpx2yjcJbxGe9t33Q"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 5473,
    "path": "assets/login-ClVeXUgJ.js"
  },
  "/assets/plus-DZMlfQSJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-2vWuMKOl+a5dFnWEXWKX7IkJ37k"',
    "mtime": "2026-09-07T20:38:26.827Z",
    "size": 154,
    "path": "assets/plus-DZMlfQSJ.js"
  },
  "/assets/receipts-B1KJ2jbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16fb-sAzDxUVLOcgl+BattB69kver5To"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 5883,
    "path": "assets/receipts-B1KJ2jbL.js"
  },
  "/assets/scan-CyaOi8c0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15fb-E7CqaB4QJ7lYhYYORb4uCc8nByI"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 5627,
    "path": "assets/scan-CyaOi8c0.js"
  },
  "/assets/send-DgYi9Gcs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"123-jFN7YOBWhzPdyf7xagucEReC1B4"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 291,
    "path": "assets/send-DgYi9Gcs.js"
  },
  "/assets/settings-BlRSSyCq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16d0-h4UfklqaqV2+rQ3ZY9sKuQf2ZbM"',
    "mtime": "2026-09-07T20:38:26.826Z",
    "size": 5840,
    "path": "assets/settings-BlRSSyCq.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _8D9ZqR = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(event.url.pathname))
  );
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = (m, p) => {
  let r = [];
  if (p[p.length - 1] === "/") p = p.slice(0, -1) || "/";
  if (p === "/sw.js") {
    r.unshift({ data: [{ name: "headers", route: "/sw.js", handler: headers, options: { "Service-Worker-Allowed": "/", "Cache-Control": "public, max-age=0, must-revalidate" } }] });
  }
  let s = p.split("/");
  s.length - 1;
  if (s[1] === "assets") {
    r.unshift({ data: [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }], params: { "_": s.slice(2).join("/") } });
  }
  return r;
};
const _lazy_pnQHiY = defineLazyEventHandler(() => Promise.resolve().then(function() {
  return devTasks$1;
}));
const _lazy_HruxXc = defineLazyEventHandler(() => Promise.resolve().then(function() {
  return ssrRenderer$1;
}));
const findRoute = (m, p) => {
  if (p[p.length - 1] === "/") p = p.slice(0, -1) || "/";
  let s = p.split("/");
  s.length - 1;
  if (s[1] === "_nitro") {
    if (s[2] === "tasks") {
      return { data: { route: "/_nitro/tasks/**", handler: _lazy_pnQHiY }, params: { "_": s.slice(3).join("/") } };
    }
  }
  return { data: { route: "/**", handler: _lazy_HruxXc }, params: { "_": s.slice(1).join("/") } };
};
const findRoutedMiddleware = (m, p) => {
  return [];
};
const globalMiddleware = [toEventHandler(_8D9ZqR)];
function useNitroApp() {
  return useNitroApp.__instance__ ??= initNitroApp();
}
function initNitroApp() {
  const nitroApp2 = createNitroApp();
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
  return nitroApp2;
}
function createNitroApp() {
  const hooks = createHooks();
  const captureError = (error, errorCtx) => {
    const promise = hooks.callHookParallel("error", error, errorCtx).catch((hookError) => {
      console.error("Error while capturing another error", hookError);
    });
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
      if (typeof errorCtx.event.req.waitUntil === "function") {
        errorCtx.event.req.waitUntil(promise);
      }
    }
  };
  const h3App = createH3App(captureError);
  let fetchHandler = async (req) => {
    req.context ??= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    const event = { req };
    const nitroApp2 = useNitroApp();
    await nitroApp2.hooks.callHook("request", event).catch((error) => {
      captureError(error, { event, tags: ["request"] });
    });
    const response = await h3App.request(req, void 0, req.context);
    await nitroApp2.hooks.callHook("response", response, event).catch((error) => {
      captureError(error, { event, tags: ["request", "response"] });
    });
    return response;
  };
  const requestHandler = (input, init, context) => {
    const req = toRequest(input, init);
    req.context = { ...req.context, ...context };
    return Promise.resolve(fetchHandler(req));
  };
  const originalFetch = globalThis.fetch;
  const nitroFetch = (input, init) => {
    if (typeof input === "string" && input.startsWith("/")) {
      return requestHandler(input, init);
    }
    if (input instanceof Request && "_request" in input) {
      input = input._request;
    }
    return originalFetch(input, init);
  };
  globalThis.fetch = nitroFetch;
  const app = {
    _h3: h3App,
    hooks,
    fetch: requestHandler,
    captureError
  };
  return app;
}
function createH3App(captureError) {
  const DEBUG_MODE = ["1", "true", "TRUE"].includes("true");
  const h3App = new H3Core({
    debug: DEBUG_MODE,
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    }
  });
  h3App._findRoute = (event) => findRoute(event.req.method, event.url.pathname);
  h3App._getMiddleware = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const { routeRules, routeRuleMiddleware } = getRouteRules(method, pathname);
    event.context.routeRules = routeRules;
    return [
      ...routeRuleMiddleware,
      ...globalMiddleware,
      ...findRoutedMiddleware().map((r) => r.data),
      ...route?.data?.middleware || []
    ].filter(Boolean);
  };
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = { ...currentRule.options, ...rule.options };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = { ...currentRule.params, ...layer.params };
      } else if (rule.options !== false) {
        routeRules[rule.name] = { ...rule, params: layer.params };
      }
    }
  }
  const middleware = [];
  for (const rule of Object.values(routeRules)) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
const scheduledTasks = false;
const tasks = {};
const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw new HTTPError({
      message: `Task \`${name}\` is not available!`,
      status: 404
    });
  }
  if (!tasks[name].resolve) {
    throw new HTTPError({
      message: `Task \`${name}\` is not implemented!`,
      status: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeHandler(nitroApp.fetch));
let listener;
listen().catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
async function listen() {
  const listenAddr = await isSocketSupported() ? getSocketAddress({
    name: `nitro-dev-${threadId}`,
    pid: true,
    random: true
  }) : { port: 0, host: "localhost" };
  return new Promise((resolve2, reject) => {
    try {
      listener = server.listen(listenAddr, () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve2();
      });
    } catch (error) {
      reject(error);
    }
  });
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve2) => listener?.close(resolve2)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}
const devTasks = new H3().get("/_nitro/tasks", async () => {
  const _tasks = await Promise.all(
    Object.entries(tasks).map(async ([name, task]) => {
      const _task = await task.resolve?.();
      return [name, { description: _task?.meta?.description }];
    })
  );
  return {
    tasks: Object.fromEntries(_tasks),
    scheduledTasks
  };
}).get("/_nitro/tasks/:name", async (event) => {
  const name = event.context.params?.name;
  const body = await event.req.json().catch(() => ({}));
  const payload = {
    ...Object.fromEntries(event.url.searchParams.entries()),
    ...body
  };
  return await runTask(name, { payload });
});
const devTasks$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: devTasks
});
function ssrRenderer({ req }) {
  return fetch(req, { viteEnv: "ssr" });
}
const ssrRenderer$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: ssrRenderer
});
