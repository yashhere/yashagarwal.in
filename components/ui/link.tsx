"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  AnchorHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from "react"
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
    ref,
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
            href={href}
            className={cn(
              "transition duration-200 no-underline",
              isUnderline && "hover:underline hover:underline-offset-8",
              className,
            )}
            ref={ref}
            {...otherProps}
          >
            {children}
          </Link>
        ) : (
          <a
            href={href}
            className={cn(
              "mr-1 inline-flex items-center space-x-1 text-primary transition duration-200 no-underline",
              isUnderline && "hover:underline hover:underline-offset-8",
              className,
            )}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            {...otherProps}
          >
            {icon &&
              cloneElement(icon as ReactElement, {
                className: "h-4 w-4 mr-1",
              })}
            {noExternalLinkIcon ? children : <span>{children}</span>}{" "}
            {!noExternalLinkIcon && <TbArrowUpRight className="h-4 w-4" />}
          </a>
        )}
      </>
    )
  },
)

ExternalLink.displayName = "Link"

export default ExternalLink
