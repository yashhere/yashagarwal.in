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
const LIKED_POSTS_KEY = "liked_posts" as const

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

// localStorage cache for liked posts
let likedPostsCache: string[] | null = null

function getLikedPosts(): string[] {
  if (likedPostsCache !== null) return likedPostsCache

  try {
    const stored = localStorage.getItem(LIKED_POSTS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      likedPostsCache = Array.isArray(parsed) ? parsed : []
    } else {
      likedPostsCache = []
    }
  } catch {
    localStorage.removeItem(LIKED_POSTS_KEY)
    likedPostsCache = []
  }
  return likedPostsCache
}

function setLikedPosts(posts: string[]): void {
  likedPostsCache = posts
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(posts))
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

  // Like Button Component
  Alpine.data("likeButton", () => ({
    likes: 0,
    hasLiked: false,
    loading: true,
    submitting: false,
    slug: "" as string,

    async init() {
      // Read slug from data attribute to prevent XSS
      this.slug = this.$el.dataset.slug || ""
      if (!this.slug) {
        console.error("LikeButton: missing data-slug attribute")
        this.loading = false
        return
      }

      // Check localStorage for optimistic UI using cached value
      const likedPosts = getLikedPosts()
      this.hasLiked = likedPosts.includes(this.slug)

      // Listen for storage events to sync across tabs
      window.addEventListener("storage", this.handleStorageChange.bind(this))

      // Listen for same-page like state changes
      window.addEventListener("likeStateChanged", this.handleLikeStateChange.bind(this) as EventListener)

      await this.fetchLikes()
    },

    destroy() {
      // Cleanup event listeners when component is destroyed
      window.removeEventListener("storage", this.handleStorageChange.bind(this))
      window.removeEventListener("likeStateChanged", this.handleLikeStateChange.bind(this) as EventListener)
    },

    handleLikeStateChange(e: Event) {
      // Sync state when another like button on the same page changes
      const customEvent = e as CustomEvent<{ slug: string; hasLiked: boolean }>
      if (customEvent.detail.slug === this.slug) {
        this.hasLiked = customEvent.detail.hasLiked
        // Optionally refetch to get accurate count
        this.fetchLikes()
      }
    },

    handleStorageChange(e: StorageEvent): void {
      // Sync liked state when another tab updates localStorage
      if (e.key === LIKED_POSTS_KEY && e.newValue) {
        try {
          const likedPosts = JSON.parse(e.newValue)
          const wasLiked = this.hasLiked

          // Invalidate cache and update
          likedPostsCache = Array.isArray(likedPosts) ? likedPosts : []
          this.hasLiked = likedPostsCache.includes(this.slug)

          // If state changed, refetch likes count
          if (wasLiked !== this.hasLiked) {
            this.fetchLikes()
          }
        } catch (_e) {
          console.error("Failed to parse storage event:", _e)
        }
      }
    },

    async fetchLikes(): Promise<void> {
      try {
        // Return mock data in dev to avoid polluting production stats
        if (IS_DEV) {
          await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
          const likedPosts = getLikedPosts()
          const mockLikes = Math.floor(Math.random() * 20) + 5 // Random 5-25
          this.likes = likedPosts.includes(this.slug)
            ? mockLikes
            : mockLikes - 1
          this.loading = false
          console.log("[DEV] Mock likes for", this.slug, ":", this.likes)
          return
        }

        const response = await fetchWithTimeout(
          `${API_BASE_URL}/api/likes/${encodeURIComponent(this.slug)}`
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        // Validate response type to ensure numeric value
        this.likes = typeof data.likes === 'number' ? data.likes : 0
      } catch (error) {
        console.error("Failed to load likes:", error)
      } finally {
        this.loading = false
      }
    },

    async toggleLike(): Promise<void> {
      // Atomic check-and-set to prevent race condition from rapid clicks
      if (this.submitting) return
      this.submitting = true

      // Yield to allow DOM update (button disable) before processing
      await new Promise((resolve) => setTimeout(resolve, 0))

      const wasLiked = this.hasLiked
      const previousLikes = this.likes

      // Optimistic update
      this.hasLiked = !this.hasLiked
      this.likes += this.hasLiked ? 1 : -1

      try {
        // Mock like/unlike in dev to avoid polluting production stats
        if (IS_DEV) {
          await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
          // Update localStorage
          this.updateLocalStorage(this.hasLiked)
          console.log(
            "[DEV] Mock like action:",
            this.hasLiked ? "like" : "unlike",
            "for",
            this.slug
          )
          this.submitting = false
          return
        }

        // Send like/unlike action to new DO-based endpoint with timeout
        const response = await fetchWithTimeout(
          `${API_BASE_URL}/api/likes/${encodeURIComponent(this.slug)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: this.hasLiked ? "like" : "unlike",
            }),
          }
        )

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        // Backend returns the updated count - intentionally overrides optimistic update
        // to ensure server is the source of truth and handle concurrent updates correctly
        const data = await response.json()
        if (typeof data.likes === 'number') {
          this.likes = data.likes
        }

        // Update localStorage with atomic read-modify-write
        this.updateLocalStorage(this.hasLiked)
      } catch (error) {
        // Revert on error
        this.hasLiked = wasLiked
        this.likes = previousLikes
        console.error("Failed to update like:", error)
        // Error is silently handled - button state reverts to show user the action failed
      } finally {
        this.submitting = false
      }
    },

    updateLocalStorage(shouldAdd: boolean): void {
      // Atomic read-modify-write using cached value to prevent race conditions
      try {
        const likedPosts = getLikedPosts()

        if (shouldAdd) {
          if (!likedPosts.includes(this.slug)) {
            likedPosts.push(this.slug)
          }
        } else {
          const index = likedPosts.indexOf(this.slug)
          if (index > -1) {
            likedPosts.splice(index, 1)
          }
        }

        setLikedPosts(likedPosts)

        // Dispatch custom event for same-page sync (storage event only works cross-tab)
        window.dispatchEvent(new CustomEvent('likeStateChanged', {
          detail: { slug: this.slug, hasLiked: shouldAdd }
        }))
      } catch (_e) {
        console.error("Failed to update localStorage:", _e)
      }
    },
  }))
}
