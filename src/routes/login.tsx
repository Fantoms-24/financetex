import { AccountSecurity } from '~/components/AccountSecurity'
import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Receipt,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Wallet,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Logo } from '~/components/Logo'
import { useApp } from '~/lib/app-state'
import { signIn, signUp } from '~/server/functions/auth'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/login')({
  component: Login,
})

type Mode = 'in' | 'up'

function Login() {
  const navigate = useNavigate()
  const { setSession, refresh } = useApp()
  const [mode, setMode] = React.useState<Mode>('in')
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setError(null)
    if (!login.trim()) return setError('Впишите логин для аккаунта')
    if (mode === 'up' && password.length < 8) return setError('Используйте пароль от 8 символов')

    setBusy(true)
    try {
      const res =
        mode === 'in'
          ? await signIn({ data: { login: login.trim(), password } })
          : await signUp({ data: { login: login.trim(), password, name: name.trim() } })

      if (!res || !res.ok || !res.token) {
        setError(res?.error || 'Не удалось войти. Проверьте логин и пароль.')
        setBusy(false)
        return
      }

      setSession(res.token, res.user)
      navigate({ to: '/', replace: true })
      refresh().catch(() => {})
    } catch (e: any) {
      console.error('[login] submit error:', e)
      const msg = e?.message || ''
      if (/500|failed to load/i.test(msg)) {
        setError('Сервис временно недоступен. Данные аккаунта не потеряны; попробуйте войти позже.')
      } else {
        setError(msg || 'Не удалось связаться с сервером')
      }
      setBusy(false)
    }
  }

  return (
    <div className="login-layout relative flex min-h-[100svh] flex-col justify-between overflow-x-hidden bg-cream">
      <aside className="login-story"><div className="login-wordmark">Листок.</div><div><p className="eyebrow">ВАШЕ ФИНАНСОВОЕ ПРОСТРАНСТВО</p><h2>Больше ясности.<br/>Меньше забот.</h2><p>Повседневные расходы, большие планы и общие деньги. Всё складывается в одном месте.</p><div className="login-story-features"><span><Receipt size={21}/>Сохраняйте покупки с фотографии</span><span><Wallet size={21}/>Планируйте месяц в своём темпе</span><span><Users size={21}/>Делитесь расходами с близкими</span></div></div><span className="login-story-footer">Личные деньги. Общие планы.</span></aside>
      {/* Мягкий фон с градиентным свечением */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[340px] w-[500px] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl"
      />

      <div className="login-form-column relative mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 pb-10 pt-[calc(env(safe-area-inset-top)+24px)]">
        {/* Хедер с логотипом и названием */}
        <header className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-[22px] bg-sage/15 blur-sm" />
            <div className="relative h-[76px] w-[76px] overflow-hidden rounded-[22px] border border-rule/80 bg-paper shadow-paper-lg transition-transform hover:scale-105">
              <img src="/logo.png" alt="Листок" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sage/20 bg-sage/8 px-3 py-0.5 text-[11.5px] font-medium tracking-wide text-sage">
            <Sparkles size={12} className="text-sage" />
            <span>Умный финансовый помощник</span>
          </div>

          <h1 className="t-display mt-2.5 text-[34px] font-semibold leading-none tracking-tight text-ink">
            Листок
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            {mode === 'in'
              ? 'Войдите, чтобы открыть свои чеки, бюджет и совместные накопления'
              : 'Создайте аккаунт за 10 секунд — без почты и смс'}
          </p>
        </header>

        {/* Переключатель режимов: Вход / Регистрация */}
        <div className="mt-6">
          <div className="relative flex rounded-2xl border border-rule/80 bg-paper/90 p-1.5 shadow-paper backdrop-blur-sm">
            <button
              type="button"
              id="auth-tab-signin"
              onClick={() => {
                setMode('in')
                setError(null)
              }}
              className={cn(
                'relative z-10 flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[12px] text-[14px] font-medium transition-all duration-200',
                mode === 'in'
                  ? 'bg-sage text-onsage shadow-sm'
                  : 'text-muted hover:text-ink',
              )}
            >
              <span>Войти</span>
            </button>
            <button
              type="button"
              id="auth-tab-signup"
              onClick={() => {
                setMode('up')
                setError(null)
              }}
              className={cn(
                'relative z-10 flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-[12px] text-[14px] font-medium transition-all duration-200',
                mode === 'up'
                  ? 'bg-sage text-onsage shadow-sm'
                  : 'text-muted hover:text-ink',
              )}
            >
              <span>Регистрация</span>
            </button>
          </div>
        </div>

        {/* Основная карточка формы */}
        <div className="mt-4 overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-5 shadow-paper-lg sm:p-6">
          <form onSubmit={submit} className="space-y-4">
            {mode === 'up' && (
              <div className="space-y-1.5">
                <label
                  htmlFor="auth-name"
                  className="block text-[12px] font-semibold uppercase tracking-wider text-muted"
                >
                  Ваше имя
                </label>
                <Input
                  id="auth-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  autoComplete="name"
                  startIcon={<User size={18} />}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="auth-login"
                  className="block text-[12px] font-semibold uppercase tracking-wider text-muted"
                >
                  Логин
                </label>
                <span className="text-[11px] text-muted">без символа @</span>
              </div>
              <Input
                id="auth-login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="alex"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="username"
                startIcon={<User size={18} />}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="auth-password"
                className="block text-[12px] font-semibold uppercase tracking-wider text-muted"
              >
                Пароль
              </label>
              <Input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'in' ? 'Ваш пароль' : 'Не менее 8 символов'}
                autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
                startIcon={<Lock size={18} />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink active:scale-95"
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-stamp/30 bg-stamp/8 p-3 text-[13px] leading-snug text-stamp"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              id="auth-submit-btn"
              type="submit"
              variant="sage"
              size="lg"
              disabled={busy}
              className="mt-2 w-full gap-2 rounded-xl text-[15.5px] font-medium shadow-md transition-all active:scale-[0.99]"
            >
              {busy ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Проверяем данные…</span>
                </>
              ) : mode === 'in' ? (
                <>
                  <span>Войти в аккаунт</span>
                  <ArrowRight size={17} />
                </>
              ) : (
                <>
                  <span>Зарегистрироваться</span>
                  <ArrowRight size={17} />
                </>
              )}
            </Button>
          </form>

          {mode==='in'&&<AccountSecurity recovery/>}
          {/* Преимущества / гарантии под формой */}
          <div className="mt-5 border-t border-rule/60 pt-4 text-[12px] text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0 text-sage" />
              <span>Личный бюджет доступен в вашем аккаунте</span>
            </div>
          </div>
        </div>

        {/* Быстрые фичи внизу */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage">
              <Receipt size={16} />
            </div>
            <span className="mt-1.5 text-[11px] font-medium text-ink">Сканер чеков</span>
            <span className="text-[10px] text-muted">Фото и QR</span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage">
              <Wallet size={16} />
            </div>
            <span className="mt-1.5 text-[11px] font-medium text-ink">Дневной бюджет</span>
            <span className="text-[10px] text-muted">Safe-to-Spend</span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-rule/50 bg-paper/60 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/10 text-sage">
              <Users size={16} />
            </div>
            <span className="mt-1.5 text-[11px] font-medium text-ink">«Вместе»</span>
            <span className="text-[10px] text-muted">Семья и копилки</span>
          </div>
        </div>

        {/* Подсказка PWA */}
        <p className="mt-5 text-center text-[12px] leading-relaxed text-muted">
          Приложение можно добавить на рабочий стол как PWA
          <br />для быстрых пуш-уведомлений и офлайн-доступа
        </p>
      </div>
    </div>
  )
}
