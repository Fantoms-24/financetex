import { Capacitor, registerPlugin } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { LocalNotifications } from '@capacitor/local-notifications'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { buildBillReminderPlan, notificationId, type ReminderBill } from './notification-plan'

const NATIVE_NOTIFICATION_PERMISSION_KEY = 'listok-native-notifications'
const REMINDER_CHANNEL_ID = 'listok-reminders'
const EVENING_CHECKIN_ID = 250001
const WELCOME_NOTIFICATION_ID = 250002
const NotificationSettings = registerPlugin<{ openChannel(): Promise<void> }>('NotificationSettings')

let scheduleQueue: Promise<unknown> = Promise.resolve()
let permissionAvailable: boolean | undefined
let exactSettingAvailable = false
function serialized<T>(work: () => Promise<T>): Promise<T> {
  const next = scheduleQueue.then(work, work)
  scheduleQueue = next.catch(() => {})
  return next
}

function supportsNotificationChannels() {
  const match = /Android\s+(\d+)/i.exec(typeof navigator === 'undefined' ? '' : navigator.userAgent)
  return !match || Number(match[1]) >= 8
}

async function ensureReminderChannel(): Promise<{ ready: boolean; blocked: boolean }> {
  if (!supportsNotificationChannels()) return { ready: true, blocked: false }
  await LocalNotifications.createChannel({
    id: REMINDER_CHANNEL_ID,
    name: 'Напоминания Листка',
    description: 'Счета, лимиты и общие расходы',
    importance: 4,
    vibration: true,
    lightColor: '#B9ED78',
  })
  const channels = await LocalNotifications.listChannels()
  const channel = channels.channels.find(c => c.id === REMINDER_CHANNEL_ID)
  return { ready: Boolean(channel) && channel?.importance !== 0, blocked: channel?.importance === 0 }
}

async function exactReminderStatus(): Promise<boolean> {
  try {
    const exact = await LocalNotifications.checkExactNotificationSetting()
    exactSettingAvailable = true
    return exact.exact_alarm === 'granted'
  } catch {
    exactSettingAvailable = false
    return false
  }
}

export async function nativeNotificationStatus() {
  if (!isNativeApp()) return { granted: false, exact: false, exactSettingAvailable: false, settingsAvailable: false, channelBlocked: false, displayPermission: 'denied', error: '' }
  try {
    const permission = await LocalNotifications.checkPermissions()
    let channel = { ready: true, blocked: false }
    try { channel = await ensureReminderChannel() } catch { channel = { ready: !supportsNotificationChannels(), blocked: false } }
    permissionAvailable = permission.display === 'granted' && channel.ready
    const exact = await exactReminderStatus()
    return {
      granted: nativeNotificationWasGranted(),
      exact,
      exactSettingAvailable,
      settingsAvailable: Capacitor.isPluginAvailable('NotificationSettings'),
      channelBlocked: channel.blocked,
      displayPermission: permission.display,
      error: channel.ready || channel.blocked ? '' : 'Android не создал канал напоминаний.',
    }
  } catch {
    permissionAvailable = false
    return { granted: false, exact: false, exactSettingAvailable: false, settingsAvailable: false, channelBlocked: false, displayPermission: 'denied', error: 'Не удалось проверить разрешения Android.' }
  }
}

export async function enableExactNativeReminders() {
  if (isNativeApp() && exactSettingAvailable) await LocalNotifications.changeExactNotificationSetting()
}

export async function openNativeNotificationSettings() {
  if (!isNativeApp() || !Capacitor.isPluginAvailable('NotificationSettings')) {
    throw new Error('Эта настройка появится после обновления Android-приложения.')
  }
  await NotificationSettings.openChannel()
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
  return typeof window !== 'undefined' && permissionAvailable !== false && localStorage.getItem(NATIVE_NOTIFICATION_PERMISSION_KEY) === 'granted'
}

/** Android 13+ показывает системный запрос только по нажатию пользователя. */
export async function requestNativeNotificationPermission() {
  if (!isNativeApp()) return false
  try {
    const current = await LocalNotifications.checkPermissions()
    const permission = current.display === 'granted' ? current : await LocalNotifications.requestPermissions()
    const granted = permission.display === 'granted'
    permissionAvailable = granted
    if (granted) {
      const channel = await ensureReminderChannel().catch(() => ({ ready: !supportsNotificationChannels(), blocked: false }))
      if (!channel.ready) { permissionAvailable = false; return false }
      permissionAvailable = true
      const exact = await exactReminderStatus()
      await serialized(async () => scheduleEveningCheckin(exact))
      localStorage.setItem(NATIVE_NOTIFICATION_PERMISSION_KEY, 'granted')
      window.dispatchEvent(new Event('listok:native-notifications-enabled'))
    }
    return granted
  } catch {
    permissionAvailable = false
    return false
  }
}

async function scheduleEveningCheckin(exact: boolean) {
  await LocalNotifications.schedule({
    notifications: [{
      id: EVENING_CHECKIN_ID,
      title: 'Листок · Итоги дня',
      body: 'День подходит к концу. Проверьте, все ли траты записаны.',
      channelId: REMINDER_CHANNEL_ID,
      group: 'listok-reminders',
      schedule: { on: { hour: 21, minute: 0, second: 0 }, allowWhileIdle: true },
      isExactNotification: exact,
      extra: { source: 'listok-checkin', url: '/' },
    }],
  })
}

/** Обновляет локальные Android-напоминания после изменения списка счетов. */
export async function syncNativeBillReminders(bills: ReminderBill[]) {
  if (!isNativeApp()) return
  return serialized(async () => {
    const status = await nativeNotificationStatus()
    if (!status.granted) return
    const pending = await LocalNotifications.getPending()
    const notifications = buildBillReminderPlan(bills).map((reminder) => ({
        id: reminder.id,
        title: reminder.title,
        body: reminder.body,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
        schedule: { at: reminder.at, allowWhileIdle: true },
        isExactNotification: status.exact,
        extra: { source: 'listok-bill', url: '/bills' },
      }))
    if (notifications.length) await LocalNotifications.schedule({ notifications })
    const ids = new Set(notifications.map(n => n.id))
    const obsolete = pending.notifications.filter(n => n.extra?.source === 'listok-bill' && !ids.has(n.id)).map(n => ({ id: n.id }))
    if (obsolete.length) await LocalNotifications.cancel({ notifications: obsolete })
    await scheduleEveningCheckin(status.exact)
  })
}

/** Показывает настоящее системное уведомление — не веб-баннер. */
export async function sendNativeTestNotification(
  title = 'Листок · На связи',
  body = 'Напоминания работают. Этот баннер пришёл из Android-приложения.'
) {
  if (!isNativeApp()) return false
  try {
    if (!(await nativeNotificationStatus()).granted) return false
    await LocalNotifications.cancel({ notifications: [{ id: WELCOME_NOTIFICATION_ID }] }).catch(() => {})
    await LocalNotifications.schedule({
      notifications: [{
        id: WELCOME_NOTIFICATION_ID,
        title,
        body,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
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
    if (!(await nativeNotificationStatus()).granted) return false
    const id = notificationId(`act-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
    await LocalNotifications.schedule({
      notifications: [{
        id,
        title,
        body,
        channelId: REMINDER_CHANNEL_ID,
        group: 'listok-reminders',
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
  await serialized(async () => {
    const pending = await LocalNotifications.getPending()
    const ours = pending.notifications
      .filter((notification) => String(notification.extra?.source || '').startsWith('listok-'))
      .map((notification) => ({ id: notification.id }))
    if (ours.length) await LocalNotifications.cancel({ notifications: ours })
    await LocalNotifications.removeAllDeliveredNotifications().catch(() => {})
  })
  localStorage.removeItem(NATIVE_NOTIFICATION_PERMISSION_KEY)
  permissionAvailable = false
}

export function nativeHaptic(duration: number) {
  if (!isNativeApp()) return false
  void Haptics.impact({ style: duration >= 10 ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => {})
  return true
}
