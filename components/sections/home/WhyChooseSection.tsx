import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InlineFeature } from "@/components/cards/ValueCard";
import { ValueItem } from "@/lib/types";

export function WhyChooseSection({ items }: { items: ValueItem[] }) {
  return (
    <Section background="default">
      <SectionHeading eyebrow="Why Choose Boris?" heading="What clients get on every project" />
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <InlineFeature key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}
