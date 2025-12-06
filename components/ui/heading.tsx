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
      h1: "font-serif text-4xl md:text-5xl font-medium tracking-tight",
      h2: "font-serif text-2xl md:text-3xl font-medium tracking-tight",
      h3: "font-serif text-xl md:text-2xl font-medium tracking-tight",
      h4: "font-serif text-lg md:text-xl font-medium tracking-tight",
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
