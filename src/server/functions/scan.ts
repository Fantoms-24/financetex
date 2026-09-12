import { createServerFn } from '@tanstack/react-start'
import { requireHouseMember } from '../access'
import { guarded } from '../session'
import { q, q1, newId } from '../db'
import { callChatLlm } from '../llm'
import { notifyHouseExcept } from '../push'

const CATEGORIES = ['transport', 'food', 'prepared', 'household', 'hygiene', 'health', 'drinks', 'snacks', 'other']
const VERDICTS = ['good', 'fair', 'overpriced', 'impulse']

function extractJson(text: string): any {
  const clean = String(text || '').replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
  try {
    return JSON.parse(clean)
  } catch {
    const start = clean.indexOf('{')
    const end = clean.lastIndexOf('}')
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(clean.slice(start, end + 1))
      } catch {}
    }
    return null
  }
}

function asNumber(v: any, fallback = 0): number {
  const n = typeof v === 'number' ? v : Number(String(v ?? '').replace(/[^\d.,-]/g, '').replace(',', '.'))
  return Number.isFinite(n) ? Math.round(n) : fallback
}

function asCategory(v: any): string {
  const s = String(v || '').toLowerCase().trim()
  const map: Record<string, string> = {
    еда: 'food',
    продукты: 'food',
    готовая: 'prepared',
    готоваяеда: 'prepared',
    дом: 'household',
    быт: 'household',
    хозяйственное: 'household',
    гигиена: 'hygiene',
    здоровье: 'health',
    аптека: 'health',
    напитки: 'drinks',
    снеки: 'snacks',
    сладости: 'snacks',
    разное: 'other',
  }
  if (CATEGORIES.includes(s)) return s
  return map[s] || 'other'
}

export const scanReceipt = createServerFn({ method: 'POST' })
  .validator((d: { image?: string; houseId?: string | null }) => ({
    image: String(d.image || ''),
    houseId: d.houseId ? String(d.houseId).trim() : null,
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    await requireHouseMember(data.houseId, user.id)
    if (!data.image.startsWith('data:image/') || data.image.length > 7000000) {
      return { error: 'Не получилось прочитать фото' }
    }
    const prompt = `Разбери чек на фото. Ответь ТОЛЬКО валидным JSON без пояснений и markdown:
{"store":"название магазина","purchased_at":"YYYY-MM-DD","total":1234,"category":"food","verdict":"good","items":[{"name":"Молоко","qty":1,"price":89,"category":"food"}]}
Правила:
- total и price — целые рубли, без копеек и без символа валюты.
- category одно из: transport, food, prepared, household, hygiene, health, drinks, snacks, other.
- verdict одно из: good, fair, overpriced, impulse.
- purchased_at — дата с чека в формате YYYY-MM-DD. Если не видно, подставь сегодняшнюю.
- Если что-то не читается, всё равно верни JSON с тем, что удалось понять.`

    let content = ''
    try {
      const result = await callChatLlm({
        temperature: 0,
        timeoutMs: 60000,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: data.image } },
            ],
          },
        ],
      })
      content = result.content
    } catch (err: any) {
      console.error('[scanReceipt] error:', err)
      return { error: err?.message || 'Сервис распознавания недоступен. Попробуйте ещё раз' }
    }

    const parsed = extractJson(content)
    if (!parsed) return { error: 'Не разобрал чек. Попробуйте ещё раз или впишите вручную' }

    const items = Array.isArray(parsed.items)
      ? parsed.items
          .map((i: any) => ({
            name: String(i?.name || '').trim() || 'Позиция',
            qty: i?.qty == null || i?.qty === '' ? null : asNumber(i.qty, 1),
            price: asNumber(i?.price ?? i?.amount ?? i?.sum, 0),
            category: asCategory(i?.category),
          }))
          .filter((i: any) => i.price > 0 || i.name)
          .slice(0, 200)
      : []

    const itemsSum = items.reduce((s: number, i: any) => s + i.price, 0)
    const total = asNumber(parsed.total ?? parsed.sum ?? parsed.amount, itemsSum) || itemsSum
    const store = String(parsed.store || parsed.merchant || '').trim() || 'Без названия'
    const purchasedAtRaw = String(parsed.purchased_at || parsed.date || '').trim()
    const purchasedAt = /^\d{4}-\d{2}-\d{2}$/.test(purchasedAtRaw) ? purchasedAtRaw : null

    const dominant = items.length
      ? items.reduce((acc: Record<string, number>, i: any) => {
          acc[i.category] = (acc[i.category] || 0) + i.price
          return acc
        }, {})
      : {}
    const category = asCategory(
      parsed.category ||
        (Object.keys(dominant).length
          ? Object.entries(dominant).sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0][0]
          : 'other')
    )
    const verdictRaw = String(parsed.verdict || '').toLowerCase().trim()
    const verdict = VERDICTS.includes(verdictRaw) ? verdictRaw : null

    return {
      ok: true,
      receipt: { store, purchased_at: purchasedAt, total, category, verdict, house_id: data.houseId },
      items,
    }
  }))
