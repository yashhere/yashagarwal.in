/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { useMDXComponent } from "@content-collections/mdx/react"

import Draft from "../ui/draft"

const BlogLink = (props) => {
  if (props.href.startsWith("#")) {
    return (
      <a
        {...props}
        className={cn(
          props.className,
          "no-underline scroll-m-20",
          !props.className?.includes("anchor") &&
            "text-primary hover:underline hover:underline-offset-4"
        )}
      />
    )
  }

  return (
    <Link
      {...props}
      className={cn(
        "text-primary transition-colors hover:text-primary/80",
        props.className
      )}
    />
  )
}

const BlogImage = (props) => {
  return <Image {...props} />
}

const components = {
  Draft,
  a: BlogLink,
  img: BlogImage,
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-base leading-relaxed text-foreground not-first:mt-6",
        className
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-10 mb-4 scroll-m-6 text-3xl sm:text-4xl font-bold text-foreground tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mb-3 mt-10 scroll-m-10 text-2xl sm:text-3xl font-semibold first:mt-0 text-foreground tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 mb-3 scroll-m-4 text-xl sm:text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-6 mb-3 scroll-m-4 text-lg sm:text-xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Check if this is a code block from rehype-pretty-code
    const isPrettyCode = Boolean(props["data-theme"])

    return (
      <pre
        className={cn(
          "no-scrollbar overflow-x-auto",
          // Don't add additional styling for rehype-pretty-code blocks
          !isPrettyCode &&
            "rounded-lg border px-4 py-4 mb-6 mt-4 font-mono text-[15px]",
          className
        )}
        {...props}
      />
    )
  },
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
            "relative rounded-sm bg-syntax-bg border px-1.5 py-0.5 font-mono text-syntax-txt text-sm",
          props.className
        )}
      />
    )
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 pl-4 list-disc [&>li]:mt-2" />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 list-decimal pl-6" />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li {...props} className="text-base leading-relaxed text-foreground" />
  ),
  strong: (props) => (
    <strong className="font-semibold  text-foreground" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-primary/30 pl-6 italic text-muted-foreground"
    />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className={cn("italic", className)} />
  ),
  hr: (props) => <hr {...props} className="my-6 border-border" />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table {...props} className="w-full border-collapse text-left" />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="cursor-auto border-b border-border py-3 text-base font-semibold text-muted-foreground"
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border-b border-border py-2 text-base text-foreground"
    />
  ),
  sup: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <sup
      className={cn("text-xs align-super font-bold", className)}
      {...props}
    />
  ),
  sub: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <sub className={cn("text-xs align-sub font-bold", className)} {...props} />
  ),
  kbd: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <kbd
      className={cn(
        "rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-semibold text-foreground shadow-[inset_0_-1px_0_0_var(--tw-border-opacity)]",
        className
      )}
      {...props}
    />
  ),
  mark: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <mark
      className={cn(
        "bg-primary/10 text-foreground px-1 py-0.5 rounded",
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
