import * as React from 'react'
import { Share } from 'lucide-react'
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
    <div className="push-nudge rise p-4">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          {needHome ? (
            <>
              <p className="t-display text-[15.5px] leading-snug">На iPhone сначала на Домой</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                Поделиться → На экран Домой, потом откройте с иконки. Без этого пуши не приходят.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-sage">
                <Share size={14} /> Поделиться → На экран Домой
              </p>
            </>
          ) : (
            <>
              <p className="t-display text-[15.5px] leading-snug">Включить уведомления</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                Платежи, покупки и сообщения кассы — даже с выключенным экраном.
              </p>
              <Button variant="sage" size="sm" className="mt-3" onClick={on} disabled={busy}>
                {busy ? 'Секунду…' : 'Включить'}
              </Button>
              {error ? <p className="mt-2 text-[12.5px] text-stamp">{error}</p> : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
