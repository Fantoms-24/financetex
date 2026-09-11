import { createAuthClient } from 'better-auth/client'

/** Клиент Better Auth для OAuth-редиректов. Секреты здесь не используются. */
export const authClient = createAuthClient()
