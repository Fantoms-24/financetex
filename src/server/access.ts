import { q1 } from './db'

export async function requireHouseMember(houseId: string | null | undefined, userId: string) {
  if (!houseId) return
  const member = await q1('SELECT 1 FROM house_members WHERE house_id = $1 AND user_id = $2', [houseId, userId])
  if (!member) throw new Error('У вас нет доступа к этому общему бюджету')
}

export function positiveAmount(value: unknown): number {
  const amount = Number(String(value ?? '').replace(/\s/g, '').replace(',', '.'))
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) throw new Error('Укажите сумму от 1 до 100 000 000 ₽')
  return Math.max(1, Math.round(amount))
}

export function validDate(value: unknown): string | null {
  if (!value) return null
  const date = String(value)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date + 'T12:00:00Z').toISOString().slice(0, 10) !== date) throw new Error('Проверьте дату')
  return date
}
