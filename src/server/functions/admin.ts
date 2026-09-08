import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, q1 } from '../db'
import { getLlmConfig, saveLlmConfig } from '../config'

async function ensureFirstAdmin(userId: string) {
  const row = await q1<{ c: number }>(`SELECT count(*)::int AS c FROM profiles WHERE role = 'admin'`)
  if ((row?.c ?? 0) === 0) {
    await q(`UPDATE profiles SET role = 'admin' WHERE user_id = $1`, [userId])
    return true
  }
  return false
}

export const getAdminState = createServerFn({ method: 'GET' })
  .handler(async () => guarded(async (user) => {
    if ((user.role || '') !== 'admin') {
      const became = await ensureFirstAdmin(user.id)
      if (!became) return { isAdmin: false }
    }
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
    if ((user.role || '') !== 'admin') {
      const became = await ensureFirstAdmin(user.id)
      if (!became) return { error: 'Только для админа' }
    }
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
