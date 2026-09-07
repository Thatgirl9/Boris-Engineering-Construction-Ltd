import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";

export function ServicesHero() {
  return (
    <section className="bg-linear-to-br from-[#0F1E3B] via-[#1B315B] to-[#28436A] text-on-primary">
      <Container className="py-16 sm:py-20">
        <Eyebrow divider={true}>Our Services</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Full-scope construction and engineering delivery
        </h1>
        <p className="mt-4 max-w-2xl text-base font-ibm leading-relaxed text-on-primary/80">
          Every service below is delivered under the same standard: proper planning, quality
          materials, skilled workmanship, and monitored safety.
        </p>
      </Container>
    </section>
  );
}
