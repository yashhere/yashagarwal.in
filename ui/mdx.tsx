/* eslint-disable react/jsx-no-target-blank */
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
        className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
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

import { MDXComponents } from "mdx/types"
// import { cloneElement, useRef } from "react"

// const CodeBlock = (props) => {
//   const codeRef = useRef<HTMLElement>(null)

//   return (
//     <div style={{ position: "relative", overflow: "auto" }}>
//       <pre {...props}>
//         {cloneElement(props.children as React.ReactElement, { ref: codeRef })}
//       </pre>
//     </div>
//   )
// }

// const BlogImage = (children, bleed, caption, ...props) => {
//   return (
//     <>
//       <div
//         className={cx({
//           "xl:!col-start-2 xl:!col-end-4": bleed === true,
//         })}
//       >
//         <LoadingImage {...props} />
//       </div>
//       {caption ? (
//         <div className="mt-2 text-sm italic text-rose-100/60">{caption}</div>
//       ) : null}
//     </>
//   )
// }

const BlogLink = (props) => {
  return (
    <Link
      {...props}
      className="text-primary-400 hover:text-primary-300 no-underline"
    />
  )
}

const CustomMDXComponents: MDXComponents = {
  a: BlogLink,
  // pre: CodeBlock,
  // Img: BlogImage,
}
export default CustomMDXComponents

export const components = {
  Aside,
  h1: (props: any) => (
    <h2
      className="relative text-4xl sm:text-5xl font-extrabold mt-8"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="relative text-3xl sm:text-4xl font-bold mt-6 mr-[2px]"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4
      className="font-heading text-2xl sm:text-3xl font-semibold"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h5 className="font-heading text-xl sm:text-2xl font-medium" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg sm:text-xl my-6 leading-7 sm:leading-8" {...props} />
  ),
  hr: (props: any) => (
    <hr className="relative border-t-2 border-black/20" {...props} />
  ),
  a: (props: any) => (
    <Link className="text-primary-400 hover:!text-primary-300" {...props} />
  ),
  ul: (props: any) => (
    <ul
      className="space-y-3 [li>&]:mt-3 [&>li]:relative [&>li]:pl-7 before:[&>li]:absolute before:[&>li]:left-1 before:[&>li]:top-2.5 before:[&>li]:h-1.5 before:[&>li]:w-1.5 before:[&>li]:rounded-full before:[&>li]:bg-black/20"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol className="list-decimal space-y-3 pl-10" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
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
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-primary/50 rounded-md pl-4 py-2 italic text-md"
      {...props}
    />
  ),
  del: (props: any) => (
    <del className="text-purple/70 line-through" {...props} />
  ),
  table: (props: any) => (
    <table className="overflow-x table-fixed" {...props} />
  ),
  thead: (props: any) => <thead className="uppercase" {...props} />,
  tr: (props: any) => <tr className="border" {...props} />,
  th: (props: any) => <th scope="col" className="border" {...props} />,
  td: (props: any) => <td className="border" {...props} />,
}
