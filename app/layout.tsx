import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AixBusLive — Partez au bon moment",
  description:
    "Suivez votre bus à Aix-en-Provence en temps réel et partez au bon moment.",
  applicationName: "AixBusLive",
  openGraph: {
    title: "AixBusLive — Partez au bon moment",
    description:
      "Votre bus à Aix-en-Provence, en temps réel. Partez au bon moment.",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AixBusLive — Partez au bon moment",
    description: "Votre bus à Aix-en-Provence, en temps réel.",
  },
};

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
      <body>{children}</body>
    </html>
  );
}
