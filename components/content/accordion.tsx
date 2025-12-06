import React from "react"
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

interface AccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Accordion({
  title,
  children,
  className,
  ...props
}: AccordionProps) {
  return (
    <details
      className={cn(
        "group border-border bg-card my-4 rounded-lg border [&_summary::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      <summary className="text-foreground hover:bg-muted/50 focus-visible:ring-ring flex cursor-pointer items-center gap-2 p-4 font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none">
        <CaretRightIcon
          size={16}
          className="text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-90"
        />
        <span className="flex-1">{title}</span>
      </summary>
      <div className="text-muted-foreground px-4 pt-0 pb-4 leading-relaxed">
        <div className="pl-6">{children}</div>
      </div>
    </details>
  )
}
