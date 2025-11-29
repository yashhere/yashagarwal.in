"use client"

import { useEffect, useState } from "react"
import { ArrowUp, List, X } from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { cn } from "@/lib/utils"
import { MobileTOC } from "./mobile-toc"

export const MobileActions = ({ headings }: { headings: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setIsExpanded(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (scrollDirection === "down" && window.scrollY > 100) {
      setIsExpanded(false)
    }
  }, [scrollDirection])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!headings || headings.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
      <motion.div
        layout
        initial={{ borderRadius: 32, width: "auto" }}
        className={cn(
          "border-border bg-background/95 flex items-center justify-center overflow-hidden border shadow-xl backdrop-blur-md transition-shadow duration-300",
          isExpanded
            ? "px-6 py-3"
            : "bg-foreground/20 hover:bg-foreground/40 h-1.5 w-16 cursor-pointer border-none px-1 py-1"
        )}
        animate={{
          borderRadius: isExpanded ? 32 : 9999,
          width: isExpanded ? "auto" : 64,
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isExpanded && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-6"
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
