"use client"

import React from "react"
import { useGiscus } from "@/lib/useGiscus"
import { DiscussionEmbed } from "disqus-react"
import { useTheme } from "next-themes"
import { useInView } from "react-intersection-observer"

interface ICommentPprops {
  url: string
  slug: string
}

export const Comments = () => {
  const COMMENTS_NODE_ID = "comments"
  const MAPPING: string = "pathname"
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useGiscus({ mapping: MAPPING, commentNodeId: inView ? COMMENTS_NODE_ID : "" })

  return (
    <div ref={ref}>
      {inView ? <div id={COMMENTS_NODE_ID} className="pt-8" /> : null}
    </div>
  )
}

export const DisqusComments = ({ url, slug }: ICommentPprops) => {
  const { resolvedTheme = "light" } = useTheme()
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    fallbackInView: true,
  })
  const disqusShortname = "yashhere"
  const disqusConfig = {
    identifier: slug,
    url: url,
  }

  return (
    <div className="pt-8" ref={ref}>
      {inView ? (
        <DiscussionEmbed
          key={resolvedTheme}
          shortname={disqusShortname}
          config={disqusConfig}
        />
      ) : null}
    </div>
  )
}
export default DisqusComments
