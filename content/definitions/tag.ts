import { defineNestedType } from "contentlayer/source-files";

export const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    value: {
      type: "string",
      required: true,
    },
  },
}));
