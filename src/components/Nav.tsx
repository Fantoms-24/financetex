import { Link, useRouterState } from '@tanstack/react-router'
import { Home, MessageSquareQuote, Receipt, ScanLine, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '~/lib/utils'

const ITEMS = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/receipts', label: 'Чеки', icon: Receipt },
  { to: '/scan', label: 'Скан', icon: ScanLine, center: true },
  { to: '/groups', label: 'Кассы', icon: Users },
  { to: '/agent', label: 'Агент', icon: MessageSquareQuote },
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
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 select-none"
      aria-label="Основная навигация"
    >
      <div className="mx-auto flex max-w-[430px] items-center justify-between rounded-[22px] border border-rule/80 bg-paper/95 px-2 py-1.5 shadow-paper-lg backdrop-blur-md">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)

          if ('center' in item && item.center) {
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={haptic}
                className="group relative -mt-5 flex flex-col items-center"
                aria-label="Сканировать чек"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-sage text-onsage shadow-md transition-all duration-200 group-hover:scale-105',
                    active ? 'ring-2 ring-sage ring-offset-2 ring-offset-paper' : '',
                  )}
                >
                  <ScanLine size={24} strokeWidth={2.2} />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-onsage/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-onsage" />
                  </span>
                </motion.div>
                <span className="mt-1 text-[10.5px] font-semibold tracking-wide text-sage">Скан</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={haptic}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center rounded-xl py-1 transition-all duration-150',
                active ? 'text-sage' : 'text-muted hover:text-ink',
              )}
              aria-label={item.label}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative flex h-8 w-11 items-center justify-center rounded-lg"
              >
                {active ? (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-lg bg-sage/12"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                ) : null}
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} className="relative z-10" />
              </motion.div>
              <span
                className={cn(
                  'text-[10.5px] tracking-tight transition-all',
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

