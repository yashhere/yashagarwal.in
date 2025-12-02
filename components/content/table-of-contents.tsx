"use client"

import { motion, Variants } from "motion/react"

import { useActiveItem } from "@/hooks/use-active-item"
import { cn } from "@/lib/utils"
import { Heading } from "@/types" // Import Heading interface
import Link from "../ui/link"

export const TableOfContents = ({
  headings,
  className,
  onItemClick,
  mode,
}: {
  headings: Heading[] // Use the Heading interface
  className?: string
  onItemClick?: () => void
  mode?: "desktop" | "mobile"
}) => {
  const activeId = useActiveItem(
    headings.map((h) => h.slug),
    mode
  )

  const SCROLL_DELAY_AFTER_DRAWER_CLOSE = 600

  const handleHeadingClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()

    const scrollToHeading = (isMobile: boolean) => {
      const element = document.getElementById(slug)
      if (element) {
        element.scrollIntoView({
          behavior: isMobile ? "auto" : "smooth",
          block: "start",
        })

        // Update URL without triggering navigation
        window.history.pushState(null, "", `#${slug}`)
      }
    }

    if (onItemClick) {
      onItemClick()
      // Small delay to allow drawer to close/body scroll to unlock
      setTimeout(() => scrollToHeading(true), SCROLL_DELAY_AFTER_DRAWER_CLOSE)
    } else {
      scrollToHeading(false)
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    }),
  }

  return (
    <div
      className={cn(
        "text-base", // Changed base font size to match main content more closely
        className
      )}
    >
      <div className="flex flex-col space-y-1">
        {headings.map((heading, idx) => {
          const isActive = heading.slug === activeId

          return (
            <motion.div
              key={heading.slug}
              variants={item}
              custom={idx}
              initial="hidden"
              animate="show"
            >
              <Link
                href={`#${heading.slug}`}
                variant="nav"
                className={cn(
                  "hover:text-primary text-muted-foreground relative block py-0.5 transition-colors duration-200",
                  isActive && "text-primary"
                )}
                style={{
                  paddingLeft: `calc(0.75rem + ${(heading.heading - 2) * 1}rem)`,
                }} // Dynamic indentation, adjusted base
                onClick={(e) => handleHeadingClick(e, heading.slug)}
              >
                {heading.text}
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
