import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Camera, ImagePlus, LoaderCircle, Receipt, RotateCcw, ScanLine, Sparkles, Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useApp } from '~/lib/app-state'
import { categoryLabel, money, moneyShort } from '~/lib/format'
import { scanReceipt } from '~/server/functions/scan'
import { cn } from '~/lib/utils'

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

const VERDICT: Record<string, string> = {
  good: 'норма',
  fair: 'терпимо',
  overpriced: 'дорого',
  impulse: 'импульс',
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
    <div className="space-y-4 px-4 pb-32 pt-2 sm:px-5">
      <header className="mb-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
          <ScanLine size={14} className="text-sage" />
          <span>Быстрый разбор</span>
        </div>
        <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
          Скан чека
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          {result ? 'Чек успешно разобран нейросетью' : 'Положите чек на ровную поверхность'}
        </p>
      </header>

      {/* Селектор назначения: Личный чек или в Общую кассу */}
      {boot.houses && boot.houses.length > 0 ? (
        <div className="rounded-[18px] border border-rule/80 bg-paper p-3.5 shadow-paper">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted">Куда записать чек</span>
            {selectedHouseId ? (
              <span className="rounded-full bg-sage/15 px-2 py-0.5 text-[10.5px] font-semibold text-sage">
                В общие расходы
              </span>
            ) : (
              <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10.5px] font-medium text-muted">
                Личный чек
              </span>
            )}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedHouseId(null)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-medium transition active:scale-95',
                selectedHouseId === null
                  ? 'bg-sage text-onsage shadow-xs font-semibold'
                  : 'bg-white/80 border border-rule/70 text-muted hover:text-ink',
              )}
            >
              Личные расходы
            </button>
            {boot.houses.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelectedHouseId(h.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-medium transition active:scale-95',
                  selectedHouseId === h.id
                    ? 'bg-sage text-onsage shadow-xs font-semibold'
                    : 'bg-white/80 border border-rule/70 text-muted hover:text-ink',
                )}
              >
                <Users size={13} />
                <span>Касса «{h.name}»</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

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

      {!preview ? (
        <div className="overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-6 text-center shadow-paper space-y-4">
          <div
            className="flex min-h-[200px] flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-rule/80 bg-cream/30 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage mb-3">
              <ScanLine size={24} />
            </div>
            <p className="t-display text-[16px] font-medium text-ink">Видоискатель чека</p>
            <p className="mt-1 text-[12px] text-muted max-w-[220px]">
              Нейросеть мгновенно считает магазин, дату, все позиции и итоговую сумму
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button variant="sage" size="md" onClick={() => cameraRef.current?.click()} className="gap-2">
              <Camera size={18} /> Камера
            </Button>
            <Button variant="paper" size="md" onClick={() => galleryRef.current?.click()} className="gap-2">
              <ImagePlus size={18} /> Из галереи
            </Button>
          </div>

          <p className="text-[12px] text-muted">
            Также вы можете вписать чек вручную в разделе «Чеки»
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[18px] border border-rule/80 bg-paper p-2.5 shadow-paper">
            <img src={preview} alt="чек" className="w-full rounded-[12px]" />
          </div>

          {result ? (
            <div className="receipt-card rise p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="t-display truncate text-[18px]">{result.receipt?.store || result.store}</span>
                <span className="t-num text-[18px]">{moneyShort(result.receipt?.total || result.total)}</span>
              </div>
              <p className="mt-1 text-[12.5px] text-muted">
                {categoryLabel(result.receipt?.category || result.category)}
                {(result.receipt?.verdict || result.verdict)
                  ? ` · ${VERDICT[result.receipt?.verdict || result.verdict] || (result.receipt?.verdict || result.verdict)}`
                  : ''}
              </p>

              {(result.items ?? []).length > 0 ? (
                <ul className="rule mt-3 space-y-1 pt-3">
                  {(result.items ?? []).map((it: any, i: number) => (
                    <li key={i} className="flex items-baseline justify-between gap-3 text-[13.5px]">
                      <span className="min-w-0 truncate">
                        {it.name}
                        {it.qty ? <span className="text-muted"> ×{it.qty}</span> : null}
                      </span>
                      <span className="t-num shrink-0">{moneyShort(it.price)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {result.receipt?.house_id || selectedHouseId ? (
                <div className="mt-3 flex items-center gap-1.5 rounded-[10px] bg-amber-800/10 px-3 py-1.5 text-[12px] font-medium text-amber-850">
                  <Users size={14} className="text-amber-800 shrink-0" />
                  <span>
                    Записан в общие расходы кассы «
                    {boot.houses.find((h) => h.id === (result.receipt?.house_id || selectedHouseId))?.name || 'Касса'}
                    »
                  </span>
                </div>
              ) : null}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="paper" onClick={reset}>
                  <RotateCcw size={16} /> Ещё чек
                </Button>
                {result.receipt?.house_id || selectedHouseId ? (
                  <Button
                    variant="sage"
                    onClick={() => navigate({ to: `/groups/${result.receipt?.house_id || selectedHouseId}` })}
                  >
                    В кассу →
                  </Button>
                ) : (
                  <Button variant="sage" onClick={() => navigate({ to: '/receipts' })}>
                    В ящик
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="paper" size="lg" onClick={reset} disabled={busy}>
                Другое фото
              </Button>
              <Button variant="sage" size="lg" onClick={run} disabled={busy}>
                {busy ? <LoaderCircle size={18} className="animate-spin" /> : null}
                {busy ? 'Разбираю…' : 'Разобрать чек'}
              </Button>
            </div>
          )}

          {error ? (
            <p className="rounded-[10px] border border-stamp/40 bg-stamp/8 px-3 py-2.5 text-[13px] text-stamp">
              {error}
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}
