import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { StatCard } from "@/components/cards/StatCard";
import { StatItem } from "@/lib/types";

export function AboutPreviewSection({
  eyebrow,
  heading,
  paragraph,
  stats,
}: {
  eyebrow: string;
  heading: string;
  paragraph: string;
  stats: StatItem[];
}) {
  return (
    <Section background="default">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold font-archivo leading-tight tracking-tight text-primary-text sm:text-[2.25rem]">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl font-ibm text-base leading-relaxed text-secondary-text">{paragraph}</p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium font-ibm text-on-primary hover:bg-primary/90 h-10 "
          >
            Read More About Us
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
