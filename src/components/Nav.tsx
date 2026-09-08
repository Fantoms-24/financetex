import { Link, useRouterState } from '@tanstack/react-router'
import { Home, PenLine, Receipt, ScanLine, Users } from 'lucide-react'
import { cn } from '~/lib/utils'

const ITEMS = [
  { to: '/', label: 'Меню', icon: Home },
  { to: '/receipts', label: 'Чеки', icon: Receipt },
  { to: '/scan', label: 'Скан', icon: ScanLine, center: true },
  { to: '/groups', label: 'Кассы', icon: Users },
  { to: '/agent', label: 'Агент', icon: PenLine },
] as const

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-rule bg-paper/95 backdrop-blur-sm"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-[430px] items-end justify-between px-3 pb-2 pt-1.5">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)

          if ('center' in item && item.center) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex w-[68px] shrink-0 flex-col items-center gap-1"
                aria-label="Сканировать чек"
              >
                <span
                  className={cn(
                    'flex h-[52px] w-[52px] items-center justify-center rounded-full bg-sage text-onsage shadow-paper-lg transition-transform',
                    active ? 'scale-100' : 'scale-100 active:scale-95',
                  )}
                >
                  <ScanLine size={23} strokeWidth={2} />
                </span>
                <span className="text-[10px] text-muted">Скан</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex w-[60px] flex-col items-center gap-1 py-1"
              aria-label={item.label}
            >
              <Icon
                size={21}
                strokeWidth={1.8}
                className={active ? 'text-sage' : 'text-muted'}
              />
              <span className={cn('text-[10px]', active ? 'text-sage' : 'text-muted')}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
