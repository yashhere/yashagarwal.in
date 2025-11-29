"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, List, X } from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { MobileTOC } from "./mobile-toc"

export const MobileActions = ({ headings }: { headings: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
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

  if (!headings || headings.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
      <motion.div
        layout
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={{
          expanded: {
            width: "auto",
            height: "auto",
            borderRadius: 32,
            padding: "12px 24px",
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          },
          collapsed: {
            width: 64,
            height: 6,
            borderRadius: 100,
            padding: "0px",
            backgroundColor: "var(--foreground)",
            borderColor: "transparent",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={cn(
          "flex items-center justify-center overflow-hidden border shadow-xl backdrop-blur-md",
          !isExpanded && "cursor-pointer opacity-20 hover:opacity-40"
        )}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center gap-6 whitespace-nowrap"
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
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
