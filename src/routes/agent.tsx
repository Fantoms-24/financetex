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
  Wallet,
  Zap,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { money } from '~/lib/format'
import { agentHistory, agentSend } from '~/server/functions/agent'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/agent')({
  component: Agent,
})

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
  created_at: string
}

const QUICK_PROMPTS = [
  'Сколько потрачено в этом месяце?',
  'На какую категорию больше всего трат?',
  'Какой комфортный бюджет на день?',
  'Какие были самые крупные покупки?',
]

function Agent() {
  const { user, boot } = useApp()
  const [messages, setMessages] = React.useState<Array<Msg>>([])
  const [text, setText] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!user) return
    agentHistory()
      .then((r) => setMessages((r as any)?.messages ?? []))
      .catch(() => {})
  }, [user])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, busy])

  async function executeSend(queryText: string) {
    if (!queryText.trim() || busy) return
    const mine = queryText.trim()
    setText('')
    setBusy(true)
    setMessages((m) => [...m, { id: `t-${Date.now()}`, role: 'user', text: mine, created_at: '' }])
    try {
      const r: any = await agentSend({ data: { text: mine } })
      const reply = r?.reply || 'Не получилось ответить. Попробуйте сформулировать вопрос иначе.'
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: 'assistant', text: reply, created_at: '' },
      ])
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

  return (
    <div className="flex min-h-[calc(100svh-max(env(safe-area-inset-top),18px)-88px-env(safe-area-inset-bottom))] flex-col px-4 pt-3 sm:px-5">
      {/* Шапка агента */}
      <header className="sticky top-0 z-20 -mx-4 mb-3 border-b border-rule/60 bg-paper/95 px-4 pb-3 pt-1 backdrop-blur-md sm:-mx-5 sm:px-5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 rounded-lg py-1 pr-2 text-[14px] font-medium text-sage hover:text-ink"
          >
            <ChevronLeft size={18} />
            <span>Главная</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <Sparkles size={16} />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="text-left">
              <p className="text-[14px] font-semibold leading-none text-ink">Финансовый советник</p>
              <p className="mt-0.5 text-[11px] text-muted">Анализирует чеки и бюджет</p>
            </div>
          </div>

          <div className="w-16 text-right">
            <span className="inline-block rounded-full bg-sage/10 px-2 py-0.5 text-[11px] font-medium text-sage">
              AI
            </span>
          </div>
        </div>
      </header>

      {/* Список сообщений диалога */}
      <div className="flex-1 space-y-3 pb-4">
        {/* Приветственная карточка-сводка */}
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-5 shadow-paper">
              <div className="flex items-center gap-2 text-sage">
                <Bot size={22} />
                <span className="t-display text-[17px] font-medium text-ink">
                  Рад помочь с вашим бюджетом!
                </span>
              </div>

              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">
                Я изучил ваши чеки и кассы. В этом месяце потрачено{' '}
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
                {boot.houses.length > 0 ? (
                  <> В кассе «{boot.houses[0].name}» также отслеживаю общие расходы.</>
                ) : null}
              </p>

              <div className="mt-4 rounded-xl border border-rule/60 bg-black/[0.015] p-3 text-[12px] text-muted">
                Задайте любой вопрос о покупках, комфортном дневном лимите или способах экономии.
              </div>
            </div>

            {/* Быстрые вопросы для старта */}
            <div className="space-y-2">
              <p className="px-1 text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                Частые вопросы:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => executeSend(prompt)}
                    className="flex items-center justify-between rounded-[16px] border border-rule/80 bg-paper p-3 text-left text-[13px] text-ink shadow-sm transition-all hover:border-sage/40 hover:bg-black/[0.01] active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-sage" />
                      {prompt}
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
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-[20px] rounded-br-sm bg-sage px-4 py-2.5 text-[14px] leading-relaxed text-onsage shadow-sm">
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              )
            }

            return (
              <div key={m.id} className="flex items-start gap-2.5">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage">
                  <Bot size={15} />
                </div>
                <div className="max-w-[88%] rounded-[20px] rounded-tl-sm border border-rule/80 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink shadow-paper">
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
                <span>Изучаю ваши чеки…</span>
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
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => executeSend(prompt)}
                className="shrink-0 rounded-full border border-rule/80 bg-paper px-3 py-1 text-[11.5px] text-muted transition-all hover:border-sage/40 hover:text-ink active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Спросить про траты, чеки, бюджет…"
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

