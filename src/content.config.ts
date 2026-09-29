import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';

// Posts are named YYYY-MM-DD-HHmm-slug.md. The prefix keeps the folder in
// chronological order and is the post's publication date; only the slug
// reaches the URL (/blog/slug/). Times are Brasília time (UTC-3, no DST).
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
    category: z.enum(['dev', 'carreira', 'curiosidades', 'pessoal']),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
