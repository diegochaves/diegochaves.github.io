import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

// Posts are named YYYY-MM-DD-HHmm-slug.md. The prefix keeps the folder in
// chronological order and is the post's publication date, in Brasília time
// (TIME_ZONE in consts.ts); only the slug reaches the URL (/blog/slug/).
const POST_FILENAME = /^(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})-(.+)\.md$/;

function parsePostFilename(path: string) {
  const name = path.split(/[\\/]/).pop() ?? path;
  const match = POST_FILENAME.exec(name);
  if (!match) {
    throw new Error(`Nome de post inválido: "${name}". Use YYYY-MM-DD-HHmm-slug.md`);
  }
  const [, year, month, day, hour, minute, slug] = match;
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00-03:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Data inválida no nome do post: "${name}"`);
  }
  return { slug, date };
}

const posts = glob({
  pattern: '**/*.md',
  base: './src/content/blog',
  generateId: ({ entry }) => parsePostFilename(entry).slug,
});

// glob() plus the date taken from the filename, injected before validation.
const blogLoader: Loader = {
  name: 'blog-loader',
  load: (context) =>
    posts.load({
      ...context,
      parseData: (props) =>
        context.parseData({
          ...props,
          data: { ...props.data, date: parsePostFilename(props.filePath ?? props.id).date },
        }),
    }),
};

const blog = defineCollection({
  loader: blogLoader,
  schema: z.object({
    title: z.string(),
    date: z.date(),
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
