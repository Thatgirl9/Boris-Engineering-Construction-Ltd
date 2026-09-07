import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { TechFeatureItem } from "@/lib/types";

export function TechSection({ features }: { features: TechFeatureItem[] }) {
  return (
    <Section background="muted">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-12">
        <Eyebrow>Technology-Driven Construction</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-archivo font-bold leading-tight tracking-tight text-primary-text sm:text-[2.25rem]">
          Modern, Digital Project Tracking
        </h2>
        <p className="mt-4 max-w-2xl font-ibm text-base leading-relaxed text-secondary-text">
          At Boris Engineering &amp; Construction Ltd, we use modern digital communication and
          documentation tools to make construction transparent and organized. We provide our
          clients with detailed digital cost breakdowns, regular photo and video site updates,
          and clear project tracking so you always know the exact status of your project.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="border-l-2 border-secondary pl-4 bg-bg-sec/50 py-2">
              <h3 className="mt-3 text-sm font-archivo font-semibold text-primary-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed font-ibm text-secondary-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
