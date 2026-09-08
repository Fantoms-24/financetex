import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bot,
  ChevronLeft,
  HelpCircle,
  MessageSquare,
  PieChart,
  Receipt,
  Send,
  Sparkles,
  TrendingDown,
  User,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
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
  const { user, boot } = useApp()
  const [selectedHouseId, setSelectedHouseId] = React.useState<string | null>(
    search.houseId || null,
  )
  const [messages, setMessages] = React.useState<Array<DisplayMsg>>([])
  const [text, setText] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [houseSnap, setHouseSnap] = React.useState<any>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Если URL search param изменился
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

  // Периодическое обновление сообщений кассы (раз в 4 сек)
  React.useEffect(() => {
    if (!selectedHouseId) return
    const interval = setInterval(() => {
      loadMessages()
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedHouseId, loadMessages])

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
          r?.reply || 'Не получилось ответить. Попробуйте сформулировать вопрос иначе.'
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

  const monthlyBudget = boot.settings?.monthly_budget || 0
  const spent = boot.month.spent
  const remaining = monthlyBudget > 0 ? monthlyBudget - spent : null

  // Активная касса
  const activeHouse = boot.houses?.find((h) => h.id === selectedHouseId)
  const quickPrompts = selectedHouseId ? HOUSE_PROMPTS : PERSONAL_PROMPTS

  return (
    <div className="flex min-h-[calc(100svh-max(env(safe-area-inset-top),18px)-88px-env(safe-area-inset-bottom))] flex-col px-4 pt-3 sm:px-5">
      {/* Шапка агента */}
      <header className="sticky top-0 z-20 -mx-4 mb-2 border-b border-rule/60 bg-paper/95 px-4 pb-2.5 pt-1 backdrop-blur-md sm:-mx-5 sm:px-5">
        <div className="flex items-center justify-between">
          {selectedHouseId ? (
            <Link
              to="/groups/$id"
              params={{ id: selectedHouseId }}
              className="flex items-center gap-1 rounded-lg py-1 pr-2 text-[14px] font-medium text-sage hover:text-ink"
            >
              <ChevronLeft size={18} />
              <span>В кассу</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1 rounded-lg py-1 pr-2 text-[14px] font-medium text-sage hover:text-ink"
            >
              <ChevronLeft size={18} />
              <span>Главная</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <Sparkles size={16} />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="text-left">
              <p className="text-[14px] font-semibold leading-none text-ink">
                {selectedHouseId && activeHouse
                  ? `Советник: ${activeHouse.name}`
                  : 'Финансовый советник'}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                {selectedHouseId
                  ? 'Персональный агент кассы'
                  : 'Анализирует чеки и личный бюджет'}
              </p>
            </div>
          </div>

          <div className="w-14 text-right">
            <span className="inline-block rounded-full bg-sage/10 px-2 py-0.5 text-[11px] font-medium text-sage">
              ИИ
            </span>
          </div>
        </div>

        {/* Сегментированный переключатель контекста: Личный ↔ Кассы */}
        {boot.houses && boot.houses.length > 0 && (
          <div className="mt-2.5">
            <div className="relative flex items-center rounded-[14px] border border-rule/80 bg-paper p-1 shadow-xs select-none overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => {
                  haptic()
                  setSelectedHouseId(null)
                }}
                className={cn(
                  'relative z-10 flex min-h-[32px] flex-1 items-center justify-center gap-1.5 rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition-colors whitespace-nowrap',
                  selectedHouseId === null ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                )}
              >
                {selectedHouseId === null ? (
                  <motion.div
                    layoutId="agentModePill"
                    className="absolute inset-0 -z-10 rounded-[10px] bg-sage shadow-xs"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                ) : null}
                <User size={13} />
                <span>Личный</span>
              </button>

              {boot.houses.map((h) => {
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
                      'relative z-10 flex min-h-[32px] flex-1 items-center justify-center gap-1.5 rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition-colors whitespace-nowrap',
                      active ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                    )}
                  >
                    {active ? (
                      <motion.div
                        layoutId="agentModePill"
                        className="absolute inset-0 -z-10 rounded-[10px] bg-sage shadow-xs"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      />
                    ) : null}
                    <Users size={13} />
                    <span className="truncate">{h.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Список сообщений диалога */}
      <div className="flex-1 space-y-3 pb-4 pt-1">
        {/* Приветственная карточка-сводка */}
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-5 shadow-paper">
              <div className="flex items-center gap-2 text-sage">
                <Bot size={22} />
                <span className="t-display text-[17px] font-medium text-ink">
                  {selectedHouseId && activeHouse
                    ? `Советник кассы «${activeHouse.name}»`
                    : 'Рад помочь с вашим бюджетом!'}
                </span>
              </div>

              {selectedHouseId && activeHouse ? (
                <div className="mt-2 text-[13.5px] leading-relaxed text-ink/80 space-y-2">
                  <p>
                    Я персональный финансовый ассистент кассы <strong>«{activeHouse.name}»</strong>.
                    Отслеживаю общие обязательные счета, чеки участников, прогресс по копилкам и справедливое разделение расходов.
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
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">
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

              <div className="mt-4 rounded-xl border border-rule/60 bg-black/[0.015] p-3 text-[12px] text-muted">
                {selectedHouseId
                  ? 'Задайте любой вопрос об общих тратах, балансе долей участников или способах экономии бюджета кассы.'
                  : 'Задайте вопрос о личных покупках, комфортном дневном лимите или способах оптимизировать траты.'}
              </div>
            </div>

            {/* Быстрые вопросы для старта */}
            <div className="space-y-2">
              <p className="px-1 text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                {selectedHouseId ? 'Частые вопросы по кассе:' : 'Частые вопросы:'}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => executeSend(item.prompt)}
                    className="flex items-center justify-between rounded-[16px] border border-rule/80 bg-paper p-3 text-left text-[13px] text-ink shadow-sm transition-all hover:border-sage/40 hover:bg-black/[0.01] active:scale-[0.99]"
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
                  {m.authorName ? (
                    <span className="mb-1 mr-2 text-[10.5px] font-medium text-muted">
                      {m.authorName}
                    </span>
                  ) : null}
                  <div className="max-w-[85%] rounded-[20px] rounded-br-sm bg-sage px-4 py-2.5 text-[14px] leading-relaxed text-onsage shadow-sm">
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                  {m.created_at && (
                    <span className="mt-0.5 px-2 text-[10px] text-muted/70">
                      {timeRu(m.created_at)}
                    </span>
                  )}
                </div>
              )
            }

            return (
              <div key={m.id} className="flex items-start gap-2.5">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage">
                  <Bot size={15} />
                </div>
                <div className="max-w-[88%] rounded-[20px] rounded-tl-sm border border-rule/80 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink shadow-paper">
                  {m.authorName ? (
                    <div className="mb-1 flex items-center justify-between border-b border-rule/40 pb-1">
                      <span className="text-[11px] font-bold text-sage">{m.authorName}</span>
                      {m.created_at ? (
                        <span className="text-[10px] text-muted/70">{timeRu(m.created_at)}</span>
                      ) : null}
                    </div>
                  ) : null}
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            )
          })
        )}

        {/* Индикатор загрузки ответа */}
        {busy ? (
          <div className="flex items-start gap-2.5">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage">
              <Bot size={15} />
            </div>
            <div className="rounded-[18px] rounded-tl-sm border border-rule/80 bg-paper px-4 py-3 shadow-paper">
              <div className="flex items-center gap-2 text-[13px] text-muted">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.4s]" />
                </span>
                <span>
                  {selectedHouseId
                    ? 'Анализирую финансы кассы…'
                    : 'Изучаю ваши чеки…'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {/* Закреплённая панель ввода сообщений */}
      <div className="sticky bottom-0 z-20 -mx-4 border-t border-rule/80 bg-paper/95 px-4 pt-2.5 pb-2 backdrop-blur-md sm:-mx-5 sm:px-5">
        {/* Горизонтальные подсказки, если уже есть сообщения */}
        {messages.length > 0 && !busy && (
          <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-1">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => executeSend(item.prompt)}
                className="shrink-0 rounded-full border border-rule/80 bg-paper px-3 py-1 text-[11.5px] text-muted transition-all hover:border-sage/40 hover:text-ink active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              selectedHouseId && activeHouse
                ? `Спросить советника «${activeHouse.name}»…`
                : 'Спросить про траты, чеки, бюджет…'
            }
            startIcon={<MessageSquare size={17} />}
            disabled={busy}
          />
          <Button
            type="submit"
            variant="sage"
            size="icon"
            disabled={busy || !text.trim()}
            className="shrink-0"
            aria-label="Отправить вопрос"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  )
}

