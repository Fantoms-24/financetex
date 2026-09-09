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

const CACHE_BOOT_KEY = 'listok_cache_boot_v2'
const CACHE_USER_KEY = 'listok_cache_user_v2'

function readCachedBoot(): Bootstrap | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_BOOT_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function readCachedUser(): SessionUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeCache(user: SessionUser | null, boot: Bootstrap | null) {
  if (typeof window === 'undefined') return
  try {
    if (user && boot) {
      localStorage.setItem(CACHE_USER_KEY, JSON.stringify(user))
      localStorage.setItem(CACHE_BOOT_KEY, JSON.stringify(boot))
    } else {
      localStorage.removeItem(CACHE_USER_KEY)
      localStorage.removeItem(CACHE_BOOT_KEY)
    }
  } catch {
    /* quota or private browsing */
  }
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

  // 1. Мгновенное восстановление из кэша (0 мс) для уже авторизованных
  React.useEffect(() => {
    const cachedUser = readCachedUser()
    const cachedBoot = readCachedBoot()
    if (cachedUser && cachedBoot) {
      setUser(cachedUser)
      setBoot(cachedBoot)
      setReady(true)
    }
  }, [])

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
      writeCache(null, null)
      return null
    }

    // Boot данных ≤ 2.5 с. Не дождались — остаёмся на кэшированном/пустом bootstrap
    const timeout = new Promise<Bootstrap | null>((resolve) => setTimeout(() => resolve(null), 2500))
    const data = await Promise.race([bootstrapApp().catch(() => null), timeout])
    if (data && data.user) {
      setBoot(data)
      writeCache(me, data)
    }
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

  const setSession = React.useCallback(
    (token: string, u: SessionUser | null) => {
      useLocal.getState().setToken(token, u?.id ?? null)
      setUser(u)
      if (u) {
        load().catch(() => {})
      }
    },
    [load],
  )

  const logout = React.useCallback(async () => {
    try {
      await signOut()
    } catch {
      /* */
    }
    useLocal.getState().setToken(null, null)
    setUser(null)
    setBoot(EMPTY_BOOT)
    writeCache(null, null)
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
