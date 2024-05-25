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
  h1: ({ children }) => (
    <h1 className="mb-5 mt-16 font-semibold">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-5 mt-16 font-semibold md:mt-16">{children}</h2>
  ),
  p: ({ children }) => <p className="mt-5 opacity-90">{children}</p>,
  a: BlogLink,
  pre: ({ children, ...props }) => (
    <pre className="" {...props}>
      {children}
    </pre>
  ),
  // code: ({ className, ...props }) => (
  //   <code
  //     className={cn(
  //       "relative overflow-x-auto break-words rounded p-[0.3rem]",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  img: BlogImage,
}
export default CustomMDXComponents
