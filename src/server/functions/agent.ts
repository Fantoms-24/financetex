import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import { q, newId } from '../db'
import { getLlmConfig } from '../config'
import { monthKey, categoryLabel } from '~/lib/format'

export const agentHistory = createServerFn({ method: 'GET' })
  .handler(async () => guarded(async (user) => {
    const rows = await q<any>(
      `SELECT id, role, text, created_at FROM agent_messages
        WHERE user_id = $1 ORDER BY created_at ASC LIMIT 200`,
      [user.id]
    )
    return { messages: rows ?? [] }
  }))

export const agentClear = createServerFn({ method: 'POST' })
  .handler(async () => guarded(async (user) => {
    await q(`DELETE FROM agent_messages WHERE user_id = $1`, [user.id])
    return { ok: true }
  }))

async function buildContext(userId: string) {
  const startOfMonth = `${monthKey()}-01`
  const [spent, byCat, houses] = await Promise.all([
    q<any>(
      `SELECT coalesce(sum(total), 0)::bigint AS total FROM receipts
        WHERE user_id = $1 AND deleted_at IS NULL AND coalesce(purchased_at,created_at::date) >= $2::date AND coalesce(purchased_at,created_at::date) < $2::date + interval '1 month'`,
      [userId, startOfMonth]
    ),
    q<any>(
      `SELECT category, coalesce(sum(total), 0)::bigint AS total FROM receipts
        WHERE user_id = $1 AND deleted_at IS NULL AND coalesce(purchased_at,created_at::date) >= $2::date AND coalesce(purchased_at,created_at::date) < $2::date + interval '1 month' GROUP BY category ORDER BY total DESC`,
      [userId, startOfMonth]
    ),
    q<any>(
      `SELECT h.name, b.amount, b.split, b.day_of_month
         FROM house_bills b
         JOIN houses h ON h.id = b.house_id
         JOIN house_members m ON m.house_id = h.id AND m.user_id = $1`,
      [userId]
    ),
  ])
  const total = Number(spent?.[0]?.total ?? 0)
  const cats = (byCat ?? []).map((c: any) => `${categoryLabel(c.category)}: ${Number(c.total).toLocaleString('ru-RU')} ₽`).join(', ')
  const houseText = (houses ?? []).length
    ? (houses ?? []).map((h: any) => `${h.name} — ${Number(h.amount).toLocaleString('ru-RU')} ₽, ${h.day_of_month} числа, делим: ${h.split}`).join('; ')
    : 'касс нет'
  return [
    `Потрачено с начала месяца: ${total.toLocaleString('ru-RU')} ₽.`,
    cats ? `По категориям: ${cats}.` : 'Чеков за месяц пока нет.',
    `Кассы и общие платежи: ${houseText}.`,
  ].join(' ')
}

export const agentSend = createServerFn({ method: 'POST' })
  .validator((d: { text?: string }) => ({
    text: String(d.text || '').trim(),
  }))
  .handler(async ({ data }) => guarded(async (user) => {
    if (!data.text) return { ok: true }
    await q(
      `INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'user', $3)`,
      [newId('am'), user.id, data.text.slice(0, 2000)]
    )
    const { baseUrl, apiKey, model } = await getLlmConfig()
    if (!apiKey) {
      const text = 'Админ ещё не вставил ключ, поэтому я пока без связи с сервисом. Но по вашим чекам и кассам отвечу, как только ключ появится.'
      await q(
        `INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'assistant', $3)`,
        [newId('am'), user.id, text]
      )
      return { ok: true, reply: text }
    }
    const context = await buildContext(user.id)
    const history = await q<any>(
      `SELECT role, text FROM agent_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT 12`,
      [user.id]
    )
    const system = `Ты — Листок, карманный финансист. Говоришь по-русски, коротко и по-человечески, как запись в блокноте.Не используй слова «нейросеть», «AI», «smart insights». Без маркетинга и канцелярита.Данные человека: ${context}Отвечай 2–5 короткими фразами. Если не хватает данных — скажи прямо.`
    let reply = ''
    try {
      const resp = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          messages: [
            { role: 'system', content: system },
            ...(history ?? []).reverse().map((h: any) => ({
              role: h.role === 'assistant' ? 'assistant' : 'user',
              content: h.text,
            })),
          ],
        }),
        signal: AbortSignal.timeout(60000),
      })
      if (!resp.ok) throw new Error(`llm ${resp.status}`)
      const json = await resp.json()
      reply = String(json?.choices?.[0]?.message?.content || '').trim()
    } catch {
      reply = 'Не дотянулся до сервиса. Попробуйте ещё раз через минутку'
    }
    if (!reply) reply = 'Не нашёл, что ответить. Задайте вопрос по-другому'
    await q(
      `INSERT INTO agent_messages (id, user_id, role, text) VALUES ($1, $2, 'assistant', $3)`,
      [newId('am'), user.id, reply.slice(0, 4000)]
    )
    return { ok: true, reply }
  }))
