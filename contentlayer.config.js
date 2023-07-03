import { makeSource } from "contentlayer/source-files"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeMathjax from "rehype-mathjax"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { Post } from "./content/definitions/post"
import { HEADING_LINK_ANCHOR } from "./lib/constants"

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      [remarkGfm],
      // [remarkMath]
    ],
    rehypePlugins: [
      // [rehypeMathjax],
      [rehypeSlug],
      [rehypeAccessibleEmojis],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push(HIGHLIGHTED_LINE)
          },
          onVisitHighlightedWord(node) {
            node.properties.className = [HIGHLIGHTED_WORD]
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behaviour: "append",
          properties: {
            className: [HEADING_LINK_ANCHOR],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
