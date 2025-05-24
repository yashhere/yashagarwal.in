"use client"

import { AnchorHTMLAttributes, forwardRef, ReactNode, type JSX } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children?: ReactNode
  external?: boolean
  showIcon?: boolean
  variant?: "text" | "nav"
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      className,
      children,
      external,
      showIcon = true,
      variant = "text",
      ...props
    }: LinkProps,
    ref
  ): JSX.Element => {
    // Handle anchor links (internal page navigation)
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          className={cn(
            "scroll-m-20 transition-colors",
            className?.includes("anchor")
              ? className
              : cn("text-primary hover:text-primary", className)
          )}
          ref={ref}
          {...props}
        >
          {children}
        </a>
      )
    }

    const isExternal =
      external ?? (!href.startsWith("/") && !href.startsWith("#"))

    // Simplified styling based on variant
    const linkClasses = cn(
      // Common styles
      "inline-flex items-center gap-1 transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

      // Variant-specific styles
      variant === "text"
        ? "text-primary hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-primary"
        : "text-foreground/70 hover:text-foreground",

      className
    )

    if (isExternal) {
      return (
        <a
          href={href}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          <span>{children}</span>
          {showIcon && (
            <ArrowUpRightIcon className="h-3.5 w-3.5 flex-shrink-0" />
          )}
        </a>
      )
    }

    return (
      <Link href={href} className={linkClasses} ref={ref} {...props}>
        {children}
      </Link>
    )
  }
)

CustomLink.displayName = "CustomLink"

export default CustomLink
