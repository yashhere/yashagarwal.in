/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { MDXComponents } from "mdx/types"

import Draft from "./ui/draft"

const BlogLink = (props) => {
  if (props.href.startsWith("#")) {
    return <a {...props} />
  }

  return <Link {...props} className="text-primary" />
}

const BlogImage = (props) => {
  return <Image {...props} />
}

const CustomMDXComponents: MDXComponents = {
  Draft,
  a: BlogLink,
  img: BlogImage,
  p: ({ className, ...props }) => (
    <p
      className={cn("text-lg text-text not-first:mt-6", className)}
      {...props}
    />
  ),
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-12 scroll-m-6 border-b pb-2 text-[30px] font-bold",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mb-1 mt-8 scroll-m-10 text-[26px] font-semibold first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-4 text-[22px] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-4 text-[20px] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "no-scrollbar mb-6 mt-4 overflow-x-auto rounded-lg border bg-pre-bg py-2 text-base",
        className
      )}
      {...props}
    />
  ),
  code: (props) => (
    <code
      {...props}
      className={cn(
        !props["data-theme"] &&
          "relative break-words rounded-sm border bg-code-bg px-[0.3rem] py-[0.1rem] text-base"
      )}
    />
  ),
  ul: (props) => <ul {...props} className="mb-6 pl-4 list-disc [&>li]:mt-2" />,
  ol: (props) => <ol {...props} className="mb-6 list-decimal pl-6" />,
  li: (props) => <li {...props} className="text-lg text-text" />,
  strong: (props) => <strong className="text-text" {...props} />,
  blockquote: (props) => (
    <blockquote {...props} className="mt-6 border-l-2 pl-6 italic" />
  ),
  hr: (props) => <hr {...props} className="my-6 border-gray-300" />,
  table: (props) => (
    <table {...props} className="w-full border-collapse text-left" />
  ),
  th: (props) => (
    <th
      {...props}
      className="cursor-auto border-b border-gray-300 py-3 text-base font-semibold text-gray-600"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="border-b border-gray-300 py-2 text-base text-text"
    />
  ),
}

export default CustomMDXComponents
