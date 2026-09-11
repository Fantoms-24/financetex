import * as React from 'react'
import { Leaf } from 'lucide-react'

export function SplashScreen({ message }: { message?: string }) {
  React.useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('listok-theme') === 'dark' ? 'dark' : 'light'
  }, [])

  return (
    <div className="listok-splash" role="status" aria-live="polite">
      <div className="listok-splash-glow" aria-hidden="true" />
      <div className="listok-splash-content">
        <div className="listok-splash-mark" aria-hidden="true">
          <Leaf size={31} strokeWidth={2} />
        </div>
        <div className="listok-splash-wordmark">Листок<span>.</span></div>
        <p>{message || 'Собираем ваш финансовый обзор'}</p>
        <div className="listok-splash-progress" aria-hidden="true"><span /></div>
      </div>
      <span className="listok-splash-caption">Личные деньги. Общие планы.</span>
    </div>
  )
}
