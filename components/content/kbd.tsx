import React from "react"

import { cn } from "@/lib/utils"

export function Kbd({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "border-border bg-muted text-foreground rounded border px-1.5 py-0.5 font-mono text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--tw-border-opacity)]",
        className
      )}
      {...props}
    />
  )
}
