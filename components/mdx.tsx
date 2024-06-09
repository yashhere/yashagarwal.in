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

  return <Link {...props} />
}

const BlogImage = (props) => {
  return <Image {...props} />
}

const CustomMDXComponents: MDXComponents = {
  p: ({ className, ...props }) => (
    <p
      className={cn("text-lg leading-7 [&:not(:first-child)]:mt-6", className)}
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
  Draft,
  a: BlogLink,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-pre-bg py-4 text-base",
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
          "relative rounded border bg-code-bg px-[0.3rem] py-[0.1rem] text-base"
      )}
    />
  ),
  img: BlogImage,
}

export default CustomMDXComponents
