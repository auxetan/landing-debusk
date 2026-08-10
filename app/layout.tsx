import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { CustomCursor } from "./CustomCursor";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const socialImage = host ? `${protocol}://${host}/og-v2.png` : undefined;

  const title = "AixBusLive — Partez au bon moment !";
  const description =
    "Le bus en direct, enrichi par la communauté d’Aix-en-Provence.";

  return {
    title: "AixBusLive — Partez au bon moment !",
    description,
    applicationName: "AixBusLive",
    icons: {
      icon: "/icon-192.png",
      apple: "/icon-192.png",
    },
    openGraph: {
      title,
      description:
        "Le réseau, c’est vous. Suivez et enrichissez les informations de bus en direct.",
      locale: "fr_FR",
      type: "website",
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 1731,
              height: 909,
              alt: "AixBusLive — Partez au bon moment !",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Le bus en direct, enrichi par la communauté d’Aix.",
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f1eee6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
