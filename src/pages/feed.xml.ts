import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostSlug } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Rithesh's Blog",
    description: 'Thoughts on programming, algorithms, and more',
    site: context.site ?? new URL('/', context.url).origin,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${getPostSlug(post.id)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
