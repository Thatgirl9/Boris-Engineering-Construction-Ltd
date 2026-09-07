"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section background="muted" className="mb-20">
      <SectionHeading eyebrow="FAQ" heading="Frequently asked questions" align="center" />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border border-b border-border ">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-2 py-5 text-left"
              >
                <span className="text-base font-medium font-archivo text-primary-text">{faq.question}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-secondary-text transition-transform", open && "rotate-180")}
                  strokeWidth={1.75}
                />
              </button>
              {open ? (
                <p className="px-2 pb-5 font-ibm text-sm leading-relaxed text-secondary-text">{faq.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
