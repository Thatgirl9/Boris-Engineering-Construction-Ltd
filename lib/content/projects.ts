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
const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    slug: "4-bedroom-duplex-residence",
    title: "4-Bedroom Duplex Residence",
    category: "Residential",
    location: "Lekki, Lagos",
    status: "Completed",
    description:
      "Full build of a modern family duplex from foundation to finishing, including tiling, painting, and external works.",
    images: {
      cover: "/images/projects/duplex-cover.svg",
      before: "/images/projects/duplex-before.svg",
      during: "/images/projects/duplex-during.svg",
      after: "/images/projects/duplex-after.svg",
    },
  },
  {
    slug: "commercial-office-complex",
    title: "Commercial Office Complex",
    category: "Commercial",
    location: "Abuja, FCT",
    status: "In Progress",
    description:
      "Structural works and interior fit-out for a multi-floor office complex delivered under full project management.",
    images: {
      cover: "/images/projects/office-cover.svg",
      before: "/images/projects/office-before.svg",
      during: "/images/projects/office-during.svg",
      after: "/images/projects/office-after.svg",
    },
  },
  {
    slug: "apartment-renovation-finishing",
    title: "Apartment Renovation & Finishing",
    category: "Renovation",
    location: "Ikeja, Lagos",
    status: "Completed",
    description:
      "Complete remodeling of a residential apartment: replastering, floor and wall tiling, and full repainting.",
    images: {
      cover: "/images/projects/apartment-cover.svg",
      before: "/images/projects/apartment-before.svg",
      during: "/images/projects/apartment-during.svg",
      after: "/images/projects/apartment-after.svg",
    },
  },
  {
    slug: "reinforced-concrete-slab-works",
    title: "Reinforced Concrete Slab Works",
    category: "Concrete & Civil",
    location: "Port Harcourt, Rivers",
    status: "Completed",
    description:
      "Foundation, columns, beams, and suspended slab works executed with monitored concrete quality and safety checks.",
    images: {
      cover: "/images/projects/slab-cover.svg",
      before: "/images/projects/slab-before.svg",
      during: "/images/projects/slab-during.svg",
      after: "/images/projects/slab-after.svg",
    },
  },
];

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

function mapSanityProject(doc: SanityProjectDoc, fallback: ProjectItem): ProjectItem {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    location: doc.location,
    status: doc.status,
    description: doc.description,
    images: {
      cover: urlForImage(doc.coverImage) ?? fallback.images.cover,
      before: urlForImage(doc.beforeImage) ?? fallback.images.before,
      during: urlForImage(doc.duringImage) ?? fallback.images.during,
      after: urlForImage(doc.afterImage) ?? fallback.images.after,
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
  if (!isSanityConfigured || !sanityClient) return FALLBACK_PROJECTS;

  try {
    const docs = await sanityClient.fetch<SanityProjectDoc[]>(PROJECTS_QUERY);
    if (!docs?.length) return FALLBACK_PROJECTS;
    return docs.map((doc, i) => mapSanityProject(doc, FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length]));
  } catch (err) {
    console.error("Failed to fetch projects from Sanity, using fallback content:", err);
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectsByCategory(category?: ProjectCategory): Promise<ProjectItem[]> {
  const all = await getProjects();
  if (!category) return all;
  return all.filter((p) => p.category === category);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(limit = 4): Promise<ProjectItem[]> {
  const all = await getProjects();
  return all.slice(0, limit);
}
