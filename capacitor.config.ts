import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.chekagent.financetex',
  appName: 'ЧекАгент',
  webDir: 'public',
  server: {
    url: 'https://financetex.onrender.com',
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#f3eee4',
  },
}

export default config
