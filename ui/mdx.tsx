/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import { MDXComponents } from "mdx/types"
// import Link from "next/link"
import { TbArrowUpRight } from "react-icons/tb"

import { cn } from "@/lib/utils"

import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "../lib/constants"
import { Aside } from "./aside"
import { Code } from "./code"
import Link from "./link/link"
import { LoadingImage } from "./loading-image"

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <Link
        className={cn(
          LINK_STYLES,
          FOCUS_VISIBLE_OUTLINE,
          "text-primary-400 no-underline hover:text-primary-300",
        )}
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)} {...props} />
  }

  return (
    <a
      className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
      <TbArrowUpRight className="inline h-5 w-5" />
    </a>
  )
}

const BlogLink = (props) => {
  if (props.href.startsWith("#")) {
    return <a className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)} {...props} />
  }

  return (
    <Link
      {...props}
      className="text-primary-400 no-underline hover:text-primary-300"
    />
  )
}

const CustomMDXComponents: MDXComponents = {
  // pre: CodeBlock,
  a: BlogLink,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
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
          <div className="mt-2 text-sm italic text-rose-100/60">{caption}</div>
        ) : null}
      </>
    )
  },
}
export default CustomMDXComponents
