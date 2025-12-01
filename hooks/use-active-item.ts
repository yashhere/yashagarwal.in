import { useEffect, useState } from "react"

export function useActiveItem(itemIds: string[], mode?: "desktop" | "mobile") {
  const [activeId, setActiveId] = useState<string | null>(null)

  const XL_BREAKPOINT = 1280

  useEffect(() => {
    // Optimization: Don't run observer if the component shouldn't be active for the current screen size

    if (typeof window !== "undefined") {
      if (
        mode === "desktop" &&
        window.matchMedia(`(max-width: ${XL_BREAKPOINT - 1}px)`).matches
      ) {
        return
      }

      if (
        mode === "mobile" &&
        window.matchMedia(`(min-width: ${XL_BREAKPOINT}px)`).matches
      ) {
        return
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },

      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds, mode])

  return activeId
}
