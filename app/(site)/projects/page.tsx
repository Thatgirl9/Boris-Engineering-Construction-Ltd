import type { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectsFilterGrid } from "@/components/sections/projects/ProjectsFilterGrid";
import { getProjects, PROJECT_CATEGORIES } from "@/lib/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Portfolio",
  description:
    "Browse completed and in-progress residential, commercial, renovation, and concrete & civil projects delivered by Boris Engineering & Construction Ltd across Nigeria.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ])
          ),
        }}
      />
      <ProjectsHero />
      <ProjectsFilterGrid projects={projects} categories={PROJECT_CATEGORIES} />
    </>
  );
}
