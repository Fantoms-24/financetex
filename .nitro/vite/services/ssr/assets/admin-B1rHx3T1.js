import { b as createSsrRpc } from "./router-BzCAX3yA.js";
import { c as createServerFn } from "../server.js";
const getAdminState = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f9e281fd18d4b9142de9f5cf5e4d11ef494a7e0fd7c5cfad849e466a1940b406"));
const saveLlm = createServerFn({
  method: "POST"
}).validator((d) => ({
  baseUrl: d.baseUrl === void 0 ? void 0 : String(d.baseUrl).trim(),
  apiKey: d.apiKey === void 0 ? void 0 : String(d.apiKey).trim(),
  model: d.model === void 0 ? void 0 : String(d.model).trim()
})).handler(createSsrRpc("54902348e78831e3b0fb09c978db9c79dbd4e1cc95c3e765ba7bbacf91713e78"));
export {
  getAdminState as g,
  saveLlm as s
};
