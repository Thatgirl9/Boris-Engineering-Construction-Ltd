"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectItem, ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProjectsFilterGrid({
  projects,
  categories,
}: {
  projects: ProjectItem[];
  categories: ProjectCategory[];
}) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <Section background="default">
      <Eyebrow>Filter</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold tracking-tight font-archivo text-primary-text sm:text-[2.25rem]">
        Explore by project type
      </h2>
      <p className="mt-3 max-w-xl font-ibm text-base leading-relaxed text-secondary-text">
        Each project below documents the work stage by stage: before, during, and after.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by type">
        {(["All", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-lg px-4 py-2.5 font-ibm text-sm font-medium transition-colors",
              active === cat
                ? "bg-secondary text-on-secondary"
                : "border border-border bg-card hover:border-secondary hover:text-primary-text text-secondary-text"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-secondary-text">No projects in this category yet.</p>
      ) : null}
    </Section>
  );
}
