"use client"

import { RefObject, useEffect, useRef, useState } from "react"
import { ArrowUpIcon, ListIcon } from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Heading } from "@/types"
import { MobileTOC } from "./mobile-toc"

export const MobileActions = ({ headings }: { headings: Heading[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const lastScrollY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
  })

  useEffect(() => {
    // Set initial state based on scroll position
    if (window.scrollY > 100) {
      setIsExpanded(false)
    }
    setIsMounted(true)

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // Expand at the very top
        if (currentScrollY < 100) {
          setIsExpanded(true)
        }
        // Collapse when scrolling down past threshold
        else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
          setIsExpanded(false)
        }

        lastScrollY.current = currentScrollY
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!headings || headings.length === 0 || !isMounted) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 xl:hidden">
      <motion.div
        ref={containerRef}
        layout
        className={cn(
          "border-border bg-background/95 flex items-center justify-center overflow-hidden border shadow-xl backdrop-blur-md",
          !isExpanded && "hover:bg-muted/50 cursor-pointer"
        )}
        style={{
          borderRadius: 32,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded ? (
            <motion.div
              key="actions"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-6 px-6 py-2 whitespace-nowrap"
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
            </motion.div>
          ) : (
            <motion.div
              key="handle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-2"
            >
              <div className="bg-muted-foreground/50 h-1 w-16 rounded-full" />
              <span className="sr-only">Open menu</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
