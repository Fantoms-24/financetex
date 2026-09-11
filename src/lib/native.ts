import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { LocalNotifications } from '@capacitor/local-notifications'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

const NATIVE_NOTIFICATION_PERMISSION_KEY = 'listok-native-notifications'

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
        id: 'listok-reminders',
        name: 'Напоминания Листка',
        description: 'Счета, лимиты и общие расходы',
        importance: 4,
        vibration: true,
        lightColor: '#B9ED78',
      })
    }
    return granted
  } catch {
    return false
  }
}

export function nativeHaptic(duration: number) {
  if (!isNativeApp()) return false
  void Haptics.impact({ style: duration >= 10 ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => {})
  return true
}
