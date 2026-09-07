import { ProcessStepItem } from "@/lib/types";

export function getProcessSteps(): ProcessStepItem[] {
  return [
    { step: 1, title: "Consultation", description: "Discussing client requirements, ideas, and project objectives." },
    { step: 2, title: "Site Inspection", description: "Visiting the site to evaluate conditions and requirements." },
    { step: 3, title: "Assessment & Quotation", description: "Assessing the scope of work and preparing a transparent quotation." },
    { step: 4, title: "Planning", description: "Developing a practical approach for executing the project." },
    { step: 5, title: "Construction", description: "Carrying out the work according to the agreed scope." },
    { step: 6, title: "Quality & Safety Checks", description: "Monitoring workmanship, materials, and safety throughout." },
    { step: 7, title: "Project Completion & Handover", description: "Final review and official handover to the client." },
  ];
}
