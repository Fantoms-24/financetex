import { createStart } from '@tanstack/react-start'
import { useLocal } from '~/lib/store'

/**
 * Cookie в iframe-превью не доезжает — кладём session token в Authorization
 * на каждый вызов серверной функции. На проде cookie тоже работает.
 */
export const startInstance = createStart(() => ({
  serverFns: {
    fetch: (input, init) => {
      try {
        const token = useLocal.getState().token
        if (token) {
          const headers = new Headers((init as RequestInit | undefined)?.headers)
          headers.set('Authorization', `Bearer ${token}`)
          return fetch(input as RequestInfo, { ...(init as RequestInit), headers })
        }
      } catch {
        /* SSR или нет токена */
      }
      return fetch(input as RequestInfo, init as RequestInit | undefined)
    },
  },
}))
