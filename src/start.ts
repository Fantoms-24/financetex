import { createStart, createCsrfMiddleware } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  requestMiddleware: [
    createCsrfMiddleware({
      filter: (ctx) => ctx.handlerType === 'serverFn',
      secFetchSite: () => true,
      origin: () => true,
      referer: () => true,
      allowRequestsWithoutOriginCheck: true,
    }),
  ],
}))
