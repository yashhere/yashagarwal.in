"use client"

import { useActiveItem } from "@/hooks/use-active-item"
import { cn } from "@/lib/utils"
import Link from "../ui/link"

export const TableOfContents = ({
  headings,
  className,
  onItemClick,
  mode,
}: {
  headings: any[]
  interactive?: boolean
  className?: string
  onItemClick?: () => void
  mode?: "desktop" | "mobile"
}) => {
  const activeId = useActiveItem(
    headings.map((h) => h.slug),
    mode
  )

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
      setTimeout(() => scrollToHeading(true), 600)
    } else {
      scrollToHeading(false)
    }
  }

  return (
    <div
      className={cn(
        "text-base", // Changed base font size to match main content more closely
        className
      )}
    >
      <div className="flex flex-col space-y-1">
        {headings.map((heading) => {
          const isActive = heading.slug === activeId

          return (
            <Link
              key={heading.slug}
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
          )
        })}
      </div>
    </div>
  )
}
