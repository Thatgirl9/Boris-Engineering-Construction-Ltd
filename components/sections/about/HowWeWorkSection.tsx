import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValueCardWithoutIcon } from "@/components/cards/ValueCard";
import { ValueItem } from "@/lib/types";

export function HowWeWorkSection({ values }: { values: ValueItem[] }) {
  return (
    <Section background="default">
      <SectionHeading eyebrow="Our Operational Framework" heading="How We Work &amp; Execute" />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <ValueCardWithoutIcon key={v.title} item={v} />
        ))}
      </div>
    </Section>
  );
}