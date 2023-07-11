"use client"

import React from "react"
import { useGiscus } from "@/lib/useGiscus"
import { useInView } from "react-intersection-observer"

export const Comments = () => {
  const COMMENTS_NODE_ID = "comments"
  const MAPPING: string = "pathname"
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useGiscus({ mapping: MAPPING, commentNodeId: inView ? COMMENTS_NODE_ID : "" })

  return <div ref={ref}>{inView ? <div id={COMMENTS_NODE_ID} /> : null}</div>
}
