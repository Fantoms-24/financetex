import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  CheckCheck,
  ChevronLeft,
  Copy,
  MessageSquare,
  PiggyBank,
  ReceiptText,
  RotateCcw,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useApp } from '~/lib/app-state'
import { money, timeRu } from '~/lib/format'
import { agentClear, agentHistory, agentSend } from '~/server/functions/agent'
import { askHouseAgent, getHouse } from '~/server/functions/houses'
import { cn, haptic } from '~/lib/utils'
import { showInAppNotification } from '~/components/NotificationBanner'

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
  { label: 'Итоги месяца', prompt: 'Сколько потрачено в этом месяце и как мы идём по бюджету?', icon: TrendingUp },
  { label: 'Топ категорий', prompt: 'На какую категорию уходит больше всего денег?', icon: ReceiptText },
  { label: 'Дневной лимит', prompt: 'Какой комфортный бюджет на день до конца месяца?', icon: Wallet },
  { label: 'Крупные траты', prompt: 'Какие были самые крупные покупки в этом месяце?', icon: TrendingDown },
]

const HOUSE_PROMPTS = [
  { label: 'Итоги бюджета', prompt: 'Подведи финансовые итоги общего бюджета за этот месяц', icon: TrendingUp },
  { label: 'Где сэкономить?', prompt: 'Подскажи, где семья может оптимизировать расходы?', icon: Sparkles },
  { label: 'Цели и копилки', prompt: 'Оцени текущий прогресс по общим целям и копилкам', icon: PiggyBank },
  { label: 'Баланс долей', prompt: 'Кто сколько внёс и какой сейчас баланс долей между участниками?', icon: Users },
]

/**
 * Умный рендерер текста сообщений ассистента с акцентом на финансовые данные
 */
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split('\n')

  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed select-text">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />
        }

        const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')
        const content = isBullet ? trimmed.slice(2) : trimmed

        // Парсинг жирного текста **текст**
        const parts = content.split(/(\*\*[^*]+\*\*)/g)

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2)
            return (
              <strong key={pIdx} className="font-semibold text-ink">
                {boldText}
              </strong>
            )
          }

          // Подсветка денежных сумм
          const moneyRegex = /(\d[\d\s]*\s?₽)/g
          const moneyParts = part.split(moneyRegex)

          return moneyParts.map((sub, sIdx) => {
            if (moneyRegex.test(sub)) {
              return (
                <span key={sIdx} className="t-num font-semibold text-ink">
                  {sub}
                </span>
              )
            }
            return <React.Fragment key={sIdx}>{sub}</React.Fragment>
          })
        })

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              <span className="flex-1">{renderedLine}</span>
            </div>
          )
        }

        return <p key={lineIdx}>{renderedLine}</p>
      })}
    </div>
  )
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
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [houseSnap, setHouseSnap] = React.useState<any>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Устраняем возможные дубликаты групп
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

  // Автоматическое изменение высоты textarea
  const adjustHeight = React.useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const nextH = Math.min(el.scrollHeight, 110)
    el.style.height = `${Math.max(nextH, 40)}px`
  }, [])

  React.useEffect(() => {
    adjustHeight()
  }, [text, adjustHeight])

  // Загрузка сообщений
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
      // Режим совместного бюджета
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

  // Авто-обновление чата общего бюджета
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
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
    }
    setBusy(true)
    haptic(10)

    // Оптимистичное добавление сообщения
    const tempId = `t-${Date.now()}`
    setMessages((m) => [
      ...m,
      { id: tempId, role: 'user', text: mine, created_at: new Date().toISOString() },
    ])

    try {
      if (selectedHouseId) {
        // Запрос к советнику общего бюджета
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      executeSend(text)
    }
  }

  const onBack = () => {
    haptic(8)
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    } else {
      navigate({ to: '/' })
    }
  }

  const copyMessage = async (msgId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      haptic(10)
      setCopiedId(msgId)
      showInAppNotification({
        title: 'Скопировано',
        body: 'Ответ скопирован в буфер обмена',
        icon: 'sparkles',
        duration: 2000,
      })
      setTimeout(() => setCopiedId(null), 2000)
    } catch {}
  }

  const clearHistory = async () => {
    if (!confirm('Очистить историю диалога с ассистентом?')) return
    haptic(10)
    await agentClear()
    setMessages([])
    showInAppNotification({
      title: 'История очищена',
      body: 'Диалог начат с чистого листа',
      icon: 'sparkles',
    })
  }

  const monthlyBudget = boot.settings?.monthly_budget || 0
  const spent = boot.month.spent
  const remaining = monthlyBudget > 0 ? monthlyBudget - spent : null

  const activeHouse = uniqueHouses.find((h) => h.id === selectedHouseId)
  const quickPrompts = selectedHouseId ? HOUSE_PROMPTS : PERSONAL_PROMPTS

  return (
    <div className="flex h-full flex-1 flex-col min-h-0 overflow-hidden bg-cream">
      {/* 1. Верхняя панель в стиле нативного мессенджера */}
      <header className="sticky top-0 z-30 shrink-0 border-b border-rule/70 bg-paper/95 px-3 sm:px-4 pb-2 pt-1.5 backdrop-blur-xl shadow-xs">
        <div className="flex items-center justify-between gap-2">
          {/* Кнопка назад с комфортным тач-таргетом 44×44pt */}
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center -ml-1 rounded-xl text-ink hover:bg-black/5 active:scale-95 transition-all"
            aria-label="Вернуться назад"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Инфо советника по центру */}
          <div className="flex items-center gap-2 text-center min-w-0 flex-1 justify-center">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage text-onsage shadow-xs">
              <Bot size={17} />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-paper" />
              </span>
            </div>
            <div className="text-left min-w-0">
              <p className="t-display text-[14.5px] font-semibold leading-tight text-ink truncate">
                {selectedHouseId && activeHouse ? `Советник · «${activeHouse.name}»` : 'Листок'}
              </p>
              <p className="flex items-center gap-1 text-[11px] font-medium text-muted leading-tight">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Финансовый ассистент</span>
              </p>
            </div>
          </div>

          {/* Кнопка очистки диалога */}
          {!selectedHouseId && messages.length > 0 ? (
            <button
              type="button"
              onClick={clearHistory}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-stamp hover:bg-black/5 active:scale-95 transition-all"
              title="Очистить диалог"
              aria-label="Очистить историю"
            >
              <Trash2 size={16} />
            </button>
          ) : (
            <div className="w-10 text-right">
              <span className="inline-block rounded-full bg-sage/12 px-2 py-0.5 text-[10.5px] font-bold text-sage">
                ИИ
              </span>
            </div>
          )}
        </div>

        {/* 2. Компактный скользящий переключатель контекста: Личный ↔ Вместе */}
        <div className="mt-2 flex items-center justify-center">
          <div className="relative flex max-w-full items-center rounded-full border border-rule/80 bg-paper-sunken/80 p-1 select-none overflow-x-auto no-scrollbar">
            {/* Личный подсчёт */}
            <button
              type="button"
              onClick={() => {
                haptic(6)
                setSelectedHouseId(null)
              }}
              className={cn(
                'relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors duration-150 whitespace-nowrap',
                selectedHouseId === null ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
              )}
            >
              {selectedHouseId === null ? (
                <motion.div
                  layoutId="agentContextPill"
                  className="absolute inset-0 -z-10 rounded-full bg-sage shadow-xs"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              ) : null}
              <Wallet size={12} />
              <span>Личный</span>
            </button>

            {/* Группы Вместе (без дубликатов) */}
            {uniqueHouses.map((h) => {
              const active = selectedHouseId === h.id
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setSelectedHouseId(h.id)
                  }}
                  className={cn(
                    'relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors duration-150 whitespace-nowrap',
                    active ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                  )}
                >
                  {active ? (
                    <motion.div
                      layoutId="agentContextPill"
                      className="absolute inset-0 -z-10 rounded-full bg-sage shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <Users size={12} />
                  <span className="truncate max-w-[120px]">{h.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* 3. Основная лента сообщений диалога */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
        {/* Приветственный экран с живым финансовым пульсом */}
        {messages.length === 0 ? (
          <div className="space-y-3.5 pt-1">
            {/* Hero-карточка финансового контекста */}
            <div className="overflow-hidden rounded-[22px] border border-rule/80 bg-paper p-4 sm:p-5 shadow-paper">
              <div className="flex items-center gap-2 text-sage">
                <Sparkles size={19} />
                <h2 className="t-display text-[16.5px] font-semibold text-ink">
                  {selectedHouseId && activeHouse
                    ? `Советник бюджета «${activeHouse.name}»`
                    : 'Ваш финансовый ассистент'}
                </h2>
              </div>

              <p className="mt-1.5 text-[12.5px] text-muted leading-relaxed">
                {selectedHouseId && activeHouse
                  ? 'Анализирую общие расходы, баланс долей участников и регулярные счета семьи.'
                  : 'Изучаю чеки, категории трат и помогаю контролировать бюджет месяца.'}
              </p>

              {/* 3 живых инсайт-чипа с данными */}
              <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-rule/50 pt-3">
                {selectedHouseId && houseSnap ? (
                  <>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Траты семьи</span>
                      <span className="t-num text-[13.5px] font-bold text-ink">
                        {money(houseSnap.analytics?.totalSpent || 0)}
                      </span>
                    </div>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Счетов ЖКХ</span>
                      <span className="t-num text-[13.5px] font-bold text-ink">
                        {houseSnap.bills?.length || 0}
                      </span>
                    </div>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Участников</span>
                      <span className="t-num text-[13.5px] font-bold text-sage">
                        {houseSnap.members?.length || 0}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Траты месяца</span>
                      <span className="t-num text-[13.5px] font-bold text-ink">
                        {money(spent)}
                      </span>
                    </div>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Норма в день</span>
                      <span className="t-num text-[13.5px] font-bold text-sage">
                        ~{money(remaining ? Math.max(0, Math.round(remaining / 22)) : Math.round(spent / 8))}
                      </span>
                    </div>
                    <div className="rounded-[12px] bg-paper-sunken/60 p-2 text-center">
                      <span className="block text-[10px] uppercase font-medium text-muted">Лимит</span>
                      <span className="t-num text-[13.5px] font-bold text-ink">
                        {monthlyBudget > 0 ? money(monthlyBudget) : '—'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Быстрые вопросы в аккуратной сетке 2×2 */}
            <div className="space-y-2">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {selectedHouseId ? 'Частые вопросы по бюджету:' : 'С чего начать:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => executeSend(item.prompt)}
                      className="group flex flex-col justify-between rounded-[16px] border border-rule/80 bg-paper p-3 text-left shadow-xs transition-all hover:border-sage/40 hover:shadow-sm active:scale-[0.98]"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/10 text-sage transition-transform group-hover:scale-105">
                        <Icon size={14} />
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[12.5px] font-semibold text-ink leading-tight">
                          {item.label}
                        </span>
                        <ArrowUpRight size={13} className="text-muted group-hover:text-sage transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.role === 'user'
            const isCopied = copiedId === m.id

            if (isUser) {
              return (
                <div key={m.id} className="flex flex-col items-end">
                  <div className="max-w-[84%] rounded-[20px] rounded-br-[4px] bg-sage px-4 py-2.5 text-[13.5px] leading-relaxed text-onsage shadow-xs">
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
              <div key={m.id} className="group flex items-start gap-2">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage shadow-xs">
                  <Bot size={15} />
                </div>
                <div className="relative max-w-[88%] rounded-[20px] rounded-tl-[4px] border border-rule/80 bg-paper px-4 py-3 shadow-paper">
                  {m.authorName ? (
                    <div className="mb-1.5 flex items-center justify-between border-b border-rule/40 pb-1">
                      <span className="text-[11px] font-semibold text-sage">{m.authorName}</span>
                      <button
                        type="button"
                        onClick={() => copyMessage(m.id, m.text)}
                        className="text-muted hover:text-ink transition-colors opacity-70 hover:opacity-100"
                        title="Скопировать ответ"
                      >
                        {isCopied ? <Check size={12} className="text-sage" /> : <Copy size={12} />}
                      </button>
                    </div>
                  ) : (
                    <div className="mb-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => copyMessage(m.id, m.text)}
                        className="text-muted hover:text-ink transition-colors opacity-70 hover:opacity-100"
                        title="Скопировать ответ"
                      >
                        {isCopied ? <Check size={12} className="text-sage" /> : <Copy size={12} />}
                      </button>
                    </div>
                  )}

                  <FormattedMessageText text={m.text} />

                  <div className="mt-1.5 flex items-center justify-end text-[10px] text-muted/65">
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
            <div className="rounded-[18px] rounded-tl-[4px] border border-rule/80 bg-paper px-4 py-2.5 shadow-paper">
              <div className="flex items-center gap-2 text-[12.5px] text-muted">
                <span className="flex gap-1 py-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.18s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0.36s]" />
                </span>
                <span>
                  {selectedHouseId ? 'Советник изучает расходы семьи…' : 'Листок изучает ваши чеки…'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {/* 4. Закреплённая строка ввода сообщений (Composer) */}
      <div className="sticky bottom-0 z-30 shrink-0 border-t border-rule/70 bg-paper/95 backdrop-blur-2xl px-3 sm:px-4 pt-2 pb-[max(env(safe-area-inset-bottom),14px)] shadow-[0_-4px_24px_rgba(28,25,21,0.04)]">
        {/* Горизонтальные подсказки во время активного диалога */}
        {messages.length > 0 && !busy && (
          <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-0.5">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => executeSend(item.prompt)}
                className="shrink-0 rounded-full border border-rule/80 bg-paper px-3 py-1 text-[11.5px] font-medium text-muted transition-all hover:border-sage/40 hover:text-ink active:scale-95 shadow-xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); executeSend(text) }} className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={
                selectedHouseId && activeHouse
                  ? `Спросить о расходах «${activeHouse.name}»…`
                  : 'Спросить о покупках, лимитах, чеках…'
              }
              disabled={busy}
              className="w-full resize-none rounded-[18px] border border-rule/80 bg-cream/50 px-4 py-2.5 text-[14px] text-ink placeholder:text-muted/60 focus:border-sage focus:bg-paper focus:outline-none focus:ring-1 focus:ring-sage transition-all leading-snug"
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={busy || !text.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-onsage shadow-sm transition-all disabled:opacity-35 disabled:scale-100 mb-0.5"
            aria-label="Отправить вопрос"
          >
            <ArrowUp size={18} strokeWidth={2.4} />
          </motion.button>
        </form>
      </div>
    </div>
  )
}
