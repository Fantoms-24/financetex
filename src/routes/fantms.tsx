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
  FileText,
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
      <div className="flex min-h-screen items-center justify-center bg-[#0c0e0c] text-zinc-300">
        <div className="flex flex-col items-center gap-2.5">
          <RefreshCw className="animate-spin text-emerald-400" size={22} />
          <p className="text-[12px] text-zinc-400 font-mono">Загрузка панели управления…</p>
        </div>
      </div>
    )
  }

  // ==========================================
  // СЦЕНАРИЙ А: ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА ПАРОЛЯ
  // ==========================================
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0e0c] px-4 py-8 text-zinc-200">
        <div className="w-full max-w-[360px] rounded-2xl border border-zinc-800/80 bg-[#141614] p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
              <Shield size={17} />
            </div>
            <div>
              <h1 className="text-[15px] font-semibold text-white leading-tight">Листок Control</h1>
              <span className="text-[11px] text-emerald-400">Первичная настройка доступа</span>
            </div>
          </div>

          <p className="text-[11.5px] text-zinc-400 leading-relaxed">
            Задайте мастер-пароль. Он защитит ключи ИИ, базу данных и Telegram-бота.
          </p>

          <form onSubmit={handleSetupPassword} className="space-y-3">
            <div>
              <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                Новый мастер-пароль
              </label>
              <input
                type="password"
                value={setupPass}
                onChange={(e) => setSetupPass(e.target.value)}
                placeholder="Минимум 4 символа"
                className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                Повторите пароль
              </label>
              <input
                type="password"
                value={setupConfirm}
                onChange={(e) => setSetupConfirm(e.target.value)}
                placeholder="Повторите пароль"
                className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none"
              />
            </div>

            {authError && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/25 p-2.5 text-[12px] text-red-400">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authBusy || !setupPass.trim()}
              className="w-full h-10 sm:h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-[13px] font-medium transition shadow-xs disabled:opacity-50 touch-manipulation"
            >
              {authBusy ? 'Сохранение…' : 'Установить пароль и войти'}
            </button>
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
      <div className="flex min-h-screen items-center justify-center bg-[#0c0e0c] px-4 py-8 text-zinc-200">
        <div className="w-full max-w-[360px] rounded-2xl border border-zinc-800/80 bg-[#141614] p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <Lock size={16} />
              </div>
              <div>
                <h1 className="text-[15px] font-semibold text-white leading-tight">Листок Control</h1>
                <span className="text-[11px] text-zinc-400">Вход для администратора</span>
              </div>
            </div>

            <Link to="/" className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition">
              <span>В приложение</span>
              <ExternalLink size={11} />
            </Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                Мастер-пароль
              </label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[14px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none"
              />
            </div>

            {authError && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/25 p-2.5 text-[12px] text-red-400">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authBusy || !loginPass.trim()}
              className="w-full h-10 sm:h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-[13px] font-medium transition shadow-xs disabled:opacity-50 touch-manipulation"
            >
              {authBusy ? 'Проверка…' : 'Войти в панель'}
            </button>
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
    <div className="min-h-screen bg-[#0c0e0c] pb-[max(env(safe-area-inset-bottom),32px)] text-zinc-200">
      {/* 1. Верхний бар панели (с учётом iOS Safe Area и Dynamic Island) */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#111311]/95 backdrop-blur-xl px-3 sm:px-6 pt-[max(env(safe-area-inset-top),10px)] pb-2.5 sm:pb-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="flex h-8 w-8 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-xl sm:rounded-lg bg-emerald-500/15 text-emerald-400 font-bold text-[14px] sm:text-[13px]">
              🌿
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13.5px] sm:text-[14px] font-semibold text-white leading-none truncate">
                  Листок Control
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-zinc-400 font-mono block truncate">/fantms</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                haptic(6)
                loadOverviewData()
              }}
              disabled={overviewBusy}
              title="Обновить данные"
              className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-7 px-2.5 text-[11.5px] font-medium rounded-xl sm:rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition active:scale-95 disabled:opacity-50 touch-manipulation"
            >
              <RefreshCw size={12} className={cn(overviewBusy && 'animate-spin text-emerald-400')} />
              <span className="hidden md:inline">Обновить</span>
            </button>

            <Link
              to="/"
              title="Перейти в приложение Листок"
              className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-7 px-2.5 text-[11.5px] font-medium rounded-xl sm:rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition active:scale-95 touch-manipulation"
            >
              <ArrowLeft size={12} />
              <span className="hidden sm:inline">В приложение</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              title="Выйти из админки"
              className="inline-flex items-center justify-center gap-1 h-8 sm:h-7 px-2.5 sm:px-2 text-[11.5px] font-medium rounded-xl sm:rounded-lg border border-red-900/30 bg-red-950/20 hover:bg-red-950/40 text-red-400 transition active:scale-95 touch-manipulation"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Системное уведомление о действии */}
      {actionNotice && (
        <div className="mx-auto max-w-5xl px-3 sm:px-4 pt-2.5">
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-300">
            <span className="flex items-center gap-1.5 font-medium min-w-0 truncate">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span className="truncate">{actionNotice}</span>
            </span>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-zinc-400 hover:text-white text-[13px] ml-2 shrink-0 touch-manipulation"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 2. Контейнер панели */}
      <main className="mx-auto max-w-5xl p-3 sm:p-6 space-y-3.5 sm:space-y-5">
        {/* Переключатель вкладок (эластичный Apple-свайп бар) */}
        <nav
          className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth rounded-2xl border border-zinc-800/80 bg-[#141614] p-1.5 shadow-xs touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[
            { id: 'overview', label: 'Обзор и БД', icon: PieChart },
            { id: 'llm', label: 'ИИ / Сканы', icon: BrainCircuit },
            { id: 'telegram', label: 'Telegram-бот', icon: Bot },
            { id: 'push', label: 'Push и Тики', icon: Zap },
            { id: 'security', label: 'Безопасность', icon: KeyRound },
          ].map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  haptic(4)
                  setTab(item.id as any)
                }}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-3 sm:px-3.5 py-2 text-[12px] sm:text-[12.5px] font-medium transition whitespace-nowrap shrink-0 touch-manipulation active:scale-95',
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent',
                )}
              >
                <item.icon size={13} className={cn(active ? 'text-emerald-400' : 'text-zinc-400')} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* ==================================================== */}
        {/* ВКЛАДКА 1: ОБЗОР, СТАТИСТИКА И БАЗА ДАННЫХ */}
        {/* ==================================================== */}
        {tab === 'overview' && (
          <div className="space-y-4">
            {/* Карточки метрик: 2 колонки на мобилке, 4 на десктопе */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Card 1: Users */}
              <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-3 sm:p-3.5 flex flex-col justify-between hover:border-zinc-700/60 transition">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
                    Пользователи
                  </span>
                  <Users size={14} className="text-zinc-400" />
                </div>
                <div className="my-1.5">
                  <span className="text-[22px] font-bold text-white tracking-tight font-mono tabular-nums">
                    {metrics.users || 0}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">Зарегистрировано</span>
              </div>

              {/* Card 2: Receipts */}
              <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-3 sm:p-3.5 flex flex-col justify-between hover:border-zinc-700/60 transition">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
                    Чеки в архиве
                  </span>
                  <FileText size={14} className="text-zinc-400" />
                </div>
                <div className="my-1.5">
                  <span className="text-[22px] font-bold text-white tracking-tight font-mono tabular-nums">
                    {metrics.receipts || 0}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">Всего покупок</span>
              </div>

              {/* Card 3: Expenses sum */}
              <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-3 sm:p-3.5 flex flex-col justify-between hover:border-zinc-700/60 transition">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
                    Сумма расходов
                  </span>
                  <Wallet size={14} className="text-emerald-400/80" />
                </div>
                <div className="my-1.5">
                  <span className="text-[20px] font-bold text-emerald-400 tracking-tight font-mono tabular-nums truncate block">
                    {money(metrics.totalSpent || 0)}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">По всем аккаунтам</span>
              </div>

              {/* Card 4: Splits & houses */}
              <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-3 sm:p-3.5 flex flex-col justify-between hover:border-zinc-700/60 transition">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
                    Сплиты & Группы
                  </span>
                  <PieChart size={14} className="text-zinc-400" />
                </div>
                <div className="my-1.5">
                  <span className="text-[22px] font-bold text-white tracking-tight font-mono tabular-nums">
                    {(metrics.houses || 0) + (metrics.splits || 0)}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  {metrics.houses || 0} групп · {metrics.splits || 0} сплитов
                </span>
              </div>
            </div>

            {/* Сервисные операции и регламенты (аккуратный список без наложений) */}
            <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2.5">
                <Database size={15} className="text-emerald-400" />
                <h3 className="text-[13px] font-semibold text-white">
                  Сервисные операции и регламенты
                </h3>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {/* 1. Heal DB */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 first:pt-0 last:pb-0 gap-2">
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 sm:mt-0">
                      <Database size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium text-white">Целостность базы данных (Heal)</div>
                      <div className="text-[11px] text-zinc-400">Проверить таблицы, колонки и применить недостающие структуры</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleHealDb}
                    className="inline-flex items-center justify-center gap-1.5 h-7 px-3 text-[11.5px] font-medium rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition shrink-0 active:scale-95 self-start sm:self-auto"
                  >
                    <Database size={12} className="text-emerald-400" />
                    <span>Проверить БД</span>
                  </button>
                </div>

                {/* 2. Bill reminders */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 first:pt-0 last:pb-0 gap-2">
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 mt-0.5 sm:mt-0">
                      <Calendar size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium text-white">Напоминания по счетам</div>
                      <div className="text-[11px] text-zinc-400">Найти приближающиеся платежи (за 1 день) и отправить push</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerTick}
                    className="inline-flex items-center justify-center gap-1.5 h-7 px-3 text-[11.5px] font-medium rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition shrink-0 active:scale-95 self-start sm:self-auto"
                  >
                    <Calendar size={12} className="text-sky-400" />
                    <span>Запустить тик</span>
                  </button>
                </div>

                {/* 3. Evening check-in */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 first:pt-0 last:pb-0 gap-2">
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 mt-0.5 sm:mt-0">
                      <Moon size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium text-white">Вечерний чекин (21:00)</div>
                      <div className="text-[11px] text-zinc-400">Подвести итоги лимитов дня и отправить уведомление экономии</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerEvening}
                    className="inline-flex items-center justify-center gap-1.5 h-7 px-3 text-[11.5px] font-medium rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition shrink-0 active:scale-95 self-start sm:self-auto"
                  >
                    <Moon size={12} className="text-amber-400" />
                    <span>Запустить чекин</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Таблица последних зарегистрированных пользователей */}
            <div className="rounded-xl border border-zinc-800/80 bg-[#141614] overflow-hidden">
              <div className="p-3 sm:p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-emerald-400" />
                  <h3 className="text-[13px] font-semibold text-white">
                    Зарегистрированные пользователи
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Всего: {overview?.recentUsers?.length || 0}
                </span>
              </div>

              {/* Mobile View: Inset Grouped card list (sm:hidden) */}
              <div className="sm:hidden divide-y divide-zinc-800/60">
                {(overview?.recentUsers ?? []).length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-500">Пользователей пока нет</div>
                ) : (
                  (overview?.recentUsers ?? []).map((u: any) => (
                    <div key={u.id} className="p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                            {(u.name || u.email || 'U').slice(0, 1).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-semibold text-white truncate">
                              {u.name || 'Пользователь'}
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400 truncate">
                              {u.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[13px] font-mono font-bold text-emerald-400 tabular-nums">
                            {money(u.spentTotal)}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">расходы</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] text-zinc-400 pt-1 border-t border-zinc-800/40 font-mono">
                        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/70 px-1.5 py-0.5 text-zinc-300">
                          📄 {u.receiptsCount} {u.receiptsCount === 1 ? 'чек' : u.receiptsCount > 1 && u.receiptsCount < 5 ? 'чека' : 'чеков'}
                        </span>
                        <span className="text-zinc-500">
                          {u.createdAt ? String(u.createdAt).slice(0, 10) : '—'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop View: Full data table (hidden sm:block) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead className="border-b border-zinc-800/80 bg-black/30 text-[10.5px] uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="px-3.5 py-2 font-medium">Имя</th>
                      <th className="px-3.5 py-2 font-medium">Email</th>
                      <th className="px-3.5 py-2 font-medium">Чеков</th>
                      <th className="px-3.5 py-2 font-medium">Сумма расходов</th>
                      <th className="px-3.5 py-2 font-medium">Регистрация</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                    {(overview?.recentUsers ?? []).map((u: any) => (
                      <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-3.5 py-2 font-medium text-white">{u.name || 'Пользователь'}</td>
                        <td className="px-3.5 py-2 font-mono text-[11.5px] text-zinc-400">{u.email}</td>
                        <td className="px-3.5 py-2 font-mono">{u.receiptsCount}</td>
                        <td className="px-3.5 py-2 font-mono font-medium text-emerald-400">
                          {money(u.spentTotal)}
                        </td>
                        <td className="px-3.5 py-2 text-zinc-400 text-[11px] font-mono whitespace-nowrap">
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
          <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit size={17} className="text-emerald-400" />
                <div>
                  <h3 className="text-[14px] font-semibold text-white">
                    ИИ для оптического распознавания чеков
                  </h3>
                  <p className="text-[11.5px] text-zinc-400">
                    OpenAI-совместимый API (OpenRouter, Gemini, OpenAI)
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10.5px] font-medium',
                  hasLlmKey ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30',
                )}
              >
                {hasLlmKey ? 'Ключ задан ✓' : 'Ключ не задан'}
              </span>
            </div>

            <form onSubmit={handleSaveLlm} className="space-y-3">
              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Base URL API
                </label>
                <input
                  value={llmBaseUrl}
                  onChange={(e) => setLlmBaseUrl(e.target.value)}
                  placeholder="https://openrouter.ai/api/v1"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Модель нейросети (Vision)
                </label>
                <input
                  value={llmModel}
                  onChange={(e) => setLlmModel(e.target.value)}
                  placeholder="google/gemini-2.5-flash"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  API-ключ
                </label>
                <input
                  type="password"
                  value={llmApiKey}
                  onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder={hasLlmKey ? '•••••••••••••••• (ключ сохранён)' : 'sk-or-v1-…'}
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={llmBusy}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-4 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95 disabled:opacity-50 touch-manipulation shadow-xs"
                >
                  {llmBusy ? 'Сохраняем…' : 'Сохранить настройки'}
                </button>

                <button
                  type="button"
                  onClick={handleTestLlm}
                  disabled={llmBusy || !hasLlmKey}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-3.5 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition active:scale-95 disabled:opacity-50 touch-manipulation"
                >
                  <Zap size={12} className="text-amber-400" />
                  <span>Проверить Ping</span>
                </button>
              </div>
            </form>

            {/* Результат теста ИИ */}
            {llmTestResult && (
              <div
                className={cn(
                  'rounded-lg border p-3 text-[12px] space-y-1',
                  llmTestResult.ok
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-500/40 bg-red-500/10 text-red-300',
                )}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  {llmTestResult.ok ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{llmTestResult.ok ? 'Связь с ИИ работает штатно' : 'Ошибка подключения'}</span>
                  {llmTestResult.pingMs ? <span className="font-mono font-normal">({llmTestResult.pingMs} мс)</span> : null}
                </div>
                {llmTestResult.reply && <p className="text-zinc-300">Ответ модели: «{llmTestResult.reply}»</p>}
                {llmTestResult.error && <p className="text-red-400">{llmTestResult.error}</p>}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 3: TELEGRAM-БОТ И ВЕБХУК */}
        {/* ==================================================== */}
        {tab === 'telegram' && (
          <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Bot size={17} className="text-sky-400" />
                <div>
                  <h3 className="text-[14px] font-semibold text-white">
                    Настройки Telegram-бота
                  </h3>
                  <p className="text-[11.5px] text-zinc-400">
                    Бот для мгновенного добавления расходов из Telegram
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10.5px] font-medium',
                  tgName ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'bg-zinc-800 text-zinc-400',
                )}
              >
                {tgName ? `@${tgName}` : 'Бот не настроен'}
              </span>
            </div>

            <form onSubmit={handleSaveTelegram} className="space-y-3">
              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Токен бота от @BotFather
                </label>
                <input
                  type="password"
                  value={tgToken}
                  onChange={(e) => setTgToken(e.target.value)}
                  placeholder="897...:AAF..."
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-sky-500/60 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Юзернейм бота (без @)
                </label>
                <input
                  value={tgName}
                  onChange={(e) => setTgName(e.target.value)}
                  placeholder="my_finance_bot"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-sky-500/60 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={tgBusy}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-4 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition active:scale-95 disabled:opacity-50 touch-manipulation shadow-xs"
                >
                  {tgBusy ? 'Сохраняем…' : 'Сохранить настройки'}
                </button>

                <button
                  type="button"
                  onClick={handleDiagnoseTelegram}
                  disabled={tgBusy}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-3.5 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition active:scale-95 disabled:opacity-50 touch-manipulation"
                >
                  <Activity size={12} className="text-sky-400" />
                  <span>Проверить статус</span>
                </button>

                <button
                  type="button"
                  onClick={handleSetWebhook}
                  disabled={tgBusy}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-3.5 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg border border-emerald-600/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 transition active:scale-95 disabled:opacity-50 touch-manipulation"
                >
                  <Send size={12} className="text-emerald-400" />
                  <span>Установить Webhook в 1 клик</span>
                </button>
              </div>
            </form>

            {tgWebhookResult && (
              <p className="rounded-lg bg-sky-950/30 border border-sky-800/40 p-2.5 text-[12px] text-sky-300 font-mono">
                {tgWebhookResult}
              </p>
            )}

            {/* Диагностика Telegram */}
            {tgDiag && (
              <div className="rounded-lg border border-zinc-800/80 bg-black/30 p-3.5 space-y-2.5 text-[12px]">
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Ответ Telegram API:</span>
                </h4>
                {tgDiag.botInfo ? (
                  <div className="grid grid-cols-2 gap-2 text-zinc-300 font-mono text-[11.5px]">
                    <div>Имя: <span className="text-white">{tgDiag.botInfo.first_name}</span></div>
                    <div>Username: <span className="text-sky-400">@{tgDiag.botInfo.username}</span></div>
                    <div>ID: <span className="text-zinc-400">{tgDiag.botInfo.id}</span></div>
                    <div>Статус: <span className="text-emerald-400">Активен ✓</span></div>
                  </div>
                ) : null}

                {tgDiag.webhookInfo ? (
                  <div className="border-t border-zinc-800/60 pt-2 text-zinc-300 font-mono text-[11px] space-y-1">
                    <div>Webhook: <span className="text-zinc-400">{tgDiag.webhookInfo.url || 'Не установлен'}</span></div>
                    <div>Очередь сообщений: <span className="text-zinc-400">{tgDiag.webhookInfo.pending_update_count || 0}</span></div>
                    {tgDiag.webhookInfo.last_error_message ? (
                      <div className="text-red-400">Ошибка доставки: {tgDiag.webhookInfo.last_error_message}</div>
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
          <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Zap size={17} className="text-amber-400" />
                <div>
                  <h3 className="text-[14px] font-semibold text-white">
                    Web Push и VAPID инфраструктура
                  </h3>
                  <p className="text-[11.5px] text-zinc-400">
                    Доставка уведомлений на телефоны (iOS PWA / Android)
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10.5px] font-medium text-amber-400">
                {metrics.pushSubscribers || 0} устройств
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Публичный VAPID-ключ (Application Server Key)
                </label>
                <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 font-mono text-[11px] sm:text-[12px] text-zinc-300 break-all select-all leading-relaxed">
                  {overview?.services?.vapidPublicKey || 'Ключ сгенерирован сервером автоматически'}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleTriggerTick}
                  className="inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-4 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg border border-zinc-700/70 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 transition active:scale-95 touch-manipulation"
                >
                  <Calendar size={12} className="text-sky-400" />
                  <span>Отправить напоминания по счетам прямо сейчас</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* ВКЛАДКА 5: СМЕНА МАСТЕР-ПАРОЛЯ */}
        {/* ==================================================== */}
        {tab === 'security' && (
          <div className="rounded-xl border border-zinc-800/80 bg-[#141614] p-4 sm:p-5 space-y-3.5">
            <div className="border-b border-zinc-800/80 pb-3">
              <h3 className="text-[14px] font-semibold text-white flex items-center gap-2">
                <KeyRound size={16} className="text-emerald-400" />
                <span>Смена мастер-пароля администратора</span>
              </h3>
              <p className="text-[11.5px] text-zinc-400">
                Задайте новый мастер-пароль для входа в `/fantms`
              </p>
            </div>

            <form onSubmit={handleChangePass} className="space-y-3 max-w-[360px]">
              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Текущий пароль
                </label>
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Текущий пароль"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Новый пароль
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Минимум 4 символа"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                  Повторите новый пароль
                </label>
                <input
                  type="password"
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  placeholder="Повторите пароль"
                  className="h-10 sm:h-9 w-full rounded-xl bg-black/40 border border-zinc-800 text-white font-mono text-[16px] sm:text-[13px] px-3.5 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none transition"
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

              <button
                type="submit"
                disabled={passChangeBusy || !oldPass.trim() || !newPass.trim()}
                className="w-full sm:w-auto h-10 sm:h-8 px-5 text-[13px] sm:text-[12px] font-medium rounded-xl sm:rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95 disabled:opacity-50 touch-manipulation shadow-xs"
              >
                {passChangeBusy ? 'Сохраняем…' : 'Обновить пароль'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

