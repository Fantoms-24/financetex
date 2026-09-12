import { q } from './db'

export async function setConfig(key: string, value: string): Promise<void> {
  await q(
    `INSERT INTO app_config (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, value]
  )
}

export async function getAllConfig(keys: string[]): Promise<Record<string, string | null>> {
  const rows = await q<{ key: string; value: string | null }>(
    `SELECT key, value FROM app_config WHERE key = ANY($1::text[])`,
    [keys]
  )
  const map: Record<string, string | null> = {}
  for (const k of keys) map[k] = null
  for (const r of rows) map[r.key] = r.value
  return map
}

export interface LlmEndpointConfig {
  baseUrl: string
  apiKey: string
  model: string
}

export interface FullLlmConfig {
  primary: LlmEndpointConfig
  fallback: LlmEndpointConfig
}

export async function getFullLlmConfig(): Promise<FullLlmConfig> {
  const cfg = await getAllConfig([
    'llm_base_url',
    'llm_api_key',
    'llm_model',
    'llm_fallback_base_url',
    'llm_fallback_api_key',
    'llm_fallback_model',
  ])
  return {
    primary: {
      baseUrl: (cfg.llm_base_url || process.env.LLM_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/+$/, ''),
      apiKey: cfg.llm_api_key || process.env.LLM_API_KEY || '',
      model: cfg.llm_model || process.env.LLM_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    },
    fallback: {
      baseUrl: (cfg.llm_fallback_base_url || process.env.LLM_FALLBACK_BASE_URL || 'https://api.z.ai/api/paas/v4').replace(/\/+$/, ''),
      apiKey: cfg.llm_fallback_api_key || process.env.LLM_FALLBACK_API_KEY || 'c5cf2fac309a48cf92d10c2f4174be42.yMhiWvkCyTzPNwLo',
      model: cfg.llm_fallback_model || process.env.LLM_FALLBACK_MODEL || 'GLM-4.6V-Flash',
    },
  }
}

export async function getLlmConfig(): Promise<LlmEndpointConfig> {
  const full = await getFullLlmConfig()
  return full.primary
}

export async function saveLlmConfig(c: {
  baseUrl?: string
  apiKey?: string
  model?: string
  fallbackBaseUrl?: string
  fallbackApiKey?: string
  fallbackModel?: string
}): Promise<void> {
  if (c.baseUrl !== undefined) await setConfig('llm_base_url', c.baseUrl.trim())
  if (c.apiKey !== undefined) await setConfig('llm_api_key', c.apiKey.trim())
  if (c.model !== undefined) await setConfig('llm_model', c.model.trim())
  if (c.fallbackBaseUrl !== undefined) await setConfig('llm_fallback_base_url', c.fallbackBaseUrl.trim())
  if (c.fallbackApiKey !== undefined) await setConfig('llm_fallback_api_key', c.fallbackApiKey.trim())
  if (c.fallbackModel !== undefined) await setConfig('llm_fallback_model', c.fallbackModel.trim())
}
