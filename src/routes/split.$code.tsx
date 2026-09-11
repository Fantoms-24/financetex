import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Info,
  LoaderCircle,
  PartyPopper,
  Plus,
  QrCode,
  Receipt,
  RotateCcw,
  Share2,
  Sparkles,
  User,
  UserCheck,
  UserPlus,
  Users,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { BottomSheet } from '~/components/BottomSheet'
import { money, moneyShort } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import {
  getSplitPublic,
  joinSplit,
  claimSplitItem,
  toggleSplitShared,
  markMemberPaid,
  addSplitItem,
  type SplitPublicData,
} from '~/server/functions/split'

export const Route = createFileRoute('/split/$code')({
  component: SplitScreen,
})

function SplitScreen() {
  const { code } = Route.useParams()
  const [data, setData] = React.useState<SplitPublicData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [currentMemberId, setCurrentMemberId] = React.useState<string | null>(null)
  const [customName, setCustomName] = React.useState('')
  const [openJoinSheet, setOpenJoinSheet] = React.useState(false)
  const [openAddDishSheet, setOpenAddDishSheet] = React.useState(false)
  const [openShareSheet, setOpenShareSheet] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)
  const [copiedPhone, setCopiedPhone] = React.useState(false)
  const [actionBusy, setActionBusy] = React.useState(false)

  // Поля добавления блюда
  const [dishName, setDishName] = React.useState('')
  const [dishPrice, setDishPrice] = React.useState('')
  const [dishShared, setDishShared] = React.useState(false)

  const storageKey = `listok_split_member_${code.toLowerCase()}`

  const loadData = React.useCallback(async () => {
    try {
      const res = await getSplitPublic({ data: { code } })
      if (res && res.data) {
        setData(res.data)
        setError(null)
      } else {
        setError('Счёт не найден или был удалён')
      }
    } catch (e: any) {
      setError(e?.message || 'Не удалось загрузить данные счёта')
    } finally {
      setLoading(false)
    }
  }, [code])

  React.useEffect(() => {
    loadData()
    // Проверяем сохранённого участника
    try {
      const savedId = localStorage.getItem(storageKey)
      if (savedId) setCurrentMemberId(savedId)
    } catch {}
  }, [loadData, storageKey])

  // Текущий участник в структуре данных
  const currentMember = React.useMemo(() => {
    if (!data || !currentMemberId) return null
    return data.members.find((m) => m.id === currentMemberId) || null
  }, [data, currentMemberId])

  const selectMember = (memberId: string) => {
    haptic(6)
    setCurrentMemberId(memberId)
    try {
      localStorage.setItem(storageKey, memberId)
    } catch {}
    setOpenJoinSheet(false)
  }

  const handleJoinNew = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customName.trim() || actionBusy) return
    setActionBusy(true)
    try {
      const res = await joinSplit({ data: { code, name: customName.trim() } })
      if (res && res.ok && res.memberId) {
        setCurrentMemberId(res.memberId)
        try {
          localStorage.setItem(storageKey, res.memberId)
        } catch {}
        setCustomName('')
        setOpenJoinSheet(false)
        await loadData()
        haptic(10)
      }
    } finally {
      setActionBusy(false)
    }
  }

  const handleToggleClaim = async (itemId: string, alreadyClaimed: boolean) => {
    if (!currentMemberId) {
      setOpenJoinSheet(true)
      return
    }
    haptic(8)
    // Оптимистичный отклик
    setData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: prev.items.map((it) => {
          if (it.id !== itemId) return it
          const newClaimers = alreadyClaimed
            ? it.claimers.filter((c) => c.member_id !== currentMemberId)
            : [...it.claimers, { member_id: currentMemberId, member_name: currentMember?.name || 'Вы' }]
          return { ...it, claimers: newClaimers }
        }),
      }
    })

    await claimSplitItem({
      data: {
        code,
        memberId: currentMemberId,
        itemId,
        claimed: !alreadyClaimed,
      },
    })
    await loadData()
  }

  const handleToggleShared = async (itemId: string, currentShared: boolean) => {
    haptic(6)
    setData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: prev.items.map((it) => (it.id === itemId ? { ...it, is_shared: !currentShared } : it)),
      }
    })
    await toggleSplitShared({
      data: {
        code,
        itemId,
        isShared: !currentShared,
      },
    })
    await loadData()
  }

  const handleTogglePaid = async () => {
    if (!currentMemberId || !currentMember) return
    haptic(12)
    const nextPaid = !currentMember.paid
    setData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        members: prev.members.map((m) => (m.id === currentMemberId ? { ...m, paid: nextPaid } : m)),
      }
    })
    await markMemberPaid({
      data: {
        code,
        memberId: currentMemberId,
        paid: nextPaid,
      },
    })
    await loadData()
  }

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault()
    const p = Math.round(Number(dishPrice.replace(/[^\d]/g, '') || 0))
    if (!dishName.trim() || p <= 0 || actionBusy) return
    setActionBusy(true)
    try {
      await addSplitItem({
        data: {
          code,
          name: dishName.trim(),
          price: p,
          isShared: dishShared,
        },
      })
      setDishName('')
      setDishPrice('')
      setDishShared(false)
      setOpenAddDishSheet(false)
      await loadData()
      haptic(10)
    } finally {
      setActionBusy(false)
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://financetex.relaxdev.ru/split/${code}`

  const handleShare = async () => {
    haptic(6)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Сплит счёта: ${data?.split.title || 'Листок'}`,
          text: `Привет! Разделим счёт «${data?.split.title || 'в заведении'}» через Листок. Открой ссылку и отметь свои блюда:`,
          url: shareUrl,
        })
        return
      } catch {}
    }
    setOpenShareSheet(true)
  }

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    haptic(6)
    navigator.clipboard?.writeText(text)
    setFn(true)
    setTimeout(() => setFn(false), 2200)
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-3 px-4 text-center">
        <LoaderCircle size={28} className="animate-spin text-sage" />
        <p className="text-[14px] text-muted">Загружаем счёт для разделения…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stamp/10 text-stamp">
          <Receipt size={28} />
        </div>
        <div className="space-y-1">
          <h2 className="t-display text-[20px] font-bold text-ink">Счёт не найден</h2>
          <p className="max-w-[280px] text-[13px] text-muted">
            {error || 'Возможно, ссылка устарела или введён неверный код.'}
          </p>
        </div>
        <Link to="/" className="inline-block pt-2">
          <Button variant="sage" size="sm" className="rounded-full px-5">
            На главную Листка
          </Button>
        </Link>
      </div>
    )
  }

  const { split, items, members, stats } = data
  const progressPercent = Math.min(100, Math.round((stats.total_paid / Math.max(1, split.grand_total)) * 100))

  return (
    <div className="min-h-screen bg-cream/40 pb-48 pt-3 text-ink">
      <div className="mx-auto max-w-[440px] space-y-4 px-4 sm:px-5">
        {/* 1. Верхний бар: бренд и шеринг */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[17px]">🌿</span>
            <span className="t-display text-[15px] font-semibold text-ink">Листок.</span>
            <span className="rounded-full bg-sage/12 px-2 py-0.2 text-[10.5px] font-semibold text-sage">
              Сплит счёта
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex h-9 items-center gap-1.5 rounded-full border border-rule/80 bg-paper px-3 text-[12px] font-semibold text-sage shadow-xs active:scale-95 transition"
            >
              <Share2 size={13} />
              <span>Поделиться</span>
            </button>
          </div>
        </header>

        {/* 2. Карточка заведения и суммы чека */}
        <section className="relative overflow-hidden rounded-[24px] border border-rule/80 bg-paper p-5 shadow-paper space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11.5px] font-medium text-muted uppercase tracking-wider block">
                Заведение / Место
              </span>
              <h1 className="t-display text-[22px] font-bold text-ink leading-tight">
                {split.title}
              </h1>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11.5px] font-medium text-muted uppercase tracking-wider block">
                Итого к оплате
              </span>
              <span className="t-display t-num text-[23px] font-bold text-ink">
                {money(split.grand_total)}
              </span>
            </div>
          </div>

          {/* Детализация чаевых и организатора */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule/60 pt-3 text-[12px] text-muted">
            <div className="flex items-center gap-1.5">
              <User size={13} className="text-sage" />
              <span>
                Организатор: <strong className="text-ink">{split.organizer_name}</strong>
              </span>
            </div>

            {split.tip_percent > 0 ? (
              <span className="rounded-full bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-900">
                Включая {split.tip_percent}% чаевых ({money(split.tip_amount)})
              </span>
            ) : null}
          </div>

          {/* Прогресс сбора */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11.5px] text-muted">
              <span>Собрано участниками:</span>
              <span className="t-num font-semibold text-ink">
                {money(stats.total_paid)} из {money(split.grand_total)} ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
              <div
                className={cn(
                  'h-full transition-all duration-500 rounded-full',
                  progressPercent >= 100 ? 'bg-sage' : 'bg-sage/70',
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* 3. Плашка идентификации участника («Кто вы?») */}
        <section className="rounded-[20px] border border-rule/70 bg-paper/80 p-3.5 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
              <UserCheck size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-muted block">Вы отмечаете как:</span>
              <span className="text-[14px] font-bold text-ink truncate block">
                {currentMember ? currentMember.name : 'Гость (не выбрано)'}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="paper"
            onClick={() => {
              haptic(6)
              setOpenJoinSheet(true)
            }}
            className="rounded-full px-3 h-8 text-[12px] font-medium text-sage hover:bg-sage/10 shrink-0"
          >
            {currentMember ? 'Сменить' : 'Выбрать имя'}
          </Button>
        </section>

        {/* 4. Список позиций и блюд */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Utensils size={14} className="text-sage" />
              <h2 className="t-display text-[16px] font-semibold text-ink">Позиции в чеке</h2>
              <span className="rounded-full bg-rule/70 px-2 py-0.2 text-[11px] font-medium text-muted">
                {items.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                haptic(6)
                setOpenAddDishSheet(true)
              }}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-sage hover:underline"
            >
              <Plus size={13} />
              <span>Добавить блюдо</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-rule/80 bg-paper/60 p-6 text-center space-y-2.5">
              <p className="text-[13px] text-muted">В чеке пока нет отдельных позиций.</p>
              <Button
                variant="sage"
                size="sm"
                onClick={() => setOpenAddDishSheet(true)}
                className="rounded-full gap-1.5"
              >
                <Plus size={15} />
                <span>Добавить первое блюдо</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => {
                const isClaimedByMe = Boolean(
                  currentMemberId && item.claimers.some((c) => c.member_id === currentMemberId),
                )
                const claimersCount = item.claimers.length
                const perPersonPrice = claimersCount > 0 ? Math.round(item.price / claimersCount) : item.price

                return (
                  <div
                    key={item.id}
                    className={cn(
                      'overflow-hidden rounded-[18px] border transition-all shadow-xs',
                      isClaimedByMe
                        ? 'border-sage/60 bg-sage/8 shadow-paper'
                        : item.is_shared
                          ? 'border-sky-500/30 bg-sky-500/5'
                          : 'border-rule/80 bg-paper',
                    )}
                  >
                    <div className="p-3.5 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-[14.5px] font-semibold text-ink leading-snug">
                            {item.name}
                          </h3>
                          {item.qty > 1 ? (
                            <span className="text-[12px] text-muted font-normal">×{item.qty}</span>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
                          <span className="t-num font-bold text-ink">{money(item.price)}</span>

                          {/* Если блюдо делят несколько человек */}
                          {!item.is_shared && claimersCount > 1 ? (
                            <span className="text-[11px] text-muted font-medium">
                              (по {money(perPersonPrice)} на чел.)
                            </span>
                          ) : null}

                          {/* Индикатор общего блюда */}
                          {item.is_shared ? (
                            <span className="rounded-full bg-sky-500/15 px-2 py-0.2 text-[10.5px] font-semibold text-sky-800">
                              Общее на всех 👥
                            </span>
                          ) : null}
                        </div>

                        {/* Список людей, кто выбрал это блюдо */}
                        {!item.is_shared && claimersCount > 0 ? (
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            <span className="text-[10.5px] text-muted">Выбрали:</span>
                            {item.claimers.map((c) => (
                              <span
                                key={c.member_id}
                                className={cn(
                                  'rounded-full px-2 py-0.2 text-[10px] font-semibold',
                                  c.member_id === currentMemberId
                                    ? 'bg-sage text-onsage'
                                    : 'bg-cream text-ink border border-rule/60',
                                )}
                              >
                                {c.member_id === currentMemberId ? 'Вы' : c.member_name}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {/* Кнопка выбора блюда */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {item.is_shared ? (
                          <button
                            type="button"
                            onClick={() => handleToggleShared(item.id, true)}
                            className="text-[11px] text-muted hover:text-ink underline"
                            title="Сделать блюдо персональным"
                          >
                            Сделать личным
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleClaim(item.id, isClaimedByMe)}
                            className={cn(
                              'flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold transition active:scale-95',
                              isClaimedByMe
                                ? 'bg-sage text-onsage shadow-paper'
                                : 'border border-rule/90 bg-paper text-ink hover:border-sage/60 hover:bg-sage/5',
                            )}
                          >
                            {isClaimedByMe ? <Check size={14} strokeWidth={2.6} /> : <Plus size={14} />}
                            <span>{isClaimedByMe ? 'Моё' : 'Я ел(а)'}</span>
                          </button>
                        )}

                        {!item.is_shared ? (
                          <button
                            type="button"
                            onClick={() => handleToggleShared(item.id, false)}
                            className="text-[10.5px] text-muted/80 hover:text-sage pt-0.5"
                          >
                            На всех 👥
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* 5. Список участников и статус оплат */}
        <section className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-sage" />
              <h2 className="t-display text-[15.5px] font-semibold text-ink">Кто сколько переводит</h2>
            </div>
            <span className="text-[12px] text-muted">
              {members.filter((m) => m.paid).length} из {members.length} оплатили
            </span>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper divide-y divide-rule-soft shadow-xs">
            {members.map((m) => {
              const isMe = m.id === currentMemberId
              return (
                <div
                  key={m.id}
                  className={cn(
                    'p-3 flex items-center justify-between gap-3 text-[13px]',
                    isMe && 'bg-sage/6 font-medium',
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                        m.is_organizer
                          ? 'bg-amber-500/20 text-amber-900'
                          : m.paid
                            ? 'bg-sage/20 text-sage'
                            : 'bg-rule/70 text-muted',
                      )}
                    >
                      {m.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-ink font-semibold">{m.name}</span>
                        {isMe ? (
                          <span className="rounded-full bg-sage/15 px-1.5 py-0.2 text-[9.5px] font-bold text-sage">
                            ВЫ
                          </span>
                        ) : null}
                        {m.is_organizer ? (
                          <span className="rounded-full bg-amber-500/15 px-1.5 py-0.2 text-[9.5px] font-semibold text-amber-800">
                            Организатор
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[11px] text-muted block">
                        {m.items_count} {m.items_count === 1 ? 'позиция' : 'позиций'}
                        {m.shared_amount > 0 ? ' + общие' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex items-center gap-2.5">
                    <span className="t-num text-[14.5px] font-bold text-ink">
                      {money(m.total_amount)}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10.5px] font-semibold',
                        m.paid ? 'bg-sage/15 text-sage' : 'bg-stamp/10 text-stamp',
                      )}
                    >
                      {m.paid ? 'Оплачено ✓' : 'Ожидает'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* 6. Плавающий подвал с расчетом и переводом по СБП */}
      {currentMember ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-rule/80 bg-paper/95 p-4 backdrop-blur-md shadow-2xl safe-bottom">
          <div className="mx-auto max-w-[440px] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted uppercase tracking-wider block">
                  Ваша часть ({currentMember.name}):
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="t-display t-num text-[22px] font-bold text-ink">
                    {money(currentMember.total_amount)}
                  </span>
                  {split.tip_percent > 0 && currentMember.tip_amount > 0 ? (
                    <span className="text-[11.5px] text-muted">
                      (вкл. чаевые {money(currentMember.tip_amount)})
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Статус оплаты текущего пользователя */}
              <Button
                size="sm"
                variant={currentMember.paid ? 'paper' : 'sage'}
                onClick={handleTogglePaid}
                className="rounded-full gap-1 px-3.5 h-9"
              >
                {currentMember.paid ? (
                  <>
                    <Check size={14} className="text-sage" />
                    <span>Переведено ✓</span>
                  </>
                ) : (
                  <span>Я перевёл(а)</span>
                )}
              </Button>
            </div>

            {/* Реквизиты СБП организатора (показываются если не организатор) */}
            {!currentMember.is_organizer && split.organizer_phone ? (
              <div className="rounded-[16px] border border-rule/80 bg-cream/60 p-2.5 flex items-center justify-between gap-2 text-[12px]">
                <div className="min-w-0">
                  <span className="text-[10.5px] text-muted block">
                    Перевод по СБП для {split.organizer_name} ({split.organizer_bank || 'Банк'}):
                  </span>
                  <span className="font-mono text-[13px] font-bold text-ink select-all">
                    {split.organizer_phone}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(split.organizer_phone || '', setCopiedPhone)}
                  className="flex items-center gap-1 rounded-lg bg-paper border border-rule px-2.5 py-1 text-[11.5px] font-semibold text-sage hover:bg-sage/10 active:scale-95 transition"
                >
                  <Copy size={12} />
                  <span>{copiedPhone ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Если имя ещё не выбрано — приглашаем выбрать */
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-rule/80 bg-paper/95 p-4 backdrop-blur-md shadow-2xl safe-bottom">
          <div className="mx-auto max-w-[440px]">
            <Button
              variant="sage"
              size="lg"
              onClick={() => setOpenJoinSheet(true)}
              className="w-full rounded-[18px] gap-2 text-[14.5px] font-semibold shadow-paper"
            >
              <UserPlus size={18} />
              <span>Указать своё имя и выбрать блюда</span>
            </Button>
          </div>
        </div>
      )}

      {/* Шторка 1: Выбор или ввод своего имени */}
      <BottomSheet
        open={openJoinSheet}
        onClose={() => setOpenJoinSheet(false)}
        title="Кто вы за этим столом?"
      >
        <div className="space-y-4 pt-1">
          {members.length > 0 ? (
            <div className="space-y-2">
              <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted block">
                Выберите ваше имя:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {members.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectMember(m.id)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-2.5 text-left transition active:scale-95',
                      m.id === currentMemberId
                        ? 'border-sage bg-sage/15 text-sage font-bold'
                        : 'border-rule/80 bg-paper text-ink hover:border-sage/50',
                    )}
                  >
                    <span className="truncate text-[13px]">{m.name}</span>
                    {m.id === currentMemberId ? <Check size={14} /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form onSubmit={handleJoinNew} className="space-y-3 border-t border-rule/60 pt-3">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted block">
              Или введите новое имя:
            </span>
            <div className="flex gap-2">
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Например: Аня, Максим…"
                className="h-11 rounded-[14px] flex-1 text-[14px]"
              />
              <Button
                type="submit"
                variant="sage"
                disabled={!customName.trim() || actionBusy}
                className="h-11 rounded-[14px] px-4 font-semibold shrink-0"
              >
                Войти
              </Button>
            </div>
          </form>
        </div>
      </BottomSheet>

      {/* Шторка 2: Добавление позиции/блюда */}
      <BottomSheet
        open={openAddDishSheet}
        onClose={() => setOpenAddDishSheet(false)}
        title="Добавить блюдо в счёт"
      >
        <form onSubmit={handleAddDish} className="space-y-4 pt-1">
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Название блюда или напитка
            </label>
            <Input
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="Пицца, паста, капучино…"
              className="h-11 rounded-[14px]"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Сумма (₽)
            </label>
            <Input
              type="number"
              inputMode="numeric"
              value={dishPrice}
              onChange={(e) => setDishPrice(e.target.value)}
              placeholder="650"
              className="h-11 rounded-[14px] font-mono text-[16px]"
            />
          </div>

          <label className="flex items-center gap-2.5 rounded-xl border border-rule/70 bg-paper p-3 text-[13px] text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={dishShared}
              onChange={(e) => setDishShared(e.target.checked)}
              className="h-4 w-4 rounded text-sage focus:ring-sage"
            />
            <div>
              <span className="font-semibold block">Общее блюдо (разделить на всех)</span>
              <span className="text-[11.5px] text-muted block">
                Закуски, хлеб, напитки, которые заказывались на всю компанию
              </span>
            </div>
          </label>

          <Button
            type="submit"
            variant="sage"
            disabled={!dishName.trim() || !dishPrice || actionBusy}
            className="w-full h-11 rounded-[14px] font-semibold shadow-paper"
          >
            {actionBusy ? 'Добавляем…' : 'Добавить блюдо'}
          </Button>
        </form>
      </BottomSheet>

      {/* Шторка 3: Шеринг ссылки и QR-код */}
      <BottomSheet
        open={openShareSheet}
        onClose={() => setOpenShareSheet(false)}
        title="Поделиться счётом с друзьями"
      >
        <div className="space-y-4 pt-1 text-center">
          <p className="text-[13px] text-muted">
            Отправьте эту ссылку друзьям в чат Telegram или WhatsApp. Они смогут открыть её прямо со своих телефонов без регистрации:
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-rule/80 bg-cream/50 p-2 text-left">
            <span className="font-mono text-[12px] text-ink truncate flex-1 select-all px-1">
              {shareUrl}
            </span>
            <Button
              size="sm"
              variant="sage"
              onClick={() => copyToClipboard(shareUrl, setCopiedLink)}
              className="rounded-lg px-3 h-8 text-[12px] font-semibold shrink-0"
            >
              {copiedLink ? 'Скопировано!' : 'Копировать'}
            </Button>
          </div>

          <div className="rounded-2xl border border-rule/70 bg-paper p-4 text-center space-y-2">
            <span className="text-[11.5px] font-semibold text-muted uppercase tracking-wider block">
              Или отсканируйте с экрана:
            </span>
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl bg-white border border-rule shadow-xs p-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(shareUrl)}`}
                alt="QR-код счёта"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-[11px] text-muted">
              Друзья могут навести камеру смартфона прямо на этот QR-код за столом.
            </p>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
