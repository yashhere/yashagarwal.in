/* eslint-disable react/jsx-no-target-blank */
import { MDXComponents } from "mdx/types"
import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "../lib/constants"
import cx from "clsx"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import React from "react"
import { LoadingImage } from "./loading-image"
import { Aside } from "./aside"
// import Link from "next/link"
import { TbArrowUpRight } from "react-icons/tb"
import Link from "./link/link"

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <Link
        className={cx(
          LINK_STYLES,
          FOCUS_VISIBLE_OUTLINE,
          "text-primary-400 hover:text-primary-300 no-underline",
        )}
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)} {...props} />
  }

  return (
    <a
      className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
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
    return <a className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)} {...props} />
  }

  return (
    <Link
      {...props}
      className="text-primary-400 hover:text-primary-300 no-underline"
    />
  )
}

const CustomMDXComponents: MDXComponents = {
  // pre: CodeBlock,
  a: BlogLink,
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
          className={cx({
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
