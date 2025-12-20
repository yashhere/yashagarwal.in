import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh() {
    // New content available
  },
  onOfflineReady() {
    // App ready to work offline
  },
})
