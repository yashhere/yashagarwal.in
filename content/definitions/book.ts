import { defineDocumentType } from "contentlayer/source-files"
import { Tag } from "./tag"

export const Book = defineDocumentType(() => ({
  name: "Book",
  filePathPattern: "books/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    authors: { type: "list", required: true, of: { type: "string" } },
    readingType: { type: "enum", options: ["book", "article"], required: true },
    start: { type: "date", required: false },
    end: { type: "date", required: false },
    status: {
      type: "enum",
      options: ["completed", "in progress", "queued"],
      required: true,
    },
    tags: {
      type: "list",
      required: false,
      of: Tag,
    },
  },
}))
