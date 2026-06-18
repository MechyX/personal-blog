import type { APIContext } from "astro";
import { getPublishedPosts } from "../../lib/posts";
import { buildPostsFeed } from "../../lib/rss";

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).filter((post) => post.data.section === "other");

  return buildPostsFeed({
    context,
    title: "Rithesh's Not Tech Posts",
    description: "Non-technical writing by Rithesh.",
    posts
  });
}
