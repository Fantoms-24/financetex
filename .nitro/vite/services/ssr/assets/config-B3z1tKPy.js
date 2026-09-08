import { a as q } from "./index-Da2oQDqR.js";
async function setConfig(key, value) {
  await q(
    `INSERT INTO app_config (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, value]
  );
}
async function getAllConfig(keys) {
  const rows = await q(
    `SELECT key, value FROM app_config WHERE key = ANY($1::text[])`,
    [keys]
  );
  const map = {};
  for (const k of keys) map[k] = null;
  for (const r of rows) map[r.key] = r.value;
  return map;
}
async function getLlmConfig() {
  const cfg = await getAllConfig(["llm_base_url", "llm_api_key", "llm_model"]);
  return {
    baseUrl: (cfg.llm_base_url || process.env.LLM_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, ""),
    apiKey: cfg.llm_api_key || process.env.LLM_API_KEY || "",
    model: cfg.llm_model || process.env.LLM_MODEL || "gpt-4o-mini"
  };
}
async function saveLlmConfig(c) {
  if (c.baseUrl !== void 0) await setConfig("llm_base_url", c.baseUrl.trim());
  if (c.apiKey !== void 0) await setConfig("llm_api_key", c.apiKey.trim());
  if (c.model !== void 0) await setConfig("llm_model", c.model.trim());
}
export {
  getLlmConfig as g,
  saveLlmConfig as s
};
