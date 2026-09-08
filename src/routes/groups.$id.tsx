import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check, Copy, Plus, Send, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { moneyShort, billDueLabel } from '~/lib/format'
import { cn } from '~/lib/utils'
import {
  addHouseBill,
  addWish,
  deleteHouse,
  getHouse,
  kickMember,
  leaveHouse,
  liveHouse,
  payHouseBill,
  sendHouseMessage,
  setSalary,
  toggleWish,
} from '~/server/functions/houses'

export const Route = createFileRoute('/groups/$id')({
  component: HousePage,
})

interface Member {
  id: string
  user_id: string
  name: string
  salary: number
}
interface Bill {
  id: string
  title: string
  amount: number
  day_of_month: number
  split: string
  payer_id: string | null
}
interface Wish {
  id: string
  title: string
  amount: number
  by_user: string | null
  by_name: string | null
  bought_at: string | null
}
interface Msg {
  id: string
  user_id: string
  name: string
  text: string
  created_at: string
}
interface Snap {
  house: { id: string; name: string; code: string; owner_id: string } | null
  members: Array<Member>
  bills: Array<Bill>
  wishes: Array<Wish>
  messages: Array<Msg>
  pays: Array<{ bill_id: string; cycle: string; user_id: string; paid_at: string }>
  shares: Record<string, Record<string, number>>
  cycle: string
  version?: string
  you?: string
}

const SPLIT_LABEL: Record<string, string> = {
  equal: 'поровну',
  salary: 'по зарплате',
  payer: 'платит один',
}

function HousePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useApp()

  const [snap, setSnap] = React.useState<Snap | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [tab, setTab] = React.useState<'bills' | 'wishes' | 'chat'>('bills')
  const versionRef = React.useRef<string>('')

  const load = React.useCallback(async () => {
    const r: any = await getHouse({ data: { houseId: id } }).catch(() => null)
    if (!r) return
    if (r.error) {
      setError(r.error)
      return
    }
    versionRef.current = r.version ?? ''
    setSnap(r)
  }, [id])

  React.useEffect(() => {
    setSnap(null)
    setError(null)
    load()
  }, [load])

  // live: polling 2.5 с, POST (Safari кэширует GET)
  React.useEffect(() => {
    if (!id) return
    let alive = true
    const tick = async () => {
      try {
        const r: any = await liveHouse({ data: { houseId: id } })
        if (!alive || !r || r.error) return
        if (r.version && r.version !== versionRef.current) {
          versionRef.current = r.version
          setSnap(r)
        }
      } catch {
        /* сеть мигнула — попробуем через 2.5 с */
      }
    }
    const t = setInterval(tick, 2500)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [id])

  if (error) {
    return (
      <div className="px-4 pt-6">
        <div className="slip p-5 text-center">
          <p className="t-display text-[17px]">{error}</p>
          <Button className="mt-3" variant="paper" onClick={() => navigate({ to: '/groups' })}>
            К кассам
          </Button>
        </div>
      </div>
    )
  }

  if (!snap || !snap.house) {
    return (
      <div className="px-4 pt-6">
        <div className="h-40 animate-[breathe_1.4s_ease-in-out_infinite] rounded-[16px] bg-rule-soft" />
      </div>
    )
  }

  const me = snap.members.find((m) => m.user_id === user?.id)
  const isOwner = snap.house.owner_id === user?.id

  return (
    <div className="pb-8">
      <header className="envelope mb-4 px-4 pb-4 pt-[54px]">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="t-display text-[24px] leading-none">{snap.house.name}</h1>
          <CopyCode code={snap.house.code} />
        </div>
        <p className="mt-1 text-[12.5px] text-muted">
          {snap.members.map((m) => m.name).join(', ')}
        </p>
      </header>

      {/* зарплаты */}
      <Section title="Люди" hint="доли считаются от зарплаты">
        <div className="space-y-2">
          {snap.members.map((m) => (
            <div key={m.user_id} className="flex items-center gap-2">
              <span className="t-display min-w-0 flex-1 truncate text-[15px]">
                {m.name}
                {m.user_id === user?.id ? <span className="text-muted"> · вы</span> : null}
              </span>
              {m.user_id === user?.id ? (
                <SalaryInput
                  key={`${m.user_id}-${m.salary}`}
                  salary={m.salary}
                  onSave={async (v) => {
                    await setSalary({ data: { houseId: id, amount: v } })
                    await load()
                  }}
                />
              ) : (
                <span className="t-num text-[13.5px] text-muted">{moneyShort(m.salary)}</span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* табы */}
      <div className="mb-3 flex gap-1 rounded-[12px] border border-rule bg-paper p-1 shadow-paper">
        {(
          [
            ['bills', 'Платежи'],
            ['wishes', 'Хотим'],
            ['chat', 'Чат'],
          ] as Array<['bills' | 'wishes' | 'chat', string]>
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'min-h-[40px] flex-1 rounded-[9px] text-[13.5px] transition-colors',
              tab === t ? 'bg-sage text-onsage' : 'text-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'bills' ? (
        <Section title="Платежи" hint="напомним за 2 дня, за день и в день">
          <div className="mb-3 space-y-2.5">
            {snap.bills.length === 0 ? (
              <p className="py-3 text-center text-[13.5px] text-muted">платежей пока нет</p>
            ) : (
              snap.bills.map((b) => {
                const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle)
                const due = billDueLabel(b.day_of_month)
                const share = snap.shares?.[b.id]?.[user?.id || ''] ?? 0
                return (
                  <div key={b.id} className="slip px-3.5 py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="t-display min-w-0 truncate text-[15.5px]">{b.title}</span>
                      <span className="t-num shrink-0 text-[15.5px]">{moneyShort(b.amount)}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
                      <span>{b.day_of_month} числа</span>
                      <span className="text-rule">·</span>
                      <span>{SPLIT_LABEL[b.split] || b.split}</span>
                      <span className="text-rule">·</span>
                      <span className={due.key === 'today' || due.key === 'overdue' ? 'text-stamp' : ''}>{due.label}</span>
                    </div>
                    <div className="rule mt-2.5 flex items-center justify-between pt-2.5">
                      <span className="text-[12.5px] text-muted">
                        ваша доля <span className="t-num text-ink">{moneyShort(share)}</span>
                      </span>
                      <button
                        onClick={async () => {
                          await payHouseBill({ data: { houseId: id, billId: b.id, paid: !paid } })
                          await load()
                        }}
                        className={cn(
                          'flex min-h-[34px] items-center gap-1.5 rounded-[9px] border px-2.5 text-[13px]',
                          paid ? 'border-sage/40 bg-sage/10 text-sage' : 'border-rule text-muted',
                        )}
                      >
                        {paid ? <Check size={14} /> : null}
                        {paid ? 'оплатили' : 'я оплатил'}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <AddBill
            members={snap.members}
            onAdd={async (v) => {
              await addHouseBill({ data: { houseId: id, ...v } })
              await load()
            }}
          />
        </Section>
      ) : null}

      {tab === 'wishes' ? (
        <Section title="Хотим купить" hint="видно всем в кассе">
          <div className="mb-3 space-y-2.5">
            {snap.wishes.length === 0 ? (
              <p className="py-3 text-center text-[13.5px] text-muted">список пуст</p>
            ) : (
              snap.wishes.map((w) => (
                <div key={w.id} className="slip flex items-center gap-3 px-3.5 py-3">
                  <button
                    onClick={async () => {
                      await toggleWish({ data: { houseId: id, wishId: w.id } })
                      await load()
                    }}
                    className={cn(
                      'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] border',
                      w.bought_at ? 'border-sage bg-sage text-onsage' : 'border-rule',
                    )}
                    aria-label="взяли"
                  >
                    {w.bought_at ? <Check size={15} /> : null}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={cn('t-display truncate text-[15px]', w.bought_at ? 'text-muted line-through' : '')}>
                      {w.title}
                    </p>
                    <p className="text-[12px] text-muted">{w.by_name ? `хотел ${w.by_name}` : 'хотят'}</p>
                  </div>
                  <span className="t-num shrink-0 text-[14.5px]">{moneyShort(w.amount)}</span>
                </div>
              ))
            )}
          </div>
          <AddWish
            onAdd={async (v) => {
              await addWish({ data: { houseId: id, ...v } })
              await load()
            }}
          />
        </Section>
      ) : null}

      {tab === 'chat' ? (
        <Section title="Чат кассы" hint="сообщение придёт пушем">
          <div className="mb-3 max-h-[46vh] space-y-2 overflow-y-auto">
            {snap.messages.length === 0 ? (
              <p className="py-3 text-center text-[13.5px] text-muted">пока тихо</p>
            ) : (
              snap.messages.map((m) => {
                const mine = m.user_id === user?.id
                return (
                  <div key={m.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[80%] px-3 py-2', mine ? 'scribble' : 'letter')}>
                      {!mine ? <p className="mb-0.5 text-[11.5px] text-sage">{m.name}</p> : null}
                      <p className="text-[14px] leading-snug">{m.text}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <ChatInput
            onSend={async (text) => {
              await sendHouseMessage({ data: { houseId: id, text } })
              await load()
            }}
          />
        </Section>
      ) : null}

      <div className="mt-6 space-y-2 px-4">
        {isOwner ? (
          <p className="text-[12px] text-muted">
            Вы владелец.{' '}
            <button
              className="text-stamp underline"
              onClick={async () => {
                if (!confirm('Удалить кассу? Платежи и чат исчезнут.')) return
                await deleteHouse({ data: { houseId: id } })
                navigate({ to: '/groups' })
              }}
            >
              Удалить кассу
            </button>
          </p>
        ) : (
          <p className="text-[12px] text-muted">
            <button
              className="text-stamp underline"
              onClick={async () => {
                if (!confirm('Выйти из кассы?')) return
                await leaveHouse({ data: { houseId: id } })
                navigate({ to: '/groups' })
              }}
            >
              Выйти из кассы
            </button>
          </p>
        )}

        {isOwner && snap.members.length > 1 ? (
          <div className="rule pt-3">
            <p className="mb-2 text-[12px] uppercase tracking-[0.09em] text-muted">Выгнать</p>
            <div className="flex flex-wrap gap-2">
              {snap.members
                .filter((m) => m.user_id !== user?.id)
                .map((m) => (
                  <button
                    key={m.user_id}
                    onClick={async () => {
                      if (!confirm(`Выгнать ${m.name}?`)) return
                      await kickMember({ data: { houseId: id, userId: m.user_id } })
                      await load()
                    }}
                    className="flex min-h-[34px] items-center gap-1.5 rounded-[9px] border border-rule px-2.5 text-[13px] text-muted"
                  >
                    <Trash2 size={13} /> {m.name}
                  </button>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function CopyCode({ code }: { code: string }) {
  const [done, setDone] = React.useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setDone(true)
          setTimeout(() => setDone(false), 1600)
        } catch {
          /* */
        }
      }}
      className="flex min-h-[34px] items-center gap-1.5 rounded-[8px] px-2 font-mono text-[13px] tracking-[0.2em] text-sage"
    >
      <Copy size={13} />
      {done ? 'готово' : code}
    </button>
  )
}

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-5 px-4">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="t-display text-[17px]">{title}</h2>
        {hint ? <span className="text-[11.5px] text-muted">{hint}</span> : null}
      </div>
      <div className="receipt-card p-4">{children}</div>
    </section>
  )
}

function SalaryInput({ salary, onSave }: { salary: number; onSave: (v: number) => Promise<void> }) {
  const [v, setV] = React.useState(salary ? String(salary) : '')
  const [busy, setBusy] = React.useState(false)
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Input
        value={v}
        onChange={(e) => setV(e.target.value.replace(/[^\d]/g, ''))}
        placeholder="зарплата"
        inputMode="numeric"
        className="h-[38px] w-[104px] min-h-0 py-0 text-right text-[13.5px]"
      />
      <Button
        size="sm"
        variant="paper"
        disabled={busy}
        onClick={async () => {
          setBusy(true)
          await onSave(Math.round(Number(v || 0)))
          setBusy(false)
        }}
      >
        Ок
      </Button>
    </div>
  )
}

function AddBill({
  members,
  onAdd,
}: {
  members: Array<Member>
  onAdd: (v: { title: string; amount: number; day_of_month: number; split: string; payer_id?: string | null }) => Promise<void>
}) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [day, setDay] = React.useState('1')
  const [split, setSplit] = React.useState('equal')
  const [payer, setPayer] = React.useState<string>('')
  const [busy, setBusy] = React.useState(false)

  if (!open) {
    return (
      <Button variant="paper" size="md" className="w-full" onClick={() => setOpen(true)}>
        <Plus size={16} /> Добавить платёж
      </Button>
    )
  }

  return (
    <form
      className="rule pt-3"
      onSubmit={async (e) => {
        e.preventDefault()
        const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
        if (!title.trim() || !amt) return
        setBusy(true)
        await onAdd({
          title: title.trim(),
          amount: amt,
          day_of_month: Math.min(31, Math.max(1, Number(day || 1))),
          split,
          payer_id: split === 'payer' ? payer || members[0]?.user_id || null : null,
        })
        setTitle('')
        setAmount('')
        setOpen(false)
        setBusy(false)
      }}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Аренда"
        className="mb-2.5"
      />
      <div className="mb-2.5 grid grid-cols-2 gap-2.5">
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
          placeholder="45000"
          inputMode="numeric"
        />
        <Input
          value={day}
          onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
          placeholder="день"
          inputMode="numeric"
        />
      </div>
      <div className="mb-2.5 flex gap-1 rounded-[10px] border border-rule bg-cream/60 p-1">
        {(
          [
            ['equal', 'поровну'],
            ['salary', 'по зарплате'],
            ['payer', 'платит один'],
          ] as Array<[string, string]>
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setSplit(v)}
            className={cn(
              'min-h-[36px] flex-1 rounded-[7px] text-[12px]',
              split === v ? 'bg-sage text-onsage' : 'text-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {split === 'payer' ? (
        <select
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          className="field mb-2.5"
        >
          {members.map((m) => (
            <option key={m.user_id} value={m.user_id}>
              {m.name}
            </option>
          ))}
        </select>
      ) : null}
      <div className="grid grid-cols-2 gap-2.5">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" variant="sage" disabled={busy}>
          {busy ? 'Секунду…' : 'Добавить'}
        </Button>
      </div>
    </form>
  )
}

function AddWish({ onAdd }: { onAdd: (v: { title: string; amount: number }) => Promise<void> }) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  if (!open) {
    return (
      <Button variant="paper" size="md" className="w-full" onClick={() => setOpen(true)}>
        <Plus size={16} /> Хотим купить
      </Button>
    )
  }

  return (
    <form
      className="rule pt-3"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!title.trim()) return
        setBusy(true)
        await onAdd({ title: title.trim(), amount: Math.round(Number(amount.replace(/[^\d]/g, '') || 0)) })
        setTitle('')
        setAmount('')
        setOpen(false)
        setBusy(false)
      }}
    >
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Пылесос" className="mb-2.5" />
      <Input
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
        placeholder="12000"
        inputMode="numeric"
        className="mb-2.5"
      />
      <div className="grid grid-cols-2 gap-2.5">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" variant="sage" disabled={busy}>
          {busy ? 'Секунду…' : 'В список'}
        </Button>
      </div>
    </form>
  )
}

function ChatInput({ onSend }: { onSend: (text: string) => Promise<void> }) {
  const [text, setText] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  return (
    <form
      className="rule flex items-center gap-2 pt-3"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!text.trim() || busy) return
        setBusy(true)
        await onSend(text.trim())
        setText('')
        setBusy(false)
      }}
    >
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="написать в кассу" />
      <Button type="submit" variant="sage" size="icon" disabled={busy} aria-label="отправить">
        <Send size={17} />
      </Button>
    </form>
  )
}
