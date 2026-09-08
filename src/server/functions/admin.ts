import { createServerFn } from '@tanstack/react-start'
import { q, q1 } from '../db'
import { getLlmConfig, saveLlmConfig } from '../config'
import { guarded } from '../session'

/** Первый человек в системе становится админом — иначе ключ LLM некому вставить. */
async function ensureFirstAdmin(userId: string): Promise<boolean> {
  const row = await q1<{ c: number }>(`SELECT count(*)::int AS c FROM profiles WHERE role = 'admin'`)
  if ((row?.c ?? 0) === 0) {
    await q(`UPDATE profiles SET role = 'admin' WHERE user_id = $1`, [userId])
    return true
  }
  return false
}

export const getAdminState = createServerFn({ method: 'GET' }).handler(async () =>
  guarded(async (user) => {
    if ((user.role || '') !== 'admin') {
      const became = await ensureFirstAdmin(user.id)
      if (!became) return { isAdmin: false as const }
    }
    const cfg = await getLlmConfig()
    return {
      isAdmin: true as const,
      baseUrl: cfg.baseUrl,
      model: cfg.model,
      hasKey: !!cfg.apiKey,
    }
  }),
)

export const saveLlm = createServerFn({ method: 'POST' })
  .validator((d: { baseUrl?: string; apiKey?: string; model?: string }) => ({
    baseUrl: d.baseUrl === undefined ? undefined : String(d.baseUrl).trim(),
    apiKey: d.apiKey === undefined ? undefined : String(d.apiKey).trim(),
    model: d.model === undefined ? undefined : String(d.model).trim(),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if ((user.role || '') !== 'admin') {
        const became = await ensureFirstAdmin(user.id)
        if (!became) return { error: 'Только для админа' } as const
      }
      await saveLlmConfig({
        baseUrl: data.baseUrl === '' ? undefined : data.baseUrl,
        apiKey: data.apiKey === '' ? undefined : data.apiKey,
        model: data.model === '' ? undefined : data.model,
      })
      const cfg = await getLlmConfig()
      return { ok: true as const, hasKey: !!cfg.apiKey }
    }),
  )
