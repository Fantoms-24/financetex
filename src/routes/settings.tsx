import { AccountSecurity } from '~/components/AccountSecurity'
import { budgetNumbers, assertSaved } from '~/lib/finance'
import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bell,
  Bot,
  ChevronRight,
  Copy,
  ExternalLink,
  LogOut,
  Phone,
  Send,
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
import { isNativeApp, sendNativeTestNotification, syncNativeBillReminders } from '~/lib/native'
import { getAdminState } from '~/server/functions/admin'
import { pushSubscribe, pushTest, triggerEveningCheckin, tickBills, vapidPublic } from '~/server/functions/push'
import { saveProfile, saveSettings } from '~/server/functions/settings'
import { getTelegramStatus, saveBotSettings, unlinkTelegram, type TelegramState } from '~/server/functions/telegram'

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
  const [tgState, setTgState] = React.useState<TelegramState | null>(null)
  const [copiedTgCode, setCopiedTgCode] = React.useState(false)
  const [tgBusy, setTgBusy] = React.useState(false)
  const [botConfigInput, setBotConfigInput] = React.useState('')
  const [botConfigBusy, setBotConfigBusy] = React.useState(false)
  const [showBotConfig, setShowBotConfig] = React.useState(false)

  const loadTelegram = React.useCallback(async () => {
    const res = await getTelegramStatus().catch(() => null)
    if (res && !('error' in res)) setTgState(res)
  }, [])

  React.useEffect(() => {
    if (user) loadTelegram()
  }, [user, loadTelegram])

  const handleSaveBotConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    const val = botConfigInput.trim()
    if (!val || botConfigBusy) return
    setBotConfigBusy(true)
    haptic(8)
    try {
      const isToken = val.includes(':') && val.length > 20
      const res: any = await saveBotSettings({
        data: isToken ? { botToken: val } : { botName: val.replace('@', '') },
      })
      assertSaved(res)
      if (res?.ok) {
        setBotConfigInput('')
        setShowBotConfig(false)
        await loadTelegram()
        showInAppNotification({
          title: 'Бот успешно настроен 🌿',
          body: res.username ? `Бот @${res.username} подключен` : 'Настройки бота сохранены',
          icon: 'card',
        })
      }
    } catch(e:any){setTestError(e.message||'Не удалось настроить бота')} finally {
      setBotConfigBusy(false)
    }
  }

  const handleUnlinkTg = async () => {
    if (!confirm('Отвязать Telegram-бот от Листка?')) return
    haptic(8)
    setTgBusy(true)
    try {
      assertSaved(await unlinkTelegram())
      await loadTelegram()
      await refresh()
      showInAppNotification({
        title: 'Telegram отключен',
        body: 'Бот успешно отвязан от вашего аккаунта',
        icon: 'card',
      })
    } catch(e:any){setTestError(e.message||'Не удалось отключить Telegram')} finally {
      setTgBusy(false)
    }
  }

  const initials = (user?.displayName || user?.name || 'U')
    .slice(0, 2)
    .toUpperCase()

  const primaryHouse = React.useMemo(() => {
    return boot.houses && boot.houses.length > 0 ? boot.houses[0] : null
  }, [boot.houses])

  const now = new Date()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = Math.max(1, lastDay - now.getDate())
  const currentBudgetNum = Math.round(Number(budget.replace(/[^\d]/g, '') || 0))
  const dailyNorm = budgetNumbers(currentBudgetNum, boot.month.spent, boot.bills).daily

  React.useEffect(() => {
    if (!user) return
    setName(user.displayName || '')
    setPhone(user.phone || '')
    setBank(user.bank || '')
    setBudget(String(boot.settings.monthly_budget ?? 0))
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
    e.preventDefault();if(busy)return
    setBusy(true);setTestError(null)
    try {
      assertSaved(await saveProfile({data:{display_name:name,phone,bank}}))
      const amount=Number(budget.replace(/\s/g,''))
      if(!Number.isFinite(amount)||amount<0)throw new Error('Проверьте месячный лимит')
      assertSaved(await saveSettings({data:{monthly_budget:amount}}))
      setSaved(true);setTimeout(()=>setSaved(false),2000);await refresh()
    } catch(e:any){setTestError(e.message||'Не удалось сохранить. Ваши изменения остались в форме')}
    finally{setBusy(false)}
  }

  async function onEnablePush() {
    setBusy(true)
    setTestError(null)
    const res = await enablePush()
    if (res.ok && isNativeApp()) await syncNativeBillReminders(boot.bills)
    setPerm(pushState())
    setBusy(false)
    if (!res.ok) setTestError(res.error || 'Не получилось')
  }

  async function onTest() {
    setBusy(true)
    setTestResult(null)
    setTestError(null)

    if (isNativeApp()) {
      const shown = await sendNativeTestNotification()
      setBusy(false)
      if (shown) setTestResult('✓ Тестовое системное уведомление придёт через пару секунд — оно работает даже при свёрнутом Листке.')
      else setTestError('Android не смог запланировать уведомление. Проверьте разрешение в настройках приложения.')
      return
    }

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
        icon: 'card',
        url: '/settings',
      })
    } else {
      setTestResult(`устройств в канале: ${r.devices ?? 0}, ушло: ${r.sent ?? 0}`)
      if (r.error) setTestError(String(r.error))
    }
    setBusy(false)
  }

  async function onTestCheckin() {
    setBusy(true)
    setTestResult(null)
    setTestError(null)
    try {
      const res: any = await triggerEveningCheckin().catch((e: any) => ({ ok: false, error: e?.message }))
      if (res && res.ok) {
        setTestResult('✓ Вечерний чекин 21:00 отправлен! Сверните Листок, чтобы увидеть уведомление на экране.')
        showInAppNotification({
          title: '🌿 Листок · День экономии',
          body: 'День подошёл к концу. Листок сохранил 🌿 хороший день экономии!',
          icon: 'card',
          url: '/',
        })
      } else {
        setTestError(res?.error || 'Не удалось отправить вечерний чекин. Включите уведомления.')
      }
    } catch {
      setTestError('Ошибка отправки чекина')
    } finally {
      setBusy(false)
    }
  }

  async function onTestBillReminder() {
    setBusy(true)
    setTestResult(null)
    setTestError(null)
    try {
      const res: any = await tickBills().catch((e: any) => ({ ok: false, error: e?.message }))
      if (res && res.ok) {
        setTestResult('✓ Напоминание о счетах за 1 день отправлено!')
        showInAppNotification({
          title: '🔔 Завтра платёж: Подписка Листок',
          body: 'Завтра списание 350 ₽. Проверьте баланс на карте 💳',
          icon: 'card',
          url: '/bills',
        })
      } else {
        setTestError(res?.error || 'Не удалось отправить напоминание о счетах.')
      }
    } catch {
      setTestError('Ошибка проверки счетов')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="app-page settings-page">{testError&&<p className="form-error" role="alert">{testError}</p>}
      {/* 1. Верхняя навигационная панель с кнопкой возврата */}
      <header className="page-heading settings-heading">
        <div>
          <p className="eyebrow">ПРОФИЛЬ И ПРИЛОЖЕНИЕ</p>
          <h1>Настройки<span>.</span></h1>
          <p className="page-description">Бюджет, уведомления и способы быстро записывать расходы.</p>
        </div>
        <Link to="/" onClick={() => haptic(8)} className="secondary-action">
          <ArrowLeft size={16} />
          <span>К обзору</span>
        </Link>
      </header>

      {/* 2. Hero-карточка профиля */}
      <section className="surface settings-profile">
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
            <p className="truncate text-[12.5px] text-muted">{(user?.email?.endsWith('@chekagent.app') ? 'Личный аккаунт' : user?.email)}</p>
            {primaryHouse ? (
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-sage">
                <Users size={12} />
                <span className="truncate">Бюджет «{primaryHouse.name}»</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. Форма настроек: Бюджет и реквизиты */}
      <form onSubmit={save} className="settings-profile-form space-y-4">
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
              Базовый лимит на месяц. Исходя из него рассчитывается свободный остаток на день.
            </p>
          </div>
        </section>

        {/* Карточка: Реквизиты для переводов */}
        <section className="rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
          <div className="flex items-center gap-2 border-b border-rule/60 pb-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/12 text-sage">
              <Phone size={15} />
            </div>
            <div>
              <h2 className="t-display text-[15px] font-semibold text-ink">Реквизиты для переводов</h2>
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
              Участники совместного распределения бюджета увидят эти данные, чтобы перевести вам свою долю за общий чек.
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
      <section className="settings-notifications overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
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
            ? isNativeApp()
              ? 'На Android включены системные напоминания о счетах и вечерней проверке расходов.'
              : standalone
              ? 'Уведомления активны и приходят даже с заблокированным экраном.'
              : isIos()
              ? 'Разрешение выдано. Для работы при закрытом окне добавьте Листок на экран «Домой».'
              : 'Уведомления активны. Напоминания о чеках и счетах придут вовремя.'
            : 'Включите напоминания, чтобы не пропустить срок оплаты счетов и вечерний чекин.'}
        </p>

        {perm.granted && (
          <div className="rounded-[18px] border border-rule/70 bg-cream/40 p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-sage" />
                <span className="text-[13px] font-semibold text-ink">Вечерний чекин и счета</span>
              </div>
              <span className="rounded-full bg-sage/12 px-2 py-0.2 text-[10.5px] font-semibold text-sage">
                21:00 MSK
              </span>
            </div>
            <p className="text-[12px] text-muted leading-relaxed">
              В 21:00 Листок напомнит проверить траты за день. А за 1 день до списания ЖКХ, аренды или подписок заранее напомнит о счёте.
            </p>
          </div>
        )}

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
              <Bell size={15} />
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
                Нажмите для перехода к бюджету
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Telegram-бот для быстрой записи трат */}
      <section className="settings-telegram overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper space-y-3.5">
        <div className="flex items-center justify-between border-b border-rule/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/12 text-sky-600">
              <Bot size={16} />
            </div>
            <h2 className="t-display text-[15px] font-semibold text-ink">Telegram-бот</h2>
          </div>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold',
              tgState?.connected ? 'bg-sage/12 text-sage' : 'bg-rule text-muted',
            )}
          >
            {tgState?.connected ? 'Подключен ✓' : 'Не привязан'}
          </span>
        </div>

        {tgState?.connected ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-sage/30 bg-sage/8 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-onsage text-[13px] font-bold">
                  TG
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Привязанный аккаунт</span>
                  <span className="text-[13.5px] font-semibold text-ink">
                    {tgState.username || 'Telegram пользователь'}
                  </span>
                </div>
              </div>

              <a
                href={tgState.botUrl || `https://t.me/${tgState.botName}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => haptic(6)}
                className="flex items-center gap-1 rounded-lg bg-sage/15 px-2.5 py-1 text-[11.5px] font-semibold text-sage hover:underline"
              >
                <span>Чат</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="rounded-xl border border-rule/60 bg-paper/60 p-3 space-y-1.5 text-[12px] text-muted">
              <p className="font-semibold text-ink">Как записывать расходы прямо на ходу:</p>
              <p>Отправляйте боту в Telegram любые сообщения:</p>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <span className="rounded-lg bg-cream/70 p-1.5 font-mono text-[11px] text-ink">
                  «Такси 450»
                </span>
                <span className="rounded-lg bg-cream/70 p-1.5 font-mono text-[11px] text-ink">
                  «Пятёрочка 1820»
                </span>
                <span className="rounded-lg bg-cream/70 p-1.5 font-mono text-[11px] text-ink">
                  «Обед 620»
                </span>
                <span className="rounded-lg bg-cream/70 p-1.5 font-mono text-[11px] text-ink">
                  «/balance»
                </span>
              </div>
              <p className="pt-1 text-[11px]">
                Листок моментально вносит чек в журнал и показывает остаток на сегодня.
              </p>
            </div>

            <Button
              variant="paper"
              size="sm"
              disabled={tgBusy}
              onClick={handleUnlinkTg}
              className="w-full text-stamp hover:bg-stamp/10 border-stamp/30"
            >
              Отключить Telegram
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[12.5px] leading-relaxed text-muted">
              Записывайте расходы прямо на ходу за 2 секунды. Просто скиньте боту в Telegram сообщение вроде «Такси 450» или «Кофе 250», и трата сразу появится в Листке.
            </p>

            {tgState?.linkCode ? (
              <div className="rounded-xl border border-dashed border-rule/90 bg-cream/50 p-3 text-center space-y-2">
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                  Ваш код привязки бота:
                </span>
                <div className="inline-flex items-center gap-2 bg-paper px-3.5 py-1.5 rounded-xl border border-rule/80 shadow-xs">
                  <span className="font-mono text-[18px] font-bold tracking-widest text-ink select-all">
                    {tgState.linkCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      haptic(6)
                      navigator.clipboard?.writeText(tgState.linkCode || '')
                      setCopiedTgCode(true)
                      setTimeout(() => setCopiedTgCode(false), 2000)
                    }}
                    className="text-muted hover:text-ink p-1"
                    title="Скопировать код"
                  >
                    <Copy size={15} />
                  </button>
                </div>
                {copiedTgCode && (
                  <p className="text-[10.5px] text-sage font-medium">Код скопирован в буфер</p>
                )}
              </div>
            ) : null}

            {tgState?.isBotConfigured ? (
              <a
                href={tgState?.botUrl || `https://t.me/${tgState?.botName}?start=${tgState?.linkCode || ''}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => haptic(8)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-xs hover:bg-sky-700 transition"
              >
                <Send size={15} />
                <span>Подключить @{tgState.botName} в 1 клик</span>
              </a>
            ) : null}

            {/* Настройки сервиса доступны только администратору. */}
            {isAdmin && <div className="rounded-xl border border-rule/80 bg-cream/30 p-3 space-y-2 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">
                  {tgState?.isBotConfigured ? `Бот: @${tgState.botName}` : '⚙️ Настройка Telegram-бота'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowBotConfig(!showBotConfig)}
                  className="text-sage font-medium hover:underline text-[11.5px]"
                >
                  {showBotConfig ? 'Скрыть' : tgState?.isBotConfigured ? 'Изменить бота' : 'Вставить токен/имя'}
                </button>
              </div>

              {!tgState?.isBotConfigured || showBotConfig ? (
                <form onSubmit={handleSaveBotConfig} className="space-y-2 pt-1">
                  <p className="text-[11.5px] text-muted leading-relaxed">
                    Вставьте токен бота от @BotFather (например: <code className="text-ink">7123456...:AAF...</code>) или юзернейм вашего бота (например: <code className="text-ink">@my_finance_bot</code>):
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={botConfigInput}
                      onChange={(e) => setBotConfigInput(e.target.value)}
                      type="password" autoComplete="off" placeholder="Токен или @имя_бота"
                      className="h-9 rounded-xl text-[12.5px] flex-1 font-mono"
                    />
                    <Button
                      type="submit"
                      variant="sage"
                      size="sm"
                      disabled={!botConfigInput.trim() || botConfigBusy}
                      className="h-9 rounded-xl px-3 font-semibold shrink-0"
                    >
                      {botConfigBusy ? 'Сохраняем…' : 'Сохранить'}
                    </Button>
                  </div>
                </form>
              ) : null}
            </div>}
          </div>
        )}
      </section>

      <AccountSecurity/>
      {/* 6. Выход из аккаунта */}
      <div className="settings-signout overflow-hidden rounded-[20px] border border-rule/80 bg-paper shadow-paper divide-y divide-rule-soft">

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

      <div className="settings-version text-center pt-1 pb-2">
        <p className="text-[11px] text-muted">Листок · Версия 7.0 (2026)</p>
      </div>
    </div>

  )
}
