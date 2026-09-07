import { ServiceItem } from "@/lib/types";

const services: ServiceItem[] = [
  {
    slug: "building-construction",
    icon: "building",
    title: "Building Construction",
    description:
      "Residential, commercial, and other building construction projects from planning through completion.",
    details: [
      "Residential homes, duplexes, and apartment blocks",
      "Commercial and mixed-use buildings",
      "Setting out, blockwork, roofing, and finishing",
    ],
  },
  {
    slug: "civil-structural-engineering",
    icon: "civil",
    title: "Civil & Structural Engineering",
    description:
      "Civil and structural construction works delivered with proper planning and professional execution.",
    details: [
      "Structural design coordination and execution",
      "Drainage, external works, and site preparation",
      "Reinforcement detailing and supervision",
    ],
  },
  {
    slug: "building-renovation-rehabilitation",
    icon: "renovation",
    title: "Building Renovation & Rehabilitation",
    description:
      "Renovation, remodeling, rehabilitation, and improvement of existing structures.",
    details: [
      "Remodeling of existing residential and commercial spaces",
      "Structural repairs and strengthening",
      "Plastering, painting, and finishing upgrades",
    ],
  },
  {
    slug: "floor-wall-tiling",
    icon: "tiling",
    title: "Floor & Wall Tiling",
    description:
      "Professional installation of floor and wall tiles for residential and commercial spaces.",
    details: [
      "Ceramic, porcelain, and granite tiling",
      "Bathroom, kitchen, and external wall finishes",
      "Precise setting out with clean joint lines",
    ],
  },
  {
    slug: "concrete-works",
    icon: "concrete",
    title: "Concrete Works",
    description:
      "Foundation works, reinforced concrete works, slabs, beams, columns, bases, and other concrete construction.",
    details: [
      "Foundations, bases, and ground beams",
      "Reinforced slabs, beams, and columns",
      "Formwork, casting, and curing control",
    ],
  },
  {
    slug: "project-management",
    icon: "management",
    title: "Project Management",
    description:
      "Planning, coordination, supervision, cost control, scheduling, and monitoring of construction projects.",
    details: [
      "Cost control, scheduling, and progress monitoring",
      "Contractor and supplier coordination",
      "Site supervision and reporting",
    ],
  },
  {
    slug: "building-maintenance",
    icon: "maintenance",
    title: "Building Maintenance",
    description:
      "Maintenance, repairs, and improvement works to help clients preserve the condition and value of their properties.",
    details: [
      "Preventive and corrective maintenance",
      "Repairs to finishes, roofs, and services",
      "Facility improvement works",
    ],
  },
];

export function getServices(): ServiceItem[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}
