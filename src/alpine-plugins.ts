import type { Alpine } from "alpinejs"
import collapse from "@alpinejs/collapse"
import tooltip from "@ryangjchandler/alpine-tooltip"

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse)

  // Configure default tooltip options with Tippy.js defaults
  Alpine.plugin(tooltip, {
    theme: "custom",
    placement: "top",
    arrow: false,
    interactive: true, // Allow touch interaction on mobile
    touch: ["hold", 500], // Show on long press (500ms)
    hideOnClick: true,
    maxWidth: "none", // We handle max-width in CSS
  })

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
        { rootMargin: "100px" },
      )
      observer.observe(this.$el)
    },

    async fetchViews() {
      try {
        // Use local API in development, Workers proxy in production
        const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        const baseUrl = isDev ? "" : "https://analytics.yashagarwal.in"

        const response = await fetch(
          `${baseUrl}/api/query/${encodeURIComponent(this.slug)}`,
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()

        // Use the exact count from Umami (it handles session deduplication)
        this.views = data.views || 0
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

      // Check localStorage for optimistic UI
      this.updateLikedStateFromStorage()

      // Listen for storage events to sync across tabs
      window.addEventListener("storage", this.handleStorageChange.bind(this))

      await this.fetchLikes()
    },

    destroy() {
      // Cleanup event listener when component is destroyed
      window.removeEventListener("storage", this.handleStorageChange.bind(this))
    },

    handleStorageChange(e: StorageEvent) {
      // Sync liked state when another tab updates localStorage
      if (e.key === "liked_posts" && e.newValue) {
        try {
          const likedPosts = JSON.parse(e.newValue)
          const wasLiked = this.hasLiked
          this.hasLiked = Array.isArray(likedPosts) && likedPosts.includes(this.slug)

          // If state changed, refetch likes count
          if (wasLiked !== this.hasLiked) {
            this.fetchLikes()
          }
        } catch (e) {
          console.error("Failed to parse storage event:", e)
        }
      }
    },

    updateLikedStateFromStorage() {
      const stored = localStorage.getItem("liked_posts")
      if (stored) {
        try {
          const likedPosts = JSON.parse(stored)
          this.hasLiked = Array.isArray(likedPosts) && likedPosts.includes(this.slug)
        } catch (e) {
          localStorage.removeItem("liked_posts")
        }
      }
    },

    async fetchLikes() {
      try {
        // Use local API in development, Workers proxy in production
        const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        const baseUrl = isDev ? "" : "https://analytics.yashagarwal.in"

        const response = await fetch(
          `${baseUrl}/api/likes/${encodeURIComponent(this.slug)}`,
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        this.likes = data.likes || 0
      } catch (error) {
        console.error("Failed to load likes:", error)
      } finally {
        this.loading = false
      }
    },

    async toggleLike() {
      if (this.submitting) return

      this.submitting = true
      const wasLiked = this.hasLiked
      const previousLikes = this.likes

      // Optimistic update
      this.hasLiked = !this.hasLiked
      this.likes += this.hasLiked ? 1 : -1

      try {
        // Use local API in development, Workers proxy in production
        const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        const baseUrl = isDev ? "" : "https://analytics.yashagarwal.in"

        // Send like/unlike action to new DO-based endpoint
        const response = await fetch(
          `${baseUrl}/api/likes/${encodeURIComponent(this.slug)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: this.hasLiked ? "like" : "unlike",
            }),
          },
        )

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        // Backend returns the updated count - use it (overrides optimistic update)
        const data = await response.json()
        if (data.likes !== undefined) {
          this.likes = data.likes
        }

        // Update localStorage with atomic read-modify-write
        this.updateLocalStorage(this.hasLiked)
      } catch (error) {
        // Revert on error
        this.hasLiked = wasLiked
        this.likes = previousLikes
        console.error("Failed to update like:", error)
        alert("Failed to update like. Please try again.")
      } finally {
        this.submitting = false
      }
    },

    updateLocalStorage(shouldAdd: boolean) {
      // Atomic read-modify-write to prevent race conditions
      try {
        const stored = localStorage.getItem("liked_posts") || "[]"
        let likedPosts = JSON.parse(stored)
        if (!Array.isArray(likedPosts)) likedPosts = []

        if (shouldAdd) {
          if (!likedPosts.includes(this.slug)) {
            likedPosts.push(this.slug)
          }
        } else {
          likedPosts = likedPosts.filter((s: string) => s !== this.slug)
        }

        localStorage.setItem("liked_posts", JSON.stringify(likedPosts))
      } catch (e) {
        console.error("Failed to update localStorage:", e)
      }
    },
  }))
}
