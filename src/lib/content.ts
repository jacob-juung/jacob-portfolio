import { reader } from "./keystatic";
import { promises as fs } from "fs";
import path from "path";

export interface HeroContent {
  eyebrow: string;
  name: string;
  title: string;
  tagline: string;
  ctaContactLabel: string;
  ctaResumeLabel: string;
}

export interface AboutContent {
  name: string;
  role: string;
  bio: string;
  profileImage: string | null;
  stats: { label: string; value: string }[];
  skills: { category: string; items: string[] }[];
  journeyTitle: string;
  journeyParagraphs: string[];
  contactEmail: string;
  socialLinks: { label: string; url: string | null }[];
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  periodStart: string;
  periodEnd: string;
  description: string;
  skills: string[];
  highlights: string[];
  sortOrder: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "investment" | "product" | "development" | "advisory";
  year: string;
  status: "active" | "exited" | "completed";
  tags: string[];
  link: string | null;
  image: string | null;
  highlights: string[];
  sortOrder: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  content: string;
  readingTime: number;
}

export type BlogPostMeta = Omit<BlogPost, "content">;

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getHero(): Promise<HeroContent> {
  const data = await reader.singletons.hero.read();
  if (!data) {
    return {
      eyebrow: "Venture Capitalist",
      name: "Jacob",
      title: "",
      tagline: "",
      ctaContactLabel: "Contact",
      ctaResumeLabel: "Resume",
    };
  }
  return {
    eyebrow: data.eyebrow || "",
    name: data.name || "",
    title: data.title || "",
    tagline: data.tagline || "",
    ctaContactLabel: data.ctaContactLabel || "",
    ctaResumeLabel: data.ctaResumeLabel || "",
  };
}

export async function getAbout(): Promise<AboutContent> {
  const data = await reader.singletons.about.read();
  if (!data) {
    return {
      name: "",
      role: "",
      bio: "",
      profileImage: null,
      stats: [],
      skills: [],
      journeyTitle: "",
      journeyParagraphs: [],
      contactEmail: "",
      socialLinks: [],
    };
  }
  return {
    name: data.name || "",
    role: data.role || "",
    bio: data.bio || "",
    profileImage: data.profileImage || null,
    stats: data.stats.map((s) => ({ label: s.label || "", value: s.value || "" })),
    skills: data.skills.map((s) => ({
      category: s.category || "",
      items: [...s.items],
    })),
    journeyTitle: data.journeyTitle || "",
    journeyParagraphs: [...data.journeyParagraphs],
    contactEmail: data.contactEmail || "",
    socialLinks: data.socialLinks.map((l) => ({
      label: l.label || "",
      url: l.url || null,
    })),
  };
}

export async function getExperiences(): Promise<Experience[]> {
  const slugs = await reader.collections.experiences.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.experiences.read(slug);
      if (!data) return null;
      return {
        slug,
        company: slug,
        role: data.role || "",
        periodStart: data.periodStart || "",
        periodEnd: data.periodEnd || "",
        description: data.description || "",
        skills: [...data.skills],
        highlights: [...data.highlights],
        sortOrder: data.sortOrder ?? 0,
      } satisfies Experience;
    })
  );
  return entries
    .filter((e): e is Experience => e !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjects(): Promise<Project[]> {
  const slugs = await reader.collections.projects.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.projects.read(slug);
      if (!data) return null;
      return {
        slug,
        title: slug,
        description: data.description || "",
        category: data.category as Project["category"],
        year: data.year || "",
        status: data.status as Project["status"],
        tags: [...data.tags],
        link: data.link || null,
        image: data.image || null,
        highlights: [...data.highlights],
        sortOrder: data.sortOrder ?? 0,
      } satisfies Project;
    })
  );
  return entries
    .filter((e): e is Project => e !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = await reader.collections.posts.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.posts.read(slug);
      if (!data || !data.published) return null;

      const filePath = path.join(
        process.cwd(),
        "src/content/posts",
        slug,
        "index.mdoc"
      );
      let contentText = "";
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        const frontmatterEnd = raw.indexOf("---", raw.indexOf("---") + 3);
        contentText =
          frontmatterEnd !== -1 ? raw.slice(frontmatterEnd + 3).trim() : raw;
      } catch {
        contentText = "";
      }

      return {
        slug,
        title: slug,
        description: data.description || "",
        date: data.date || "",
        tags: [...data.tags],
        published: data.published,
        readingTime: calculateReadingTime(contentText),
      } satisfies BlogPostMeta;
    })
  );
  return (entries.filter(Boolean) as BlogPostMeta[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await reader.collections.posts.read(slug);
  if (!data) return null;

  const filePath = path.join(
    process.cwd(),
    "src/content/posts",
    slug,
    "index.mdoc"
  );
  let contentText = "";
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const frontmatterEnd = raw.indexOf("---", raw.indexOf("---") + 3);
    contentText =
      frontmatterEnd !== -1 ? raw.slice(frontmatterEnd + 3).trim() : raw;
  } catch {
    contentText = "";
  }

  return {
    slug,
    title: slug,
    description: data.description || "",
    date: data.date || "",
    tags: [...data.tags],
    published: data.published,
    content: contentText,
    readingTime: calculateReadingTime(contentText),
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}
