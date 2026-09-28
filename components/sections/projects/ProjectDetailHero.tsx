import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProjectDetailHero({ project }: { project: ProjectItem }) {
  return (
    <section className="bg-gradient-to-br from-primary to-[#0C182A] text-on-primary">
      <Container className="py-14 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-on-primary/70 hover:text-on-primary"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to Projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-on-secondary">
            {project.category}
          </span>
          <span
            className={cn(
              "rounded-md px-3 py-1 text-xs font-semibold",
              project.status === "Completed" ? "bg-accent text-on-accent" : "bg-white/15 text-on-primary"
            )}
          >
            {project.status}
          </span>
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-on-primary/75">
          <MapPin className="h-4 w-4 text-secondary" strokeWidth={1.75} />
          {project.location}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-primary/80">
          {project.description}
        </p>
      </Container>

      <div className="relative mt-2 aspect-[16/6] w-full sm:aspect-[16/5]">
        <Image
          src={project.images.cover}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>
    </section>
  );
};