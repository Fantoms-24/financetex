import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Coins,
  Copy,
  CreditCard,
  Crown,
  Eye,
  Home,
  Info,
  Layers,
  LoaderCircle,
  LogOut,
  MessageSquare,
  Package,
  PiggyBank,
  Plus,
  Receipt,
  ReceiptText,
  ScanLine,
  Send,
  Settings2,
  Share2,
  ShoppingBag,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Tv,
  Users,
  Wallet,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { BottomSheet } from '~/components/BottomSheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { billDueLabel, categoryLabel, dateRu, money, moneyShort, plural, timeRu } from '~/lib/format'
import { cn } from '~/lib/utils'
import {
  addHouseBill,
  addWish,
  askHouseAgent,
  deleteHouse,
  deleteHouseBill,
  deleteWish,
  depositGoal,
  getHouse,
  kickMember,
  leaveHouse,
  linkReceiptToHouse,
  liveHouse,
  payHouseBill,
  sendHouseMessage,
  setHouseBudget,
  setSalary,
  toggleWish,
  type GoalDeposit,
  type HouseAnalytics,
  type HouseBill,
  type HouseReceipt,
  type Member,
  type Msg,
  type Pay,
  type Wish,
} from '~/server/functions/houses'
import { listReceipts } from '~/server/functions/receipts'

export const Route = createFileRoute('/groups/$id')({
  component: HousePage,
})

interface Snap {
  house: { id: string; name: string; code: string; owner_id: string; monthly_budget: number; created_at: string } | null
  members: Array<Member>
  bills: Array<HouseBill>
  wishes: Array<Wish>
  receipts: Array<HouseReceipt>
  messages: Array<Msg>
  pays: Array<Pay>
  analytics: HouseAnalytics
  shares: Record<string, Record<string, number>>
  cycle: string
  version?: string
  you?: string
}

const SPLIT_LABEL: Record<string, string> = {
  equal: 'Поровну',
  salary: 'По зарплате',
  payer: 'Платит один',
}

const AVATAR_COLORS = [
  'bg-[#e3ece6] text-[#2c4737] border-[#bfd5c6]',
  'bg-[#faead9] text-[#7a481c] border-[#ebd0b5]',
  'bg-[#e2eaf5] text-[#244773] border-[#bccfe8]',
  'bg-[#fbe4e4] text-[#7a2e2e] border-[#ecc4c4]',
  'bg-[#ece4fb] text-[#4d2e7a] border-[#d8c7f2]',
  'bg-[#e4f7f5] text-[#1b5d56] border-[#beeae6]',
]

function getInitials(name: string): string {
  const clean = (name || '').trim()
  if (!clean) return '?'
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return clean.slice(0, 2).toUpperCase()
}

function getBillIcon(title: string) {
  const t = (title || '').toLowerCase()
  if (t.includes('аренд') || t.includes('квартир') || t.includes('дом') || t.includes('ипотек')) {
    return <Home size={16} />
  }
  if (t.includes('интернет') || t.includes('wifi') || t.includes('вайфай') || t.includes('связь')) {
    return <Wifi size={16} />
  }
  if (t.includes('жкх') || t.includes('свет') || t.includes('вод') || t.includes('газ') || t.includes('коммунал')) {
    return <Zap size={16} />
  }
  if (t.includes('подписк') || t.includes('тв') || t.includes('кино') || t.includes('музык') || t.includes('янд')) {
    return <Tv size={16} />
  }
  if (t.includes('продукт') || t.includes('еда') || t.includes('магаз') || t.includes('рынок')) {
    return <ShoppingBag size={16} />
  }
  return <Receipt size={16} />
}

function HousePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useApp()

  const [snap, setSnap] = React.useState<Snap | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [tab, setTab] = React.useState<'bills' | 'receipts' | 'goals' | 'analytics' | 'chat'>('bills')
  const [showSettings, setShowSettings] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [showMembersDetail, setShowMembersDetail] = React.useState(false)
  const [openReceiptId, setOpenReceiptId] = React.useState<string | null>(null)
  const [agentBusy, setAgentBusy] = React.useState(false)
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

  // Live polling
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
        /* сеть */
      }
    }
    const t = setInterval(tick, 2500)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [id])

  const copyCode = async (code: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code)
      }
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const shareCode = async (code: string, houseName: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Касса «${houseName}» в ЧекАгенте`,
          text: `Присоединяйся к семейной кассе «${houseName}» в приложении ЧекАгент. Код приглашения: ${code}`,
          url: window.location.href,
        })
        return
      } catch {
        /* fallback to copy */
      }
    }
    await copyCode(code)
  }

  if (error) {
    return (
      <div className="px-4 pt-6">
        <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stamp/10 text-stamp">
            <AlertCircle size={24} />
          </div>
          <h2 className="t-display text-[18px] text-ink">{error}</h2>
          <p className="mt-1 text-[13px] text-muted">Возможно, касса была удалена или вы вышли из неё</p>
          <Button className="mt-4 w-full" variant="sage" onClick={() => navigate({ to: '/groups' })}>
            <ArrowLeft size={16} /> Вернуться к кассам
          </Button>
        </div>
      </div>
    )
  }

  if (!snap || !snap.house) {
    return (
      <div className="px-4 pt-6">
        <div className="h-44 animate-[breathe_1.4s_ease-in-out_infinite] rounded-[18px] border border-rule/60 bg-paper/50" />
      </div>
    )
  }

  const isOwner = snap.house.owner_id === user?.id
  const totalBillsAmount = snap.bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
  const myUserId = user?.id || ''
  const myTotalShare = snap.bills.reduce((sum, b) => {
    const share = snap.shares?.[b.id]?.[myUserId] ?? 0
    return sum + share
  }, 0)

  const paidBills = snap.bills.filter((b) =>
    snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle),
  )
  const paidCount = paidBills.length
  const totalBillsCount = snap.bills.length
  const percentPaid = totalBillsCount > 0 ? Math.round((paidCount / totalBillsCount) * 100) : 0

  const myPaidShare = snap.bills.reduce((sum, b) => {
    const isPaid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle)
    if (isPaid) {
      return sum + (snap.shares?.[b.id]?.[myUserId] ?? 0)
    }
    return sum
  }, 0)
  const myUnpaidShare = Math.max(0, myTotalShare - myPaidShare)

  const totalSalaries = snap.members.reduce((s, m) => s + Math.max(0, m.salary), 0)
  const activeGoalsCount = snap.wishes.filter((w) => !w.bought_at).length
  const receiptsSum = snap.receipts.reduce((s, r) => s + (Number(r.total) || 0), 0)

  return (
    <div className="pb-28 pt-3 sm:pb-24">
      {/* 1. Верхняя панель навигации */}
      <header className="mb-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/groups"
            className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 text-[13px] font-medium text-ink shadow-sm transition hover:bg-white active:scale-95"
            aria-label="Назад к кассам"
          >
            <ArrowLeft size={15} />
            <span>Кассы</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => copyCode(snap.house!.code)}
              className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-rule bg-paper px-2.5 font-mono text-[12.5px] font-medium tracking-wide text-sage shadow-sm transition hover:bg-white active:scale-95"
              title="Нажмите, чтобы скопировать код"
            >
              <Copy size={13} className="shrink-0" />
              <span>{copiedCode ? 'Скопировано!' : snap.house.code}</span>
            </button>

            <button
              onClick={() => shareCode(snap.house!.code, snap.house!.name)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule bg-paper text-muted shadow-sm transition hover:bg-white hover:text-ink active:scale-95"
              aria-label="Поделиться кассой"
              title="Поделиться"
            >
              <Share2 size={15} />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-rule shadow-sm transition active:scale-95',
                showSettings ? 'bg-sage text-onsage border-sage' : 'bg-paper text-muted hover:bg-white hover:text-ink',
              )}
              aria-label="Настройки кассы"
              title="Управление кассой"
            >
              <Settings2 size={15} />
            </button>
          </div>
        </div>

        {/* Название кассы и бейдж участников */}
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <h1 className="t-display truncate text-[25px] font-semibold leading-tight text-ink">{snap.house.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-muted">
              <Users size={13} className="shrink-0 text-sage" />
              <span className="font-medium">
                {snap.members.length} {plural(snap.members.length, 'участник', 'участника', 'участников')}
              </span>
              <span>·</span>
              <span className="truncate">{snap.members.map((m) => m.name).join(', ')}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Выпадающая панель настроек / управления кассой */}
      {showSettings ? (
        <div className="mb-4 px-4">
          <div className="rounded-[16px] border border-rule bg-paper p-4 shadow-paper">
            <div className="mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Settings2 size={16} className="text-sage" />
                <h3 className="t-display text-[15px] font-semibold text-ink">Управление кассой</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[12px] text-muted hover:text-ink"
              >
                Закрыть
              </button>
            </div>

            {/* Месячный бюджет кассы */}
            <div className="mb-3 rounded-[12px] border border-rule/60 bg-white/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Месячный бюджет кассы</p>
                  <p className="t-num text-[16px] font-bold text-ink">
                    {snap.house.monthly_budget > 0 ? money(snap.house.monthly_budget) : 'Не установлен'}
                  </p>
                </div>
                <EditBudgetModal
                  currentBudget={snap.house.monthly_budget}
                  onSave={async (val) => {
                    await setHouseBudget({ data: { houseId: id, budget: val } })
                    await load()
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted">
                Общий лимит расходов семьи на месяц для аналитики и контроля трат.
              </p>
            </div>

            {/* Код приглашения */}
            <div className="mb-3 rounded-[12px] border border-dashed border-sage/40 bg-sage/5 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-sage">Код для близких</p>
                  <p className="font-mono text-[16px] font-bold tracking-widest text-ink">{snap.house.code}</p>
                </div>
                <Button
                  size="sm"
                  variant="sage"
                  onClick={() => copyCode(snap.house!.code)}
                  className="h-8 gap-1 text-[12px]"
                >
                  <Copy size={13} /> {copiedCode ? 'Скопировано' : 'Копировать'}
                </Button>
              </div>
            </div>

            {/* Управление участниками (для владельца) */}
            {isOwner && snap.members.length > 1 ? (
              <div className="mb-4">
                <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-muted">Участники</p>
                <div className="space-y-1.5">
                  {snap.members
                    .filter((m) => m.user_id !== user?.id)
                    .map((m) => (
                      <div
                        key={m.user_id}
                        className="flex items-center justify-between rounded-[10px] border border-rule/60 bg-white/70 px-3 py-2 text-[13px]"
                      >
                        <span className="font-medium text-ink">{m.name}</span>
                        <button
                          onClick={async () => {
                            if (!confirm(`Исключить участника «${m.name}» из кассы?`)) return
                            await kickMember({ data: { houseId: id, userId: m.user_id } })
                            await load()
                          }}
                          className="flex items-center gap-1 text-[12px] text-stamp hover:underline"
                        >
                          <Trash2 size={13} /> Исключить
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}

            {/* Опасные действия: Выход или Удаление */}
            <div className="border-t border-rule/60 pt-3">
              {isOwner ? (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted">Вы создатель этой кассы</span>
                  <button
                    className="flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10"
                    onClick={async () => {
                      if (!confirm('Удалить кассу полностью? Все платежи, чеки и переписка будут стёрты.')) return
                      await deleteHouse({ data: { houseId: id } })
                      navigate({ to: '/groups' })
                    }}
                  >
                    <Trash2 size={13} /> Удалить кассу
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted">Покинуть совместную кассу</span>
                  <button
                    className="flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10"
                    onClick={async () => {
                      if (!confirm('Выйти из кассы? Вы перестанете получать уведомления.')) return
                      await leaveHouse({ data: { houseId: id } })
                      navigate({ to: '/groups' })
                    }}
                  >
                    <LogOut size={13} /> Выйти
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* 2. Финтех-сводка: Главная карточка баланса */}
      <section className="mb-4 px-4">
        <div className="relative overflow-hidden rounded-[20px] border border-rule bg-gradient-to-b from-[#faf7ef] to-[#f4eee2] p-4 shadow-paper">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="font-semibold uppercase tracking-wider text-muted">
              Расходы {formatCycleMonth(snap.cycle)}
            </span>
            <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-medium text-sage">
              {paidCount} из {totalBillsCount} счетов закрыто
            </span>
          </div>

          {/* Главные показатели */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-[14px] border border-rule/70 bg-white/70 p-3 shadow-xs">
              <span className="text-[11.5px] text-muted">Всего за месяц</span>
              <p className="t-num mt-0.5 text-[20px] font-bold text-ink">
                {moneyShort(snap.analytics.totalSpent)}
              </p>
              <span className="text-[10.5px] text-muted">счета + чеки кассы</span>
            </div>

            <div className="rounded-[14px] border border-sage/30 bg-sage/10 p-3 shadow-xs">
              <span className="text-[11.5px] font-medium text-sage">Ваша доля счетов</span>
              <p className="t-num mt-0.5 text-[20px] font-bold text-ink">{moneyShort(myTotalShare)}</p>
              <span className="text-[10.5px] text-sage">
                {myUnpaidShare === 0 && myTotalShare > 0 ? 'оплачено полностью' : `осталось ${moneyShort(myUnpaidShare)}`}
              </span>
            </div>
          </div>

          {/* Индикатор прогресса платежей */}
          {totalBillsCount > 0 ? (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11.5px] text-muted">
                <span>Прогресс закрытия счетов</span>
                <span className="font-semibold text-ink">{percentPaid}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-rule-soft">
                <div
                  className="h-full rounded-full bg-sage transition-all duration-500"
                  style={{ width: `${percentPaid}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 3. Участники и доходы (аккордеон) */}
      <section className="mb-4 px-4">
        <div className="rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper">
          <button
            type="button"
            onClick={() => setShowMembersDetail(!showMembersDetail)}
            className="flex w-full items-center justify-between text-left transition hover:opacity-90"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex -space-x-1.5 shrink-0 overflow-hidden">
                {snap.members.slice(0, 4).map((m, idx) => (
                  <div
                    key={m.user_id}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ring-2 ring-paper',
                      AVATAR_COLORS[idx % AVATAR_COLORS.length],
                    )}
                  >
                    {getInitials(m.name)}
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <span className="t-display block text-[14.5px] font-semibold text-ink leading-tight">
                  Участники и доходы
                </span>
                <p className="mt-0.5 text-[11.5px] text-muted leading-tight">доли при делении «по зарплате»</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[12.5px] text-muted shrink-0 pl-2">
              <span className="font-normal">{showMembersDetail ? 'Скрыть' : 'Подробнее'}</span>
              {showMembersDetail ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
          </button>

          {showMembersDetail ? (
            <div className="mt-3 space-y-2 border-t border-rule/60 pt-3">
              {snap.members.map((m, idx) => {
                const isMe = m.user_id === user?.id
                const isCreator = m.user_id === snap.house?.owner_id
                const proportion = totalSalaries > 0 ? Math.round((m.salary / totalSalaries) * 100) : 0
                return (
                  <div
                    key={m.user_id}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-[12px] p-2.5 transition',
                      isMe ? 'bg-cream/80 border border-rule/70' : 'bg-white/60 border border-rule/40',
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                          AVATAR_COLORS[idx % AVATAR_COLORS.length],
                        )}
                      >
                        {getInitials(m.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-[13.5px] font-semibold text-ink leading-tight">
                            {m.name}
                          </span>
                          {isMe ? (
                            <span className="rounded-[4px] bg-sage/15 px-1 py-0.2 text-[9.5px] font-bold text-sage leading-tight">
                              вы
                            </span>
                          ) : null}
                          {isCreator ? (
                            <span title="Создатель кассы">
                              <Crown size={12} className="text-amber-600 shrink-0" />
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-[11.5px] text-muted leading-tight">
                          {m.salary > 0 ? `${moneyShort(m.salary)} в мес. · ${proportion}%` : 'доход не указан'}
                        </p>
                      </div>
                    </div>

                    {isMe ? (
                      <SalaryWidget
                        initialSalary={m.salary}
                        onSave={async (newSal) => {
                          await setSalary({ data: { houseId: id, amount: newSal } })
                          await load()
                        }}
                      />
                    ) : (
                      <span className="t-num text-[12.5px] font-medium text-muted">
                        {m.salary > 0 ? moneyShort(m.salary) : '—'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Фирменный сегментированный переключатель вкладок в стиле ЧекАгента */}
      <div className="mb-4 px-4">
        <div className="relative flex rounded-[16px] border border-rule bg-paper p-1 shadow-paper select-none">
          {(
            [
              { id: 'bills', label: 'Счета', count: snap.bills.length, icon: Receipt },
              { id: 'receipts', label: 'Чеки', count: snap.receipts.length, icon: ReceiptText },
              { id: 'goals', label: 'Копилки', count: activeGoalsCount, icon: PiggyBank },
              { id: 'analytics', label: 'Бюджет', count: 0, icon: BarChart3 },
              { id: 'chat', label: 'Чат', count: snap.messages.length, icon: MessageSquare },
            ] as const
          ).map((item) => {
            const active = tab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  try {
                    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(6)
                    }
                  } catch {
                    /* */
                  }
                  setTab(item.id)
                }}
                className={cn(
                  'relative z-10 flex min-h-[38px] flex-1 items-center justify-center gap-1 rounded-[12px] px-1 text-[12px] font-medium transition-colors duration-200 active:scale-95 leading-none',
                  active ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                )}
              >
                {active ? (
                  <motion.div
                    layoutId="cashboxTabActive"
                    className="absolute inset-0 -z-10 rounded-[12px] bg-sage shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                ) : null}
                <Icon size={14} className="shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.count > 0 ? (
                  <span
                    className={cn(
                      'ml-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9.5px] font-bold leading-none',
                      active ? 'bg-white/25 text-onsage' : 'bg-rule-soft text-muted',
                    )}
                  >
                    {item.count}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Содержимое вкладок с плавной анимацией смены */}
      <div className="px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {/* --- ВКЛАДКА 1: ПЛАТЕЖИ (BILLS) --- */}
            {tab === 'bills' ? (
          <div className="space-y-3">
            {snap.bills.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage">
                  <Receipt size={22} />
                </div>
                <h3 className="t-display text-[16.5px] font-semibold text-ink leading-tight">
                  Регулярных платежей пока нет
                </h3>
                <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted">
                  Добавьте аренду, интернет, ЖКУ или другие ежемесячные счета, чтобы не забывать о них
                </p>
                <div className="mt-4 flex justify-center">
                  <AddBillModal
                    members={snap.members}
                    onAdd={async (v) => {
                      await addHouseBill({ data: { houseId: id, ...v } })
                      await load()
                    }}
                    trigger={(open) => (
                      <Button
                        variant="sage"
                        size="md"
                        className="gap-1.5 rounded-[12px] px-4 text-[13.5px]"
                        onClick={open}
                      >
                        <Plus size={16} /> Добавить первый платёж
                      </Button>
                    )}
                  />
                </div>
              </div>
            ) : (
              <>
                {snap.bills.map((b) => {
                  const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle)
                  const due = billDueLabel(b.day_of_month)
                  const share = snap.shares?.[b.id]?.[myUserId] ?? 0
                  const payerMember = snap.members.find((m) => m.user_id === b.payer_id)

                  return (
                    <div
                      key={b.id}
                      className={cn(
                        'rounded-[16px] border p-3.5 transition-all shadow-paper',
                        paid ? 'border-sage/30 bg-[#fafcf9]' : 'border-rule bg-paper',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div
                            className={cn(
                              'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border',
                              paid
                                ? 'border-sage/40 bg-sage/10 text-sage'
                                : 'border-rule/80 bg-white text-ink shadow-xs',
                            )}
                          >
                            {paid ? <CheckCircle2 size={18} /> : getBillIcon(b.title)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="t-display text-[15.5px] font-semibold text-ink leading-snug">
                                {b.title}
                              </h4>
                              {paid ? (
                                <span className="rounded-[5px] bg-sage/15 px-1.5 py-0.5 text-[10.5px] font-bold text-sage leading-none">
                                  оплачен
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-[12px] text-muted flex-wrap">
                              <span className={cn(due.key === 'today' || due.key === 'overdue' ? 'text-stamp font-medium' : '')}>
                                {due.label}
                              </span>
                              <span>·</span>
                              <span>
                                {b.split === 'payer' && payerMember
                                  ? `платит ${payerMember.name}`
                                  : SPLIT_LABEL[b.split] || 'Поровну'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="t-num text-[17px] font-bold text-ink leading-tight">
                            {moneyShort(b.amount)}
                          </p>
                          <p className="mt-0.5 text-[11.5px] text-sage font-medium leading-tight">
                            ваша доля: {moneyShort(share)}
                          </p>
                        </div>
                      </div>

                      {/* Доли всех участников */}
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-rule/50 pt-2.5">
                        {snap.members.map((m) => {
                          const mShare = snap.shares?.[b.id]?.[m.user_id] ?? 0
                          const isM = m.user_id === user?.id
                          return (
                            <span
                              key={m.user_id}
                              className={cn(
                                'rounded-[7px] px-2 py-0.5 text-[11px] font-medium leading-none',
                                isM ? 'bg-sage/12 text-sage font-semibold' : 'bg-cream text-muted',
                              )}
                            >
                              {m.name}: {moneyShort(mShare)}
                            </span>
                          )
                        })}
                      </div>

                      {/* Кнопка отметки об оплате и удаление */}
                      <div className="mt-3 flex items-center justify-between border-t border-rule/40 pt-2.5">
                        <button
                          onClick={async () => {
                            await payHouseBill({ data: { houseId: id, billId: b.id, paid: !paid } })
                            await load()
                          }}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[12.5px] font-medium transition active:scale-95 shadow-xs',
                            paid
                              ? 'border-sage/40 bg-white text-sage hover:bg-sage/5'
                              : 'border-sage bg-sage text-onsage hover:bg-sage/95',
                          )}
                        >
                          <Check size={14} />
                          <span>{paid ? 'Отменить оплату' : 'Отметить оплаченным'}</span>
                        </button>

                        <button
                          onClick={async () => {
                            if (!confirm(`Удалить платёж «${b.title}»?`)) return
                            await deleteHouseBill({ data: { houseId: id, billId: b.id } })
                            await load()
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted/50 transition hover:bg-stamp/10 hover:text-stamp"
                          title="Удалить платёж"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}

                <AddBillModal
                  members={snap.members}
                  onAdd={async (v) => {
                    await addHouseBill({ data: { houseId: id, ...v } })
                    await load()
                  }}
                />
              </>
            )}
          </div>
        ) : null}

        {/* --- ВКЛАДКА 2: ЧЕКИ КАССЫ (RECEIPTS) --- */}
        {tab === 'receipts' ? (
          <div className="space-y-3">
            {/* Панель действий с чеками */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[12px] uppercase tracking-wider text-muted font-semibold">Чеки кассы</span>
                <p className="t-num text-[17px] font-bold text-ink leading-tight">
                  {money(receiptsSum)}
                </p>
              </div>
              <div className="flex gap-1.5">
                <Link to="/scan">
                  <Button size="sm" variant="sage" className="gap-1 rounded-[10px] text-[12px]">
                    <ScanLine size={14} /> Скан чека
                  </Button>
                </Link>
                <AttachReceiptModal
                  houseId={id}
                  onAttached={async () => {
                    await load()
                  }}
                />
              </div>
            </div>

            {snap.receipts.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-amber-800">
                  <ReceiptText size={22} />
                </div>
                <h3 className="t-display text-[16.5px] font-semibold text-ink leading-tight">
                  Общих чеков пока нет
                </h3>
                <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted">
                  Сканируйте покупки в магазине или привязывайте чеки из личного ящика к этой кассе
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <Link to="/scan">
                    <Button variant="sage" size="md" className="gap-1.5 rounded-[12px] px-4 text-[13.5px]">
                      <ScanLine size={16} /> Сканировать чек
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {snap.receipts.map((r) => {
                  const isOpen = openReceiptId === r.id
                  const isMyReceipt = r.user_id === user?.id

                  return (
                    <div
                      key={r.id}
                      className="rounded-[16px] border border-rule bg-paper transition-all shadow-paper overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenReceiptId(isOpen ? null : r.id)}
                        className="flex w-full items-center justify-between p-3.5 text-left transition hover:bg-black/[0.015]"
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="truncate text-[15px] font-semibold text-ink">
                              {r.store}
                            </span>
                            <span className="rounded-full bg-cream border border-rule/80 px-2 py-0.5 text-[10.5px] font-medium text-muted">
                              {categoryLabel(r.category)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[12px] text-muted flex-wrap">
                            <span>{dateRu(r.purchased_at || r.created_at)}</span>
                            <span>·</span>
                            <span className="text-sage font-medium">Купил(а) {r.payer_name}</span>
                            {r.note ? (
                              <>
                                <span>·</span>
                                <span className="truncate text-ink/70">{r.note}</span>
                              </>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="t-num text-[16.5px] font-bold text-ink">
                            {moneyShort(r.total)}
                          </span>
                          <div className="text-muted">
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-rule/60 bg-black/[0.015] px-4 py-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] text-muted">Чек в общей кассе</span>
                            {isMyReceipt ? (
                              <button
                                onClick={async () => {
                                  await linkReceiptToHouse({ data: { houseId: id, receiptId: r.id, link: false } })
                                  await load()
                                }}
                                className="text-[12px] font-medium text-stamp hover:underline"
                              >
                                Отвязать от кассы
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : null}

        {/* --- ВКЛАДКА 3: КОПИЛКИ И ЦЕЛИ (GOALS) --- */}
        {tab === 'goals' ? (
          <div className="space-y-3">
            {snap.wishes.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-amber-800">
                  <PiggyBank size={22} />
                </div>
                <h3 className="t-display text-[16.5px] font-semibold text-ink leading-tight">
                  Копилок и целей пока нет
                </h3>
                <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted">
                  Копите вместе на отпуск, новый холодильник, ремонт или подарки близким
                </p>
                <div className="mt-4 flex justify-center">
                  <AddGoalModal
                    onAdd={async (v) => {
                      await addWish({ data: { houseId: id, ...v } })
                      await load()
                    }}
                    trigger={(open) => (
                      <Button
                        variant="sage"
                        size="md"
                        className="gap-1.5 rounded-[12px] px-4 text-[13.5px]"
                        onClick={open}
                      >
                        <Plus size={16} /> Создать первую цель
                      </Button>
                    )}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {snap.wishes.map((w) => {
                    const isComplete = !!w.bought_at || (w.amount > 0 && w.collected >= w.amount)
                    const percent = w.amount > 0 ? Math.min(100, Math.round((w.collected / w.amount) * 100)) : 0
                    const remaining = Math.max(0, w.amount - w.collected)

                    return (
                      <div
                        key={w.id}
                        className={cn(
                          'rounded-[16px] border p-4 transition-all shadow-paper',
                          isComplete ? 'border-sage/40 bg-[#fafcf9]' : 'border-rule bg-paper',
                        )}
                      >
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div
                              className={cn(
                                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border',
                                isComplete
                                  ? 'border-sage/40 bg-sage/15 text-sage'
                                  : 'border-amber-800/30 bg-amber-800/10 text-amber-850',
                              )}
                            >
                              {isComplete ? <CheckCircle2 size={18} /> : <Target size={18} />}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="t-display text-[16px] font-semibold text-ink leading-tight">
                                  {w.title}
                                </h4>
                                {isComplete ? (
                                  <span className="rounded-[5px] bg-sage/15 px-1.5 py-0.5 text-[10px] font-bold text-sage leading-none">
                                    достигнуто!
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-1 text-[11.5px] text-muted">
                                {w.by_name ? `автор: ${w.by_name}` : 'общая цель'}
                                {w.target_date ? ` · до ${dateRu(w.target_date)}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="t-num text-[17px] font-bold text-ink leading-tight">
                              {moneyShort(w.amount)}
                            </p>
                            <span className="text-[11px] text-muted">цель</span>
                          </div>
                        </div>

                        {/* Шкала прогресса копилки */}
                        {w.amount > 0 ? (
                          <div className="mt-3.5">
                            <div className="flex items-center justify-between text-[11.5px]">
                              <span className="font-medium text-ink">
                                Собрано: <span className="text-sage font-bold">{moneyShort(w.collected)}</span>
                              </span>
                              <span className="text-muted">
                                {isComplete ? '100%' : `осталось ${moneyShort(remaining)} (${percent}%)`}
                              </span>
                            </div>
                            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-rule-soft">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                  'h-full rounded-full',
                                  isComplete ? 'bg-sage' : 'bg-amber-700',
                                )}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* История взносов */}
                        {w.deposits && w.deposits.length > 0 ? (
                          <div className="mt-3 border-t border-rule/50 pt-2.5">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
                              Взносы участников ({w.deposits.length}):
                            </p>
                            <div className="space-y-1">
                              {w.deposits.slice(0, 4).map((d) => (
                                <div key={d.id} className="flex items-center justify-between text-[12px]">
                                  <span className="text-muted">
                                    {d.name} {d.note ? `(${d.note})` : ''}
                                  </span>
                                  <span className="t-num font-semibold text-ink">+{moneyShort(d.amount)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* Действия: Внести взнос, Завершить, Удалить */}
                        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-rule/50 pt-2.5">
                          <div className="flex items-center gap-1.5">
                            <DepositModal
                              goalTitle={w.title}
                              onDeposit={async (amt, note) => {
                                await depositGoal({
                                  data: { houseId: id, wishId: w.id, amount: amt, note },
                                })
                                await load()
                              }}
                            />
                            <button
                              onClick={async () => {
                                await toggleWish({ data: { houseId: id, wishId: w.id } })
                                await load()
                              }}
                              className="rounded-[10px] border border-rule bg-white px-2.5 py-1.5 text-[12px] font-medium text-muted hover:text-ink shadow-xs transition"
                            >
                              {isComplete ? 'В процесс' : 'Куплено'}
                            </button>
                          </div>

                          <button
                            onClick={async () => {
                              if (!confirm(`Удалить «${w.title}»?`)) return
                              await deleteWish({ data: { houseId: id, wishId: w.id } })
                              await load()
                            }}
                            className="flex h-8 w-8 items-center justify-center text-muted/50 hover:text-stamp transition"
                            title="Удалить цель"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <AddGoalModal
                  onAdd={async (v) => {
                    await addWish({ data: { houseId: id, ...v } })
                    await load()
                  }}
                />
              </>
            )}
          </div>
        ) : null}

        {/* --- ВКЛАДКА 4: АНАЛИТИКА И БЮДЖЕТ (ANALYTICS) --- */}
        {tab === 'analytics' ? (
          <div className="space-y-4">
            {/* 1. Карточка общего бюджета кассы */}
            <div className="rounded-[18px] border border-rule bg-paper p-4 shadow-paper">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                  Бюджет кассы
                </span>
                <EditBudgetModal
                  currentBudget={snap.analytics.budget}
                  onSave={async (val) => {
                    await setHouseBudget({ data: { houseId: id, budget: val } })
                    await load()
                  }}
                  trigger={(open) => (
                    <button
                      type="button"
                      onClick={open}
                      className="text-[12px] font-medium text-sage hover:underline"
                    >
                      {snap.analytics.budget > 0 ? 'Изменить' : '+ Задать бюджет'}
                    </button>
                  )}
                />
              </div>

              {snap.analytics.budget > 0 ? (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="t-display text-[32px] font-bold leading-none text-ink">
                      {money(snap.analytics.left)}
                    </p>
                    <span className="text-[12.5px] text-muted">остаток лимита</span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11.5px] text-muted">
                      <span>Израсходовано {snap.analytics.percentSpent}%</span>
                      <span className="t-num">Лимит: {money(snap.analytics.budget)}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-rule-soft">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(3, snap.analytics.percentSpent)}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          'h-full rounded-full',
                          snap.analytics.percentSpent > 90
                            ? 'bg-stamp'
                            : snap.analytics.percentSpent > 75
                              ? 'bg-amber-600'
                              : 'bg-sage',
                        )}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-2 py-3 text-center">
                  <p className="text-[13.5px] text-ink font-medium">Семейный лимит не установлен</p>
                  <p className="mt-1 text-[12px] text-muted">
                    Задайте общий бюджет кассы на месяц, чтобы контролировать перерасход.
                  </p>
                </div>
              )}

              {/* Метрики расходов */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-rule/60 pt-3">
                <div className="rounded-[10px] bg-cream/70 p-2.5">
                  <span className="text-[11px] text-muted">Потрачено в кассе</span>
                  <p className="t-num mt-0.5 text-[15px] font-bold text-ink">
                    {money(snap.analytics.totalSpent)}
                  </p>
                </div>
                <div className="rounded-[10px] bg-cream/70 p-2.5">
                  <span className="text-[11px] text-muted">Количество чеков</span>
                  <p className="t-num mt-0.5 text-[15px] font-bold text-ink">
                    {snap.receipts.length} шт.
                  </p>
                </div>
              </div>
            </div>


            {/* 3. Расходы по категориям */}
            <div className="rounded-[18px] border border-rule bg-paper p-4 shadow-paper">
              <h3 className="t-display text-[15.5px] font-semibold text-ink leading-tight mb-1">
                Расходы по категориям
              </h3>
              <p className="text-[11.5px] text-muted mb-3">структура трат кассы за месяц</p>

              {snap.analytics.byCategory.length === 0 ? (
                <p className="py-2 text-center text-[12.5px] text-muted">Данных по категориям пока нет.</p>
              ) : (
                <div className="space-y-2.5">
                  {snap.analytics.byCategory.map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between text-[12.5px] mb-1">
                        <span className="font-medium text-ink">{cat.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="t-num font-semibold text-ink">{money(cat.total)}</span>
                          <span className="text-[11px] text-muted">({cat.percent}%)</span>
                        </div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-rule-soft">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(3, cat.percent)}%` }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-sage/80"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* --- ВКЛАДКА 5: ЧАТ КАССЫ И СЕМЕЙНЫЙ AI-СОВЕТНИК (CHAT) --- */}
        {tab === 'chat' ? (
          <div className="rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper">
            {/* Панель быстрого вызова ЧекАгента */}
            <div className="mb-4 rounded-[16px] border border-rule/70 bg-cream/40 p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-sage/15 text-sage">
                  <Sparkles size={15} />
                </div>
                <h4 className="t-display text-[15px] font-semibold text-ink leading-tight">
                  Семейный советник
                </h4>
                <span className="ml-auto rounded-full bg-sage/10 px-2 py-0.5 text-[10.5px] font-bold text-sage">
                  ИИ
                </span>
              </div>
              <p className="text-[12px] text-muted mb-2.5 leading-relaxed">
                Задайте вопрос о финансах семьи или выберите быстрый вопрос:
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  disabled={agentBusy}
                  onClick={async () => {
                    setAgentBusy(true)
                    try {
                      await askHouseAgent({
                        data: { houseId: id, prompt: 'Подведи финансовые итоги кассы за этот месяц' },
                      })
                      await load()
                    } finally {
                      setAgentBusy(false)
                    }
                  }}
                  className="rounded-full border border-rule/80 bg-paper hover:bg-cream px-3 py-1.5 text-[12px] font-medium text-ink transition-all active:scale-95 shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  {agentBusy ? <LoaderCircle size={12} className="animate-spin text-sage" /> : <span>📊</span>}
                  <span>Итоги месяца</span>
                </button>
                <button
                  type="button"
                  disabled={agentBusy}
                  onClick={async () => {
                    setAgentBusy(true)
                    try {
                      await askHouseAgent({
                        data: { houseId: id, prompt: 'Подскажи, где семья может оптимизировать расходы' },
                      })
                      await load()
                    } finally {
                      setAgentBusy(false)
                    }
                  }}
                  className="rounded-full border border-rule/80 bg-paper hover:bg-cream px-3 py-1.5 text-[12px] font-medium text-ink transition-all active:scale-95 shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  {agentBusy ? <LoaderCircle size={12} className="animate-spin text-sage" /> : <span>💡</span>}
                  <span>Где сэкономить?</span>
                </button>
                <button
                  type="button"
                  disabled={agentBusy}
                  onClick={async () => {
                    setAgentBusy(true)
                    try {
                      await askHouseAgent({
                        data: { houseId: id, prompt: 'Оцени текущий прогресс по общим целям и копилкам и дай советы' },
                      })
                      await load()
                    } finally {
                      setAgentBusy(false)
                    }
                  }}
                  className="rounded-full border border-rule/80 bg-paper hover:bg-cream px-3 py-1.5 text-[12px] font-medium text-ink transition-all active:scale-95 shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  {agentBusy ? <LoaderCircle size={12} className="animate-spin text-sage" /> : <span>🎯</span>}
                  <span>Цели и копилки</span>
                </button>
              </div>
            </div>

            {/* Лента сообщений */}
            <div className="mb-3 flex max-h-[46vh] flex-col gap-3 overflow-y-auto px-1 py-1 no-scrollbar">
              {snap.messages.length === 0 ? (
                <div className="py-8 text-center text-[13px] text-muted">
                  Пока сообщений нет. Напишите что-нибудь в общую кассу или запросите отчёт у Советника!
                </div>
              ) : (
                snap.messages.map((m) => {
                  const isAgent = m.is_agent || m.user_id === 'agent'
                  const isMe = m.user_id === user?.id

                  if (isAgent) {
                    return (
                      <div key={m.id} className="flex items-start gap-2.5 my-1">
                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage shadow-xs">
                          <Sparkles size={14} />
                        </div>
                        <div className="max-w-[88%] rounded-[18px] rounded-tl-xs border border-rule/80 bg-paper px-4 py-3 text-[13.5px] leading-relaxed text-ink shadow-paper">
                          <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-rule/40 pb-1">
                            <span className="text-[11px] font-bold text-sage">ЧекАгент · Советник</span>
                            <span className="text-[10px] text-muted/70">{timeRu(m.created_at)}</span>
                          </div>
                          <p className="whitespace-pre-wrap">{m.text}</p>
                        </div>
                      </div>
                    )
                  }

                  if (isMe) {
                    return (
                      <div key={m.id} className="flex flex-col items-end">
                        <div className="max-w-[82%] rounded-[18px] rounded-br-xs bg-sage px-3.5 py-2.5 text-[13.5px] leading-snug text-onsage shadow-sm break-words">
                          <p className="whitespace-pre-wrap">{m.text}</p>
                        </div>
                        <span className="mt-0.5 px-1 text-[10px] text-muted/70">
                          {timeRu(m.created_at)}
                        </span>
                      </div>
                    )
                  }

                  return (
                    <div key={m.id} className="flex items-start gap-2">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream border border-rule text-[10px] font-bold text-ink">
                        {getInitials(m.name)}
                      </div>
                      <div className="max-w-[80%] rounded-[18px] rounded-tl-xs border border-rule/80 bg-paper px-3.5 py-2 text-[13.5px] leading-snug text-ink shadow-xs break-words">
                        <span className="mb-0.5 block text-[11px] font-semibold text-sage">{m.name}</span>
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <span className="mt-1 block text-right text-[9.5px] text-muted/70">{timeRu(m.created_at)}</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <ChatInputBar
              onSend={async (text) => {
                await sendHouseMessage({ data: { houseId: id, text } })
                await load()
              }}
            />
          </div>
        ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function formatCycleMonth(cycle: string): string {
  if (!cycle) return 'текущий месяц'
  const parts = cycle.split('-')
  if (parts.length < 2) return cycle
  const year = parts[0]
  const monthIdx = parseInt(parts[1], 10) - 1
  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ]
  return `${months[monthIdx] || parts[1]} ${year}`
}

function SalaryWidget({
  initialSalary,
  onSave,
}: {
  initialSalary: number
  onSave: (val: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState(false)
  const [val, setVal] = React.useState(initialSalary ? String(initialSalary) : '')
  const [busy, setBusy] = React.useState(false)

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="inline-flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-rule bg-white px-2.5 text-[12px] font-medium text-ink shadow-xs transition hover:border-sage hover:text-sage active:scale-95 leading-none"
      >
        <span>{initialSalary ? moneyShort(initialSalary) : '+ доход'}</span>
      </button>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Input
        value={val}
        onChange={(e) => setVal(e.target.value.replace(/[^\d]/g, ''))}
        placeholder="доход"
        inputMode="numeric"
        autoFocus
        className="h-8 w-24 px-2 text-right text-[12px]"
      />
      <Button
        size="sm"
        variant="sage"
        disabled={busy}
        className="h-8 px-2.5 text-[12px] leading-none"
        onClick={async () => {
          setBusy(true)
          await onSave(Math.round(Number(val || 0)))
          setBusy(false)
          setEditing(false)
        }}
      >
        Ок
      </Button>
      <button
        type="button"
        className="flex h-8 w-6 items-center justify-center text-[12px] text-muted hover:text-ink leading-none"
        onClick={() => {
          setVal(initialSalary ? String(initialSalary) : '')
          setEditing(false)
        }}
      >
        ✕
      </button>
    </div>
  )
}

function EditBudgetModal({
  currentBudget,
  onSave,
  trigger,
}: {
  currentBudget: number
  onSave: (val: number) => Promise<void>
  trigger?: (open: () => void) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [val, setVal] = React.useState(currentBudget ? String(currentBudget) : '')
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setVal(currentBudget ? String(currentBudget) : '')
    }
  }, [open, currentBudget])

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <Button
          size="sm"
          variant="paper"
          onClick={() => setOpen(true)}
          className="h-8 rounded-[8px] text-[12px]"
        >
          {currentBudget > 0 ? 'Изменить' : 'Задать'}
        </Button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Месячный бюджет кассы"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setBusy(true)
            try {
              await onSave(Math.round(Number(val.replace(/[^\d]/g, '') || 0)))
              setOpen(false)
            } finally {
              setBusy(false)
            }
          }}
          className="space-y-4 pt-1"
        >
          <p className="text-[12.5px] text-muted leading-relaxed">
            Установите общий лимит трат семьи на месяц для контроля перерасхода.
          </p>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Сумма бюджета в месяц (₽)
            </label>
            <Input
              value={val}
              onChange={(e) => setVal(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="Например: 80000"
              inputMode="numeric"
              autoFocus
              className="h-11 rounded-[12px] bg-white text-[15px] font-semibold text-ink"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              disabled={busy}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              {busy ? 'Секунду…' : 'Сохранить'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  )
}

function DepositModal({
  goalTitle,
  onDeposit,
}: {
  goalTitle: string
  onDeposit: (amount: number, note?: string) => Promise<void>
}) {
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = React.useState('1000')
  const [note, setNote] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const PRESETS = [500, 1000, 3000, 5000]

  return (
    <>
      <Button
        size="sm"
        variant="sage"
        onClick={() => setOpen(true)}
        className="h-8 gap-1 rounded-[10px] text-[12px] px-3"
      >
        <Plus size={13} /> Внести взнос
      </Button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={`Взнос в «${goalTitle}»`}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
            if (!amt) return
            setBusy(true)
            try {
              await onDeposit(amt, note.trim() || undefined)
              setNote('')
              setOpen(false)
            } finally {
              setBusy(false)
            }
          }}
          className="space-y-4 pt-1"
        >
          <div>
            <label className="mb-2 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Быстрый выбор суммы
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(String(p))}
                  className={cn(
                    'h-9 rounded-[10px] border text-[12.5px] font-semibold transition active:scale-95',
                    amount === String(p)
                      ? 'border-sage bg-sage text-onsage shadow-xs'
                      : 'border-rule bg-white text-muted hover:border-rule-soft',
                  )}
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Сумма взноса (₽)
            </label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="Сумма взноса в ₽"
              inputMode="numeric"
              autoFocus
              className="h-11 rounded-[12px] bg-white text-[15px] font-semibold text-ink"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Комментарий (необязательно)
            </label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Например: остаток с аванса"
              className="h-10 rounded-[12px] bg-white text-[13px] text-ink"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              disabled={busy}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              {busy ? 'Секунду…' : 'Внести'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  )
}

function AttachReceiptModal({
  houseId,
  onAttached,
}: {
  houseId: string
  onAttached: () => Promise<void>
}) {
  const [open, setOpen] = React.useState(false)
  const [myReceipts, setMyReceipts] = React.useState<Array<any>>([])
  const [loading, setLoading] = React.useState(false)

  const openModal = async () => {
    setOpen(true)
    setLoading(true)
    try {
      const res: any = await listReceipts({ data: { limit: 40 } })
      const filtered = (res?.receipts ?? []).filter((r: any) => r.house_id !== houseId)
      setMyReceipts(filtered)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="paper"
        onClick={openModal}
        className="gap-1 rounded-[10px] text-[12px]"
      >
        <Plus size={14} /> Прикрепить
      </Button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Прикрепить чек к кассе"
      >
        <p className="text-[12px] text-muted -mt-2 mb-3">
          Выберите чек из личного ящика для добавления в семейную кассу
        </p>

        <div className="max-h-[50dvh] overflow-y-auto space-y-2 no-scrollbar py-1">
          {loading ? (
            <p className="py-8 text-center text-[13px] text-muted">Загрузка ваших чеков…</p>
          ) : myReceipts.length === 0 ? (
            <div className="py-8 text-center text-[13px] text-muted">
              Нет доступных личных чеков. Отсканируйте новый чек во вкладке «Скан».
            </div>
          ) : (
            myReceipts.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-[12px] border border-rule/60 bg-white p-3 shadow-xs"
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-ink truncate">{r.store || 'Чек'}</p>
                  <p className="text-[11.5px] text-muted">
                    {dateRu(r.purchased_at || r.created_at)} · {categoryLabel(r.category)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="t-num font-bold text-ink">{moneyShort(r.total)}</span>
                  <Button
                    size="sm"
                    variant="sage"
                    className="h-7 px-2.5 text-[11.5px] rounded-[8px]"
                    onClick={async () => {
                      await linkReceiptToHouse({
                        data: { houseId, receiptId: r.id, link: true },
                      })
                      setOpen(false)
                      await onAttached()
                    }}
                  >
                    + В кассу
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-rule/60 mt-3">
          <Button
            variant="paper"
            size="md"
            className="w-full rounded-[12px]"
            onClick={() => setOpen(false)}
          >
            Закрыть
          </Button>
        </div>
      </BottomSheet>
    </>
  )
}

function AddBillModal({
  members,
  onAdd,
  trigger,
}: {
  members: Array<Member>
  onAdd: (v: {
    title: string
    amount: number
    day_of_month: number
    split: string
    payer_id?: string | null
  }) => Promise<void>
  trigger?: (open: () => void) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [day, setDay] = React.useState('10')
  const [split, setSplit] = React.useState('equal')
  const [payer, setPayer] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const PRESETS = ['Аренда', 'Интернет', 'ЖКУ', 'Подписки', 'Продукты']

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <Button
          variant="paper"
          size="md"
          className="w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} /> Добавить регулярный платёж
        </Button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Новый регулярный платёж"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!title.trim()) return
            const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
            if (!amt) return
            setBusy(true)
            try {
              await onAdd({
                title: title.trim(),
                amount: amt,
                day_of_month: Math.min(31, Math.max(1, parseInt(day, 10) || 1)),
                split,
                payer_id: split === 'payer' ? (payer || members[0]?.user_id || null) : null,
              })
              setTitle('')
              setAmount('')
              setOpen(false)
            } finally {
              setBusy(false)
            }
          }}
          className="space-y-3.5 pt-1"
        >
          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Быстрый шаблон
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTitle(p)}
                  className="rounded-[8px] border border-rule bg-white px-2.5 py-1 text-[12px] text-muted transition hover:border-sage hover:text-sage active:scale-95 leading-none"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Название платежа
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название (например: Интернет)"
              className="h-10 rounded-[12px] bg-white text-[13.5px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Сумма (₽)
              </label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="Сумма в ₽"
                inputMode="numeric"
                className="h-10 rounded-[12px] bg-white text-[13.5px]"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Число месяца (1–31)
              </label>
              <Input
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="Число (1–31)"
                inputMode="numeric"
                className="h-10 rounded-[12px] bg-white text-[13.5px]"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Как делим
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 'equal', label: 'Поровну' },
                { val: 'salary', label: 'По доходу' },
                { val: 'payer', label: 'Один платит' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSplit(val)}
                  className={cn(
                    'min-h-[38px] rounded-[10px] border text-[12px] font-medium transition active:scale-95 leading-none',
                    split === val
                      ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                      : 'border-rule bg-white text-muted hover:border-rule-soft',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {split === 'payer' ? (
            <div>
              <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Кто оплачивает
              </label>
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                className="field h-10 w-full rounded-[10px] border border-rule bg-white px-3 text-[13px] text-ink outline-none"
              >
                {members.map((m) => (
                  <option key={m.user_id} value={m.user_id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              disabled={busy}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              {busy ? 'Секунду…' : 'Добавить счёт'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  )
}

function AddGoalModal({
  onAdd,
  trigger,
}: {
  onAdd: (v: { title: string; amount: number; target_date?: string | null; initialAmount?: number }) => Promise<void>
  trigger?: (open: () => void) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [initialAmount, setInitialAmount] = React.useState('')
  const [targetDate, setTargetDate] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <Button
          variant="paper"
          size="md"
          className="w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} /> Создать новую копилку / цель
        </Button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Новая цель или копилка"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!title.trim()) return
            setBusy(true)
            try {
              await onAdd({
                title: title.trim(),
                amount: Math.round(Number(amount.replace(/[^\d]/g, '') || 0)),
                initialAmount: Math.round(Number(initialAmount.replace(/[^\d]/g, '') || 0)),
                target_date: targetDate.trim() || null,
              })
              setTitle('')
              setAmount('')
              setInitialAmount('')
              setTargetDate('')
              setOpen(false)
            } finally {
              setBusy(false)
            }
          }}
          className="space-y-3 pt-1"
        >
          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Название цели
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Отпуск на море, новый ноутбук..."
              className="h-10 rounded-[12px] bg-white text-[13.5px]"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Целевая сумма (₽)
              </label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="Сумма в ₽"
                inputMode="numeric"
                className="h-10 rounded-[12px] bg-white text-[13.5px]"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Уже накоплено (₽)
              </label>
              <Input
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="0 ₽"
                inputMode="numeric"
                className="h-10 rounded-[12px] bg-white text-[13.5px]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Желаемый срок сбора
            </label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="h-10 rounded-[12px] bg-white text-[13.5px]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              disabled={busy}
              className="flex-1 rounded-[12px] text-[13px]"
            >
              {busy ? 'Секунду…' : 'Создать цель'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  )
}

function ChatInputBar({ onSend }: { onSend: (text: string) => Promise<void> }) {
  const [text, setText] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  return (
    <form
      className="flex items-center gap-2 border-t border-rule/60 pt-3"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!text.trim() || busy) return
        setBusy(true)
        try {
          await onSend(text.trim())
          setText('')
        } finally {
          setBusy(false)
        }
      }}
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Написать в кассу или советнику…"
        className="h-10 rounded-[12px] bg-paper text-[13px] border-rule/80 focus:border-sage"
      />
      <Button
        type="submit"
        variant="sage"
        size="icon"
        disabled={busy || !text.trim()}
        className="h-10 w-10 shrink-0 rounded-[12px]"
        aria-label="Отправить сообщение"
      >
        <Send size={15} />
      </Button>
    </form>
  )
}
