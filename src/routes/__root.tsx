/// <reference types="vite/client" />
import * as React from 'react'
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import { AppStateProvider, useApp } from '~/lib/app-state'
import { Nav } from '~/components/Nav'
import { Workspace } from '~/components/Workspace'
import { SplashScreen } from '~/components/SplashScreen'
import { NotificationBanner } from '~/components/NotificationBanner'
import { Onboarding } from '~/components/Onboarding'
import { PushNudge } from '~/components/PushNudge'
import { enablePush, pushState, registerSW } from '~/lib/push-client'
import { prepareNativeShell } from '~/lib/native'
import '~/styles/app.css'
import '~/styles/workspace.css'
import '~/styles/everyday.css'

const useSafeLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
      },
      { title: 'Листок. — карманный финансист' },
      {
        name: 'description',
        content: 'Карманный финансист. Чеки, дневной бюджет и общие накопления на одном листке.',
      },
      { name: 'theme-color', content: '#f4f6f8' },
      { name: 'color-scheme', content: 'light dark' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'Листок.' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    links: [
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'preload', as: 'image', href: '/assets/budget-growth-v1.webp', type: 'image/webp' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
    styles: [
      {
        children:
          '*,*::before,*::after{box-sizing:border-box}html,body{margin:0;padding:0;overflow-x:hidden;width:100%;max-width:100%}html{background:#f4f6f8}',
      },
    ],
  }),
  // Start 1.168 не рисует документ сам: без shellComponent наружу уходит
  // только фрагмент — ни <html>, ни <head>, ни подключённого CSS.
  // Тогда страница пустая, а PWA не видит manifest и theme-color.
  shellComponent: RootDocument,
  errorComponent: ({ error }) => (
    <div className="sheet items-center justify-center px-6 text-center">
      <div className="receipt-card rise w-full p-6">
        <p className="t-display text-[19px]">Не получилось открыть</p>
        <p className="t-muted mt-2 text-[14px]">{(error as Error)?.message || 'Попробуйте обновить'}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="sheet items-center justify-center px-6 text-center">
      <div className="receipt-card rise w-full p-6">
        <p className="t-display text-[19px]">Такого листка нет</p>
        <a href="/" className="mt-3 inline-block text-sage underline">
          На меню
        </a>
      </div>
    </div>
  ),
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem('listok-theme')==='dark';document.documentElement.dataset.theme=d?'dark':'light';if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  )
}

function Shell() {
  const { ready, user, boot, refresh } = useApp()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()
  const [leavingForLogin, setLeavingForLogin] = React.useState(false)

  useSafeLayoutEffect(() => {
    void registerSW()
    void prepareNativeShell()
  }, [])

  const isPublicRoute =
    pathname === '/login' || pathname.startsWith('/split/') || pathname.startsWith('/fantms')

  React.useEffect(() => {
    if (!ready) return
    if (!user && !isPublicRoute) {
      // Сначала остаёмся на фирменном экране загрузки, затем мягко открываем
      // вход. Так «Обзор» никогда не успевает появиться между ними.
      setLeavingForLogin(true)
      const timer = window.setTimeout(() => {
        navigate({ to: '/login', replace: true })
      }, 180)
      return () => window.clearTimeout(timer)
    } else if (user && pathname === '/login') {
      navigate({ to: '/', replace: true })
    }
    setLeavingForLogin(false)
  }, [ready, user, pathname, navigate, isPublicRoute])

  React.useEffect(() => {
    const goHome = () => {
      if (pathname !== '/') navigate({ to: '/', replace: true })
    }
    window.addEventListener('listok:android-back-home', goHome)
    return () => window.removeEventListener('listok:android-back-home', goHome)
  }, [pathname, navigate])

  React.useEffect(() => {
    if (!user) return
    const state = pushState()
    if (state.granted) {
      void enablePush().catch(() => {})
    }
  }, [user?.id])

  const bare = pathname === '/login' || pathname.startsWith('/split/') || pathname.startsWith('/fantms')
  const isChat = pathname === '/agent' || pathname.startsWith('/agent/')
  const hideNav = bare || isChat

  // Пока не знаем, вошли ли — стильный загрузочный экран с тактильной анимацией
  // Даже при прямом открытии /login сначала показываем фирменную загрузку.
  // Исключения — только публичная страница общего счёта и отдельная админка.
  if (!ready && (pathname === '/login' || !isPublicRoute)) {
    return <SplashScreen />
  }

  // Неавторизованным пользователям не рендерим <Outlet /> (главную), чтобы исключить мерцание
  if (!user && !isPublicRoute) {
    return <SplashScreen message="Открываем безопасный вход…" leaving={leavingForLogin} />
  }

  // Авторизованным пользователям на /login не показываем форму перед редиректом
  if (user && pathname === '/login') {
    return <SplashScreen message="Открываем Листок..." />
  }

  if (pathname.startsWith('/fantms')) {
    return (
      <div className="min-h-screen w-full bg-[#0c0e0c] text-[#e4e7e4] antialiased">
        <Outlet />
      </div>
    )
  }

  if (!bare) return <div className="app-screen-enter"><Workspace><NotificationBanner /><Outlet /><Onboarding open={boot.settings.onboarding_completed === false} onCompleted={refresh} />{boot.settings.onboarding_completed !== false ? <PushNudge /> : null}</Workspace></div>

  return (
    <div className={`sheet safe-top public-shell public-screen-enter ${pathname === '/login' ? 'login-shell' : ''}`}>
      <NotificationBanner />
      <main className={hideNav ? 'flex-1 flex flex-col min-h-0 overflow-hidden' : 'safe-bottom flex-1 flex flex-col min-h-0'}>
        <div className="flex-1 flex flex-col min-h-0">
          <Outlet />
        </div>
      </main>
      {!hideNav && user ? <Nav /> : null}
    </div>
  )
}
