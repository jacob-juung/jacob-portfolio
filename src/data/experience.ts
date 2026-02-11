export interface Experience {
  id: string;
  period: {
    start: string;
    end: string | null;
  };
  company: string;
  role: string;
  description: string;
  skills: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "current",
    period: { start: "2023.03", end: null },
    company: "Venture Capital Firm",
    role: "Partner",
    description: "Leading investments in gaming and AI startups, focusing on early-stage companies at the intersection of entertainment and technology.",
    skills: ["VC", "Due Diligence", "Portfolio Management", "AI/Gaming"],
    highlights: [
      "Led 10+ investments in gaming and AI startups",
      "Built network of 50+ gaming industry founders",
      "Developed proprietary deal sourcing framework",
    ],
  },
  {
    id: "previous-1",
    period: { start: "2020.01", end: "2023.02" },
    company: "Gaming Startup",
    role: "Head of Business Development",
    description: "Drove strategic partnerships and M&A activities, scaling the company from Series A to successful exit.",
    skills: ["M&A", "Biz-Dev", "Partnerships", "Strategy"],
    highlights: [
      "Executed 3 strategic acquisitions",
      "Grew revenue 5x through partnerships",
      "Led Series B fundraising ($30M)",
    ],
  },
  {
    id: "previous-2",
    period: { start: "2017.06", end: "2019.12" },
    company: "Tech Company",
    role: "Senior Product Manager",
    description: "Led product development for mobile gaming platform, managing cross-functional teams and delivering key features.",
    skills: ["Product Management", "Mobile", "Gaming", "Agile"],
    highlights: [
      "Launched 3 major product features",
      "Grew MAU from 1M to 5M",
      "Built and led team of 15 engineers",
    ],
  },
  {
    id: "previous-3",
    period: { start: "2015.03", end: "2017.05" },
    company: "Software Agency",
    role: "Full Stack Developer",
    description: "Developed web and mobile applications for enterprise clients, focusing on gaming and entertainment projects.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    highlights: [
      "Delivered 10+ client projects",
      "Reduced deployment time by 60%",
      "Mentored 5 junior developers",
    ],
  },
];
