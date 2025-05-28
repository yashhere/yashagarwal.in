"use client"

import { DiscussionEmbed } from "disqus-react"
import { useTheme } from "next-themes"
import { useInView } from "react-intersection-observer"

import { useGiscus } from "@/lib/useGiscus"

interface ICommentProps {
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

export const DisqusComments = ({ url, slug }: ICommentProps) => {
  const { resolvedTheme = "light" } = useTheme()
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    fallbackInView: true,
    rootMargin: "100px", // Start loading before user reaches comments
  })
  const disqusShortname = "yashhere"
  const disqusConfig = {
    identifier: slug,
    url: url,
  }

  return (
    <div className="pt-8" ref={ref}>
      {inView ? (
        <div className="comments">
          <DiscussionEmbed
            key={resolvedTheme}
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      ) : null}
    </div>
  )
}
export default DisqusComments
