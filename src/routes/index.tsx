import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  CreditCard,
  Files,
  MessageSquareQuote,
  Receipt,
  ScanLine,
  Settings,
  Sparkles,
  TrendingDown,
  Users,
  Wallet,
} from 'lucide-react'
import { motion } from 'motion/react'
import { PushNudge } from '~/components/PushNudge'
import { useApp } from '~/lib/app-state'
import { greeting, money, plural, dateRu } from '~/lib/format'
import { tickBills } from '~/server/functions/push'
import { cn } from '~/lib/utils'

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
  const daysLeft =
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()
  const dailyLeft = Math.max(0, Math.round(left / Math.max(1, daysLeft)))

  // Текущая дата на русском языке
  const todayStr = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
      }).format(new Date())
    } catch {
      return 'Сегодня'
    }
  }, [])

  const initials = (user?.displayName || user?.name || 'U')
    .slice(0, 2)
    .toUpperCase()

  const recentReceipts = (boot.receipts || []).slice(0, 3)

  return (
    <div className="space-y-4 px-4 pb-32 pt-2 sm:px-5">
      {/* Верхняя панель: Дата, приветствие и аватар */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium capitalize text-muted">
            <Calendar size={13} className="text-sage" />
            <span>{todayStr}</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-medium leading-tight text-ink">
            {greeting()}, {user?.displayName || user?.name || 'друг'}!
          </h1>
        </div>

        <Link
          to="/settings"
          className="group flex h-10 w-10 items-center justify-center rounded-2xl border border-rule/80 bg-paper shadow-sm transition-all hover:scale-105 active:scale-95"
          aria-label="Настройки профиля"
        >
          <span className="text-[13px] font-semibold text-sage transition-colors group-hover:text-ink">
            {initials}
          </span>
        </Link>
      </header>

      {/* Главная карточка бюджета месяца */}
      <section className="relative overflow-hidden rounded-[22px] border border-rule/80 bg-paper p-5 shadow-paper-lg">
        {/* Декоративное свечение */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sage/10 blur-2xl"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
            Остаток бюджета
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-medium',
              daysLeft > 3
                ? 'bg-sage/10 text-sage'
                : 'bg-stamp/10 text-stamp',
            )}
          >
            {daysLeft > 0
              ? `ещё ${daysLeft} ${plural(daysLeft, 'день', 'дня', 'дней')}`
              : 'конец месяца'}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <p
            className={cn(
              't-display t-num text-[36px] font-semibold leading-none',
              left >= 0 ? 'text-ink' : 'text-stamp',
            )}
          >
            {money(left)}
          </p>
          <span className="text-[13px] text-muted">до конца месяца</span>
        </div>

        {/* Прогресс-бар расхода бюджета */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11.5px] text-muted">
            <span>Расход {used}%</span>
            <span className="t-num">Лимит: {money(budget)}</span>
          </div>
          <div className="mt-1.5 h-[8px] w-full overflow-hidden rounded-full bg-rule-soft">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(3, used)}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'h-full rounded-full',
                used > 90 ? 'bg-stamp' : used > 75 ? 'bg-amber-600' : 'bg-sage',
              )}
            />
          </div>
        </div>

        {/* 3 мини-метрики */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-rule/60 pt-3.5">
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <TrendingDown size={12} className="text-sage" /> Потрачено
            </span>
            <span className="t-num mt-0.5 text-[14px] font-medium text-ink">
              {money(boot.month.spent)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Calendar size={12} className="text-sage" /> В день
            </span>
            <span className="t-num mt-0.5 text-[14px] font-medium text-ink">
              ~{money(dailyLeft)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Receipt size={12} className="text-sage" /> Чеков
            </span>
            <span className="t-num mt-0.5 text-[14px] font-medium text-ink">
              {boot.month.count} шт.
            </span>
          </div>
        </div>
      </section>

      {/* Главный призыв к действию: Сканировать чек */}
      <Link
        to="/scan"
        className="group relative flex min-h-[58px] items-center justify-between overflow-hidden rounded-[18px] bg-sage px-4 py-3 text-onsage shadow-md transition-all hover:brightness-105 active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-onsage/15 text-onsage">
            <ScanLine size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[15.5px] font-semibold leading-tight">
              Сканировать чек
            </div>
            <div className="text-[12px] text-onsage/75">
              Моментальный разбор по фото или QR-коду
            </div>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-onsage/15 transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={17} />
        </div>
      </Link>

      {/* Единая сетка разделов */}
      <div className="grid grid-cols-2 gap-3">
        {/* Чеки */}
        <Link
          to="/receipts"
          className="group flex flex-col justify-between rounded-[18px] border border-rule/70 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/12 text-sage">
              <Files size={19} strokeWidth={2} />
            </div>
            <ChevronRight
              size={16}
              className="text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-sage"
            />
          </div>
          <div className="mt-4">
            <p className="t-display text-[17px] font-medium text-ink">Чеки</p>
            <p className="mt-0.5 text-[12px] text-muted">
              {boot.month.count > 0
                ? `${boot.month.count} ${plural(boot.month.count, 'чек', 'чека', 'чеков')}`
                : 'Пока нет чеков'}
            </p>
          </div>
        </Link>

        {/* Кассы */}
        <Link
          to="/groups"
          className="group flex flex-col justify-between rounded-[18px] border border-rule/70 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/12 text-sage">
              <Users size={19} strokeWidth={2} />
            </div>
            <ChevronRight
              size={16}
              className="text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-sage"
            />
          </div>
          <div className="mt-4">
            <p className="t-display text-[17px] font-medium text-ink">Кассы</p>
            <p className="mt-0.5 truncate text-[12px] text-muted">
              {boot.houses.length > 0
                ? `${boot.houses[0].name}`
                : 'Семья и общие траты'}
            </p>
          </div>
        </Link>

        {/* Регулярные платежи */}
        <Link
          to="/bills"
          className="group flex flex-col justify-between rounded-[18px] border border-rule/70 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/12 text-sage">
              <CreditCard size={19} strokeWidth={2} />
            </div>
            <ChevronRight
              size={16}
              className="text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-sage"
            />
          </div>
          <div className="mt-4">
            <p className="t-display text-[17px] font-medium text-ink">Платежи</p>
            <p className="mt-0.5 text-[12px] text-muted">
              {boot.bills.length > 0
                ? `${boot.bills.length} ${plural(boot.bills.length, 'счет', 'счета', 'счетов')}`
                : 'ЖКХ, подписки'}
            </p>
          </div>
        </Link>

        {/* AI Агент */}
        <Link
          to="/agent"
          className="group flex flex-col justify-between rounded-[18px] border border-rule/70 bg-paper p-4 shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/12 text-sage">
              <Sparkles size={19} strokeWidth={2} />
            </div>
            <ChevronRight
              size={16}
              className="text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-sage"
            />
          </div>
          <div className="mt-4">
            <p className="t-display text-[17px] font-medium text-ink">Агент</p>
            <p className="mt-0.5 text-[12px] text-muted">
              Финансовый советник
            </p>
          </div>
        </Link>
      </div>

      {/* Блок последних чеков (если есть) */}
      {recentReceipts.length > 0 ? (
        <section className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted">
              Недавние покупки
            </h2>
            <Link
              to="/receipts"
              className="text-[12.5px] font-medium text-sage hover:underline"
            >
              Все чеки ({boot.month.count}) →
            </Link>
          </div>

          <div className="divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper">
            {recentReceipts.map((rc) => (
              <Link
                key={rc.id}
                to="/receipts"
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-black/[0.02]"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14.5px] font-medium text-ink">
                    {rc.store || 'Чек без магазина'}
                  </div>
                  <div className="flex items-center gap-2 text-[11.5px] text-muted">
                    <span>{dateRu(rc.purchased_at || rc.created_at)}</span>
                    <span>•</span>
                    <span className="truncate">{rc.category || 'Покупки'}</span>
                  </div>
                </div>

                <div className="t-num ml-3 text-[15px] font-semibold text-ink">
                  {money(rc.total)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Напоминание о пуш-уведомлениях */}
      <PushNudge />

      {/* Сервисные быстрые действия */}
      <div className="divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper">
        <Link
          to="/agent"
          className="flex min-h-[50px] items-center justify-between px-4 text-[14.5px] transition-colors hover:bg-black/[0.02]"
        >
          <div className="flex items-center gap-2.5">
            <MessageSquareQuote size={17} className="text-sage" />
            <span>Задать вопрос финансисту</span>
          </div>
          <ChevronRight size={17} className="text-muted" />
        </Link>

        <Link
          to="/settings"
          className="flex min-h-[50px] items-center justify-between px-4 text-[14.5px] transition-colors hover:bg-black/[0.02]"
        >
          <div className="flex items-center gap-2.5">
            <Settings size={17} className="text-muted" />
            <span>Настройки и лимиты</span>
          </div>
          <ChevronRight size={17} className="text-muted" />
        </Link>
      </div>
    </div>
  )
}

