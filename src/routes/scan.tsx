import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  ImagePlus,
  LoaderCircle,
  Receipt,
  RotateCcw,
  ScanLine,
  Sparkles,
  Users,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { useApp } from '~/lib/app-state'
import { categoryLabel, money, moneyShort } from '~/lib/format'
import { scanReceipt } from '~/server/functions/scan'
import { showInAppNotification } from '~/components/NotificationBanner'
import { cn, haptic } from '~/lib/utils'

export const Route = createFileRoute('/scan')({
  component: Scan,
})

async function compressImage(file: File, maxSide = 1100, quality = 0.72): Promise<string> {
  const dataUrl = await readAsDataUrl(file)
  try {
    const img = await loadImage(dataUrl)
    const { width, height } = img
    const scale = Math.min(1, maxSide / Math.max(width, height))
    if (scale === 1 && file.size < 300000) return dataUrl
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return dataUrl
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', quality)
  } catch {
    return dataUrl
  }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('read'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image'))
    img.src = src
  })
}

const VERDICT: Record<string, { label: string; color: string }> = {
  good: { label: 'норма', color: 'bg-sage/12 text-sage border-sage/30' },
  fair: { label: 'терпимо', color: 'bg-amber-600/12 text-amber-800 border-amber-500/30' },
  overpriced: { label: 'дорого', color: 'bg-stamp/10 text-stamp border-stamp/30' },
  impulse: { label: 'импульс', color: 'bg-stamp/10 text-stamp border-stamp/30' },
}

function Scan() {
  const navigate = useNavigate()
  const { refresh, boot } = useApp()
  const cameraRef = React.useRef<HTMLInputElement>(null)
  const galleryRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<any>(null)
  const [selectedHouseId, setSelectedHouseId] = React.useState<string | null>(null)

  const uniqueHouses = React.useMemo(() => {
    const map = new Map<string, { id: string; name: string }>()
    for (const h of boot.houses ?? []) {
      if (h && h.id && !map.has(h.id)) map.set(h.id, h)
    }
    return Array.from(map.values())
  }, [boot.houses])

  async function pick(file?: File) {
    if (!file) return
    setError(null)
    setResult(null)
    setBusy(true)
    try {
      setPreview(await compressImage(file))
    } catch {
      setError('Не получилось прочитать фото')
    } finally {
      setBusy(false)
    }
  }

  async function run() {
    if (!preview) return
    setBusy(true)
    setError(null)
    try {
      const res = await scanReceipt({
        data: {
          image: preview,
          houseId: selectedHouseId,
        },
      })
      if ((res as any)?.error) {
        setError((res as any).error)
        setBusy(false)
        return
      }
      setResult(res)
      showInAppNotification({
        title: '🧾 Чек успешно разобран!',
        body: `${(res as any)?.receipt?.store || 'Чек'} — ${money((res as any)?.receipt?.total || 0)} записано`,
        icon: 'sparkles',
      })
      await refresh()
    } catch (e: any) {
      setError(e?.message || 'Не получилось разобрать')
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6 px-4 pb-36 pt-3 sm:px-5">
      {/* 1. Навигация и заголовок */}
      <header className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => haptic(8)}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-muted hover:text-ink transition"
          >
            <ArrowLeft size={16} />
            <span>На главную</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-medium text-sage">
            <Sparkles size={12} />
            <span>ИИ-распознавание</span>
          </div>
        </div>

        <h1 className="t-display text-[26px] font-semibold leading-tight text-ink">
          {result ? 'Чек разобран' : 'Скан чека'}
        </h1>
        <p className="text-[13px] text-muted">
          {result
            ? 'Все позиции и сумма сохранены в ваш бюджет'
            : 'Сфотографируйте чек или выберите изображение из галереи'}
        </p>
      </header>

      {/* 2. Селектор назначения: Личный расход или во «Вместе» */}
      {uniqueHouses.length > 0 && !result && (
        <div className="rounded-[20px] border border-rule/70 bg-paper p-3.5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[11.5px] font-semibold uppercase tracking-wider text-muted">
            <span>Куда записать чек</span>
            <span className="text-sage font-medium">
              {selectedHouseId ? 'Общий бюджет' : 'Личный бюджет'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                haptic(6)
                setSelectedHouseId(null)
              }}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all active:scale-95',
                selectedHouseId === null
                  ? 'bg-sage text-onsage shadow-xs font-semibold'
                  : 'border border-rule/70 bg-paper text-muted hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'flex h-3.5 w-3.5 items-center justify-center rounded-full',
                  selectedHouseId === null ? 'bg-white/25 text-onsage' : 'border border-rule text-transparent',
                )}
              >
                <Check size={10} strokeWidth={3} className={selectedHouseId === null ? 'opacity-100' : 'opacity-0'} />
              </span>
              <span>Личные расходы</span>
            </button>

            {uniqueHouses.map((h) => {
              const active = selectedHouseId === h.id
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setSelectedHouseId(h.id)
                  }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all active:scale-95',
                    active
                      ? 'bg-sage text-onsage shadow-xs font-semibold'
                      : 'border border-rule/70 bg-paper text-muted hover:text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-3.5 w-3.5 items-center justify-center rounded-full',
                      active ? 'bg-white/25 text-onsage' : 'border border-rule text-transparent',
                    )}
                  >
                    <Check size={10} strokeWidth={3} className={active ? 'opacity-100' : 'opacity-0'} />
                  </span>
                  <span>«{h.name}»</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Скрытые файловые инпуты для камеры и галереи */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />

      {/* 3. Состояние 1: Видоискатель (фото еще нет) */}
      {!preview ? (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[24px] border border-rule/70 bg-paper p-6 text-center shadow-paper">
            {/* Визуальная зона съемки с уголками видоискателя */}
            <div className="relative mx-auto flex min-h-[220px] flex-col items-center justify-center rounded-[20px] border border-dashed border-sage/30 bg-cream/40 p-6">
              {/* Угловые метки видоискателя */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-sage/60 rounded-tl-sm" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-sage/60 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-sage/60 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-sage/60 rounded-br-sm" />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/12 text-sage mb-3">
                <ScanLine size={24} strokeWidth={2.2} />
              </div>

              <p className="t-display text-[17px] font-semibold text-ink">Положите чек на ровную поверхность</p>
              <p className="mt-1 text-[12.5px] text-muted max-w-[240px] leading-relaxed">
                Листок считает магазин, дату, все позиции и итоговую сумму
              </p>
            </div>

            {/* Две тактильные кнопки выбора источника */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <Button
                  variant="sage"
                  size="md"
                  onClick={() => {
                    haptic(8)
                    cameraRef.current?.click()
                  }}
                  className="w-full gap-2 h-[48px] rounded-[16px] text-[14px]"
                >
                  <Camera size={18} strokeWidth={2.2} />
                  <span>Камера</span>
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <Button
                  variant="paper"
                  size="md"
                  onClick={() => {
                    haptic(8)
                    galleryRef.current?.click()
                  }}
                  className="w-full gap-2 h-[48px] rounded-[16px] text-[14px] border-rule/80"
                >
                  <ImagePlus size={18} className="text-sage" />
                  <span>Из галереи</span>
                </Button>
              </motion.div>
            </div>
          </div>

          <p className="text-center text-[12.5px] text-muted">
            Чек не сохранился?{' '}
            <Link to="/receipts" className="font-semibold text-sage hover:underline">
              Впишите покупку вручную
            </Link>
          </p>
        </div>
      ) : (
        /* 4. Состояние 2: Фото выбрано или уже разобрано */
        <div className="space-y-4">
          {/* Превью фото с эффектом анализа */}
          <div className="relative overflow-hidden rounded-[22px] border border-rule/70 bg-paper p-2.5 shadow-paper">
            <img src={preview} alt="Чек" className="w-full max-h-[300px] object-cover rounded-[16px]" />

            {/* Анимированный сканирующий луч во время обработки */}
            {busy && (
              <div className="absolute inset-2.5 overflow-hidden rounded-[16px] bg-black/25 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                <motion.div
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_15px_#6ee7b7]"
                />
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-onsage shadow-lg mb-2.5">
                    <Sparkles size={20} className="animate-spin" />
                  </div>
                  <p className="t-display text-[16px] font-semibold text-white">Листок читает чек…</p>
                  <p className="text-[12px] text-white/80 mt-0.5">Определяем магазин, товары и цены</p>
                </div>
              </div>
            )}
          </div>

          {/* 5. Карточка результата: Настоящий крафтовый чек с перфорацией */}
          {result ? (
            <div className="receipt-card rise p-5 space-y-3">
              {/* Шапка чека */}
              <div className="flex items-baseline justify-between gap-3 border-b border-rule/50 pb-2.5">
                <div>
                  <span className="t-display text-[20px] font-bold text-ink">
                    {result.receipt?.store || result.store || 'Чек из магазина'}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5 text-[12px] text-muted">
                    <span>{categoryLabel(result.receipt?.category || result.category)}</span>
                    {result.receipt?.verdict || result.verdict ? (
                      <>
                        <span>•</span>
                        <span
                          className={cn(
                            'rounded-full border px-2 py-0.2 text-[10.5px] font-semibold',
                            VERDICT[result.receipt?.verdict || result.verdict]?.color || 'bg-sage/10 text-sage',
                          )}
                        >
                          {VERDICT[result.receipt?.verdict || result.verdict]?.label || (result.receipt?.verdict || result.verdict)}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="t-display t-num text-[24px] font-bold text-ink shrink-0">
                  {money(result.receipt?.total || result.total)}
                </div>
              </div>

              {/* Распознанные позиции */}
              {(result.items ?? []).length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Товары ({result.items.length}):
                  </p>
                  <ul className="divide-y divide-rule/40 text-[13px]">
                    {(result.items ?? []).map((it: any, i: number) => (
                      <li key={i} className="flex items-baseline justify-between gap-3 py-1.5">
                        <span className="min-w-0 truncate text-ink">
                          {it.name}
                          {it.qty && it.qty > 1 ? <span className="text-muted font-normal"> ×{it.qty}</span> : null}
                        </span>
                        <span className="t-num shrink-0 font-medium text-ink">
                          {moneyShort(it.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Отметка о привязке к общему бюджету */}
              {result.receipt?.house_id || selectedHouseId ? (
                <div className="flex items-center gap-2 rounded-[14px] bg-sage/12 px-3 py-2 text-[12.5px] font-medium text-sage">
                  <Users size={15} className="shrink-0 text-sage" />
                  <span>
                    Записан в общий бюджет «
                    {boot.houses.find((h) => h.id === (result.receipt?.house_id || selectedHouseId))?.name || 'Вместе'}
                    »
                  </span>
                </div>
              ) : null}

              {/* Кнопки после сохранения */}
              <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
                <Button variant="paper" size="md" onClick={reset} className="gap-1.5 rounded-[16px]">
                  <RotateCcw size={15} />
                  <span>Ещё чек</span>
                </Button>

                {result.receipt?.house_id || selectedHouseId ? (
                  <Button
                    variant="sage"
                    size="md"
                    onClick={() => navigate({ to: `/groups/${result.receipt?.house_id || selectedHouseId}` })}
                    className="gap-1.5 rounded-[16px]"
                  >
                    <span>Во «Вместе»</span>
                    <ChevronRight size={15} />
                  </Button>
                ) : (
                  <Button
                    variant="sage"
                    size="md"
                    onClick={() => navigate({ to: '/receipts' })}
                    className="gap-1.5 rounded-[16px]"
                  >
                    <span>Все чеки</span>
                    <ChevronRight size={15} />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            /* Кнопки перед отправкой на разбор */
            <div className="grid grid-cols-2 gap-3">
              <Button variant="paper" size="lg" onClick={reset} disabled={busy} className="rounded-[16px]">
                Другое фото
              </Button>
              <Button variant="sage" size="lg" onClick={run} disabled={busy} className="gap-2 rounded-[16px]">
                {busy ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={18} />}
                <span>{busy ? 'Разбираю…' : 'Разобрать чек'}</span>
              </Button>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {error && (
            <p className="rounded-[14px] border border-stamp/40 bg-stamp/8 px-3.5 py-2.5 text-[13px] text-stamp">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
