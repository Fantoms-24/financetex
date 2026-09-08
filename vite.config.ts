import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

/** LAN-адрес машины — на него заходим с телефона. */
function lanIp(): string | null {
  for (const list of Object.values(os.networkInterfaces())) {
    for (const n of list || []) {
      if (n.family === 'IPv4' && !n.internal) return n.address
    }
  }
  return null
}

/**
 * Самоподписанный сертификат для dev по https.
 *
 * Телефон по http://192.168.x.x не в secure context: service worker не
 * регистрируется, а значит нет ни пушей, ни «Установить приложение».
 * Сертификат свой, поэтому Chrome ругается — на телефоне надо один раз
 * нажать «Дополнительно → Перейти». SAN пересобираем, если сменился LAN-IP.
 *
 * Включается: npm run dev:https
 */
function devHttps() {
  const dir = path.resolve('.dev-cert')
  const ip = lanIp()
  const key = path.join(dir, 'key.pem')
  const cert = path.join(dir, 'cert.pem')
  const stamp = path.join(dir, 'ip.txt')

  fs.mkdirSync(dir, { recursive: true })
  const same = fs.existsSync(key) && fs.existsSync(cert) && fs.readFileSync(stamp, 'utf8') === String(ip)

  if (!same) {
    execFileSync(
      'openssl',
      [
        'req', '-x509', '-newkey', 'rsa:2048', '-nodes',
        '-keyout', key, '-out', cert, '-days', '365',
        '-subj', '/CN=ChekAgent dev',
        '-addext', `subjectAltName=DNS:localhost,IP:127.0.0.1${ip ? `,IP:${ip}` : ''}`,
      ],
      { stdio: 'ignore' },
    )
    fs.writeFileSync(stamp, String(ip))
  }

  return { key: fs.readFileSync(key), cert: fs.readFileSync(cert) }
}

// npm кладёт имя скрипта в npm_lifecycle_event — так dev:https работает
// и в PowerShell, и в bash, без cross-env.
const httpsOn = process.env.DEV_HTTPS === '1' || process.env.npm_lifecycle_event === 'dev:https'

// Nitro нужен только на сборке: он выдаёт .vercel/output (Build Output API),
// туда же попадают sw.js, manifest и иконки. Крон /api/push/tick живёт
// только в vercel.json — в config.json его не дублируем.
// В dev работаем на чистом Vite, чтобы не трогать порт 8080.
export default defineConfig(({ command, mode }) => {
  // В dev Vite сам не кладёт .env в process.env (это делает только для
  // VITE_*-переменных и только в клиентский бандл). Серверный код читает
  // process.env напрямую, поэтому подкладываем файл руками. На сборке не
  // трогаем: там переменные приходят с площадки, а локальный .env мог бы
  // уехать в бандл.
  if (command === 'serve') Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [
    tailwindcss(),
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    // Обязателен: без него в dev падает virtual:tanstack-start-dev-client-entry
    // («requires the React Refresh runtime, but /@react-refresh could not be
    // resolved») — страница остаётся на сплэше и выглядит пустой.
    // СТОЯТЬ ПОСЛЕ tanstackStart(): внутри него лежит @tanstack/router-plugin,
    // и он требует, чтобы JSX-плагин шёл позже роутера.
    react(),
    ...(command === 'build'
      ? [
          // В nitro 3 плагин принимает { config: NitroConfig }, а не сам конфиг:
          // если передать preset напрямую, он молча игнорируется.
          // На Render (RENDER=true) или при явном NITRO_PRESET=node-server
          // собираем стандартный Node.js сервер в .output для запуска через "npm start".
          // На Vercel по умолчанию собираем в .vercel/output.
          (() => {
            const isRender = Boolean(process.env.RENDER)
            const preset = process.env.NITRO_PRESET || (isRender ? 'node-server' : 'vercel')
            const defaultDir = preset === 'vercel' ? '.vercel/output' : '.output'
            return nitro({
              config: {
                preset,
                output: { dir: process.env.NITRO_OUTPUT_DIR || defaultDir },
                externals: {
                  external: ['pg'],
                },
                // SW лежит в корне static, но область действия / разрешаем явно
                routeRules: {
                  '/sw.js': {
                    headers: {
                      'Service-Worker-Allowed': '/',
                      'Cache-Control': 'public, max-age=0, must-revalidate',
                    },
                  },
                },
              },
            })
          })(),
        ]
      : []),
    ],
    ssr: {
      external: ['pg'],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      ...(httpsOn ? { https: devHttps() } : {}),
    },
  }
})
