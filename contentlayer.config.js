import { makeSource } from "contentlayer/source-files"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkUnwrapImages from "remark-unwrap-images"

import { LifeLog } from "./content/definitions/lifelog"
import { Post } from "./content/definitions/post"
import rehypeImageMetadata from "./utils/plugins/image-metadata"

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, LifeLog],
  mdx: {
    remarkPlugins: [[remarkGfm], [remarkMath], [remarkUnwrapImages]],
    rehypePlugins: [
      [rehypeKatex],
      [rehypeSlug],
      [rehypeImageMetadata],
      [rehypeAccessibleEmojis],
      [rehypePrettyCode, { theme: "dracula" }],
      [
        rehypeAutolinkHeadings,
        {
          behaviour: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
})
