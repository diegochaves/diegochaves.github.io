import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    // Optional summary for "how I solved it" posts, shown above the text.
    resumo: z
      .object({
        problema: z.string(),
        complicou: z.string().optional(),
        solucao: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
