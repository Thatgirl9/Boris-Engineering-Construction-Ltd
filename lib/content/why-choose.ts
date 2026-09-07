import { ValueItem } from "@/lib/types";

export function getWhyChooseItems(): ValueItem[] {
  return [
    {
      icon: "quality",
      title: "Quality Workmanship",
      description: "Committed to delivering durable and properly executed construction work.",
    },
    {
      icon: "civil",
      title: "Professional Approach",
      description: "Professionalism in communication, planning, supervision, and execution.",
    },
    {
      icon: "message",
      title: "Transparent Communication",
      description: "Keeping clients informed with clear information on requirements and costs.",
    },
    {
      icon: "clock",
      title: "Timely Delivery",
      description: "Careful planning to complete projects within agreed timelines.",
    },
    {
      icon: "shield",
      title: "Safety First",
      description: "Safety remains an essential part of our operations.",
    },
    {
      icon: "link",
      title: "Competitive Pricing",
      description: "Providing quality solutions at competitive and realistic prices.",
    },
    {
      icon: "heartHandshake",
      title: "Customer-Focused Service",
      description: "Listening to clients to ensure project requirements are fully understood.",
    },
  ];
}
