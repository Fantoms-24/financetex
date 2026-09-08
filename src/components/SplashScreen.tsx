import * as React from 'react'
import { Sparkles } from 'lucide-react'

export function SplashScreen({ message }: { message?: string }) {
  const [dots, setDots] = React.useState('.')

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '.' : d + '.'))
    }, 450)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f3eee4] px-6 text-center select-none overflow-hidden">
      {/* Мягкий фон с бумажным узором */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#1c191507_0_1px,#0000_1px_7px)] pointer-events-none" />

      {/* Центральная карточка-чек с анимацией парения */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Анимированный 3D логотип Листок */}
        <div className="relative mb-5 flex items-center justify-center transition-transform duration-700 animate-[float_3s_ease-in-out_infinite]">
          <div className="relative h-24 w-24 overflow-hidden rounded-[24px] shadow-paper-lg ring-1 ring-rule/80 bg-paper">
            <img
              src="/logo.png"
              alt="Листок"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Название бренда */}
        <h1 className="t-display text-[27px] font-bold text-ink tracking-tight">
          Листок
        </h1>
        <p className="mt-1 text-[13.5px] font-medium text-muted">
          Карманный финансист
        </p>

        {/* Прогресс-бар в стиле кассовой ленты */}
        <div className="mt-7 w-48 overflow-hidden rounded-full bg-[#e6dfd1] p-0.5 shadow-inner">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule-soft relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sage to-transparent w-2/3 animate-[scan_1.6s_ease-in-out_infinite] rounded-full" />
          </div>
        </div>

        <p className="mt-3 text-[12px] font-medium text-muted/80">
          {message || 'Сверяем расчёты'}{dots}
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </div>
  )
}
