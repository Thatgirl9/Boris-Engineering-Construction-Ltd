import { LegalDocument } from "@/lib/types";

// ---------------------------------------------------------------------
// IMPORTANT: this is a starting draft, not legal advice. It's written to
// accurately describe what THIS codebase actually does (what data the
// quote form collects, where it's stored, who processes it) as of the
// date below, referencing Nigeria's Data Protection Act (NDPA) 2023 and
// the Nigeria Data Protection Commission (NDPC). Have a Nigerian lawyer
// review this — and update both the content and the "Last updated" date
// here — before relying on it, and again any time the site's data
// practices change (e.g. adding analytics, ads, a newsletter, etc.).
// ---------------------------------------------------------------------

const LAST_UPDATED = "7 September 2026";

export function getPrivacyPolicy(): LegalDocument {
  return {
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED,
    intro: [
      "Boris Engineering & Construction Ltd (\"Boris Engineering\", \"we\", \"us\") respects your privacy. This policy explains what personal information we collect through this website, why we collect it, how it's stored, and what rights you have over it.",
      "This policy applies to borisengineering.com and covers information collected through our Request a Quote form. We do not currently use cookies, analytics, or advertising trackers on this site — if that changes, this policy will be updated first.",
    ],
    sections: [
      {
        heading: "1. Information we collect",
        body: [
          "When you submit the Request a Quote form, we collect: your full name, phone number, email address, project location, project type, estimated budget, preferred start date, project description, and any files you choose to attach (drawings, site photos, or a bill of quantities).",
          "We also automatically record the date and time of your submission and the IP address the request came from, which helps us detect spam and abuse.",
        ],
      },
      {
        heading: "2. How we use your information",
        body: [
          "We use the information you submit solely to respond to your quote request: to understand your project, contact you, prepare and send a quotation, and, if you engage us, to deliver the agreed work.",
          "We do not sell, rent, or share your information with third parties for their own marketing purposes.",
        ],
      },
      {
        heading: "3. Who processes your information",
        body: [
          "Your submission is stored in a database provided by Supabase, and file attachments are stored in Supabase Storage. Email notifications about new quote requests are sent using Resend. Both providers act as data processors on our behalf and only process your information to the extent needed to provide these services to us.",
        ],
      },
      {
        heading: "4. How long we keep your information",
        body: [
          "We retain quote request records for as long as reasonably necessary to respond to your enquiry and, where a project proceeds, for the duration of our business relationship and any period required by Nigerian law afterward (for example, tax or contractual record-keeping requirements). You can request earlier deletion — see \"Your rights\" below.",
        ],
      },
      {
        heading: "5. Your rights",
        body: [
          "Under the Nigeria Data Protection Act 2023, you have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion of your information, subject to any legal obligation we have to keep it; object to or request restriction of certain processing; and lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your information has been mishandled.",
          "To exercise any of these rights, contact us using the details on our Contact page.",
        ],
      },
      {
        heading: "6. Security",
        body: [
          "We take reasonable technical measures to protect your information, including restricting database and file storage access to authorized systems only. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "7. Changes to this policy",
        body: [
          "We may update this policy from time to time, for example if we start using new tools or services. The \"Last updated\" date at the top of this page will reflect the most recent version.",
        ],
      },
      {
        heading: "8. Contact us",
        body: [
          "If you have questions about this policy or how your information is handled, please reach out using the contact details on our Contact page.",
        ],
      },
    ],
  };
}

export function getTermsAndConditions(): LegalDocument {
  return {
    title: "Terms & Conditions",
    lastUpdated: LAST_UPDATED,
    intro: [
      "These terms govern your use of the Boris Engineering & Construction Ltd website (borisengineering.com) and your submission of a Request a Quote form. By using this site or submitting a request, you agree to these terms.",
    ],
    sections: [
      {
        heading: "1. About this website",
        body: [
          "This website provides information about Boris Engineering & Construction Ltd's services and allows visitors to request a quotation for construction and engineering projects. Content on this site — including text, images, and our logo — is provided for general information purposes and, except where stated otherwise, belongs to Boris Engineering & Construction Ltd.",
        ],
      },
      {
        heading: "2. Requesting a quote",
        body: [
          "Submitting the Request a Quote form is an enquiry, not a binding order or contract. Any quotation we provide in response is an estimate based on the information and any files you supply, and remains subject to a site inspection, formal written agreement, and confirmation of final scope before any work begins.",
          "Prices, timelines, and availability discussed before a formal written contract is signed are indicative only and may change.",
        ],
      },
      {
        heading: "3. Accuracy of information",
        body: [
          "We aim to keep the information on this site accurate and up to date, but we do not guarantee that all content is complete, current, or error-free. If you notice something incorrect, please let us know.",
        ],
      },
      {
        heading: "4. Acceptable use",
        body: [
          "You agree not to use this website or the quote request form to submit false information, attempt to access data that isn't yours, upload malicious files, or otherwise misuse the site or attempt to disrupt its normal operation.",
        ],
      },
      {
        heading: "5. Limitation of liability",
        body: [
          "To the extent permitted by Nigerian law, Boris Engineering & Construction Ltd is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits any liability that cannot legally be limited or excluded.",
        ],
      },
      {
        heading: "6. Governing law",
        body: [
          "These terms are governed by the laws of the Federal Republic of Nigeria, and any dispute arising from them will be subject to the jurisdiction of the Nigerian courts.",
        ],
      },
      {
        heading: "7. Changes to these terms",
        body: [
          "We may revise these terms from time to time. The \"Last updated\" date above reflects the most recent version. Continued use of the site after changes are posted means you accept the revised terms.",
        ],
      },
      {
        heading: "8. Contact us",
        body: [
          "Questions about these terms can be directed to us using the contact details on our Contact page.",
        ],
      },
    ],
  };
};