import { Fragment } from "react"

import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-muted-foreground mb-4 flex items-center text-sm",
        className
      )}
    >
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={item.label}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    variant="nav"
                    showIcon={false}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(isLast ? "text-foreground font-medium" : "")}
                    {...(isLast && { "aria-current": "page" })}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li
                  aria-hidden="true"
                  className="text-muted-foreground/50 select-none"
                >
                  /
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
