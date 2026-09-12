import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { LocalNotifications } from '@capacitor/local-notifications'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

const NATIVE_NOTIFICATION_PERMISSION_KEY = 'listok-native-notifications'
const REMINDER_CHANNEL_ID = 'listok-reminders'
const EVENING_CHECKIN_ID = 250001
const WELCOME_NOTIFICATION_ID = 250002

type NativeBillReminder = {
  id: string
  title: string
  amount: number
  day_of_month: number
  notify: boolean
  paused?: boolean
  paid_cycle?: string | null
}

export function isNativeApp() {
  return typeof window !== 'undefined' && Capacitor.isNativePlatform()
}

/** Делает WebView похожим на цельное Android-приложение, а не на страницу в браузере. */
export async function prepareNativeShell() {
  if (!isNativeApp()) return
  document.documentElement.classList.add('native-shell')
  await Promise.allSettled([
    StatusBar.setOverlaysWebView({ overlay: true }),
    StatusBar.setBackgroundColor({ color: '#ffffff' }),
    StatusBar.setStyle({ style: Style.Dark }),
    Keyboard.setResizeMode({ mode: KeyboardResize.Body }),
    SplashScreen.hide({ fadeOutDuration: 180 }),
  ])
}

/** Синхронизирует системную строку Android с выбранной темой. */
export async function applyNativeTheme(dark: boolean) {
  if (!isNativeApp()) return
  await Promise.allSettled([
    StatusBar.setBackgroundColor({ color: dark ? '#20262c' : '#ffffff' }),
    StatusBar.setStyle({ style: dark ? Style.Light : Style.Dark }),
  ])
}

export function nativeNotificationWasGranted() {
  return typeof window !== 'undefined' && localStorage.getItem(NATIVE_NOTIFICATION_PERMISSION_KEY) === 'granted'
}

/** Android 13+ показывает системный запрос только по нажатию пользователя. */
export async function requestNativeNotificationPermission() {
  if (!isNativeApp()) return false
  try {
    const current = await LocalNotifications.checkPermissions()
    const permission = current.display === 'granted' ? current : await LocalNotifications.requestPermissions()
    const granted = permission.display === 'granted'
    if (granted) {
      localStorage.setItem(NATIVE_NOTIFICATION_PERMISSION_KEY, 'granted')
      await LocalNotifications.createChannel({
        id: REMINDER_CHANNEL_ID,
        name: 'Напоминания Листка',
        description: 'Счета, лимиты и общие расходы',
        importance: 4,
        vibration: true,
        lightColor: '#B9ED78',
      })
      await scheduleEveningCheckin()
      // Системный баннер сразу подтверждает, что разрешение действительно работает.
      await sendNativeTestNotification('Уведомления включены', 'Напомним о счетах и подведём итоги дня в 21:00.')
      window.dispatchEvent(new Event('listok:native-notifications-enabled'))
    }
    return granted
  } catch {
    return false
  }
}

function notificationId(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index++) hash = (hash * 31 + value.charCodeAt(index)) | 0
  return 300000 + (Math.abs(hash) % 1_500_000_000)
}

function nextBillReminder(dayOfMonth: number) {
  const now = new Date()
  const makeReminder = (year: number, month: number) => {
    const due = new Date(year, month + 1, 0)
    due.setDate(Math.min(Math.max(1, dayOfMonth), due.getDate()))
    due.setHours(10, 0, 0, 0)
    due.setDate(due.getDate() - 1)
    return due
  }
  const current = makeReminder(now.getFullYear(), now.getMonth())
  return current > now ? current : makeReminder(now.getFullYear(), now.getMonth() + 1)
}

async function scheduleEveningCheckin() {
  await LocalNotifications.cancel({ notifications: [{ id: EVENING_CHECKIN_ID }] }).catch(() => {})
  await LocalNotifications.schedule({
    notifications: [{
      id: EVENING_CHECKIN_ID,
      title: 'Листок · Итоги дня',
      body: 'День подходит к концу. Проверьте, все ли траты записаны.',
      channelId: REMINDER_CHANNEL_ID,
      group: 'listok-reminders',
      schedule: { on: { hour: 21, minute: 0 }, allowWhileIdle: true },
      isExactNotification: false,
      extra: { source: 'listok-checkin', url: '/' },
    }],
  })
}

/** Обновляет локальные Android-напоминания после изменения списка счетов. */
export async function syncNativeBillReminders(bills: NativeBillReminder[]) {
  if (!isNativeApp() || !nativeNotificationWasGranted()) return
  try {
    const pending = await LocalNotifications.getPending()
    const old = pending.notifications
      .filter((notification) => notification.extra?.source === 'listok-bill')
      .map((notification) => ({ id: notification.id }))
    if (old.length) await LocalNotifications.cancel({ notifications: old })

    const notifications = bills
      .filter((bill) => bill.notify && !bill.paused && !bill.paid_cycle)
      .map((bill) => ({
        id: notificationId(bill.id),
        title: `Завтра платёж: ${bill.title}`,
        body: `Запланировано ${Math.round(bill.amount).toLocaleString('ru-RU')} ₽.`,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
        schedule: { at: nextBillReminder(bill.day_of_month), allowWhileIdle: true },
        isExactNotification: false,
        extra: { source: 'listok-bill', billId: bill.id, url: '/bills' },
      }))
    if (notifications.length) await LocalNotifications.schedule({ notifications })
    await scheduleEveningCheckin()
  } catch {
    // Нативный слой не должен ломать приложение при ошибке планировщика.
  }
}

/** Показывает настоящее системное уведомление — не веб-баннер. */
export async function sendNativeTestNotification(
  title = 'Листок · На связи',
  body = 'Напоминания работают. Этот баннер пришёл из Android-приложения.'
) {
  if (!isNativeApp()) return false
  try {
    await LocalNotifications.cancel({ notifications: [{ id: WELCOME_NOTIFICATION_ID }] }).catch(() => {})
    await LocalNotifications.schedule({
      notifications: [{
        id: WELCOME_NOTIFICATION_ID,
        title,
        body,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
        schedule: { at: new Date(Date.now() + 2500), allowWhileIdle: true },
        foreground: true,
        isExactNotification: false,
        extra: { source: 'listok-test', url: '/settings' },
      }],
    })
    return true
  } catch {
    return false
  }
}

/** Показывает системное Android-уведомление для оперативных действий (Вместе, чеки, счета). */
export async function sendNativeNotification(
  title: string,
  body: string,
  url = '/groups'
) {
  if (!isNativeApp() || !nativeNotificationWasGranted()) return false
  try {
    const id = notificationId(`act-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
    await LocalNotifications.schedule({
      notifications: [{
        id,
        title,
        body,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
        schedule: { at: new Date(Date.now() + 100), allowWhileIdle: true },
        foreground: true,
        isExactNotification: false,
        extra: { source: 'listok-action', url },
      }],
    })
    return true
  } catch {
    return false
  }
}

export async function disableNativeNotifications() {
  if (!isNativeApp()) return
  localStorage.removeItem(NATIVE_NOTIFICATION_PERMISSION_KEY)
  try {
    const pending = await LocalNotifications.getPending()
    const ours = pending.notifications
      .filter((notification) => String(notification.extra?.source || '').startsWith('listok-'))
      .map((notification) => ({ id: notification.id }))
    if (ours.length) await LocalNotifications.cancel({ notifications: ours })
  } catch {
    /* Permission remains in Android settings; only Listok's schedules are removed. */
  }
}

export function nativeHaptic(duration: number) {
  if (!isNativeApp()) return false
  void Haptics.impact({ style: duration >= 10 ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => {})
  return true
}
