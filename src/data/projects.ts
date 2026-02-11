export type ProjectCategory = "investment" | "product" | "development" | "advisory";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year: string;
  status: "active" | "exited" | "completed";
  tags: string[];
  link?: string;
  highlights?: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    id: "ai-gaming-fund",
    title: "AI Gaming Ventures",
    description: "Early-stage fund focused on startups at the intersection of AI and gaming. Leading investments in generative AI for game development, AI-powered NPCs, and procedural content generation.",
    category: "investment",
    year: "2023",
    status: "active",
    tags: ["Fund", "AI", "Gaming", "Seed Stage"],
    highlights: [
      "10+ portfolio companies",
      "$50M+ in follow-on funding raised by portfolio",
      "2 exits to date",
    ],
  },
  {
    id: "game-studio-ai",
    title: "GameStudio AI",
    description: "AI-powered game development platform that enables indie developers to create AAA-quality assets using generative AI. Board advisor role.",
    category: "advisory",
    year: "2023",
    status: "active",
    tags: ["Advisory", "GenAI", "Game Dev", "B2B"],
    link: "https://example.com",
    highlights: [
      "Series A ($15M) from top-tier VCs",
      "500+ studios using the platform",
      "Reduced asset creation time by 80%",
    ],
  },
  {
    id: "mobile-rpg",
    title: "Chronicle Heroes",
    description: "Mobile RPG with AI-driven narrative system. Led product strategy and business development during Series A stage, resulting in successful acquisition.",
    category: "product",
    year: "2022",
    status: "exited",
    tags: ["Mobile", "RPG", "AI", "Exit"],
    highlights: [
      "5M+ downloads globally",
      "Acquired by major gaming publisher",
      "First AI-narrative mobile game in Korea",
    ],
  },
  {
    id: "esports-platform",
    title: "Esports Analytics Hub",
    description: "B2B analytics platform for esports teams and tournament organizers. Built the MVP and scaled to profitability before stepping back.",
    category: "development",
    year: "2021",
    status: "completed",
    tags: ["Esports", "Analytics", "B2B", "SaaS"],
    highlights: [
      "Used by 50+ professional teams",
      "Profitable within 18 months",
      "Still operational and growing",
    ],
  },
  {
    id: "vr-experience",
    title: "VR Social World",
    description: "Social VR platform focused on gaming communities. Advised on go-to-market strategy and partnership development.",
    category: "advisory",
    year: "2021",
    status: "active",
    tags: ["VR", "Social", "Metaverse", "Gaming"],
    highlights: [
      "100K+ monthly active users",
      "Partnerships with major game publishers",
      "Featured in major gaming events",
    ],
  },
  {
    id: "web3-gaming",
    title: "TokenPlay",
    description: "Web3 gaming infrastructure providing on-chain game state management and player-owned economies. Technical advisor role.",
    category: "advisory",
    year: "2022",
    status: "active",
    tags: ["Web3", "Blockchain", "Gaming", "Infrastructure"],
    highlights: [
      "Integrated by 20+ games",
      "Processing 1M+ transactions daily",
      "Cross-chain compatibility",
    ],
  },
  {
    id: "streaming-tools",
    title: "StreamKit",
    description: "Open-source toolkit for game streamers with real-time overlay generation and audience interaction features.",
    category: "development",
    year: "2020",
    status: "completed",
    tags: ["Streaming", "Open Source", "Tools", "TypeScript"],
    link: "https://github.com",
    highlights: [
      "10K+ GitHub stars",
      "Used by popular streamers",
      "Active community of contributors",
    ],
  },
  {
    id: "gaming-accelerator",
    title: "GameX Accelerator",
    description: "Mentor and advisor for gaming-focused startup accelerator. Helping early-stage founders with product strategy and fundraising.",
    category: "advisory",
    year: "2024",
    status: "active",
    tags: ["Accelerator", "Mentorship", "Gaming", "Startups"],
    highlights: [
      "15 companies mentored",
      "Total funding raised: $30M+",
      "2 unicorn outcomes",
    ],
  },
];

export const projectCategories: { key: ProjectCategory; labelKey: string }[] = [
  { key: "investment", labelKey: "categories.investment" },
  { key: "product", labelKey: "categories.product" },
  { key: "development", labelKey: "categories.development" },
  { key: "advisory", labelKey: "categories.advisory" },
];
