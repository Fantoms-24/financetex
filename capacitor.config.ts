import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.chekagent.financetex',
  appName: 'Листок',
  // Небольшой офлайн-экран упаковывается в APK; при сети WebView открывает
  // живую серверную часть ниже, поэтому авторизация и данные остаются общими.
  webDir: 'android-web',
  server: {
    url: 'https://financetex.relaxdev.ru',
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#F4F6F8',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 350,
      backgroundColor: '#F4F6F8',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      overlaysWebView: true,
      backgroundColor: '#FFFFFF',
      style: 'DARK',
    },
    LocalNotifications: {
      smallIcon: 'ic_launcher_foreground',
      iconColor: '#287653',
    },
  },
}

export default config
