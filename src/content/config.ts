import { defineCollection, z } from "astro:content";

export const collections = {
  about: defineCollection({
    schema: ({ image }) =>
      z.object({
        background: z.optional(image()),
        leadTitle: z.string(),
        title: z.string(),
      }),
  }),
};
