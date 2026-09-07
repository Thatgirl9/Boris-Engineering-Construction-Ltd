import { MessageCircle, Phone, Mail, MapPin, Globe } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CompanyInfo } from "@/lib/types";

export function ContactInfoCard({ company }: { company: CompanyInfo }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold font-archivo text-primary-text">Direct Contact</h2>
        <ul className="mt-5 space-y-4 text-sm text-secondary-text">
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <a href={company.phoneHref} className="font-sm font-ibm">{company.phone}</a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <a href={`mailto:${company.email}`} className="font-sm font-ibm">
              {company.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MessageCircle className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-sm font-ibm">
              WhatsApp: {company.whatsapp}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <span>{company.address}</span>
          </li>
          <li className="flex items-center gap-3">
            <Globe className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <span className="font-sm font-ibm">{company.website}</span>
          </li>
        </ul>

        <div className="mt-6 flex gap-3 border-t border-border pt-6">
          {company.socials.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              aria-label={s.platform}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-secondary-text transition-colors hover:border-secondary hover:text-primary"
            >
              <SocialIcon platform={s.platform} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <a
        href={company.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-4 text-sm font-semibold text-on-accent hover:bg-accent/90"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        Chat on WhatsApp
      </a>
    </div>
  );
}
