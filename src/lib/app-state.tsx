import * as React from 'react'
import { getMe, signOut } from '~/server/functions/auth'
import { bootstrapApp, type Bootstrap } from '~/server/functions/bootstrap'
import type { SessionUser } from '~/server/session'
import { useLocal } from './store'

const EMPTY_BOOT: Bootstrap = {
  user: null,
  settings: { currency: 'RUB', monthly_budget: 45000, monthly_income: 0, allocations: {} },
  month: { key: '', spent: 0, budget: 45000, left: 45000, count: 0, byCategory: [] },
  receipts: [],
  bills: [],
  houses: [],
}

export interface AppStateValue {
  ready: boolean
  user: SessionUser | null
  boot: Bootstrap
  // Профиль может не дойти сразу (например, ещё не создан) — токен при этом
  // жив. Пускаем null: refresh() подтянет профиль следом.
  setSession: (token: string, user: SessionUser | null) => void
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const Ctx = React.createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false)
  const [user, setUser] = React.useState<SessionUser | null>(null)
  const [boot, setBoot] = React.useState<Bootstrap>(EMPTY_BOOT)
  const started = React.useRef(false)

  const load = React.useCallback(async (): Promise<SessionUser | null> => {
    let me: SessionUser | null = null
    try {
      const res = await getMe()
      me = res?.user ?? null
    } catch {
      me = null
    }

    setUser(me)
    if (!me) {
      setBoot(EMPTY_BOOT)
      return null
    }

    // Boot данных ≤ 2.5 с. Не дождались — показываем меню с пустым bootstrap.
    const timeout = new Promise<Bootstrap | null>((resolve) => setTimeout(() => resolve(null), 2500))
    const data = await Promise.race([bootstrapApp().catch(() => EMPTY_BOOT), timeout])
    if (data) setBoot(data)
    return me
  }, [])

  React.useEffect(() => {
    if (started.current) return
    started.current = true
    let alive = true
    ;(async () => {
      await load()
      if (alive) setReady(true)
    })()
    return () => {
      alive = false
    }
  }, [load])

  const setSession = React.useCallback((token: string, u: SessionUser | null) => {
    useLocal.getState().setToken(token, u?.id ?? null)
    setUser(u)
  }, [])

  const logout = React.useCallback(async () => {
    try {
      await signOut()
    } catch {
      /* */
    }
    useLocal.getState().setToken(null, null)
    setUser(null)
    setBoot(EMPTY_BOOT)
  }, [])

  const refresh = React.useCallback(async () => {
    await load()
  }, [load])

  const value = React.useMemo<AppStateValue>(
    () => ({ ready, user, boot, setSession, logout, refresh }),
    [ready, user, boot, setSession, logout, refresh],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppStateValue {
  const v = React.useContext(Ctx)
  if (!v) throw new Error('useApp вне AppStateProvider')
  return v
}
