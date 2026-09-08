import * as React from 'react'
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Crown,
  Hash,
  Home as HomeIcon,
  KeyRound,
  Palmtree,
  Plus,
  ReceiptText,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { BottomSheet } from '~/components/BottomSheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { money, plural } from '~/lib/format'
import { createHouse, joinHouse, listHouses } from '~/server/functions/houses'
import { cn, haptic } from '~/lib/utils'
import { showInAppNotification } from '~/components/NotificationBanner'

export const Route = createFileRoute('/groups')({
  component: Groups,
})

interface HouseRow {
  id: string
  name: string
  code: string
  owner_id: string
  members: number
  monthly_budget?: number
  total_spent?: number
  receipts_count?: number
  bills_count?: number
}

const PRESET_NAMES = ['Семья', 'Квартира', 'Отпуск', 'Дача', 'Ремонт', 'Соседи']

function getHouseIcon(name: string) {
  const n = (name || '').toLowerCase()
  if (n.includes('семья') || n.includes('дом') || n.includes('квартира')) {
    return <HomeIcon size={20} className="text-sage" />
  }
  if (n.includes('отпуск') || n.includes('поездк') || n.includes('тур') || n.includes('море')) {
    return <Palmtree size={20} className="text-amber-700" />
  }
  if (n.includes('ремонт') || n.includes('стро')) {
    return <Wrench size={20} className="text-blue-700" />
  }
  if (n.includes('дача') || n.includes('сад')) {
    return <HomeIcon size={20} className="text-emerald-700" />
  }
  return <Users size={20} className="text-sage" />
}

function Groups() {
  const { user, boot, refresh } = useApp()
  const [houses, setHouses] = React.useState<Array<HouseRow>>((boot?.houses as Array<HouseRow>) ?? [])
  const [mode, setMode] = React.useState<'none' | 'create' | 'join'>('none')
  const [name, setName] = React.useState('Семья')
  const [code, setCode] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState<string | null>(null)

  const reload = React.useCallback(async () => {
    const r = await listHouses().catch(() => null)
    setHouses((r as any)?.houses ?? [])
  }, [])

  React.useEffect(() => {
    if (user) reload()
  }, [user, reload])

  // /groups — родитель для /groups/$id.
  const childActive = useRouterState({
    select: (s) =>
      s.matches.some((m) => m.routeId !== '/groups' && (m.routeId || '').startsWith('/groups')),
  })
  if (childActive) return <Outlet />

  async function create(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !name.trim()) return
    setBusy(true)
    setError(null)
    try {
      const r: any = await createHouse({ data: { name: name.trim() } })
      if (r?.error) return setError(r.error)
      haptic(12)
      showInAppNotification({
        title: 'Касса создана!',
        body: `Касса «${name.trim()}» готова к работе`,
        icon: 'users',
      })
      setMode('none')
      await reload()
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function join(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !code.trim()) return
    setBusy(true)
    setError(null)
    try {
      const r: any = await joinHouse({ data: { code: code.trim() } })
      if (r?.error) return setError(r.error)
      haptic(12)
      showInAppNotification({
        title: 'Успешно!',
        body: 'Вы присоединились к кассе',
        icon: 'users',
      })
      setCode('')
      setMode('none')
      await reload()
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function copyCode(e: React.MouseEvent, c: string, id: string, houseName: string) {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(c)
      haptic(10)
      setCopied(id)
      showInAppNotification({
        title: 'Код скопирован',
        body: `Код кассы «${houseName}»: ${c}`,
        icon: 'sparkles',
        duration: 2500,
      })
      setTimeout(() => setCopied(null), 2000)
    } catch {
      /* ignore */
    }
  }

  async function shareCode(e: React.MouseEvent, c: string, houseName: string) {
    e.preventDefault()
    e.stopPropagation()
    haptic(8)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Касса «${houseName}» в Листке`,
          text: `Присоединяйся к семейной кассе «${houseName}» в приложении Листок. Код кассы: ${c}`,
        })
        return
      } catch {
        /* user cancelled */
      }
    }
    // fallback to copy
    copyCode(e, c, '', houseName)
  }

  return (
    <div className="space-y-4 px-4 pb-36 pt-2 sm:px-5">
      {/* Шапка раздела: убран дублирующий верхний баттон, фокус на названии и счетчике */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <Users size={14} className="text-sage" />
            <span>Совместный бюджет</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            Кассы и семья
          </h1>
        </div>

        {houses.length > 0 && (
          <div className="rounded-full border border-rule/80 bg-paper px-3 py-1 text-[12px] font-medium text-muted shadow-xs">
            {houses.length} {plural(houses.length, 'касса', 'кассы', 'касс')}
          </div>
        )}
      </header>

      {/* Быстрые переключатели действий: Создать / Войти по коду */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            haptic(8)
            setMode('create')
          }}
          className="group flex flex-col justify-between rounded-[20px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-sage/40 hover:shadow-md active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-sage/10 text-sage transition-transform group-hover:scale-105">
            <Plus size={20} strokeWidth={2.4} />
          </div>
          <div className="mt-3">
            <span className="text-[14.5px] font-semibold text-ink leading-tight">Создать кассу</span>
            <p className="mt-0.5 text-[11.5px] text-muted">Семья, квартира, отпуск</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            haptic(8)
            setMode('join')
          }}
          className="group flex flex-col justify-between rounded-[20px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-amber-700/40 hover:shadow-md active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-amber-700/10 text-amber-800 transition-transform group-hover:scale-105">
            <KeyRound size={19} strokeWidth={2.2} />
          </div>
          <div className="mt-3">
            <span className="text-[14.5px] font-semibold text-ink leading-tight">Войти по коду</span>
            <p className="mt-0.5 text-[11.5px] text-muted">По коду от близкого</p>
          </div>
        </button>
      </div>

      {/* Сообщение об ошибке */}
      {error ? (
        <div className="rounded-[16px] border border-stamp/30 bg-stamp/10 px-4 py-3 text-[13px] text-stamp">
          {error}
        </div>
      ) : null}

      {/* Список касс пользователя с финансовым пульсом */}
      {houses.length === 0 ? (
        <div className="rounded-[22px] border border-rule/80 bg-paper p-8 text-center shadow-paper">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <Users size={26} />
          </div>
          <p className="t-display mt-3.5 text-[18px] font-semibold text-ink">
            У вас пока нет активных касс
          </p>
          <p className="mx-auto mt-1.5 max-w-[300px] text-[13px] leading-relaxed text-muted">
            Создайте кассу «Семья» или «Квартира», чтобы вместе вести учёт общих расходов, чеков и счетов ЖКХ.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <Button
              size="sm"
              variant="sage"
              onClick={() => {
                haptic(10)
                setMode('create')
              }}
              className="gap-1.5 rounded-[12px] text-[13px]"
            >
              <Plus size={15} /> Создать первую кассу
            </Button>
            <Button
              size="sm"
              variant="paper"
              onClick={() => {
                haptic(10)
                setMode('join')
              }}
              className="rounded-[12px] text-[13px]"
            >
              Войти по коду
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1 text-[12px] font-semibold uppercase tracking-wider text-muted">
            <span>Активные кассы ({houses.length})</span>
            <span>Расходы и код</span>
          </div>

          {houses.map((h, idx) => {
            const isOwner = h.owner_id === user?.id
            const isCopied = copied === h.id
            const totalSpent = Number(h.total_spent || 0)
            const receiptsCount = Number(h.receipts_count || 0)
            const billsCount = Number(h.bills_count || 0)
            const budget = Number(h.monthly_budget || 0)

            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: idx * 0.05 }}
                whileTap={{ scale: 0.985 }}
                className="group relative overflow-hidden rounded-[22px] border border-rule/80 bg-paper shadow-paper transition-all hover:border-sage/40 hover:shadow-md"
              >
                {/* Верхняя часть карточки — клик ведёт в саму кассу */}
                <Link
                  to="/groups/$id"
                  params={{ id: h.id }}
                  className="block p-4 transition-colors hover:bg-black/[0.012] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-sage/10 shadow-xs">
                        {getHouseIcon(h.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="t-display text-[18px] font-semibold leading-tight text-ink">
                            {h.name}
                          </h2>
                          {isOwner ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                              <Crown size={11} /> Создатель
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2 py-0.5 text-[11px] font-medium text-sage">
                              <UserCheck size={11} /> Участник
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[12px] text-muted">
                          <span className="inline-flex items-center gap-1">
                            <Users size={12} className="text-sage" />
                            {h.members} {plural(h.members, 'участник', 'участника', 'участников')}
                          </span>
                          {billsCount > 0 && (
                            <>
                              <span className="text-muted/60">•</span>
                              <span>{billsCount} {plural(billsCount, 'счёт', 'счёта', 'счетов')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                      <ChevronRight size={18} />
                    </div>
                  </div>

                  {/* Финансовый пульс кассы */}
                  <div className="mt-3.5 rounded-[14px] bg-paper-sunken/60 p-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
                          Расходы кассы
                        </div>
                        <div className="t-display t-num mt-0.5 text-[20px] font-semibold leading-none text-ink">
                          {money(totalSpent)}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 rounded-full border border-rule/60 bg-paper px-2 py-0.5 text-[11.5px] font-medium text-muted shadow-xs">
                          <ReceiptText size={12} className="text-sage" />
                          <span>{receiptsCount} {plural(receiptsCount, 'чек', 'чека', 'чеков')}</span>
                        </span>
                      </div>
                    </div>

                    {/* Прогресс бюджета при наличии лимита */}
                    {budget > 0 && (
                      <div className="mt-2.5 border-t border-rule/50 pt-2">
                        {(() => {
                          const pct = Math.min(100, Math.round((totalSpent / budget) * 100))
                          const isOver = totalSpent > budget
                          return (
                            <div>
                              <div className="mb-1 flex items-center justify-between text-[11px] text-muted">
                                <span>Лимит {money(budget)}</span>
                                <span className={isOver ? 'font-semibold text-stamp' : 'font-medium text-sage'}>
                                  {pct}% {isOver ? '(превышен)' : ''}
                                </span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule/50">
                                <div
                                  className={cn('h-full rounded-full transition-all duration-500', isOver ? 'bg-stamp' : 'bg-sage')}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Компактная плашка с кодом приглашения */}
                <div className="flex items-center justify-between border-t border-rule/60 bg-black/[0.015] px-4 py-2.5">
                  <div className="flex items-center gap-2 text-[12px] text-muted">
                    <span>Код кассы:</span>
                    <span className="font-mono text-[13.5px] font-bold tracking-widest text-ink selection:bg-sage/20">
                      {h.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => copyCode(e, h.code, h.id, h.name)}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all active:scale-95',
                        isCopied
                          ? 'bg-sage text-onsage shadow-xs'
                          : 'border border-rule/80 bg-paper text-muted hover:border-sage/40 hover:text-ink',
                      )}
                    >
                      {isCopied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{isCopied ? 'Скопирован' : 'Скопировать код'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => shareCode(e, h.code, h.name)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-rule/80 bg-paper text-muted hover:border-sage/40 hover:text-ink active:scale-95"
                      title="Поделиться кодом"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Информационный блок с безопасным отступом */}
      <div className="flex items-start gap-3.5 rounded-[20px] border border-rule/70 bg-paper/70 p-4 text-[12.5px] leading-relaxed text-muted shadow-xs">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
          <ShieldCheck size={18} />
        </div>
        <div>
          <span className="font-semibold text-ink">Как устроена общая касса?</span>
          <p className="mt-1 text-[12px] leading-snug text-muted">
            Все участники могут сканировать чеки в общий котёл, отслеживать траты семьи и оплачивать счета ЖКХ. Итоговый баланс показывает, кто сколько внёс, без споров и путаницы.
          </p>
        </div>
      </div>

      {/* Шторка создания кассы */}
      <BottomSheet
        open={mode === 'create'}
        onClose={() => setMode('none')}
        title="Новая касса"
      >
        <form onSubmit={create} className="space-y-4 pt-1">
          <div>
            <label className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
              Название кассы
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Семья, Дом, Поездка…"
              startIcon={<Users size={17} />}
              className="h-11 rounded-[12px] bg-white text-[14px]"
              autoFocus
              required
            />
            {/* Быстрые подсказки */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {PRESET_NAMES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setName(preset)
                  }}
                  className={cn(
                    'rounded-full border px-3 py-1 text-[12px] transition active:scale-95',
                    name === preset
                      ? 'border-sage bg-sage text-onsage shadow-xs'
                      : 'border-rule/80 bg-white text-muted hover:border-rule-soft',
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="flex-1 rounded-[12px] text-[13px]"
              onClick={() => setMode('none')}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              className="flex-1 rounded-[12px] text-[13px]"
              disabled={busy || !name.trim()}
            >
              {busy ? 'Создание…' : 'Создать кассу'}
            </Button>
          </div>
        </form>
      </BottomSheet>

      {/* Шторка входа по коду */}
      <BottomSheet
        open={mode === 'join'}
        onClose={() => setMode('none')}
        title="Присоединиться к кассе"
      >
        <form onSubmit={join} className="space-y-4 pt-1">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Код приглашения
              </label>
              <span className="text-[11px] text-muted">7 символов</span>
            </div>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="A2B3C4D"
              autoCapitalize="characters"
              autoComplete="off"
              startIcon={<Hash size={17} />}
              className="h-11 rounded-[12px] bg-white font-mono text-[16px] tracking-[0.2em]"
              autoFocus
              required
            />
            <p className="mt-2 text-[12px] text-muted">
              Введите 7-значный код, которым с вами поделился создатель семейной кассы.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="flex-1 rounded-[12px] text-[13px]"
              onClick={() => setMode('none')}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="sage"
              size="md"
              className="flex-1 rounded-[12px] text-[13px]"
              disabled={busy || !code.trim()}
            >
              {busy ? 'Проверка…' : 'Войти в кассу'}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </div>
  )
}
