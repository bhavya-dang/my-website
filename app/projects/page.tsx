import { fetchProjects } from "@/util/notion/index";
import ProjectClient from "@/components/ProjectClient";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Projects",
  description: "Explore my projects.",
});

export default async function ProjectsPage() {
  let projects = await fetchProjects();

  return <ProjectClient projects={projects} />;
}
