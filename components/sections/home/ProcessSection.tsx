import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStepCard } from "@/components/cards/ProcessStepCard";
import { ProcessStepItem } from "@/lib/types";

export function ProcessSection({ steps }: { steps: ProcessStepItem[] }) {
  return (
    <Section className="bg-linear-to-r from-[#0F1E3B] via-[#1B315B] to-[#28436A]">
      <SectionHeading
        eyebrow="Our Process"
        heading="Seven steps from first call to handover"
        tone="dark"
      />
      <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-lg bg-on-primary/15">
        {steps.map((step, index) => (
          <li key={index}>
            <ProcessStepCard step={step} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
