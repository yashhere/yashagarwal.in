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
  Draft,
  a: BlogLink,
  pre: ({ children, ...props }) => (
    <pre className="mb-4 mt-6 bg-pre-bg py-4 text-base" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative overflow-x-auto break-words rounded bg-code-bg p-[0.3rem] text-base",
        className
      )}
      {...props}
    />
  ),
  img: BlogImage,
}
export default CustomMDXComponents
