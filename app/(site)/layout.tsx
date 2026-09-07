import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getCompanyInfo, getNavLinks } from "@/lib/content/company";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const company = getCompanyInfo();
  const links = getNavLinks();

  return (
    <>
      <Navbar links={links} company={company} />
      <main className="flex-1">{children}</main>
      <Footer links={links} company={company} />
      <WhatsAppButton href={company.whatsappHref} />
    </>
  );
}
