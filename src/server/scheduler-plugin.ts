import { defineNitroPlugin } from 'nitro/runtime'
import { startBackgroundScheduler } from './tick'

export default defineNitroPlugin(() => {
  startBackgroundScheduler()
})
