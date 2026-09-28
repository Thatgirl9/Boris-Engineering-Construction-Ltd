import { ValueItem } from "@/lib/types";

export function getWhyChooseItems(): ValueItem[] {
  return [
    {
      icon: "quality",
      title: "​Verified Materials",
      description: "Steel rebar sizes and concrete mix ratios are tested before casting to prevent structural compromise.",
    },
    {
      icon: "civil",
      title: "Milestone Accounting",
      description: "Detailed Bills of Quantities (BOQ) with clear stage billings—zero unverified cost variations.",
    },
    {
      icon: "message",
      title: "Strict Site Safety",
      description: "Active HSE protocols protecting workers, surrounding properties, and project assets.",
    },
    {
      icon: "clock",
      title: "On-Schedule Delivery",
      description: "Critical-path planning to ensure handovers occur within agreed project timelines.",
    },
    {
      icon: "shield",
      title: "Code Compliance",
      description: "All engineering calculations and site operations strictly align with Nigerian building codes.",
    },
    {
      icon: "link",
      title: "Value-Engineered Rates",
      description: "Practical material procurement and accurate quantity surveying to optimize project cost.",
    },
    {
      icon: "heartHandshake",
      title: "Client-First Reporting",
      description: "Scheduled video walkthroughs and material delivery logs sent directly to your phone.",
    },
  ];
}
