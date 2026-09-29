import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { getPosts } from '../utils/posts';

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
