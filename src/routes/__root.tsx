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
import { registerSW } from '~/lib/push-client'
import '~/styles/app.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5',
      },
      { title: 'ЧекАгент' },
      {
        name: 'description',
        content: 'Карманный финансист. Чеки, бюджет и кассы на одном листке.',
      },
      { name: 'theme-color', content: '#f3eee4' },
      { name: 'color-scheme', content: 'light' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'ЧекАгент' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    links: [
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
    styles: [
      {
        children:
          'html,body{margin:0;padding:0}html{background:#f3eee4;color-scheme:light}',
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
  const { ready, user } = useApp()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()

  React.useEffect(() => {
    registerSW()
  }, [])

  React.useEffect(() => {
    if (!ready) return
    if (!user && pathname !== '/login') {
      navigate({ to: '/login', replace: true })
    } else if (user && pathname === '/login') {
      navigate({ to: '/', replace: true })
    }
  }, [ready, user, pathname, navigate])

  const bare = pathname === '/login'

  // Пока не знаем, вошли ли — тихая бумага, не зелёный сплэш навсегда.
  if (!ready) {
    return (
      <div className="sheet safe-top items-center justify-center">
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-rule">
          <div className="h-full w-1/3 animate-[breathe_1.4s_ease-in-out_infinite] rounded-full bg-sage" />
        </div>
      </div>
    )
  }

  return (
    <div className="sheet safe-top">
      <main className={bare ? 'flex-1' : 'safe-bottom flex-1'}>
        <Outlet />
      </main>
      {!bare && user ? <Nav /> : null}
    </div>
  )
}
