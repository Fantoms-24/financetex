import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Check,
  Copy,
  ExternalLink,
  QrCode,
  Share2,
  Sparkles,
  Users,
  Utensils,
  Wallet,
} from 'lucide-react'
import { BottomSheet } from './BottomSheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { money } from '~/lib/format'
import { cn, haptic } from '~/lib/utils'
import { createSplit, getOrganizerDefaults } from '~/server/functions/split'

interface SplitCreateModalProps {
  open: boolean
  onClose: () => void
  receiptId?: string | null
  storeName?: string
  totalAmount?: number
  items?: Array<{ name: string; qty?: number; price: number }>
}

const TIP_OPTIONS = [0, 5, 10, 15]

export function SplitCreateModal({
  open,
  onClose,
  receiptId,
  storeName = 'Счёт в ресторане',
  totalAmount = 0,
  items = [],
}: SplitCreateModalProps) {
  const navigate = useNavigate()
  const [title, setTitle] = React.useState(storeName)
  const [total, setTotal] = React.useState(totalAmount ? String(totalAmount) : '')
  const [tipPercent, setTipPercent] = React.useState(10)
  const [organizerName, setOrganizerName] = React.useState('')
  const [organizerPhone, setOrganizerPhone] = React.useState('')
  const [organizerBank, setOrganizerBank] = React.useState('Т-Банк')

  const [busy, setBusy] = React.useState(false)
  const [createdCode, setCreatedCode] = React.useState<string | null>(null)
  const [copiedLink, setCopiedLink] = React.useState(false)

  // Режим: обычный сплит или сложный составной сплит (с доп. расходами)
  const [splitMode, setSplitMode] = React.useState<'simple' | 'compound'>('simple')
  const [mainSum, setMainSum] = React.useState('6000')
  const [mainPeople, setMainPeople] = React.useState('4')
  const [subSum, setSubSum] = React.useState('2000')
  const [subPeople, setSubPeople] = React.useState('2')

  // Загружаем профиль организатора при открытии
  React.useEffect(() => {
    if (open) {
      setTitle(storeName || 'Счёт в ресторане')
      setTotal(totalAmount ? String(totalAmount) : '')
      setCreatedCode(null)
      getOrganizerDefaults()
        .then((res) => {
          if (res) {
            if (res.name) setOrganizerName(res.name)
            if (res.phone) setOrganizerPhone(res.phone)
            if (res.bank) setOrganizerBank(res.bank)
          }
        })
        .catch(() => {})
    }
  }, [open, storeName, totalAmount])

  // Расчёт составного сплита
  const cMainSum = Math.max(0, Math.round(Number(mainSum.replace(/[^\d]/g, '') || 0)))
  const cMainPeople = Math.max(1, Math.round(Number(mainPeople.replace(/[^\d]/g, '') || 1)))
  const cSubSum = Math.max(0, Math.round(Number(subSum.replace(/[^\d]/g, '') || 0)))
  const cSubPeople = Math.max(1, Math.min(cMainPeople, Math.round(Number(subPeople.replace(/[^\d]/g, '') || 1))))

  const cMainPerPerson = Math.round(cMainSum / cMainPeople)
  const cSubPerPerson = Math.round(cSubSum / cSubPeople)
  const cBothPerPerson = cMainPerPerson + cSubPerPerson
  const cMainOnlyCount = Math.max(0, cMainPeople - cSubPeople)
  const cCompoundTotal = cMainSum + cSubSum

  const calculatedTotal = splitMode === 'compound'
    ? cCompoundTotal
    : Math.round(Number(total.replace(/[^\d]/g, '') || 0))

  const tipAmount = Math.round((calculatedTotal * tipPercent) / 100)
  const grandTotal = calculatedTotal + tipAmount

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (calculatedTotal <= 0 || busy) return
    setBusy(true)
    haptic(8)
    try {
      const splitItems = splitMode === 'compound'
        ? [
            {
              name: `Основной счёт (${money(cMainSum)} на ${cMainPeople} чел.)`,
              price: cMainSum,
              qty: 1,
              isShared: true,
            },
            {
              name: `Доп. расходы (${money(cSubSum)} на ${cSubPeople} чел.)`,
              price: cSubSum,
              qty: 1,
              isShared: false,
            },
          ]
        : items.length > 0
          ? items
          : undefined

      const res = await createSplit({
        data: {
          receiptId: receiptId || null,
          title: title.trim() || (splitMode === 'compound' ? 'Совместный счёт' : 'Счёт в ресторане'),
          total: calculatedTotal,
          tipPercent,
          organizerName: organizerName.trim() || 'Организатор',
          organizerPhone: organizerPhone.trim() || null,
          organizerBank: organizerBank.trim() || 'Т-Банк',
          items: splitItems,
        },
      })
      if (res && res.code) {
        setCreatedCode(res.code)
        haptic(12)
      }
    } finally {
      setBusy(false)
    }
  }

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/split/${createdCode || ''}`
      : `https://financetex.relaxdev.ru/split/${createdCode || ''}`

  const handleCopy = () => {
    haptic(6)
    navigator.clipboard?.writeText(shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleNativeShare = async () => {
    haptic(6)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Сплит счёта: ${title}`,
          text: `Привет! Разделим счёт за «${title}». Открой ссылку и отметь свои блюда:`,
          url: shareUrl,
        })
        return
      } catch {}
    }
    handleCopy()
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={createdCode ? 'Ссылка на сплит готова! 🍕' : 'Разделить счёт с друзьями'}
    >
      {createdCode ? (
        <div className="space-y-4 pt-1 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/15 text-sage">
            <Sparkles size={28} />
          </div>

          <div className="space-y-1">
            <h3 className="t-display text-[18px] font-bold text-ink">
              Счёт успешно создан
            </h3>
            <p className="text-[13px] text-muted">
              Друзья могут открыть эту ссылку на своих смартфонах без регистрации и выбрать свои блюда.
            </p>
          </div>

          {/* Ссылка с кнопкой копирования */}
          <div className="flex items-center gap-2 rounded-xl border border-rule/80 bg-cream/50 p-2 text-left">
            <span className="font-mono text-[12.5px] text-ink truncate flex-1 select-all px-1">
              {shareUrl}
            </span>
            <Button
              size="sm"
              variant="sage"
              onClick={handleCopy}
              className="rounded-lg px-3 h-8 text-[12px] font-semibold shrink-0"
            >
              {copiedLink ? 'Скопировано!' : 'Копировать'}
            </Button>
          </div>

          {/* QR-код для моментального сканирования с экрана */}
          <div className="rounded-2xl border border-rule/70 bg-paper p-3 text-center space-y-1.5">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl bg-white border border-rule/60 p-1.5 shadow-xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareUrl)}`}
                alt="QR-код сплита"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-[11px] text-muted">
              Покажите QR-код друзьям за столом для быстрого перехода
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="paper"
              size="md"
              onClick={handleNativeShare}
              className="rounded-xl gap-1.5"
            >
              <Share2 size={15} />
              <span>Поделиться</span>
            </Button>

            <Button
              variant="sage"
              size="md"
              onClick={() => {
                onClose()
                navigate({ to: `/split/${createdCode}` })
              }}
              className="rounded-xl gap-1.5"
            >
              <span>Открыть счёт</span>
              <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCreate} className="space-y-4 pt-1">
          {/* Выбор режима разделения */}
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-rule/70 bg-cream/50 p-1">
            <button
              type="button"
              onClick={() => {
                haptic(6)
                setSplitMode('simple')
              }}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl py-2 text-[12.5px] font-semibold transition',
                splitMode === 'simple'
                  ? 'bg-paper text-ink shadow-xs'
                  : 'text-muted hover:text-ink',
              )}
            >
              <span>Поровну на всех</span>
            </button>
            <button
              type="button"
              onClick={() => {
                haptic(6)
                setSplitMode('compound')
              }}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl py-2 text-[12.5px] font-semibold transition',
                splitMode === 'compound'
                  ? 'bg-sage text-onsage shadow-xs'
                  : 'text-muted hover:text-ink',
              )}
            >
              <span>🧮 Сложный сплит</span>
            </button>
          </div>

          {/* Заведение */}
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Название заведения / Место
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Сыроварня, Кофемания, Ужин…"
              className="h-11 rounded-[14px]"
            />
          </div>

          {splitMode === 'simple' ? (
            /* Сумма обычного счёта */
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                  Сумма по чеку (₽)
                </label>
                {items.length > 0 ? (
                  <span className="text-[11.5px] text-sage font-medium">
                    {items.length} позиций из чека
                  </span>
                ) : null}
              </div>
              <Input
                type="number"
                inputMode="numeric"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="5400"
                className="h-11 rounded-[14px] font-mono text-[16px]"
              />
            </div>
          ) : (
            /* Поля сложного сплита */
            <div className="rounded-2xl border border-rule/80 bg-paper p-3.5 space-y-3 shadow-xs">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block">
                  1. Основной счёт (на всех)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10.5px] text-muted block mb-0.5">Сумма (₽)</label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={mainSum}
                      onChange={(e) => setMainSum(e.target.value)}
                      placeholder="6000"
                      className="h-10 rounded-xl font-mono text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] text-muted block mb-0.5">Человек</label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={mainPeople}
                      onChange={(e) => setMainPeople(e.target.value)}
                      placeholder="4"
                      className="h-10 rounded-xl font-mono text-[14px]"
                    />
                  </div>
                </div>
                <span className="text-[11.5px] text-sage font-medium block pt-0.5">
                  ↳ по {money(cMainPerPerson)} с каждого из {cMainPeople} чел.
                </span>
              </div>

              <div className="border-t border-rule/60 pt-2.5 space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block">
                  2. Дополнительно (на часть компании)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10.5px] text-muted block mb-0.5">Сумма (₽)</label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={subSum}
                      onChange={(e) => setSubSum(e.target.value)}
                      placeholder="2000"
                      className="h-10 rounded-xl font-mono text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] text-muted block mb-0.5">Человек</label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={subPeople}
                      onChange={(e) => setSubPeople(e.target.value)}
                      placeholder="2"
                      className="h-10 rounded-xl font-mono text-[14px]"
                    />
                  </div>
                </div>
                <span className="text-[11.5px] text-sage font-medium block pt-0.5">
                  ↳ по {money(cSubPerPerson)} с каждого из {cSubPeople} чел.
                </span>
              </div>

              {/* Расчёт итоговых долей */}
              <div className="rounded-xl border border-sage/30 bg-sage/8 p-2.5 text-[12px] space-y-1">
                <span className="font-semibold text-ink block">👥 Итог расчёта:</span>
                <div className="flex justify-between text-muted">
                  <span>{cSubPeople} чел. (с доп. частью):</span>
                  <span className="font-bold text-ink t-num">
                    {money(cMainPerPerson)} + {money(cSubPerPerson)} = {money(cBothPerPerson)}
                  </span>
                </div>
                {cMainOnlyCount > 0 ? (
                  <div className="flex justify-between text-muted">
                    <span>{cMainOnlyCount} чел. (только основной счёт):</span>
                    <span className="font-bold text-ink t-num">{money(cMainPerPerson)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-sage/20 pt-1 font-semibold text-ink">
                  <span>Всего к оплате:</span>
                  <span className="t-num text-sage font-bold">{money(cCompoundTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Чаевые */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                Чаевые официанту
              </label>
              {tipPercent > 0 ? (
                <span className="text-[11.5px] font-medium text-ink">
                  +{money(tipAmount)}
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {TIP_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setTipPercent(opt)
                  }}
                  className={cn(
                    'h-9 rounded-xl text-[12.5px] font-semibold border transition active:scale-95',
                    tipPercent === opt
                      ? 'bg-sage text-onsage border-sage shadow-xs'
                      : 'bg-paper text-ink border-rule hover:border-sage/40',
                  )}
                >
                  {opt === 0 ? 'Без чаевых' : `${opt}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Реквизиты СБП для возврата денег */}
          <div className="rounded-2xl border border-rule/70 bg-cream/40 p-3.5 space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block">
              Реквизиты СБП для перевода организатору:
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10.5px] text-muted block mb-0.5">Ваше имя</label>
                <Input
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  placeholder="Олег"
                  className="h-9 rounded-xl text-[13px]"
                />
              </div>
              <div>
                <label className="text-[10.5px] text-muted block mb-0.5">Банк</label>
                <Input
                  value={organizerBank}
                  onChange={(e) => setOrganizerBank(e.target.value)}
                  placeholder="Т-Банк, Сбер…"
                  className="h-9 rounded-xl text-[13px]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10.5px] text-muted block mb-0.5">Номер телефона (СБП)</label>
              <Input
                type="tel"
                value={organizerPhone}
                onChange={(e) => setOrganizerPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="h-9 rounded-xl text-[13px] font-mono"
              />
            </div>
          </div>

          {/* Итоговая плашка */}
          <div className="flex items-center justify-between px-1 text-[13px]">
            <span className="text-muted">Итого со сбором:</span>
            <span className="t-num font-bold text-ink text-[16px]">
              {money(grandTotal)}
            </span>
          </div>

          <Button
            type="submit"
            variant="sage"
            disabled={calculatedTotal <= 0 || busy}
            className="w-full h-11 rounded-[16px] font-semibold shadow-paper text-[14px]"
          >
            {busy ? 'Создаём ссылку…' : 'Создать ссылку для друзей 🍕'}
          </Button>
        </form>
      )}
    </BottomSheet>
  )
}
