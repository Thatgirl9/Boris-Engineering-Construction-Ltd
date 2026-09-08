import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { organizationJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}`,
    template: `${SITE_NAME}`,
  },
  description:
    "Boris Engineering & Construction Ltd is a Nigerian engineering and construction company delivering quality, durable, and innovative building, civil, and renovation solutions.",
  keywords: [
    "construction company Nigeria",
    "engineering company Lagos",
    "building construction Lagos",
    "civil engineering Nigeria",
    "renovation contractor Lagos",
  ],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico"},
};

// This is the true App Router root: html/body, fonts, and site-wide
// JSON-LD only. The Navbar/Footer/WhatsApp chrome lives one level down in
// app/(site)/layout.tsx, so /studio (the Sanity Studio) can render
// full-screen without the public site's header and footer around it.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
