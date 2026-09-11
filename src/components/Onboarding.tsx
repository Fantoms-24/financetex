import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, CircleDollarSign, Loader2, ReceiptText, SlidersHorizontal, Wallet } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { CATEGORIES, moneyShort } from '~/lib/format'
import { cn } from '~/lib/utils'
import { addReceipt } from '~/server/functions/receipts'
import { completeOnboarding, saveSettings } from '~/server/functions/settings'

type Step = 0 | 1 | 2

function assertSaved(result: { ok?: boolean; error?: string }) {
  if (!result?.ok) throw new Error(result?.error || 'Не удалось сохранить изменения')
}

const steps = [
  { label: 'Доход', icon: Wallet },
  { label: 'Лимит', icon: SlidersHorizontal },
  { label: 'Покупка', icon: ReceiptText },
]

function amount(value: string) {
  const normalized = value.replace(/\s/g, '').replace(',', '.')
  const result = Math.round(Number(normalized))
  return Number.isFinite(result) && result >= 0 ? result : null
}

function suggestedBudget(income: string) {
  const value = amount(income)
  if (!value) return ''
  return String(Math.max(500, Math.round((value * 0.6) / 100) * 100))
}

export function Onboarding({ open, onCompleted }: { open: boolean; onCompleted: () => Promise<void> }) {
  const { user } = useApp()
  const [step, setStep] = React.useState<Step>(0)
  const [income, setIncome] = React.useState('')
  const [budget, setBudget] = React.useState('')
  const [budgetTouched, setBudgetTouched] = React.useState(false)
  const [expense, setExpense] = React.useState('')
  const [store, setStore] = React.useState('')
  const [category, setCategory] = React.useState('food')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')
  const requestId = React.useRef(`onboarding-${Date.now()}-${Math.random().toString(36).slice(2)}`)

  React.useEffect(() => {
    if (!open) return
    setStep(0)
    setError('')
  }, [open])

  const displayName = user?.name?.trim().split(/\s+/)[0] || 'друг'

  const forward = () => {
    setError('')
    if (step === 0) return setStep(1)
    if (step === 1) {
      const incomeValue = income.trim() ? amount(income) : 0
      const budgetValue = budget.trim() ? amount(budget) : 0
      if (incomeValue === null || budgetValue === null) return setError('Укажите сумму цифрами или оставьте поле пустым.')
      if (incomeValue > 100_000_000 || budgetValue > 100_000_000) return setError('Сумма должна быть не больше 100 000 000 ₽.')
      return setStep(2)
    }
    void finish(true)
  }

  async function finish(withExpense: boolean) {
    if (busy) return
    setError('')
    const incomeValue = income.trim() ? amount(income) : null
    const budgetValue = budget.trim() ? amount(budget) : null
    const expenseValue = expense.trim() ? amount(expense) : null
    if (incomeValue === null && income.trim()) return setError('Проверьте сумму дохода.')
    if (budgetValue === null && budget.trim()) return setError('Проверьте месячный лимит.')
    if (withExpense && expenseValue === null && expense.trim()) return setError('Проверьте сумму покупки.')
    if (withExpense && expenseValue === 0) return setError('Для покупки укажите сумму больше нуля или пропустите этот шаг.')
    if ([incomeValue, budgetValue, expenseValue].some((value) => value !== null && value > 100_000_000)) {
      return setError('Сумма должна быть не больше 100 000 000 ₽.')
    }

    setBusy(true)
    try {
      if (incomeValue !== null || budgetValue !== null) {
        const saved = await saveSettings({ data: {
          ...(incomeValue !== null ? { monthly_income: incomeValue } : {}),
          ...(budgetValue !== null ? { monthly_budget: budgetValue } : {}),
        } })
        assertSaved(saved)
      }
      if (withExpense && expenseValue && expenseValue > 0) {
        const receipt = await addReceipt({ data: {
          total: expenseValue,
          store: store.trim() || 'Первая покупка',
          category,
          requestId: requestId.current,
        } })
        assertSaved(receipt)
      }
      const completed = await completeOnboarding()
      assertSaved(completed)
      await onCompleted()
    } catch (cause: any) {
      setError(cause?.message || 'Не получилось сохранить. Проверьте соединение и попробуйте ещё раз.')
    } finally {
      setBusy(false)
    }
  }

  const progress = ((step + 1) / steps.length) * 100

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex min-h-[100svh] justify-center overflow-y-auto bg-ink/35 px-4 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-[calc(env(safe-area-inset-top)+20px)] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-labelledby="onboarding-title"
        >
          <motion.section
            className="my-auto w-full max-w-[420px] overflow-hidden rounded-[28px] border border-rule/80 bg-paper shadow-[0_24px_70px_rgba(28,25,21,0.24)]"
            initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="border-b border-rule/70 px-5 pb-4 pt-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-sage">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-sage text-onsage"><CircleDollarSign size={16} /></span>
                  Листок. для себя
                </div>
                <span className="text-[12px] text-muted">Шаг {step + 1} из 3</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-rule/60">
                <motion.div className="h-full rounded-full bg-sage" animate={{ width: `${progress}%` }} transition={{ duration: 0.24 }} />
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.16 }}>
                  {step === 0 ? (
                    <Intro name={displayName} />
                  ) : step === 1 ? (
                    <IncomeStep income={income} budget={budget} budgetTouched={budgetTouched} onIncome={(value) => {
                      setIncome(value)
                      if (!budgetTouched) setBudget(suggestedBudget(value))
                    }} onBudget={(value) => { setBudgetTouched(true); setBudget(value) }} />
                  ) : (
                    <ExpenseStep expense={expense} store={store} category={category} onExpense={setExpense} onStore={setStore} onCategory={setCategory} />
                  )}
                </motion.div>
              </AnimatePresence>

              {error ? <p role="alert" className="mt-4 rounded-xl border border-stamp/25 bg-stamp/8 px-3 py-2.5 text-[13px] leading-snug text-stamp">{error}</p> : null}

              <div className="mt-6 flex flex-col gap-2.5">
                <Button type="button" variant="sage" size="lg" className="w-full" disabled={busy} onClick={forward}>
                  {busy ? <><Loader2 size={18} className="animate-spin" />Сохраняем…</> : step === 2 ? <>Сохранить и открыть обзор <Check size={18} /></> : <>Продолжить <ArrowRight size={18} /></>}
                </Button>
                {step === 2 ? (
                  <Button type="button" variant="ghost" size="md" className="w-full text-muted" disabled={busy} onClick={() => void finish(false)}>Открыть обзор без покупки</Button>
                ) : step === 0 ? (
                  <Button type="button" variant="ghost" size="md" className="w-full text-muted" disabled={busy} onClick={() => void finish(false)}>Настроить позже</Button>
                ) : (
                  <Button type="button" variant="ghost" size="md" className="w-full text-muted" disabled={busy} onClick={() => { setError(''); setStep((current) => (current - 1) as Step) }}><ArrowLeft size={17} /> Назад</Button>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Intro({ name }: { name: string }) {
  return <div>
    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-sage/10 text-sage"><Wallet size={28} strokeWidth={1.8} /></div>
    <p className="mt-5 text-[13px] font-medium text-sage">Добро пожаловать, {name}</p>
    <h1 id="onboarding-title" className="t-display mt-1 text-[29px] font-semibold leading-[1.05] tracking-tight text-ink">Настроим месяц<br />в вашем ритме</h1>
    <p className="mt-3 max-w-[340px] text-[15px] leading-relaxed text-muted">Три простых шага помогут сразу увидеть деньги понятнее. Ничего обязательного — всё можно изменить позже.</p>
    <div className="mt-6 grid grid-cols-3 gap-2">
      {steps.map(({ label, icon: Icon }, index) => <div key={label} className="rounded-2xl border border-rule/70 bg-cream px-2 py-3 text-center"><span className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-paper text-sage shadow-paper"><Icon size={16} /></span><span className="mt-2 block text-[11px] font-medium text-ink">{index + 1}. {label}</span></div>)}
    </div>
  </div>
}

function IncomeStep({ income, budget, budgetTouched, onIncome, onBudget }: { income: string; budget: string; budgetTouched: boolean; onIncome: (value: string) => void; onBudget: (value: string) => void }) {
  return <div>
    <p className="text-[13px] font-medium text-sage">Ваш ориентир</p>
    <h1 id="onboarding-title" className="t-display mt-1 text-[27px] font-semibold leading-tight tracking-tight text-ink">Сколько приходит<br />и сколько комфортно тратить?</h1>
    <p className="mt-2 text-[14px] leading-relaxed text-muted">Доход остаётся только в вашем бюджете. Лимит — не запрет, а спокойный ориентир на месяц.</p>
    <div className="mt-6 space-y-4">
      <div><label htmlFor="onboarding-income" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.09em] text-muted">Доход в месяц</label><Input id="onboarding-income" inputMode="numeric" value={income} onChange={(event) => onIncome(event.target.value)} placeholder="Например, 90 000" endIcon={<span className="text-[14px] font-medium">₽</span>} /></div>
      <div><label htmlFor="onboarding-budget" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.09em] text-muted">Лимит трат на месяц</label><Input id="onboarding-budget" inputMode="numeric" value={budget} onChange={(event) => onBudget(event.target.value)} placeholder="Например, 55 000" endIcon={<span className="text-[14px] font-medium">₽</span>} />
        {!budgetTouched && income ? <p className="mt-2 text-[12px] leading-relaxed text-muted">Предложили около 60% дохода — это можно поменять.</p> : null}
      </div>
    </div>
  </div>
}

function ExpenseStep({ expense, store, category, onExpense, onStore, onCategory }: { expense: string; store: string; category: string; onExpense: (value: string) => void; onStore: (value: string) => void; onCategory: (value: string) => void }) {
  return <div>
    <p className="text-[13px] font-medium text-sage">Первый результат</p>
    <h1 id="onboarding-title" className="t-display mt-1 text-[27px] font-semibold leading-tight tracking-tight text-ink">Добавим одну<br />недавнюю покупку</h1>
    <p className="mt-2 text-[14px] leading-relaxed text-muted">Так обзор сразу станет вашим. Этот шаг необязательный.</p>
    <div className="mt-5 space-y-3.5">
      <div><label htmlFor="onboarding-expense" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.09em] text-muted">Сумма покупки</label><Input id="onboarding-expense" inputMode="numeric" autoFocus value={expense} onChange={(event) => onExpense(event.target.value)} placeholder="Например, 780" endIcon={<span className="text-[14px] font-medium">₽</span>} /></div>
      <div className="grid grid-cols-[1fr_auto] gap-2.5"><div><label htmlFor="onboarding-store" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.09em] text-muted">Где купили</label><Input id="onboarding-store" value={store} onChange={(event) => onStore(event.target.value)} placeholder="Магазин или кафе" /></div><div className="min-w-[112px]"><label htmlFor="onboarding-category" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.09em] text-muted">Категория</label><select id="onboarding-category" value={category} onChange={(event) => onCategory(event.target.value)} className="field h-[46px] w-full px-3 text-[13px]"><option value="food">🛒 Еда</option>{CATEGORIES.filter((item) => item.id !== 'food').map((item) => <option key={item.id} value={item.id}>{item.icon} {item.shortLabel}</option>)}</select></div></div>
      {expense && amount(expense) ? <p className="rounded-xl bg-sage/8 px-3 py-2 text-[12px] text-sage">В обзор попадёт расход на {moneyShort(amount(expense))}.</p> : null}
    </div>
  </div>
}
