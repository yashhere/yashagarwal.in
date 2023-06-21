import { defineNestedType } from "contentlayer/source-files";
import { Post } from "./post";

export const Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
  },
}));
