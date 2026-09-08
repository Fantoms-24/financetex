import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Logo } from '~/components/Logo'
import { useApp } from '~/lib/app-state'
import { signIn, signUp } from '~/server/functions/auth'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/login')({
  component: Login,
})

type Mode = 'in' | 'up'

function Login() {
  const navigate = useNavigate()
  const { setSession, refresh } = useApp()
  const [mode, setMode] = React.useState<Mode>('in')
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setError(null)
    if (!login.trim()) return setError('Впишите логин')
    if (password.length < 4) return setError('Пароль — минимум 4 символа')

    setBusy(true)
    try {
      const res = mode === 'in'
        ? await signIn({ data: { login, password } })
        : await signUp({ data: { login, password, name } })

      // Решают ok и токен. Профиль может не дойти (например, он ещё не
      // создан) — не запираем вход на этом, ниже он подтянется через refresh.
      if (!res.ok || !res.token) {
        setError(res.error || 'Не получилось войти')
        setBusy(false)
        return
      }

      // user уже есть в ответе — считаем вошедшим сразу, get-session догонит
      setSession(res.token, res.user)
      navigate({ to: '/', replace: true })
      refresh().catch(() => {})
    } catch (e: any) {
      setError(e?.message || 'Не получилось войти')
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-[100svh] flex-col">
      {/* шалфей сверху */}
      <div className="relative bg-sage px-6 pb-10 pt-[calc(env(safe-area-inset-top)+40px)] text-onsage">
        <div className="mx-auto flex max-w-[430px] flex-col items-center text-center">
          <Logo size={64} />
          <h1 className="t-display mt-4 text-[30px] leading-none">ЧекАгент</h1>
          <p className="mt-2 max-w-[300px] text-[13.5px] leading-snug text-onsage/75">
            Карманный финансист. Чеки, бюджет и кассы на одном листке.
          </p>
        </div>

        {/* перфорация */}
        <div className="absolute -bottom-[9px] left-0 right-0 flex justify-center gap-[7px] overflow-hidden">
          {Array.from({ length: 26 }).map((_, i) => (
            <span key={i} className="h-[18px] w-[18px] shrink-0 rounded-full bg-cream" />
          ))}
        </div>
      </div>

      {/* кремовый лист */}
      <div className="flex-1 bg-transparent px-5 pb-10 pt-8">
        <div className="mx-auto w-full max-w-[430px]">
          <div className="mb-5 flex rounded-[12px] border border-rule bg-paper p-1 shadow-paper">
            {(
              [
                ['in', 'Войти'],
                ['up', 'Создать'],
              ] as Array<[Mode, string]>
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m)
                  setError(null)
                }}
                className={cn(
                  'min-h-[42px] flex-1 rounded-[9px] text-[14px] transition-colors',
                  mode === m ? 'bg-sage text-onsage shadow-paper' : 'text-muted',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="receipt-card p-5">
            {mode === 'up' ? (
              <div className="mb-4">
                <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Имя</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                />
              </div>
            ) : null}

            <div className="mb-4">
              <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Логин</label>
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="vasya"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="username"
                inputMode="email"
              />
              <p className="mt-1.5 text-[11.5px] text-muted">Без собаки — добавим @chekagent.app сами</p>
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="минимум 4 символа"
                autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
              />
            </div>

            {error ? (
              <p className="mb-3 rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2 text-[13px] text-stamp">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="sage" size="lg" className="w-full" disabled={busy}>
              {busy ? 'Секунду…' : mode === 'in' ? 'Войти' : 'Создать и войти'}
            </Button>
          </form>

          <p className="mt-6 text-center text-[12px] leading-relaxed text-muted">
            Поставите на Домой — будут приходить напоминания
            <br />о платежах, покупках и сообщениях в кассе.
          </p>
        </div>
      </div>
    </div>
  )
}
