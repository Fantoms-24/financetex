import { mkdir, copyFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const root = resolve(import.meta.dirname, '..')
const generatedBackdrop = 'C:/Users/vasya/.codex/generated_images/01a091e7-b085-7d73-a8c0-22b3a10af4dd/exec-3f76cf73-9772-4e28-9b1d-626f6025a086.png'
const output = resolve(root, 'artifacts/rustore')

const slides = [
  {
    file: '01-budget.jpg',
    source: 'C:/Users/vasya/AppData/Local/Temp/codex-clipboard-2059da1f-f516-4b66-9d53-019e2a1f2376.jpg',
    crop: { left: 0, top: 230, width: 576, height: 980 },
    title: 'Деньги\nпод контролем',
    subtitle: 'Бюджет на месяц и понятная\nсумма на каждый день.',
  },
  {
    file: '02-expenses.jpg',
    source: 'C:/Users/vasya/AppData/Local/Temp/codex-clipboard-fc8e4d25-82b1-46ab-a137-d2fb069f4ba6.jpg',
    crop: { left: 0, top: 150, width: 576, height: 1060 },
    title: 'Расходы\nбез лишнего',
    subtitle: 'Добавляйте покупку за пару секунд\nи видьте всю историю.',
  },
  {
    file: '03-plan.jpg',
    source: 'C:/Users/vasya/AppData/Local/Temp/codex-clipboard-d5b8ee21-23ba-49b0-9e3a-affe217f505f.jpg',
    crop: { left: 0, top: 150, width: 576, height: 1060 },
    title: 'План\nна месяц',
    subtitle: 'Счета и цели — в одном\nспокойном месте.',
  },
  {
    file: '04-together.jpg',
    source: 'C:/Users/vasya/AppData/Local/Temp/codex-clipboard-9fbf77d8-bdf0-4330-b761-1a21ebf3af79.jpg',
    crop: { left: 0, top: 150, width: 576, height: 1060 },
    title: 'Общие деньги —\nпроще',
    subtitle: 'Расходы, планы и накопления\nс близкими.',
  },
]

function svgText(title, subtitle) {
  const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const lines = esc(title).split('\n').map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 68}">${line}</tspan>`).join('')
  const sublines = esc(subtitle).split('\n').map((line, i) => `<tspan x="76" dy="${i === 0 ? 0 : 31}">${line}</tspan>`).join('')
  return Buffer.from(`
    <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
      <text x="72" y="124" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#287653">ЛИСТОК.</text>
      <text x="72" y="218" font-family="Arial, sans-serif" font-size="62" font-weight="700" fill="#102f25">${lines}</text>
      <text x="76" y="382" font-family="Arial, sans-serif" font-size="25" font-weight="400" fill="#46655a">${sublines}</text>
    </svg>`)
}

function roundedMask(width, height, radius) {
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`)
}

async function makeSlide(slide) {
  const screenWidth = 792
  const screenHeight = 1320
  const screen = await sharp(slide.source)
    .extract(slide.crop)
    .resize(screenWidth, screenHeight, { fit: 'fill' })
    .composite([{ input: roundedMask(screenWidth, screenHeight, 48), blend: 'dest-in' }])
    .png()
    .toBuffer()

  const shadow = await sharp({
    create: { width: screenWidth + 30, height: screenHeight + 34, channels: 4, background: '#0b342580' },
  })
    .composite([{ input: roundedMask(screenWidth + 30, screenHeight + 34, 60), blend: 'dest-in' }])
    .blur(20)
    .png()
    .toBuffer()

  await sharp(generatedBackdrop)
    .resize(1080, 1920, { fit: 'cover' })
    .modulate({ brightness: 1.06, saturation: 0.82 })
    .composite([
      { input: Buffer.from('<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1920" fill="#f4f6f8" fill-opacity="0.76"/></svg>') },
      { input: shadow, left: 129, top: 451 },
      { input: screen, left: 144, top: 434 },
      { input: svgText(slide.title, slide.subtitle) },
      { input: Buffer.from('<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect x="72" y="1766" width="936" height="1" fill="#287653" fill-opacity="0.20"/><text x="72" y="1825" font-family="Arial, sans-serif" font-size="19" font-weight="600" letter-spacing="1.2" fill="#287653">ЛИЧНЫЕ ДЕНЬГИ · ОБЩИЕ ПЛАНЫ</text></svg>') },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(resolve(output, slide.file))
}

await mkdir(output, { recursive: true })
await Promise.all(slides.map(makeSlide))
await copyFile(generatedBackdrop, resolve(output, 'background-source.png'))
console.log(`Created ${slides.length} RuStore slides in ${output}`)
