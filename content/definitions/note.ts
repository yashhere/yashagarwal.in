import {
  defineComputedFields,
  defineDocumentType,
} from "contentlayer/source-files"
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"

import { Series } from "./series"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = defineComputedFields<"Note">({
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw),
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
        }
      )

      return headings
    },
  },
})

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: "notes/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    createdOn: { type: "string", required: true },
    updatedOn: { type: "string", required: false },
    description: { type: "string" },
    featured: { type: "boolean", default: false },
    image: { type: "string" },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    tags: {
      type: "list",
      required: false,
      of: { type: "string" },
    },
    series: {
      type: "nested",
      of: Series,
    },
  },
  computedFields,
}))
