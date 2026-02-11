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

function contentDir(...segments: string[]) {
  return path.join(process.cwd(), "src", "content", ...segments);
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function listDirs(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getHero(): Promise<HeroContent> {
  const data = await readJson<HeroContent>(contentDir("hero.json"));
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
  return data;
}

export async function getAbout(): Promise<AboutContent> {
  const data = await readJson<AboutContent>(contentDir("about.json"));
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
  return data;
}

export async function getExperiences(): Promise<Experience[]> {
  const slugs = await listDirs(contentDir("experiences"));
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await readJson<Record<string, unknown>>(
        contentDir("experiences", slug, "index.json")
      );
      if (!data) return null;
      return {
        slug,
        company: slug,
        role: (data.role as string) || "",
        periodStart: (data.periodStart as string) || "",
        periodEnd: (data.periodEnd as string) || "",
        description: (data.description as string) || "",
        skills: (data.skills as string[]) || [],
        highlights: (data.highlights as string[]) || [],
        sortOrder: (data.sortOrder as number) ?? 0,
      } satisfies Experience;
    })
  );
  return entries
    .filter((e): e is Experience => e !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjects(): Promise<Project[]> {
  const slugs = await listDirs(contentDir("projects"));
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await readJson<Record<string, unknown>>(
        contentDir("projects", slug, "index.json")
      );
      if (!data) return null;
      return {
        slug,
        title: slug,
        description: (data.description as string) || "",
        category: (data.category as Project["category"]) || "investment",
        year: (data.year as string) || "",
        status: (data.status as Project["status"]) || "active",
        tags: (data.tags as string[]) || [],
        link: (data.link as string) || null,
        image: (data.image as string) || null,
        highlights: (data.highlights as string[]) || [],
        sortOrder: (data.sortOrder as number) ?? 0,
      } satisfies Project;
    })
  );
  return entries
    .filter((e): e is Project => e !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = await listDirs(contentDir("posts"));
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = contentDir("posts", slug, "index.mdoc");
      let raw = "";
      try {
        raw = await fs.readFile(filePath, "utf-8");
      } catch {
        return null;
      }

      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const fm = frontmatterMatch[1];
      const get = (key: string) => {
        const m = fm.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?$`, "m"));
        return m ? m[1].trim() : "";
      };
      const published = get("published") !== "false";
      if (!published) return null;

      const tagsMatch = fm.match(/tags:\n((?:\s*-\s*.+\n?)*)/);
      const tags = tagsMatch
        ? tagsMatch[1]
            .split("\n")
            .map((l) => l.replace(/^\s*-\s*/, "").trim())
            .filter(Boolean)
        : [];

      const contentText = raw.slice(frontmatterMatch[0].length).trim();

      return {
        slug,
        title: slug,
        description: get("description"),
        date: get("date"),
        tags,
        published,
        readingTime: calculateReadingTime(contentText),
      } satisfies BlogPostMeta;
    })
  );
  return (entries.filter(Boolean) as BlogPostMeta[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = contentDir("posts", slug, "index.mdoc");
  let raw = "";
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const fm = frontmatterMatch[1];
  const get = (key: string) => {
    const m = fm.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?$`, "m"));
    return m ? m[1].trim() : "";
  };
  const published = get("published") !== "false";

  const tagsMatch = fm.match(/tags:\n((?:\s*-\s*.+\n?)*)/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split("\n")
        .map((l) => l.replace(/^\s*-\s*/, "").trim())
        .filter(Boolean)
    : [];

  const contentText = raw.slice(frontmatterMatch[0].length).trim();

  return {
    slug,
    title: slug,
    description: get("description"),
    date: get("date"),
    tags,
    published,
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
