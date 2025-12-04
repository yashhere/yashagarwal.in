"use client"

import { AnchorHTMLAttributes, forwardRef, ReactNode, type JSX } from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children?: ReactNode
  showIcon?: boolean
  variant?: "text" | "nav"
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      className,
      children,
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

    const isExternal = !href.startsWith("/") && !href.startsWith("#")

    // Simplified styling based on variant
    const linkClasses = cn(
      // Common styles
      "inline-flex items-center gap-1 transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

      // Variant-specific styles
      variant === "text"
        ? "underline underline-offset-4 decoration-foreground/50 hover:decoration-foreground"
        : "text-muted-foreground hover:text-foreground",

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
          {children}
          {showIcon && <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />}
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
