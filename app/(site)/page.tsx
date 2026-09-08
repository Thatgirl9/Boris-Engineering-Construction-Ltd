import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreviewSection } from "@/components/sections/home/AboutPreviewSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { WhyChooseSection } from "@/components/sections/home/WhyChooseSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TechSection } from "@/components/sections/home/TechSection";
import { ProjectsPreviewSection } from "@/components/sections/home/ProjectsPreviewSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { getCompanyInfo, getHomeStats } from "@/lib/content/company";
import { getHomeAboutPreview } from "@/lib/content/values";
import { getServices } from "@/lib/content/services";
import { getWhyChooseItems } from "@/lib/content/why-choose";
import { getProcessSteps } from "@/lib/content/process";
import { getTechFeaturesForHome } from "@/lib/content/tech";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getTestimonials } from "@/lib/content/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Boris Engineering & Construction Company",
  description:
    "Boris Engineering & Construction Ltd delivers residential, commercial, and civil engineering projects across Nigeria, providing building construction and project management.",
  path: "/",
});

export default async function Home() {
  const company = getCompanyInfo();
  const aboutPreview = getHomeAboutPreview();
  const featuredProjects = await getFeaturedProjects(4);

  return (
    <>
      <HeroSection company={company} />
      <AboutPreviewSection
        eyebrow={aboutPreview.eyebrow}
        heading={aboutPreview.heading}
        paragraph={aboutPreview.paragraph}
        stats={getHomeStats()}
      />
      <ServicesSection services={getServices()} />
      <WhyChooseSection items={getWhyChooseItems()} />
      <ProcessSection steps={getProcessSteps()} />
      <TechSection features={getTechFeaturesForHome()} />
      <ProjectsPreviewSection projects={featuredProjects} />
      <TestimonialsSection testimonials={getTestimonials()} company={company} />
    </>
  );
}
