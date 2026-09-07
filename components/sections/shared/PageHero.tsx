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
    <section className="bg-gradient-to-br from-primary to-[#0C182A] text-on-primary">
      <Container className="py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {heading}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-primary/80">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
};