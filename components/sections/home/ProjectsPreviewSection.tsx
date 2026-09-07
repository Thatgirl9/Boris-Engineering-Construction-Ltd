import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCardCompact } from "@/components/cards/ProjectCard";
import { ProjectItem } from "@/lib/types";

export function ProjectsPreviewSection({ projects }: { projects: ProjectItem[] }) {
  return (
    <Section background="default">
      <SectionHeading eyebrow="Featured Projects" heading="Recent work" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
        {projects.map((project) => (
          <Link key={project.slug} href="/projects" className="block">
            <ProjectCardCompact project={project} />
          </Link>
        ))}
      </div>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary hover:bg-primary/90 h-10"
      >
        View All Projects
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </Link>
    </Section>
  );
}
