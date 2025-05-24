/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { useMDXComponent } from "@content-collections/mdx/react"

import Draft from "../ui/draft"

const components = {
  Draft,
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href || ""} {...props} variant="text" />
  ),
  img: (props) => <Image {...props} />,
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
        "mt-10 mb-4 scroll-m-6 text-2xl text-foreground ",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mb-3 mt-10 scroll-m-10 text-xl first:mt-0 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("mt-8 mb-3 scroll-m-4 text-lg text-foreground", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn("mt-6 mb-3 scroll-m-4 text-md text-foreground", className)}
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
            "rounded-lg border px-4 py-4 mb-6 mt-4 font-mono text-base",
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
  hr: (props) => (
    <div className="my-6 flex items-center justify-center">
      <div className="h-px bg-gradient-to-r from-transparent to-border flex-1"></div>
      <div className="px-4">
        <div className="w-2 h-2 bg-border rounded-full shadow-sm"></div>
      </div>
      <div className="h-px bg-gradient-to-l from-transparent to-border flex-1"></div>
    </div>
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table {...props} className="w-full border-collapse text-left" />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="cursor-auto border-b border-border py-3 text-base font-medium text-muted-foreground"
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
