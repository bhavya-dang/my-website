import { fetchProjects } from "@/util/notion/index";
import ProjectClient from "@/components/ProjectClient";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Projects",
  description: "Explore my projects.",
});

export default async function ProjectsPage() {
  let projects = await fetchProjects();
  projects = projects
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return <ProjectClient projects={projects} />;
}
