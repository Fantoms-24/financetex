import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Bell, BellOff, Check, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { billDueLabel, moneyShort } from '~/lib/format'
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
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="t-display text-[26px] leading-none">Платежи</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            {bills.length > 0 ? 'напомним за 2 дня, за день и в день' : 'личные повторяющиеся'}
          </p>
        </div>
        <Button size="sm" variant={open ? 'ghost' : 'paper'} onClick={() => setOpen(!open)}>
          {open ? 'Скрыть' : <Plus size={16} />}
        </Button>
      </header>

      {open ? (
        <form onSubmit={create} className="receipt-card rise mb-4 p-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Интернет" className="mb-2.5" />
          <div className="mb-3 grid grid-cols-2 gap-2.5">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="900"
              inputMode="numeric"
            />
            <Input
              value={day}
              onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
              placeholder="день"
              inputMode="numeric"
            />
          </div>
          <Button type="submit" variant="sage" size="md" className="w-full" disabled={busy}>
            Добавить платёж
          </Button>
        </form>
      ) : null}

      {bills.length === 0 ? (
        <div className="slip rise px-5 py-10 text-center">
          <p className="t-display text-[17px]">Пока пусто</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Добавьте аренду, свет или интернет — напомним до списания.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {bills.map((b) => {
            const due = billDueLabel(b.day_of_month)
            const paid = !!b.paid_cycle
            return (
              <div key={b.id} className="slip rise px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="t-display min-w-0 truncate text-[16px]">{b.title}</span>
                  <span className="t-num shrink-0 text-[16px]">{moneyShort(b.amount)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[12.5px] text-muted">
                  <span>{b.day_of_month} числа</span>
                  <span className="text-rule">·</span>
                  <span className={cn(due.key === 'today' || due.key === 'overdue' ? 'text-stamp' : '')}>{due.label}</span>
                </div>

                <div className="rule mt-2.5 flex items-center justify-between pt-2.5">
                  <button
                    onClick={async () => {
                      await setBillPaid({ data: { billId: b.id, paid: !paid } })
                      await reload()
                    }}
                    className={cn(
                      'flex min-h-[34px] items-center gap-1.5 rounded-[9px] border px-2.5 text-[13px]',
                      paid ? 'border-sage/40 bg-sage/10 text-sage' : 'border-rule text-muted',
                    )}
                  >
                    {paid ? <Check size={14} /> : null}
                    {paid ? 'оплатили' : 'оплатил этот цикл'}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={async () => {
                        await toggleBillNotify({ data: { billId: b.id, notify: !b.notify } })
                        await reload()
                      }}
                      className="flex min-h-[34px] items-center gap-1.5 rounded-[9px] px-2 text-[13px] text-muted"
                      aria-label="напоминания"
                    >
                      {b.notify ? <Bell size={15} className="text-sage" /> : <BellOff size={15} />}
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Убрать «${b.title}»?`)) return
                        await deleteBill({ data: { billId: b.id } })
                        await reload()
                        await refresh()
                      }}
                      className="min-h-[34px] rounded-[9px] px-2 text-[13px] text-stamp"
                    >
                      убрать
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
