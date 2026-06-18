import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    section: z.enum(["software", "other"]),
    draft: z.boolean().default(false),
    image: z.string().optional()
  })
});

export const collections = { posts };
