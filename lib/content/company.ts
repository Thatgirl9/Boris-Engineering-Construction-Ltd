import { CompanyInfo, NavLink } from "@/lib/types";

// In a CMS-backed setup this would be `await client.fetch(COMPANY_QUERY)`.
// Kept sync + local for now so the site works with zero external deps.
export function getCompanyInfo(): CompanyInfo {
  return {
    name: "Boris Engineering & Construction Ltd",
    shortName: "Boris Engineering",
    tagline: "Building Excellence. Delivering Quality.",
    phone: "+234 902 641 3967",
    phoneHref: "tel:+2349026413967",
    whatsapp: "+234 813 516 9711",
    whatsappHref: "https://wa.me/2348135169711",
    email: "info@boriseng.com",
    address: "10 Peace Road, OPIC Estate, Agbara, Ogun State.",
    addressConfirmed: true,
    website: "boriseng.com",
    socials: [
      // { platform: "linkedin", href: "#" },
      { platform: "facebook", href: "https://www.facebook.com/share/1B1kepXCd2/" },
      { platform: "instagram", href: "https://www.instagram.com/boris_construction?utm_source=qr&stkn=cGcwNjhnZDJkOGpw" },
      { platform: "whatsapp", href: "https://wa.me/2348135169711" },
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
