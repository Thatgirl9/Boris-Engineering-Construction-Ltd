import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { TechFeatureItem } from "@/lib/types";
import { CTABanner } from "@/components/sections/shared/CTABanner";
import { CompanyInfo } from "@/lib/types";

export function TechSection({ features, company }: { features: TechFeatureItem[], company:CompanyInfo }) {
  return (
    <Section background="default">
      <div className="mb-10">
        <Eyebrow>Technology & Innovation</Eyebrow>
        <h2 className="mt-3 max-w-3xl text-3xl font-archivo font-bold leading-tight tracking-tight text-primary-text sm:text-[2.25rem]">
          Digital tools that keep your project visible
        </h2>
        <p className="mt-4 max-w-2xl font-ibm text-base leading-relaxed text-secondary-text">
          We use modern digital communication and documentation tools so construction stays transparent, organized, and easy to follow, wherever you are.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 rounded-lg bg-card">
              <Icon name={feature.icon} className="h-5 w-5 text-secondary" />
              <h3 className="mt-3 text-base font-archivo font-semibold text-primary-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed font-ibm text-secondary-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <CTABanner
        company={company}
        heading=""
        description="Ready to discuss your project with our team?"
        about={true}
      />
    </Section>
  );
}