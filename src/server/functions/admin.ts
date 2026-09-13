import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, q1 } from '../db'
import { getLlmConfig, saveLlmConfig } from '../config'

export const getAdminState = createServerFn({ method: 'GET' })
  .handler(async () => guarded(async (user) => {
    if ((user.role || '') !== 'admin') return { isAdmin: false }
    const cfg = await getLlmConfig()
    return {
      isAdmin: true,
      baseUrl: cfg.baseUrl,
      model: cfg.model,
      hasKey: !!cfg.apiKey,
    }
  }))

export const saveLlm = createServerFn({ method: 'POST' })
  .validator((d: { baseUrl?: string; apiKey?: string; model?: string }) => ({
    baseUrl: d.baseUrl === undefined ? undefined : String(d.baseUrl).trim(),
    apiKey: d.apiKey === undefined ? undefined : String(d.apiKey).trim(),
    model: d.model === undefined ? undefined : String(d.model).trim(),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    if ((user.role || '') !== 'admin') return { error: 'Только для админа' }
    await saveLlmConfig({
      baseUrl: data.baseUrl === '' ? undefined : data.baseUrl,
      apiKey: data.apiKey === '' ? undefined : data.apiKey,
      model: data.model === '' ? undefined : data.model,
    })
    const cfg = await getLlmConfig()
    return {
      ok: true,
      hasKey: !!cfg.apiKey,
    }
  }))
