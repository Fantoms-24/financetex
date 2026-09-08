import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowUpRight,
  Bot,
  Check,
  CheckCheck,
  ChevronLeft,
  MessageSquare,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useApp } from '~/lib/app-state'
import { money, timeRu } from '~/lib/format'
import { agentHistory, agentSend } from '~/server/functions/agent'
import { askHouseAgent, getHouse } from '~/server/functions/houses'
import { cn } from '~/lib/utils'

interface AgentSearchParams {
  houseId?: string
}

export const Route = createFileRoute('/agent')({
  validateSearch: (search: Record<string, unknown>): AgentSearchParams => ({
    houseId: typeof search.houseId === 'string' ? search.houseId : undefined,
  }),
  component: Agent,
})

interface DisplayMsg {
  id: string
  role: 'user' | 'assistant'
  text: string
  created_at: string
  authorName?: string
}

const PERSONAL_PROMPTS = [
  { label: 'Итоги месяца', prompt: 'Сколько потрачено в этом месяце?' },
  { label: 'Топ категорий', prompt: 'На какую категорию больше всего трат?' },
  { label: 'Дневной лимит', prompt: 'Какой комфортный бюджет на день?' },
  { label: 'Крупные покупки', prompt: 'Какие были самые крупные покупки?' },
]

const HOUSE_PROMPTS = [
  { label: '📊 Итоги кассы', prompt: 'Подведи финансовые итоги кассы за этот месяц' },
  { label: '💡 Где сэкономить?', prompt: 'Подскажи, где семья может оптимизировать расходы' },
  { label: '🎯 Цели и копилки', prompt: 'Оцени текущий прогресс по общим целям и копилкам и дай советы' },
  { label: '👥 Баланс долей', prompt: 'Кто сколько внёс и какой баланс долей между участниками?' },
]

function haptic() {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(8)
    }
  } catch {}
}

function Agent() {
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { user, boot } = useApp()
  const [selectedHouseId, setSelectedHouseId] = React.useState<string | null>(
    search.houseId || null,
  )
  const [messages, setMessages] = React.useState<Array<DisplayMsg>>([])
  const [text, setText] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [houseSnap, setHouseSnap] = React.useState<any>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Устраняем возможные дубликаты касс
  const uniqueHouses = React.useMemo(() => {
    const map = new Map<string, { id: string; name: string }>()
    for (const h of boot.houses ?? []) {
      if (h && h.id && !map.has(h.id)) {
        map.set(h.id, h)
      }
    }
    return Array.from(map.values())
  }, [boot.houses])

  // Синхронизация с URL query
  React.useEffect(() => {
    if (search.houseId) {
      setSelectedHouseId(search.houseId)
    }
  }, [search.houseId])

  // Загрузка сообщений в зависимости от режима: Личный ↔ Касса
  const loadMessages = React.useCallback(async () => {
    if (!user) return
    if (!selectedHouseId) {
      // Личный режим
      setHouseSnap(null)
      try {
        const r: any = await agentHistory().catch(() => null)
        const raw = r?.messages ?? []
        setMessages(
          raw.map((m: any) => ({
            id: m.id,
            role: m.role,
            text: m.text,
            created_at: m.created_at,
          })),
        )
      } catch {}
    } else {
      // Режим кассы
      try {
        const r: any = await getHouse({ data: { houseId: selectedHouseId } }).catch(() => null)
        if (r && !r.error) {
          setHouseSnap(r)
          const raw = r.messages ?? []
          setMessages(
            raw.map((m: any) => {
              const isAgent = m.is_agent || m.user_id === 'agent'
              const isMe = m.user_id === user.id
              return {
                id: m.id,
                role: isAgent ? 'assistant' : 'user',
                text: m.text,
                created_at: m.created_at,
                authorName: isAgent
                  ? 'Листок · Советник'
                  : isMe
                  ? undefined
                  : m.name || 'Участник',
              }
            }),
          )
        }
      } catch {}
    }
  }, [user, selectedHouseId])

  React.useEffect(() => {
    setMessages([])
    loadMessages()
  }, [loadMessages])

  // Авто-обновление чата кассы
  React.useEffect(() => {
    if (!selectedHouseId) return
    const interval = setInterval(() => {
      loadMessages()
    }, 4500)
    return () => clearInterval(interval)
  }, [selectedHouseId, loadMessages])

  // Плавный скролл к последнему сообщению
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, busy])

  async function executeSend(queryText: string) {
    if (!queryText.trim() || busy) return
    const mine = queryText.trim()
    setText('')
    setBusy(true)

    // Оптимистичное добавление сообщения
    const tempId = `t-${Date.now()}`
    setMessages((m) => [
      ...m,
      { id: tempId, role: 'user', text: mine, created_at: new Date().toISOString() },
    ])

    try {
      if (selectedHouseId) {
        // Запрос к советнику кассы
        const r: any = await askHouseAgent({
          data: { houseId: selectedHouseId, prompt: mine },
        })
        if (r?.reply) {
          setMessages((m) => [
            ...m,
            {
              id: `a-${Date.now()}`,
              role: 'assistant',
              text: r.reply,
              created_at: new Date().toISOString(),
              authorName: 'Листок · Советник',
            },
          ])
        }
        await loadMessages()
      } else {
        // Запрос к личному советнику
        const r: any = await agentSend({ data: { text: mine } })
        const reply =
          r?.reply || 'Не получилось сформировать ответ. Попробуйте уточнить вопрос.'
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: reply,
            created_at: new Date().toISOString(),
          },
        ])
      }
    } finally {
      setBusy(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    executeSend(text)
  }

  const onBack = () => {
    haptic()
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    } else {
      navigate({ to: '/' })
    }
  }

  const monthlyBudget = boot.settings?.monthly_budget || 0
  const spent = boot.month.spent
  const remaining = monthlyBudget > 0 ? monthlyBudget - spent : null

  const activeHouse = uniqueHouses.find((h) => h.id === selectedHouseId)
  const quickPrompts = selectedHouseId ? HOUSE_PROMPTS : PERSONAL_PROMPTS

  return (
    <div className="flex h-full flex-1 flex-col min-h-0 overflow-hidden bg-cream">
      {/* Шапка чата в стиле Telegram / iOS Messages */}
      <header className="sticky top-0 z-30 shrink-0 border-b border-rule/70 bg-paper/95 px-3 sm:px-4 pb-2.5 pt-1.5 backdrop-blur-xl shadow-[0_1px_8px_rgba(28,25,21,0.03)]">
        <div className="flex items-center justify-between gap-2">
          {/* Кнопка назад */}
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 rounded-xl py-1.5 pr-2 -ml-1 text-sage hover:bg-black/5 active:scale-95 transition-all"
            aria-label="Вернуться назад"
          >
            <ChevronLeft size={22} />
            <span className="text-[13.5px] font-medium hidden sm:inline">Назад</span>
          </button>

          {/* Инфо советника по центру */}
          <div className="flex items-center gap-2 text-center min-w-0 flex-1 justify-center">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-sage text-onsage shadow-xs">
              <Bot size={17} />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-paper" />
              </span>
            </div>
            <div className="text-left min-w-0">
              <p className="t-display text-[14.5px] font-semibold leading-tight text-ink truncate">
                {selectedHouseId && activeHouse ? activeHouse.name : 'Финансовый советник'}
              </p>
              <p className="flex items-center gap-1 text-[11px] font-medium text-sage">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>ИИ • На связи</span>
              </p>
            </div>
          </div>

          {/* Метка режима */}
          <div className="w-10 text-right">
            <span className="inline-block rounded-full bg-sage/12 px-2 py-0.5 text-[10.5px] font-bold text-sage">
              ИИ
            </span>
          </div>
        </div>

        {/* Выбор режима галочкой: Личный подсчёт ↔ Семья (без дубликатов и вкладок) */}
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5 select-none">
          {/* Личный подсчёт */}
          <button
            type="button"
            onClick={() => {
              haptic()
              setSelectedHouseId(null)
            }}
            className={cn(
              'group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-150 active:scale-[0.97]',
              selectedHouseId === null
                ? 'bg-sage text-onsage shadow-xs'
                : 'border border-rule/80 bg-paper/90 text-muted hover:border-sage/40 hover:text-ink',
            )}
          >
            <div
              className={cn(
                'flex h-4 w-4 items-center justify-center rounded-full transition-all',
                selectedHouseId === null
                  ? 'bg-white/25 text-onsage'
                  : 'border border-rule text-transparent',
              )}
            >
              <Check
                size={11}
                strokeWidth={3}
                className={selectedHouseId === null ? 'opacity-100' : 'opacity-0'}
              />
            </div>
            <span>Личный подсчёт</span>
          </button>

          {/* Кассы (Семья и другие без дубликатов) */}
          {uniqueHouses.map((h) => {
            const active = selectedHouseId === h.id
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  haptic()
                  setSelectedHouseId(h.id)
                }}
                className={cn(
                  'group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-150 active:scale-[0.97]',
                  active
                    ? 'bg-sage text-onsage shadow-xs'
                    : 'border border-rule/80 bg-paper/90 text-muted hover:border-sage/40 hover:text-ink',
                )}
              >
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full transition-all',
                    active
                      ? 'bg-white/25 text-onsage'
                      : 'border border-rule text-transparent',
                  )}
                >
                  <Check
                    size={11}
                    strokeWidth={3}
                    className={active ? 'opacity-100' : 'opacity-0'}
                  />
                </div>
                <span className="truncate max-w-[130px]">{h.name}</span>
              </button>
            )
          })}
        </div>
      </header>

      {/* Основная лента сообщений диалога */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
        {/* Приветственный экран, если в данном режиме ещё нет сообщений */}
        {messages.length === 0 ? (
          <div className="space-y-3 pt-1">
            <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 sm:p-5 shadow-paper">
              <div className="flex items-center gap-2 text-sage">
                <Sparkles size={20} />
                <h2 className="t-display text-[16px] font-semibold text-ink">
                  {selectedHouseId && activeHouse
                    ? `Советник кассы «${activeHouse.name}»`
                    : 'Рад помочь с вашим бюджетом!'}
                </h2>
              </div>

              {selectedHouseId && activeHouse ? (
                <div className="mt-2 text-[13px] leading-relaxed text-ink/80 space-y-2">
                  <p>
                    Я персональный финансовый ассистент кассы <strong>«{activeHouse.name}»</strong>.
                    Отслеживаю общие обязательные платежи, чеки участников, прогресс по копилкам и баланс долей.
                  </p>
                  {houseSnap?.analytics && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="rounded-lg bg-cream px-2.5 py-1 text-[11.5px] font-medium text-ink">
                        Потрачено в кассе: <strong className="t-num font-semibold">{money(houseSnap.analytics.totalSpent || 0)}</strong>
                      </span>
                      {houseSnap.members && (
                        <span className="rounded-lg bg-cream px-2.5 py-1 text-[11.5px] font-medium text-muted">
                          Участников: {houseSnap.members.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-[13px] leading-relaxed text-ink/80">
                  Я изучил ваши личные чеки и расходы. В этом месяце потрачено{' '}
                  <strong className="text-ink font-semibold">{money(spent)}</strong>
                  {monthlyBudget > 0 ? (
                    <>
                      {' '}из лимита в{' '}
                      <strong className="text-ink font-semibold">{money(monthlyBudget)}</strong>.
                      {remaining !== null && (
                        <span className={remaining >= 0 ? ' text-sage' : ' text-stamp'}>
                          {' '}(остаток: {money(remaining)})
                        </span>
                      )}
                    </>
                  ) : (
                    '.'
                  )}
                </p>
              )}

              <div className="mt-3.5 rounded-xl border border-rule/60 bg-black/[0.015] p-2.5 text-[11.5px] text-muted leading-relaxed">
                {selectedHouseId
                  ? 'Задайте любой вопрос об общих тратах кассы, балансе долей участников или способах оптимизации.'
                  : 'Задайте вопрос о личных покупках, дневном лимите или категориях расходов.'}
              </div>
            </div>

            {/* Быстрые вопросы для моментального старта */}
            <div className="space-y-2">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {selectedHouseId ? 'Частые вопросы по кассе:' : 'Частые вопросы:'}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => executeSend(item.prompt)}
                    className="flex items-center justify-between rounded-[16px] border border-rule/80 bg-paper p-3 text-left text-[13px] text-ink shadow-xs transition-all hover:border-sage/40 active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-sage" />
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-muted" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.role === 'user'

            if (isUser) {
              return (
                <div key={m.id} className="flex flex-col items-end">
                  <div className="max-w-[84%] rounded-[20px] rounded-br-[5px] bg-sage px-4 py-2.5 text-[13.5px] leading-relaxed text-onsage shadow-xs">
                    <p className="whitespace-pre-wrap select-text">{m.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-onsage/75">
                      <span>{timeRu(m.created_at)}</span>
                      <CheckCheck size={13} className="text-onsage/90" />
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div key={m.id} className="flex items-start gap-2">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage shadow-xs">
                  <Bot size={15} />
                </div>
                <div className="max-w-[88%] rounded-[20px] rounded-tl-[5px] border border-rule/80 bg-paper px-4 py-3 text-[13.5px] leading-relaxed text-ink shadow-paper">
                  {m.authorName ? (
                    <div className="mb-1 flex items-center justify-between border-b border-rule/40 pb-1">
                      <span className="text-[11px] font-semibold text-sage">{m.authorName}</span>
                    </div>
                  ) : null}
                  <p className="whitespace-pre-wrap select-text">{m.text}</p>
                  <div className="mt-1 flex items-center justify-end text-[10px] text-muted/65">
                    <span>{timeRu(m.created_at)}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Анимированный индикатор набора ответа */}
        {busy ? (
          <div className="flex items-start gap-2">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage">
              <Bot size={15} />
            </div>
            <div className="rounded-[18px] rounded-tl-[5px] border border-rule/80 bg-paper px-4 py-2.5 shadow-paper">
              <div className="flex items-center gap-2 text-[12.5px] text-muted">
                <span className="flex gap-1 py-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.18s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.36s]" />
                </span>
                <span>
                  {selectedHouseId ? 'Советник анализирует кассу…' : 'Советник изучает ваши чеки…'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {/* Закреплённая строка ввода сообщений в стиле Telegram / Messages */}
      <div className="sticky bottom-0 z-30 shrink-0 border-t border-rule/70 bg-paper/95 backdrop-blur-2xl px-3 sm:px-4 pt-2 pb-[max(env(safe-area-inset-bottom),14px)] shadow-[0_-4px_24px_rgba(28,25,21,0.04)]">
        {/* Горизонтальные подсказки, если в чате уже идёт переписка */}
        {messages.length > 0 && !busy && (
          <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-0.5">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => executeSend(item.prompt)}
                className="shrink-0 rounded-full border border-rule/80 bg-paper px-3 py-1 text-[11.5px] font-medium text-muted transition-all hover:border-sage/40 hover:text-ink active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                selectedHouseId && activeHouse
                  ? `Спросить о расходах «${activeHouse.name}»…`
                  : 'Спросить о личных тратах, чеках…'
              }
              disabled={busy}
              className="w-full rounded-full border border-rule/80 bg-cream/50 px-4 py-2.5 text-[14px] text-ink placeholder:text-muted/60 focus:border-sage focus:bg-paper focus:outline-none focus:ring-1 focus:ring-sage transition-all"
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.92 }}
            disabled={busy || !text.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-onsage shadow-sm transition-all disabled:opacity-40 disabled:scale-100"
            aria-label="Отправить вопрос"
          >
            <Send size={16} />
          </motion.button>
        </form>
      </div>
    </div>
  )
}

