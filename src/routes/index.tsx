import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Receipt,
  ScanLine,
  Sparkles,
  TrendingDown,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import { PushNudge } from '~/components/PushNudge'
import { useApp } from '~/lib/app-state'
import { billDueLabel, categoryLabel, dateRu, greeting, money, plural } from '~/lib/format'
import { tickBills } from '~/server/functions/push'
import { cn, haptic } from '~/lib/utils'

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
  const spent = boot.month.spent || 0
  const left = budget - spent
  const used = Math.min(100, budget > 0 ? Math.round((spent / budget) * 100) : 0)

  const now = new Date()
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = Math.max(1, lastDayOfMonth - now.getDate())
  const dailyLeft = Math.max(0, Math.round(left / daysLeft))

  // Текущая дата на русском языке с корректной капитализацией: "Вт, 8 сентября"
  const todayStr = React.useMemo(() => {
    try {
      const d = new Date()
      const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(d)
      const day = d.getDate()
      const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(d)
      const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
      return `${capWeekday}, ${day} ${month.toLowerCase()}`
    } catch {
      return 'Сегодня'
    }
  }, [])

  const initials = (user?.displayName || user?.name || 'U')
    .slice(0, 2)
    .toUpperCase()

  // Активная семейная касса
  const primaryHouse = React.useMemo(() => {
    return boot.houses && boot.houses.length > 0 ? boot.houses[0] : null
  }, [boot.houses])

  // Ближайший неоплаченный регулярный платёж
  const nextBill = React.useMemo(() => {
    if (!boot.bills || boot.bills.length === 0) return null
    const unpaid = boot.bills.filter((b) => !b.paid_cycle)
    if (unpaid.length === 0) return null
    const currentDay = new Date().getDate()
    return [...unpaid].sort((a, b) => {
      const diffA = a.day_of_month >= currentDay ? a.day_of_month - currentDay : a.day_of_month - currentDay + 31
      const diffB = b.day_of_month >= currentDay ? b.day_of_month - currentDay : b.day_of_month - currentDay + 31
      return diffA - diffB
    })[0]
  }, [boot.bills])

  const recentReceipts = React.useMemo(() => {
    return (boot.receipts || []).slice(0, 4)
  }, [boot.receipts])

  return (
    <div className="space-y-4 px-4 pb-36 pt-2 sm:px-5">
      {/* 1. Верхняя панель: Дата, приветствие и аватар */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <Calendar size={13} className="text-sage" />
            <span>{todayStr}</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            {greeting()}, {user?.displayName || user?.name || 'друг'}!
          </h1>
        </div>

        <Link
          to="/settings"
          onClick={() => haptic(8)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-rule/80 bg-paper shadow-paper transition-all hover:scale-105 active:scale-95"
          aria-label="Настройки профиля"
        >
          <span className="text-[13.5px] font-bold text-sage transition-colors group-hover:text-ink">
            {initials}
          </span>
          <span
            className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-emerald-500"
            title="Активен"
          />
        </Link>
      </header>

      {/* 2. Главная Hero-карточка бюджета месяца */}
      <section className="relative overflow-hidden rounded-[24px] border border-rule/80 bg-paper p-5 shadow-paper-lg">
        {/* Декоративное мягкое свечение шалфея */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sage/10 blur-2xl"
        />

        {/* Заголовок карточки и дни */}
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
            Остаток бюджета
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              daysLeft > 3 ? 'bg-sage/12 text-sage' : 'bg-stamp/10 text-stamp',
            )}
          >
            {daysLeft > 1
              ? `ещё ${daysLeft} ${plural(daysLeft, 'день', 'дня', 'дней')}`
              : 'последний день'}
          </span>
        </div>

        {/* Чистая и крупная сумма баланса без слипания */}
        <div className="mt-2.5">
          <p
            className={cn(
              't-display t-num text-[38px] font-semibold leading-none tracking-tight',
              left >= 0 ? 'text-ink' : 'text-stamp',
            )}
          >
            {money(left)}
          </p>
        </div>

        {/* Главный финансовый инсайт дня: Свободно на сегодня */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1 text-[12.5px] font-medium text-sage">
          <Sparkles size={13} className="shrink-0 text-sage" />
          <span>
            Свободно на день: <strong className="t-num font-semibold">{money(dailyLeft)}</strong>
          </span>
        </div>

        {/* Прогресс-бар расхода бюджета */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11.5px] text-muted">
            <span className="font-medium">Расход {used}%</span>
            <span className="t-num font-medium text-muted">Лимит: {money(budget)}</span>
          </div>
          <div className="mt-1.5 h-[7px] w-full overflow-hidden rounded-full bg-rule-soft">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(used > 0 ? 3 : 0, used)}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'h-full rounded-full transition-all',
                used > 90 ? 'bg-stamp' : used > 75 ? 'bg-amber-600' : 'bg-sage',
              )}
            />
          </div>
        </div>

        {/* 3 мини-метрики с табличными цифрами */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-rule/60 pt-3.5">
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <TrendingDown size={12} className="text-sage" /> Потрачено
            </span>
            <span className="t-num mt-0.5 text-[14.5px] font-semibold text-ink">
              {money(spent)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Calendar size={12} className="text-sage" /> До конца
            </span>
            <span className="t-num mt-0.5 text-[14.5px] font-semibold text-ink">
              {daysLeft} дн.
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Receipt size={12} className="text-sage" /> Чеков
            </span>
            <span className="t-num mt-0.5 text-[14.5px] font-semibold text-ink">
              {boot.month.count} шт.
            </span>
          </div>
        </div>
      </section>

      {/* 3. Компактный ряд быстрых действий (Quick Actions) */}
      <div className="grid grid-cols-2 gap-2.5">
        <motion.div whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
          <Link
            to="/scan"
            onClick={() => haptic(8)}
            className="flex min-h-[50px] items-center justify-center gap-2 rounded-[16px] bg-sage px-3.5 py-2.5 text-onsage shadow-sm transition hover:brightness-105"
          >
            <ScanLine size={18} strokeWidth={2.2} />
            <span className="text-[13.5px] font-semibold">Сканировать чек</span>
          </Link>
        </motion.div>

        <motion.div whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
          <Link
            to="/bills"
            onClick={() => haptic(8)}
            className="flex min-h-[50px] items-center justify-center gap-2 rounded-[16px] border border-rule/80 bg-paper px-3.5 py-2.5 text-ink shadow-sm transition hover:bg-white"
          >
            <CreditCard size={17} className="text-sage" />
            <span className="text-[13.5px] font-medium">Платежи ({boot.bills.length})</span>
          </Link>
        </motion.div>
      </div>

      {/* 4. Живые виджеты Inset Grouped: Совместный бюджет и Ближайший счёт */}
      <div className="space-y-2.5">
        {/* Виджет: Совместный бюджет */}
        {primaryHouse ? (
          <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
            <Link
              to="/groups/$id"
              params={{ id: primaryHouse.id }}
              onClick={() => haptic(8)}
              className="group flex items-center justify-between rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper transition hover:border-sage/40"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-sage/12 text-sage">
                  <Users size={20} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                      Совместный бюджет
                    </span>
                    <span className="rounded-full bg-sage/15 px-2 py-0.2 text-[10.5px] font-semibold text-sage">
                      {primaryHouse.members} {plural(primaryHouse.members, 'участник', 'участника', 'участников')}
                    </span>
                  </div>
                  <div className="t-display truncate text-[16px] font-semibold text-ink leading-snug">
                    «{primaryHouse.name}»
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted group-hover:text-sage transition">
                <span className="text-[12.5px] font-medium hidden xs:inline">Бюджет</span>
                <ChevronRight size={17} />
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
            <Link
              to="/groups"
              onClick={() => haptic(8)}
              className="group flex items-center justify-between rounded-[20px] border border-dashed border-rule bg-paper/60 p-4 shadow-sm transition hover:bg-paper hover:border-sage/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-sage/10 text-sage">
                  <Users size={19} />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-ink">Создать общий бюджет</div>
                  <div className="text-[12px] text-muted">Общие траты, чеки и совместные цели</div>
                </div>
              </div>
              <ChevronRight size={17} className="text-muted group-hover:text-sage transition" />
            </Link>
          </motion.div>
        )}

        {/* Виджет: Ближайший счёт */}
        {nextBill ? (
          <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
            <Link
              to="/bills"
              onClick={() => haptic(8)}
              className="group flex items-center justify-between rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper transition hover:border-sage/40"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-sage/12 text-sage">
                  <CreditCard size={20} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                      Ближайший счёт
                    </span>
                    <span className="rounded-full bg-stamp/10 px-2 py-0.2 text-[10.5px] font-semibold text-stamp">
                      {billDueLabel(nextBill.day_of_month).label}
                    </span>
                  </div>
                  <div className="t-display truncate text-[16px] font-semibold text-ink leading-snug">
                    {nextBill.title}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="t-num text-[16px] font-bold text-ink">{money(nextBill.amount)}</div>
                <div className="text-[11px] text-muted">{nextBill.day_of_month}-го числа</div>
              </div>
            </Link>
          </motion.div>
        ) : boot.bills.length > 0 ? (
          <div className="flex items-center justify-between rounded-[18px] border border-rule/70 bg-paper/70 px-4 py-3 text-[13px] text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sage" />
              <span>Все регулярные счета оплачены</span>
            </div>
            <Link to="/bills" onClick={() => haptic(8)} className="text-[12px] font-semibold text-sage hover:underline">
              Счета →
            </Link>
          </div>
        ) : null}
      </div>

      {/* 5. Лента недавних покупок (Recent Transactions / Feed) */}
      <section className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-muted">
            Недавние покупки
          </h2>
          <Link
            to="/receipts"
            onClick={() => haptic(8)}
            className="text-[12px] font-semibold text-sage hover:underline"
          >
            Все чеки ({boot.month.count}) →
          </Link>
        </div>

        {recentReceipts.length > 0 ? (
          <div className="divide-y divide-rule-soft overflow-hidden rounded-[20px] border border-rule/80 bg-paper shadow-paper">
            {recentReceipts.map((rc) => (
              <motion.div key={rc.id} whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <Link
                  to="/receipts"
                  onClick={() => haptic(8)}
                  className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-black/[0.02]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-sage/12 text-sage font-bold text-[14px]">
                      {(rc.store || 'Ч')[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-semibold text-ink">
                        {rc.store || 'Покупка'}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-muted">
                        <span>{dateRu(rc.purchased_at || rc.created_at)}</span>
                        <span>•</span>
                        <span className="truncate">{categoryLabel(rc.category)}</span>
                        {rc.house_name ? (
                          <>
                            <span>•</span>
                            <span className="rounded bg-sage/10 px-1.5 py-0.2 text-[10px] font-medium text-sage">
                              {rc.house_name}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="t-num ml-3 shrink-0 text-[16px] font-bold text-ink">
                    {money(rc.total)}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-rule/80 bg-paper p-6 text-center shadow-paper">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
              <Receipt size={22} />
            </div>
            <p className="t-display mt-2.5 text-[16.5px] font-semibold text-ink">Пока нет расходов в этом месяце</p>
            <p className="mx-auto mt-1 max-w-[270px] text-[12.5px] leading-relaxed text-muted">
              Отсканируйте чек или внесите покупку — здесь сразу появится дневная сводка трат.
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                to="/scan"
                onClick={() => haptic(8)}
                className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-[12.5px] font-semibold text-onsage shadow-xs transition hover:brightness-105 active:scale-95"
              >
                <ScanLine size={15} />
                <span>Отсканировать первый чек</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Напоминание о включении push-уведомлений */}
      <PushNudge />
    </div>

  )
}

