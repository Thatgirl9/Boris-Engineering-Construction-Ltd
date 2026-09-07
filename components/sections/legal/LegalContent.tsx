import { AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { LegalDocument } from "@/lib/types";

export function LegalContent({ document, showDraftNotice = true }: { document: LegalDocument; showDraftNotice?: boolean }) {
  return (
    <Section background="default">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-secondary-text">Last updated: {document.lastUpdated}</p>

        {showDraftNotice ? (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" strokeWidth={1.75} />
            <p className="text-sm leading-relaxed text-secondary-text">
              This page is a starting draft and hasn&apos;t yet been reviewed by a lawyer. Please
              have it reviewed before relying on it as your final policy.
            </p>
          </div>
        ) : null}

        <div className="mt-8 space-y-4">
          {document.intro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-secondary-text">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-primary-text">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-secondary-text">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};