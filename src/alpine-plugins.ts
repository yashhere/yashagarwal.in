import collapse from "@alpinejs/collapse"
import tooltip from "@ryangjchandler/alpine-tooltip"
import type { Alpine } from "alpinejs"

// Environment detection - calculated once at module level
const IS_DEV =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
const API_BASE_URL = IS_DEV ? "" : "https://analytics.yashagarwal.in"
const REQUEST_TIMEOUT = 8000 // 8 seconds

// Fetch with timeout to prevent hanging requests
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}


export default (Alpine: Alpine) => {
  Alpine.plugin(collapse)
  Alpine.plugin(tooltip)

  // View Counter Component
  Alpine.data("viewCounter", () => ({
    views: null as number | null,
    loading: true,
    slug: "" as string,

    async init() {
      // Read slug from data attribute to prevent XSS
      this.slug = this.$el.dataset.slug || ""
      if (!this.slug) {
        console.error("ViewCounter: missing data-slug attribute")
        this.loading = false
        return
      }

      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            await this.fetchViews()
            observer.disconnect()
          }
        },
        { rootMargin: "100px" }
      )
      observer.observe(this.$el)
    },

    async fetchViews(): Promise<void> {
      try {
        // Return mock data in dev to avoid polluting production stats
        if (IS_DEV) {
          await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
          this.views = Math.floor(Math.random() * 100) + 50 // Random 50-150
          this.loading = false
          console.log("[DEV] Mock views for", this.slug, ":", this.views)
          return
        }

        const response = await fetchWithTimeout(
          `${API_BASE_URL}/api/query/${encodeURIComponent(this.slug)}`
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()

        // Use the exact count from Umami (it handles session deduplication)
        // Validate response type to ensure numeric value
        this.views = typeof data.views === 'number' ? data.views : 0
      } catch (error) {
        console.error("Failed to load views:", error)
        this.views = null
      } finally {
        this.loading = false
      }
    },
  }))


}
