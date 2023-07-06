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
  gradientUnderline?: boolean
  noGradientUnderline?: boolean
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
      gradientUnderline,
      noGradientUnderline,
      noExternalLinkIcon,
      noHighlight = false,
      icon,
      ...otherProps
    }: ExternalLinkProps,
    ref,
  ): JSX.Element => {
    const isInternalLink = href.startsWith("/") || href.startsWith("#")
    const isGradientUnderline = gradientUnderline
      ? true
      : (typeof children === "string" || typeof children === "undefined") &&
        !noGradientUnderline
      ? true
      : false

    return (
      <>
        {isInternalLink ? (
          <Link
            href={href}
            className={cn("transition duration-200", className)}
            ref={ref}
            {...otherProps}
          >
            {isGradientUnderline ? <span>{children ?? href}</span> : children}
          </Link>
        ) : (
          <a
            href={href}
            className={cn(
              "mr-1 inline-flex items-center space-x-1 text-primary-500 transition duration-200",
              isGradientUnderline && "gradient-underline no-underline",
              isGradientUnderline &&
                !noHighlight &&
                "text-primary-400 hover:text-primary-300",
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
        <style jsx>{`
          .gradient-underline :not(.anchor) {
            text-decoration: none;
            background-image: linear-gradient(to right, #4433ff, #2c0b8e);
            background-repeat: no-repeat;
            background-position: bottom left;
            background-size: 0% 2px;
            transition: background-size 150ms ease-in-out;
          }

          .gradient-underline:hover :not(.anchor) {
            background-size: 100% 2px;
            color: inherit;
          }
        `}</style>
      </>
    )
  },
)

ExternalLink.displayName = "Link"

export default ExternalLink
