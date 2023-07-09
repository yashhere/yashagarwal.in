"use client"

import Giscus from "@giscus/react"

export function Comments() {
  return (
    <Giscus
      id="comments"
      repo="yashhere/yashagarwal.in-comments"
      repoId="R_kgDOJ5aOmA"
      category="Comments"
      categoryId="DIC_kwDOJ5aOmM4CXxEK"
      mapping="pathname"
      term="Welcome to comments section of yashagarwal.in!"
      data-strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  )
}
