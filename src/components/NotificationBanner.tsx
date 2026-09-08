import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, ChevronRight, CreditCard, Sparkles, Users, X } from 'lucide-react'

export interface BannerPayload {
  id?: string
  title: string
  body: string
  url?: string
  icon?: 'bell' | 'sparkles' | 'card' | 'users'
  duration?: number
}

// Глобальное событие для вызова уведомления из любого места приложения
const NOTIFY_EVENT = 'listok:notification'

export function showInAppNotification(payload: BannerPayload) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NOTIFY_EVENT, { detail: payload }))
  }
}

export function NotificationBanner() {
  const [current, setCurrent] = React.useState<BannerPayload | null>(null)
  const timerRef = React.useRef<any>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleEvent = (e: Event) => {
      const detail = (e as CustomEvent<BannerPayload>).detail
      if (!detail) return

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      setCurrent({ ...detail, id: detail.id || String(Date.now()) })

      const duration = detail.duration || 5000
      timerRef.current = setTimeout(() => {
        setCurrent(null)
      }, duration)
    }

    window.addEventListener(NOTIFY_EVENT, handleEvent)
    return () => {
      window.removeEventListener(NOTIFY_EVENT, handleEvent)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const close = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setCurrent(null)
  }

  const handleClick = () => {
    if (!current) return
    const url = current.url
    close()
    if (url) {
      navigate({ to: url as any })
    }
  }

  const getIcon = () => {
    switch (current?.icon) {
      case 'sparkles':
        return <Sparkles size={16} />
      case 'card':
        return <CreditCard size={16} />
      case 'users':
        return <Users size={16} />
      default:
        return <Bell size={16} />
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(env(safe-area-inset-top),12px)] select-none">
      <AnimatePresence>
        {current ? (
          <motion.div
            key={current.id}
            initial={{ y: -80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            drag="y"
            dragConstraints={{ top: -100, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y < -20 || info.velocity.y < -300) {
                close()
              }
            }}
            className="pointer-events-auto flex w-full max-w-[420px] cursor-pointer items-start justify-between gap-3 rounded-[22px] border border-rule/90 bg-paper/95 p-3.5 shadow-[0_16px_36px_rgba(28,25,21,0.14)] backdrop-blur-2xl transition-shadow active:scale-[0.99]"
            onClick={handleClick}
          >
            {/* Иконка-бейджик */}
            <div className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sage text-onsage shadow-sm">
              {getIcon()}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/60 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
            </div>

            {/* Контент уведомления */}
            <div className="min-w-0 flex-1 pr-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sage">
                  Листок
                </span>
                <span className="text-[10.5px] text-muted">сейчас</span>
              </div>
              <p className="t-display mt-0.5 text-[14px] font-semibold leading-tight text-ink">
                {current.title}
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-muted line-clamp-2">
                {current.body}
              </p>
            </div>

            {/* Кнопка закрытия */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted hover:bg-black/5 hover:text-ink"
              aria-label="Закрыть уведомление"
            >
              <X size={14} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
