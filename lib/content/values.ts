import { ValueItem } from "@/lib/types";

export function getCoreValues(): ValueItem[] {
  return [
    {
      icon: "handshake",
      title: "Integrity",
      description: "We do business honestly and responsibly.",
    },
    {
      icon: "star",
      title: "Excellence",
      description: "We strive for high standards in everything we do.",
    },
    {
      icon: "medal",
      title: "Professionalism",
      description: "We approach every project with discipline and expertise.",
    },
    {
      icon: "bulb",
      title: "Innovation",
      description: "We embrace better and smarter ways of working.",
    },
    {
      icon: "quality",
      title: "Quality",
      description: "We are committed to durable and reliable work.",
    },
    {
      icon: "safety",
      title: "Safety",
      description:
        "We prioritize the safety of our workers, clients, and the public.",
    },
    {
      icon: "report",
      title: "Accountability",
      description: "We take responsibility for our work and commitments.",
    },
    {
      icon: "user",
      title: "Customer Satisfaction",
      description: "Our clients remain at the center of every project.",
    },
  ];
}

export function getHowWeWorkValues(): ValueItem[] {
  return [
    {
      icon: "handshake",
      title: "Executive Direction & Project Oversight",
      description:
        "Managed directly by leadership to ensure projects are delivered on schedule, within budget, and strictly according to contract specifications.",
    },
    {
      icon: "handshake",
      title: "Consultant & Engineering Network:",
      description:
        "We collaborate with COREN-registered structural engineers, architects, and quantity surveyors on a project-by-project basis to handle structural calculations, soil testing, and design certifications.",
    },
    {
      icon: "professional",
      title: "Site Execution & Supervision",
      description:
        "Experienced site supervisors, foremen, and skilled artisans manage daily field execution to ensure reinforcement, concrete casting, and finishing meet rigorous structural standards.",
    },
    {
      icon: "bulb",
      title: "Core Philosophy",
      description:
        "Plan carefully, collaborate with qualified professionals, build correctly, and deliver responsibly.",
    },
  ];
}

export function getMissionVision() {
  return {
    mission:
      "To deliver exceptional engineering and construction services through quality workmanship, innovation, professionalism, safety, and a commitment to customer satisfaction.",
    vision:
      "To become one of Nigeria's leading engineering, construction, and real estate companies, recognized for excellence, innovation, integrity, and the ability to deliver lasting value to clients and communities.",
  };
}

export function getAboutOverview() {
  return {
    eyebrow: "Company Overview",
    heading: "Who we are",
    paragraphs: [
      "Boris Engineering & Construction Ltd is a legally registered Nigerian construction and engineering company (RC: 9527991), dedicated to providing reliable, professional, and compliant construction solutions. We believe that successful construction goes beyond putting up structures. It requires proper planning, quality materials, skilled workmanship, effective project management, uncompromising commitment to site safety, and clear communication with clients.",
      "Our goal is to deliver projects that meet high standards of quality, durability, structural integrity, and professionalism. We build lasting relationships with our clients through transparency, accountability, effective communication, and engineering excellence.",
      "Our services and capabilities continue to grow across civil engineering, building construction, property development, and real estate. As the company grows, we aim to expand our capabilities across construction, engineering, property development, and real estate while embracing modern technology to improve the way construction projects are planned and delivered.",
      "At Boris Engineering & Construction Ltd, we are committed to building not just structures, but lasting value, trusted relationships, and infrastructure that stands the test of time.",
    ],
  };
}

export function getHomeAboutPreview() {
  return {
    eyebrow: "About Us",
    heading: "Construction built on planning, quality, and clear communication",
    paragraph:
      "We believe successful construction goes beyond putting up structures. It requires proper planning, quality materials, skilled workmanship, effective project management, safety, and clear communication with clients on every project we take on.",
  };
}
