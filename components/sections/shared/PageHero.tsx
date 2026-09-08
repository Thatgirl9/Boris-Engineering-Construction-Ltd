import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string;
  heading: string;
  description?: string;
}) {
  return (
    <section className="bg-linear-to-br from-[#0F1E3B] via-[#1B315B] to-[#28436A] text-on-primary">
      <Container className="py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-archivo text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {heading}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base font-ibm leading-relaxed text-on-primary/80">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
};