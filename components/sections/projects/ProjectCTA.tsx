import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ProjectCTA() {
  return (
    <section className="bg-primary text-on-primary">
      <Container className="flex flex-col items-center gap-5 py-14 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Have a project like this?</h2>
        <p className="max-w-xl text-sm leading-relaxed text-on-primary/75">
          Tell us about your project and we&apos;ll put together a clear, transparent quotation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary hover:bg-secondary/90"
        >
          Have a Project Like This?
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </Container>
    </section>
  );
};
