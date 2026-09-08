import * as React from 'react'
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { Copy, Plus, Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { moneyShort, plural } from '~/lib/format'
import { createHouse, joinHouse, listHouses } from '~/server/functions/houses'

export const Route = createFileRoute('/groups')({
  component: Groups,
})

interface HouseRow {
  id: string
  name: string
  code: string
  owner_id: string
  members: number
}

function Groups() {
  const { user, boot, refresh } = useApp()
  const [houses, setHouses] = React.useState<Array<HouseRow>>(boot.houses as Array<HouseRow>)
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

  // /groups — родитель для /groups/$id. Без Outlet дочерней странице кассы
  // негде отрисоваться: кликаешь по кассе — остаётся тот же список, и
  // кажется, что дальше функциональности нет. Все хуки уже вызваны,
  // поэтому ранний return здесь безопасен.
  const childActive = useRouterState({
    select: (s) =>
      s.matches.some((m) => m.routeId !== '/groups' && (m.routeId || '').startsWith('/groups')),
  })
  if (childActive) return <Outlet />

  async function create(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const r: any = await createHouse({ data: { name } })
      if (r?.error) return setError(r.error)
      setMode('none')
      await reload()
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function join(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const r: any = await joinHouse({ data: { code } })
      if (r?.error) return setError(r.error)
      setCode('')
      setMode('none')
      await reload()
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function copyCode(c: string, id: string) {
    try {
      await navigator.clipboard.writeText(c)
      setCopied(id)
      setTimeout(() => setCopied(null), 1600)
    } catch {
      /* */
    }
  }

  return (
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4">
        <h1 className="t-display text-[26px] leading-none">Кассы</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          {houses.length > 0 ? 'общие деньги, платежи и покупки' : 'семья и квартира'}
        </p>
      </header>

      {mode === 'none' ? (
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Button variant="sage" size="md" onClick={() => setMode('create')}>
            <Plus size={17} /> Создать
          </Button>
          <Button variant="paper" size="md" onClick={() => setMode('join')}>
            Войти по коду
          </Button>
        </div>
      ) : null}

      {mode === 'create' ? (
        <form onSubmit={create} className="receipt-card rise mb-4 p-4">
          <p className="t-display mb-3 text-[15px]">Новая касса</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Семья" className="mb-4" />
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="ghost" onClick={() => setMode('none')}>
              Отмена
            </Button>
            <Button type="submit" variant="sage" disabled={busy}>
              {busy ? 'Секунду…' : 'Создать'}
            </Button>
          </div>
        </form>
      ) : null}

      {mode === 'join' ? (
        <form onSubmit={join} className="receipt-card rise mb-4 p-4">
          <p className="t-display mb-3 text-[15px]">Код кассы</p>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="A2B3C4D"
            autoCapitalize="characters"
            autoComplete="off"
            className="mb-4 font-mono tracking-[0.25em]"
          />
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="ghost" onClick={() => setMode('none')}>
              Отмена
            </Button>
            <Button type="submit" variant="sage" disabled={busy}>
              {busy ? 'Секунду…' : 'Войти'}
            </Button>
          </div>
        </form>
      ) : null}

      {error ? (
        <p className="mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp">{error}</p>
      ) : null}

      {houses.length === 0 ? (
        <div className="slip rise px-5 py-10 text-center">
          <Users size={22} strokeWidth={1.6} className="mx-auto mb-3 text-sage" />
          <p className="t-display text-[17px]">Пока пусто</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Создайте кассу «Семья» и дайте код жене или родственнику.
            <br />
            Платежи, зарплаты и список покупок будут видны обоим.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {houses.map((h) => (
            <div key={h.id} className="envelope rise">
              <Link to="/groups/$id" params={{ id: h.id }} className="block px-4 pb-4 pt-[52px]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="t-display text-[19px]">{h.name}</span>
                  <span className="text-[12.5px] text-muted">
                    {h.members} {plural(h.members, 'человек', 'человека', 'человек')}
                  </span>
                </div>
                {h.owner_id === user?.id ? (
                  <p className="mt-1 text-[12.5px] text-muted">ваша касса</p>
                ) : null}
              </Link>
              <div className="rule flex items-center justify-between px-4 py-2.5">
                <span className="font-mono text-[13px] tracking-[0.22em] text-muted">{h.code}</span>
                <button
                  onClick={() => copyCode(h.code, h.id)}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-[8px] px-2 text-[13px] text-sage"
                >
                  <Copy size={14} />
                  {copied === h.id ? 'скопировали' : 'код'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
