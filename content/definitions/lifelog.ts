import {
  defineComputedFields,
  defineDocumentType,
} from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = defineComputedFields<"LifeLog">({
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
})

export const LifeLog = defineDocumentType(() => ({
  name: "LifeLog",
  filePathPattern: "lifelog/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    createdOn: { type: "string", required: true },
    updatedOn: { type: "string", required: true },
  },
  computedFields,
}))
