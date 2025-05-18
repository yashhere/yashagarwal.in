import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import remarkCallouts from "@portaljs/remark-callouts"
import GithubSlugger, { slug } from "github-slugger"
import { default as readTime } from "reading-time"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import externalLinks from "rehype-external-links"
import rehypeKatex from "rehype-katex"
import rehypeMermaid from "rehype-mermaid"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkSmartypants from "remark-smartypants"
import wikiLinkPlugin from "remark-wiki-link"
import { createHighlighter } from "shiki"
import { visit } from "unist-util-visit"

import rehypeImageMetadata from "./utils/plugins/image-metadata"

const pageResolver = (name: string) => [
  name.replace(/-/g, "").replace(/ /g, "-").toLowerCase(),
]

const hrefTemplate = (permalink: string) => `/notes/${permalink}`

function extractHeadings(content: string) {
  const slugger = new GithubSlugger()

  // identify code blocks and exclude them from heading detection
  const codeBlockRegex = /```[\s\S]*?```/g
  const contentWithoutCodeBlocks = content.replace(
    codeBlockRegex,
    "CODE_BLOCK_PLACEHOLDER"
  )

  // Now detect headings only in the content outside code blocks
  const headingRegex = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

  const headings = Array.from(
    contentWithoutCodeBlocks.matchAll(headingRegex)
  ).map(
    // @ts-ignore
    ({ groups }) => {
      const flag = groups?.flag
      const content = groups?.content
      return {
        heading: flag?.length,
        text: content,
        slug: content ? slugger.slug(content) : undefined,
      }
    }
  )

  return headings
}

const prettyCodeOptions: Options = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  getHighlighter: (options) =>
    createHighlighter({
      ...options,
    }),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
    node.properties.className = [""]
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className = ["word--highlighted"]
  },
}

const notes = defineCollection({
  name: "notes",
  directory: "content/notes",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    tags: z.array(z.string()).optional(),
    series: z
      .object({
        title: z.string(),
        order: z.number().optional(),
      })
      .optional(),
    createdOn: z.string(),
    updatedOn: z.string().optional(),
    toc: z.boolean().default(true),
    mdx: z.string().optional(),
    headings: z
      .array(
        z.object({
          heading: z.number(),
          text: z.string(),
          slug: z.string(),
        })
      )
      .optional(),
    readingTime: z
      .object({
        text: z.string(),
        time: z.number(),
        words: z.number(),
        minutes: z.number(),
      })
      .optional(),
    slug: z.string().optional(),
  }),
  onSuccess: (docs) => {
    console.log(`generated collection with ${docs.length}`)
  },
  transform: async (document, context) => {
    // const readingTime = JSON.parse(JSON.stringify(readTime(document.content)))
    const readingTime = readTime(document.content)
    const headings = extractHeadings(document.content)

    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [rehypeSlug as any],
        [rehypeKatex as any, { output: "mathml" }],
        [rehypeImageMetadata],
        [rehypeAccessibleEmojis],
        [rehypeUnwrapImages],
        [
          rehypeMermaid as any,
          {
            strategy: "inline-svg",
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            behaviour: "wrap",
            properties: {
              className: ["anchor"],
            },
          },
        ],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children
              if (codeEl.tagName !== "code") {
                return
              }
              if (codeEl.data?.meta) {
                // Extract event from meta and pass it down the tree.
                const regex = /event="([^"]*)"/
                const match = codeEl.data?.meta.match(regex)
                if (match) {
                  node.__event__ = match ? match[1] : null
                  codeEl.data.meta = codeEl.data.meta.replace(regex, "")
                }
              }
              node.__rawString__ = codeEl.children?.[0].value
              node.__src__ = node.properties?.__src__
              node.__style__ = node.properties?.__style__
            }
          })
        },
        [rehypePrettyCode, prettyCodeOptions],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return
              }

              const preElement = node.children.at(-1)
              if (preElement.tagName !== "pre") {
                return
              }

              preElement.properties["__withMeta__"] =
                node.children.at(0).tagName === "div"
              preElement.properties["__rawString__"] = node.__rawString__

              if (node.__src__) {
                preElement.properties["__src__"] = node.__src__
              }

              if (node.__event__) {
                preElement.properties["__event__"] = node.__event__
              }

              if (node.__style__) {
                preElement.properties["__style__"] = node.__style__
              }
            }
          })
        },
      ],
      remarkPlugins: [
        [remarkGfm],
        [remarkMath],
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
    })

    return {
      ...document,
      _id: document._meta.filePath,
      mdx,
      headings,
      readingTime,
      slug: `${document._meta.path}`,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: document._meta.path,
        contentType: "mdx",
      },
      body: {
        raw: document.content,
        code: mdx,
      },
    }
  },
})

const lifelog = defineCollection({
  name: "lifelog",
  directory: "content/lifelog",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    createdOn: z.string(),
    updatedOn: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)

    return {
      ...document,
      _id: document._meta.filePath,
      mdx,
      slug: document._meta.path,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: document._meta.path,
        contentType: "mdx",
      },
      body: {
        raw: document.content,
        code: mdx,
      },
    }
  },
})

export default defineConfig({
  collections: [notes, lifelog],
})
