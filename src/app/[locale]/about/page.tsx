import { getAbout } from "@/lib/content";
import { AboutClient } from "./client";

export default async function AboutPage() {
  const about = await getAbout();
  return <AboutClient data={about} />;
}
