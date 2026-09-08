import { a as createMiddleware } from "../server.js";
import { u as useLocal } from "./store-BVRg5jbE.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
    }
  }
}
var createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(deduped, options.serializationAdapters);
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
const startInstance = createStart(() => ({
  serverFns: {
    fetch: (input, init) => {
      try {
        const token = useLocal.getState().token;
        if (token) {
          const headers = new Headers(init?.headers);
          headers.set("Authorization", `Bearer ${token}`);
          return fetch(input, { ...init, headers });
        }
      } catch {
      }
      return fetch(input, init);
    }
  }
}));
export {
  startInstance
};
