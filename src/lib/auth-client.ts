import { createAuthClient } from 'better-auth/client'

/** Клиент Better Auth для OAuth-редиректов. Секреты здесь не используются. */
export const authClient = createAuthClient()

/** Нужен OneTap: получаем подготовленный OAuth URL, не уходя с текущего экрана. */
export const authClientWithoutRedirect = createAuthClient({
  disableDefaultFetchPlugins: true,
})
