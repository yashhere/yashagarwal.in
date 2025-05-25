import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

export type HeadingProps = ComponentProps<"h1"> &
  VariantProps<typeof headingStyles> & {
    as?: `h${1 | 2 | 3 | 4 | 5 | 6}`
  }

const headingStyles = tv({
  variants: {
    level: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
    },
  },
  defaultVariants: {
    level: "h1",
  },
})

export function Heading({
  className,
  level = "h1",
  as,
  ...props
}: HeadingProps) {
  const Component = as ? as : level

  return (
    <Component
      className={cn("text-foreground", headingStyles({ className, level }))}
      {...props}
    />
  )
}
