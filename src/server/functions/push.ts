import { createServerFn } from '@tanstack/react-start'
import { countSubscriptions, getVapidPublic, removeSubscription, saveSubscription, sendToUser } from '../push'
import { guarded } from '../session'
import { runTick } from '../tick'

export const vapidPublic = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    return { publicKey: await getVapidPublic() }
  } catch {
    return { publicKey: '' }
  }
})

export const pushSubscribe = createServerFn({ method: 'POST' })
  .validator((d: { endpoint: string; p256dh: string; auth: string }) => ({
    endpoint: String(d.endpoint || ''),
    p256dh: String(d.p256dh || ''),
    auth: String(d.auth || ''),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!data.endpoint || !data.p256dh) return { error: 'Нет подписки' } as const
      await saveSubscription(user.id, { endpoint: data.endpoint, keys: { p256dh: data.p256dh, auth: data.auth } })
      return { ok: true as const, devices: await countSubscriptions(user.id) }
    }),
  )

export const pushUnsubscribe = createServerFn({ method: 'POST' })
  .validator((d: { endpoint: string }) => ({ endpoint: String(d.endpoint || '') }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (data.endpoint) await removeSubscription(data.endpoint)
      return { ok: true as const, devices: await countSubscriptions(user.id) }
    }),
  )

export const pushTest = createServerFn({ method: 'POST' }).handler(async () =>
  guarded(async (user) => {
    const devices = await countSubscriptions(user.id)
    if (!devices) return { ok: false as const, devices: 0, error: 'Устройств в канале нет. Включите уведомления' }
    const res = await sendToUser(user.id, {
      title: 'ЧекАгент',
      body: 'Проверка связи. Баннер должен дойти даже с выключенным экраном',
      data: { url: '/settings', type: 'test' },
    })
    return {
      ok: res.sent > 0,
      sent: res.sent,
      failed: res.failed,
      devices,
      error: res.error,
    }
  }),
)

/** Запасной тик при открытии приложения. Основной — крон /api/push/tick. */
export const tickBills = createServerFn({ method: 'POST' }).handler(async () =>
  guarded(async () => {
    const res = await runTick()
    return { ok: true as const, ...res }
  }),
)
