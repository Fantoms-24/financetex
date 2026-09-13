import { createServerFn } from '@tanstack/react-start'
import { guarded } from '../session'
import {
  getVapidPublic,
  saveSubscription,
  countSubscriptions,
  removeSubscription,
  sendToUser,
  validPushSubscription,
} from '../push'
import { runTick, runEveningCheckin } from '../tick'

export const vapidPublic = createServerFn({ method: 'GET' })
  .handler(async () => {
    try {
      return { publicKey: await getVapidPublic() }
    } catch {
      return { publicKey: '' }
    }
  })

export const pushSubscribe = createServerFn({ method: 'POST' })
  .validator((d: { endpoint?: string; p256dh?: string; auth?: string }) => ({
    endpoint: String(d.endpoint || ''),
    p256dh: String(d.p256dh || ''),
    auth: String(d.auth || ''),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (!validPushSubscription(data)) {
        return { error: 'Нет подписки' }
      }
      await saveSubscription(user.id, {
        endpoint: data.endpoint,
        keys: { p256dh: data.p256dh, auth: data.auth },
      })
      return {
        ok: true,
        devices: await countSubscriptions(user.id),
      }
    })
  )

export const pushUnsubscribe = createServerFn({ method: 'POST' })
  .validator((d: { endpoint?: string }) => ({
    endpoint: String(d.endpoint || ''),
  }))
  .handler(async ({ data }) =>
    guarded(async (user) => {
      if (data.endpoint) await removeSubscription(user.id, data.endpoint)
      return {
        ok: true,
        devices: await countSubscriptions(user.id),
      }
    })
  )

export const pushTest = createServerFn({ method: 'POST' })
  .handler(async () =>
    guarded(async (user) => {
      const devices = await countSubscriptions(user.id)
      if (!devices) {
        return {
          ok: false,
          devices: 0,
          error: 'Устройств в канале нет. Включите уведомления',
        }
      }
      const res = await sendToUser(user.id, {
        title: '🌿 Листок · На связи',
        body: 'Тест доставки: если вы видите это уведомление, канал работает.',
        data: { url: '/settings', type: 'test' },
      })
      return {
        ok: res.sent > 0,
        sent: res.sent,
        failed: res.failed,
        devices,
        error: res.error,
      }
    })
  )

export const tickBills = createServerFn({ method: 'POST' })
  .handler(async () =>
    guarded(async (user) => {
      if(user.role!=='admin')throw new Error('Это действие доступно администратору')
      const res = await runTick()
      return {
        ...res,
        ok: res.sent > 0 && res.failed === 0,
        error: res.failed > 0 ? res.error || 'Часть уведомлений не принята службой доставки' : res.sent === 0 ? 'На сегодня нет новых напоминаний для отправки' : undefined,
      }
    })
  )

export const triggerEveningCheckin = createServerFn({ method: 'POST' })
  .handler(async () =>
    guarded(async (user) => {
      const devices = await countSubscriptions(user.id)
      if (!devices) {
        return { ok: false, error: 'Уведомления выключены. Включите пуши выше.' }
      }
      const res = await runEveningCheckin(new Date(), user.id)
      return { ok: res.sent > 0, sent: res.sent, failed: res.failed }
    })
  )
