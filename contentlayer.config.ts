import remarkCallouts from "@portaljs/remark-callouts";
import { makeSource } from "contentlayer/source-files";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import remarkUnwrapImages from "remark-unwrap-images";
import wikiLinkPlugin from "remark-wiki-link";



import { LifeLog } from "./content/definitions/lifelog";
import { Note } from "./content/definitions/note";
import rehypeImageMetadata from "./utils/plugins/image-metadata";


const pageResolver = (name: string) => [
  name.replace(/-/g, "").replace(/ /g, "-").toLowerCase(),
]

const hrefTemplate = (permalink: string) => `/notes/${permalink}`

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  // Callbacks to customize the output of the nodes
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
    node.properties.className = [""]
  },
  onVisitHighlightedLine(node) {
    // Adding a class to the highlighted line
    node.properties.className.push("highlighted")
  },
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Note, LifeLog],
  date: { timezone: "Asia/Kolkata" },
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
      [
        rehypeMermaid as any,
        {
          strategy: "inline-svg",
          className: "mermaid-diagram",
        },
      ],
      [rehypePrettyCode, rehypePrettyCodeOptions],
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
