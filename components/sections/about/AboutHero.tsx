import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";

export function AboutHero({ heading }: { heading: string }) {
  return (
    <section className="bg-linear-to-br from-[#0F1E3B] via-[#1B315B] to-[#28436A] text-on-primary">
      <Container className="py-16 sm:py-20">
        <Eyebrow divider={true}>About Us</Eyebrow>
        <h1 className="mt-3 max-w-4xl font-archivo text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[48px]">
          {heading}
        </h1>
      </Container>
    </section>
  );
}
