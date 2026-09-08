import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Receipt,
  ScanLine,
  Sparkles,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import { PushNudge } from '~/components/PushNudge'
import { useApp } from '~/lib/app-state'
import { billDueLabel, categoryLabel, dateRu, dayKey, greeting, money, plural } from '~/lib/format'
import { tickBills } from '~/server/functions/push'
import { cn, haptic } from '~/lib/utils'

export const Route = createFileRoute('/')({
  component: Menu,
})

interface DayGroup {
  key: string
  title: string
  isToday: boolean
  isYesterday: boolean
  total: number
  items: Array<{
    id: string
    store: string | null
    purchased_at: string | null
    total: number
    category: string
    verdict: string | null
    note: string | null
    image: string | null
    house_id?: string | null
    house_name?: string | null
    created_at: string
  }>
}

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

  // Текущая дата на русском языке: "Вторник, 8 сентября"
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

  // Активная группа «Вместе»
  const primaryHouse = React.useMemo(() => {
    return boot.houses && boot.houses.length > 0 ? boot.houses[0] : null
  }, [boot.houses])

  // Ближайший неоплаченный счёт (показываем только если он требует внимания)
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

  // Группировка трат по календарным дням с микро-итогами
  const groupedReceipts = React.useMemo(() => {
    if (!boot.receipts || boot.receipts.length === 0) return []

    const nowDate = new Date()
    const todayKey = dayKey(nowDate)
    const yesterdayKey = dayKey(new Date(nowDate.getTime() - 86400000))

    const groupsMap = new Map<string, typeof boot.receipts>()
    // Берём последние 10 чеков для легкой домашней ленты
    const list = boot.receipts.slice(0, 10)

    for (const rc of list) {
      const dateVal = rc.purchased_at || rc.created_at
      const k = dayKey(dateVal)
      const arr = groupsMap.get(k) || []
      arr.push(rc)
      groupsMap.set(k, arr)
    }

    const groups: DayGroup[] = []
    groupsMap.forEach((items, k) => {
      const isToday = k === todayKey
      const isYesterday = k === yesterdayKey
      const dt = new Date(items[0].purchased_at || items[0].created_at)

      let title = 'Сегодня'
      if (isYesterday) {
        title = 'Вчера'
      } else if (!isToday) {
        try {
          const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(dt)
          const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
          const dayMonth = dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
          title = `${capWeekday}, ${dayMonth}`
        } catch {
          title = dateRu(dt)
        }
      }

      const total = items.reduce((acc, it) => acc + (Number(it.total) || 0), 0)
      groups.push({
        key: k,
        title,
        isToday,
        isYesterday,
        total,
        items,
      })
    })

    // Показываем максимум 2-3 последних дня, чтобы не превращать экран в бесконечную простыню
    return groups.slice(0, 3)
  }, [boot.receipts])

  const hasTodayExpenses = React.useMemo(() => {
    return groupedReceipts.some((g) => g.isToday)
  }, [groupedReceipts])

  return (
    <div className="space-y-6 px-4 pb-36 pt-3 sm:px-5">
      {/* 1. Спокойная шапка: дата, приветствие и аватар */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <Calendar size={13} className="text-sage" />
            <span>{todayStr}</span>
          </div>
          <h1 className="t-display mt-0.5 text-[24px] font-semibold leading-tight text-ink">
            {greeting()}, {user?.displayName || user?.name || 'друг'}
          </h1>
        </div>

        <Link
          to="/settings"
          onClick={() => haptic(8)}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-rule/60 bg-paper shadow-paper transition-all hover:scale-105 active:scale-95"
          aria-label="Настройки профиля"
        >
          <span className="text-[13px] font-bold text-sage transition-colors group-hover:text-ink">
            {initials}
          </span>
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-emerald-500"
            title="В сети"
          />
        </Link>
      </header>

      {/* 2. Главная карточка: Единый фокус — «Свободно на сегодня» */}
      <section className="relative overflow-hidden rounded-[24px] border border-rule/70 bg-paper p-5 shadow-paper-lg">
        {/* Деликатное фоновое свечение шалфея */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sage/8 blur-2xl"
        />

        {/* Заголовок фокуса дня */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-sage">
            <Sparkles size={13} className="shrink-0 text-sage" />
            <span>Свободно на сегодня</span>
          </span>
          <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-semibold text-sage">
            ещё {daysLeft} {plural(daysLeft, 'день', 'дня', 'дней')}
          </span>
        </div>

        {/* Единственная доминирующая главная цифра */}
        <div className="mt-2">
          <p
            className={cn(
              't-display t-num text-[40px] font-bold leading-none tracking-tight',
              dailyLeft > 0 ? 'text-ink' : 'text-stamp',
            )}
          >
            {money(dailyLeft)}
          </p>
        </div>

        {/* Мягкая ненавязчивая строка контекста месяца */}
        <p className="mt-2 text-[13px] text-muted">
          Остаток на месяц: <strong className="t-num font-semibold text-ink/80">{money(left)}</strong>
        </p>

        {/* Тонкий минималистичный прогресс-бар */}
        <div className="mt-4">
          <div className="h-[5px] w-full overflow-hidden rounded-full bg-rule-soft">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(used > 0 ? 2 : 0, used)}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'h-full rounded-full transition-all',
                used > 90 ? 'bg-stamp' : used > 75 ? 'bg-amber-600' : 'bg-sage',
              )}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-muted">
            <span>Расход {used}% ({money(spent)})</span>
            <span className="t-num">Лимит: {money(budget)}</span>
          </div>
        </div>
      </section>

      {/* 3. Единая главная кнопка действия: Скан чека */}
      <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
        <Link
          to="/scan"
          onClick={() => haptic(8)}
          className="group flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-sage px-5 text-onsage shadow-paper transition-all hover:bg-sage/95 hover:shadow-paper-lg"
        >
          <ScanLine size={19} strokeWidth={2.2} className="transition-transform group-hover:scale-105" />
          <span className="text-[15px] font-semibold tracking-wide">Сканировать чек</span>
        </Link>
      </motion.div>

      {/* 4. Контекстные виджеты: показываются только при наличии актуальной информации */}
      {(primaryHouse || nextBill) && (
        <div className="space-y-2.5">
          {/* Совместный бюджет «Вместе» (только если активен) */}
          {primaryHouse && (
            <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
              <Link
                to="/groups/$id"
                params={{ id: primaryHouse.id }}
                onClick={() => haptic(8)}
                className="group flex items-center justify-between rounded-[18px] border border-rule/70 bg-paper p-3.5 shadow-xs transition hover:border-sage/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-sage/12 text-sage">
                    <Users size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Совместный бюджет
                    </div>
                    <div className="t-display truncate text-[14.5px] font-semibold text-ink leading-tight">
                      «{primaryHouse.name}»
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted group-hover:text-sage transition">
                  <span className="rounded-full bg-sage/12 px-2 py-0.5 text-[10.5px] font-semibold text-sage">
                    {primaryHouse.members} {plural(primaryHouse.members, 'участник', 'участника', 'участников')}
                  </span>
                  <ChevronRight size={16} />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Ближайший счёт (только если он неоплачен) */}
          {nextBill && (
            <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
              <Link
                to="/bills"
                onClick={() => haptic(8)}
                className="group flex items-center justify-between rounded-[18px] border border-rule/70 bg-paper p-3.5 shadow-xs transition hover:border-sage/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-sage/12 text-sage">
                    <CreditCard size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Счёт
                      </span>
                      <span className="rounded-full bg-stamp/10 px-1.5 py-0.2 text-[10px] font-semibold text-stamp">
                        {billDueLabel(nextBill.day_of_month).label}
                      </span>
                    </div>
                    <div className="t-display truncate text-[14.5px] font-semibold text-ink leading-tight">
                      {nextBill.title}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="t-num text-[15px] font-bold text-ink">{money(nextBill.amount)}</div>
                  <div className="text-[11px] text-muted">{nextBill.day_of_month}-го числа</div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      )}

      {/* 5. Лента трат, сгруппированная по дням с микро-итогами */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-muted">
            История покупок
          </h2>
          {boot.receipts.length > 0 && (
            <Link
              to="/receipts"
              onClick={() => haptic(8)}
              className="text-[12px] font-semibold text-sage hover:underline"
            >
              Все чеки ({boot.month.count}) →
            </Link>
          )}
        </div>

        {groupedReceipts.length > 0 ? (
          <div className="space-y-4">
            {/* Если сегодня ещё не было трат — показываем мягкую карточку спокойствия */}
            {!hasTodayExpenses && (
              <div className="flex items-center gap-2.5 rounded-[16px] border border-rule/50 bg-paper/60 px-3.5 py-2.5 text-[12.5px] text-muted">
                <span className="text-[14px]">🌿</span>
                <span>Сегодня пока без трат — бюджет под контролем</span>
              </div>
            )}

            {/* Группы по дням */}
            {groupedReceipts.map((group) => (
              <div key={group.key} className="space-y-1.5">
                {/* Аккуратный микро-итог дня */}
                <div className="flex items-center justify-between px-1 text-[11.5px] text-muted">
                  <span className="font-semibold uppercase tracking-wider">
                    {group.title}
                  </span>
                  <span className="t-num font-medium text-ink/75">
                    {group.items.length} {plural(group.items.length, 'покупка', 'покупки', 'покупок')} • {money(group.total)}
                  </span>
                </div>

                {/* Список покупок дня в чистом блоке */}
                <div className="divide-y divide-rule-soft overflow-hidden rounded-[20px] border border-rule/70 bg-paper shadow-paper">
                  {group.items.map((rc) => (
                    <motion.div
                      key={rc.id}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <Link
                        to="/receipts"
                        onClick={() => haptic(8)}
                        className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-black/[0.02]"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-sage/12 font-bold text-[13.5px] text-sage">
                            {(rc.store || 'Ч')[0].toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[14.5px] font-semibold text-ink">
                              {rc.store || 'Покупка'}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11.5px] text-muted">
                              <span className="truncate">{categoryLabel(rc.category)}</span>
                              {rc.house_name && (
                                <>
                                  <span>•</span>
                                  <span className="rounded bg-sage/10 px-1.5 py-0.2 text-[10px] font-medium text-sage">
                                    {rc.house_name}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="t-num ml-3 shrink-0 text-[15.5px] font-bold text-ink">
                          {money(rc.total)}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Чистое пустое состояние без перегруза */
          <div className="rounded-[22px] border border-rule/70 bg-paper p-6 text-center shadow-paper">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/10 text-sage">
              <Receipt size={20} />
            </div>
            <p className="t-display mt-2.5 text-[16px] font-semibold text-ink">В этом месяце пока нет чеков</p>
            <p className="mx-auto mt-1 max-w-[260px] text-[12.5px] leading-relaxed text-muted">
              Отсканируйте первый чек — здесь сразу появится спокойная сводка трат по дням.
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

      {/* 6. Напоминание о push-уведомлениях */}
      <PushNudge />
    </div>
  )
}
