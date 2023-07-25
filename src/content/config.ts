import { defineCollection, z } from "astro:content";

export const collections = {
  about: defineCollection({
    schema: ({ image }) =>
      z.object({
        background: z.optional(image()),
        backgroundClass: z.optional(z.string()),
        leadTitle: z.string(),
        title: z.string(),
      }),
  }),
  projects: defineCollection({
    schema: ({ image }) =>
      z.object({
        background: z.optional(image()),
        title: z.string(),
        exturl: z.optional(z.string()),
      }),
  }),
  publications: defineCollection({
    schema: z.object({
      authors: z.array(z.string()),
      date: z.date(),
      journal: z.string(),
      pdfurl: z.optional(z.string()),
      exturl: z.optional(z.string()),
      title: z.string(),
    }),
  }),
};
