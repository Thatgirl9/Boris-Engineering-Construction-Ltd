import { ValueItem } from "@/lib/types";

export function getCoreValues(): ValueItem[] {
  return [
    { icon: "handshake", title: "Integrity", description: "We do business honestly and responsibly." },
    { icon: "star", title: "Excellence", description: "We strive for high standards in everything we do." },
    { icon: "medal", title: "Professionalism", description: "We approach every project with discipline and expertise." },
    { icon: "bulb", title: "Innovation", description: "We embrace better and smarter ways of working." },
    { icon: "quality", title: "Quality", description: "We are committed to durable and reliable work." },
    { icon: "safety", title: "Safety", description: "We prioritize the safety of our workers, clients, and the public." },
    { icon: "report", title: "Accountability", description: "We take responsibility for our work and commitments." },
    { icon: "user", title: "Customer Satisfaction", description: "Our clients remain at the center of every project." },
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
      "Boris Engineering & Construction Ltd is a Nigerian construction and engineering company dedicated to providing reliable and professional construction solutions. We believe that successful construction goes beyond putting up structures. It requires proper planning, quality materials, skilled workmanship, effective project management, safety, and clear communication with clients.",
      "Our goal is to deliver projects that meet high standards of quality while building long-term relationships with our clients through professionalism, transparency, accountability, and excellence. As the company grows, we aim to expand our capabilities across construction, engineering, property development, and real estate while embracing modern technology to improve the way construction projects are planned and delivered.",
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
