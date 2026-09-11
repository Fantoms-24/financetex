import { createFileRoute } from '@tanstack/react-router'
import { getAuth } from '~/server/auth'

/**
 * Единая точка OAuth Better Auth. VK возвращает пользователя сюда после
 * подтверждения: /api/auth/callback/vk.
 */
export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: ({ request }) => getAuth().handler(request),
      POST: ({ request }) => getAuth().handler(request),
    },
  },
})
