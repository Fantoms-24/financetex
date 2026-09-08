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
        {/* Анимированный бумажный чек */}
        <div className="relative mb-6 flex h-24 w-20 flex-col justify-between rounded-[14px] border border-rule/90 bg-[#faf6ee] p-3 shadow-paper-lg transition-transform duration-700 animate-[float_3s_ease-in-out_infinite]">
          {/* Зубчатый край сверху */}
          <div className="absolute -top-1 left-2 right-2 flex justify-between">
            <span className="h-1 w-1.5 rounded-full bg-rule/70" />
            <span className="h-1 w-1.5 rounded-full bg-rule/70" />
            <span className="h-1 w-1.5 rounded-full bg-rule/70" />
            <span className="h-1 w-1.5 rounded-full bg-rule/70" />
            <span className="h-1 w-1.5 rounded-full bg-rule/70" />
          </div>

          {/* Иконка печати/штампа */}
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-sage ring-4 ring-sage/10 animate-pulse">
            <Sparkles size={16} />
          </div>

          {/* Имитация строк чека с эффектом сканирования */}
          <div className="space-y-1.5 px-0.5">
            <div className="h-1 w-full rounded-full bg-rule/80 animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-1 w-3/4 rounded-full bg-rule/60 animate-[pulse_1.5s_ease-in-out_infinite_200ms]" />
            <div className="h-1 w-1/2 rounded-full bg-sage/40 animate-[pulse_1.5s_ease-in-out_infinite_400ms]" />
          </div>

          {/* Декоративная линия отрыва */}
          <div className="border-b border-dashed border-rule" />
        </div>

        {/* Название бренда */}
        <h1 className="t-display text-[26px] font-bold text-ink tracking-tight">
          ЧекАгент
        </h1>
        <p className="mt-1 text-[13px] font-medium text-muted">
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
