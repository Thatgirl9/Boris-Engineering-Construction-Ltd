import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValueCard } from "@/components/cards/ValueCard";
import { ValueItem } from "@/lib/types";

export function CoreValuesSection({ values }: { values: ValueItem[] }) {
  return (
    <Section background="muted">
      <SectionHeading eyebrow="Core Values" heading="The standards we work by" />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <ValueCard key={v.title} item={v} />
        ))}
      </div>
    </Section>
  );
}
