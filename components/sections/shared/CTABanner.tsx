import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CompanyInfo } from "@/lib/types";

export function CTABanner({
  company,
  heading = "Need a service not listed here?",
  description = "Tell us about your project and we will advise on the right scope and approach.",
  about,
}: {
  company: CompanyInfo;
  heading?: string;
  description?: string;
  about?: boolean;
}) {
  return (
    <section className={`flex items-center justify-center rounded-lg ${about ? "bg-card text-secondary-text border border-border sm:h-21.25 " : "bg-primary text-on-primary mt-10 sm:h-29.5"}`}>
      <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          {about ? <Sparkles className="mt-1 h-5 w-5 shrink-0 text-secondary" strokeWidth={1.75} /> : null}
         
          <div>
            <h2 className="text-lg font-semibold font-archivo">{heading}</h2>
            <p className={`mt-1 text-sm font-ibm ${about ? "text-secondary-text" : "text-on-primary/70"}`}>{description}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary hover:bg-secondary/90 h-10 font-ibm"
          >
            Request a Quote
            {about ? null : <ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
          </a>
          {
            !about ? (
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Chat on WhatsApp
              </a>
            ) : null
          }

        </div>
      </Container>
    </section>
  );
}
