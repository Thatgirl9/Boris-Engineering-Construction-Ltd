import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { TechFeatureItem } from "@/lib/types";

export function TechSection({ features }: { features: TechFeatureItem[] }) {
  return (
    <Section background="muted">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-12">
        <Eyebrow>Technology-Driven Construction</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-archivo font-bold leading-tight tracking-tight text-primary-text sm:text-[2.25rem]">
          Direct Site Oversight From Anywhere
        </h2>
        <p className="mt-4 max-w-2xl font-ibm text-base leading-relaxed text-secondary-text">
          You do not need to be on-site every week to protect your capital. We eliminate guesswork for local and diaspora property owners through cloud-based cost auditing, verified material manifests, and high-definition video walkthroughs sent at every milestone.
          
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
