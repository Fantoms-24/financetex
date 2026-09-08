import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Camera, ImagePlus, LoaderCircle, RotateCcw } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useApp } from '~/lib/app-state'
import { categoryLabel, moneyShort } from '~/lib/format'
import { scanReceipt } from '~/server/functions/scan'

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
  const { refresh } = useApp()
  const cameraRef = React.useRef<HTMLInputElement>(null)
  const galleryRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<any>(null)

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
      const res = await scanReceipt({ data: { image: preview } })
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
    <div className="px-4 pb-8 pt-5">
      <header className="mb-4">
        <h1 className="t-display text-[26px] leading-none">Скан</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          {result ? 'чек разобран' : 'положите чек на ровное место'}
        </p>
      </header>

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
        <div className="receipt-card rise flex min-h-[300px] flex-col items-center justify-center px-6 py-10 text-center">
          <div
            className="mb-5 flex h-full w-full min-h-[190px] items-center justify-center rounded-[10px] border-2 border-dashed border-rule"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0 28px, rgba(28,25,21,0.05) 28px 29px)',
            }}
          >
            <p className="t-display text-[15px] text-muted">бумажный планшет</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <Button variant="sage" size="md" onClick={() => cameraRef.current?.click()}>
              <Camera size={18} /> Камера
            </Button>
            <Button variant="paper" size="md" onClick={() => galleryRef.current?.click()}>
              <ImagePlus size={18} /> Галерея
            </Button>
          </div>

          <p className="mt-4 text-[12.5px] leading-snug text-muted">
            Не читается? Впишите чек руками в ящике.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="slip rise overflow-hidden p-2">
            <img src={preview} alt="чек" className="w-full rounded-[6px]" />
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

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="paper" onClick={reset}>
                  <RotateCcw size={16} /> Ещё чек
                </Button>
                <Button variant="sage" onClick={() => navigate({ to: '/receipts' })}>
                  В ящик
                </Button>
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
