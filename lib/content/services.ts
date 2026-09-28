import { ServiceItem } from "@/lib/types";

const services: ServiceItem[] = [
  {
    slug: "building-construction",
    icon: "building",
    title: "Building Construction",
    description:
      "Turnkey residential homes, multi-unit estates, and commercial facilities built from setting out to final handover.",
    details: [
      "Residential homes, duplexes, and apartment blocks",
      "Commercial and mixed-use buildings",
      "Setting out, blockwork, roofing, and finishing",
    ],
  },
  {
    slug: "civil-structural-infrastructure",
    icon: "civil",
    title: "Civil & Structural Infrastructure",
    description:
      "Foundations, reinforced concrete frameworks, drainage networks, and heavy earthworks built to state standards.",
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
      "Structural remediation, crack repair, spatial redesigns, and comprehensive property upgrades.",
    details: [
      "Remodeling of existing residential and commercial spaces",
      "Structural repairs and strengthening",
      "Plastering, painting, and finishing upgrades",
    ],
  },
  {
    slug: "surface-finishes-precision-tiling",
    icon: "tiling",
    title: "Surface Finishes & Precision Tiling",
    description:
      "Laser-level installation of porcelain, ceramic, marble, and granite finishes for high-traffic and luxury spaces.",
    details: [
      "Ceramic, porcelain, and granite tiling",
      "Bathroom, kitchen, and external wall finishes",
      "Precise setting out with clean joint lines",
    ],
  },
  {
    slug: "reinforced-concrete-works",
    icon: "concrete",
    title: "Reinforced Concrete Works",
    description:
      "Precision formwork, steel reinforcement placement, and high-strength casting for columns, beams, and suspended slabs.",
    details: [
      "Foundations, bases, and ground beams",
      "Reinforced slabs, beams, and columns",
      "Formwork, casting, and curing control",
    ],
  },
  {
    slug: "project-management-supervision",
    icon: "management",
    title: "Project Management & Supervision",
    description:
      "Site supervision, material procurement tracking, BOQ cost auditing, and critical-path scheduling.",
    details: [
      "Cost control, scheduling, and progress monitoring",
      "Contractor and supplier coordination",
      "Site supervision and reporting",
    ],
  },
  {
    slug: "facility-maintenance",
    icon: "maintenance",
    title: "Facility Maintenance",
    description:
      "Routine structural inspections, waterproofing, and preventative repairs to preserve long-term asset value.",
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
