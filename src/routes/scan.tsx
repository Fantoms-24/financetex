import { getReceipt } from '~/server/functions/receipts'
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
  Utensils,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { ExpenseEditor } from '~/components/ExpenseEditor'
import { SplitCreateModal } from '~/components/SplitCreateModal'
import { useApp } from '~/lib/app-state'
import { categoryLabel, money, moneyShort } from '~/lib/format'
import { scanReceipt } from '~/server/functions/scan'
import { showInAppNotification } from '~/components/NotificationBanner'
import { cn, haptic } from '~/lib/utils'

export const Route = createFileRoute('/scan')({
  validateSearch: (search: Record<string, unknown>): {houseId?: string} => ({houseId: typeof search.houseId === 'string' ? search.houseId : undefined}),
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
  const search = Route.useSearch()
  const [review, setReview] = React.useState(false)
  const [savedId, setSavedId] = React.useState<string | null>(null)
  const { refresh, boot } = useApp()
  const cameraRef = React.useRef<HTMLInputElement>(null)
  const galleryRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<any>(null)
  const [selectedHouseId, setSelectedHouseId] = React.useState<string | null>(search.houseId || null)
  const [openSplitModal, setOpenSplitModal] = React.useState(false)

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
    setSavedId(null)
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
      setReview(true)
    } catch (e: any) {
      setError(e?.message || 'Не получилось разобрать')
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setPreview(null)
    setSavedId(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="app-page scan-page">
      {/* 1. Навигация и заголовок */}
      <header className="page-heading scan-heading">
        <div>
          <p className="eyebrow">УМНОЕ РАСПОЗНАВАНИЕ</p>
          <h1>{savedId ? 'Чек сохранён' : result ? 'Проверьте чек' : 'Скан чека'}<span>.</span></h1>
          <p className="page-description">
            {result
              ? savedId ? 'Расход записан. Повторная отправка не создаст копию.' : 'Распознавание может ошибаться. Проверьте сумму и дату перед сохранением.'
              : 'Сфотографируйте чек — всё остальное распознаем автоматически.'}
          </p>
        </div>
        <div className="scan-heading-actions">
          <div className="status-chip">
            <Sparkles size={12} />
            <span>Умный скан</span>
          </div>
          <Link
            to="/receipts"
            onClick={() => haptic(8)}
            className="secondary-action"
          >
            <ArrowLeft size={16} />
            <span>К расходам</span>
          </Link>
        </div>
      </header>

      {/* 2. Селектор назначения: Личный расход или во «Вместе» */}
      {uniqueHouses.length > 0 && !result && (
        <div className="surface scan-destination">
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
        <div className="scan-capture-flow space-y-4">
          <div className="surface scan-capture-card">
            {/* Визуальная зона съемки с уголками видоискателя */}
            <div className="relative mx-auto flex min-h-[220px] flex-col items-center justify-center rounded-[20px] border border-dashed border-sage/30 bg-cream/40 p-6">
              {/* Угловые метки видоискателя */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-sage/60 rounded-tl-sm" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-sage/60 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-sage/60 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-sage/60 rounded-br-sm" />

              <img className="scan-first-art" src="/assets/visual-kit-v1/scan-first.webp" alt="" aria-hidden="true" />

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
                    Бюджет: «
                    {boot.houses.find((h) => h.id === (result.receipt?.house_id || selectedHouseId))?.name || 'Вместе'}
                    »
                  </span>
                </div>
              ) : null}

              {!savedId && <button className="primary-action" onClick={()=>setReview(true)}>Проверить и сохранить</button>}
              {/* Кнопка сплита счёта прямо из результатов скана */}
              <div className="pt-2">
                <Button
                  variant="sage"
                  size="md"
                  onClick={() => {
                    haptic(8)
                    if (savedId) setOpenSplitModal(true); else setReview(true)
                  }}
                  className="w-full gap-2 rounded-[16px] py-2.5 font-semibold shadow-paper"
                >
                  <Utensils size={16} />
                  <span>Разделить счёт с друзьями 🍕</span>
                </Button>
              </div>

              {/* Кнопки после сохранения */}
              <div className="mt-3 grid grid-cols-2 gap-2.5">
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

      <ExpenseEditor open={review} onClose={()=>setReview(false)} onSaved={async id=>{
        setSavedId(id||null)
        if(id)try{const saved=await getReceipt({data:{id}});if('receipt' in saved&&saved.receipt){setResult(saved);setSelectedHouseId(saved.receipt.house_id||null)}}catch{setError('Расход сохранён, но подробности пока не обновились')}
      }} initialHouseId={selectedHouseId} draft={React.useMemo(()=>result ? {...result.receipt,purchased_at:result.receipt?.purchased_at || undefined,image:preview,items:result.items,houseId:selectedHouseId}:undefined,[result,preview,selectedHouseId])}/>
      {/* Модальное окно создания сплита */}
      <SplitCreateModal
        open={openSplitModal}
        onClose={() => setOpenSplitModal(false)}
        receiptId={savedId}
        storeName={result?.receipt?.store || result?.store}
        totalAmount={result?.receipt?.total || result?.total}
        items={result?.items || []}
      />
    </div>
  )
}
