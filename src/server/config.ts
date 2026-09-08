import { q, q1 } from './db'

export async function getConfig(key: string): Promise<string | null> {
  const row = await q1<{ value: string }>(`SELECT value FROM app_config WHERE key = $1`, [key])
  return row?.value ?? null
}

export async function setConfig(key: string, value: string) {
  await q(
    `INSERT INTO app_config (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, value],
  )
}

export async function getAllConfig(keys: Array<string>): Promise<Record<string, string | null>> {
  const rows = await q<{ key: string; value: string }>(
    `SELECT key, value FROM app_config WHERE key = ANY($1::text[])`,
    [keys],
  )
  const map: Record<string, string | null> = {}
  for (const k of keys) map[k] = null
  for (const r of rows) map[r.key] = r.value
  return map
}

export interface LlmConfig {
  baseUrl: string
  apiKey: string
  model: string
}

export async function getLlmConfig(): Promise<LlmConfig> {
  const cfg = await getAllConfig(['llm_base_url', 'llm_api_key', 'llm_model'])
  return {
    baseUrl: (cfg.llm_base_url || process.env.LLM_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, ''),
    apiKey: cfg.llm_api_key || process.env.LLM_API_KEY || '',
    model: cfg.llm_model || process.env.LLM_MODEL || 'gpt-4o-mini',
  }
}

export async function saveLlmConfig(c: Partial<LlmConfig>) {
  if (c.baseUrl !== undefined) await setConfig('llm_base_url', c.baseUrl.trim())
  if (c.apiKey !== undefined) await setConfig('llm_api_key', c.apiKey.trim())
  if (c.model !== undefined) await setConfig('llm_model', c.model.trim())
}
