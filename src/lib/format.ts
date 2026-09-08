export const CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'food', label: 'Еда' },
  { id: 'prepared', label: 'Готовая еда' },
  { id: 'household', label: 'Дом' },
  { id: 'hygiene', label: 'Гигиена' },
  { id: 'health', label: 'Здоровье' },
  { id: 'drinks', label: 'Напитки' },
  { id: 'snacks', label: 'Снеки' },
  { id: 'other', label: 'Разное' },
]

export function categoryLabel(id: string | null | undefined): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? 'Разное'
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

/** Дней до платежа в этом месяце: today / tomorrow / in-2 / overdue */
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
