import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";

export function ProjectsHero() {
  return (
    <section className="bg-linear-to-br from-[#0F1E3B] via-[#1B315B] to-[#28436A] text-on-primary">
      <Container className="py-16 sm:py-20">
        <Eyebrow divider={true}>Portfolio</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-archivo text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[3rem]">
          Projects we have delivered
        </h1>
      </Container>
    </section>
  );
}
