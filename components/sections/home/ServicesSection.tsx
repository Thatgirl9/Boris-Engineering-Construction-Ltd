import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceItem } from "@/lib/types";

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <Section background="muted">
      <SectionHeading
        eyebrow="Our Services"
        heading="Core construction and engineering services"
        description="From foundations to finishing, we handle the full delivery of your project."
      />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <Link
        href="/services"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border shadow-md bg-background px-5 py-3 text-sm font-medium text-primary-text hover:bg-secondary h-10 font-ibm "
      >
        View All Services
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </Link>
    </Section>
  );
}
