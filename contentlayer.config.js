import { makeSource } from "contentlayer/source-files"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { Post } from "./content/definitions/post"

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkGfm], [remarkMath]],
    rehypePlugins: [
      [rehypeKatex],
      [rehypeSlug],
      [rehypeAccessibleEmojis],
      [rehypePrettyCode, { theme: "dracula" }],
      [
        rehypeAutolinkHeadings,
        {
          behaviour: "append",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
})
