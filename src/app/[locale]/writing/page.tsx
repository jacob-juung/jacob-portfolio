import { getAllPosts, getAllTags } from "@/lib/blog";
import { WritingPageClient } from "./client";

export default function WritingPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return <WritingPageClient posts={posts} allTags={allTags} />;
}
