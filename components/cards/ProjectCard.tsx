import Image from "next/image";
import { MapPin } from "lucide-react";
import { ProjectItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProjectCard({ project }: { project: ProjectItem }) {
  const stages: { key: "before" | "during" | "after"; label: string }[] = [
    { key: "before", label: "Before" },
    { key: "during", label: "During" },
    { key: "after", label: "After" },
  ];

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      <div className="relative aspect-16/10 w-full bg-bg-sec">
        <Image
          src={project.images.cover}
          alt={`${project.title} in ${project.location}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={cn(
            "absolute right-3 top-3 rounded-md px-3 font-ibm py-1 text-xs font-semibold",
            project.status === "Completed"
              ? "bg-secondary text-on-secondary"
              : "bg-primary text-on-primary"
          )}
        >
          {project.status}
        </span>
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold font-ibm uppercase tracking-[0.6] text-secondary">{project.category}</p>
        <h3 className="mt-1 text-lg font-archivo font-semibold text-primary-text">{project.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-ibm text-secondary-text">
          <MapPin className="h-3.5 w-3.5 text-secondary" strokeWidth={1.75} />
          {project.location}
        </p>
        <p className="mt-3 text-sm font-ibm leading-relaxed text-secondary-text">{project.description}</p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
          {stages.map((s) => (
            <div key={s.key}>
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-bg-sec">
                <Image
                  src={project.images[s.key]}
                  alt={`${project.title} — ${s.label}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <p className="mt-1.5 text-center text-xs font-ibm font-semibold uppercase tracking-wide text-secondary-text">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectCardCompact({ project }: { project: ProjectItem }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:h-80.25">
      <div className="relative aspect-4/3 w-full bg-bg-sec">
        <Image
          src={project.images.cover}
          alt={`${project.title} in ${project.location}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-ibm font-bold uppercase tracking-[0.6] text-secondary">{project.category}</p>
        <h3 className="mt-1 text-base font-archivo font-semibold text-primary-text">{project.title}</h3>
        <p className="mt-1 text-sm font-ibm text-secondary-text">{project.location}</p>
      </div>
    </article>
  );
}
