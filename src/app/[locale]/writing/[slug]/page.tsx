import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/content";
import { getTableOfContents } from "@/lib/toc";
import { MDXContent } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "./toc";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations("writing");
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const toc = await getTableOfContents(post.content);
  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <div className="py-8">
      <article className="relative">
        <header className="mb-10">
          <Link
            href={`/${locale}/writing`}
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToList")}
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            {post.title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary mb-6">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime} {t("minRead")}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-bg-tertiary text-text-secondary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10">
          <div className="prose-container">
            <MDXContent source={post.content} />
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>

        <nav className="mt-16 pt-8 border-t border-border-primary">
          <div className="grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/${locale}/writing/${prev.slug}`}
                className="group p-4 rounded-xl border border-border-primary hover:border-border-secondary transition-all"
              >
                <span className="text-xs text-text-tertiary">{t("prevPost")}</span>
                <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                  {prev.title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/${locale}/writing/${next.slug}`}
                className="group p-4 rounded-xl border border-border-primary hover:border-border-secondary transition-all text-right"
              >
                <span className="text-xs text-text-tertiary">{t("nextPost")}</span>
                <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                  {next.title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}
