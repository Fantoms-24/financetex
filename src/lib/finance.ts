/** One calendar and one budget rule for every screen. Amounts are whole rubles. */
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function dueDay(day: number, now = new Date()): number {
  return Math.max(1, Math.min(Number(day) || 1, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()))
}

export function budgetNumbers(budget: number, spent: number, bills: Array<{ amount: number; paid_cycle?: string | null; paused?: boolean }> = [], now = new Date()) {
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = Math.max(1, lastDay - now.getDate() + 1)
  const cycle = localDate(now).slice(0, 7)
  const reserved = bills.reduce((sum, bill) => sum + (!bill.paused && bill.paid_cycle !== cycle ? Number(bill.amount) || 0 : 0), 0)
  const left = Number(budget || 0) - Number(spent || 0)
  const available = left - reserved
  return { left, reserved, available, daysLeft, daily: Math.max(0, Math.floor(available / daysLeft)) }
}

export function assertSaved<T>(result: T): Exclude<T, {error: string}> {
  if (!result || (typeof result === 'object' && ('error' in result || ('ok' in result && result.ok === false)))) {
    throw new Error(typeof result === 'object' && result && 'error' in result ? String(result.error) : 'Не удалось сохранить. Попробуйте ещё раз.')
  }
  return result as Exclude<T, {error: string}>
}
/** Retry key, also available on local-network HTTP where randomUUID is absent. */
export function newRequestId(): string {
  if(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function')return crypto.randomUUID()
  if(typeof crypto!=='undefined'&&typeof crypto.getRandomValues==='function')return Array.from(crypto.getRandomValues(new Uint8Array(16)),v=>v.toString(16).padStart(2,'0')).join('')
  return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+'-'+Math.random().toString(36).slice(2)
}
