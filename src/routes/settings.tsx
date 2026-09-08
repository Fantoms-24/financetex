import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, LogOut } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { currentEndpoint, disablePush, enablePush, isIos, isStandalone, pushState, pushSupported } from '~/lib/push-client'
import { pushSubscribe, pushTest, vapidPublic } from '~/server/functions/push'
import { saveProfile, saveSettings } from '~/server/functions/settings'
import { getAdminState } from '~/server/functions/admin'

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

  const [perm, setPerm] = React.useState(() => pushState())
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
        // подписка уже есть — убедимся, что сервер её знает
        try {
          const reg = await navigator.serviceWorker.getRegistration('/')
          const sub = await reg?.pushManager.getSubscription()
          const keys = (sub?.toJSON() as any)?.keys || {}
          if (sub) {
            await pushSubscribe({ data: { endpoint: sub.endpoint, p256dh: keys.p256dh || '', auth: keys.auth || '' } })
          }
        } catch {
          /* */
        }
      })
      .catch(() => {})
    getAdminState()
      .then((r: any) => setIsAdmin(!!r?.isAdmin))
      .catch(() => {})
  }, [user, boot.settings.monthly_budget])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    await saveProfile({ data: { display_name: name, phone, bank } })
    const b = Math.round(Number(budget.replace(/[^\d]/g, '') || 45000))
    await saveSettings({ data: { monthly_budget: b } })
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
    const key = await vapidPublic().catch(() => ({ publicKey: '' }))
    if (!key?.publicKey) {
      setTestError('Ключ пушей не задан на сервере')
      setBusy(false)
      return
    }
    const r: any = await pushTest().catch(() => null)
    if (!r) {
      setTestError('Не получилось отправить')
    } else {
      setTestResult(`устройств в канале: ${r.devices ?? 0}, ушло: ${r.sent ?? 0}`)
      if (r.error) setTestError(String(r.error))
    }
    setBusy(false)
  }

  return (
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4">
        <h1 className="t-display text-[26px] leading-none">Настроить</h1>
        <p className="mt-1.5 text-[13px] text-muted">{user?.email}</p>
      </header>

      {/* пуши */}
      <section className="receipt-card rise mb-4 p-4">
        <h2 className="t-display mb-2 text-[17px]">Уведомления</h2>
        <p className="mb-3 text-[13px] leading-snug text-muted">
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

        <div className="grid grid-cols-2 gap-2.5">
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

        {testResult ? <p className="mt-2.5 text-[13px] text-sage">{testResult}</p> : null}
        {testError ? <p className="mt-2.5 text-[13px] text-stamp">{testError}</p> : null}
        {isIos() && !standalone ? (
          <p className="mt-2.5 text-[12.5px] leading-snug text-muted">
            На iPhone сначала на Домой: Поделиться → На экран Домой.
          </p>
        ) : null}
      </section>

      {/* профиль */}
      <form onSubmit={save} className="receipt-card rise mb-4 p-4">
        <h2 className="t-display mb-3 text-[17px]">Профиль и лимит</h2>
        <div className="mb-3">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Имя</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Как обращаться" />
        </div>
        <div className="mb-3">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Лимит месяца, ₽</label>
          <Input
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ''))}
            inputMode="numeric"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Телефон для СБП</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 900 000-00-00" inputMode="tel" />
        </div>
        <div className="mb-4">
          <label className="mb-1.5 block text-[12px] uppercase tracking-[0.09em] text-muted">Банк</label>
          <Input value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Тинькофф" />
        </div>
        <Button type="submit" variant="sage" size="md" className="w-full" disabled={busy}>
          {saved ? 'Сохранили' : 'Сохранить'}
        </Button>
      </form>

      <div className="mb-4 divide-y divide-rule-soft overflow-hidden rounded-[14px] border border-rule bg-paper shadow-paper">
        {isAdmin ? (
          <Link to="/admin" className="flex min-h-[52px] items-center justify-between px-4">
            <span className="text-[15px]">Ключ для сканирования</span>
            <ChevronRight size={17} className="text-muted" />
          </Link>
        ) : null}
        <button
          onClick={async () => {
            await logout()
            window.location.href = '/login'
          }}
          className="flex min-h-[52px] w-full items-center justify-between px-4 text-left"
        >
          <span className="text-[15px]">Выйти</span>
          <LogOut size={17} className="text-muted" />
        </button>
      </div>
    </div>
  )
}
