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
  variant?: "default" | "inline" | "clean"
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      className,
      children,
      external,
      showIcon = true,
      variant = "default",
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
            "no-underline scroll-m-20 transition-colors hover:text-primary",
            !className?.includes("anchor") && "text-primary",
            className
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

    const linkClasses = cn(
      // Base styles
      "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Variant styles
      {
        // Inline variant for body text links
        "inline-flex items-center gap-1 font-medium text-primary underline decoration-1 underline-offset-4 decoration-muted-foreground/50 hover:decoration-primary hover:decoration-2":
          variant === "inline",
        // Default variant for general use
        "inline-flex items-center gap-1 font-medium hover:text-foreground":
          variant === "default",
        // Clean variant for lists and navigation
        "inline-flex items-center gap-1 hover:text-foreground":
          variant === "clean",
      },
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
          {showIcon && variant !== "clean" && (
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
