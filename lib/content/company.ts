import { CompanyInfo, NavLink } from "@/lib/types";

// In a CMS-backed setup this would be `await client.fetch(COMPANY_QUERY)`.
// Kept sync + local for now so the site works with zero external deps.
export function getCompanyInfo(): CompanyInfo {
  return {
    name: "Boris Engineering & Construction Ltd",
    shortName: "Boris Engineering",
    tagline: "Building Excellence. Delivering Quality.",
    phone: "+234 000 000 0000",
    phoneHref: "tel:+2340000000000",
    whatsapp: "+234 000 000 0000",
    whatsappHref: "https://wa.me/2340000000000",
    email: "info@boriseng.com",
    address: "Lagos, Nigeria (full office address to be confirmed)",
    addressConfirmed: false,
    website: "boriseng.com",
    socials: [
      { platform: "linkedin", href: "#" },
      { platform: "facebook", href: "#" },
      { platform: "instagram", href: "#" },
      { platform: "whatsapp", href: "https://wa.me/2340000000000" },
    ],
  };
}

export function getNavLinks(): NavLink[] {
  return [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];
}

export function getHomeStats(): { value: string; label: string }[] {
  return [
    { value: "8+", label: "Core service areas" },
    { value: "7", label: "Step delivery process" },
    { value: "100%", label: "Safety-monitored sites" },
    { value: "24/7", label: "Client communication" },
  ];
}
