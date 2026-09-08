import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Bell, BellOff, Check, CreditCard, Plus, Trash2, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { billDueLabel, money, moneyShort } from '~/lib/format'
import { addBill, deleteBill, listBills, setBillPaid, toggleBillNotify } from '~/server/functions/bills'
import { cn } from '~/lib/utils'

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

function Bills() {
  const { user, refresh } = useApp()
  const [bills, setBills] = React.useState<Array<BillRow>>([])
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [day, setDay] = React.useState('1')
  const [busy, setBusy] = React.useState(false)

  const reload = React.useCallback(async () => {
    const r: any = await listBills().catch(() => null)
    setBills(r?.bills ?? [])
  }, [])

  React.useEffect(() => {
    if (user) reload()
  }, [user, reload])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
    if (!title.trim() || !amt) return
    setBusy(true)
    await addBill({ data: { title: title.trim(), amount: amt, day_of_month: Number(day || 1) } })
    setTitle('')
    setAmount('')
    setDay('1')
    setOpen(false)
    setBusy(false)
    await reload()
    await refresh()
  }

  return (
    <div className="space-y-4 px-4 pb-32 pt-2 sm:px-5">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <CreditCard size={14} className="text-sage" />
            <span>Регулярные списания</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            Платежи
          </h1>
        </div>
        <Button
          size="sm"
          variant={open ? 'ghost' : 'sage'}
          onClick={() => setOpen(!open)}
          className="gap-1.5"
        >
          {open ? <X size={16} /> : <Plus size={16} />}
          <span>{open ? 'Скрыть' : 'Добавить'}</span>
        </Button>
      </header>

      {open ? (
        <form onSubmit={create} className="rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg space-y-3">
          <div className="flex items-center justify-between border-b border-rule/60 pb-2">
            <span className="t-display text-[15px] font-semibold text-ink">Новый регулярный платеж</span>
            <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-ink">
              <X size={15} />
            </button>
          </div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название: Интернет, ЖКХ, Подписка…" required />
          <div className="grid grid-cols-2 gap-2.5">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="Сумма, ₽"
              inputMode="numeric"
              required
            />
            <Input
              value={day}
              onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
              placeholder="День месяца (1–31)"
              inputMode="numeric"
              required
            />
          </div>
          <Button type="submit" variant="sage" size="md" className="w-full" disabled={busy}>
            {busy ? 'Добавление…' : 'Сохранить платёж'}
          </Button>
        </form>
      ) : null}

      {bills.length === 0 ? (
        <div className="rounded-[20px] border border-rule/80 bg-paper p-8 text-center shadow-paper">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <CreditCard size={24} />
          </div>
          <p className="t-display mt-3 text-[17px] font-medium text-ink">Пока нет регулярных платежей</p>
          <p className="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-snug text-muted">
            Добавьте аренду, интернет, ЖКХ или подписки — напомним заранее до списания.
          </p>
          <div className="mt-4 flex justify-center">
            <Button size="sm" variant="sage" onClick={() => setOpen(true)}>
              <Plus size={16} /> Добавить первый счет
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {bills.map((b) => {
            const due = billDueLabel(b.day_of_month)
            const paid = !!b.paid_cycle
            const isAlert = due.key === 'today' || due.key === 'overdue'

            return (
              <div
                key={b.id}
                className="overflow-hidden rounded-[18px] border border-rule/80 bg-paper p-4 shadow-paper transition-all hover:border-sage/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="t-display truncate text-[16.5px] font-semibold text-ink leading-tight">
                        {b.title}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10.5px] font-medium leading-none',
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

                <div className="mt-3.5 flex items-center justify-between border-t border-rule/60 pt-3">
                  <button
                    type="button"
                    onClick={async () => {
                      await setBillPaid({ data: { billId: b.id, paid: !paid } })
                      await reload()
                    }}
                    className={cn(
                      'flex min-h-[32px] items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium transition-all active:scale-95',
                      paid
                        ? 'border border-sage/40 bg-sage/10 text-sage'
                        : 'border border-rule/80 bg-white/80 text-muted hover:text-ink',
                    )}
                  >
                    {paid ? <Check size={13} /> : null}
                    <span>{paid ? 'Оплачено' : 'Отметить оплаченным'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={async () => {
                        await toggleBillNotify({ data: { billId: b.id, notify: !b.notify } })
                        await reload()
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink transition active:scale-95"
                      aria-label="Напоминания"
                      title={b.notify ? 'Напоминания включены' : 'Напоминания выключены'}
                    >
                      {b.notify ? <Bell size={15} className="text-sage" /> : <BellOff size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm(`Убрать «${b.title}»?`)) return
                        await deleteBill({ data: { billId: b.id } })
                        await reload()
                        await refresh()
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-stamp/80 hover:text-stamp transition active:scale-95"
                      aria-label="Удалить"
                      title="Удалить"
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
    </div>
  )
}
