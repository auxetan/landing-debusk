import type { Metadata } from "next";

export const SITE_URL = "https://www.debusk.fr";
export const SITE_NAME = "Débusk";
export const UPDATED_AT = "2026-08-16";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "article",
}: PageMetadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical },
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
      url: canonical,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type,
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
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
