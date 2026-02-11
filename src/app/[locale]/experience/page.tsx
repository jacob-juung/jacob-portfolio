import { getExperiences } from "@/lib/content";
import { ExperienceClient } from "./client";

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  return <ExperienceClient experiences={experiences} />;
}
