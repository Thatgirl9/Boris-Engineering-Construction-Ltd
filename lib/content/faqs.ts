import { FaqItem } from "@/lib/types";

export function getFaqs(): FaqItem[] {
  return [
    {
      question: "What types of projects does Boris undertake?",
      answer:
        "We handle residential, commercial, and civil engineering projects, including new builds, renovations, concrete works, tiling, and full project management, from planning through handover.",
    },
    {
      question: "How can I request a quotation?",
      answer:
        "Fill out the Request a Quote form with your project details, or reach us directly by phone or WhatsApp. We will respond with a clear, itemized quotation based on your requirements.",
    },
    {
      question: "Do you handle renovation projects?",
      answer:
        "Yes. We carry out renovation, remodeling, and rehabilitation of existing residential and commercial buildings, including structural repairs and finishing upgrades.",
    },
    {
      question: "Do you provide site inspections?",
      answer:
        "Yes, site inspection is the second step in our delivery process. We visit the site to evaluate conditions and requirements before preparing an assessment and quotation.",
    },
    {
      question: "Do you work outside your main operating area?",
      answer:
        "We are based in Lagos but take on projects across Nigeria depending on scope. Let us know your project location when requesting a quote and we will confirm feasibility.",
    },
  ];
}
