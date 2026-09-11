import { listReceipts } from '~/server/functions/receipts'
import { monthKey } from '~/lib/format'
import { assertSaved, dueDay } from '~/lib/finance'
import { Pencil, Pause, Play } from 'lucide-react'
import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Bell,
  BellOff,
  Check,
  CheckCircle2,
  CreditCard,
  Plus,
  Trash2,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { BottomSheet } from '~/components/BottomSheet'
import { PersonalGoals } from '~/components/PersonalGoals'
import { useApp } from '~/lib/app-state'
import { billDueLabel, money, plural } from '~/lib/format'
import { updateBill, addBill, deleteBill, listBills, setBillPaid, toggleBillNotify } from '~/server/functions/bills'
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
  paused?: boolean
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
  const [error,setError]=React.useState('')
  const [editing,setEditing]=React.useState<BillRow|null>(null)
  const [acting,setActing]=React.useState(false)
  const [payTarget,setPayTarget]=React.useState<BillRow|null>(null)
  const [candidates,setCandidates]=React.useState<any[]>([])
  const [candidatesBusy,setCandidatesBusy]=React.useState(false)
  React.useEffect(()=>{
    if(!payTarget)return
    let live=true;setCandidates([]);setCandidatesBusy(true)
    const now=new Date(),month=monthKey()
    listReceipts({data:{total:payTarget.amount,from:month+'-01',to:month+'-'+new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),limit:300}})
      .then(r=>{const data=assertSaved(r);if(live)setCandidates(data.receipts.filter(r=>! /^(bill|goal):/.test(r.source_key||'')))})
      .catch(e=>{if(live)setError(e.message||'Не удалось найти расходы')}).finally(()=>{if(live)setCandidatesBusy(false)})
    return()=>{live=false}
  },[payTarget])

  React.useEffect(() => {
    if (boot.bills) {
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
    if (!title.trim() || !amt || busy) return
    setBusy(true)
    try {
      setError('')
      const data={title:title.trim(),amount:amt,day_of_month:Math.min(31,Math.max(1,Number(day||1)))}
      assertSaved(editing?await updateBill({data:{...data,id:editing.id,paused:editing.paused}}):await addBill({data}))
      setEditing(null)
      setTitle('')
      setAmount('')
      setDay('1')
      setOpenSheet(false)
      haptic(10)
      await reload()
      await refresh()
    } catch(e:any){setError(e.message||'Не удалось сохранить платёж')} finally {
      setBusy(false)
    }
  }

  // Расчёт метрик радара счетов
  const totalAmount = React.useMemo(() => {
    return bills.filter(b=>!b.paused).reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
  }, [bills])

  const paidBills = React.useMemo(() => {
    return bills.filter((b) => !!b.paid_cycle && !b.paused)
  }, [bills])

  const unpaidBills = React.useMemo(() => {
    return bills.filter((b) => !b.paid_cycle && !b.paused)
  }, [bills])

  const unpaidTotal = React.useMemo(() => {
    return unpaidBills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
  }, [unpaidBills])

  // Сортировка: сначала неоплаченные по приближению даты, затем оплаченные
  const sortedBills = React.useMemo(() => {
    const currentDay = new Date().getDate()
    const sortedUnpaid = [...unpaidBills].sort((a, b) => {
      return dueDay(a.day_of_month) - dueDay(b.day_of_month)
    })
    const sortedPaid = [...paidBills].sort((a, b) => a.day_of_month - b.day_of_month)
    return [...sortedUnpaid, ...sortedPaid, ...bills.filter(b=>b.paused)]
  }, [unpaidBills, paidBills,bills])

  const activeCount=bills.filter(b=>!b.paused).length
  const paidPercent = activeCount > 0 ? Math.round((paidBills.length / activeCount) * 100) : 0
  const nextBill = sortedBills.find((bill) => !bill.paid_cycle && !bill.paused)

  async function perform(fn:()=>Promise<any>){
    if(acting)return;setActing(true);setError('')
    try{assertSaved(await fn());await reload();await refresh();return true}
    catch(e:any){setError(e.message||'Не удалось сохранить. Попробуйте ещё раз');return false}
    finally{setActing(false)}
  }

  return (
    <div className="app-page plan-page">
      <header className="page-heading plan-heading">
        <div>
          <p className="eyebrow">Платежи и накопления</p>
          <h1>План<span>.</span></h1>
          <p className="page-description">Всё важное на месяц — счета и личные цели.</p>
        </div>

        <Button
          size="sm"
          variant="sage"
          onClick={() => {
            haptic(8)
            setEditing(null);setTitle('');setAmount('');setDay('1');setError('');setOpenSheet(true)
          }}
          className="plan-add-button gap-1.5 rounded-full px-4 h-10"
        >
          <Plus size={16} />
          <span>Платёж</span>
        </Button>
      </header>

      {error&&<p className="form-error" role="alert">{error}</p>}
      <p className="form-hint">Оплата добавляет расход в историю. Повторная отметка отменяет его.</p>
      <div className="plan-layout">
        <div className="plan-bills-column">
          {bills.length > 0 && (
            <section className="plan-summary" aria-label="Итог регулярных платежей">
              <div className="plan-summary__topline">
                <span>Списания в этом месяце</span>
                <span className="plan-summary__count t-num">
                  {paidBills.length} из {activeCount} оплачено
                </span>
              </div>

              <div className="plan-summary__amount-row">
                <div>
                  <span className="plan-summary__amount-label">
                    {unpaidBills.length > 0 ? 'Осталось оплатить' : 'Счета закрыты'}
                  </span>
                  <p className="plan-summary__amount t-display t-num">
                    {money(unpaidBills.length > 0 ? unpaidTotal : totalAmount)}
                  </p>
                </div>
                {unpaidBills.length === 0 ? (
                  <span className="plan-summary__done"><CheckCircle2 size={16} /> Готово</span>
                ) : (
                  <span className="plan-summary__total t-num">Всего {money(totalAmount)}</span>
                )}
              </div>

              <div className="plan-summary__progress" aria-label={`Оплачено ${paidPercent}%`}>
                <span style={{ width: `${paidPercent}%` }} />
              </div>

              <p className="plan-summary__next">
                {nextBill ? (
                  <>
                    <span>Ближайший</span>
                    <strong>{nextBill.title}</strong>
                    <span>· {billDueLabel(nextBill.day_of_month).label.toLowerCase()}</span>
                  </>
                ) : (
                  <>В этом месяце больше ничего оплачивать не нужно</>
                )}
              </p>
            </section>
          )}

          <section className="plan-section" aria-labelledby="regular-payments-title">
            <div className="plan-section-heading">
              <div>
                <h2 id="regular-payments-title">Регулярные платежи</h2>
                <p>{bills.length > 0 ? `${bills.length} ${plural(bills.length, 'платёж', 'платежа', 'платежей')} каждый месяц` : 'Чтобы не держать даты в голове'}</p>
              </div>
            </div>

            {bills.length === 0 ? (
              <div className="plan-empty">
                <div className="empty-state-mark empty-state-mark--plan" aria-hidden="true">
                  <CreditCard size={28} />
                </div>
                <div>
                  <p className="plan-empty__title">Добавьте первый платёж</p>
                  <p className="plan-empty__copy">Аренда, интернет, ЖКХ или подписка — Листок напомнит вовремя.</p>
                </div>
              </div>
            ) : (
              <div className="plan-bill-list">
          {sortedBills.map((b) => {
            const due = billDueLabel(b.day_of_month)
            const paid = !!b.paid_cycle
            const isAlert = !paid && (due.key === 'today' || due.key === 'overdue' || due.key === 'in-1')

            return (
              <div
                key={b.id}
                className={cn(
                  'plan-bill-card',
                  paid
                    ? 'is-paid'
                    : isAlert
                      ? 'is-alert'
                      : '',
                )}
              >
                <div className="plan-bill-card__main">
                  <div className="plan-bill-date" aria-label={`${b.day_of_month}-е число`}>
                    <strong className="t-num">{b.day_of_month}</strong>
                    <span>число</span>
                  </div>

                  <div className="plan-bill-card__content">
                    <div className="plan-bill-card__title-row">
                      <span className="plan-bill-card__title t-display">
                        {b.title}
                      </span>
                      <span
                        className={cn(
                          'plan-bill-status',
                          paid
                            ? 'is-paid'
                            : isAlert
                              ? 'is-alert'
                              : '',
                        )}
                      >
                        {b.paused?'На паузе':paid ? 'Оплачен' : due.label}
                      </span>
                    </div>
                    <p className="plan-bill-card__meta">Каждый месяц</p>
                  </div>

                  <span className="plan-bill-card__amount t-num">
                    {money(b.amount)}
                  </span>
                </div>

                <div className="plan-bill-card__actions">
                  <button
                    type="button"
                    disabled={acting||b.paused}
                    onClick={()=>paid?perform(()=>setBillPaid({data:{billId:b.id,paid:false}})):setPayTarget(b)}
                    className={cn(
                      'plan-pay-action',
                      paid
                        ? 'is-paid'
                        : '',
                    )}
                  >
                    {paid ? <Check size={13} strokeWidth={2.5} /> : null}
                    <span>{paid ? 'Оплачено' : 'Отметить оплату'}</span>
                  </button>

                  <details className="plan-bill-menu"><summary>Ещё</summary><div className="plan-bill-tools"><button className="plan-icon-action" aria-label="Изменить платёж" onClick={()=>{setEditing(b);setTitle(b.title);setAmount(String(b.amount));setDay(String(b.day_of_month));setError('');setOpenSheet(true)}}><Pencil size={17}/></button><button className="plan-icon-action" disabled={acting} aria-label={b.paused?'Возобновить платёж':'Приостановить платёж'} title={b.paused?'Возобновить':'Пауза'} onClick={()=>perform(()=>updateBill({data:{...b,paused:!b.paused}}))}>{b.paused?<Play size={17}/>:<Pause size={17}/>}</button>
                    <button
                      type="button"
                      disabled={acting}
                      onClick={()=>perform(()=>toggleBillNotify({data:{billId:b.id,notify:!b.notify}}))}
                      className={cn('plan-icon-action', b.notify ? 'is-active' : '')}
                      aria-label="Напоминания"
                      title={b.notify ? 'Напоминания включены' : 'Напоминания выключены'}
                    >
                      {b.notify ? <Bell size={15} /> : <BellOff size={15} />}
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm(`Удалить «${b.title}»?`)) return
                        await perform(()=>deleteBill({ data: { billId: b.id } }))
                      }}
                      className="plan-icon-action is-delete"
                      aria-label="Удалить счёт"
                      title="Удалить счёт"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div></details>
                </div>
              </div>
            )
          })}
              </div>
            )}
          </section>
        </div>

        <div className="plan-goals-column"><PersonalGoals goals={boot.goals} onRefresh={refresh} /></div>
      </div>
      <BottomSheet open={!!payTarget} onClose={()=>{if(!acting)setPayTarget(null)}} title={payTarget?'Оплата · '+payTarget.title:'Оплата'}>
       <p className="form-hint">Отметьте уже совершённую оплату. Деньги с банковской карты приложение не списывает.</p>
       {error&&<p role="alert" className="form-error">{error}</p>}
       <button disabled={acting} className="primary-action" onClick={async()=>{if(payTarget&&await perform(()=>setBillPaid({data:{billId:payTarget.id,paid:true}})))setPayTarget(null)}}>Записать расход {money(payTarget?.amount||0)}</button>
       <details><summary>Этот расход уже записан</summary><p className="form-hint">Выберите покупку на такую же сумму за текущий месяц. Нового расхода не будет; отмена отметки сохранит исходную покупку.</p>{candidatesBusy?<p>Загрузка…</p>:!candidates.length?<p>Подходящих расходов пока нет.</p>:candidates.map(r=><button key={r.id} disabled={acting} className="payment-candidate" onClick={async()=>{if(payTarget&&await perform(()=>setBillPaid({data:{billId:payTarget.id,paid:true,receiptId:r.id}})))setPayTarget(null)}}><span>{r.store}<small>{r.purchased_at}</small></span><strong>{money(r.total)}</strong></button>)}</details>
      </BottomSheet>
      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        title={editing?"Изменить платёж":"Новый регулярный платёж"}
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

          <p className="form-hint">В коротком месяце платёж на 29–31 число переносится на последний день.</p>{error&&<p className="form-error" role="alert">{error}</p>}
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
