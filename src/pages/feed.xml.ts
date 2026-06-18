import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { buildPostsFeed } from '../lib/rss';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return buildPostsFeed({
    context,
    title: "Rithesh's Blog",
    description: 'Thoughts on programming, algorithms, and more',
    posts
  });
}
