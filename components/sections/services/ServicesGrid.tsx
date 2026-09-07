import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceItem, CompanyInfo } from "@/lib/types";
import { CTABanner } from "@/components/sections/shared/CTABanner";

export function ServicesGrid({ services, company }: { services: ServiceItem[]; company: CompanyInfo }) {
  return (
    <Section background="default">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} showDetails />
        ))}
      </div>
      <CTABanner company={company} />
    </Section>
  );
}
