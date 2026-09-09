export interface CategoryMeta {
  id: string
  label: string
  shortLabel: string
  icon: string
  color: string
  hex: string
  border: string
}

export const CATEGORIES: Array<CategoryMeta> = [
  { id: 'food', label: 'Супермаркеты', shortLabel: 'Продукты', icon: '🛒', color: 'bg-emerald-600', hex: '#059669', border: 'border-emerald-500/30' },
  { id: 'prepared', label: 'Кафе и рестораны', shortLabel: 'Кафе', icon: '☕', color: 'bg-amber-600', hex: '#d97706', border: 'border-amber-500/30' },
  { id: 'transport', label: 'Транспорт и авто', shortLabel: 'Транспорт', icon: '🚕', color: 'bg-sky-600', hex: '#0284c7', border: 'border-sky-500/30' },
  { id: 'household', label: 'Дом и ремонт', shortLabel: 'Дом', icon: '🏠', color: 'bg-indigo-600', hex: '#4f46e5', border: 'border-indigo-500/30' },
  { id: 'health', label: 'Здоровье и аптеки', shortLabel: 'Здоровье', icon: '💊', color: 'bg-rose-600', hex: '#e11d48', border: 'border-rose-500/30' },
  { id: 'hygiene', label: 'Уход и красота', shortLabel: 'Уход', icon: '🫧', color: 'bg-teal-600', hex: '#0d9488', border: 'border-teal-500/30' },
  { id: 'drinks', label: 'Напитки', shortLabel: 'Напитки', icon: '🧃', color: 'bg-yellow-600', hex: '#ca8a04', border: 'border-yellow-500/30' },
  { id: 'snacks', label: 'Снеки и сладкое', shortLabel: 'Снеки', icon: '🥨', color: 'bg-orange-500', hex: '#f97316', border: 'border-orange-500/30' },
  { id: 'other', label: 'Разное', shortLabel: 'Разное', icon: '📦', color: 'bg-stone-500', hex: '#78716c', border: 'border-stone-500/30' },
]

export function getCategoryMeta(id: string | null | undefined): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}

export function categoryLabel(id: string | null | undefined): string {
  return getCategoryMeta(id).label
}

export function categoryIcon(id: string | null | undefined): string {
  return getCategoryMeta(id).icon
}

export function money(n: number | null | undefined): string {
  const v = Math.round(Number(n || 0))
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(v)
}

export function moneyShort(n: number | null | undefined): string {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(
    Math.round(Number(n || 0)),
  )} ₽`
}

export function dayKey(d: Date | string): string {
  const dt = typeof d === 'string' ? new Date(d) : d
  const y = dt.getFullYear()
  const m = `${dt.getMonth() + 1}`.padStart(2, '0')
  const day = `${dt.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function monthKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}`
}

export function dateRu(d: string | Date | null | undefined): string {
  if (!d) return ''
  const dt = typeof d === 'string' ? new Date(d) : d
  if (Number.isNaN(dt.getTime())) return ''
  const today = new Date()
  const y = new Date(today.getTime() - 86400000)
  if (dayKey(dt) === dayKey(today)) return 'сегодня'
  if (dayKey(dt) === dayKey(y)) return 'вчера'
  return dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export function timeRu(d: string | Date | null | undefined): string {
  if (!d) return ''
  const dt = typeof d === 'string' ? new Date(d) : d
  if (Number.isNaN(dt.getTime())) return ''
  return dt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export function greeting(date: Date = new Date()): string {
  const h = date.getHours()
  if (h < 5) return 'Доброй ночи'
  if (h < 12) return 'Доброе утро'
  if (h < 18) return 'Добрый день'
  return 'Добрый вечер'
}

export function plural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return many
  if (last > 1 && last < 5) return few
  if (last === 1) return one
  return many
}

/** Дней до платежа в этом месяце: today / tomorrow / in-1 / in-2 / overdue */
export function billDueLabel(dayOfMonth: number, now: Date = new Date()): {
  key: 'overdue' | 'today' | 'in-1' | 'in-2'
  label: string
} {
  const diff = dayOfMonth - now.getDate()
  if (diff === 0) return { key: 'today', label: 'Сегодня' }
  if (diff === 1) return { key: 'in-1', label: 'Завтра' }
  if (diff === 2) return { key: 'in-2', label: 'Через 2 дня' }
  if (diff < 0) return { key: 'overdue', label: 'Просрочен' }
  return { key: 'in-2', label: `${diff} ${plural(diff, 'день', 'дня', 'дней')}` }
}

export function prevMonthKey(d: Date = new Date()): string {
  const prev = new Date(d.getFullYear(), d.getMonth() - 1, 1)
  return `${prev.getFullYear()}-${`${prev.getMonth() + 1}`.padStart(2, '0')}`
}

export function monthLabelRu(mKey: string): string {
  const [y, m] = mKey.split('-').map(Number)
  if (!y || !m) return mKey
  const d = new Date(y, m - 1, 1)
  const monthName = d.toLocaleDateString('ru-RU', { month: 'long' })
  const cap = monthName.charAt(0).toUpperCase() + monthName.slice(1)
  return `${cap} ${y}`
}

export function parseMagicExpense(raw: string): {
  amount: number | null
  title: string
  category: string
} {
  const trimmed = raw.trim()
  if (!trimmed) {
    return { amount: null, title: '', category: 'food' }
  }

  // 1. Ищем число (сумму): например 350, 350.50, 1 200, 1200р, 1200₽
  const numMatch = trimmed.match(
    /(?:^|\s)(\d{1,3}(?:[\s_]\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)\s*(?:₽|р|руб|rub)?(?:\s|$)/i,
  )

  let amount: number | null = null
  let title = trimmed

  if (numMatch && numMatch[1]) {
    const cleanNumStr = numMatch[1].replace(/[\s_]/g, '').replace(',', '.')
    const parsed = parseFloat(cleanNumStr)
    if (!Number.isNaN(parsed) && parsed > 0) {
      amount = Math.round(parsed)
      title = trimmed.replace(numMatch[0], ' ').trim()
    }
  }

  // Очищаем название от лишней пунктуации
  title = title.replace(/^[-–—:,.\s]+|[-–—:,.\s]+$/g, '').trim()
  if (!title) {
    title = 'Покупка'
  }

  title = title.charAt(0).toUpperCase() + title.slice(1)

  // 2. Автоматическое определение категории по смыслу
  const lower = title.toLowerCase()
  let category = 'food'

  if (
    lower.includes('такси') ||
    lower.includes('бензин') ||
    lower.includes('метро') ||
    lower.includes('автобус') ||
    lower.includes('парковк') ||
    lower.includes('проезд') ||
    lower.includes('каршеринг') ||
    lower.includes('заправк') ||
    lower.includes('мойка') ||
    lower.includes('яндекс go') ||
    lower.includes('uber') ||
    lower.includes('лукойл') ||
    lower.includes('газпром')
  ) {
    category = 'transport'
  } else if (
    lower.includes('кофе') ||
    lower.includes('обед') ||
    lower.includes('ланч') ||
    lower.includes('ужин') ||
    lower.includes('завтрак') ||
    lower.includes('кафе') ||
    lower.includes('ресторан') ||
    lower.includes('бургер') ||
    lower.includes('пицца') ||
    lower.includes('суши') ||
    lower.includes('шаурм') ||
    lower.includes('столов') ||
    lower.includes('доставк') ||
    lower.includes('яндекс еда') ||
    lower.includes('деливери') ||
    lower.includes('курьер') ||
    lower.includes('готовая')
  ) {
    category = 'prepared'
  } else if (
    lower.includes('аптек') ||
    lower.includes('лекарств') ||
    lower.includes('врач') ||
    lower.includes('клиник') ||
    lower.includes('анализ') ||
    lower.includes('витамин') ||
    lower.includes('таблет') ||
    lower.includes('стоматолог')
  ) {
    category = 'health'
  } else if (
    lower.includes('шампунь') ||
    lower.includes('мыло') ||
    lower.includes('парикмахер') ||
    lower.includes('стрижк') ||
    lower.includes('салон') ||
    lower.includes('ногт') ||
    lower.includes('маникюр') ||
    lower.includes('косметик') ||
    lower.includes('зубн')
  ) {
    category = 'hygiene'
  } else if (
    lower.includes('дом') ||
    lower.includes('ремонт') ||
    lower.includes('мебель') ||
    lower.includes('икеа') ||
    lower.includes('ikea') ||
    lower.includes('посуд') ||
    lower.includes('уборк') ||
    lower.includes('озон') ||
    lower.includes('ozon') ||
    lower.includes('вайлдберриз') ||
    lower.includes('wb') ||
    lower.includes('wildberries') ||
    lower.includes('леруа') ||
    lower.includes('хоз')
  ) {
    category = 'household'
  } else if (
    lower.includes('бар') ||
    lower.includes('пиво') ||
    lower.includes('вино') ||
    lower.includes('алко') ||
    lower.includes('коктейл') ||
    lower.includes('сок') ||
    lower.includes('вода')
  ) {
    category = 'drinks'
  } else if (
    lower.includes('чипс') ||
    lower.includes('морожен') ||
    lower.includes('шоколад') ||
    lower.includes('конфет') ||
    lower.includes('снек') ||
    lower.includes('печень') ||
    lower.includes('орех')
  ) {
    category = 'snacks'
  } else if (
    lower.includes('вкусвилл') ||
    lower.includes('пятёрочк') ||
    lower.includes('пятерочк') ||
    lower.includes('магнит') ||
    lower.includes('перекрёсток') ||
    lower.includes('перекресток') ||
    lower.includes('продукт') ||
    lower.includes('хлеб') ||
    lower.includes('молоко') ||
    lower.includes('сыр') ||
    lower.includes('мясо') ||
    lower.includes('рыб') ||
    lower.includes('овощ') ||
    lower.includes('фрукт') ||
    lower.includes('самокат')
  ) {
    category = 'food'
  } else {
    category = 'other'
  }

  return { amount, title, category }
}

