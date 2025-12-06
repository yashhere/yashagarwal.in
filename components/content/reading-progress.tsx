"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export function ReadingProgress({
  className,
  targetId,
}: {
  className?: string
  targetId?: string
}) {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      if (targetId) {
        const element = document.getElementById(targetId)
        if (element) {
          const elementOffsetTop =
            element.getBoundingClientRect().top + window.scrollY
          const elementHeight = element.offsetHeight
          const windowHeight = window.innerHeight

          if (elementHeight === 0) return setCompletion(0)

          // Calculate start and end points of the scroll
          // Start: When the top of the element hits the top of the viewport
          // End: When the bottom of the element hits the bottom of the viewport
          const start = elementOffsetTop
          const end = elementOffsetTop + elementHeight - windowHeight

          // If content fits in viewport, we are 100% done
          if (elementHeight <= windowHeight) {
            setCompletion(100)
            return
          }

          const scrollTop = window.scrollY
          const progress = (scrollTop - start) / (end - start)

          let p = progress
          if (p < 0) p = 0
          if (p > 1) p = 1

          setCompletion(p * 100)
          return
        }
      }

      // Fallback to global scroll if no target or target not found
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener("scroll", updateScrollCompletion)
    // Trigger once on mount to set initial state
    updateScrollCompletion()

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion)
    }
  }, [targetId])

  return (
    <div
      className={cn(
        "bg-primary fixed inset-x-0 top-0 z-50 h-1 transition-all duration-100 ease-out",
        className
      )}
      style={{ width: `${completion}%` }}
    />
  )
}
