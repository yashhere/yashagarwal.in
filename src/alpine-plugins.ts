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
  Alpine.data("viewCounter", (slug: string) => ({
    views: null as number | null,
    loading: true,

    async init() {
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
          `${baseUrl}/api/query/${encodeURIComponent(slug)}`,
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
  Alpine.data("likeButton", (slug: string) => ({
    likes: 0,
    hasLiked: false,
    loading: true,
    submitting: false,

    async init() {
      // Check localStorage for optimistic UI
      const stored = localStorage.getItem("liked_posts")
      if (stored) {
        try {
          const likedPosts = JSON.parse(stored)
          this.hasLiked = Array.isArray(likedPosts) && likedPosts.includes(slug)
        } catch (e) {
          localStorage.removeItem("liked_posts")
        }
      }

      await this.fetchLikes()
    },

    async fetchLikes() {
      try {
        // Use local API in development, Workers proxy in production
        const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        const baseUrl = isDev ? "" : "https://analytics.yashagarwal.in"

        const response = await fetch(
          `${baseUrl}/api/likes/${encodeURIComponent(slug)}`,
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
          `${baseUrl}/api/likes/${encodeURIComponent(slug)}`,
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

        // Update localStorage
        const stored = localStorage.getItem("liked_posts") || "[]"
        let likedPosts = JSON.parse(stored)
        if (!Array.isArray(likedPosts)) likedPosts = []

        if (this.hasLiked) {
          if (!likedPosts.includes(slug)) likedPosts.push(slug)
        } else {
          likedPosts = likedPosts.filter((s: string) => s !== slug)
        }
        localStorage.setItem("liked_posts", JSON.stringify(likedPosts))
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
  }))
}
