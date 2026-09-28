import { TechFeatureItem } from "@/lib/types";

export function getTechFeatures(): TechFeatureItem[] {
  return [
    {
      icon: "compass",
      title: "Digital planning & estimating",
      description:
        "Drawings, scope, and quantities are reviewed digitally and turned into itemized cost breakdowns you can check line by line before work starts.",
    },
    {
      icon: "cloud",
      title: "Cloud documentation",
      description:
        "Contracts, approvals, variation notes, material records, and site reports are stored and shared in the cloud, so nothing is lost between stages.",
    },
    {
      icon: "devices",
      title: "Remote project updates",
      description:
        "Regular photo and video site logs, progress schedules, and milestone reports are sent to clients directly, including clients abroad.",
    },
  ];
}

export function getTechFeaturesForHome(): TechFeatureItem[] {
   return [
    {
      icon: "compass",
      title: "​Itemized BOQ Auditing",
      description:
        "Transparent material and labor cost tracking before work begins.",
    },
    {
      icon: "cloud",
      title: "Photo & Video Logs",
      description:
        "High-definition progress footage delivered directly to your WhatsApp or portal.",
    },
    {
      icon: "devices",
      title: "Digital Drawing Coordination",
      description:
        "Real-time review and coordination of structural and architectural revisions.",
    },
  ];
}
