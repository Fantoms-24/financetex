import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, KeyRound } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { getAdminState, saveLlm } from '~/server/functions/admin'

export const Route = createFileRoute('/admin')({
  component: Admin,
})

function Admin() {
  const { user } = useApp()
  const [allowed, setAllowed] = React.useState(false)
  const [baseUrl, setBaseUrl] = React.useState('')
  const [apiKey, setApiKey] = React.useState('')
  const [model, setModel] = React.useState('')
  const [hasKey, setHasKey] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [msg, setMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!user) return
    getAdminState()
      .then((r: any) => {
        setAllowed(!!r?.isAdmin)
        if (r?.isAdmin) {
          setBaseUrl(r.baseUrl || '')
          setModel(r.model || '')
          setHasKey(!!r.hasKey)
        }
      })
      .catch(() => {})
  }, [user])

  if (!allowed) {
    return (
      <div className="px-4 pb-8 pt-5">
        <header className="mb-4 flex items-center gap-2">
          <Link to="/settings" className="flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage">
            <ChevronLeft size={19} /> Настроить
          </Link>
        </header>
        <div className="slip px-5 py-10 text-center">
          <p className="t-display text-[17px]">Только для админа</p>
          <p className="mt-1.5 text-[13px] text-muted">Раздел доступен тому, кто ставил ключ.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4 flex items-center gap-2">
        <Link to="/settings" className="flex min-h-[40px] items-center gap-1 pr-2 text-[15px] text-sage">
          <ChevronLeft size={19} /> Настроить
        </Link>
      </header>

      <h1 className="t-display mb-4 text-[26px] leading-none">Ключ для сканирования</h1>

      <form
        className="receipt-card rise p-4"
        onSubmit={async (e) => {
          e.preventDefault()
          setBusy(true)
          setMsg(null)
          const r: any = await saveLlm({ data: { baseUrl, apiKey, model } })
          setHasKey(!!r?.hasKey)
          setMsg(r?.error || 'Сохранили')
          setBusy(false)
        }}
      >
        <div className="mb-3">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Адрес</label>
          <Input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://api.tabitoken.com/v1" />
        </div>
        <div className="mb-3">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Модель</label>
          <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="gpt-4o-mini" />
        </div>
        <div className="mb-4">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">API-ключ</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={hasKey ? 'ключ уже сохранён' : 'sk-…'}
          />
        </div>
        <Button type="submit" variant="sage" size="md" className="w-full" disabled={busy}>
          <KeyRound size={16} /> {busy ? 'Секунду…' : 'Сохранить ключ'}
        </Button>
        {msg ? <p className="mt-2.5 text-center text-[13px] text-sage">{msg}</p> : null}
      </form>

      <p className="mt-4 text-[12.5px] leading-snug text-muted">
        Без ключа скан чеков скажет: «админ ещё не вставил ключ». Всё остальное работает.
      </p>
    </div>
  )
}
