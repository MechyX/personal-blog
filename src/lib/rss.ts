import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import type { CollectionEntry } from "astro:content";
import { getPostSlug } from "./posts";

interface FeedOptions {
  context: APIContext;
  title: string;
  description: string;
  posts: CollectionEntry<"posts">[];
}

export function buildPostsFeed({ context, title, description, posts }: FeedOptions) {
  return rss({
    title,
    description,
    site: context.site ?? new URL("/", context.url).origin,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${getPostSlug(post.id)}/`
    })),
    customData: `<language>en-us</language>`
  });
}
