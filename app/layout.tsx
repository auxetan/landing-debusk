import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { CustomCursor } from "./CustomCursor";
import { SiteAnalytics } from "./SiteAnalytics";
import { SITE_NAME, SITE_URL } from "./seo";
import { StructuredData } from "./StructuredData";
import { WebVitals } from "./WebVitals";
import "./globals.css";

const title = "Débusk, l’app bus d’Aix — Partez au bon moment !";
const description =
  "Débusk est l’application bus indépendante d’Aix-en-Provence pour consulter horaires, itinéraires, lignes, perturbations et suivi communautaire.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: SITE_NAME,
  authors: [{ name: "Débusk", url: SITE_URL }],
  creator: "Débusk",
  publisher: "Débusk",
  category: "transport",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Débusk, l’application bus d’Aix-en-Provence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f1eee6",
  colorScheme: "light",
};

const websiteStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "/#website",
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "Débusk — bus à Aix-en-Provence",
    description,
    inLanguage: "fr-FR",
    publisher: { "@id": SITE_URL + "/#organization" },
    about: { "@id": SITE_URL + "/#application" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: SITE_NAME,
    alternateName: "Debusk",
    url: SITE_URL,
    description:
      "Éditeur du site et de l’application mobile indépendante Débusk, conçue pour les déplacements en bus à Aix-en-Provence.",
    logo: {
      "@type": "ImageObject",
      url: SITE_URL + "/icon-192.png",
      width: 192,
      height: 192,
    },
    email: "info@debusk.fr",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Aix-en-Provence et Pays d’Aix",
    },
    knowsAbout: [
      "Horaires de bus à Aix-en-Provence",
      "Itinéraires de bus à Aix-en-Provence",
      "Lignes scolaires du Pays d’Aix",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <StructuredData data={websiteStructuredData} />
        {children}
        <Suspense fallback={null}>
          <SiteAnalytics />
        </Suspense>
        <WebVitals />
        <CustomCursor />
      </body>
    </html>
  );
}
