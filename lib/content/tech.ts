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
      title: "Digital cost breakdowns",
      description:
        "Clear, itemized estimates you can review before work begins.",
    },
    {
      icon: "cloud",
      title: "Photo & video site logs",
      description:
        "Regular visual updates from site, sent directly to you.",
    },
    {
      icon: "devices",
      title: "Digital plan reviews",
      description:
        "Drawings and revisions reviewed and shared online.",
    },
  ];
}
