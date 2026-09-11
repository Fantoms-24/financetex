import * as React from 'react'
import { Check, Copy, Download, FileSpreadsheet, Share2, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { CATEGORIES, categoryLabel, money, plural } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import { showInAppNotification } from '~/components/NotificationBanner'
import type { Receipt } from '~/server/functions/bootstrap'

interface ShareMonthModalProps {
  open: boolean
  onClose: () => void
  receipts: Array<Receipt>
  monthLabel: string
  budget: number
  spent: number
}

export function ShareMonthModal({
  open,
  onClose,
  receipts,
  monthLabel,
  budget,
  spent,
}: ShareMonthModalProps) {
  const [copied, setCopied] = React.useState(false)

  // Расчёт метрик за период
  const stats = React.useMemo(() => {
    const totalCount = receipts.length
    const saved = budget - spent

    // Дни с расходами и спокойные дни
    const expenseDays = new Set<string>()
    const categoryTotals: Record<string, number> = {}

    for (const r of receipts) {
      const d = (r.purchased_at || r.created_at || '').slice(0, 10)
      if (d) expenseDays.add(d)
      const cat = r.category || 'other'
      categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(r.total) || 0)
    }

    // Топ категория
    let topCatId = 'food'
    let maxVal = 0
    for (const [cat, val] of Object.entries(categoryTotals)) {
      if (val > maxVal) {
        maxVal = val
        topCatId = cat
      }
    }
    const topCatShare = spent > 0 ? Math.round((maxVal / spent) * 100) : 0
    const topCatTitle = categoryLabel(topCatId)

    // Приблизительное количество спокойных дней (из расчёта 30 дней)
    const activeDaysCount = expenseDays.size
    const quietDaysCount = Math.max(0, 30 - activeDaysCount)

    return {
      totalCount,
      saved,
      topCatTitle,
      topCatShare,
      activeDaysCount,
      quietDaysCount,
    }
  }, [receipts, budget, spent])

  if (!open) return null

  // Текст для шеринга в мессенджеры
  const shareText = `🌿 Мои финансовые итоги за ${monthLabel}:
• Всего покупок: ${stats.totalCount} ${plural(stats.totalCount, 'чек', 'чека', 'чеков')} на сумму ${money(spent)}
• Топ-расход: ${stats.topCatTitle} (${stats.topCatShare}% всех трат)
${budget > 0 && stats.totalCount > 0 ? '• Осталось от лимита: '+money(stats.saved) : ''}

Веду бюджет легко в «Листке».`

  async function handleCopy() {
    haptic(10)
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      showInAppNotification({
        title: 'Текст скопирован',
        body: 'Готово для отправки в Telegram или WhatsApp',
        icon: 'sparkles',
      })
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* ignore */
    }
  }

  async function handleShare() {
    haptic(10)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Финансовые итоги за ${monthLabel} — Листок`,
          text: shareText,
        })
        return
      } catch {
        /* user cancelled */
      }
    }
    handleCopy()
  }

  function handleExportCsv() {
    haptic(10)
    try {
      // Формируем CSV с разделителем ';' и BOM для Excel
      const headers = ['Дата', 'Магазин / Описание', 'Категория', 'Сумма (₽)', 'Заметка', 'Общий бюджет']
      const cell=(value:string)=>'"'+(/^[\s]*[=+@\-]/.test(value)?"'"+value:value).replace(/"/g,'""')+'"'
      const rows = receipts.map((r) => {
        const d = (r.purchased_at || r.created_at || '').slice(0, 10)
        const store = cell(r.store || '')
        const cat = `"${categoryLabel(r.category)}"`
        const amt = r.total
        const note = cell(r.note || '')
        const house = cell(r.house_name || 'Личный')
        return [d, store, cat, amt, note, house].join(';')
      })

      const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `listok-expenses-${monthLabel.toLowerCase().replace(/\s+/g, '-')}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showInAppNotification({
        title: 'CSV подготовлен',
        body: 'Таблица расходов готова к открытию',
        icon: 'sparkles',
      })
    } catch {
      showInAppNotification({
        title: 'Не удалось экспортировать',
        body: 'Попробуйте ещё раз',
        icon: 'sparkles',
      })
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Затемнение фона */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            haptic(6)
            onClose()
          }}
          className="absolute inset-0 bg-ink/40 backdrop-blur-xs"
        />

        {/* Крафтовая открытка-квитанция */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="relative z-10 w-full max-w-[360px] overflow-hidden rounded-[26px] border border-rule/80 bg-paper p-5 shadow-paper-lg"
        >
          {/* Кнопка закрытия */}
          <button
            type="button"
            onClick={() => {
              haptic(6)
              onClose()
            }}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-paper-deep/60 text-muted transition hover:bg-paper-deep hover:text-ink"
          >
            <X size={16} />
          </button>

          {/* Шапка квитанции */}
          <div className="text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/12 text-sage">
              <Sparkles size={22} />
            </div>
            <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Финансовый отчёт
            </p>
            <h3 className="t-display text-[22px] font-bold text-ink">
              {monthLabel}
            </h3>
          </div>

          {/* Содержимое квитанции в рамке */}
          <div className="mt-4 space-y-2.5 rounded-[20px] border border-dashed border-rule/80 bg-canvas/60 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-muted">Потрачено всего</span>
              <span className="t-display t-num text-[19px] font-bold text-ink">
                {money(spent)}
              </span>
            </div>

            {budget > 0 && stats.totalCount > 0 && <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted">Осталось от лимита</span>
              <span className="t-num font-semibold text-sage">
                {money(stats.saved)}
              </span>
            </div>}

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted">Главный расход</span>
              <span className="font-medium text-ink">
                {stats.topCatTitle} ({stats.topCatShare}%)
              </span>
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted">Чеков учтено</span>
              <span className="t-num font-medium text-ink">
                {stats.totalCount}
              </span>
            </div>


          </div>

          {/* Кнопки действий */}
          <div className="mt-5 space-y-2">
            <Button
              variant="sage"
              onClick={handleShare}
              className="w-full gap-2 rounded-[16px] h-11 text-[13.5px] font-semibold shadow-xs"
            >
              <Share2 size={16} />
              <span>Поделиться отчётом</span>
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="paper"
                onClick={handleCopy}
                className="gap-1.5 rounded-[14px] h-10 text-[12px] font-medium"
              >
                {copied ? <Check size={14} className="text-sage" /> : <Copy size={14} />}
                <span>{copied ? 'Скопировано' : 'Текст для чата'}</span>
              </Button>

              <Button
                variant="paper"
                onClick={handleExportCsv}
                className="gap-1.5 rounded-[14px] h-10 text-[12px] font-medium"
              >
                <FileSpreadsheet size={14} className="text-sage" />
                <span>Excel (CSV)</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
