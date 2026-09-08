/**
 * Рисуем иконки ЧекАгента в PNG без внешних библиотек:
 * растеризуем в 64-мерном пространстве с суперсэмплингом, кодируем PNG через zlib.
 */
import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'

const SAGE = [61, 92, 74]
const PAPER = [250, 246, 238]
const STAMP = [143, 61, 50]
const SS = 3 // суперсэмплинг

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

function alphaOver(dst, src, a) {
  dst[0] = Math.round(src[0] * a + dst[0] * (1 - a))
  dst[1] = Math.round(src[1] * a + dst[1] * (1 - a))
  dst[2] = Math.round(src[2] * a + dst[2] * (1 - a))
  dst[3] = Math.round(255 * a + dst[3] * (1 - a))
}

function roundedRectContains(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return 0
  const cx = clamp(x, x0 + r, x1 - r)
  const cy = clamp(y, y0 + r, y1 - r)
  const dx = x - cx
  const dy = y - cy
  const d = Math.sqrt(dx * dx + dy * dy)
  if (d <= r) return 1
  return Math.max(0, 1 - (d - r)) // сглаживание края
}

function rotate(x, y, deg, cx, cy) {
  const a = (-deg * Math.PI) / 180
  const dx = x - cx
  const dy = y - cy
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)]
}

/** Рисует логотип в координатах 0..64. Возвращает [r,g,b,a]. */
function shade(x, y, opts) {
  const { maskable } = opts
  // фон
  const bgR = maskable ? 0 : 15
  const bgA = roundedRectContains(x, y, 0, 0, 64, 64, bgR)
  const px = [0, 0, 0, 0]
  if (bgA > 0) {
    px[0] = SAGE[0]
    px[1] = SAGE[1]
    px[2] = SAGE[2]
    px[3] = 255 * bgA
  }

  // содержимое в безопасной зоне для maskable
  const scale = maskable ? 0.76 : 1
  let lx = (x - 32) / scale + 32
  let ly = (y - 32) / scale + 32

  ;[lx, ly] = rotate(lx, ly, -9, 32, 32)

  // чек
  const RX0 = 21,
    RY0 = 12.5,
    RX1 = 43.5,
    RY1 = 46
  const inBody = roundedRectContains(lx, ly, RX0, RY0, RX1, RY1, 1.6)
  if (inBody > 0) {
    // зигзаг снизу
    const period = 6.2
    const t = (((lx - RX0) % period) + period) % period
    const tri = t < period / 2 ? (t / (period / 2)) * 3 : (1 - (t - period / 2) / (period / 2)) * 3
    const bottom = RY1 + tri
    const zig = ly <= bottom ? 1 : Math.max(0, 1 - (ly - bottom))
    const a = inBody * zig
    if (a > 0) {
      const c = [PAPER[0], PAPER[1], PAPER[2], 255]
      px[0] = Math.round(c[0] * a + px[0] * (1 - a))
      px[1] = Math.round(c[1] * a + px[1] * (1 - a))
      px[2] = Math.round(c[2] * a + px[2] * (1 - a))
      px[3] = Math.round(255 * a + px[3] * (1 - a))
    }
  }

  const receiptAlpha =
    inBody > 0
      ? (() => {
          const period = 6.2
          const t = (((lx - RX0) % period) + period) % period
          const tri = t < period / 2 ? (t / (period / 2)) * 3 : (1 - (t - period / 2) / (period / 2)) * 3
          const bottom = RY1 + tri
          return ly <= bottom ? 1 : Math.max(0, 1 - (ly - bottom))
        })() * inBody
      : 0

  if (receiptAlpha > 0.55) {
    // дырки слева
    for (const hy of [19, 26, 33, 40]) {
      const d = Math.hypot(lx - 24.5, ly - hy)
      const a = Math.max(0, 1 - (d - 1.25)) * 0.5
      if (a > 0) {
        const c = [SAGE[0], SAGE[1], SAGE[2]]
        px[0] = Math.round(c[0] * a + px[0] * (1 - a))
        px[1] = Math.round(c[1] * a + px[1] * (1 - a))
        px[2] = Math.round(c[2] * a + px[2] * (1 - a))
      }
    }

    // строки
    for (const [bx, bw] of [
      [30, 12],
      [30, 9],
      [30, 11],
    ]) {
      const by = bx === 30 && bw === 12 ? 18 : bw === 9 ? 25 : 32
      const inLine = roundedRectContains(lx, ly, bx, by, bx + bw, by + 1.7, 0.8)
      const a = inLine * 0.32
      if (a > 0) {
        const c = SAGE
        px[0] = Math.round(c[0] * a + px[0] * (1 - a))
        px[1] = Math.round(c[1] * a + px[1] * (1 - a))
        px[2] = Math.round(c[2] * a + px[2] * (1 - a))
      }
    }
  }

  // печать ₽
  const scx = 33,
    scy = 43
  const sd = Math.hypot(lx - scx, ly - scy)
  const ringA = Math.max(0, 1 - Math.abs(sd - 8.2) / 0.9) * 0.85
  if (ringA > 0) {
    const c = STAMP
    px[0] = Math.round(c[0] * ringA + px[0] * (1 - ringA))
    px[1] = Math.round(c[1] * ringA + px[1] * (1 - ringA))
    px[2] = Math.round(c[2] * ringA + px[2] * (1 - ringA))
  }

  const gx = lx - scx
  const gy = ly - scy
  const strokeA = (cond) => (cond ? 0.95 : 0)

  // стойка ₽
  let a = 0
  const W = 0.75
  if (gx >= -2.6 - W && gx <= -2.6 + W && gy >= -4.6 - W && gy <= 5.7 + W) a = 0.95
  // верхняя перекладина
  if (gy >= -4.6 - W && gy <= -4.6 + W && gx >= -2.6 - W && gx <= 1.3 + W) a = 0.95
  // чашка «Р»
  {
    const bx = gx + 2.6
    const by = gy + 2.05
    const d = Math.hypot(bx, by)
    if (bx >= -W && Math.abs(d - 2.55) <= W + 0.1 && gy >= -4.6 - W && gy <= 0.5 + W) a = 0.95
  }
  // две нижние перекладины
  for (const yy of [2.4, 5.4]) {
    if (gy >= yy - W && gy <= yy + W && gx >= -4.4 - W && gx <= 1.5 + W) a = 0.95
  }
  if (a > 0) {
    const c = STAMP
    px[0] = Math.round(c[0] * a + px[0] * (1 - a))
    px[1] = Math.round(c[1] * a + px[1] * (1 - a))
    px[2] = Math.round(c[2] * a + px[2] * (1 - a))
  }

  void strokeA
  return px
}

function render(size, maskable) {
  const buf = Buffer.alloc(size * size * 4)
  const inv = 1 / (SS * SS)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = ((x + (sx + 0.5) / SS) * 64) / size
          const py = ((y + (sy + 0.5) / SS) * 64) / size
          const c = shade(px, py, { maskable })
          const ca = c[3] / 255
          r += c[0] * ca
          g += c[1] * ca
          b += c[2] * ca
          a += c[3]
        }
      }
      const i = (y * size + x) * 4
      const alpha = a * inv
      if (alpha <= 0) {
        buf[i] = buf[i + 1] = buf[i + 2] = buf[i + 3] = 0
        continue
      }
      buf[i] = clamp(Math.round(r * inv), 0, 255)
      buf[i + 1] = clamp(Math.round(g * inv), 0, 255)
      buf[i + 2] = clamp(Math.round(b * inv), 0, 255)
      buf[i + 3] = clamp(Math.round(alpha), 0, 255)
    }
  }
  return buf
}

// ---- PNG ----
const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function encodePNG(size, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const outDir = path.join(process.cwd(), 'public')
fs.mkdirSync(outDir, { recursive: true })

const targets = [
  ['icon-192.png', 192, false],
  ['icon-512.png', 512, false],
  ['icon-maskable-512.png', 512, true],
  ['apple-touch-icon.png', 180, false],
]

for (const [file, size, maskable] of targets) {
  const buf = render(size, maskable)
  fs.writeFileSync(path.join(outDir, file), encodePNG(size, buf))
  console.log(`${file} — ${size}px, ${(buf.length / 1024).toFixed(1)} KB raw`)
}
