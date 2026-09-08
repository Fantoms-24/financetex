import * as React from 'react'
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  Copy,
  Crown,
  Hash,
  Home as HomeIcon,
  KeyRound,
  Plus,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { plural } from '~/lib/format'
import { createHouse, joinHouse, listHouses } from '~/server/functions/houses'
import { cn } from '~/lib/utils'

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

const PRESET_NAMES = ['Семья', 'Квартира', 'Отпуск', 'Дача', 'Ремонт', 'Соседи']

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
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* */
    }
  }

  return (
    <div className="space-y-4 px-4 pb-12 pt-4 sm:px-5">
      {/* Шапка раздела */}
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

        {mode === 'none' && (
          <Button
            size="sm"
            variant="sage"
            onClick={() => setMode('create')}
            className="gap-1.5"
          >
            <Plus size={16} />
            <span>Касса</span>
          </Button>
        )}
      </header>

      {/* Быстрые переключатели действий */}
      {mode === 'none' ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('create')}
            className="group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <Plus size={20} strokeWidth={2.2} />
            </div>
            <div className="mt-3">
              <span className="text-[14.5px] font-semibold text-ink">Создать кассу</span>
              <p className="mt-0.5 text-[11.5px] text-muted">Семья, квартира или отпуск</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode('join')}
            className="group flex flex-col justify-between rounded-[18px] border border-rule/80 bg-paper p-4 text-left shadow-paper transition-all hover:border-sage/40 active:scale-[0.98]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-700/10 text-amber-800">
              <KeyRound size={20} strokeWidth={2} />
            </div>
            <div className="mt-3">
              <span className="text-[14.5px] font-semibold text-ink">Войти по коду</span>
              <p className="mt-0.5 text-[11.5px] text-muted">По коду от близкого</p>
            </div>
          </button>
        </div>
      ) : null}

      {/* Форма создания кассы */}
      {mode === 'create' ? (
        <form
          onSubmit={create}
          className="relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg"
        >
          <div className="mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5">
            <div className="flex items-center gap-2">
              <HomeIcon size={17} className="text-sage" />
              <p className="t-display text-[16px] font-medium text-ink">Новая касса</p>
            </div>
            <button
              type="button"
              onClick={() => setMode('none')}
              className="rounded-lg p-1 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Название кассы
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Семья, Дом, Поездка…"
                startIcon={<Users size={17} />}
                required
              />
              {/* Быстрые подсказки */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PRESET_NAMES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setName(preset)}
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[11px] transition-colors',
                      name === preset
                        ? 'border-sage bg-sage text-onsage'
                        : 'border-rule/80 bg-black/[0.02] text-muted hover:bg-black/[0.05]',
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setMode('none')}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="sage"
                className="flex-1"
                disabled={busy || !name.trim()}
              >
                {busy ? 'Создание…' : 'Создать кассу'}
              </Button>
            </div>
          </div>
        </form>
      ) : null}

      {/* Форма входа по коду */}
      {mode === 'join' ? (
        <form
          onSubmit={join}
          className="relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg"
        >
          <div className="mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5">
            <div className="flex items-center gap-2">
              <KeyRound size={17} className="text-amber-800" />
              <p className="t-display text-[16px] font-medium text-ink">Присоединиться к кассе</p>
            </div>
            <button
              type="button"
              onClick={() => setMode('none')}
              className="rounded-lg p-1 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
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
                className="font-mono tracking-[0.2em]"
                required
              />
              <p className="mt-1.5 text-[11.5px] text-muted">
                Введите код, которым с вами поделился создатель кассы.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setMode('none')}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="sage"
                className="flex-1"
                disabled={busy || !code.trim()}
              >
                {busy ? 'Проверка…' : 'Войти в кассу'}
              </Button>
            </div>
          </div>
        </form>
      ) : null}

      {/* Сообщение об ошибке */}
      {error ? (
        <div className="rounded-[14px] border border-stamp/30 bg-stamp/10 px-3.5 py-2.5 text-[13px] text-stamp">
          {error}
        </div>
      ) : null}

      {/* Список касс пользователя */}
      {houses.length === 0 ? (
        <div className="rounded-[20px] border border-rule/80 bg-paper p-8 text-center shadow-paper">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <Users size={24} />
          </div>
          <p className="t-display mt-3 text-[17px] font-medium text-ink">
            У вас пока нет активных касс
          </p>
          <p className="mx-auto mt-1.5 max-w-[290px] text-[13px] leading-snug text-muted">
            Создайте кассу «Семья» или «Квартира», чтобы вместе вести учёт общих расходов,
            чеков и счетов ЖКХ.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <Button size="sm" variant="sage" onClick={() => setMode('create')}>
              <Plus size={16} /> Создать первую кассу
            </Button>
            <Button size="sm" variant="paper" onClick={() => setMode('join')}>
              Войти по коду
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1 text-[12px] font-semibold uppercase tracking-wider text-muted">
            <span>Ваши группы ({houses.length})</span>
            <span>Код для друзей</span>
          </div>

          {houses.map((h) => {
            const isOwner = h.owner_id === user?.id
            const isCopied = copied === h.id

            return (
              <div
                key={h.id}
                className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper shadow-paper transition-all hover:border-sage/40"
              >
                {/* Верхняя часть карточки — клик ведёт в саму кассу */}
                <Link
                  to="/groups/$id"
                  params={{ id: h.id }}
                  className="group block p-4 transition-colors hover:bg-black/[0.015]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
                        <HomeIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="t-display text-[18px] font-semibold leading-tight text-ink">
                            {h.name}
                          </h2>
                          {isOwner ? (
                            <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-medium text-amber-800">
                              <Crown size={11} /> Создатель
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-sage/10 px-2 py-0.5 text-[10.5px] font-medium text-sage">
                              <UserCheck size={11} /> Участник
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[12px] text-muted">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {h.members} {plural(h.members, 'участник', 'участника', 'участников')}
                          </span>
                          <span>•</span>
                          <span className="text-sage transition-colors group-hover:underline">
                            Открыть дашборд →
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.03] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>

                {/* Нижняя плашка с кодом приглашения */}
                <div className="flex items-center justify-between border-t border-rule/60 bg-black/[0.015] px-4 py-2.5">
                  <div className="flex items-center gap-2 text-[12px] text-muted">
                    <span>Код:</span>
                    <span className="font-mono text-[13.5px] font-semibold tracking-widest text-ink">
                      {h.code}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyCode(h.code, h.id)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium transition-all active:scale-95',
                      isCopied
                        ? 'bg-sage text-onsage shadow-sm'
                        : 'bg-paper text-sage border border-rule/80 hover:bg-sage/10',
                    )}
                  >
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{isCopied ? 'Скопировано' : 'Скопировать код'}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Информационный блок */}
      <div className="flex items-start gap-3 rounded-[18px] border border-rule/60 bg-paper/60 p-4 text-[12.5px] leading-relaxed text-muted">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-sage" />
        <div>
          <span className="font-medium text-ink">Как устроена касса?</span> Все участники могут
          сканировать чеки в общий котёл, видеть актуальный баланс расходов и рассчитывать,
          кто сколько внёс, без споров и путаницы.
        </div>
      </div>
    </div>
  )
}

