import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function CompanyOverview({
  eyebrow,
  heading,
  paragraphs,
  mission,
  vision,
}: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  mission: string;
  vision: string;
}) {
  return (
    <Section background="default">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-text sm:text-[2.25rem]">
            {heading}
          </h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed font-ibm text-secondary-text">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border-l-4 border-secondary bg-card p-6 shadow-lg">
            <div className="flex items-center gap-2 text-primary-text">
              <Icon name="target" className="h-5 w-5 text-secondary" />
              <h3 className="text-base font-bold">Our Mission</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">{mission}</p>
          </div>
          <div className="rounded-xl border-l-4 border-primary bg-card p-6 shadow-lg">
            <div className="flex items-center gap-2">
              <Icon name="eye" className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold">Our Vision</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">{vision}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
