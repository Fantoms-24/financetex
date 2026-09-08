import * as React from 'react'
import { Bell, Share, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { enablePush, isIos, isStandalone, pushState, pushSupported } from '~/lib/push-client'

export function PushNudge() {
  const [state, setState] = React.useState(() => pushState())
  const [standalone, setStandalone] = React.useState(false)
  const [ios, setIos] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setStandalone(isStandalone())
    setIos(isIos())
    setState(pushState())
    const t = setInterval(() => setState(pushState()), 1500)
    return () => clearInterval(t)
  }, [])

  if (!pushSupported()) return null
  if (state.granted && standalone) return null

  async function on() {
    setBusy(true)
    setError(null)
    const res = await enablePush()
    setBusy(false)
    if (!res.ok) setError(res.error || 'Не получилось')
    else setState(pushState())
  }

  const needHome = ios && !standalone

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper transition-all">
      <div className="flex items-start gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage/15 text-sage">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {needHome ? (
            <>
              <p className="t-display text-[15px] font-semibold text-ink">На iPhone сначала на Домой</p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">
                Поделиться → На экран Домой, затем откройте с иконки. После этого напоминания заработают.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-sage">
                <Share size={14} /> Поделиться → На экран Домой
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="t-display text-[15px] font-semibold text-ink">Напоминания Листка</p>
                <span className="rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-bold text-sage">
                  Важно
                </span>
              </div>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">
                Предупредим о счетах за 2 дня и сообщим о тратах в кассе — даже с выключенным экраном.
              </p>
              <Button variant="sage" size="sm" className="mt-3 gap-1.5" onClick={on} disabled={busy}>
                <Sparkles size={14} />
                <span>{busy ? 'Секунду…' : 'Включить напоминания'}</span>
              </Button>
              {error ? <p className="mt-2 text-[12px] text-stamp">{error}</p> : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
