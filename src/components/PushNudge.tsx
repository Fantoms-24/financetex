import * as React from 'react'
import { Bell, Share, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui/button'
import { enablePush, isIos, isStandalone, pushState, pushSupported } from '~/lib/push-client'
import { showInAppNotification } from './NotificationBanner'

const PROMPT_KEY = 'listok-notification-prompt-v1'

export function PushNudge() {
  const [state, setState] = React.useState(() => pushState())
  const [standalone, setStandalone] = React.useState(false)
  const [ios, setIos] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setStandalone(isStandalone())
    setIos(isIos())
    setState(pushState())
    const remembered = localStorage.getItem(PROMPT_KEY)
    const canExplainIos = isIos() && !isStandalone()
    if (!remembered && (pushSupported() || canExplainIos) && !pushState().granted) setOpen(true)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!pushSupported() && !(ios && !standalone)) return null
  if (state.granted) return null

  function close(reason: 'later' | 'enabled' = 'later') {
    localStorage.setItem(PROMPT_KEY, reason)
    setOpen(false)
  }

  async function on() {
    setBusy(true)
    setError(null)
    const res = await enablePush()
    setBusy(false)
    if (!res.ok) setError(res.error || 'Не получилось')
    else {
      setState(pushState())
      showInAppNotification({ title: 'Напоминания включены', body: 'О счетах и важных тратах сообщим вовремя.', icon: 'sparkles' })
      close('enabled')
    }
  }

  const needHome = ios && !standalone

  return <AnimatePresence>
    {open ? <motion.div className="notification-permission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="notification-permission-title">
      <motion.section className="notification-permission__card" initial={{ opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 22, scale: .985 }} transition={{ type: 'spring', stiffness: 360, damping: 30 }}>
        <button className="notification-permission__close" aria-label="Не сейчас" onClick={() => close()}><X size={18} /></button>
        <div className="notification-permission__mark"><Bell size={25} /><span><Sparkles size={12} /></span></div>
        {needHome ? <>
          <p className="eyebrow">НАПОМИНАНИЯ</p>
          <h2 id="notification-permission-title">Сначала добавьте<br />Листок на Домой</h2>
          <p>На iPhone уведомления доступны в приложении с домашнего экрана. Это займёт несколько секунд.</p>
          <div className="notification-permission__ios"><Share size={16} /> Поделиться → На экран «Домой»</div>
          <Button variant="ghost" size="md" className="w-full" onClick={() => close()}>Понятно, позже</Button>
        </> : <>
          <p className="eyebrow">НЕ ПРОПУСТИТЬ ВАЖНОЕ</p>
          <h2 id="notification-permission-title">Напоминать<br />о важном?</h2>
          <p>Сообщим о счёте, приближающемся лимите и действиях в общем бюджете. Только по делу.</p>
          <Button variant="sage" size="lg" className="w-full" onClick={on} disabled={busy}>{busy ? 'Открываем разрешение…' : <><Bell size={18} /> Включить уведомления</>}</Button>
          <button className="notification-permission__later" onClick={() => close()}>Не сейчас</button>
          {error ? <p role="alert" className="notification-permission__error">{error}</p> : null}
        </>}
      </motion.section>
    </motion.div> : null}
  </AnimatePresence>
}
