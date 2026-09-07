import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { QuoteForm } from "@/components/sections/contact/QuoteForm";
import { ContactInfoCard } from "@/components/sections/contact/ContactInfoCard";
import { FAQSection } from "@/components/sections/contact/FAQSection";
import { Section } from "@/components/ui/Section";
import { getCompanyInfo } from "@/lib/content/company";
import { getFaqs } from "@/lib/content/faqs";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote / Contact Us",
  description:
    "Tell Boris Engineering & Construction Ltd about your project and receive a clear, transparent quotation. Call, WhatsApp, or fill out our quote request form.",
  path: "/contact",
});

export default function ContactPage() {
  const company = getCompanyInfo();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />
      <ContactHero />
      <Section background="default">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <QuoteForm />
          <ContactInfoCard company={company} />
        </div>
      </Section>
      <FAQSection faqs={getFaqs()} />
    </>
  );
}
