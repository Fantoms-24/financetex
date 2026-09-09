import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, PieChart as PieIcon, BarChart2, Compass } from 'lucide-react'
import { cn, haptic } from '~/lib/utils'
import {
  CATEGORIES,
  money,
  plural,
} from '~/lib/format'

export interface CategoryStatItem {
  id: string
  label: string
  shortLabel: string
  icon: string
  color: string
  hex: string
  amount: number
  percent: number
  count: number
}

interface CategoryAnalyticsProps {
  items: Array<{
    id: string
    total: number | string
    category?: string | null
    [key: string]: any
  }>
  selectedCategory: string
  onSelectCategory: (catId: string) => void
  className?: string
}

export function CategoryAnalytics({
  items,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryAnalyticsProps) {
  const [viewMode, setViewMode] = React.useState<'donut' | 'bars'>('donut')
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null)

  // 1. Агрегация трат по категориям
  const { stats, grandTotal, topCategory, economyInsight } = React.useMemo(() => {
    const totals: Record<string, { amount: number; count: number }> = {}
    let total = 0

    for (const it of items) {
      const catId = it.category || 'other'
      const val = Number(it.total) || 0
      if (!totals[catId]) {
        totals[catId] = { amount: 0, count: 0 }
      }
      totals[catId].amount += val
      totals[catId].count += 1
      total += val
    }

    const statList: Array<CategoryStatItem> = CATEGORIES.map((c) => {
      const entry = totals[c.id] || { amount: 0, count: 0 }
      const percent = total > 0 ? Math.round((entry.amount / total) * 100) : 0
      return {
        id: c.id,
        label: c.label,
        shortLabel: c.shortLabel,
        icon: c.icon,
        color: c.color,
        hex: c.hex,
        amount: entry.amount,
        percent,
        count: entry.count,
      }
    })
      .filter((s) => s.amount > 0)
      .sort((a, b) => b.amount - a.amount)

    const top = statList[0] || null

    // Анализ категорий, где пользователь больше всего сэкономил
    let insight = ''
    if (total === 0) {
      insight = 'Трат в этом периоде не зафиксировано. Листок сохранил 100% экономии бюджета 🌿'
    } else {
      const zeroSpendingCategories = CATEGORIES.filter(
        (c) => !totals[c.id] || totals[c.id].amount === 0,
      )

      if (zeroSpendingCategories.some((c) => c.id === 'prepared')) {
        insight = 'Отличная дисциплина: ни одного расхода на кафе и рестораны. Вы сохранили ощутимую часть бюджета 🌿'
      } else if (zeroSpendingCategories.some((c) => c.id === 'snacks' || c.id === 'drinks')) {
        insight = 'Хорошая экономия: минимум трат на снеки и напитки. Спонтанные расходы под надежным контролем 🌿'
      } else if (top && top.percent >= 50) {
        insight = `Основная доля трат пришлась на «${top.label}» (${top.percent}%). В остальных категориях вы держите отличный ритм экономии 🌿`
      } else {
        insight = 'Расходы распределены гармонично и без резких всплесков. Листок одобряет такую стабильность 🌿'
      }
    }

    return {
      stats: statList,
      grandTotal: total,
      topCategory: top,
      economyInsight: insight,
    }
  }, [items])

  // Активная категория для отображения в центре Donut Chart
  const activeFocusCategory = React.useMemo(() => {
    const targetId = hoveredCategory || (selectedCategory !== 'all' ? selectedCategory : null)
    if (!targetId) return null
    return stats.find((s) => s.id === targetId) || null
  }, [hoveredCategory, selectedCategory, stats])

  if (items.length === 0 || grandTotal === 0) {
    return (
      <div className={cn('rounded-[22px] border border-rule/70 bg-paper p-5 text-center shadow-xs', className)}>
        <span className="text-[28px]">🌿</span>
        <h3 className="t-display mt-2 text-[16px] font-semibold text-ink">
          Период без расходов
        </h3>
        <p className="mt-1 text-[13px] text-muted max-w-xs mx-auto">
          Все чеки и категории трат будут наглядно разложены на кольцевой диаграмме при первых покупках.
        </p>
      </div>
    )
  }

  // Параметры SVG кольцевой диаграммы (Donut Chart)
  const radius = 68
  const strokeWidth = 18
  const circumference = 2 * Math.PI * radius
  let accumulatedPercent = 0

  return (
    <div className={cn('rounded-[24px] border border-rule/80 bg-paper p-4.5 sm:p-5 shadow-paper space-y-4', className)}>
      {/* Шапка аналитики с переключателем режимов */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-sage/12 text-sage">
            <Compass size={16} />
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">
            Куда уходят деньги
          </span>
        </div>

        {/* Переключатель: Кольцо / Полосы */}
        <div className="inline-flex rounded-full border border-rule/80 bg-canvas/70 p-0.5 shadow-xs">
          <button
            type="button"
            onClick={() => {
              haptic(6)
              setViewMode('donut')
            }}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition cursor-pointer select-none',
              viewMode === 'donut'
                ? 'bg-paper text-ink shadow-xs'
                : 'text-muted hover:text-ink',
            )}
            title="Кольцевая диаграмма"
          >
            <PieIcon size={13} className={viewMode === 'donut' ? 'text-sage' : ''} />
            <span className="hidden sm:inline">Кольцо</span>
          </button>
          <button
            type="button"
            onClick={() => {
              haptic(6)
              setViewMode('bars')
            }}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition cursor-pointer select-none',
              viewMode === 'bars'
                ? 'bg-paper text-ink shadow-xs'
                : 'text-muted hover:text-ink',
            )}
            title="Полосная диаграмма"
          >
            <BarChart2 size={13} className={viewMode === 'bars' ? 'text-sage' : ''} />
            <span className="hidden sm:inline">Полосы</span>
          </button>
        </div>
      </div>

      {/* Кольцевая Donut-диаграмма */}
      {viewMode === 'donut' ? (
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative flex items-center justify-center">
            <svg
              className="h-44 w-44 -rotate-90 transform overflow-visible"
              viewBox="0 0 180 180"
            >
              {/* Фоновое кольцо */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-canvas/90 fill-none"
                strokeWidth={strokeWidth}
              />

              {/* Сегменты категорий */}
              {stats.map((cat) => {
                const strokeDasharray = `${(cat.percent / 100) * circumference} ${circumference}`
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference)
                accumulatedPercent += cat.percent

                const isSelected = selectedCategory === cat.id
                const isHovered = hoveredCategory === cat.id
                const isFaded =
                  (selectedCategory !== 'all' && !isSelected) ||
                  (hoveredCategory !== null && !isHovered)

                return (
                  <circle
                    key={cat.id}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={cat.hex}
                    strokeWidth={isSelected || isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="butt"
                    className={cn(
                      'transition-all duration-300 cursor-pointer select-none',
                      isFaded ? 'opacity-25' : 'opacity-100',
                      (isSelected || isHovered) && 'filter drop-shadow-sm',
                    )}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => {
                      haptic(7)
                      onSelectCategory(selectedCategory === cat.id ? 'all' : cat.id)
                    }}
                  />
                )
              })}
            </svg>

            {/* Центральный блок суммы и названия */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
              <AnimatePresence mode="wait">
                {activeFocusCategory ? (
                  <motion.div
                    key={activeFocusCategory.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[18px] leading-none mb-0.5">
                      {activeFocusCategory.icon}
                    </span>
                    <span className="t-num text-[17px] font-bold text-ink leading-tight">
                      {money(activeFocusCategory.amount)}
                    </span>
                    <span className="t-num text-[11px] font-semibold text-sage">
                      {activeFocusCategory.percent}% от трат
                    </span>
                    <span className="text-[10.5px] font-medium text-muted truncate max-w-[110px] mt-0.5">
                      {activeFocusCategory.shortLabel}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grandTotal"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted mb-0.5">
                      Всего
                    </span>
                    <span className="t-num text-[18px] font-bold text-ink leading-tight">
                      {money(grandTotal)}
                    </span>
                    <span className="t-num text-[11px] text-muted mt-0.5">
                      {items.length} {plural(items.length, 'чек', 'чека', 'чеков')}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        /* Полосный режим с прогресс-барами */
        <div className="space-y-2.5 pt-1">
          {stats.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <div
                key={cat.id}
                onClick={() => {
                  haptic(6)
                  onSelectCategory(isSelected ? 'all' : cat.id)
                }}
                className={cn(
                  'group flex flex-col rounded-[16px] p-2.5 transition-all cursor-pointer select-none',
                  isSelected
                    ? 'bg-sage/12 border border-sage/40 shadow-xs'
                    : 'bg-canvas/40 hover:bg-canvas/70 border border-transparent',
                )}
              >
                <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[15px]">{cat.icon}</span>
                    <span className={cn('font-semibold truncate', isSelected ? 'text-sage' : 'text-ink')}>
                      {cat.label}
                    </span>
                    <span className="t-num rounded-full bg-paper px-1.5 py-0.2 text-[10px] font-bold text-muted border border-rule/60">
                      {cat.percent}%
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="t-num font-bold text-ink">
                      {money(cat.amount)}
                    </span>
                  </div>
                </div>

                {/* Прогресс-бар категории */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-paper border border-rule/50">
                  <motion.div
                    className={cn('h-full rounded-full', cat.color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(cat.percent, 3)}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Быстрые чипы категорий для интерактивной фильтрации */}
      <div className="border-t border-rule/60 pt-3">
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
          <span>Фильтр по категориям</span>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => {
                haptic(6)
                onSelectCategory('all')
              }}
              className="text-sage font-bold normal-case hover:underline cursor-pointer"
            >
              Сбросить ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {stats.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  haptic(6)
                  onSelectCategory(isSelected ? 'all' : cat.id)
                }}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium transition active:scale-95 cursor-pointer',
                  isSelected
                    ? 'bg-sage text-onsage shadow-xs font-semibold'
                    : 'border border-rule/70 bg-canvas/60 text-muted hover:border-sage/40 hover:text-ink',
                )}
              >
                <span className="text-[12px]">{cat.icon}</span>
                <span>{cat.shortLabel}</span>
                <span className="t-num text-[10px] opacity-80">
                  {cat.percent}%
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Карточка «Подсказка от Листка» об экономии */}
      <div className="rounded-[18px] border border-sage/30 bg-sage/8 p-3.5 flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sage/20 text-sage mt-0.5">
          <Sparkles size={15} />
        </div>
        <div className="min-w-0 flex-1 text-[12.5px] leading-snug">
          <div className="flex items-center gap-1.5 font-bold text-sage mb-0.5">
            <span>Подсказка от Листка</span>
          </div>
          <p className="text-ink/85 font-medium">
            {economyInsight}
          </p>
        </div>
      </div>
    </div>
  )
}
