import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bell,
  BellOff,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { BottomSheet } from '~/components/BottomSheet'
import { useApp } from '~/lib/app-state'
import { billDueLabel, money, moneyShort, plural } from '~/lib/format'
import { addBill, deleteBill, listBills, setBillPaid, toggleBillNotify } from '~/server/functions/bills'
import { showInAppNotification } from '~/components/NotificationBanner'
import { cn, haptic } from '~/lib/utils'

export const Route = createFileRoute('/bills')({
  component: Bills,
})

interface BillRow {
  id: string
  title: string
  amount: number
  day_of_month: number
  notify: boolean
  paid_cycle: string | null
}

const TEMPLATES = [
  { title: 'ЖКХ и квартплата', day: 10 },
  { title: 'Интернет и ТВ', day: 15 },
  { title: 'Мобильная связь', day: 20 },
  { title: 'Аренда жилья', day: 1 },
  { title: 'Яндекс Плюс', day: 25 },
]

function Bills() {
  const { user, boot, refresh } = useApp()
  const [bills, setBills] = React.useState<Array<BillRow>>((boot?.bills as any) ?? [])
  const [openSheet, setOpenSheet] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [day, setDay] = React.useState('1')
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    if (boot.bills && boot.bills.length > 0) {
      setBills((boot.bills as any) ?? [])
    }
  }, [boot.bills])

  const reload = React.useCallback(async () => {
    const r: any = await listBills().catch(() => null)
    if (r?.bills) {
      setBills(r.bills)
    }
  }, [])

  React.useEffect(() => {
    if (user && (!boot.bills || boot.bills.length === 0)) {
      reload()
    }
  }, [user, boot.bills, reload])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
    if (!title.trim() || !amt) return
    setBusy(true)
    try {
      await addBill({
        data: {
          title: title.trim(),
          amount: amt,
          day_of_month: Math.min(31, Math.max(1, Number(day || 1))),
        },
      })
      setTitle('')
      setAmount('')
      setDay('1')
      setOpenSheet(false)
      haptic(10)
      await reload()
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  // Расчёт метрик радара счетов
  const totalAmount = React.useMemo(() => {
    return bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
  }, [bills])

  const paidBills = React.useMemo(() => {
    return bills.filter((b) => !!b.paid_cycle)
  }, [bills])

  const unpaidBills = React.useMemo(() => {
    return bills.filter((b) => !b.paid_cycle)
  }, [bills])

  const unpaidTotal = React.useMemo(() => {
    return unpaidBills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
  }, [unpaidBills])

  // Сортировка: сначала неоплаченные по приближению даты, затем оплаченные
  const sortedBills = React.useMemo(() => {
    const currentDay = new Date().getDate()
    const sortedUnpaid = [...unpaidBills].sort((a, b) => {
      const diffA = a.day_of_month >= currentDay ? a.day_of_month - currentDay : a.day_of_month - currentDay + 31
      const diffB = b.day_of_month >= currentDay ? b.day_of_month - currentDay : b.day_of_month - currentDay + 31
      return diffA - diffB
    })
    const sortedPaid = [...paidBills].sort((a, b) => a.day_of_month - b.day_of_month)
    return [...sortedUnpaid, ...sortedPaid]
  }, [unpaidBills, paidBills])

  return (
    <div className="space-y-6 px-4 pb-36 pt-3 sm:px-5">
      {/* 1. Шапка с навигацией и добавлением */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <CreditCard size={14} className="text-sage" />
            <span>Регулярные платежи</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            Счета и подписки
          </h1>
        </div>

        <Button
          size="sm"
          variant="sage"
          onClick={() => {
            haptic(8)
            setOpenSheet(true)
          }}
          className="gap-1.5 rounded-full px-3.5 h-10"
        >
          <Plus size={16} />
          <span>Добавить</span>
        </Button>
      </header>

      {/* 2. Радар регулярных списаний на месяц */}
      {bills.length > 0 && (
        <section className="relative overflow-hidden rounded-[24px] border border-rule/70 bg-paper p-5 shadow-paper">
          <div className="flex items-center justify-between text-[11.5px] font-semibold uppercase tracking-wider text-muted">
            <span>Обязательные списания месяца</span>
            <span className="t-num font-medium text-sage">
              {paidBills.length} из {bills.length} оплачено
            </span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-3">
            <p className="t-display t-num text-[34px] font-bold text-ink leading-tight">
              {money(totalAmount)}
            </p>
            {unpaidBills.length > 0 ? (
              <span className="text-[12.5px] text-muted">
                · осталось {money(unpaidTotal)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-sage">
                <CheckCircle2 size={13} /> Все счета закрыты
              </span>
            )}
          </div>
        </section>
      )}

      {/* 3. Список счетов */}
      {bills.length === 0 ? (
        <div className="rounded-[22px] border border-rule/70 bg-paper p-8 text-center shadow-paper">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <CreditCard size={22} />
          </div>
          <p className="t-display mt-3 text-[17px] font-semibold text-ink">Пока нет регулярных платежей</p>
          <p className="mx-auto mt-1 max-w-[260px] text-[12.5px] leading-relaxed text-muted">
            Добавьте аренду, интернет, ЖКХ или подписки — напомним заранее до дня списания.
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              size="sm"
              variant="sage"
              onClick={() => {
                haptic(8)
                setOpenSheet(true)
              }}
              className="rounded-full gap-1.5"
            >
              <Plus size={15} />
              <span>Добавить первый счёт</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedBills.map((b) => {
            const due = billDueLabel(b.day_of_month)
            const paid = !!b.paid_cycle
            const isAlert = !paid && (due.key === 'today' || due.key === 'overdue' || due.key === 'in-1')

            return (
              <div
                key={b.id}
                className={cn(
                  'overflow-hidden rounded-[20px] border p-4 shadow-paper transition-all',
                  paid
                    ? 'border-rule/50 bg-paper/65 opacity-90'
                    : isAlert
                      ? 'border-stamp/40 bg-paper'
                      : 'border-rule/70 bg-paper',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="t-display truncate text-[16.5px] font-semibold text-ink leading-tight">
                        {b.title}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10.5px] font-semibold leading-none',
                          paid
                            ? 'bg-sage/12 text-sage'
                            : isAlert
                              ? 'bg-stamp/10 text-stamp'
                              : 'bg-black/[0.04] text-muted',
                        )}
                      >
                        {paid ? 'Оплачен' : due.label}
                      </span>
                    </div>

                    <p className="mt-1 text-[12px] text-muted">
                      Списание каждого {b.day_of_month}-го числа
                    </p>
                  </div>

                  <span className="t-num shrink-0 text-[17px] font-bold text-ink">
                    {money(b.amount)}
                  </span>
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-rule/50 pt-3">
                  {/* Кнопка отметки об оплате в 1 клик */}
                  <button
                    type="button"
                    onClick={async () => {
                      haptic(10)
                      const nextPaid = !paid
                      await setBillPaid({ data: { billId: b.id, paid: nextPaid } })
                      if (nextPaid) {
                        showInAppNotification({
                          title: '✓ Платёж оплачен',
                          body: `«${b.title}» (${money(b.amount)}) отмечен как оплаченный`,
                          icon: 'sparkles',
                        })
                      }
                      await reload()
                      await refresh()
                    }}
                    className={cn(
                      'flex min-h-[34px] items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-all active:scale-95',
                      paid
                        ? 'border border-sage/40 bg-sage/12 text-sage'
                        : 'border border-rule/80 bg-paper text-ink hover:bg-black/[0.03]',
                    )}
                  >
                    {paid ? <Check size={13} strokeWidth={2.5} /> : null}
                    <span>{paid ? 'Оплачено' : 'Отметить оплату'}</span>
                  </button>

                  {/* Иконки напоминаний и удаления */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={async () => {
                        haptic(6)
                        await toggleBillNotify({ data: { billId: b.id, notify: !b.notify } })
                        await reload()
                      }}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full transition active:scale-95',
                        b.notify ? 'text-sage bg-sage/10' : 'text-muted hover:text-ink',
                      )}
                      aria-label="Напоминания"
                      title={b.notify ? 'Напоминания включены' : 'Напоминания выключены'}
                    >
                      {b.notify ? <Bell size={15} /> : <BellOff size={15} />}
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm(`Удалить «${b.title}»?`)) return
                        haptic(10)
                        await deleteBill({ data: { billId: b.id } })
                        await reload()
                        await refresh()
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-stamp transition active:scale-95"
                      aria-label="Удалить счёт"
                      title="Удалить счёт"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 4. Шторка создания нового платежа (BottomSheet) */}
      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        title="Новый регулярный платёж"
      >
        <form onSubmit={create} className="space-y-4 pt-1">
          {/* Шаблоны популярных платежей */}
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Быстрый шаблон
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.title}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setTitle(tpl.title)
                    setDay(String(tpl.day))
                  }}
                  className="rounded-full border border-rule/70 bg-cream/40 px-2.5 py-0.5 text-[11.5px] text-muted transition hover:border-sage hover:text-ink active:scale-95"
                >
                  {tpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Название счёта */}
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Название платежа
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ЖКХ, Домашний интернет, Подписка…"
              className="h-11 rounded-[14px]"
              required
            />
          </div>

          {/* Сумма и день месяца в ряд */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                Сумма, ₽
              </label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="1 200"
                inputMode="numeric"
                className="h-11 rounded-[14px] font-bold"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                День списания (1–31)
              </label>
              <Input
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
                placeholder="15"
                inputMode="numeric"
                className="h-11 rounded-[14px]"
                required
              />
            </div>
          </div>

          {/* Сохранить */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="sage"
              size="lg"
              className="w-full h-12 rounded-[16px] text-[15px] font-semibold"
              disabled={busy}
            >
              {busy ? 'Сохранение…' : 'Сохранить платёж'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </div>
  )
}
