import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingMinutes(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Front matter dates are parsed as UTC midnight, so format them in UTC too.
function format(date: Date, options: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC', ...options });
}

/** 28.09 */
export const formatDayMonth = (date: Date) =>
  format(date, { day: '2-digit', month: '2-digit' }).replaceAll('/', '.');

/** 28.09.2026 */
export const formatDate = (date: Date) =>
  format(date, { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '.');

/** setembro 2026 */
export const formatMonthYear = (date: Date) =>
  `${format(date, { month: 'long' })} ${date.getUTCFullYear()}`;

/** set 2026 */
export const formatShortMonthYear = (date: Date) =>
  `${format(date, { month: 'short' }).replace('.', '')} ${date.getUTCFullYear()}`;

/** Groups posts (already sorted newest first) into consecutive months. */
export function groupByMonth(posts: Post[]) {
  const groups: { key: string; label: string; posts: Post[] }[] = [];
  for (const post of posts) {
    const date = post.data.date;
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    let group = groups.at(-1);
    if (group?.key !== key) {
      group = { key, label: formatMonthYear(date), posts: [] };
      groups.push(group);
    }
    group.posts.push(post);
  }
  return groups;
}
