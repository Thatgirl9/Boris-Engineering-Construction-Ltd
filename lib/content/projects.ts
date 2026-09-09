import { ProjectItem, ProjectCategory } from "@/lib/types";
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
  afterImage
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
}

function mapSanityProject(doc: SanityProjectDoc): ProjectItem {
  return {
    slug: doc.slug,
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
  };
}

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
      "Failed to fetch projects from Sanity, using fallback content:",
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
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(limit = 4): Promise<ProjectItem[]> {
  const all = await getProjects();
  return all.slice(0, limit);
}
