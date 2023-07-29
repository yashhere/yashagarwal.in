"use client"

import {
  AnchorHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TbArrowUpRight } from "react-icons/tb"

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
    const isUnderline = underline
      ? true
      : (typeof children === "string" || typeof children === "undefined") &&
        !noUnderline
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
            href={href}
            aria-label="External Link"
            className={cn(
              "inline-flex items-center space-x-1 text-primary no-underline transition duration-200",
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
                className: "h-4 w-4 flex-none mr-1 self-center",
              })}
            {/* Have no option other than clamping.
                https://stackoverflow.com/questions/70164816/how-to-make-the-width-fit-to-the-content-when-text-wrapped
            */}
            {noExternalLinkIcon ? (
              children
            ) : (
              <span className="line-clamp-1">{children}</span>
            )}{" "}
            {!noExternalLinkIcon && (
              <TbArrowUpRight className="ml-1 h-4 w-4 flex-none self-center" />
            )}
          </a>
        )}
      </>
    )
  }
)

ExternalLink.displayName = "Link"

export default ExternalLink
