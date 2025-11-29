"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, List, X } from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { MobileTOC } from "./mobile-toc"

export const MobileActions = ({ headings }: { headings: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Set initial state based on scroll position
    if (window.scrollY > 100) {
      setIsExpanded(false)
    }
    setIsMounted(true)

    const handleScroll = () => {
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
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!headings || headings.length === 0 || !isMounted) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
      <motion.div
        layout
        className={cn(
          "flex items-center justify-center overflow-hidden shadow-xl backdrop-blur-md",
          isExpanded
            ? "bg-background/95 border-border border"
            : "bg-foreground/20 hover:bg-foreground/40 cursor-pointer"
        )}
        style={{
          borderRadius: isExpanded ? 32 : 100,
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
              className="flex items-center gap-6 px-6 py-3 whitespace-nowrap"
            >
              <MobileTOC headings={headings}>
                <button className="text-muted-foreground hover:text-foreground group flex flex-col items-center gap-1 transition-colors">
                  <div className="group-hover:bg-muted rounded-full p-2 transition-colors">
                    <List size={20} weight="regular" />
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
                  <ArrowUp size={20} weight="regular" />
                </div>
                <span className="text-[10px] font-medium tracking-wider uppercase">
                  Top
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(false)
                }}
                className="text-muted-foreground hover:text-foreground group flex flex-col items-center gap-1 transition-colors"
                aria-label="Close menu"
              >
                <div className="group-hover:bg-muted rounded-full p-2 transition-colors">
                  <X size={20} weight="regular" />
                </div>
                <span className="text-[10px] font-medium tracking-wider uppercase">
                  Close
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="handle"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 64 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="h-1.5"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
