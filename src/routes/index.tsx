import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  Check,
  ChevronRight,
  CreditCard,
  Plus,
  Receipt,
  ScanLine,
  Sparkles,
  Store,
  Users,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { BottomSheet } from '~/components/BottomSheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { PushNudge } from '~/components/PushNudge'
import { PwaInstallPrompt } from '~/components/PwaInstallPrompt'
import { PersonalGoals } from '~/components/PersonalGoals'
import { showInAppNotification } from '~/components/NotificationBanner'
import { useApp } from '~/lib/app-state'
import {
  CATEGORIES,
  billDueLabel,
  categoryLabel,
  dateRu,
  dayKey,
  greeting,
  money,
  parseMagicExpense,
  plural,
} from '~/lib/format'
import { addReceipt } from '~/server/functions/receipts'
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
  const { user, boot, refresh } = useApp()
  const ticked = React.useRef(false)

  // Быстрый ввод расхода (Zero-Friction Quick Log)
  const [openQuickSheet, setOpenQuickSheet] = React.useState(false)
  const [quickInput, setQuickInput] = React.useState('')
  const [quickCategory, setQuickCategory] = React.useState<string | null>(null)
  const [quickHouseId, setQuickHouseId] = React.useState<string | null>(null)
  const [quickBusy, setQuickBusy] = React.useState(false)
  const [selectedDayKey, setSelectedDayKey] = React.useState<string | null>(null)

  const parsedMagic = React.useMemo(() => {
    return parseMagicExpense(quickInput)
  }, [quickInput])

  const activeCategory = quickCategory || parsedMagic.category

  async function handleQuickSave(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (quickBusy) return
    const amount = parsedMagic.amount
    if (!amount) return

    setQuickBusy(true)
    try {
      await addReceipt({
        data: {
          store: parsedMagic.title || 'Покупка',
          total: amount,
          category: activeCategory,
          houseId: quickHouseId,
        },
      })
      haptic(12)
      showInAppNotification({
        title: 'Расход записан ✓',
        body: `${parsedMagic.title}: ${money(amount)} (${categoryLabel(activeCategory)})`,
        icon: 'sparkles',
      })
      setQuickInput('')
      setQuickCategory(null)
      setQuickHouseId(null)
      setOpenQuickSheet(false)
      await refresh()
    } finally {
      setQuickBusy(false)
    }
  }

  React.useEffect(() => {
    if (ticked.current || !user) return
    ticked.current = true
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

  // Сумма и статус обязательных платежей месяца
  const billsTotal = React.useMemo(() => {
    return (boot.bills || []).reduce((acc, b) => acc + (Number(b.amount) || 0), 0)
  }, [boot.bills])

  const unpaidBillsCount = React.useMemo(() => {
    return (boot.bills || []).filter((b) => !b.paid_cycle).length
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

  // Радар текущей недели (Пн - Вс)
  const weekDays = React.useMemo(() => {
    const today = new Date()
    const currentDayOfWeek = today.getDay()
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + distanceToMonday)
    monday.setHours(0, 0, 0, 0)

    const shortNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    const todayKeyStr = dayKey(today)

    return shortNames.map((name, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      const k = dayKey(d)
      const isToday = k === todayKeyStr
      const isFuture = d > today && !isToday

      let daySpent = 0
      let receiptsCount = 0
      for (const r of boot.receipts || []) {
        const rk = dayKey(r.purchased_at || r.created_at)
        if (rk === k) {
          daySpent += Number(r.total) || 0
          receiptsCount += 1
        }
      }

      let dayFullName = ''
      try {
        const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(d)
        const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
        const dayMonth = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
        dayFullName = `${capWeekday}, ${dayMonth}`
      } catch {
        dayFullName = `${name}, ${d.getDate()}`
      }

      return {
        name,
        dateNumber: d.getDate(),
        key: k,
        isToday,
        isFuture,
        daySpent,
        receiptsCount,
        dayFullName,
      }
    })
  }, [boot.receipts])

  const activeDay = React.useMemo(() => {
    if (selectedDayKey) {
      const found = weekDays.find((w) => w.key === selectedDayKey)
      if (found) return found
    }
    return weekDays.find((w) => w.isToday) || weekDays[0]
  }, [weekDays, selectedDayKey])

  return (
    <div className="space-y-6 px-4 pb-36 pt-3 sm:px-5">
      {/* 0. Подсказка по установке PWA на экран смартфона */}
      <PwaInstallPrompt />

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

      {/* 2.1 Радар текущей недели: ритм трат и спокойные дни */}
      <section className="rounded-[22px] border border-rule/70 bg-paper p-3.5 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
          <span>Ритм недели</span>
          <span className="text-[10.5px] font-normal normal-case text-muted">
            {weekDays[0]?.dateNumber}–{weekDays[6]?.dateNumber} {new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(new Date())}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((w) => {
            const isSelected = w.key === activeDay.key
            return (
              <button
                type="button"
                key={w.key}
                onClick={() => {
                  haptic(6)
                  setSelectedDayKey(w.key)
                }}
                className={cn(
                  'flex flex-col items-center justify-between rounded-[14px] px-1 py-2 transition-all cursor-pointer select-none text-center',
                  isSelected
                    ? 'border border-sage/70 bg-sage/12 shadow-xs'
                    : w.isToday
                      ? 'border border-sage/40 bg-sage/5 font-semibold'
                      : 'border border-transparent bg-canvas/40 hover:bg-canvas/70',
                  w.isFuture && 'opacity-40',
                )}
              >
                <span
                  className={cn(
                    'text-[10.5px] tracking-tight',
                    w.isToday || isSelected ? 'font-bold text-sage' : 'text-muted',
                  )}
                >
                  {w.name}
                </span>
                <span
                  className={cn(
                    't-num mt-0.5 text-[13px] font-medium',
                    w.isToday || isSelected ? 'font-bold text-ink' : 'text-ink/80',
                  )}
                >
                  {w.dateNumber}
                </span>
                <div className="mt-1 flex h-4.5 w-full items-center justify-center">
                  {w.isFuture ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-rule/70" />
                  ) : w.daySpent > 0 ? (
                    <span
                      className="t-num truncate text-[10px] font-bold text-ink leading-none px-0.5"
                      title={`${money(w.daySpent)}`}
                    >
                      {w.daySpent >= 10000 ? `${Math.round(w.daySpent / 1000)}k` : `${w.daySpent} ₽`}
                    </span>
                  ) : (
                    <span className="text-[12px]" title="Хорошая экономия">
                      🌿
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Отображение выбранного дня внизу значков (обозначение значков) */}
        <div className="flex items-center justify-between border-t border-rule/50 pt-2 px-1 text-[11.5px]">
          <div className="flex items-center gap-1.5 text-muted min-w-0">
            <Calendar size={13} className="text-sage shrink-0" />
            <span className="font-semibold text-ink truncate">{activeDay.dayFullName}</span>
            {activeDay.isToday && (
              <span className="shrink-0 rounded-full bg-sage/12 px-1.5 py-0.2 text-[10px] font-bold text-sage">
                Сегодня
              </span>
            )}
          </div>

          <div className="text-right shrink-0 ml-2">
            {activeDay.isFuture ? (
              <span className="text-muted flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rule/70 inline-block" />
                <span>Предстоящий день</span>
              </span>
            ) : activeDay.daySpent > 0 ? (
              <span className="font-semibold text-ink">
                {money(activeDay.daySpent)}{' '}
                <span className="text-muted font-normal text-[10.5px]">
                  ({activeDay.receiptsCount} {plural(activeDay.receiptsCount, 'чек', 'чека', 'чеков')})
                </span>
              </span>
            ) : (
              <span className="font-medium text-sage flex items-center gap-1">
                <span>🌿</span>
                <span>Хорошая экономия</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 3. Кнопки быстрых действий: Скан чека + Вписать расход за 3 сек */}
      <div className="flex items-center gap-2">
        <motion.div
          whileTap={{ scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-[1.4]"
        >
          <Link
            to="/scan"
            onClick={() => haptic(8)}
            className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-sage px-4 text-onsage shadow-paper transition-all hover:bg-sage/95 hover:shadow-paper-lg"
          >
            <ScanLine size={19} strokeWidth={2.2} className="transition-transform group-hover:scale-105" />
            <span className="text-[14.5px] font-semibold tracking-wide">Скан чека</span>
          </Link>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-1"
        >
          <button
            type="button"
            onClick={() => {
              haptic(8)
              setOpenQuickSheet(true)
            }}
            className="flex h-[52px] w-full items-center justify-center gap-1.5 rounded-[18px] border border-rule/80 bg-paper px-3 text-ink shadow-paper transition-all hover:border-sage/40 hover:shadow-md"
          >
            <Plus size={18} className="text-sage" />
            <span className="text-[14px] font-semibold">Вписать</span>
          </button>
        </motion.div>
      </div>

      {/* 4. Контекстные виджеты: Совместный бюджет и Обязательные платежи */}
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

        {/* Обязательные платежи (Личные счета, ЖКХ, связь, аренда, подписки) */}
        <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
          <Link
            to="/bills"
            onClick={() => haptic(8)}
            className="group flex items-center justify-between rounded-[18px] border border-rule/70 bg-paper p-3.5 shadow-xs transition hover:border-sage/40"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-amber-600/12 text-amber-800">
                <CreditCard size={18} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Обязательные платежи
                  </span>
                  {nextBill && (
                    <span className="rounded-full bg-stamp/10 px-1.5 py-0.2 text-[10px] font-semibold text-stamp">
                      {billDueLabel(nextBill.day_of_month).label}
                    </span>
                  )}
                </div>
                <div className="t-display truncate text-[14.5px] font-semibold text-ink leading-tight">
                  {boot.bills && boot.bills.length > 0
                    ? unpaidBillsCount > 0
                      ? nextBill
                        ? `${nextBill.title}`
                        : `${unpaidBillsCount} ${plural(unpaidBillsCount, 'платёж к оплате', 'платежа к оплате', 'платежей к оплате')}`
                      : 'Все счета месяца оплачены ✓'
                    : 'ЖКХ, связь, аренда и подписки'}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              {boot.bills && boot.bills.length > 0 ? (
                <>
                  <div className="t-num text-[15px] font-bold text-ink">{money(billsTotal)}</div>
                  <div className="text-[11px] text-muted">в месяц</div>
                </>
              ) : (
                <div className="flex items-center gap-1 text-[12px] font-medium text-sage">
                  <span>Настроить</span>
                  <ChevronRight size={14} />
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Копилки и личные цели */}
      <PersonalGoals goals={boot.goals || []} onRefresh={refresh} dailyLeft={dailyLeft} />

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

      {/* 7. Шторка мгновенного ввода расхода за 3 секунды */}
      <BottomSheet
        open={openQuickSheet}
        onClose={() => setOpenQuickSheet(false)}
        title="Записать расход"
      >
        <form onSubmit={handleQuickSave} className="space-y-4 pt-2">
          {/* Поле умного ввода одной строкой */}
          <div>
            <label className="text-[12px] font-semibold uppercase tracking-wider text-muted">
              Умный ввод (название и сумма)
            </label>
            <div className="relative mt-1.5">
              <Input
                autoFocus
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Например: Кофе 350 или Такси 600"
                className="h-12 rounded-[16px] px-3.5 text-[15.5px] font-medium border-rule/80 bg-paper shadow-xs focus:border-sage"
              />
              {quickInput && (
                <button
                  type="button"
                  onClick={() => setQuickInput('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="mt-1 text-[11.5px] text-muted">
              Напишите одной строкой — сумма и категория определятся сами.
            </p>
          </div>

          {/* Превью распознанных параметров */}
          {quickInput.trim() && (
            <div className="rounded-[16px] border border-rule/70 bg-canvas/60 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-muted">Сумма к списанию:</span>
                <span className="t-display t-num text-[18px] font-bold text-ink">
                  {parsedMagic.amount ? money(parsedMagic.amount) : 'Введите сумму в строке'}
                </span>
              </div>

              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted">Магазин / Название:</span>
                <span className="font-semibold text-ink">{parsedMagic.title}</span>
              </div>

              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted">Категория:</span>
                <span className="rounded-full bg-sage/12 px-2.5 py-0.5 font-medium text-sage">
                  {categoryLabel(activeCategory)}
                </span>
              </div>
            </div>
          )}

          {/* Быстрые шаблоны частых покупок */}
          <div>
            <span className="text-[11.5px] font-medium text-muted">Частые покупки:</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {[
                { label: 'Кофе 250', val: 'Кофе 250' },
                { label: 'ВкусВилл 800', val: 'ВкусВилл 800' },
                { label: 'Такси 450', val: 'Такси 450' },
                { label: 'Обед 600', val: 'Обед 600' },
                { label: 'Аптека 1200', val: 'Аптека 1200' },
                { label: 'Самокат 900', val: 'Самокат 900' },
              ].map((chip) => (
                <button
                  key={chip.val}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setQuickInput(chip.val)
                  }}
                  className="rounded-full border border-rule/70 bg-paper px-3 py-1 text-[11.5px] font-medium text-muted transition hover:border-sage/40 hover:text-ink active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Выбор совместного бюджета, если состоит в группах */}
          {boot.houses && boot.houses.length > 0 && (
            <div>
              <span className="text-[11.5px] font-medium text-muted">Куда отнести:</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setQuickHouseId(null)
                  }}
                  className={cn(
                    'rounded-full border px-3 py-1 text-[12px] font-medium transition active:scale-95',
                    quickHouseId === null
                      ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                      : 'border-rule/70 bg-paper text-muted hover:text-ink',
                  )}
                >
                  Личные расходы
                </button>
                {boot.houses.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      haptic(6)
                      setQuickHouseId(h.id)
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1 text-[12px] font-medium transition active:scale-95',
                      quickHouseId === h.id
                        ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                        : 'border-rule/70 bg-paper text-muted hover:text-ink',
                    )}
                  >
                    «{h.name}»
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Кнопка сохранения */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="sage"
              size="lg"
              disabled={quickBusy || !parsedMagic.amount}
              className="w-full h-12 rounded-[16px] text-[15px] font-semibold"
            >
              {quickBusy
                ? 'Запись…'
                : parsedMagic.amount
                ? `Записать ${money(parsedMagic.amount)}`
                : 'Введите сумму'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </div>
  )
}
