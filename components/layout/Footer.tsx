import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CompanyInfo, NavLink } from "@/lib/types";
import IconWithoutLtd from "@/public/images/logo/Logo without Ltd.png";


export function Footer({ links, company }: { links: NavLink[]; company: CompanyInfo }) {
  return (
    <footer className="bg-primary text-on-primary">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src={IconWithoutLtd} alt="Boris Engineering logo" className="h-12 w-12" />
            <h3 className="text-lg font-archivo font-bold tracking-[0.5]">{company.name.toUpperCase()}</h3>
          </div>

          <p className="mt-2 text-sm font-regular text-secondary font-ibm">{company.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed font-ibm font-regular text-on-primary/70">
            A Nigerian engineering and construction company delivering quality, durable, and
            innovative construction solutions across residential, commercial, and civil projects.
          </p>
          <div className="mt-6 flex gap-3">
            {company.socials.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                aria-label={s.platform}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-on-primary/80 transition-colors hover:border-secondary hover:text-secondary"
              >
                <SocialIcon platform={s.platform} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold font-archivo uppercase tracking-[2.4] text-secondary">Quick Links</h4>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-regular font-ibm text-on-primary/75 hover:text-on-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold font-archivo uppercase tracking-[2.4] text-secondary">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-on-primary/75 font-ibm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
              <span>{company.address}</span>
            </li>
          </ul>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:bg-accent/90 w-65 justify-center"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Chat on WhatsApp
          </a>
        </div>
      </Container>

      <div className="border-t border-on-primary/15 py-5">
        <Container>
          <p className="text-center text-xs font-ibm text-on-primary/60">
            &copy; {new Date().getFullYear()} {company.name}. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
