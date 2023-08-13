import remarkCallouts from "@portaljs/remark-callouts"
import { makeSource } from "contentlayer/source-files"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkSmartypants from "remark-smartypants"
import remarkUnwrapImages from "remark-unwrap-images"
import wikiLinkPlugin from "remark-wiki-link"

import { LifeLog } from "./content/definitions/lifelog";
import { Note } from "./content/definitions/note"
import rehypeImageMetadata from "./utils/plugins/image-metadata"

const pageResolver = (name: string) => [
  name.replace(/-/g, "").replace(/ /g, "-").toLowerCase(),
]

const hrefTemplate = (permalink: string) => `/notes/${permalink}`

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Note, LifeLog],
  mdx: {
    remarkPlugins: [
      [remarkGfm],
      [remarkMath],
      [remarkUnwrapImages],
      [remarkCallouts],
      [
        wikiLinkPlugin,
        {
          pageResolver,
          hrefTemplate,
          aliasDivider: "|",
          newClassName: "text-secondary",
        },
      ],
      [remarkSmartypants, { quotes: false, dashes: "oldschool" }],
    ],
    rehypePlugins: [
      [rehypeKatex, { output: "mathml" }],
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
