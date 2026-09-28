import { ProjectItem, ProjectCategory, ProjectStage, ProjectVideo, ProjectTestimonial } from "@/lib/types";
import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Renovation",
  "Concrete & Civil",
];

// Used until a Sanity project is connected (NEXT_PUBLIC_SANITY_PROJECT_ID /
// NEXT_PUBLIC_SANITY_DATASET in .env.local) and also as a safety net if a
// Sanity request ever fails — the site should never break because the CMS
// is briefly unreachable.

const PLACEHOLDER_IMAGE = "/images/projects/placeholder.svg";

const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(order, 999) asc, _createdAt desc) {
  "slug": slug.current,
  title,
  category,
  location,
  status,
  description,
  coverImage,
  beforeImage,
  duringImage,
  afterImage,
  scopeOfWork,
  stages,
  gallery,
  "videos": videos[]{
    "url": file.asset->url,
    caption
  },
  "testimonials": testimonials[]{
    quote,
    authorName,
    authorRole,
    photo
  }
}`;

interface SanityProjectDoc {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  status: "Completed" | "In Progress";
  description: string;
  coverImage?: Record<string, unknown>;
  beforeImage?: Record<string, unknown>;
  duringImage?: Record<string, unknown>;
  afterImage?: Record<string, unknown>;
  scopeOfWork?: string[];
  stages?: ProjectStage[];
  gallery?: Record<string, unknown>[];
  videos?: { url: string | null; caption?: string }[];
  testimonials?: {
    quote: string;
    authorName?: string;
    authorRole?: string;
    photo?: Record<string, unknown>;
  }[];
}

// function mapSanityProject(doc: SanityProjectDoc): ProjectItem {
//   return {
//     slug: doc.slug,
//     title: doc.title,
//     category: doc.category,
//     location: doc.location,
//     status: doc.status,
//     description: doc.description,
//     images: {
//       cover: urlForImage(doc.coverImage) ?? PLACEHOLDER_IMAGE,
//       before: urlForImage(doc.beforeImage) ?? PLACEHOLDER_IMAGE,
//       during: urlForImage(doc.duringImage) ?? PLACEHOLDER_IMAGE,
//       after: urlForImage(doc.afterImage) ?? PLACEHOLDER_IMAGE,
//     },
//   };
// };

function normalizeProjectSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapSanityProject(doc: SanityProjectDoc): ProjectItem {
  const videos: ProjectVideo[] = (doc.videos ?? [])
    .filter((v): v is { url: string; caption?: string } => Boolean(v.url))
    .map((v) => ({ url: v.url, caption: v.caption }));

  const testimonials: ProjectTestimonial[] = (doc.testimonials ?? []).map((t) => ({
    quote: t.quote,
    authorName: t.authorName,
    authorRole: t.authorRole,
    photo: urlForImage(t.photo) ?? undefined,
  }));

  return {
    slug: normalizeProjectSlug(doc.slug),
    title: doc.title,
    category: doc.category,
    location: doc.location,
    status: doc.status,
    description: doc.description,
    images: {
      cover: urlForImage(doc.coverImage) ?? PLACEHOLDER_IMAGE,
      before: urlForImage(doc.beforeImage) ?? PLACEHOLDER_IMAGE,
      during: urlForImage(doc.duringImage) ?? PLACEHOLDER_IMAGE,
      after: urlForImage(doc.afterImage) ?? PLACEHOLDER_IMAGE,
    },
    scopeOfWork: doc.scopeOfWork?.length ? doc.scopeOfWork : undefined,
    stages: doc.stages?.length ? doc.stages : undefined,
    gallery: doc.gallery?.length
      ? doc.gallery.map((img) => urlForImage(img)).filter((url): url is string => Boolean(url))
      : undefined,
    videos: videos.length ? videos : undefined,
    testimonials: testimonials.length ? testimonials : undefined,
  };
};

/**
 * Fetches projects from Sanity when configured; otherwise returns the
 * local fallback list. This is the ONLY function that knows where project
 * data comes from — every page/component just calls getProjects() and
 * gets back ProjectItem[], whether that's Sanity or the fallback array.
 */
export async function getProjects(): Promise<ProjectItem[]> {
  if (!isSanityConfigured || !sanityClient) return [];

  try {
    const docs = await sanityClient.fetch<SanityProjectDoc[]>(PROJECTS_QUERY);
    return (docs ?? []).map(mapSanityProject);
  } catch (err) {
    console.error(
      "Failed to fetch projects from Sanity:",
      err,
    );
    return [];
  }
}

export async function getProjectsByCategory(
  category?: ProjectCategory,
): Promise<ProjectItem[]> {
  const all = await getProjects();
  if (!category) return all;
  return all.filter((p) => p.category === category);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectItem | undefined> {
  const all = await getProjects();
  const normalizedSlug = normalizeProjectSlug(slug);
  return all.find((p) => normalizeProjectSlug(p.slug) === normalizedSlug);
}

export async function getFeaturedProjects(limit = 4): Promise<ProjectItem[]> {
  const all = await getProjects();
  return all.slice(0, limit);
}
