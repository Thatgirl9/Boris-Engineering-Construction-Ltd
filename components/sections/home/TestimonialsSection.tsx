import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TestimonialItem } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <Section background="muted">
      <SectionHeading
        eyebrow="Client Testimonials"
        heading="Feedback from our clients"
        description="This space is reserved for genuine client testimonials, published as projects are completed and handed over."
      />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} item={t} />
        ))}
      </div>
    </Section>
  );
}
