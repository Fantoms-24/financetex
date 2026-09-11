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
  goals: [],
  telegram: { connected: false, username: null },
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
  syncError: string
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
  const [syncError, setSyncError] = React.useState('')
  const started = React.useRef(false)
  const loadSeq = React.useRef(0)

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
    const ticket=++loadSeq.current
    try {
      const res = await getMe()
      if(ticket!==loadSeq.current)return null
      const me = res?.user ?? null
      setUser(me)
      if (!me) {
        setBoot(EMPTY_BOOT)
        writeCache(null, null)
        setSyncError('')
        return null
      }
      const data = await bootstrapApp()
      if(ticket!==loadSeq.current)return null
      if (!data?.user) throw new Error('Не удалось обновить данные')
      setBoot(data)
      writeCache(me, data)
      setSyncError('')
      return me
    } catch (cause) {
      if(ticket!==loadSeq.current)return null
      const message = cause instanceof Error ? cause.message : ''
      const storageUnavailable = /хранилищ|database|DATABASE_URL|pglite|relation .* does not exist/i.test(message)
      setSyncError(typeof navigator !== 'undefined' && !navigator.onLine
        ? 'Вы не в сети. Показаны последние данные; новый расход можно сохранить как черновик.'
        : storageUnavailable
          ? 'Не удалось подключиться к хранилищу данных. Проверьте настройки базы в развёрнутом приложении.'
        : 'Не удалось обновить данные. Последние сохранённые данные остаются на экране.')
      return readCachedUser()
    }
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

  React.useEffect(() => {
    const retry = () => { void load() }
    window.addEventListener('online', retry)
    return () => window.removeEventListener('online', retry)
  }, [load])

  const setSession = React.useCallback(
    (token: string, u: SessionUser | null) => {
      useLocal.getState().setToken(token, u?.id ?? null)
      setBoot(EMPTY_BOOT)
      writeCache(null,null)
      setUser(u)
      if (u) {
        load().catch(() => {})
      }
    },
    [load],
  )

  const logout = React.useCallback(async () => {
    loadSeq.current++
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
    () => ({ ready, user, boot, setSession, logout, refresh, syncError }),
    [ready, user, boot, setSession, logout, refresh, syncError],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppStateValue {
  const v = React.useContext(Ctx)
  if (!v) throw new Error('useApp вне AppStateProvider')
  return v
}
