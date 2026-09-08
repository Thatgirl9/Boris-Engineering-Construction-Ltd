import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { CompanyOverview } from "@/components/sections/about/CompanyOverview";
import { CoreValuesSection } from "@/components/sections/about/CoreValuesSection";
import { TechSection } from "@/components/sections/about/TechSection";
import { getAboutOverview, getHowWeWorkValues, getCoreValues, getMissionVision } from "@/lib/content/values";
import { getTechFeatures } from "@/lib/content/tech";
import { getCompanyInfo } from "@/lib/content/company";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { HowWeWorkSection } from "@/components/sections/about/HowWeWorkSection";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Boris Engineering & Construction Ltd — a Nigerian construction company built on integrity, excellence, professionalism, and quality workmanship.",
  path: "/about",
});

export default function AboutPage() {
  const overview = getAboutOverview();
  const { mission, vision } = getMissionVision();
  const company = getCompanyInfo();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ])
          ),
        }}
      />
      <AboutHero heading="Reliable, professional construction solutions" />
      <CompanyOverview
        eyebrow={overview.eyebrow}
        heading={overview.heading}
        paragraphs={overview.paragraphs}
        mission={mission}
        vision={vision}
      />
      <HowWeWorkSection values={getHowWeWorkValues()} />
      <CoreValuesSection values={getCoreValues()} />
      <TechSection features={getTechFeatures()} company={company} />
      {/* <CTABanner
        company={company}
        heading="Ready to discuss your project with our team?"
        description="Share your requirements and we'll respond with a clear, transparent quotation."
      /> */}
    </>
  );
}
