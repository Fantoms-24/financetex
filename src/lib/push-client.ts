import { pushSubscribe, pushUnsubscribe, vapidPublic } from '~/server/functions/push'
import {
  disableNativeNotifications,
  isNativeApp,
  nativeNotificationWasGranted,
  requestNativeNotificationPermission,
} from '~/lib/native'

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
  const permission = Notification.permission
  return { permission, granted: permission === 'granted' }
}

export async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
    // Немедленно запрашиваем обновление sw.js, чтобы применились свежие фиксы
    await reg.update().catch(() => {})
    await navigator.serviceWorker.ready
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
export async function enablePush(): Promise<PushResult> {
  if (!pushSupported()) return { ok: false, error: 'Браузер не умеет пуши' }
  if (isNativeApp()) {
    const granted = await requestNativeNotificationPermission()
    return granted ? { ok: true } : { ok: false, error: 'Разрешение не дано в настройках Android' }
  }
  if (isIos() && !isStandalone()) {
    return { ok: false, error: 'На iPhone сначала на Домой' }
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return { ok: false, error: 'Разрешение не дано' }

    const reg = (await registerSW()) || (await navigator.serviceWorker.ready)
    if (!reg) return { ok: false, error: 'Не удалось включить фон' }
    await reg.update().catch(() => {})

    const { publicKey } = await vapidPublic()
    if (!publicKey) return { ok: false, error: 'Ключ пушей не настроен' }

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
    const res = await pushSubscribe({
      data: { endpoint: json.endpoint!, p256dh: keys.p256dh || '', auth: keys.auth || '' },
    })

    if ((res as any)?.error) return { ok: false, error: (res as any).error }
    return { ok: true, endpoint: json.endpoint ?? undefined }
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
  if (isNativeApp()) {
    await disableNativeNotifications()
    return
  }
  try {
    const reg = (await navigator.serviceWorker.getRegistration('/')) || (await navigator.serviceWorker.ready)
    const sub = await reg?.pushManager.getSubscription()
    if (sub) {
      await pushUnsubscribe({ data: { endpoint: sub.endpoint } })
      await sub.unsubscribe().catch(() => {})
    }
  } catch {
    /* */
  }
}

export async function currentEndpoint(): Promise<string | null> {
  try {
    if (!pushSupported()) return null
    const reg = (await navigator.serviceWorker.getRegistration('/')) || (await navigator.serviceWorker.ready)
    const sub = await reg?.pushManager.getSubscription()
    return sub?.endpoint ?? null
  } catch {
    return null
  }
}
