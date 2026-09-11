import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { authClientWithoutRedirect } from '~/lib/auth-client'
import { getVkOneTapConfig } from '~/server/functions/auth'

declare global {
  interface Window {
    VKIDSDK?: any
  }
}

const SDK_URL = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js'

function loadSdk(): Promise<any> {
  if (window.VKIDSDK) return Promise.resolve(window.VKIDSDK)
  return new Promise((resolve, reject) => {
    const current = document.querySelector<HTMLScriptElement>('script[data-listok-vkid]')
    if (current) {
      current.addEventListener('load', () => window.VKIDSDK ? resolve(window.VKIDSDK) : reject(new Error('VK ID не загрузился')), { once: true })
      current.addEventListener('error', () => reject(new Error('VK ID не загрузился')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = SDK_URL
    script.async = true
    script.dataset.listokVkid = 'true'
    script.onload = () => window.VKIDSDK ? resolve(window.VKIDSDK) : reject(new Error('VK ID не загрузился'))
    script.onerror = () => reject(new Error('VK ID не загрузился'))
    document.head.appendChild(script)
  })
}

export function VkOneTap({ onFallback }: { onFallback: () => void }) {
  const host = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState<'loading' | 'ready' | 'fallback'>('loading')

  React.useEffect(() => {
    let disposed = false

    async function mount() {
      try {
        const start: any = await authClientWithoutRedirect.signIn.social({
          provider: 'vk',
          callbackURL: '/',
          errorCallbackURL: '/login',
        })
        const authorizationUrl = start?.data?.url || start?.url
        if (!authorizationUrl) throw new Error('VK ID не подготовил вход')

        const state = new URL(authorizationUrl).searchParams.get('state')
        if (!state) throw new Error('VK ID не подготовил защиту входа')
        const config = await getVkOneTapConfig({ data: { state } })
        if (!config || disposed || !host.current) throw new Error('VK ID не подготовил вход')

        const VKID = await loadSdk()
        if (disposed || !host.current) return
        VKID.Config.init({
          app: Number(config.clientId),
          redirectUrl: config.redirectUrl,
          state: config.state,
          codeVerifier: config.codeVerifier,
          responseMode: VKID.ConfigResponseMode.Callback,
          scope: 'email phone',
        })

        const oneTap = new VKID.OneTap()
        oneTap
          .render({ container: host.current, showAlternativeLogin: true })
          .on(VKID.WidgetEvents.ERROR, () => !disposed && setStatus('fallback'))
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: { code?: string; device_id?: string }) => {
            if (!payload?.code) {
              setStatus('fallback')
              return
            }
            const params = new URLSearchParams({ code: payload.code, state: config.state })
            if (payload.device_id) params.set('device_id', payload.device_id)
            window.location.assign(`${config.redirectUrl}?${params.toString()}`)
          })
        setStatus('ready')
      } catch {
        if (!disposed) setStatus('fallback')
      }
    }

    void mount()
    return () => { disposed = true }
  }, [])

  React.useEffect(() => {
    if (status === 'fallback') onFallback()
  }, [status, onFallback])

  if (status === 'fallback') return null

  return (
    <div className="auth-vk-onetap" aria-live="polite">
      {status === 'loading' ? <span className="auth-vk-onetap__loading"><Loader2 size={16} className="animate-spin" /> Готовим VK ID…</span> : null}
      <div ref={host} className={status === 'ready' ? 'auth-vk-onetap__host' : 'hidden'} />
    </div>
  )
}
