import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { getTermsAndConditions } from "@/lib/content/legal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the Boris Engineering & Construction Ltd website and quote request form.",
  path: "/terms-condition",
});

export default function TermsConditionsPage() {
  const document = getTermsAndConditions();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Terms & Conditions", path: "/terms-condition" },
            ])
          ),
        }}
      />
      <PageHero eyebrow="Legal" heading="Terms & Conditions" />
      <LegalContent document={document} />
    </>
  );
};