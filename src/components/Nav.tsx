import { Link, useRouterState } from '@tanstack/react-router'
import { Home, MessageSquareQuote, Receipt, ScanLine, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '~/lib/utils'

const ITEMS = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/receipts', label: 'Чеки', icon: Receipt },
  { to: '/scan', label: 'Скан', icon: ScanLine, center: true },
  { to: '/groups', label: 'Вместе', icon: Users },
  { to: '/agent', label: 'Чат AI', icon: MessageSquareQuote },
] as const

function haptic() {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(8)
    }
  } catch {
    /* */
  }
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 select-none border-t border-rule/70 bg-paper/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(28,25,21,0.06)]"
      aria-label="Основная навигация"
    >
      <div className="grid grid-cols-5 items-center h-[64px] px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)

          if ('center' in item && item.center) {
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={haptic}
                className="group relative flex flex-col items-center justify-center h-full py-1"
                aria-label="Сканировать чек"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'relative -top-2 flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-sage text-onsage shadow-md transition-all duration-200 group-hover:scale-105',
                    active ? 'ring-2 ring-sage ring-offset-2 ring-offset-paper' : '',
                  )}
                >
                  <ScanLine size={21} strokeWidth={2.2} />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-onsage/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-onsage" />
                  </span>
                </motion.div>
                <span className="-mt-1 text-[10.5px] font-semibold tracking-tight text-sage select-none">
                  Скан
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={haptic}
              className={cn(
                'group relative flex flex-col items-center justify-center h-full py-1 transition-colors',
                active ? 'text-sage' : 'text-muted hover:text-ink',
              )}
              aria-label={item.label}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative flex h-7 w-10 items-center justify-center rounded-lg"
              >
                {active ? (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-lg bg-sage/12"
                    transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                  />
                ) : null}
                <Icon size={19} strokeWidth={active ? 2.3 : 1.8} className="relative z-10" />
              </motion.div>
              <span
                className={cn(
                  'mt-0.5 text-[10.5px] leading-tight select-none tracking-tight transition-all',
                  active ? 'font-semibold text-sage' : 'font-normal text-muted',
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

