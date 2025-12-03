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
  const lastScrollY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
  })

  useEffect(() => {
    // Set initial state based on scroll position
    if (window.scrollY > SCROLL_THRESHOLD_PX) {
      setIsExpanded(false)
    }
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
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
        rafId = null
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!headings || headings.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 xl:hidden">
      <div
        ref={containerRef}
        className={cn(
          "border-border bg-background/95 flex items-center justify-center overflow-hidden rounded-[32px] border shadow-xl backdrop-blur-md transition-all duration-300",
          !isExpanded && "hover:bg-muted/50 cursor-pointer"
        )}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {isExpanded ? (
          <div className="animate-in fade-in flex items-center gap-6 px-6 py-2 whitespace-nowrap duration-200">
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
        ) : (
          <div className="animate-in fade-in px-6 py-2 duration-200">
            <div className="bg-muted-foreground/50 h-1 w-16 rounded-full" />
            <span className="sr-only">Open menu</span>
          </div>
        )}
      </div>
    </div>
  )
}
