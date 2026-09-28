import Image from "next/image";
import { Quote, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectTestimonial } from "@/lib/types";

export function ProjectTestimonials({ testimonials }: { testimonials: ProjectTestimonial[] }) {
  return (
    <Section background="muted">
      <SectionHeading eyebrow="Client Feedback" heading="What the client said" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <Quote className="h-6 w-6 text-secondary" strokeWidth={1.75} />
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">{t.quote}</p>
            {t.authorName || t.authorRole ? (
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-sec text-secondary-text">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.authorName ?? "Client"} fill className="object-cover" />
                  ) : (
                    <User className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </span>
                <span className="text-sm">
                  {t.authorName ? (
                    <span className="font-medium text-primary-text">{t.authorName}</span>
                  ) : null}
                  {t.authorName && t.authorRole ? <span className="text-secondary-text"> — </span> : null}
                  {t.authorRole ? <span className="text-secondary-text">{t.authorRole}</span> : null}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
};