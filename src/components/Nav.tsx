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
      <div className="grid grid-cols-5 items-end h-[62px] px-1 pb-[max(env(safe-area-inset-bottom),7px)]">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)

          if ('center' in item && item.center) {
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={haptic}
                className="group relative flex flex-col items-center justify-end h-full pb-0.5"
                aria-label="Сканировать чек"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'relative -top-2 flex h-[50px] w-[50px] items-center justify-center rounded-2xl bg-sage text-onsage shadow-md transition-all duration-200 group-hover:scale-105',
                    active ? 'ring-2 ring-sage ring-offset-2 ring-offset-paper' : '',
                  )}
                >
                  <ScanLine size={23} strokeWidth={2.2} />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-onsage/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-onsage" />
                  </span>
                </motion.div>
                <span className="h-4 flex items-center justify-center text-[10.5px] font-semibold tracking-tight text-sage">
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
                'relative flex flex-col items-center justify-end h-full pb-0.5 transition-all duration-150',
                active ? 'text-sage' : 'text-muted hover:text-ink',
              )}
              aria-label={item.label}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative mb-0.5 flex h-8 w-11 items-center justify-center rounded-lg"
              >
                {active ? (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-lg bg-sage/12"
                    transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                  />
                ) : null}
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} className="relative z-10" />
              </motion.div>
              <span
                className={cn(
                  'h-4 flex items-center justify-center text-[10.5px] tracking-tight transition-all',
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

