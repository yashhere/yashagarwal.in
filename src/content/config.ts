import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    series: z
      .object({
        title: z.string(),
        order: z.number().optional(),
      })
      .optional(),
    createdOn: z.coerce.date(),
    updatedOn: z.coerce.date().optional(),
    related: z.array(z.string()).optional(),
  }),
});

const lifelog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    createdOn: z.coerce.date(),
    updatedOn: z.coerce.date().optional(),
  }),
});

export const collections = {
  notes,
  lifelog,
};
