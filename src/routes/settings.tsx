import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Bell, ChevronRight, LogOut, Settings as SettingsIcon, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { showInAppNotification } from '~/components/NotificationBanner'
import { useApp } from '~/lib/app-state'
import {
  currentEndpoint,
  disablePush,
  enablePush,
  isIos,
  isStandalone,
  pushState,
  pushSupported,
} from '~/lib/push-client'
import { getAdminState } from '~/server/functions/admin'
import { pushSubscribe, pushTest, vapidPublic } from '~/server/functions/push'
import { saveProfile, saveSettings } from '~/server/functions/settings'

export const Route = createFileRoute('/settings')({
  component: Settings,
})

function Settings() {
  const { user, boot, refresh, logout } = useApp()
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [bank, setBank] = React.useState('')
  const [budget, setBudget] = React.useState('')
  const [saved, setSaved] = React.useState(false)
  const [perm, setPerm] = React.useState({ permission: 'default' as NotificationPermission, granted: false })
  const [standalone, setStandalone] = React.useState(false)
  const [testResult, setTestResult] = React.useState<string | null>(null)
  const [testError, setTestError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    if (!user) return
    setName(user.displayName || '')
    setPhone(user.phone || '')
    setBank(user.bank || '')
    setBudget(String(boot.settings.monthly_budget || 45000))
    setStandalone(isStandalone())
    setPerm(pushState())

    currentEndpoint()
      .then(async (ep) => {
        if (!ep) return
        try {
          const reg = await navigator.serviceWorker.getRegistration('/')
          const sub = await reg?.pushManager.getSubscription()
          const keys = (sub?.toJSON() as any)?.keys || {}
          if (sub) {
            await pushSubscribe({
              data: {
                endpoint: sub.endpoint,
                p256dh: keys.p256dh || '',
                auth: keys.auth || '',
              },
            })
          }
        } catch {}
      })
      .catch(() => {})

    getAdminState()
      .then((r: any) => setIsAdmin(!!r?.isAdmin))
      .catch(() => {})
  }, [user, boot.settings.monthly_budget])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    await saveProfile({
      data: {
        display_name: name,
        phone,
        bank,
      },
    })
    const b = Math.round(Number(budget.replace(/[^\d]/g, '') || 45000))
    await saveSettings({
      data: {
        monthly_budget: b,
      },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
    setBusy(false)
    await refresh()
  }

  async function onEnablePush() {
    setBusy(true)
    setTestError(null)
    const res = await enablePush()
    setPerm(pushState())
    setBusy(false)
    if (!res.ok) setTestError(res.error || 'Не получилось')
  }

  async function onTest() {
    setBusy(true)
    setTestResult(null)
    setTestError(null)
    showInAppNotification({
      title: '🌿 Листок · На связи',
      body: 'Уведомления настроены! Напоминания о чеках и счетах придут вовремя.',
      icon: 'sparkles',
      url: '/settings',
    })
    const key = await vapidPublic().catch(() => ({ publicKey: '' }))
    if (!key?.publicKey) {
      setTestError('Ключ пушей не задан на сервере')
      setBusy(false)
      return
    }
    const r = (await pushTest().catch(() => null)) as any
    if (!r) {
      setTestError('Не получилось отправить системный пуш')
    } else {
      setTestResult(`устройств в канале: ${r.devices ?? 0}, ушло: ${r.sent ?? 0}`)
      if (r.error) setTestError(String(r.error))
    }
    setBusy(false)
  }

  return (
    <div className="space-y-4 px-4 pb-32 pt-2 sm:px-5">
      <header className="mb-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
          <SettingsIcon size={14} className="text-sage" />
          <span>Личный кабинет</span>
        </div>
        <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
          Настройки
        </h1>
        <p className="mt-1 text-[13px] text-muted">{user?.email}</p>
      </header>

      {/* Блок уведомлений */}
      <section className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage/12 text-sage">
            <Bell size={16} />
          </div>
          <div>
            <h2 className="t-display text-[16px] font-semibold text-ink">Уведомления</h2>
            <p className="text-[12px] text-muted">Напоминания о чеках и счетах</p>
          </div>
        </div>

        <p className="text-[13px] leading-snug text-muted">
          {!pushSupported()
            ? 'Браузер не умеет пуши'
            : perm.granted
            ? standalone
              ? 'Включены. Приходят даже с выключенным экраном'
              : isIos()
              ? 'Разрешение есть. Откройте приложение с иконки Домой'
              : 'Разрешение есть'
            : 'Выключены — напоминания не придут'}
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {perm.granted ? (
            <Button variant="paper" size="md" disabled={busy} onClick={onTest}>
              Прислать тест
            </Button>
          ) : (
            <Button variant="sage" size="md" disabled={busy} onClick={onEnablePush}>
              Включить
            </Button>
          )}
          {perm.granted ? (
            <Button
              variant="ghost"
              size="md"
              disabled={busy}
              onClick={async () => {
                await disablePush()
                setPerm(pushState())
              }}
            >
              Отключить
            </Button>
          ) : (
            <Button variant="paper" size="md" disabled={busy} onClick={onTest}>
              Прислать тест
            </Button>
          )}
        </div>
        {testResult ? <p className="text-[12.5px] text-sage">{testResult}</p> : null}
        {testError ? <p className="text-[12.5px] text-stamp">{testError}</p> : null}

        {/* Живое превью шаблона уведомления */}
        <div className="rounded-[16px] border border-rule/60 bg-cream/50 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Шаблон уведомления Листка
            </span>
            <span className="rounded-full bg-sage/12 px-2 py-0.5 text-[10px] font-bold text-sage">
              iOS & Android
            </span>
          </div>

          <div
            onClick={() => {
              showInAppNotification({
                title: '⚡ Листок · Интернет',
                body: 'Оплата завтра — 650 ₽. Нажмите для отметки.',
                icon: 'card',
                url: '/bills',
              })
            }}
            className="group flex items-start gap-3 rounded-[16px] border border-rule/80 bg-paper p-3 shadow-xs transition-all hover:border-sage/40 active:scale-[0.99] cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage text-onsage shadow-xs">
              <Sparkles size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-sage">Листок · Напоминание</span>
                <span className="text-[10px] text-muted">сейчас</span>
              </div>
              <p className="text-[13px] font-semibold text-ink leading-tight mt-0.5">
                ⚡ Интернет — 650 ₽
              </p>
              <p className="text-[11.5px] text-muted leading-snug mt-0.5">
                Оплата завтра. Нажмите для отметки в приложении.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-muted text-center">
            Нажмите на карточку, чтобы протестировать появление баннера
          </p>
        </div>

        {isIos() && !standalone ? (
          <p className="text-[12px] leading-snug text-muted">
            На iPhone сначала добавьте приложение на домашний экран: Поделиться → На экран Домой.
          </p>
        ) : null}
      </section>

      {/* Профиль и лимиты */}
      <form onSubmit={save} className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3">
        <h2 className="t-display text-[16px] font-semibold text-ink">Профиль и лимиты трат</h2>

        <div>
          <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
            Имя
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
            Месячный лимит трат, ₽
          </label>
          <Input
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="45000"
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
            Телефон для СБП (взаиморасчёты)
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 900 000-00-00"
            inputMode="tel"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
            Банк для переводов
          </label>
          <Input
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder="Тинькофф, Сбер, Альфа"
          />
        </div>

        <Button
          type="submit"
          variant="sage"
          size="md"
          className="w-full mt-2"
          disabled={busy}
        >
          {saved ? 'Сохранено ✓' : 'Сохранить изменения'}
        </Button>
      </form>

      {/* Быстрые действия профиля */}
      <div className="overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper divide-y divide-rule-soft">
        {isAdmin ? (
          <Link
            to="/admin"
            className="flex min-h-[52px] items-center justify-between px-4 transition-colors hover:bg-black/[0.015] active:bg-black/[0.03]"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-sage" />
              <span className="text-[14.5px] font-medium text-ink">Панель администратора</span>
            </div>
            <ChevronRight size={17} className="text-muted" />
          </Link>
        ) : null}

        <button
          type="button"
          onClick={async () => {
            await logout()
            window.location.href = '/login'
          }}
          className="flex min-h-[52px] w-full items-center justify-between px-4 text-left transition-colors hover:bg-black/[0.015] active:bg-black/[0.03]"
        >
          <div className="flex items-center gap-2.5 text-stamp">
            <LogOut size={18} />
            <span className="text-[14.5px] font-medium">Выйти из аккаунта</span>
          </div>
          <ChevronRight size={17} className="text-muted/60" />
        </button>
      </div>
    </div>
  )
}
