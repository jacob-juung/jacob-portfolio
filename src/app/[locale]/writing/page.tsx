import { getAllPosts, getAllTags } from "@/lib/content";
import { WritingPageClient } from "./client";

export default async function WritingPage() {
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return <WritingPageClient posts={posts} allTags={allTags} />;
}
