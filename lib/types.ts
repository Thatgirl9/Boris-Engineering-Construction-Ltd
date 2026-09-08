// Central content types. Any CMS (Sanity, Contentful, Payload, a headless
// database, etc.) just needs to resolve to these shapes. Nothing in the
// components imports a CMS SDK directly — everything goes through the
// functions in lib/content/*, which is the only layer you'd swap out.

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  addressConfirmed: boolean;
  website: string;
  socials: { platform: "linkedin" | "facebook" | "instagram" | "whatsapp"; href: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  details: string[];
};

export interface ValueItem {
  icon: IconName;
  title: string;
  description: string;
};

export interface ValueItemWithoutIcon {
  title: string;
  description: string;
}

export interface ProcessStepItem {
  step: number;
  title: string;
  description: string;
}

export interface TechFeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Renovation"
  | "Concrete & Civil";

export type ProjectStatus = "Completed" | "In Progress";

export interface ProjectItem {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  status: ProjectStatus;
  description: string;
  images: {
    before: string;
    during: string;
    after: string;
    cover: string;
  };
}

export interface TestimonialItem {
  quote: string;
  author?: string;
  role?: string;
  pending: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegalSection {
  heading: string;
  body: string[];
};

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

export type IconName =
  | "building"
  | "civil"
  | "renovation"
  | "tiling"
  | "concrete"
  | "management"
  | "maintenance"
  | "check"
  | "professional"
  | "message"
  | "clock"
  | "shield"
  | "link"
  | "user"
  | "target"
  | "eye"
  | "handshake"
  | "star"
  | "medal"
  | "bulb"
  | "quality"
  | "safety"
  | "report"
  | "compass"
  | "cloud"
  | "devices"
  | "heartHandshake"
  ;

