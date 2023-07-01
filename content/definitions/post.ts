import {
  defineDocumentType,
  defineComputedFields,
} from "contentlayer/source-files"
import { Series } from "./series"
import { Tag } from "./tag"
import GithubSlugger from "github-slugger"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = defineComputedFields<"Post">({
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      const slugger = new GithubSlugger()

      // https://stackoverflow.com/a/70802303
      const regex = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

      const headings = Array.from(doc.body.raw.matchAll(regex)).map(
        // @ts-ignore
        ({ groups }) => {
          const flag = groups?.flag
          const content = groups?.content
          return {
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          }
        },
      )

      return headings
    },
  },
})

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    published: { type: "string", required: true },
    description: { type: "string" },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    tags: {
      type: "list",
      required: false,
      of: Tag,
    },
    series: {
      type: "nested",
      of: Series,
    },
  },
  computedFields,
}))
