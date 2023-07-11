/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import type { ImageProps } from "next/image"
import Link from "@/components/ui/link"
import { LoadingImage } from "@/components/ui/loading-image"
import { cn } from "@/lib/utils"
import { MDXComponents } from "mdx/types"

const BlogLink = (props) => {
  if (props.href.startsWith("#")) {
    return <a {...props} />
  }

  return <Link {...props} className="text-primary no-underline" />
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
  Img: ({
    children,
    bleed,
    caption,
    ...props
  }: {
    children: React.ReactNode
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <>
        <div
          className={cn({
            "xl:!col-start-2 xl:!col-end-4": bleed === true,
          })}
        >
          <LoadingImage {...props} />
        </div>
        {caption ? (
          <div className="mt-2 text-sm italic text-text/70">{caption}</div>
        ) : null}
      </>
    )
  },
}
export default CustomMDXComponents
