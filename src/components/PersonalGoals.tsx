import { assertSaved, newRequestId } from '~/lib/finance'
import * as React from 'react'
import { motion } from 'motion/react'
import {
  Car,
  Check,
  Gift,
  Home,
  Palmtree,
  PiggyBank,
  Plus,
  Shield,
  Smartphone,
  Target,
  Trash2,
} from 'lucide-react'
import { BottomSheet } from './BottomSheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { showInAppNotification } from './NotificationBanner'
import { money, moneyShort } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import { goalHistory, reverseGoalDeposit, createGoal, depositToGoal, deleteGoal, type UserGoal } from '~/server/functions/goals'

interface PersonalGoalsProps {
  goals: Array<UserGoal>
  onRefresh: () => Promise<void>
  dailyLeft?: number
}

const PRESET_GOALS = [
  { title: 'Отпуск на море', amount: 80000, icon: 'palmtree', color: '#0284c7' },
  { title: 'Подушка безопасности', amount: 150000, icon: 'shield', color: '#2d7a4f' },
  { title: 'Новый смартфон', amount: 75000, icon: 'smartphone', color: '#7c3aed' },
  { title: 'Подарки к празднику', amount: 25000, icon: 'gift', color: '#db2777' },
  { title: 'Обслуживание авто', amount: 40000, icon: 'car', color: '#d97706' },
  { title: 'Уют и ремонт дома', amount: 60000, icon: 'home', color: '#059669' },
]

const QUICK_DEPOSIT_AMOUNTS = [500, 1000, 2500, 5000]

function getGoalIcon(icon: string, size = 18) {
  switch (icon) {
    case 'palmtree':
      return <Palmtree size={size} className="text-sky-600" />
    case 'shield':
      return <Shield size={size} className="text-sage" />
    case 'smartphone':
      return <Smartphone size={size} className="text-purple-600" />
    case 'gift':
      return <Gift size={size} className="text-pink-600" />
    case 'car':
      return <Car size={size} className="text-amber-600" />
    case 'home':
      return <Home size={size} className="text-emerald-600" />
    default:
      return <Target size={size} className="text-sage" />
  }
}

export function PersonalGoals({ goals, onRefresh, dailyLeft = 0 }: PersonalGoalsProps) {
  const [openAddSheet, setOpenAddSheet] = React.useState(false)
  const [depositGoalTarget, setDepositGoalTarget] = React.useState<UserGoal | null>(null)

  // Поля формы создания
  const [newTitle, setNewTitle] = React.useState('')
  const [newAmount, setNewAmount] = React.useState('')
  const [newIcon, setNewIcon] = React.useState('target')
  const [newDate, setNewDate] = React.useState('')
  const [createBusy, setCreateBusy] = React.useState(false)

  // Поля формы пополнения
  const [depAmount, setDepAmount] = React.useState('')
  const [depNote, setDepNote] = React.useState('')
  const [depRecordExpense, setDepRecordExpense] = React.useState(true)
  const [depBusy, setDepBusy] = React.useState(false)
  const [error,setError]=React.useState('')
  const [history,setHistory]=React.useState<UserGoal|null>(null)
  const [deposits,setDeposits]=React.useState<any[]>([])
  const [historyBusy,setHistoryBusy]=React.useState(false)
  const depRequest=React.useRef('')
  React.useEffect(()=>{depRequest.current=newRequestId();setError('')},[depositGoalTarget])
  async function openHistory(goal:UserGoal){setHistory(goal);setHistoryBusy(true);setError('')
    try{const r=assertSaved(await goalHistory({data:{goalId:goal.id}}));setDeposits(r.deposits)}
    catch(e:any){setError(e.message||'Не удалось загрузить взносы')}
    finally{setHistoryBusy(false)}
  }
  async function undoDeposit(id:string){
    if(historyBusy)return;setHistoryBusy(true);setError('')
    try{assertSaved(await reverseGoalDeposit({data:{id}}));await onRefresh();if(history)await openHistory(history)}
    catch(e:any){setError(e.message||'Не удалось отменить взнос')}
    finally{setHistoryBusy(false)}
  }

  const totalCollected = React.useMemo(() => {
    return goals.reduce((sum, g) => sum + (g.collected || 0), 0)
  }, [goals])

  const totalTarget = React.useMemo(() => {
    return goals.reduce((sum, g) => sum + (g.amount || 0), 0)
  }, [goals])

  const handleApplyPreset = (preset: (typeof PRESET_GOALS)[0]) => {
    haptic(6)
    setNewTitle(preset.title)
    setNewAmount(String(preset.amount))
    setNewIcon(preset.icon)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = Math.round(Number(newAmount.replace(/[^\d]/g, '') || 0))
    if (!newTitle.trim() || amt <= 0 || createBusy) return

    setCreateBusy(true)
    try {
      const res = await createGoal({
        data: {
          title: newTitle.trim(),
          amount: amt,
          icon: newIcon,
          targetDate: newDate ? newDate : null,
        },
      })
      assertSaved(res)
      if ('ok' in res && res.ok) {
        haptic(12)
        showInAppNotification({
          title: 'Копилка создана 🎯',
          body: `Цель «${newTitle.trim()}» на ${money(amt)} готова`,
          icon: 'sparkles',
        })
        setNewTitle('')
        setNewAmount('')
        setNewDate('')
        setOpenAddSheet(false)
        await onRefresh()
      }
    } catch(e:any){setError(e.message||'Не удалось создать цель')} finally {
      setCreateBusy(false)
    }
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!depositGoalTarget || depBusy) return
    const amt = Math.round(Number(depAmount.replace(/[^\d]/g, '') || 0))
    if (amt <= 0) return

    setDepBusy(true)
    try {
      const res = await depositToGoal({
        data: {
          goalId: depositGoalTarget.id,
          amount: amt,
          note: depNote.trim() || undefined,
          recordExpense: depRecordExpense,
          requestId:depRequest.current,
        },
      })

      if ('ok' in res && res.ok) {
        haptic(14)
        if (res.completed) {
          showInAppNotification({
            title: '🎉 Цель достигнута!',
            body: `Поздравляем! «${depositGoalTarget.title}» накоплена на 100%!`,
            icon: 'sparkles',
          })
        } else {
          showInAppNotification({
            title: 'Копилка пополнена 🌿',
            body: `+${money(amt)} в «${depositGoalTarget.title}»`,
            icon: 'sparkles',
          })
        }
        setDepositGoalTarget(null)
        setDepAmount('')
        setDepNote('')
        await onRefresh()
      }
    } catch(e:any){setError(e.message||'Не удалось пополнить цель')} finally {
      setDepBusy(false)
    }
  }

  const handleDelete = async (goal: UserGoal) => {
    if (!confirm(`Удалить цель «${goal.title}»? Записанные расходы останутся в истории.`)) return
    haptic(8)
    try{assertSaved(await deleteGoal({ data: { id: goal.id } }));await onRefresh()}catch(e:any){setError(e.message||'Не удалось удалить цель')}
  }

  return (
    <section className="personal-goals" aria-label="Личные цели и копилки">{error&&<p className="form-error" role="alert">{error}</p>}
      <div className="plan-section-heading plan-goals-heading">
        <div className="flex items-center gap-2">
          <div className="plan-section-icon">
            <PiggyBank size={18} strokeWidth={2.1} />
          </div>
          <div>
            <h2>Копилки и цели</h2>
            {totalCollected > 0 ? (
              <p>
                Накоплено {money(totalCollected)} из {moneyShort(totalTarget)}
              </p>
            ) : (
              <p>Личные накопления</p>
            )}
          </div>
        </div>

        {goals.length > 0 ? (
          <Button
            variant="paper"
            size="sm"
            onClick={() => {
              haptic(8)
              setOpenAddSheet(true)
            }}
            className="plan-goal-add"
          >
            <Plus size={15} />
            <span>Новая цель</span>
          </Button>
        ) : null}
      </div>

      {goals.length === 0 ? (
        <div className="plan-goals-empty">
          <span className="empty-state-mark" aria-hidden="true"><Target size={28} /></span>
          <p className="plan-empty__title">
            Начните копить на мечту
          </p>
          <p className="plan-empty__copy">
            Отпуск, резервный фонд или крупная покупка — прогресс всегда будет перед глазами.
          </p>
          <Button
            size="sm"
            onClick={() => {
              haptic(8)
              setOpenAddSheet(true)
            }}
            className="plan-empty__button"
          >
            <Plus size={14} className="mr-1.5" />
            Создать первую цель
          </Button>
        </div>
      ) : (
        <div className="plan-goal-list">
          {goals.map((goal) => {
            const percent = Math.min(
              100,
              goal.amount > 0 ? Math.round((goal.collected / goal.amount) * 100) : 0,
            )
            const isDone = percent >= 100
            const leftToCollect = Math.max(0, goal.amount - goal.collected)

            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'plan-goal-card',
                  isDone ? 'is-done' : '',
                )}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="plan-goal-icon">
                      {getGoalIcon(goal.icon, 20)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="plan-goal-title">
                          {goal.title}
                        </span>
                        {isDone ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-600/12 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-800">
                            <Check size={10} strokeWidth={2.5} /> Готово
                          </span>
                        ) : null}
                      </div>
                      <div className="plan-goal-amounts">
                        <span className="t-num font-semibold text-ink">
                          {money(goal.collected)}
                        </span>
                        <span>из {money(goal.amount)}</span>
                        <span className="text-sage font-semibold">({percent}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="plan-goal-actions">
                    {!isDone ? (
                      <button
                        type="button"
                        onClick={() => {
                          haptic(6)
                          setDepositGoalTarget(goal)
                          setDepAmount('1000')
                        }}
                        className="plan-goal-deposit"
                      >
                        <Plus size={12} />
                        <span>Пополнить</span>
                      </button>
                    ) : null}

                    <button className="text-action" type="button" onClick={()=>openHistory(goal)}>История</button>
                    <button
                      type="button"
                      onClick={() => handleDelete(goal)}
                      className="plan-goal-delete"
                      aria-label={`Удалить цель «${goal.title}»`}
                      title="Удалить цель"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Прогресс-бар */}
                <div className="mt-2.5">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-rule-soft">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        'h-full rounded-full transition-colors',
                        isDone
                          ? 'bg-emerald-600'
                          : percent > 60
                          ? 'bg-sage'
                          : 'bg-sage/80',
                      )}
                    />
                  </div>

                  {!isDone && leftToCollect > 0 ? (
                    <div className="flex justify-between items-center text-[10px] text-muted/80 mt-1">
                      <span>Осталось {money(leftToCollect)}</span>
                      {goal.target_date ? (
                        <span>До {goal.target_date}</span>
                      ) : (
                        <span>Цель</span>
                      )}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Модальное окно создания цели */}
      <BottomSheet
        open={openAddSheet}
        onClose={() => setOpenAddSheet(false)}
        title="Новая цель или копилка"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-1">
          {/* Пресеты */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Быстрый выбор цели
            </label>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {PRESET_GOALS.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="flex items-center gap-2 rounded-xl border border-rule/80 bg-paper/80 p-2 text-left hover:border-sage/50 transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rule/30">
                    {getGoalIcon(p.icon, 15)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-semibold text-ink truncate leading-tight">
                      {p.title}
                    </div>
                    <div className="text-[10px] text-muted">
                      {moneyShort(p.amount)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Название */}
          <div>
            <label className="text-[11.5px] font-semibold text-muted block mb-1">
              Название цели
            </label>
            <Input
              type="text"
              placeholder="Например: Поездка в горы"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="h-10 rounded-xl"
              required
            />
          </div>

          {/* Сумма */}
          <div>
            <label className="text-[11.5px] font-semibold text-muted block mb-1">
              Целевая сумма (₽)
            </label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="50 000"
              value={newAmount}
              onChange={(e) => {
                const clean = e.target.value.replace(/[^\d]/g, '')
                setNewAmount(clean ? Number(clean).toLocaleString('ru-RU') : '')
              }}
              className="h-10 rounded-xl t-num font-semibold text-[15px]"
              required
            />
          </div>

          {/* Кнопка отправки */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={createBusy || !newTitle.trim() || !newAmount}
              className="w-full h-11 rounded-xl bg-sage text-onsage font-semibold text-[13.5px] hover:bg-sage-dark shadow-xs"
            >
              {createBusy ? 'Создаём...' : 'Создать копилку 🌿'}
            </Button>
          </div>
          <label className="expense-form">Срок цели · необязательно<input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)}/></label>{error&&<p role="alert" className="form-error">{error}</p>}
        </form>
      </BottomSheet>

      {/* Модальное окно пополнения цели */}
      <BottomSheet
        open={Boolean(depositGoalTarget)}
        onClose={() => setDepositGoalTarget(null)}
        title={depositGoalTarget ? `Пополнить «${depositGoalTarget.title}»` : 'Пополнить'}
      >
        {error&&<p role="alert" className="form-error">{error}</p>}
        {depositGoalTarget && (
          <form onSubmit={handleDeposit} className="space-y-4 pt-1">
            {/* Текущий прогресс */}
            <div className="rounded-xl border border-rule/70 bg-paper/60 p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted block">Сейчас накоплено</span>
                <span className="text-[15px] font-bold text-ink t-num">
                  {money(depositGoalTarget.collected)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-muted block">Цель</span>
                <span className="text-[13.5px] font-semibold text-muted t-num">
                  {money(depositGoalTarget.amount)}
                </span>
              </div>
            </div>

            {/* Быстрые кнопки сумм */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1.5">
                Быстрая сумма
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {QUICK_DEPOSIT_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      haptic(6)
                      setDepAmount(String(amt))
                    }}
                    className={cn(
                      'h-9 rounded-xl border text-[12px] font-semibold transition-all',
                      depAmount === String(amt)
                        ? 'border-sage bg-sage text-onsage'
                        : 'border-rule/80 bg-paper hover:border-sage/40 text-ink',
                    )}
                  >
                    +{amt} ₽
                  </button>
                ))}
              </div>
            </div>

            {/* Ввод произвольной суммы */}
            <div>
              <label className="text-[11.5px] font-semibold text-muted block mb-1">
                Сумма пополнения (₽)
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={depAmount}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^\d]/g, '')
                  setDepAmount(clean)
                }}
                className="h-10 rounded-xl t-num font-bold text-[16px]"
                required
              />
            </div>

            {/* Чекбокс: списать из бюджета */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none rounded-xl border border-rule/70 bg-paper/50 p-2.5">
              <input
                type="checkbox"
                checked={depRecordExpense}
                onChange={(e) => setDepRecordExpense(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-rule text-sage focus:ring-sage"
              />
              <div className="text-[11.5px] leading-snug">
                <span className="font-semibold text-ink block">
                  Записать как расход из бюджета
                </span>
                <span className="text-muted text-[10.5px]">
                  Уменьшит свободный остаток на месяц, чтобы деньги действительно были отложены
                </span>
              </div>
            </label>

            {/* Кнопка пополнения */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={depBusy || !depAmount || Number(depAmount) <= 0}
                className="w-full h-11 rounded-xl bg-sage text-onsage font-semibold text-[13.5px] hover:bg-sage-dark shadow-xs"
              >
                {depBusy ? 'Пополняем...' : `Отложить ${money(Number(depAmount) || 0)} 🌿`}
              </Button>
            </div>
          </form>
        )}
      </BottomSheet>
      <BottomSheet open={!!history} onClose={()=>setHistory(null)} title={history?'Взносы · '+history.title:'Взносы'}>
        {error&&<p className="form-error" role="alert">{error}</p>}{historyBusy&&<p role="status">Загрузка…</p>}
        {!historyBusy&&!deposits.length&&<p>Пополнений пока нет.</p>}
        {deposits.map(d=><div key={d.id} className="goal-history-row"><div><strong>{money(Number(d.amount))}</strong><small>{new Date(d.created_at).toLocaleDateString('ru-RU')}{d.note?' · '+d.note:''}</small></div>{d.reversed_at?<span>Отменён</span>:<button className="text-action" disabled={historyBusy} onClick={()=>undoDeposit(d.id)}>Отменить взнос</button>}</div>)}
      </BottomSheet>
    </section>
  )
}
