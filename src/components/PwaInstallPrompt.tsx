import * as React from 'react'
import { Download, PlusSquare, Share, Smartphone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { isIos, isStandalone } from '~/lib/push-client'
import { cn, haptic } from '~/lib/utils'

export function PwaInstallPrompt() {
  const [visible, setVisible] = React.useState(false)
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const ios = React.useMemo(() => isIos(), [])

  React.useEffect(() => {
    // Если уже в режиме PWA (standalone) — не показываем
    if (isStandalone()) return

    // Проверяем, не скрывал ли пользователь баннер недавно
    const dismissedUntil = localStorage.getItem('listok_pwa_dismissed')
    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return
    }

    // Слушатель для Android / Chromium
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Для iOS показываем деликатный баннер через небольшую задержку
    if (ios) {
      const timer = setTimeout(() => {
        setVisible(true)
      }, 1800)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handler)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [ios])

  function dismiss() {
    haptic(6)
    setVisible(false)
    // Не показывать баннер 7 дней
    localStorage.setItem('listok_pwa_dismissed', String(Date.now() + 7 * 24 * 60 * 60 * 1000))
  }

  async function install() {
    haptic(10)
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setVisible(false)
      }
      setDeferredPrompt(null)
    }
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 p-1 text-muted hover:text-ink transition"
          aria-label="Закрыть подсказку"
        >
          <X size={15} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-sage/12 text-sage">
            <Smartphone size={20} strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-ink leading-tight">
              Листок на экране «Домой»
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">
              {ios ? (
                <>
                  Нажмите <span className="inline-flex items-center font-medium text-ink">Поделиться <Share size={12} className="mx-0.5" /></span> внизу Safari, затем <span className="inline-flex items-center font-medium text-ink">«На экран „Домой“» <PlusSquare size={12} className="mx-0.5" /></span> для быстрого запуска без браузерной строки.
                </>
              ) : (
                'Установите приложение для мгновенного входа и работы без адресной строки браузера.'
              )}
            </p>

            {!ios && deferredPrompt ? (
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="sage"
                  onClick={install}
                  className="gap-1.5 rounded-full h-8 px-3 text-[12px]"
                >
                  <Download size={13} />
                  <span>Установить на телефон</span>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
