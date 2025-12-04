"use client"

import { RefObject, useEffect, useRef, useState } from "react"
import { ArrowUpIcon, ListIcon } from "@phosphor-icons/react/dist/ssr"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Heading } from "@/types"
import { MobileTOC } from "./mobile-toc"

const SCROLL_THRESHOLD_PX = 100

export const MobileActions = ({ headings }: { headings: Heading[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const shouldHide = visibleSections.size > 0
  const lastScrollY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (isExpanded) {
      setIsExpanded(false)
      // Restore focus when closing
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
    }
  })

  // Handle expand/collapse and focus management
  const handleExpand = () => {
    if (!isExpanded) {
      // Store the currently focused element before expanding
      previousFocusRef.current = document.activeElement as HTMLElement
      setIsExpanded(true)
    }
  }

  useEffect(() => {
    const targets = [
      document.querySelector("footer"),
      document.getElementById("comments-section"),
    ].filter(Boolean) as Element[]

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const id = entry.target.id || entry.target.tagName
            if (entry.isIntersecting) {
              next.add(id)
            } else {
              next.delete(id)
            }
          })
          return next
        })
      },
      {
        root: null,
        threshold: 0,
      }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Set initial state based on scroll position
    if (window.scrollY > SCROLL_THRESHOLD_PX) {
      setIsExpanded(false)
    }
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        try {
          const currentScrollY = window.scrollY
          // Expand at the very top
          if (currentScrollY < SCROLL_THRESHOLD_PX) {
            setIsExpanded(true)
          }
          // Collapse when scrolling down past threshold
          else if (
            currentScrollY > SCROLL_THRESHOLD_PX &&
            currentScrollY > lastScrollY.current
          ) {
            setIsExpanded(false)
          }
          lastScrollY.current = currentScrollY
        } catch (error) {
          console.error("Scroll handler error:", error)
        } finally {
          rafId = null
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!headings || headings.length === 0) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-transform duration-300 ease-in-out xl:hidden",
        shouldHide && "translate-y-[200%]"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "border-border bg-background/95 relative flex items-center justify-center overflow-hidden rounded-full border shadow-xl backdrop-blur-md transition-all duration-200",
          !isExpanded && "hover:bg-muted/50 cursor-pointer"
        )}
        onClick={handleExpand}
        role="button"
        aria-label={
          isExpanded ? "Mobile actions menu" : "Expand mobile actions"
        }
        aria-expanded={isExpanded}
        tabIndex={isExpanded ? -1 : 0}
      >
        {/* Expanded state */}
        <div
          className={cn(
            "flex items-center gap-6 px-6 py-2 whitespace-nowrap transition-all duration-200",
            isExpanded
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none absolute opacity-0"
          )}
        >
          <MobileTOC headings={headings}>
            <button
              className="text-muted-foreground hover:text-foreground group flex flex-col items-center gap-1 transition-colors"
              aria-label="Table of Contents"
            >
              <div className="group-hover:bg-muted rounded-full p-2 transition-colors">
                <ListIcon size={20} weight="regular" />
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">
                Sections
              </span>
            </button>
          </MobileTOC>

          <button
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-foreground group flex flex-col items-center gap-1 transition-colors"
            aria-label="Scroll to top"
          >
            <div className="group-hover:bg-muted rounded-full p-2 transition-colors">
              <ArrowUpIcon size={20} weight="regular" />
            </div>
            <span className="text-[10px] font-medium tracking-wider uppercase">
              Top
            </span>
          </button>
        </div>

        {/* Collapsed state */}
        <div
          className={cn(
            "px-6 py-2 transition-all duration-200",
            !isExpanded
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none absolute opacity-0"
          )}
        >
          <div className="bg-muted-foreground/50 h-1 w-16 rounded-full" />
          <span className="sr-only">Open menu</span>
        </div>
      </div>
    </div>
  )
}
