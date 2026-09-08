import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, Send } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { agentHistory, agentSend } from '~/server/functions/agent'

export const Route = createFileRoute('/agent')({
  component: Agent,
})

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
  created_at: string
}

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

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || busy) return
    const mine = text.trim()
    setText('')
    setBusy(true)
    setMessages((m) => [...m, { id: `t-${Date.now()}`, role: 'user', text: mine, created_at: '' }])
    try {
      const r: any = await agentSend({ data: { text: mine } })
      const reply = r?.reply || 'Не получилось ответить'
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: reply, created_at: '' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-[100svh] flex-col">
      <header className="safe-top flex items-center gap-2 px-3 pb-2 pt-3">
        <Link to="/" className="flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage">
          <ChevronLeft size={19} /> Меню
        </Link>
        <div className="flex-1 text-center">
          <p className="t-display text-[17px] leading-none">Агент</p>
        </div>
        <span className="w-[64px]" />
      </header>

      <div className="flex-1 space-y-3 px-4 pb-3">
        {messages.length === 0 ? (
          <div className="letter px-5 py-7">
            <p className="t-display mb-2 text-[17px]">Письмо от финансиста</p>
            <p className="text-[14px] leading-relaxed">
              За месяц потрачено {boot.month.spent.toLocaleString('ru-RU')} ₽
              {boot.settings.monthly_budget
                ? ` из ${boot.settings.monthly_budget.toLocaleString('ru-RU')} ₽.`
                : '.'}
              {boot.houses.length ? ` В кассе «${boot.houses[0].name}» считаю доли.` : ''}
              <br />
              <br />
              Спросите что угодно по вашим чекам и кассам — отвечу коротко.
            </p>
          </div>
        ) : (
          messages.map((m) =>
            m.role === 'assistant' ? (
              <div key={m.id} className="letter px-4 py-3.5">
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed">{m.text}</p>
              </div>
            ) : (
              <div key={m.id} className="scribble px-4 py-3">
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed">{m.text}</p>
              </div>
            ),
          )
        )}

        {busy ? (
          <div className="letter px-4 py-3.5">
            <p className="text-[13.5px] text-muted">смотрю ваши чеки…</p>
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex items-center gap-2 border-t border-rule bg-paper/95 px-3 py-2.5 backdrop-blur-sm"
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
        onSubmit={send}
      >
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="спросить про траты" />
        <Button type="submit" variant="sage" size="icon" disabled={busy} aria-label="отправить">
          <Send size={17} />
        </Button>
      </form>
    </div>
  )
}
