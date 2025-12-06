/* eslint-disable jsx-a11y/alt-text */

import React from "react"
import { useMDXComponent } from "@content-collections/mdx/react"

import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import Draft from "../ui/draft"
import { Heading } from "../ui/heading"
import { Accordion } from "./accordion"
import { CodeBlock } from "./code-block"
import { Highlight } from "./highlight"
import { Kbd } from "./kbd"
import { MdxTooltip } from "./mdx-tooltip"

const components = {
  Draft,
  Highlight,
  Kbd,
  Accordion,
  Tooltip: MdxTooltip,
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href || ""} {...props} variant="text" />
  ),
  img: (props) => <Image {...props} />,
  p: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "text-foreground text-base leading-relaxed not-first:mt-6",
        className
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      level="h2"
      as="h2"
      className={cn("mt-10 mb-4 scroll-m-6", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      level="h3"
      as="h3"
      className={cn("mt-10 mb-3 scroll-m-10 first:mt-0", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      level="h4"
      as="h4"
      className={cn("mt-8 mb-3 scroll-m-4", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      level="h4"
      as="h5"
      className={cn("text-foreground mt-6 mb-3 scroll-m-4", className)}
      {...props}
    />
  ),
  pre: (props: any) => <CodeBlock {...props} />,
  code: (props) => {
    // Only add custom styling to non-rehype-pretty-code elements
    const isPrettyCode =
      props["data-theme"] ||
      (props.className && props.className.includes("language-"))

    return (
      <code
        {...props}
        className={cn(
          !isPrettyCode &&
            "bg-syntax-bg text-syntax-txt relative rounded-sm border px-1.5 py-0.5 font-mono text-sm",
          props.className
        )}
      />
    )
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 list-disc pl-4 [&>li]:mt-2" />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 list-decimal pl-6" />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li {...props} className="text-foreground text-base leading-relaxed" />
  ),
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-primary/30 text-muted-foreground my-6 border-l-2 pl-6 italic"
    />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className={cn("italic", className)} />
  ),
  hr: (_props: React.HTMLAttributes<HTMLHRElement>) => (
    <div className="my-6 flex items-center justify-center">
      <div className="to-border h-px flex-1 bg-linear-to-r from-transparent"></div>
      <div className="px-4">
        <div className="bg-border h-2 w-2 rounded-full shadow-sm"></div>
      </div>
      <div className="to-border h-px flex-1 bg-linear-to-l from-transparent"></div>
    </div>
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table {...props} className="w-full border-collapse text-left" />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-border text-muted-foreground cursor-auto border-b py-3 text-base font-medium"
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border-border text-foreground border-b py-2 text-base"
    />
  ),
  sup: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <sup
      className={cn("align-super text-xs font-bold", className)}
      {...props}
    />
  ),
  sub: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <sub className={cn("align-sub text-xs font-bold", className)} {...props} />
  ),
  kbd: Kbd,
  mark: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <mark
      className={cn(
        "bg-primary/10 text-foreground rounded px-1 py-0.5",
        className
      )}
      {...props}
    />
  ),
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
