import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { getServices } from "@/lib/content/services";
import { getCompanyInfo } from "@/lib/content/company";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Construction & Engineering Services",
  description:
    "Building construction, civil & structural engineering, renovation, tiling, concrete works, project management, and building maintenance — delivered across Nigeria.",
  path: "/services",
});

export default function ServicesPage() {
  const company = getCompanyInfo();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ])
          ),
        }}
      />
      <ServicesHero />
      <ServicesGrid services={getServices()} company={company} />
      
    </>
  );
}
