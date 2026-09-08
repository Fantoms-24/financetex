import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Copy,
  CreditCard,
  Crown,
  Home,
  Info,
  LogOut,
  MessageSquare,
  Plus,
  Receipt,
  Send,
  Settings2,
  Share2,
  ShoppingBag,
  Sparkles,
  Trash2,
  Tv,
  Users,
  Wallet,
  Wifi,
  Zap,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { billDueLabel, dateRu, moneyShort, plural, timeRu } from '~/lib/format'
import { cn } from '~/lib/utils'
import {
  addHouseBill,
  addWish,
  deleteHouse,
  deleteHouseBill,
  deleteWish,
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
  split: 'equal' | 'salary' | 'payer' | string
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
  const [tab, setTab] = React.useState<'bills' | 'wishes' | 'chat'>('bills')
  const [showSettings, setShowSettings] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [showMembersDetail, setShowMembersDetail] = React.useState(false)
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

  // live polling
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
  const unboughtWishesCount = snap.wishes.filter((w) => !w.bought_at).length

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
              <span className="font-medium">{snap.members.length} {plural(snap.members.length, 'участник', 'участника', 'участников')}</span>
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

            {/* Код приглашения */}
            <div className="mb-4 rounded-[12px] border border-dashed border-sage/40 bg-sage/5 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-wider text-sage">Код для близких</p>
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
              <p className="mt-1.5 text-[11.5px] text-muted">
                Отправьте этот код тем, с кем делите бюджет. Они введут его в разделе «Кассы → Войти».
              </p>
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
                      if (!confirm('Удалить кассу полностью? Все платежи, список желаний и переписка будут стёрты.')) return
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
                      if (!confirm('Выйти из кассы? Вы перестанете получать уведомления о платежах.')) return
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

      {/* 2. Финтех-сводка: Главная карточка баланса обязательств */}
      <section className="mb-4 px-4">
        <div className="relative overflow-hidden rounded-[20px] border border-rule bg-gradient-to-b from-[#faf7ef] to-[#f4eee2] p-4 shadow-paper">
          {/* Верхняя строка сводки */}
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-1.5 font-medium text-muted">
              <Calendar size={13} className="text-sage" />
              <span>Обязательства за {formatCycleMonth(snap.cycle)}</span>
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium',
                percentPaid === 100 && totalBillsCount > 0
                  ? 'bg-sage/15 text-sage'
                  : 'bg-cream text-muted border border-rule/70',
              )}
            >
              {totalBillsCount === 0
                ? 'Нет платежей'
                : percentPaid === 100
                  ? 'Все оплачены ✓'
                  : `${paidCount} из ${totalBillsCount} оплачено`}
            </span>
          </div>

          {/* Главные показатели */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-[14px] border border-rule/70 bg-white/70 p-3 shadow-xs">
              <span className="text-[11.5px] text-muted">Общая сумма</span>
              <p className="t-num mt-0.5 text-[20px] font-bold text-ink">{moneyShort(totalBillsAmount)}</p>
              <span className="text-[10.5px] text-muted">в месяц на всех</span>
            </div>

            <div className="rounded-[14px] border border-sage/30 bg-sage/10 p-3 shadow-xs">
              <span className="text-[11.5px] font-medium text-sage">Ваша доля</span>
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
                <span>Прогресс закрытия</span>
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

      {/* 3. Участники и долевое распределение (аккордеон/карточка) */}
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
                <span className="t-display block text-[14.5px] font-semibold text-ink leading-tight">Участники и доходы</span>
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
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                          AVATAR_COLORS[idx % AVATAR_COLORS.length],
                        )}
                      >
                        {getInitials(m.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="truncate text-[13.5px] font-semibold text-ink leading-none">{m.name}</span>
                          {isCreator ? (
                            <span className="inline-flex items-center gap-0.5 rounded-[4px] px-1 py-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100/90 border border-amber-200/60 leading-none">
                              <Crown size={9} className="shrink-0" /> владелец
                            </span>
                          ) : null}
                          {isMe ? <span className="inline-flex items-center text-[11px] font-medium text-sage leading-none">· вы</span> : null}
                        </div>
                        <p className="mt-1 text-[11px] text-muted leading-tight">
                          {totalSalaries > 0 ? `доля в расходах ~${proportion}%` : 'доход не указан'}
                        </p>
                      </div>
                    </div>

                    {isMe ? (
                      <SalaryWidget
                        initialSalary={m.salary}
                        onSave={async (val) => {
                          await setSalary({ data: { houseId: id, amount: val } })
                          await load()
                        }}
                      />
                    ) : (
                      <span className="t-num shrink-0 text-[13px] font-semibold text-ink">
                        {m.salary ? moneyShort(m.salary) : '—'}
                      </span>
                    )}
                  </div>
                )
              })}
              <div className="mt-3 flex items-start gap-2 rounded-[10px] bg-cream/70 border border-rule/60 p-2.5 text-[11.5px] leading-relaxed text-muted">
                <span className="shrink-0 text-[13px] leading-none mt-0.5">💡</span>
                <span>Укажите доходы участников, чтобы касса автоматически распределяла общие счета пропорционально заработку.</span>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Современные вкладки (Сегментированный переключатель) */}
      <div className="mb-4 px-4">
        <div className="flex rounded-[14px] border border-rule bg-paper p-1 shadow-paper">
          {(
            [
              { id: 'bills', label: 'Платежи', count: snap.bills.length, icon: Receipt },
              { id: 'wishes', label: 'Желания', count: unboughtWishesCount, icon: Sparkles },
              { id: 'chat', label: 'Чат', count: snap.messages.length, icon: MessageSquare },
            ] as const
          ).map((item) => {
            const active = tab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  'relative flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-[11px] px-2 text-[13px] font-medium transition-all duration-200 active:scale-95 whitespace-nowrap leading-none',
                  active
                    ? 'bg-sage text-onsage shadow-sm font-semibold'
                    : 'text-muted hover:text-ink hover:bg-cream/50',
                )}
              >
                <Icon size={15} className="shrink-0" />
                <span>{item.label}</span>
                {item.count > 0 ? (
                  <span
                    className={cn(
                      'ml-0.5 inline-flex h-4 min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none',
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

      {/* 5. Содержимое вкладок */}
      <div className="px-4">
        {/* --- ВКЛАДКА: ПЛАТЕЖИ --- */}
        {tab === 'bills' ? (
          <div className="space-y-3">
            {snap.bills.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage">
                  <Receipt size={22} />
                </div>
                <h3 className="t-display text-[16.5px] font-semibold text-ink leading-tight">Регулярных платежей пока нет</h3>
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
                                : 'border-rule bg-cream text-muted',
                            )}
                          >
                            {getBillIcon(b.title)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="t-display truncate text-[16px] font-semibold text-ink leading-snug">{b.title}</h4>
                            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] leading-none">
                              {/* День месяца */}
                              <span className="inline-flex items-center rounded-[5px] bg-cream px-1.5 py-0.5 font-medium text-muted leading-none">
                                {b.day_of_month} числа
                              </span>

                              {/* Срок оплаты */}
                              <span
                                className={cn(
                                  'inline-flex items-center rounded-[5px] px-1.5 py-0.5 font-medium leading-none',
                                  due.key === 'today' || due.key === 'overdue'
                                    ? 'bg-stamp/10 text-stamp'
                                    : 'bg-rule-soft text-muted',
                                )}
                              >
                                {due.label}
                              </span>

                              {/* Способ деления */}
                              <span className="inline-flex items-center rounded-[5px] bg-cream px-1.5 py-0.5 text-muted leading-none">
                                {b.split === 'payer' && payerMember
                                  ? `Платит ${payerMember.name}`
                                  : SPLIT_LABEL[b.split] || b.split}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="t-num block text-[17px] font-bold text-ink leading-none">{moneyShort(b.amount)}</span>
                          <p className="mt-0.5 text-[10.5px] text-muted leading-tight">общий счёт</p>
                        </div>
                      </div>

                      {/* Нижняя строка: Доля пользователя и кнопка оплаты */}
                      <div className="mt-3 flex items-center justify-between border-t border-rule/60 pt-2.5">
                        <div className="flex items-baseline gap-1 text-[12.5px] leading-none">
                          <span className="text-muted">Ваша часть:</span>
                          <span className="t-num font-bold text-ink text-[13.5px]">{moneyShort(share)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Кнопка удаления для создателя или участника */}
                          <button
                            onClick={async () => {
                              if (!confirm(`Удалить платёж «${b.title}»?`)) return
                              await deleteHouseBill({ data: { houseId: id, billId: b.id } })
                              await load()
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted/60 hover:text-stamp hover:bg-stamp/10 transition"
                            title="Удалить платёж"
                          >
                            <Trash2 size={14} />
                          </button>

                          <button
                            onClick={async () => {
                              await payHouseBill({ data: { houseId: id, billId: b.id, paid: !paid } })
                              await load()
                            }}
                            className={cn(
                              'inline-flex min-h-[34px] items-center gap-1.5 rounded-[9px] px-3 text-[12.5px] font-medium transition active:scale-95 leading-none',
                              paid
                                ? 'border border-sage/40 bg-sage/10 text-sage hover:bg-sage/15'
                                : 'border border-rule bg-white text-ink hover:border-sage shadow-xs',
                            )}
                          >
                            {paid ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                            <span>{paid ? 'Оплачено' : 'Я оплатил'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Форма добавления регулярного платежа */}
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

        {/* --- ВКЛАДКА: ЖЕЛАНИЯ --- */}
        {tab === 'wishes' ? (
          <div className="space-y-3">
            {snap.wishes.length === 0 ? (
              <div className="rounded-[18px] border border-rule bg-paper p-6 text-center shadow-paper">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-sage">
                  <Sparkles size={22} />
                </div>
                <h3 className="t-display text-[16.5px] font-semibold text-ink leading-tight">Список желаний пуст</h3>
                <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] leading-relaxed text-muted">
                  Записывайте совместные покупки: от кофемашины до нового дивана
                </p>
                <div className="mt-4 flex justify-center">
                  <AddWishModal
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
                        <Plus size={16} /> Добавить желание
                      </Button>
                    )}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {snap.wishes.map((w) => {
                    const isBought = !!w.bought_at
                    return (
                      <div
                        key={w.id}
                        className={cn(
                          'flex items-center gap-3 rounded-[14px] border p-3 transition shadow-sm',
                          isBought
                            ? 'border-rule/50 bg-cream/40 opacity-70'
                            : 'border-rule bg-paper hover:border-sage/40',
                        )}
                      >
                        <button
                          onClick={async () => {
                            await toggleWish({ data: { houseId: id, wishId: w.id } })
                            await load()
                          }}
                          className={cn(
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] border transition active:scale-90',
                            isBought
                              ? 'border-sage bg-sage text-onsage'
                              : 'border-rule bg-white hover:border-sage text-transparent',
                          )}
                          aria-label={isBought ? 'Отметить не купленным' : 'Отметить купленным'}
                        >
                          <Check size={14} className={isBought ? 'opacity-100' : 'opacity-0'} />
                        </button>

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              't-display truncate text-[14.5px] font-medium leading-snug',
                              isBought ? 'text-muted line-through' : 'text-ink',
                            )}
                          >
                            {w.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted leading-tight">
                            {w.by_name ? `добавил(а) ${w.by_name}` : 'общая идея'}
                            {isBought ? ' · куплено' : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {w.amount > 0 ? (
                            <span
                              className={cn(
                                't-num rounded-[6px] px-2 py-0.5 text-[13px] font-semibold leading-none',
                                isBought ? 'bg-cream text-muted line-through' : 'bg-cream text-ink',
                              )}
                            >
                              {moneyShort(w.amount)}
                            </span>
                          ) : null}

                          <button
                            onClick={async () => {
                              if (!confirm(`Удалить «${w.title}» из списка?`)) return
                              await deleteWish({ data: { houseId: id, wishId: w.id } })
                              await load()
                            }}
                            className="flex h-7 w-7 items-center justify-center text-muted/50 hover:text-stamp transition"
                            title="Удалить желание"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Форма добавления желания */}
                <AddWishModal
                  onAdd={async (v) => {
                    await addWish({ data: { houseId: id, ...v } })
                    await load()
                  }}
                />
              </>
            )}
          </div>
        ) : null}

        {/* --- ВКЛАДКА: ЧАТ КАССЫ --- */}
        {tab === 'chat' ? (
          <div className="rounded-[18px] border border-rule bg-paper p-3.5 shadow-paper">
            <div className="mb-2 flex items-center justify-between border-b border-rule/60 pb-2 text-[12px] text-muted">
              <span>Сообщения и уведомления</span>
              <span className="text-[11px]">приходят пушем</span>
            </div>

            <div className="mb-3 flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto px-1 py-1 no-scrollbar">
              {snap.messages.length === 0 ? (
                <div className="py-8 text-center text-[13px] text-muted">
                  Пока сообщений нет. Напишите что-нибудь в общую кассу!
                </div>
              ) : (
                snap.messages.map((m) => {
                  const isMe = m.user_id === user?.id
                  return (
                    <div
                      key={m.id}
                      className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
                    >
                      {!isMe ? (
                        <span className="mb-0.5 ml-1 text-[11px] font-semibold text-sage">
                          {m.name}
                        </span>
                      ) : null}
                      <div
                        className={cn(
                          'max-w-[82%] rounded-[14px] px-3.5 py-2 text-[14px] leading-snug shadow-xs break-words',
                          isMe
                            ? 'bg-sage text-onsage rounded-tr-xs'
                            : 'bg-white border border-rule text-ink rounded-tl-xs',
                        )}
                      >
                        <p>{m.text}</p>
                      </div>
                      <span className="mt-0.5 px-1 text-[10px] text-muted/70">
                        {timeRu(m.created_at)}
                      </span>
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

  if (!open) {
    if (trigger) {
      return <>{trigger(() => setOpen(true))}</>
    }
    return (
      <Button
        variant="paper"
        size="md"
        className="w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} /> Добавить регулярный платёж
      </Button>
    )
  }

  return (
    <form
      className="rounded-[16px] border border-rule bg-paper p-4 shadow-paper"
      onSubmit={async (e) => {
        e.preventDefault()
        const amt = Math.round(Number(amount.replace(/[^\d]/g, '') || 0))
        if (!title.trim() || !amt) return
        setBusy(true)
        try {
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
        } finally {
          setBusy(false)
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="t-display text-[15px] font-semibold text-ink leading-none">Новый регулярный счёт</h4>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12px] text-muted hover:text-ink transition leading-none"
        >
          Отмена
        </button>
      </div>

      {/* Быстрые пресеты */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setTitle(p)}
            className="rounded-[8px] border border-rule/70 bg-white px-2.5 py-1 text-[11.5px] font-medium text-muted hover:border-sage hover:text-sage transition leading-none"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-2.5 mb-3">
        <div>
          <label className="mb-1 block text-[11.5px] font-medium text-muted leading-tight">Название счёта</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, Интернет в квартире"
            className="h-10 text-[13.5px]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="mb-1 block text-[11.5px] font-medium text-muted leading-tight">Сумма (₽)</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="3 500"
              inputMode="numeric"
              className="h-10 text-[13.5px]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] font-medium text-muted leading-tight">Число месяца</label>
            <Input
              value={day}
              onChange={(e) => setDay(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
              placeholder="10"
              inputMode="numeric"
              className="h-10 text-[13.5px]"
              required
            />
          </div>
        </div>
      </div>

      {/* Выбор типа деления счёта */}
      <div className="mb-3">
        <label className="mb-1.5 block text-[11.5px] font-medium text-muted leading-tight">Как делим этот счёт</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(
            [
              ['equal', 'Поровну'],
              ['salary', 'По доходу'],
              ['payer', 'Платит 1'],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSplit(val)}
              className={cn(
                'min-h-[36px] rounded-[10px] border text-[12px] font-medium transition leading-none',
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
        <div className="mb-3">
          <label className="mb-1 block text-[11.5px] font-medium text-muted leading-tight">Кто оплачивает</label>
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

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(false)}
          className="flex-1 text-[13px]"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="sage"
          disabled={busy}
          className="flex-1 text-[13px]"
        >
          {busy ? 'Сохранение…' : 'Добавить счёт'}
        </Button>
      </div>
    </form>
  )
}

function AddWishModal({
  onAdd,
  trigger,
}: {
  onAdd: (v: { title: string; amount: number }) => Promise<void>
  trigger?: (open: () => void) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  if (!open) {
    if (trigger) {
      return <>{trigger(() => setOpen(true))}</>
    }
    return (
      <Button
        variant="paper"
        size="md"
        className="w-full gap-2 rounded-[14px] border border-dashed border-rule-soft bg-paper/60 hover:bg-white text-[13.5px]"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} /> Добавить совместное желание
      </Button>
    )
  }

  return (
    <form
      className="rounded-[16px] border border-rule bg-paper p-4 shadow-paper"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!title.trim()) return
        setBusy(true)
        try {
          await onAdd({
            title: title.trim(),
            amount: Math.round(Number(amount.replace(/[^\d]/g, '') || 0)),
          })
          setTitle('')
          setAmount('')
          setOpen(false)
        } finally {
          setBusy(false)
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="t-display text-[15px] font-semibold text-ink leading-none">Новое совместное желание</h4>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12px] text-muted hover:text-ink transition leading-none"
        >
          Отмена
        </button>
      </div>

      <div className="space-y-2.5 mb-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Что хотим купить? (робот-пылесос, билеты...)"
          className="h-10 text-[13.5px]"
          autoFocus
          required
        />
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
          placeholder="Примерная стоимость в ₽ (необязательно)"
          inputMode="numeric"
          className="h-10 text-[13.5px]"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(false)}
          className="flex-1 text-[13px]"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="sage"
          disabled={busy}
          className="flex-1 text-[13px]"
        >
          {busy ? 'Секунду…' : 'В список'}
        </Button>
      </div>
    </form>
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
        placeholder="Написать в кассу…"
        className="h-11 rounded-[12px] bg-white text-[13.5px]"
      />
      <Button
        type="submit"
        variant="sage"
        size="icon"
        disabled={busy || !text.trim()}
        className="h-11 w-11 shrink-0 rounded-[12px]"
        aria-label="Отправить сообщение"
      >
        <Send size={16} />
      </Button>
    </form>
  )
}
