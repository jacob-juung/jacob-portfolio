import { Hero } from "@/components/hero";
import { getHero } from "@/lib/content";

export default async function Home() {
  const heroData = await getHero();
  return <Hero data={heroData} />;
}
