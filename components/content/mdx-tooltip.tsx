"use client"

import React from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface MdxTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
}

export function MdxTooltip({ children, content, className }: MdxTooltipProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className={cn(
            "decoration-muted-foreground hover:text-foreground hover:decoration-foreground cursor-help underline decoration-dotted underline-offset-4 transition-colors",
            className
          )}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "max-w-xs text-center text-sm text-wrap",
          "bg-background text-foreground px-3 py-1.5 shadow-md"
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}
