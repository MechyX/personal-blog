import type { APIContext } from "astro";
import { getPublishedPosts } from "../../lib/posts";
import { buildPostsFeed } from "../../lib/rss";

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).filter((post) => post.data.section === "software");

  return buildPostsFeed({
    context,
    title: "Rithesh's Tech Posts",
    description: "Technical writing by Rithesh.",
    posts
  });
}
