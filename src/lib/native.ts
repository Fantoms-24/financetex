import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

export function isNativeApp() {
  return typeof window !== 'undefined' && Capacitor.isNativePlatform()
}

/** Делает WebView похожим на цельное Android-приложение, а не на страницу в браузере. */
export async function prepareNativeShell() {
  if (!isNativeApp()) return
  document.documentElement.classList.add('native-shell')
  await Promise.allSettled([
    StatusBar.setOverlaysWebView({ overlay: true }),
    StatusBar.setBackgroundColor({ color: '#f3eee4' }),
    StatusBar.setStyle({ style: Style.Light }),
    Keyboard.setResizeMode({ mode: KeyboardResize.Body }),
    SplashScreen.hide({ fadeOutDuration: 180 }),
  ])
}

export function nativeHaptic(duration: number) {
  if (!isNativeApp()) return false
  void Haptics.impact({ style: duration >= 10 ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => {})
  return true
}
