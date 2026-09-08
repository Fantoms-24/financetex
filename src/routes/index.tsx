import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, Files, ScanLine, Users } from 'lucide-react'
import { PushNudge } from '~/components/PushNudge'
import { useApp } from '~/lib/app-state'
import { greeting, money, plural } from '~/lib/format'
import { tickBills } from '~/server/functions/push'

export const Route = createFileRoute('/')({
  component: Menu,
})

function Menu() {
  const { user, boot } = useApp()
  const ticked = React.useRef(false)

  React.useEffect(() => {
    if (ticked.current || !user) return
    ticked.current = true
    // запасной тик — основной идёт кроном
    tickBills().catch(() => {})
  }, [user])

  const budget = boot.settings.monthly_budget || 45000
  const left = budget - boot.month.spent
  const used = Math.min(100, budget > 0 ? Math.round((boot.month.spent / budget) * 100) : 0)
  const daysLeft = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()

  return (
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4">
        <p className="t-display text-[26px] leading-tight">
          {greeting()}, {user?.displayName || 'друг'}
        </p>
      </header>

      {/* остаток бюджета */}
      <section className="receipt-card rise p-5">
        <p className="text-[12px] uppercase tracking-[0.09em] text-muted">
          {daysLeft > 0 ? `ещё на ${daysLeft} ${plural(daysLeft, 'день', 'дня', 'дней')}` : 'месяц на исходе'}
        </p>
        <p className="t-display t-num mt-1 text-[34px] leading-none">{money(left)}</p>

        <div className="mt-4">
          <div className="h-[6px] w-full overflow-hidden rounded-full bg-rule-soft">
            <div
              className="h-full rounded-full bg-sage transition-[width] duration-500"
              style={{ width: `${Math.max(2, used)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[12.5px] text-muted">
            <span>
              потрачено <span className="t-num">{money(boot.month.spent)}</span>
            </span>
            <span className="t-num">из {money(budget)}</span>
          </div>
        </div>
      </section>

      {/* скан */}
      <Link to="/scan" className="scan-cta rise mt-4 flex min-h-[54px] items-center justify-center gap-2 text-[16px] font-medium">
        <ScanLine size={19} strokeWidth={2} />
        Сканировать чек
      </Link>

      {/* стол */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/receipts" className="desk-card rise p-4">
          <Files size={20} strokeWidth={1.8} className="text-sage" />
          <p className="t-display mt-3 text-[17px]">Чеки</p>
          <p className="mt-0.5 text-[12.5px] text-muted">
            {boot.month.count > 0
              ? `${boot.month.count} ${plural(boot.month.count, 'чек', 'чека', 'чеков')} за месяц`
              : 'ящик пока пуст'}
          </p>
        </Link>

        <Link to="/groups" className="desk-card rise p-4">
          <Users size={20} strokeWidth={1.8} className="text-sage" />
          <p className="t-display mt-3 text-[17px]">Кассы</p>
          <p className="mt-0.5 text-[12.5px] text-muted">
            {boot.houses.length > 0 ? `${boot.houses[0].name}` : 'семья и квартира'}
          </p>
        </Link>
      </div>

      <PushNudge />

      {/* тихие строки */}
      <div className="mt-5 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper">
        <Link to="/agent" className="flex min-h-[52px] items-center justify-between px-4">
          <span className="text-[15px]">Агент</span>
          <ChevronRight size={17} className="text-muted" />
        </Link>
        <Link to="/bills" className="flex min-h-[52px] items-center justify-between px-4">
          <span className="text-[15px]">Платежи</span>
          <span className="flex items-center gap-2 text-muted">
            <span className="text-[13px]">
              {boot.bills.length > 0 ? `${boot.bills.length}` : 'нет'}
            </span>
            <ChevronRight size={17} />
          </span>
        </Link>
        <Link to="/settings" className="flex min-h-[52px] items-center justify-between px-4">
          <span className="text-[15px]">Настроить</span>
          <ChevronRight size={17} className="text-muted" />
        </Link>
      </div>
    </div>
  )
}
