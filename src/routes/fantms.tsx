import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Bot,
  BrainCircuit,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Database,
  ExternalLink,
  KeyRound,
  Lock,
  LogOut,
  Moon,
  PieChart,
  RefreshCw,
  Send,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { money } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import {
  getFantmsStatus,
  initFantmsPassword,
  loginFantms,
  logoutFantms,
  changeFantmsPassword,
  getFantmsOverview,
  saveFantmsLlm,
  testFantmsLlm,
  saveFantmsTelegram,
  testFantmsTelegram,
  setFantmsWebhook,
  healDatabaseAction,
  triggerTickAction,
  triggerEveningAction,
} from '~/server/functions/admin-fantms'

export const Route = createFileRoute('/fantms')({
  component: FantmsAdminScreen,
})

const TOKEN_STORAGE_KEY = 'fantms_admin_auth_token_v1'

function FantmsAdminScreen() {
  const [token, setToken] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isInitialized, setIsInitialized] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // Поля авторизации и первой настройки
  const [setupPass, setSetupPass] = React.useState('')
  const [setupConfirm, setSetupConfirm] = React.useState('')
  const [loginPass, setLoginPass] = React.useState('')
  const [authError, setAuthError] = React.useState<string | null>(null)
  const [authBusy, setAuthBusy] = React.useState(false)

  // Активная вкладка админки
  const [tab, setTab] = React.useState<'overview' | 'llm' | 'telegram' | 'push' | 'security'>('overview')

  // Данные обзора
  const [overview, setOverview] = React.useState<any>(null)
  const [overviewBusy, setOverviewBusy] = React.useState(false)

  // Настройки LLM
  const [llmBaseUrl, setLlmBaseUrl] = React.useState('')
  const [llmModel, setLlmModel] = React.useState('')
  const [llmApiKey, setLlmApiKey] = React.useState('')
  const [hasLlmKey, setHasLlmKey] = React.useState(false)
  const [llmBusy, setLlmBusy] = React.useState(false)
  const [llmTestResult, setLlmTestResult] = React.useState<{ ok: boolean; pingMs?: number; reply?: string; error?: string } | null>(null)

  // Настройки Telegram
  const [tgToken, setTgToken] = React.useState('')
  const [tgName, setTgName] = React.useState('')
  const [tgBusy, setTgBusy] = React.useState(false)
  const [tgDiag, setTgDiag] = React.useState<any>(null)
  const [tgWebhookResult, setTgWebhookResult] = React.useState<string | null>(null)

  // Смена пароля
  const [oldPass, setOldPass] = React.useState('')
  const [newPass, setNewPass] = React.useState('')
  const [confirmNewPass, setConfirmNewPass] = React.useState('')
  const [passChangeMsg, setPassChangeMsg] = React.useState<string | null>(null)
  const [passChangeBusy, setPassChangeBusy] = React.useState(false)

  // Системные действия
  const [actionNotice, setActionNotice] = React.useState<string | null>(null)

  const checkStatus = React.useCallback(async () => {
    let savedToken: string | null = null
    try {
      savedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch {}

    setToken(savedToken)
    try {
      const res = await getFantmsStatus({ data: { token: savedToken } })
      setIsInitialized(Boolean(res.isInitialized))
      setIsAuthenticated(Boolean(res.isAuthenticated))
    } catch (err) {
      console.error('[fantms] Status check failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // Загрузка данных после входа
  const loadOverviewData = React.useCallback(async () => {
    if (!token) return
    setOverviewBusy(true)
    try {
      const res: any = await getFantmsOverview({ data: { token } })
      if (res && res.ok) {
        setOverview(res)
        if (res.services) {
          setLlmBaseUrl(res.services.llmBaseUrl || '')
          setLlmModel(res.services.llmModel || '')
          setHasLlmKey(Boolean(res.services.llmConfigured))
          setTgName(res.services.telegramBotName || '')
        }
      }
    } catch (e: any) {
      if (e?.message?.includes('UNAUTHORIZED')) {
        setIsAuthenticated(false)
        try {
          localStorage.removeItem(TOKEN_STORAGE_KEY)
        } catch {}
      }
    } finally {
      setOverviewBusy(false)
    }
  }, [token])

  React.useEffect(() => {
    if (isAuthenticated && token) {
      loadOverviewData()
    }
  }, [isAuthenticated, token, loadOverviewData])

  // 1. Первоначальная установка пароля
  const handleSetupPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    if (setupPass !== setupConfirm) {
      setAuthError('Пароли не совпадают')
      return
    }
    if (setupPass.length < 4) {
      setAuthError('Пароль должен содержать от 4 символов')
      return
    }
    setAuthBusy(true)
    haptic(8)
    try {
      const res: any = await initFantmsPassword({ data: { password: setupPass } })
      if (res && res.ok && res.token) {
        try {
          localStorage.setItem(TOKEN_STORAGE_KEY, res.token)
        } catch {}
        setToken(res.token)
        setIsInitialized(true)
        setIsAuthenticated(true)
        haptic(12)
      } else {
        setAuthError(res?.error || 'Не удалось сохранить пароль')
      }
    } finally {
      setAuthBusy(false)
    }
  }

  // 2. Вход по паролю
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    if (!loginPass.trim()) return
    setAuthBusy(true)
    haptic(8)
    try {
      const res: any = await loginFantms({ data: { password: loginPass } })
      if (res && res.ok && res.token) {
        try {
          localStorage.setItem(TOKEN_STORAGE_KEY, res.token)
        } catch {}
        setToken(res.token)
        setIsAuthenticated(true)
        haptic(12)
      } else {
        setAuthError(res?.error || 'Неверный мастер-пароль')
      }
    } finally {
      setAuthBusy(false)
    }
  }

  // 3. Выход
  const handleLogout = async () => {
    haptic(6)
    if (token) {
      await logoutFantms({ data: { token } }).catch(() => {})
    }
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {}
    setToken(null)
    setIsAuthenticated(false)
  }

  // 4. Сохранение LLM
  const handleSaveLlm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setLlmBusy(true)
    haptic(8)
    try {
      const res: any = await saveFantmsLlm({
        data: {
          token,
          baseUrl: llmBaseUrl,
          model: llmModel,
          apiKey: llmApiKey ? llmApiKey : undefined,
        },
      })
      if (res?.ok) {
        setHasLlmKey(res.hasKey)
        setLlmApiKey('')
        setActionNotice('Настройки ИИ сохранены ✓')
        setTimeout(() => setActionNotice(null), 3000)
        haptic(10)
      }
    } finally {
      setLlmBusy(false)
    }
  }

  // 5. Тест LLM
  const handleTestLlm = async () => {
    if (!token) return
    setLlmBusy(true)
    setLlmTestResult(null)
    haptic(6)
    try {
      const res: any = await testFantmsLlm({ data: { token } })
      setLlmTestResult(res)
      haptic(res.ok ? 10 : 4)
    } finally {
      setLlmBusy(false)
    }
  }

  // 6. Сохранение Telegram
  const handleSaveTelegram = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setTgBusy(true)
    haptic(8)
    try {
      const res: any = await saveFantmsTelegram({
        data: {
          token,
          botToken: tgToken ? tgToken : undefined,
          botName: tgName ? tgName : undefined,
        },
      })
      if (res?.ok) {
        setTgToken('')
        if (res.username) setTgName(res.username)
        setActionNotice('Настройки бота сохранены и привязаны ✓')
        setTimeout(() => setActionNotice(null), 3000)
        haptic(10)
        await handleDiagnoseTelegram()
      }
    } finally {
      setTgBusy(false)
    }
  }

  // 7. Диагностика Telegram
  const handleDiagnoseTelegram = async () => {
    if (!token) return
    setTgBusy(true)
    haptic(6)
    try {
      const res: any = await testFantmsTelegram({ data: { token } })
      setTgDiag(res)
    } finally {
      setTgBusy(false)
    }
  }

  // 8. Перепривязка Webhook
  const handleSetWebhook = async () => {
    if (!token) return
    setTgBusy(true)
    haptic(8)
    try {
      const res: any = await setFantmsWebhook({ data: { token } })
      setTgWebhookResult(res.description || 'Вебхук настроен')
      await handleDiagnoseTelegram()
      haptic(10)
    } finally {
      setTgBusy(false)
    }
  }

  // 9. Смена пароля
  const handleChangePass = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setPassChangeMsg(null)
    if (newPass !== confirmNewPass) {
      setPassChangeMsg('Новые пароли не совпадают')
      return
    }
    if (newPass.length < 4) {
      setPassChangeMsg('Пароль должен быть от 4 символов')
      return
    }
    setPassChangeBusy(true)
    haptic(8)
    try {
      const res: any = await changeFantmsPassword({
        data: { token, oldPass, newPass },
      })
      if (res?.ok) {
        setOldPass('')
        setNewPass('')
        setConfirmNewPass('')
        setPassChangeMsg('Мастер-пароль успешно изменён ✓')
        haptic(12)
      } else {
        setPassChangeMsg(res?.error || 'Ошибка смены пароля')
      }
    } finally {
      setPassChangeBusy(false)
    }
  }

  // 10. Восстановление БД (Heal)
  const handleHealDb = async () => {
    if (!token) return
    haptic(8)
    const res: any = await healDatabaseAction({ data: { token } })
    setActionNotice(`Проверка БД завершена: ${res.appliedCount} стейтментов проверено.`)
    setTimeout(() => setActionNotice(null), 4000)
    await loadOverviewData()
  }

  // 11. Ручной запуск напоминаний
  const handleTriggerTick = async () => {
    if (!token) return
    haptic(6)
    const res: any = await triggerTickAction({ data: { token } })
    setActionNotice(`Проверка счетов выполнена: отправлено ${res.alertsSent || 0} уведомлений.`)
    setTimeout(() => setActionNotice(null), 4000)
  }

  // 12. Ручной вечерний чекин
  const handleTriggerEvening = async () => {
    if (!token) return
    haptic(6)
    const res: any = await triggerEveningAction({ data: { token } })
    setActionNotice(`Вечерний чекин выполнен: обработано ${res.processed || 0} пользователей.`)
    setTimeout(() => setActionNotice(null), 4000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#151715] text-[#e3e8e3]">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="animate-spin text-emerald-500" size={24} />
          <p className="text-[13px] text-zinc-400">Загрузка панели управления…</p>
        </div>
      </div>
    )
  }

  // ==========================================
  // СЦЕНАРИЙ А: ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА ПАРОЛЯ
  // ==========================================
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111311] px-4 py-8 text-[#ecefec]">
        <div className="w-full max-w-[420px] rounded-[24px] border border-zinc-800 bg-[#191c19] p-6 shadow-2xl space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Shield size={22} />
            </div>
            <div>
              <h1 className="t-display text-[20px] font-bold text-white">Листок Control</h1>
              <span className="text-[12px] text-emerald-400 font-medium">Первоначальная настройка</span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/30 p-3 text-[12.5px] text-zinc-400 leading-relaxed">
            Добро пожаловать в административную панель! Задайте главный мастер-пароль. Он защитит настройки ИИ, базы данных и Telegram-бота от посторонних.
          </div>

          <form onSubmit={handleSetupPassword} className="space-y-3.5">
            <div>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                Новый мастер-пароль
              </label>
              <Input
                type="password"
                value={setupPass}
                onChange={(e) => setSetupPass(e.target.value)}
                placeholder="Минимум 4 символа"
                className="h-11 rounded-xl bg-black/40 border-zinc-700 text-white font-mono"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                Повторите пароль
              </label>
              <Input
                type="password"
                value={setupConfirm}
                onChange={(e) => setSetupConfirm(e.target.value)}
                placeholder="Повторите мастер-пароль"
                className="h-11 rounded-xl bg-black/40 border-zinc-700 text-white font-mono"
              />
            </div>

            {authError && (
              <p className="rounded-lg bg-red-500/15 border border-red-500/30 p-2.5 text-[12px] text-red-400">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              disabled={authBusy || !setupPass.trim()}
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-950/40"
            >
              {authBusy ? 'Сохранение…' : 'Установить пароль и войти 🚀'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // ==========================================
  // СЦЕНАРИЙ Б: ЭКРАН ВХОДА ДЛЯ АДМИНИСТРАТОРА
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111311] px-4 py-8 text-[#ecefec]">
        <div className="w-full max-w-[400px] rounded-[24px] border border-zinc-800 bg-[#191c19] p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Lock size={20} />
              </div>
              <div>
                <h1 className="t-display text-[20px] font-bold text-white">Листок Control</h1>
                <span className="text-[11.5px] text-zinc-400">Вход для администратора</span>
              </div>
            </div>

            <Link to="/" className="text-[12px] text-zinc-400 hover:text-white flex items-center gap-1">
              <span>В приложение</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                Мастер-пароль
              </label>
              <Input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="h-11 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[16px]"
              />
            </div>

            {authError && (
              <p className="rounded-lg bg-red-500/15 border border-red-500/30 p-2.5 text-[12px] text-red-400">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              disabled={authBusy || !loginPass.trim()}
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-950/40"
            >
              {authBusy ? 'Проверка…' : 'Войти в панель управления'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // ==========================================
  // СЦЕНАРИЙ В: ГЛАВНЫЙ COMMAND CENTER АДМИНИСТРАТОРА
  // ==========================================
  const metrics = overview?.metrics || {}

  return (
    <div className="min-h-screen bg-[#0e100e] pb-32 text-[#e4e7e4]">
      {/* 1. Верхний бар панели */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#141614]/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[960px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="t-display text-[16px] font-bold text-white leading-none">
                  Листок Control
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  RelaxDev Online
                </span>
              </div>
              <span className="text-[11px] text-zinc-400">Административная панель /fantms</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                haptic(6)
                loadOverviewData()
              }}
              disabled={overviewBusy}
              className="h-8 rounded-lg border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 text-[12px] gap-1 px-2.5"
            >
              <RefreshCw size={13} className={cn(overviewBusy && 'animate-spin')} />
              <span className="hidden sm:inline">Обновить</span>
            </Button>

            <Link to="/">
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-lg border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 text-[12px] gap-1 px-2.5"
              >
                <ArrowLeft size={13} />
                <span className="hidden sm:inline">В приложение</span>
              </Button>
            </Link>

            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="h-8 rounded-lg border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-[12px] gap-1 px-2.5"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Системное уведомление о действии */}
      {actionNotice && (
        <div className="bg-emerald-900/40 border-b border-emerald-800/60 px-4 py-2 text-center text-[12.5px] text-emerald-300 font-medium">
          {actionNotice}
        </div>
      )}

      {/* 2. Контейнер панели */}
      <main className="mx-auto max-w-[960px] p-4 sm:p-6 space-y-6">
        {/* Переключатель вкладок */}
        <nav className="flex flex-wrap gap-1.5 rounded-2xl border border-zinc-800 bg-[#161816] p-1.5 shadow-sm">
          {[
            { id: 'overview', label: '📊 Обзор и БД', icon: PieChart },
            { id: 'llm', label: '🧠 ИИ / Сканирование', icon: BrainCircuit },
            { id: 'telegram', label: '🤖 Telegram-бот', icon: Bot },
            { id: 'push', label: '🔔 Push и Тики', icon: Zap },
            { id: 'security', label: '🔐 Мастер-пароль', icon: KeyRound },
          ].map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  haptic(6)
                  setTab(item.id as any)
                }}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition active:scale-95',
                  active
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white',
                )}
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* ==================================================== */}
        {/* ВКЛАДКА 1: ОБЗОР, СТАТИСТИКА И БАЗА ДАННЫХ */}
        {/* ==================================================== */}
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Карточки метрик */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-[20px] border border-zinc-800 bg-[#161916] p-4 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Пользователи
                </span>
                <span className="t-display text-[26px] font-bold text-white block">
                  {metrics.users || 0}
                </span>
                <span className="text-[11px] text-zinc-500">Зарегистрировано</span>
              </div>

              <div className="rounded-[20px] border border-zinc-800 bg-[#161916] p-4 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Чеки в архиве
                </span>
                <span className="t-display text-[26px] font-bold text-white block">
                  {metrics.receipts || 0}
                </span>
                <span className="text-[11px] text-zinc-500">Всего покупок</span>
              </div>

              <div className="rounded-[20px] border border-zinc-800 bg-[#161916] p-4 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Сумма расходов
                </span>
                <span className="t-display text-[22px] font-bold text-emerald-400 block truncate">
                  {money(metrics.totalSpent || 0)}
                </span>
                <span className="text-[11px] text-zinc-500">По всем чекам</span>
              </div>

              <div className="rounded-[20px] border border-zinc-800 bg-[#161916] p-4 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Сплиты и Бюджеты
                </span>
                <span className="t-display text-[26px] font-bold text-white block">
                  {(metrics.houses || 0) + (metrics.splits || 0)}
                </span>
                <span className="text-[11px] text-zinc-500">
                  {metrics.houses || 0} групп • {metrics.splits || 0} сплитов
                </span>
              </div>
            </div>

            {/* Быстрые действия с базой и тиками */}
            <div className="rounded-[22px] border border-zinc-800 bg-[#161916] p-5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Database size={17} className="text-emerald-400" />
                  <h3 className="t-display text-[15px] font-bold text-white">
                    Операции с базой данных и фоновыми службами
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <Button
                  variant="outline"
                  onClick={handleHealDb}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 h-10 text-[12.5px]"
                >
                  <Database size={15} className="text-emerald-400" />
                  <span>Проверить схему БД (Heal)</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleTriggerTick}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 h-10 text-[12.5px]"
                >
                  <Calendar size={15} className="text-sky-400" />
                  <span>Тик напоминаний счетов</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleTriggerEvening}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 h-10 text-[12.5px]"
                >
                  <Moon size={15} className="text-amber-400" />
                  <span>Тик спокойных дней (21:00)</span>
                </Button>
              </div>
            </div>

            {/* Таблица последних зарегистрированных пользователей */}
            <div className="rounded-[22px] border border-zinc-800 bg-[#161916] overflow-hidden space-y-3">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-emerald-400" />
                  <h3 className="t-display text-[15px] font-bold text-white">
                    Последние зарегистрированные пользователи
                  </h3>
                </div>
                <span className="text-[12px] text-zinc-500">
                  Показано {overview?.recentUsers?.length || 0}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="border-b border-zinc-800 bg-black/20 text-[11px] uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="px-4 py-2.5">Имя</th>
                      <th className="px-4 py-2.5">Email</th>
                      <th className="px-4 py-2.5">Чеков</th>
                      <th className="px-4 py-2.5">Сумма расходов</th>
                      <th className="px-4 py-2.5">Дата регистрации</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {(overview?.recentUsers ?? []).map((u: any) => (
                      <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-white">{u.name || 'Пользователь'}</td>
                        <td className="px-4 py-2.5 font-mono text-[11.5px] text-zinc-400">{u.email}</td>
                        <td className="px-4 py-2.5">{u.receiptsCount}</td>
                        <td className="px-4 py-2.5 font-semibold text-emerald-400">
                          {money(u.spentTotal)}
                        </td>
                        <td className="px-4 py-2.5 text-zinc-500 text-[11.5px]">
                          {u.createdAt ? String(u.createdAt).slice(0, 16).replace('T', ' ') : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 2: ИИ И РАСПОЗНАВАНИЕ ЧЕКОВ */}
        {/* ==================================================== */}
        {tab === 'llm' && (
          <div className="rounded-[22px] border border-zinc-800 bg-[#161916] p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit size={18} className="text-emerald-400" />
                <div>
                  <h3 className="t-display text-[16px] font-bold text-white">
                    Настройка ИИ для оптического распознавания чеков
                  </h3>
                  <p className="text-[12px] text-zinc-400">
                    Любой совместимый OpenAI API (OpenAI, Tabitoken, OpenRouter, Proxy)
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                  hasLlmKey ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400',
                )}
              >
                {hasLlmKey ? 'API-ключ активен ✓' : 'Ключ не задан'}
              </span>
            </div>

            <form onSubmit={handleSaveLlm} className="space-y-4">
              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Base URL API
                </label>
                <Input
                  value={llmBaseUrl}
                  onChange={(e) => setLlmBaseUrl(e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[13px]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Модель нейросети (Vision)
                </label>
                <Input
                  value={llmModel}
                  onChange={(e) => setLlmModel(e.target.value)}
                  placeholder="gpt-4o-mini"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[13px]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  API-ключ
                </label>
                <Input
                  type="password"
                  value={llmApiKey}
                  onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder={hasLlmKey ? '•••••••••••••••• (ключ уже сохранён)' : 'sk-…'}
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[13px]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Button
                  type="submit"
                  disabled={llmBusy}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[13px] px-5"
                >
                  {llmBusy ? 'Сохраняем…' : 'Сохранить настройки ИИ'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestLlm}
                  disabled={llmBusy || !hasLlmKey}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-[13px]"
                >
                  <Zap size={14} className="text-amber-400" />
                  <span>Проверить связь с ИИ (Ping)</span>
                </Button>
              </div>
            </form>

            {/* Результат теста ИИ */}
            {llmTestResult && (
              <div
                className={cn(
                  'rounded-xl border p-3.5 text-[12.5px] space-y-1',
                  llmTestResult.ok
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-500/40 bg-red-500/10 text-red-300',
                )}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  {llmTestResult.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{llmTestResult.ok ? 'Связь с ИИ работает отлично!' : 'Ошибка подключения'}</span>
                  {llmTestResult.pingMs ? <span>({llmTestResult.pingMs} мс)</span> : null}
                </div>
                {llmTestResult.reply && <p>Ответ модели: «{llmTestResult.reply}»</p>}
                {llmTestResult.error && <p>{llmTestResult.error}</p>}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 3: TELEGRAM-БОТ И ВЕБХУК */}
        {/* ==================================================== */}
        {tab === 'telegram' && (
          <div className="rounded-[22px] border border-zinc-800 bg-[#161916] p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-sky-400" />
                <div>
                  <h3 className="t-display text-[16px] font-bold text-white">
                    Глобальные настройки Telegram-бота
                  </h3>
                  <p className="text-[12px] text-zinc-400">
                    Управление ботом для фиксации расходов на ходу через Telegram
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                  tgName ? 'bg-sky-500/20 text-sky-400' : 'bg-zinc-800 text-zinc-400',
                )}
              >
                {tgName ? `@${tgName}` : 'Бот не настроен'}
              </span>
            </div>

            <form onSubmit={handleSaveTelegram} className="space-y-4">
              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Токен бота от @BotFather
                </label>
                <Input
                  type="password"
                  value={tgToken}
                  onChange={(e) => setTgToken(e.target.value)}
                  placeholder="897...:AAF..."
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[13px]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Юзернейм бота (без @)
                </label>
                <Input
                  value={tgName}
                  onChange={(e) => setTgName(e.target.value)}
                  placeholder="my_finance_bot"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono text-[13px]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Button
                  type="submit"
                  disabled={tgBusy}
                  className="rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[13px] px-5"
                >
                  {tgBusy ? 'Сохраняем…' : 'Сохранить настройки бота'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDiagnoseTelegram}
                  disabled={tgBusy}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-[13px]"
                >
                  <Activity size={14} className="text-sky-400" />
                  <span>Проверить статус бота</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSetWebhook}
                  disabled={tgBusy}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-[13px]"
                >
                  <Send size={14} className="text-emerald-400" />
                  <span>Установить Webhook на этот сервер</span>
                </Button>
              </div>
            </form>

            {tgWebhookResult && (
              <p className="rounded-xl bg-sky-950/40 border border-sky-800/50 p-3 text-[12.5px] text-sky-300">
                {tgWebhookResult}
              </p>
            )}

            {/* Диагностика Telegram */}
            {tgDiag && (
              <div className="rounded-xl border border-zinc-800 bg-black/40 p-4 space-y-3 text-[12.5px]">
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Ответ Telegram API:</span>
                </h4>
                {tgDiag.botInfo ? (
                  <div className="grid grid-cols-2 gap-2 text-zinc-300 font-mono text-[12px]">
                    <div>Имя: <span className="text-white">{tgDiag.botInfo.first_name}</span></div>
                    <div>Username: <span className="text-sky-400">@{tgDiag.botInfo.username}</span></div>
                    <div>ID: <span className="text-zinc-400">{tgDiag.botInfo.id}</span></div>
                    <div>Бот активен: <span className="text-emerald-400">Да ✓</span></div>
                  </div>
                ) : null}

                {tgDiag.webhookInfo ? (
                  <div className="border-t border-zinc-800/80 pt-2 text-zinc-300 font-mono text-[11.5px] space-y-1">
                    <div>Webhook URL: <span className="text-zinc-400">{tgDiag.webhookInfo.url || 'Не установлен'}</span></div>
                    <div>Ожидает сообщений: <span className="text-zinc-400">{tgDiag.webhookInfo.pending_update_count || 0}</span></div>
                    {tgDiag.webhookInfo.last_error_message ? (
                      <div className="text-red-400">Последняя ошибка: {tgDiag.webhookInfo.last_error_message}</div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 4: PUSH-УВЕДОМЛЕНИЯ И VAPID */}
        {/* ==================================================== */}
        {tab === 'push' && (
          <div className="rounded-[22px] border border-zinc-800 bg-[#161916] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                <div>
                  <h3 className="t-display text-[16px] font-bold text-white">
                    Web Push & VAPID инфраструктура
                  </h3>
                  <p className="text-[12px] text-zinc-400">
                    Доставка уведомлений на телефоны (iOS PWA / Android)
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                {metrics.pushSubscribers || 0} устройств
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Публичный VAPID-ключ (Application Server Key)
                </label>
                <div className="rounded-xl border border-zinc-800 bg-black/40 p-2.5 font-mono text-[11.5px] text-zinc-300 break-all select-all">
                  {overview?.services?.vapidPublicKey || 'Ключ генерируется сервером автоматически'}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={handleTriggerTick}
                  className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-[13px]"
                >
                  <Calendar size={14} className="text-sky-400" />
                  <span>Проверить и отправить напоминания по счетам прямо сейчас</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 5: СМЕНА МАСТЕР-ПАРОЛЯ */}
        {/* ==================================================== */}
        {tab === 'security' && (
          <div className="rounded-[22px] border border-zinc-800 bg-[#161916] p-5 space-y-4">
            <div className="border-b border-zinc-800 pb-3">
              <h3 className="t-display text-[16px] font-bold text-white flex items-center gap-2">
                <KeyRound size={18} className="text-emerald-400" />
                <span>Смена мастер-пароля администратора</span>
              </h3>
              <p className="text-[12px] text-zinc-400">
                Задайте новый мастер-пароль для входа в `/fantms`
              </p>
            </div>

            <form onSubmit={handleChangePass} className="space-y-3.5 max-w-[360px]">
              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Текущий пароль
                </label>
                <Input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Текущий пароль"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Новый пароль
                </label>
                <Input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Минимум 4 символа"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-zinc-400">
                  Повторите новый пароль
                </label>
                <Input
                  type="password"
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  placeholder="Повторите пароль"
                  className="h-10 rounded-xl bg-black/40 border-zinc-700 text-white font-mono"
                />
              </div>

              {passChangeMsg && (
                <p
                  className={cn(
                    'rounded-xl border p-2.5 text-[12px]',
                    passChangeMsg.includes('✓')
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-red-500/40 bg-red-500/10 text-red-300',
                  )}
                >
                  {passChangeMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={passChangeBusy || !oldPass.trim() || !newPass.trim()}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[13px] px-5"
              >
                {passChangeBusy ? 'Сохраняем…' : 'Обновить мастер-пароль'}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
