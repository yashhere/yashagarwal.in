/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { MDXComponents } from "mdx/types"

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
  a: BlogLink,
  pre: ({ children, ...props }) => (
    <pre className="mb-4 mt-6 rounded-t-xl bg-pre-bg pb-4 text-sm" {...props}>
      <div className={"code-header"}>{props["data-language"]}</div>
      {children}
    </pre>
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative overflow-x-auto break-words rounded bg-code-bg p-[0.3rem] text-sm",
        className
      )}
      {...props}
    />
  ),
  img: BlogImage,
}
export default CustomMDXComponents
