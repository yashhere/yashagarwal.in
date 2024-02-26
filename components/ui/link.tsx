"use client"

import {
  AnchorHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { FiArrowUpRight } from "react-icons/fi"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children?: ReactNode
  underline?: boolean
  noUnderline?: boolean
  noExternalLinkIcon?: boolean
  noHighlight?: boolean
  icon?: ReactNode
}

function buildUrl(fromURL, fromQuery) {
  const url = new URL(fromURL)

  const query = new URLSearchParams(fromQuery)
  for (const [key, value] of Array.from(new Set(query))) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (
    {
      href,
      className,
      children,
      underline,
      noUnderline,
      noExternalLinkIcon = false,
      icon,
      ...otherProps
    }: ExternalLinkProps,
    ref
  ): JSX.Element => {
    const isInternalLink = href.startsWith("/") || href.startsWith("#")
    const hostname = new URL(`${siteConfig.url}`).hostname
    const isUnderline = underline
      ? true
      : (typeof children === "string" || typeof children === "undefined") &&
          !noUnderline &&
          isInternalLink
        ? true
        : false

    return (
      <>
        {isInternalLink ? (
          <Link
            aria-label="Internal Link"
            href={href}
            className={cn(
              "no-underline transition duration-200",
              isUnderline && "hover:underline hover:underline-offset-8",
              className
            )}
            ref={ref}
            {...otherProps}
          >
            {children}
          </Link>
        ) : (
          <a
            href={buildUrl(href, `ref=${hostname}`)}
            aria-label="External Link"
            className={cn(
              "text-primary no-underline transition duration-200",
              isUnderline && "hover:underline hover:underline-offset-8",
              className
            )}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            {...otherProps}
          >
            {icon &&
              cloneElement(icon as ReactElement, {
                className: "inline size-5 pb-[3px] mr-1",
              })}
            {noExternalLinkIcon ? children : <span>{children}</span>}{" "}
            {/* have to use inline icon because flex isn't working with multiline text. */}
            {/* Can't help with weird padding hack to center the icon. Yikes! */}
            {!noExternalLinkIcon && (
              <>
                <FiArrowUpRight className="-mx-1 inline size-5 pb-[3px]" />
              </>
            )}
          </a>
        )}
      </>
    )
  }
)

ExternalLink.displayName = "Link"

export default ExternalLink
