import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  LogOut,
  Phone,
  Settings as SettingsIcon,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { showInAppNotification } from '~/components/NotificationBanner'
import { useApp } from '~/lib/app-state'
import { money } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
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

  const initials = (user?.displayName || user?.name || 'U')
    .slice(0, 2)
    .toUpperCase()

  const primaryHouse = React.useMemo(() => {
    return boot.houses && boot.houses.length > 0 ? boot.houses[0] : null
  }, [boot.houses])

  const now = new Date()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = Math.max(1, lastDay - now.getDate())
  const currentBudgetNum = Math.round(Number(budget.replace(/[^\d]/g, '') || 45000))
  const dailyNorm = Math.max(0, Math.round(currentBudgetNum / daysLeft))

  React.useEffect(() => {
    if (!user) return
    setName(user.displayName || '')
    setPhone(user.phone || '')
    setBank(user.bank || '')
    setBudget(String(boot.settings.monthly_budget || 45000))
    setStandalone(isStandalone())
    setPerm(pushState())

    // Если разрешение уже есть, фоново обновляем подписку и регистрируем в базе
    if (pushSupported() && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      enablePush()
        .then(() => setPerm(pushState()))
        .catch(() => {})
    }

    getAdminState()
      .then((r: any) => setIsAdmin(!!r?.isAdmin))
      .catch(() => {})
  }, [user, boot.settings.monthly_budget])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    haptic(10)
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
    showInAppNotification({
      title: '✓ Профиль сохранён',
      body: `Лимит трат: ${money(b)} в месяц`,
      icon: 'sparkles',
    })
    setTimeout(() => setSaved(false), 2000)
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

    // При выданном разрешении гарантируем актуальность подписки на сервере
    if (perm.granted) {
      const syncRes = await enablePush().catch(() => null)
      if (syncRes && !syncRes.ok && syncRes.error) {
        setTestError(syncRes.error)
        setBusy(false)
        return
      }
    }

    const key = await vapidPublic().catch(() => ({ publicKey: '' }))
    if (!key?.publicKey) {
      setTestError('Ключ пушей не задан на сервере')
      setBusy(false)
      return
    }

    const r = (await pushTest().catch((e: any) => ({ ok: false, error: e?.message || 'Ошибка сети' }))) as any
    if (!r) {
      setTestError('Не получилось отправить системный пуш')
    } else if (r.ok || (r.sent && r.sent > 0)) {
      setTestResult(`✓ Баннер отправлен на устройство (${r.devices ?? 1})! Сверните приложение, чтобы увидеть системное уведомление.`)
      showInAppNotification({
        title: '🌿 Листок · На связи',
        body: 'Системное уведомление отправлено! На экране блокировки появится баннер.',
        icon: 'sparkles',
        url: '/settings',
      })
    } else {
      setTestResult(`устройств в канале: ${r.devices ?? 0}, ушло: ${r.sent ?? 0}`)
      if (r.error) setTestError(String(r.error))
    }
    setBusy(false)
  }

  return (
    <div className="space-y-4 px-4 pb-36 pt-2 sm:px-5">
      {/* 1. Верхняя навигационная панель с кнопкой возврата */}
      <header className="flex items-center justify-between">
        <Link
          to="/"
          onClick={() => haptic(8)}
          className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-rule/80 bg-paper px-3 text-[13px] font-medium text-ink shadow-xs transition hover:bg-white active:scale-95"
        >
          <ArrowLeft size={15} />
          <span>Главная</span>
        </Link>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
          <SettingsIcon size={14} className="text-sage" />
          <span>Личный кабинет</span>
        </div>
      </header>

      {/* 2. Hero-карточка профиля */}
      <section className="relative overflow-hidden rounded-[22px] border border-rule/80 bg-paper p-4.5 shadow-paper">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage/20 to-sage/5 border border-sage/30 text-sage text-[18px] font-bold shadow-xs">
            {initials}
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-emerald-500"
              title="Активный профиль"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="t-display truncate text-[19px] font-semibold text-ink leading-snug">
              {user?.displayName || user?.name || 'Пользователь'}
            </h1>
            <p className="truncate text-[12.5px] text-muted">{user?.email}</p>
            {primaryHouse ? (
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-sage">
                <Users size={12} />
                <span className="truncate">Касса «{primaryHouse.name}»</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. Форма настроек: Бюджет и реквизиты кассы */}
      <form onSubmit={save} className="space-y-4">
        {/* Карточка: Личный бюджет и имя */}
        <section className="rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
          <div className="flex items-center gap-2 border-b border-rule/60 pb-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/12 text-sage">
              <Wallet size={15} />
            </div>
            <div>
              <h2 className="t-display text-[15px] font-semibold text-ink">Личный бюджет и профиль</h2>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
              Имя пользователя
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Месячный лимит трат, ₽
              </label>
              <span className="text-[11px] font-semibold text-sage">
                ~{money(dailyNorm)} в день
              </span>
            </div>
            <Input
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="45 000"
              inputMode="numeric"
            />
            <p className="mt-1 text-[11.5px] text-muted">
              Базовый лимит на месяц. Исходя из него рассчитывается свободный остаток на день на главной.
            </p>
          </div>
        </section>

        {/* Карточка: Реквизиты для взаиморасчётов в кассе (СБП) */}
        <section className="rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
          <div className="flex items-center gap-2 border-b border-rule/60 pb-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/12 text-sage">
              <Phone size={15} />
            </div>
            <div>
              <h2 className="t-display text-[15px] font-semibold text-ink">Реквизиты для кассы (СБП)</h2>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
              Телефон для перевода
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000-00-00"
              inputMode="tel"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
              Банк для получения
            </label>
            <Input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="Т-Банк, Сбер, Альфа"
            />
            <p className="mt-1 text-[11.5px] text-muted">
              Участники семейной кассы увидят эти данные, чтобы быстро перевести вам свою долю за общий чек.
            </p>
          </div>

          <Button
            type="submit"
            variant="sage"
            size="md"
            className="w-full mt-1"
            disabled={busy}
          >
            {saved ? '✓ Настройки сохранены' : 'Сохранить изменения'}
          </Button>
        </section>
      </form>

      {/* 4. Центр уведомлений */}
      <section className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
        <div className="flex items-center justify-between border-b border-rule/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/12 text-sage">
              <Bell size={15} />
            </div>
            <h2 className="t-display text-[15px] font-semibold text-ink">Уведомления</h2>
          </div>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold',
              perm.granted ? 'bg-sage/12 text-sage' : 'bg-stamp/10 text-stamp',
            )}
          >
            {perm.granted ? 'Включены' : 'Выключены'}
          </span>
        </div>

        <p className="text-[12.5px] leading-relaxed text-muted">
          {!pushSupported()
            ? 'Ваш браузер не поддерживает Push-уведомления.'
            : perm.granted
            ? standalone
              ? 'Уведомления активны и приходят даже с заблокированным экраном.'
              : isIos()
              ? 'Разрешение выдано. Для работы при закрытом окне добавьте Листок на экран «Домой».'
              : 'Уведомления активны. Напоминания о чеках и счетах придут вовремя.'
            : 'Включите напоминания, чтобы не пропустить срок оплаты счетов и новые чеки в кассе.'}
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {perm.granted ? (
            <Button
              variant="paper"
              size="md"
              disabled={busy}
              onClick={() => {
                haptic(8)
                onTest()
              }}
            >
              Прислать тест
            </Button>
          ) : (
            <Button
              variant="sage"
              size="md"
              disabled={busy}
              onClick={() => {
                haptic(8)
                onEnablePush()
              }}
            >
              Включить пуши
            </Button>
          )}

          {perm.granted ? (
            <Button
              variant="ghost"
              size="md"
              disabled={busy}
              onClick={async () => {
                haptic(8)
                await disablePush()
                setPerm(pushState())
              }}
            >
              Отключить
            </Button>
          ) : (
            <Button
              variant="paper"
              size="md"
              disabled={busy}
              onClick={() => {
                haptic(8)
                onTest()
              }}
            >
              Прислать тест
            </Button>
          )}
        </div>

        {testResult ? <p className="text-[12px] text-sage font-medium">{testResult}</p> : null}
        {testError ? <p className="text-[12px] text-stamp font-medium">{testError}</p> : null}

        {/* Интерактивное превью карточки уведомления */}
        <div className="rounded-[16px] border border-rule/70 bg-cream/40 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">
              Шаблон уведомления Листка
            </span>
            <span className="text-[10px] text-muted">Нажмите для теста</span>
          </div>

          <div
            onClick={() => {
              haptic(10)
              showInAppNotification({
                title: 'Семья',
                body: 'Новый платёж: Аренда (25 000 ₽)',
                icon: 'card',
                url: '/groups',
              })
            }}
            className="group flex items-start gap-3 rounded-[14px] border border-rule/80 bg-paper p-3 shadow-xs transition hover:border-sage/50 active:scale-[0.99] cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage text-onsage shadow-xs">
              <Sparkles size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-sage">Семья</span>
                <span className="text-[10px] text-muted">сейчас</span>
              </div>
              <p className="text-[13px] font-semibold text-ink leading-tight mt-0.5">
                Новый платёж: Аренда (25 000 ₽)
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                Нажмите для перехода к кассе
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Безопасность, админка и выход */}
      <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper shadow-paper divide-y divide-rule-soft">
        {isAdmin ? (
          <Link
            to="/admin"
            onClick={() => haptic(8)}
            className="flex min-h-[52px] items-center justify-between px-4 transition-colors hover:bg-black/[0.015] active:bg-black/[0.03]"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-sage" />
              <span className="text-[14px] font-medium text-ink">Панель администратора</span>
            </div>
            <ChevronRight size={17} className="text-muted" />
          </Link>
        ) : null}

        <button
          type="button"
          onClick={async () => {
            haptic(10)
            if (!confirm('Вы действительно хотите выйти из аккаунта?')) return
            await logout()
            window.location.href = '/login'
          }}
          className="flex min-h-[52px] w-full items-center justify-between px-4 text-left transition-colors hover:bg-stamp/[0.03] active:bg-stamp/[0.06]"
        >
          <div className="flex items-center gap-2.5 text-stamp">
            <LogOut size={18} />
            <span className="text-[14px] font-semibold">Выйти из аккаунта</span>
          </div>
          <ChevronRight size={17} className="text-stamp/60" />
        </button>
      </div>

      <div className="text-center pt-1 pb-2">
        <p className="text-[11px] text-muted">Листок · Версия 7.0 (2026)</p>
      </div>
    </div>

  )
}
