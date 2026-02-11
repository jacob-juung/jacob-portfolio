"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

interface WritingPageClientProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export function WritingPageClient({ posts, allTags }: WritingPageClientProps) {
  const t = useTranslations("writing");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === null ||
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

   return (
     <motion.div
       variants={containerVariants}
       initial={false}
       animate="visible"
       className="py-8 space-y-8"
     >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary">{t("description")}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary transition-colors"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${
              selectedTag === null
                ? "bg-text-primary text-bg-primary"
                : "bg-bg-tertiary text-text-secondary hover:bg-bg-secondary"
            }`}
          >
            {t("allTags")}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                selectedTag === tag
                  ? "bg-text-primary text-bg-primary"
                  : "bg-bg-tertiary text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {filteredPosts.length === 0 ? (
          <p className="text-text-tertiary py-8 text-center">{t("noResults")}</p>
        ) : (
          filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/${locale}/writing/${post.slug}`}
                className="group block p-6 rounded-2xl bg-bg-secondary border border-border-primary hover:border-border-secondary transition-all hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-text-tertiary whitespace-nowrap">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readingTime} {t("minRead")}</span>
                  </div>
                </div>
                <p className="text-text-secondary mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-bg-tertiary text-text-tertiary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
