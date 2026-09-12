import { assertSaved, newRequestId } from '~/lib/finance'
import { ExpenseEditor } from '~/components/ExpenseEditor'
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
  ChevronRight,
  CreditCard,
  Crown,
  Eye,
  Home,
  Info,
  Layers,
  LoaderCircle,
  LogOut,
  Package,
  PiggyBank,
  Plus,
  Receipt,
  ReceiptText,
  ScanLine,
  Settings2,
  Share2,
  ShoppingBag,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Tv,
  UserCheck,
  Users,
  Wallet,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { BottomSheet } from '~/components/BottomSheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { billDueLabel, CATEGORIES, categoryLabel, dateRu, money, moneyShort, plural, timeRu } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import { showInAppNotification } from '~/components/NotificationBanner'
import {
  addHouseBill,
  addWish,
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
import { addReceipt, listReceipts } from '~/server/functions/receipts'

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
  if (t.includes('жкх') || t.includes('жку') || t.includes('свет') || t.includes('вод') || t.includes('газ') || t.includes('коммунал')) {
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

const houseSnapCache = new Map<string, Snap>()

function HousePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useApp()

  const [snap, setSnap] = React.useState<Snap | null>(() => houseSnapCache.get(id) || null)
  const [error, setError] = React.useState<string | null>(null)
  const [tab, setTab] = React.useState<'overview' | 'bills' | 'receipts' | 'goals'>('overview')
  const [showSettings, setShowSettings] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [showMembersDetail, setShowMembersDetail] = React.useState(false)
  const [openReceiptId, setOpenReceiptId] = React.useState<string | null>(null)
  const versionRef = React.useRef<string>('')
  const prevSnapRef = React.useRef<Snap | null>(houseSnapCache.get(id) || null)

  const load = React.useCallback(async () => {
    const r: any = await getHouse({ data: { houseId: id } }).catch(() => null)
    if (!r) return
    if (r.error) {
      setError(r.error)
      return
    }
    versionRef.current = r.version ?? ''
    houseSnapCache.set(id, r)
    setSnap(r)
    prevSnapRef.current = r
  }, [id])

  React.useEffect(() => {
    const cached = houseSnapCache.get(id)
    if (cached) {
      setSnap(cached)
      prevSnapRef.current = cached
    } else {
      setSnap(null)
      prevSnapRef.current = null
    }
    setError(null)
    load()
  }, [id, load])

  // Live polling
  React.useEffect(() => {
    if (!id) return
    let alive = true
    const tick = async () => {
      try {
        const r: any = await liveHouse({ data: { houseId: id } })
        if (!alive || !r || r.error) return
        if (r.version && r.version !== versionRef.current) {
          const prev = prevSnapRef.current
          versionRef.current = r.version
          houseSnapCache.set(id, r)
          setSnap(r)
          prevSnapRef.current = r

          // Оповещения в реальном времени о действиях других участников
          if (prev && user?.id) {
            // 1. Новые расходы / чеки
            const prevReceiptIds = new Set((prev.receipts || []).map((x: any) => x.id))
            const newReceipts = (r.receipts || []).filter(
              (x: any) => !prevReceiptIds.has(x.id) && x.user_id !== user.id,
            )
            for (const nr of newReceipts) {
              const author = nr.display_name || nr.uname || 'Партнёр'
              const title = nr.store || 'Чек'
              const amount = Number(nr.total || 0)
              showInAppNotification({
                title: 'Новый расход в бюджете',
                body: `${author}: «${title}» на ${money(amount)}`,
                icon: 'receipt',
                duration: 4500,
              })
              haptic(15)
            }

            // 2. Оплаченные счета
            const prevPaidKeys = new Set(
              (prev.pays || []).map((p: any) => `${p.bill_id}:${p.cycle}:${p.user_id}`),
            )
            const newPays = (r.pays || []).filter(
              (p: any) =>
                !prevPaidKeys.has(`${p.bill_id}:${p.cycle}:${p.user_id}`) && p.user_id !== user.id,
            )
            for (const np of newPays) {
              const bill = (r.bills || []).find((b: any) => b.id === np.bill_id)
              const member = (r.members || []).find((m: any) => m.user_id === np.user_id)
              const author = member?.display_name || member?.uname || 'Партнёр'
              showInAppNotification({
                title: 'Счёт оплачен',
                body: `${author} оплатил(а) «${bill?.title || 'Счёт'}»`,
                icon: 'check',
                duration: 4000,
              })
              haptic(15)
            }

            // 3. Новые регулярные счета
            const prevBillIds = new Set((prev.bills || []).map((b: any) => b.id))
            const newBills = (r.bills || []).filter(
              (b: any) => !prevBillIds.has(b.id) && (b as any).created_by !== user.id,
            )
            for (const nb of newBills) {
              showInAppNotification({
                title: 'Новый счёт в бюджете',
                body: `Добавлен счёт «${nb.title}» (${money(nb.amount)})`,
                icon: 'card',
                duration: 4000,
              })
              haptic(15)
            }

            // 4. Новые цели накопления
            const prevWishIds = new Set((prev.wishes || []).map((w: any) => w.id))
            const newWishes = (r.wishes || []).filter(
              (w: any) => !prevWishIds.has(w.id) && (w as any).created_by !== user.id,
            )
            for (const nw of newWishes) {
              showInAppNotification({
                title: 'Новая цель накопления',
                body: `Добавлена цель «${nw.title}»`,
                icon: 'target',
                duration: 4000,
              })
              haptic(15)
            }

            // 5. Новые сообщения в чате кассы
            const prevMsgIds = new Set((prev.messages || []).map((m: any) => m.id))
            const newMsgs = (r.messages || []).filter(
              (m: any) => !prevMsgIds.has(m.id) && m.user_id !== user.id,
            )
            for (const nm of newMsgs) {
              const author = nm.display_name || nm.uname || 'Партнёр'
              showInAppNotification({
                title: author,
                body: nm.text,
                icon: 'message',
                duration: 4000,
              })
              haptic(12)
            }
          }
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
  }, [id, user?.id])

  const copyCode = async (code: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code)
      }
      haptic(10)
      setCopiedCode(true)
      showInAppNotification({
        title: 'Код скопирован',
        body: `Код совместного бюджета: ${code}`,
        icon: 'sparkles',
        duration: 2500,
      })
      setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const shareCode = async (code: string, houseName: string) => {
    haptic(8)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Бюджет «${houseName}» в Листке`,
          text: `Присоединяйся к совместному бюджету «${houseName}» в приложении Листок. Код приглашения: ${code}`,
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
          <p className="mt-1 text-[13px] text-muted">Возможно, совместный бюджет был удалён или вы вышли из него</p>
          <Button className="mt-4 w-full" variant="sage" onClick={() => navigate({ to: '/groups' })}>
            <ArrowLeft size={16} /> Вернуться к разделу Вместе
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
    snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle && p.user_id === user?.id),
  )
  const paidCount = paidBills.length
  const totalBillsCount = snap.bills.length
  const percentPaid = totalBillsCount > 0 ? Math.round((paidCount / totalBillsCount) * 100) : 0

  const myPaidShare = snap.bills.reduce((sum, b) => {
    const isPaid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle && p.user_id === user?.id)
    if (isPaid) {
      return sum + (snap.shares?.[b.id]?.[myUserId] ?? 0)
    }
    return sum
  }, 0)
  const myUnpaidShare = Math.max(0, myTotalShare - myPaidShare)

  const totalSalaries = snap.members.reduce((s, m) => s + Math.max(0, m.salary), 0)
  const activeGoalsCount = snap.wishes.filter((w) => !w.bought_at).length
  const receiptsSum = snap.receipts.reduce((s, r) => s + (Number(r.total) || 0), 0)
  const monthSpent = Number(snap.analytics.totalSpent ?? receiptsSum)
  const monthLeft = snap.house.monthly_budget > 0
    ? Math.max(0, snap.house.monthly_budget - monthSpent)
    : 0
  const showMembersSection = snap.members.length > 1 && totalSalaries > 0
  const hasUnfundedGoal = snap.wishes.some((wish) => !wish.bought_at && Number(wish.collected || 0) <= 0)
  const isOverBudget = snap.house.monthly_budget > 0 && monthSpent > snap.house.monthly_budget
  const showAdvisor = myUnpaidShare > 0 || isOverBudget || hasUnfundedGoal

  return (
    <div className="house-detail pb-36 pt-3 sm:pb-32" data-house-tab={tab}>
      {/* 1. Верхняя панель навигации */}
      <header className="house-detail-header mb-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/groups"
            onClick={() => haptic(8)}
            className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-rule/80 bg-paper px-3 text-[13px] font-medium text-ink shadow-xs transition hover:bg-white active:scale-95"
            aria-label="Назад к разделу Вместе"
          >
            <ArrowLeft size={15} />
            <span>Вместе</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => shareCode(snap.house!.code, snap.house!.name)}
              className="house-invite-button inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-rule/80 bg-paper px-2.5 text-[12px] font-semibold text-ink shadow-xs transition hover:bg-white active:scale-95"
              title="Пригласить близкого"
            >
              <Users size={14} className="shrink-0 text-sage" />
              <span>Пригласить</span>
            </button>

            <button
              onClick={() => shareCode(snap.house!.code, snap.house!.name)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-rule/80 bg-paper text-muted shadow-xs transition hover:bg-white hover:text-ink active:scale-95"
              aria-label="Поделиться совместным бюджетом"
              title="Поделиться"
            >
              <Share2 size={15} />
            </button>

            <button
              onClick={() => {
                haptic(8)
                setShowSettings(!showSettings)
              }}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-[12px] border shadow-xs transition active:scale-95',
                showSettings ? 'bg-sage text-onsage border-sage' : 'bg-paper text-muted border-rule/80 hover:bg-white hover:text-ink',
              )}
              aria-label="Настройки совместного бюджета"
              title="Управление бюджетом"
            >
              <Settings2 size={15} />
            </button>
          </div>
        </div>

        {/* Название совместного бюджета и участники */}
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="t-display truncate text-[25px] font-semibold leading-tight text-ink">
                {snap.house.name}
              </h1>
              {isOwner ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-medium text-amber-800">
                  <Crown size={11} /> Создатель
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2 py-0.5 text-[10.5px] font-medium text-sage">
                  <UserCheck size={11} /> Участник
                </span>
              )}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
              <Users size={12} className="shrink-0 text-sage" />
              <span className="font-medium">
                {snap.members.length} {plural(snap.members.length, 'участник', 'участника', 'участников')}
              </span>
              <span>·</span>
              <span className="truncate">{snap.members.map((m) => m.name).join(', ')}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Выпадающая панель настроек / управления бюджетом */}
      {showSettings ? (
        <div className="house-settings mb-4 px-4">
          <div className="rounded-[18px] border border-rule bg-paper p-4 shadow-paper">
            <div className="mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Settings2 size={16} className="text-sage" />
                <h3 className="t-display text-[15px] font-semibold text-ink">Управление бюджетом</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[12px] text-muted hover:text-ink"
              >
                Закрыть
              </button>
            </div>

            {/* Месячный лимит бюджета */}
            <div className="mb-3 rounded-[12px] border border-rule/60 bg-white/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Месячный лимит трат</p>
                  <p className="t-num text-[16px] font-bold text-ink">
                    {snap.house.monthly_budget > 0 ? money(snap.house.monthly_budget) : 'Не установлен'}
                  </p>
                </div>
                <EditBudgetModal
                  currentBudget={snap.house.monthly_budget}
                  onSave={async (val) => {
                    assertSaved(await setHouseBudget({ data: { houseId: id, budget: val } }))
                    await load()
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted">
                Общий лимит расходов семьи на месяц для аналитики и контроля перерасхода.
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
                            if (!confirm(`Исключить участника «${m.name}» из совместного бюджета?`)) return
                            assertSaved(await kickMember({ data: { houseId: id, userId: m.user_id } }))
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
                  <span className="text-[12px] text-muted">Вы создатель этого бюджета</span>
                  <button
                    className="flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10"
                    onClick={async () => {
                      if (!confirm('Удалить совместный бюджет полностью? Все платежи, чеки и копилки будут стёрты.')) return
                      assertSaved(await deleteHouse({ data: { houseId: id } }))
                      navigate({ to: '/groups' })
                    }}
                  >
                    <Trash2 size={13} /> Удалить бюджет
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted">Покинуть совместный бюджет</span>
                  <button
                    className="flex items-center gap-1 rounded-[8px] border border-stamp/30 px-2.5 py-1.5 text-[12px] text-stamp hover:bg-stamp/10"
                    onClick={async () => {
                      if (!confirm('Выйти из совместного бюджета? Вы перестанете получать уведомления.')) return
                      assertSaved(await leaveHouse({ data: { houseId: id } }))
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

      {/* 2. Финтех-сводка: Главная Hero-карточка баланса (без антипаттерна «коробка в коробке») */}
      <section className="house-overview-block house-balance-block mb-3 px-4">
        <div className="relative overflow-hidden rounded-[22px] border border-rule/80 bg-paper p-4 sm:p-5 shadow-paper">
          {/* Верхняя строка: Месяц и статус счетов */}
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold uppercase tracking-wider text-muted">
              {formatCycleMonth(snap.cycle)}
            </span>
            {totalBillsCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-medium text-sage">
                <CheckCircle2 size={12} />
                <span>{paidCount} из {totalBillsCount} счетов</span>
              </span>
            ) : null}
          </div>

          {/* Главный баланс трат */}
          <div className="mt-3">
            <span className="text-[11.5px] font-medium text-muted">
              {snap.house.monthly_budget > 0 ? 'Осталось на месяц' : 'Потрачено в этом месяце'}
            </span>
            <div className="t-display t-num mt-0.5 text-[28px] sm:text-[32px] font-semibold leading-none text-ink">
              {money(snap.house.monthly_budget > 0 ? monthLeft : monthSpent)}
            </div>
          </div>

          {/* Две чистые метрики без вложенных серых коробок */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-rule/50 pt-3">
            <div>
              <div className="flex items-center gap-1 text-[11px] text-muted">
                <ReceiptText size={12} className="text-sage" />
                <span>Чеки покупок</span>
              </div>
              <div className="t-num mt-1 text-[16px] font-bold text-ink">
                {money(receiptsSum)}
              </div>
              <span className="text-[10.5px] text-muted">
                {snap.receipts.length} {plural(snap.receipts.length, 'чек', 'чека', 'чеков')}
              </span>
            </div>

            <div className="border-l border-rule/50 pl-3">
              <div className="flex items-center gap-1 text-[11px] font-medium text-sage">
                <Wallet size={12} />
                <span>Ваша доля счетов</span>
              </div>
              <div className="t-num mt-1 text-[16px] font-bold text-ink">
                {money(myTotalShare)}
              </div>
              <span className={cn('text-[10.5px]', myUnpaidShare === 0 && myTotalShare > 0 ? 'text-sage font-medium' : 'text-amber-800 font-medium')}>
                {myUnpaidShare === 0 && myTotalShare > 0 ? '✓ всё закрыто' : `к оплате ${money(myUnpaidShare)}`}
              </span>
            </div>
          </div>

          {/* Прогресс-бар закрытия регулярных счетов */}
          {totalBillsCount > 0 ? (
            <div className="mt-3.5 border-t border-rule/40 pt-2.5">
              <div className="mb-1 flex items-center justify-between text-[11px] text-muted">
                <span>Прогресс закрытия счетов</span>
                <span className="font-semibold text-ink">{percentPaid}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule/50">
                <div
                  className="h-full rounded-full bg-sage transition-all duration-500"
                  style={{ width: `${percentPaid}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="house-overview-block house-primary-action px-4">
        <AddHouseExpenseModal
          houseId={id}
          houseName={snap.house.name}
          onSaved={load}
          trigger={(open) => (
            <button type="button" className="house-add-expense" onClick={open}>
              <span className="house-add-expense__icon"><Plus size={21} /></span>
              <span className="house-add-expense__copy">
                <strong>Добавить общий расход</strong>
                <small>Сразу в бюджет «{snap.house!.name}»</small>
              </span>
              <ChevronRight size={19} />
            </button>
          )}
        />
      </section>

      {/* 3. Участники и доходы (компактный ряд с перекрывающимися аватарами) */}
      {showMembersSection ? <section className="house-overview-block house-members-block mb-3 px-4">
        <div className="rounded-[18px] border border-rule/80 bg-paper p-3.5 shadow-paper">
          <button
            type="button"
            onClick={() => {
              haptic(6)
              setShowMembersDetail(!showMembersDetail)
            }}
            className="flex w-full items-center justify-between text-left transition hover:opacity-90 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex -space-x-2 shrink-0 overflow-hidden">
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
                  Участники и доли
                </span>
                <p className="mt-0.5 text-[11.5px] text-muted leading-tight">
                  {totalSalaries > 0 ? 'доли при делении «по зарплате»' : 'деление расходов поровну'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-muted shrink-0 pl-2">
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
                            <span title="Создатель бюджета">
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
                          assertSaved(await setSalary({ data: { houseId: id, amount: newSal } }))
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
      </section> : null}

      {/* 4. Персональный финансовый советник бюджета (ИИ) */}
      {showAdvisor ? <div className="house-overview-block house-advisor-block mb-3.5 px-4">
        <Link
          to="/agent"
          search={{ houseId: id }}
          onClick={() => haptic(8)}
          className="group flex items-center justify-between rounded-[20px] border border-sage/35 bg-gradient-to-r from-sage/12 via-sage/6 to-paper p-3.5 shadow-paper transition-all hover:border-sage/50 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-onsage shadow-xs transition-transform group-hover:scale-105">
              <Sparkles size={17} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="t-display text-[14px] font-semibold text-ink leading-tight">
                  Советник бюджета
                </span>
                <span className="rounded-full bg-sage/15 px-2 py-0.2 text-[10px] font-bold text-sage">
                  ИИ
                </span>
              </div>
              <p className="mt-0.5 text-[11.5px] text-muted leading-tight">
                {myUnpaidShare > 0
                  ? `К оплате: ${money(myUnpaidShare)} · Нажмите для подсказки`
                  : isOverBudget
                  ? `Лимит превышен на ${money(monthSpent - snap.house!.monthly_budget)}`
                  : 'У цели пока нет взносов · Можно составить план накопления'}
              </p>
            </div>
          </div>
          <ChevronRight size={17} className="text-muted transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div> : null}

      {/* 5. Фирменный сегментированный переключатель вкладок */}
      <div className="house-tabs mb-3.5 px-4">
        <div className="relative flex items-center rounded-[16px] border border-rule/80 bg-paper p-1 shadow-paper select-none overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'overview', label: 'Обзор', count: 0, icon: BarChart3 },
              { id: 'receipts', label: 'Расходы', count: snap.receipts.length, icon: ReceiptText },
              { id: 'bills', label: 'Счета', count: snap.bills.length, icon: Receipt },
              { id: 'goals', label: 'Цели', count: activeGoalsCount, icon: PiggyBank },
            ] as const
          ).map((item) => {
            const active = tab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  haptic(6)
                  setTab(item.id)
                }}
                className={cn(
                  'relative z-10 flex min-h-[36px] flex-1 items-center justify-center gap-1 rounded-[12px] px-1.5 py-1 text-[11.5px] font-medium transition-colors duration-150 leading-none whitespace-nowrap',
                  active ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                )}
              >
                {active ? (
                  <motion.div
                    layoutId="budgetTabActive"
                    className="absolute inset-0 -z-10 rounded-[12px] bg-sage shadow-sm"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                ) : null}
                <Icon size={13} className="shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.count > 0 ? (
                  <span
                    className={cn(
                      'ml-0.5 inline-flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-0.5 text-[9px] font-bold leading-none',
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

      {/* 5. Содержимое вкладок с плавной анимацией смены без проседания высоты */}
      <div className="house-tab-content px-4 min-h-[380px]">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* --- ВКЛАДКА 0: ОБЗОР СЕМЕЙНОГО БЮДЖЕТА (OVERVIEW) --- */}
          {tab === 'overview' ? (
            <div className="space-y-3.5">
              {/* Премиальный арт-баннер семейного бюджета */}
              <div className="relative overflow-hidden rounded-[22px] border border-emerald-950/20 bg-[#07170f] p-4 sm:p-5 text-white shadow-paper transition-all">
                <div
                  className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-75 pointer-events-none mix-blend-screen"
                  style={{ backgroundImage: `url('/assets/family-hub-banner.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06140d]/95 via-[#06140d]/80 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between gap-3 min-h-[135px]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-950/60 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                      <Users size={12} className="text-emerald-400" />
                      <span>Семейный бюджет «{snap.house?.name}»</span>
                    </div>
                    <div className="mt-2.5">
                      <p className="text-[11.5px] font-medium text-emerald-200/75">
                        {snap.house?.monthly_budget && snap.house.monthly_budget > 0 ? 'Остаток общего бюджета' : 'Всего подтверждённых трат за месяц'}
                      </p>
                      <div className="t-display t-num text-[28px] sm:text-[32px] font-bold leading-tight text-white drop-shadow-sm">
                        {money(snap.house?.monthly_budget && snap.house.monthly_budget > 0 ? monthLeft : monthSpent)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setTab('receipts')}
                      className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#22c55e] px-3.5 py-2 text-[12px] font-semibold text-[#052110] shadow-[0_4px_12px_rgba(34,197,94,0.3)] transition hover:brightness-105 active:scale-95 select-none"
                    >
                      <ReceiptText size={14} />
                      <span>Чеки покупок ({snap.receipts.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('bills')}
                      className="inline-flex items-center gap-1.5 rounded-[12px] border border-white/25 bg-white/10 backdrop-blur-md px-3 py-2 text-[12px] font-medium text-white transition hover:bg-white/20 active:scale-95 select-none"
                    >
                      <Receipt size={14} />
                      <span>Счета ({snap.bills.length})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Аналитика трат по категориям */}
              <div className="rounded-[18px] border border-rule bg-paper p-4 shadow-paper dark:bg-[#1a2228] dark:border-[#2f3b45]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-muted dark:text-[#9eaab3]">
                    Расходы по категориям
                  </span>
                  <span className="t-num text-[12.5px] font-bold text-ink dark:text-[#eef2f3]">
                    {money(receiptsSum)}
                  </span>
                </div>

                {snap.analytics.byCategory.length === 0 ? (
                  <p className="text-[12px] text-muted dark:text-[#9eaab3] py-2 text-center">
                    В этом месяце пока нет распределённых трат
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {snap.analytics.byCategory.map((c) => (
                      <div key={c.category}>
                        <div className="flex items-center justify-between text-[12px] mb-1">
                          <span className="font-medium text-ink dark:text-[#eef2f3]">{c.label}</span>
                          <span className="t-num text-muted dark:text-[#9eaab3]">{money(c.total)} ({c.percent}%)</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-rule-soft dark:bg-[#202930]">
                          <div
                            className="h-full rounded-full bg-sage"
                            style={{ width: `${Math.min(100, Math.max(4, c.percent))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Вклад участников в покупки */}
              {snap.analytics.byMember && snap.analytics.byMember.length > 0 ? (
                <div className="rounded-[18px] border border-rule bg-paper p-4 shadow-paper dark:bg-[#1a2228] dark:border-[#2f3b45]">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-muted dark:text-[#9eaab3] block mb-3">
                    Вклад участников в покупки
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {snap.analytics.byMember.map((m) => (
                      <div key={m.user_id} className="rounded-[12px] border border-rule/70 bg-cream/50 p-2.5 dark:bg-[#202930] dark:border-[#2f3b45]">
                        <span className="truncate text-[12.5px] font-semibold text-ink dark:text-[#eef2f3] block">
                          {m.name}
                        </span>
                        <span className="t-num text-[14px] font-bold text-sage dark:text-[#79d1a8] block mt-0.5">
                          {money(m.total)}
                        </span>
                        <span className="text-[11px] text-muted dark:text-[#9eaab3]">
                          {m.percent}% от всех трат
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

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
                      assertSaved(await addHouseBill({ data: { houseId: id, ...v } }))
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
                  const paid = snap.pays.some((p) => p.bill_id === b.id && p.cycle === snap.cycle && p.user_id === user?.id)
                  const due = billDueLabel(b.day_of_month)
                  const share = snap.shares?.[b.id]?.[myUserId] ?? 0
                  const payerMember = snap.members.find((m) => m.user_id === b.payer_id)

                  return (
                    <div
                      key={b.id}
                      className={cn(
                        'rounded-[16px] border p-3.5 transition-all shadow-paper',
                        paid
                          ? 'border-sage/40 bg-[#f4f8f5] dark:border-sage/35 dark:bg-[#15231e]'
                          : 'border-rule bg-paper dark:border-[#2f3b45] dark:bg-[#1a2228]',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div
                            className={cn(
                              'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors',
                              paid
                                ? 'border-sage/40 bg-sage/15 text-sage dark:border-sage/40 dark:bg-sage/20 dark:text-[#79d1a8]'
                                : 'border-rule/80 bg-paper text-ink shadow-xs dark:border-[#2f3b45] dark:bg-[#202930] dark:text-[#eef2f3]',
                            )}
                          >
                            {paid ? <CheckCircle2 size={18} /> : getBillIcon(b.title)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="t-display text-[15.5px] font-semibold text-ink dark:text-[#eef2f3] leading-snug">
                                {b.title}
                              </h4>
                              {paid ? (
                                <span className="rounded-[6px] bg-sage/15 px-2 py-0.5 text-[10.5px] font-bold text-sage dark:bg-sage/25 dark:text-[#79d1a8] leading-none">
                                  оплачен
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-[12px] text-muted dark:text-[#9eaab3] flex-wrap">
                              {paid ? (
                                <span className="font-medium text-sage dark:text-[#79d1a8]">
                                  Оплачен в этом месяце
                                </span>
                              ) : (
                                <span
                                  className={cn(
                                    due.key === 'today' || due.key === 'overdue'
                                      ? 'font-medium text-stamp dark:text-[#f87171]'
                                      : 'text-muted dark:text-[#9eaab3]',
                                  )}
                                >
                                  {due.label}
                                </span>
                              )}
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
                          <p className="t-num text-[17px] font-bold text-ink dark:text-[#eef2f3] leading-tight">
                            {moneyShort(b.amount)}
                          </p>
                          <p className="mt-0.5 text-[11.5px] font-medium text-sage dark:text-[#79d1a8] leading-tight">
                            ваша доля: {moneyShort(share)}
                          </p>
                        </div>
                      </div>

                      {/* Доли всех участников */}
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-rule/50 dark:border-[#2a343c] pt-2.5">
                        {snap.members.map((m) => {
                          const mShare = snap.shares?.[b.id]?.[m.user_id] ?? 0
                          const isM = m.user_id === user?.id
                          return (
                            <span
                              key={m.user_id}
                              className={cn(
                                'rounded-[7px] px-2 py-1 text-[11px] font-medium leading-none transition-colors',
                                isM
                                  ? 'bg-sage/15 text-sage dark:bg-sage/20 dark:text-[#79d1a8] font-semibold'
                                  : 'bg-cream text-muted dark:bg-[#202930] dark:text-[#a5afb7]',
                              )}
                            >
                              {m.name}: {moneyShort(mShare)}
                            </span>
                          )
                        })}
                      </div>

                      {/* Кнопка отметки об оплате и удаление */}
                      <div className="mt-3 flex items-center justify-between border-t border-rule/40 dark:border-[#2a343c] pt-2.5">
                        <button
                          onClick={async () => {
                            haptic(10)
                            const nextPaid = !paid
                            assertSaved(await payHouseBill({ data: { houseId: id, billId: b.id, paid: nextPaid } }))
                            if (nextPaid) {
                              showInAppNotification({
                                title: '✓ Платёж оплачен',
                                body: `«${b.title}» (${money(b.amount)}) отмечен как оплаченный`,
                                icon: 'sparkles',
                              })
                            }
                            await load()
                          }}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[12.5px] font-medium transition active:scale-95 shadow-xs select-none',
                            paid
                              ? 'border-sage/40 bg-paper text-sage hover:bg-sage/10 dark:border-sage/40 dark:bg-[#182823] dark:text-[#79d1a8] dark:hover:bg-[#1f332c]'
                              : 'border-sage bg-sage text-onsage hover:bg-sage/95 font-semibold',
                          )}
                        >
                          <Check size={14} />
                          <span>{paid ? 'Отменить оплату' : 'Отметить оплаченным'}</span>
                        </button>

                        <button
                          onClick={async () => {
                            if (!confirm(`Удалить платёж «${b.title}»?`)) return
                            assertSaved(await deleteHouseBill({ data: { houseId: id, billId: b.id } }))
                            await load()
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted/50 transition hover:bg-stamp/10 hover:text-stamp dark:hover:bg-stamp/20"
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
                    assertSaved(await addHouseBill({ data: { houseId: id, ...v } }))
                    await load()
                  }}
                />
              </>
            )}
          </div>
        ) : null}

        {/* --- ВКЛАДКА 2: ЧЕКИ КАССЫ (RECEIPTS) --- */}
        {tab === 'receipts' ? (
          <div className="space-y-3.5">
            {/* Премиальный фирменный баннер семейных трат и покупок */}
            <div className="relative overflow-hidden rounded-[22px] border border-emerald-950/20 bg-[#07170f] p-4 sm:p-5 text-white shadow-paper transition-all">
              {/* Художественная иллюстрация связей семьи, дома и покупок */}
              <div
                className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-75 pointer-events-none mix-blend-screen"
                style={{ backgroundImage: `url('/assets/family-hub-banner.png')` }}
              />
              {/* Градиент затемнения слева для читаемости цифр */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06140d]/95 via-[#06140d]/80 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between gap-4 min-h-[140px]">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-950/60 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    <Sparkles size={12} className="text-emerald-400" />
                    <span>Семейные покупки и чеки</span>
                  </div>
                  <div className="mt-2.5">
                    <p className="text-[11.5px] font-medium text-emerald-200/75">
                      Подтверждённые траты по чекам
                    </p>
                    <div className="t-display t-num text-[28px] sm:text-[32px] font-bold leading-tight text-white drop-shadow-sm">
                      {money(receiptsSum)}
                    </div>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-emerald-100/70">
                    {snap.receipts.length > 0
                      ? `${snap.receipts.length} ${plural(snap.receipts.length, 'чек', 'чека', 'чеков')} от всех участников`
                      : 'Все чеки супермаркетов и аптек на общем листке'}
                  </p>
                </div>

                {/* Кнопки действий: Скан чека и Привязать из личных */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link to="/scan" search={{ houseId: id }}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#22c55e] px-3.5 py-2 text-[12.5px] font-semibold text-[#052110] shadow-[0_4px_14px_rgba(34,197,94,0.35)] transition hover:brightness-105 active:scale-95 select-none"
                    >
                      <ScanLine size={15} />
                      <span>Сканировать чек</span>
                    </button>
                  </Link>
                  <AttachReceiptModal
                    houseId={id}
                    onAttached={async () => {
                      await load()
                    }}
                    trigger={(open) => (
                      <button
                        type="button"
                        onClick={open}
                        className="inline-flex items-center gap-1.5 rounded-[12px] border border-white/25 bg-white/10 backdrop-blur-md px-3 py-2 text-[12.5px] font-medium text-white transition hover:bg-white/20 active:scale-95 select-none"
                      >
                        <Plus size={15} />
                        <span>Прикрепить из моих</span>
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>

            {snap.receipts.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-5 text-center shadow-paper dark:bg-[#1a2228] dark:border-[#2f3b45]">
                <p className="text-[13.5px] font-semibold text-ink dark:text-[#eef2f3]">
                  Общих чеков пока нет
                </p>
                <p className="mx-auto mt-1 max-w-[280px] text-[12px] leading-relaxed text-muted dark:text-[#9eaab3]">
                  Сканируйте покупки в магазине или привязывайте чеки из личного ящика к общему бюджету.
                </p>
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
                            <span className="text-[12px] text-muted">Чек в общем бюджете</span>
                            {isMyReceipt ? (
                              <button
                                onClick={async () => {
                                  assertSaved(await linkReceiptToHouse({ data: { houseId: id, receiptId: r.id, link: false } }))
                                  await load()
                                }}
                                className="text-[12px] font-medium text-stamp hover:underline"
                              >
                                Отвязать от бюджета
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
                      assertSaved(await addWish({ data: { houseId: id, ...v } }))
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
                          isComplete
                            ? 'border-sage/40 bg-[#f4f8f5] dark:border-sage/35 dark:bg-[#15231e]'
                            : 'border-rule bg-paper dark:border-[#2f3b45] dark:bg-[#1a2228]',
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
                              onDeposit={async (amt, note, requestId) => {
                                haptic(12)
                                assertSaved(await depositGoal({
                                  data: { houseId: id, wishId: w.id, amount: amt, note, requestId },
                                }))
                                showInAppNotification({
                                  title: '🎯 Взнос в цель сохранён',
                                  body: `В цель «${w.title}» внесено ${money(amt)}`,
                                  icon: 'sparkles',
                                })
                                await load()
                              }}
                            />
                            <button
                              onClick={async () => {
                                haptic(12)
                                const willComplete = !isComplete
                                assertSaved(await toggleWish({ data: { houseId: id, wishId: w.id } }))
                                if (willComplete) {
                                  showInAppNotification({
                                    title: '🎉 Цель достигнута!',
                                    body: `Поздравляем! «${w.title}» куплена!`,
                                    icon: 'sparkles',
                                  })
                                }
                                await load()
                              }}
                              className="rounded-[10px] border border-rule/80 bg-paper px-2.5 py-1.5 text-[12px] font-medium text-muted hover:text-ink shadow-xs transition dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#dce4e9] dark:hover:text-white"
                            >
                              {isComplete ? 'В процесс' : 'Куплено'}
                            </button>
                          </div>

                          <button
                            onClick={async () => {
                              if (!confirm(`Удалить «${w.title}»?`)) return
                              assertSaved(await deleteWish({ data: { houseId: id, wishId: w.id } }))
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
                    assertSaved(await addWish({ data: { houseId: id, ...v } }))
                    await load()
                  }}
                />
              </>
            )}
          </div>
        ) : null}


          </motion.div>
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
  const [formError,setFormError]=React.useState('')

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="inline-flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-rule/80 bg-paper px-2.5 text-[12px] font-medium text-ink shadow-xs transition hover:border-sage hover:text-sage active:scale-95 leading-none dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#dce4e9]"
      >
        <span>{initialSalary ? moneyShort(initialSalary) : '+ доход'}</span>
      </button>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-1">{formError&&<span role="alert" className="text-stamp">{formError}</span>}
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
          try{await onSave(Math.round(Number(val || 0)));setEditing(false)}catch(e:any){setFormError(e.message||'Не удалось сохранить доход')}finally{setBusy(false)}
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
  const [formError,setFormError]=React.useState('')

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
        title="Месячный общий бюджет"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setBusy(true)
            try {
              await onSave(Math.round(Number(val.replace(/[^\d]/g, '') || 0)))
              setOpen(false)
            } catch(e:any){setFormError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally {
              setBusy(false)
            }
          }}
          className="space-y-4 pt-1"
        >
          {formError&&<p className="form-error" role="alert">{formError}</p>}
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
  onDeposit: (amount: number, note?: string,requestId?:string) => Promise<void>
}) {
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = React.useState('1000')
  const [note, setNote] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [formError,setFormError]=React.useState('')

  const request=React.useRef('')
  React.useEffect(()=>{if(open)request.current=newRequestId()},[open])
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
              await onDeposit(amt, note.trim() || undefined,request.current)
              setNote('')
              setOpen(false)
            } catch(e:any){setFormError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally {
              setBusy(false)
            }
          }}
          className="space-y-4 pt-1"
        >
          {formError&&<p className="form-error" role="alert">{formError}</p>}
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
                      : 'border-rule/80 bg-paper text-muted hover:text-ink hover:border-rule-soft dark:border-[#2f3b45] dark:bg-[#1a2228] dark:text-[#9eaab3] dark:hover:text-[#eef2f3] dark:hover:bg-[#222c34]',
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
              className="h-11 rounded-[12px] bg-paper text-[15px] font-semibold text-ink dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#eef2f3]"
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
              className="h-10 rounded-[12px] bg-paper text-[13px] text-ink dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#eef2f3]"
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

function AddHouseExpenseModal({houseId,onSaved,trigger}:{houseId:string;houseName:string;onSaved:()=>Promise<void>;trigger:(open:()=>void)=>React.ReactNode}){
 const [open,setOpen]=React.useState(false)
 return <>{trigger(()=>setOpen(true))}<ExpenseEditor open={open} onClose={()=>setOpen(false)} initialHouseId={houseId} onSaved={()=>void onSaved()}/></>
}

function AttachReceiptModal({
  houseId,
  onAttached,
  trigger,
}: {
  houseId: string
  onAttached: () => Promise<void>
  trigger?: (open: () => void) => React.ReactNode
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
      {trigger ? (
        trigger(openModal)
      ) : (
        <Button
          size="sm"
          variant="paper"
          onClick={openModal}
          className="gap-1 rounded-[10px] text-[12px]"
        >
          <Plus size={14} /> Прикрепить
        </Button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Прикрепить чек к общему бюджету"
      >
        <p className="text-[12px] text-muted -mt-2 mb-3">
          Выберите чек из личного ящика для добавления во «Вместе»
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
                      assertSaved(await linkReceiptToHouse({
                        data: { houseId, receiptId: r.id, link: true },
                      }))
                      setOpen(false)
                      await onAttached()
                    }}
                  >
                    + Во «Вместе»
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
  const [formError,setFormError]=React.useState('')

  const PRESETS = [
    { label: 'Аренда', icon: Home, defaultDay: '1', iconColor: 'text-amber-600 dark:text-amber-400' },
    { label: 'Интернет', icon: Wifi, defaultDay: '15', iconColor: 'text-sky-600 dark:text-sky-400' },
    { label: 'ЖКУ', icon: Zap, defaultDay: '10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Подписки', icon: Tv, defaultDay: '5', iconColor: 'text-purple-600 dark:text-purple-400' },
    { label: 'Продукты', icon: ShoppingBag, defaultDay: '10', iconColor: 'text-rose-600 dark:text-rose-400' },
  ]

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <button
          type="button"
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[14px] border border-dashed border-rule bg-paper px-4 text-[13px] font-medium text-ink shadow-xs transition hover:border-sage/60 hover:bg-cream/50 active:scale-[0.99] select-none dark:border-[#2f3b45] dark:bg-[#1a2228] dark:text-[#dce4e9] dark:hover:border-sage/50 dark:hover:bg-[#222c34]"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} className="text-sage" />
          <span>Добавить регулярный платёж</span>
        </button>
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
            } catch(e:any){setFormError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally {
              setBusy(false)
            }
          }}
          className="space-y-3.5 pt-1"
        >{formError&&<p className="form-error" role="alert">{formError}</p>}
          <div>
            <label className="mb-2 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Быстрый шаблон
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => {
                const Icon = p.icon
                const isSelected = title.trim() === p.label
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      haptic(6)
                      setTitle(p.label)
                      if (!day || day === '10' || day === '1') {
                        setDay(p.defaultDay)
                      }
                    }}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-[10px] border px-2.5 py-1.5 text-[12px] font-medium transition-all duration-150 active:scale-95 leading-none select-none',
                      isSelected
                        ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                        : 'border-rule/80 bg-paper text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-sage/50 hover:bg-cream/50 dark:border-[#2f3b45] dark:bg-[#1a2228] dark:text-[#dce4e9] dark:hover:border-sage/50 dark:hover:bg-[#222c34]',
                    )}
                  >
                    <Icon
                      size={14}
                      className={cn(
                        'shrink-0 transition-colors',
                        isSelected ? 'text-onsage' : p.iconColor,
                      )}
                    />
                    <span>{p.label}</span>
                  </button>
                )
              })}
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
              className="h-10 rounded-[12px] bg-paper text-[13.5px] text-ink dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#eef2f3]"
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
                className="h-10 rounded-[12px] bg-paper text-[13.5px] text-ink dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#eef2f3]"
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
                className="h-10 rounded-[12px] bg-paper text-[13.5px] text-ink dark:bg-[#1a2228] dark:border-[#2f3b45] dark:text-[#eef2f3]"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Как делим
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 'equal', label: 'Поровну' },
                { val: 'salary', label: 'По доходу' },
                { val: 'payer', label: 'Один платит' },
              ].map(({ val, label }) => {
                const isSelected = split === val
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      haptic(4)
                      setSplit(val)
                    }}
                    className={cn(
                      'min-h-[38px] rounded-[10px] border text-[12px] font-medium transition active:scale-95 leading-none select-none',
                      isSelected
                        ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                        : 'border-rule/80 bg-paper text-muted hover:text-ink hover:border-rule-soft dark:border-[#2f3b45] dark:bg-[#1a2228] dark:text-[#9eaab3] dark:hover:text-[#eef2f3] dark:hover:bg-[#222c34]',
                    )}
                  >
                    {label}
                  </button>
                )
              })}
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
                className="field h-10 w-full rounded-[10px] border border-rule bg-paper px-3 text-[13px] text-ink outline-none dark:border-[#2f3b45] dark:bg-[#1a2228] dark:text-[#eef2f3]"
              >
                {members.map((m) => (
                  <option key={m.user_id} value={m.user_id} className="dark:bg-[#1a2228] dark:text-[#eef2f3]">
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
  const [formError,setFormError]=React.useState('')

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
            } catch(e:any){setFormError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally {
              setBusy(false)
            }
          }}
          className="space-y-3 pt-1"
        >{formError&&<p className="form-error" role="alert">{formError}</p>}
          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Быстрый выбор идеи
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {[
                { title: 'Поездка в горы 🏔️', amt: '60000' },
                { title: 'Отпуск на море 🏖️', amt: '100000' },
                { title: 'Подушка безопасности 🛡️', amt: '150000' },
                { title: 'Ремонт и декор 🛋️', amt: '40000' },
                { title: 'Новый диван ✨', amt: '35000' },
              ].map((tpl) => (
                <button
                  key={tpl.title}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setTitle(tpl.title)
                    setAmount(tpl.amt)
                  }}
                  className="rounded-full border border-rule/70 bg-cream/40 px-2.5 py-1 text-[11.5px] text-muted transition hover:border-sage hover:text-ink active:scale-95 leading-none"
                >
                  {tpl.title}
                </button>
              ))}
            </div>

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
