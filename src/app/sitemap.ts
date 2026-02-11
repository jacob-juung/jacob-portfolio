import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jacob.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const locales = ["ko", "en"];

  const staticPages = ["", "/about", "/experience", "/projects", "/writing", "/contact"];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" as const : "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const blogRoutes = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${siteUrl}/${locale}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...blogRoutes];
}
