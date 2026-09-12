import * as React from 'react'

export function SplashScreen({ message, leaving = false }: { message?: string; leaving?: boolean }) {
  React.useEffect(() => {
    const isDark = localStorage.getItem('listok-theme') === 'dark'
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  return (
    <div className={`listok-splash${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="listok-splash-glow" aria-hidden="true" />
      <div className="listok-splash-content">
        <div className="listok-splash-mark" aria-hidden="true">
          <img src="/logo.png" alt="" width="68" height="68" />
        </div>
        <div className="listok-splash-wordmark">Листок<span>.</span></div>
        <p>{message || 'Собираем ваш финансовый обзор'}</p>
        <div className="listok-splash-progress" aria-hidden="true"><span /></div>
      </div>
      <span className="listok-splash-caption">Личные деньги. Общие планы.</span>
    </div>
  )
}
