import React from "react"

import { cn } from "@/lib/utils"

interface HighlightProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Highlight({
  children,
  color = "yellow",
  className,
}: HighlightProps) {
  const colorMap: Record<string, string> = {
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100",
    red: "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100",
    pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-100",
  }

  const colorClass = colorMap[color]

  const style = !colorClass ? { backgroundColor: color } : undefined

  return (
    <span
      className={cn(
        "mx-0.5 rounded box-decoration-clone px-1 py-0.5",
        colorClass,
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
