"use client"

import { useEffect } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"

export const FootnoteMover = () => {
  const { isDesktop } = useMediaQuery()

  useEffect(() => {
    const sync = () => {
      // Locate original footnotes container
      const originalContainer = (document.querySelector(".footnotes") ||
        document.querySelector("section[data-footnotes]")) as HTMLElement
      if (!originalContainer) return

      if (isDesktop) {
        // --- DESKTOP: SIDENOTES ---
        const target = document.getElementById("footnote-portal-target")
        if (!target) return

        // If target is already populated, we might need to update positions if layout changed?
        // But for now, assume if populated, we are good.
        if (target.childElementCount > 0) {
          // Ensure original is hidden if we have content
          originalContainer.style.display = "none"
          return
        }

        // Find refs: support both class and data attribute
        const refs = document.querySelectorAll(
          "sup[data-footnote-ref], .footnote-ref"
        )
        if (refs.length === 0) return

        const containerRect = target.getBoundingClientRect()
        let nextTop = 0
        let movedCount = 0

        refs.forEach((ref) => {
          const href = ref.querySelector("a")?.getAttribute("href")
          if (!href) return

          // ID logic: remove #
          const fnId = href.slice(1)
          const originalNote = document.getElementById(fnId)
          if (!originalNote) return

          // Clone
          const noteCard = document.createElement("div")
          noteCard.className =
            "absolute w-full p-3 text-sm text-muted-foreground bg-background/80 backdrop-blur-md rounded-lg border border-border/50 shadow-sm transition-all duration-200 z-10"

          const contentClone = originalNote.cloneNode(true) as HTMLElement

          // Strip backrefs
          const backrefs = contentClone.querySelectorAll(
            ".data-footnote-backref, .footnote-backref, a[href^='#user-content-fnref']"
          )
          backrefs.forEach((el) => el.remove())

          // Strip IDs
          contentClone.removeAttribute("id")
          contentClone
            .querySelectorAll("[id]")
            .forEach((el) => el.removeAttribute("id"))

          noteCard.innerHTML = contentClone.innerHTML

          // Calculate Top
          const refRect = ref.getBoundingClientRect()
          // We must account for scroll if using absolute positioning relative to a static parent?
          // Wait. If the Aside is `relative`, and we scroll down:
          // aside moves UP. `containerRect.top` decreases.
          // ref moves UP. `refRect.top` decreases.
          // Difference is constant.
          // So `refRect.top - containerRect.top` works.

          let top = refRect.top - containerRect.top

          // Prevent overlap
          if (top < nextTop) {
            top = nextTop
          }

          noteCard.style.top = `${top}px`

          target.appendChild(noteCard)

          nextTop = top + noteCard.offsetHeight + 16 // gap
          movedCount++
        })

        if (movedCount > 0) {
          originalContainer.style.display = "none"
        }
      } else {
        // --- MOBILE: DRAWER LIST ---
        const target = document.getElementById("mobile-footnote-target")
        if (!target) return

        // Always hide original on mobile too if we are handling it
        originalContainer.style.display = "none"

        if (target.childElementCount > 0) return

        const clone = originalContainer.cloneNode(true) as HTMLElement

        const hr = clone.querySelector("hr")
        if (hr) hr.remove()

        const h2 = clone.querySelector("h2")
        if (h2) h2.remove()

        clone.removeAttribute("id")
        clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"))

        // Ensure visibility
        clone.style.display = "block"

        target.appendChild(clone)
      }
    }

    sync()

    // Observe for DOM changes (e.g. hydration, client nav)
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, subtree: true })

    // Handle resize to update positions?
    // For absolute positioning, we really should update on scroll/resize if the layout is dynamic.
    // But simply clearing and rebuilding causes flicker.
    // Let's rely on initial position for now.
    // If the user resizes window width, we should rebuild.
    const onResize = () => {
      const target = document.getElementById("footnote-portal-target")
      if (target) target.innerHTML = ""
      const mobileTarget = document.getElementById("mobile-footnote-target")
      if (mobileTarget) mobileTarget.innerHTML = ""
      sync()
    }
    window.addEventListener("resize", onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      const original = (document.querySelector(".footnotes") ||
        document.querySelector("section[data-footnotes]")) as HTMLElement
      if (original) original.style.display = ""
    }
  }, [isDesktop])

  return null
}
