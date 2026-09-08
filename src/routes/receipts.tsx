import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { categoryLabel, dateRu, money, moneyShort, plural } from '~/lib/format'
import { addReceipt, deleteReceipt, getReceipt, listReceipts } from '~/server/functions/receipts'
import type { Receipt, ReceiptItem } from '~/server/functions/bootstrap'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/receipts')({
  component: Receipts,
})

const VERDICT: Record<string, string> = {
  good: 'норма',
  fair: 'терпимо',
  overpriced: 'дорого',
  impulse: 'импульс',
}

function Receipts() {
  const { user, boot, refresh } = useApp()
  const [items, setItems] = React.useState<Array<Receipt>>(boot.receipts)
  const [open, setOpen] = React.useState(false)
  const [store, setStore] = React.useState('')
  const [total, setTotal] = React.useState('')
  const [note, setNote] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [detail, setDetail] = React.useState<Array<ReceiptItem>>([])

  React.useEffect(() => {
    if (!user) return
    listReceipts({ data: { limit: 120 } })
      .then((r) => setItems((r as any)?.receipts ?? []))
      .catch(() => {})
  }, [user])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    const amount = Math.round(Number(total.replace(/[^\d.,]/g, '').replace(',', '.') || 0))
    if (!amount) return
    setBusy(true)
    try {
      await addReceipt({ data: { store: store || 'Без названия', total: amount, note } })
      setStore('')
      setTotal('')
      setNote('')
      setOpen(false)
      await refresh()
      const r = await listReceipts({ data: { limit: 120 } })
      setItems((r as any)?.receipts ?? [])
    } finally {
      setBusy(false)
    }
  }

  async function toggle(id: string) {
    if (openId === id) {
      setOpenId(null)
      return
    }
    setOpenId(id)
    setDetail([])
    const r = await getReceipt({ data: { id } }).catch(() => null)
    setDetail((r as any)?.items ?? [])
  }

  async function drop(id: string) {
    await deleteReceipt({ data: { id } })
    setOpenId(null)
    await refresh()
    const r = await listReceipts({ data: { limit: 120 } })
    setItems((r as any)?.receipts ?? [])
  }

  const grouped = React.useMemo(() => {
    const map = new Map<string, Array<Receipt>>()
    for (const r of items) {
      const key = r.purchased_at || 'без даты'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(r)
    }
    return Array.from(map.entries())
  }, [items])

  const monthTotal = boot.month.spent

  return (
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="t-display text-[26px] leading-none">Ящик чеков</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            {items.length > 0
              ? `${items.length} ${plural(items.length, 'чек', 'чека', 'чеков')} · ${money(monthTotal)} за месяц`
              : 'ящик пока пуст'}
          </p>
        </div>
        <Button size="sm" variant={open ? 'ghost' : 'paper'} onClick={() => setOpen(!open)}>
          {open ? <X size={16} /> : <Plus size={16} />}
          {open ? 'Скрыть' : 'Вписать'}
        </Button>
      </header>

      {open ? (
        <form onSubmit={save} className="receipt-card rise mb-4 p-4">
          <p className="t-display mb-3 text-[15px]">Записать вручную</p>
          <div className="mb-3">
            <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Магазин</label>
            <Input value={store} onChange={(e) => setStore(e.target.value)} placeholder="Пятёрочка" />
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Сумма, ₽</label>
            <Input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="1250"
              inputMode="numeric"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Заметка</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="необязательно" />
          </div>
          <Button type="submit" variant="sage" size="md" className="w-full" disabled={busy}>
            Положить в ящик
          </Button>
        </form>
      ) : null}

      {grouped.length === 0 ? (
        <div className="slip rise px-5 py-10 text-center">
          <p className="t-display text-[17px]">Пока пусто</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Отсканируйте чек или впишите сумму руками — и он ляжет в ящик.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map(([day, list]) => (
            <section key={day}>
              <p className="mb-2 px-1 text-[12px] uppercase tracking-[0.09em] text-muted">
                {dateRu(day)}
                <span className="ml-2 t-num text-muted/70">
                  {money(list.reduce((s, r) => s + r.total, 0))}
                </span>
              </p>
              <div className="space-y-2.5">
                {list.map((r) => (
                  <div key={r.id} className="slip rise px-4 py-3.5" style={{ transform: 'rotate(-0.2deg)' }}>
                    <button className="w-full text-left" onClick={() => toggle(r.id)}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="t-display truncate text-[16px]">{r.store || 'Без названия'}</span>
                        <span className="t-num shrink-0 text-[16px]">{moneyShort(r.total)}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[12px] text-muted">
                        <span>{categoryLabel(r.category)}</span>
                        {r.verdict ? (
                          <>
                            <span className="text-rule">·</span>
                            <span className={cn(r.verdict === 'impulse' || r.verdict === 'overpriced' ? 'text-stamp' : '')}>
                              {VERDICT[r.verdict] || r.verdict}
                            </span>
                          </>
                        ) : null}
                        {r.note ? (
                          <>
                            <span className="text-rule">·</span>
                            <span className="truncate">{r.note}</span>
                          </>
                        ) : null}
                      </div>
                    </button>

                    {openId === r.id ? (
                      <div className="rule mt-3 pt-3">
                        {detail.length > 0 ? (
                          <ul className="mb-3 space-y-1">
                            {detail.map((it) => (
                              <li key={it.id} className="flex items-baseline justify-between gap-3 text-[13px]">
                                <span className="min-w-0 truncate">
                                  {it.name}
                                  {it.qty ? <span className="text-muted"> ×{it.qty}</span> : null}
                                </span>
                                <span className="t-num shrink-0">{moneyShort(it.price)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mb-3 text-[12.5px] text-muted">Позиции не записаны</p>
                        )}
                        <Button size="sm" variant="stamp" onClick={() => drop(r.id)}>
                          Убрать из ящика
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
