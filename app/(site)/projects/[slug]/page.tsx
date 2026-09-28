import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ProjectDetailHero } from "@/components/sections/projects/ProjectDetailHero";
import { ProjectStageCard } from "@/components/cards/ProjectStageCard";
import { ProjectMediaGallery } from "@/components/sections/projects/ProjectMediaGallery";
import { ProjectTestimonials } from "@/components/sections/projects/ProjectTestimonials";
import { ProjectCTA } from "@/components/sections/projects/ProjectCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjectBySlug, getProjects } from "@/lib/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

// Content lives in Sanity and can change at any time without a
// redeploy — re-check every 5 minutes rather than caching forever, but
// still serve from cache (not on every request) for performance.
export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Project not found", description: "", path: `/projects/${slug}` });

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.images.cover,
  });
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const galleryImages = [
    { url: project.images.before, alt: `${project.title} — Before` },
    { url: project.images.during, alt: `${project.title} — During` },
    { url: project.images.after, alt: `${project.title} — After` },
    ...(project.gallery ?? []).map((url, i) => ({ url, alt: `${project.title} — Photo ${i + 1}` })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ])
          ),
        }}
      />

      <ProjectDetailHero project={project} />

      {project.scopeOfWork?.length ? (
        <Section background="default">
          <SectionHeading eyebrow="Scope of Work" heading="What this project covered" />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.scopeOfWork.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm leading-relaxed text-secondary-text">{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.stages?.length ? (
        <Section background="muted">
          <SectionHeading
            eyebrow="Construction Stages"
            heading="How this project came together"
            description="From planning to handover, here's how the work was carried out."
          />
          <div className="mt-8 space-y-4">
            {project.stages.map((stage, i) => (
              <ProjectStageCard key={stage.title} stage={stage} index={i} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section background="default">
        <SectionHeading
          eyebrow="Gallery"
          heading="Photos & Videos"
          description="Click any photo or video to view it full-size."
        />
        <div className="mt-8">
          <ProjectMediaGallery images={galleryImages} videos={project.videos} />
        </div>
      </Section>

      {project.testimonials?.length ? (
        <ProjectTestimonials testimonials={project.testimonials} />
      ) : null}

      <ProjectCTA />
    </>
  );
};