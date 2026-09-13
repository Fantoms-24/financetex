import { pushSubscribe, pushUnsubscribe, vapidPublic } from '~/server/functions/push'
import {
  disableNativeNotifications,
  isNativeApp,
  nativeNotificationWasGranted,
  requestNativeNotificationPermission,
} from '~/lib/native'

const PUSH_PREFERENCE = 'listok-web-push'
let enabling: Promise<PushResult> | null = null

function timeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Сервис уведомлений не ответил. Повторите при устойчивой сети.')), ms)
    promise.then(resolve, reject).finally(() => clearTimeout(timer))
  })
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  const nav = window.navigator as any
  if (nav.standalone === true) return true
  try {
    return window.matchMedia('(display-mode: standalone)').matches
  } catch {
    return false
  }
}

export function isIos(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  return /iphone|ipad|ipod/i.test(ua) || (/Macintosh/i.test(ua) && (navigator as any).maxTouchPoints > 1)
}

export function pushSupported(): boolean {
  if (isNativeApp()) return true
  return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}

export function pushState(): { permission: NotificationPermission; granted: boolean } {
  if (isNativeApp()) {
    const granted = nativeNotificationWasGranted()
    return { permission: granted ? 'granted' : 'default', granted }
  }
  if (!pushSupported()) return { permission: 'default', granted: false }
  const permission = typeof Notification !== 'undefined' ? Notification.permission : 'default'
  return { permission, granted: permission === 'granted' && localStorage.getItem(PUSH_PREFERENCE) === 'enabled' }
}

export async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (isNativeApp() || typeof window === 'undefined' || !('serviceWorker' in navigator)) return null
  try {
    const reg = await timeout(navigator.serviceWorker.register('/sw.js', { scope: '/' }))
    // Немедленно запрашиваем обновление sw.js, чтобы применились свежие фиксы
    void reg.update().catch(() => {})
    await timeout(navigator.serviceWorker.ready)
    return reg
  } catch {
    return null
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i)
  return output
}

export interface PushResult {
  ok: boolean
  endpoint?: string
  error?: string
}

/** Запрашивает разрешение, подписывает и сохраняет подписку на сервере. */
export function enablePush(): Promise<PushResult> {
  if (!enabling) enabling = enablePushOnce().finally(() => { enabling = null })
  return enabling
}

export async function restorePush(): Promise<void> {
  if (isNativeApp() || !pushSupported() || localStorage.getItem(PUSH_PREFERENCE) === 'disabled') return
  if (Notification.permission === 'granted') await enablePush()
}

async function enablePushOnce(): Promise<PushResult> {
  if (!pushSupported()) return { ok: false, error: 'Браузер не умеет пуши' }

  if (isNativeApp()) {
    const granted = await requestNativeNotificationPermission()
    if (granted) await removeLegacyWebSubscription()
    return { ok: granted, error: granted ? undefined : 'Android не разрешил уведомления или не удалось сохранить расписание.' }
  }

  if (isIos() && !isStandalone()) {
    return { ok: false, error: 'На iPhone сначала на Домой' }
  }

  try {
    let permission: NotificationPermission = 'default'
    if (typeof Notification !== 'undefined') {
      try {
        permission = await Notification.requestPermission()
      } catch {
        /* ignore */
      }
      if (permission !== 'granted') {
        return { ok: false, error: 'Разрешение не дано' }
      }
    }

    const reg = await registerSW()
    if (!reg) {
      return { ok: false, error: 'Не удалось включить фон' }
    }

    const { publicKey } = await timeout(vapidPublic())
    if (!publicKey) {
      return { ok: false, error: 'Ключ пушей не настроен' }
    }

    if ('pushManager' in reg) {
      let sub = await reg.pushManager.getSubscription()
      if (!sub || !matchesKey(sub, publicKey)) {
        if (sub) await sub.unsubscribe().catch(() => {})
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey) as unknown as ArrayBuffer,
        })
      }

      const json = sub.toJSON()
      const keys = (json as any)?.keys || {}
      const res = await timeout(pushSubscribe({
        data: { endpoint: json.endpoint!, p256dh: keys.p256dh || '', auth: keys.auth || '' },
      }))

      if ((res as any)?.error) return { ok: false, error: (res as any).error }
      localStorage.setItem(PUSH_PREFERENCE, 'enabled')
      return { ok: true, endpoint: json.endpoint ?? undefined }
    }

    return { ok: false, error: 'Браузер не поддерживает доставку уведомлений' }
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Не получилось включить пуши' }
  }
}

/** Ключ VAPID сменился (ротация на деплое) — старую подписку надо перевыпустить. */
function matchesKey(sub: PushSubscription, publicKey: string): boolean {
  try {
    const raw = sub.options?.applicationServerKey
    if (!raw) return false
    const buf = new Uint8Array(raw as ArrayBuffer)
    const current = urlBase64ToUint8Array(publicKey)
    if (buf.length !== current.length) return false
    return buf.every((v, i) => v === current[i])
  } catch {
    return false
  }
}

export async function disablePush(): Promise<void> {
  if (enabling) await enabling.catch(() => {})
  if (isNativeApp()) {
    let localError: unknown
    try { await disableNativeNotifications() } catch (error) { localError = error }
    await removeLegacyWebSubscription()
    if (localError) throw localError
    return
  }
  localStorage.setItem(PUSH_PREFERENCE, 'disabled')
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration('/')
    const sub = await reg?.pushManager.getSubscription()
    if (sub) {
      let removalError: Error | null = null
      try {
        const result = await timeout(pushUnsubscribe({ data: { endpoint: sub.endpoint } }))
        if ('error' in result) removalError = new Error(String(result.error))
      } catch (error) {
        removalError = error instanceof Error ? error : new Error('Сервер не ответил')
      }
      await sub.unsubscribe().catch(() => {})
      if (removalError) throw removalError
    }
  }
}

/** APK releases before local reminders could leave a Web Push subscription behind. */
async function removeLegacyWebSubscription(): Promise<void> {
  localStorage.setItem(PUSH_PREFERENCE, 'disabled')
  if (!('serviceWorker' in navigator)) return
  let registration: ServiceWorkerRegistration | undefined
  try { registration = await navigator.serviceWorker.getRegistration('/') } catch { return }
  const subscription = await registration?.pushManager?.getSubscription().catch(() => null)
  if (!subscription) return
  await timeout(pushUnsubscribe({ data: { endpoint: subscription.endpoint } }), 3000).catch(() => null)
  await subscription.unsubscribe().catch(() => false)
}

export async function currentEndpoint(): Promise<string | null> {
  try {
    if (isNativeApp() || !pushSupported()) return null
    const reg = await navigator.serviceWorker.getRegistration('/')
    const sub = await reg?.pushManager.getSubscription()
    return sub?.endpoint ?? null
  } catch {
    return null
  }
}
