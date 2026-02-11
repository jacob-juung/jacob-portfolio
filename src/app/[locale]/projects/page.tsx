import { getProjects } from "@/lib/content";
import { ProjectsClient } from "./client";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
