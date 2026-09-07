import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { getPrivacyPolicy } from "@/lib/content/legal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Boris Engineering & Construction Ltd collects, uses, and protects the personal information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const document = getPrivacyPolicy();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy-policy" },
            ])
          ),
        }}
      />
      <PageHero eyebrow="Legal" heading="Privacy Policy" />
      <LegalContent document={document} />
    </>
  );
}