import { FaqItem } from "@/lib/types";

export function getFaqs(): FaqItem[] {
  return [
    {
      question: "What is your payment structure?​",
      answer:
        "We use a milestone based payment structure tied to clear project stages (foundation, structural works, finishing) rather than a full upfront lump sum."​
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Timelines depend on project size and scope. We provide a realistic, documented schedule during your initial consultation.​",
    },
    {
      question: "How do you ensure material quality on site?​",
      answer:
        "We source materials strictly from vetted suppliers and enforce structural checks including rebar specifications and concrete mix ratios to ensure maximum safety and durability.​",
    },
    {
      question: "Do you help with building permits and approvals?​",
      answer:
        "Yes, we guide clients through local planning authority permits and ensure full regulatory compliance for your project.",
    },
   
  ];
}
