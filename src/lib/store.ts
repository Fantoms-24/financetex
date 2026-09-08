import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Только локальные настройки отображения. Данные — с сервера. */
export interface LocalState {
  token: string | null
  userId: string | null
  compactDays: boolean
  showNotes: boolean
  lastRoute: string
  setToken: (t: string | null, userId?: string | null) => void
  toggleCompact: () => void
  toggleNotes: () => void
  setLastRoute: (r: string) => void
}

export const useLocal = create<LocalState>()(
  persist(
    (set, get) => ({
      token: null,
      userId: null,
      compactDays: false,
      showNotes: true,
      lastRoute: '/',
      setToken: (t, userId) => set({ token: t, userId: userId ?? get().userId }),
      toggleCompact: () => set({ compactDays: !get().compactDays }),
      toggleNotes: () => set({ showNotes: !get().showNotes }),
      setLastRoute: (r) => set({ lastRoute: r }),
    }),
    { name: 'chekagent-v7' },
  ),
)
