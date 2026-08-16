import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guideLinks } from "../guide-data";
import { absoluteUrl, createPageMetadata } from "../seo";
import { StructuredData } from "../StructuredData";

export const metadata: Metadata = createPageMetadata({
  title: "Guides bus à Aix-en-Provence : horaires, lignes et rentrée",
  description:
    "Tous les guides Débusk pour préparer un trajet en bus à Aix-en-Provence : horaires, itinéraires, lignes et abonnement scolaire 2026-2027.",
  path: "/guides",
  type: "website",
});

export default function GuidesPage() {
  return (
    <main className="guide-page guide-index-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guides bus à Aix-en-Provence",
          description:
            "Horaires, itinéraires, lignes et préparation de la rentrée en bus à Aix-en-Provence.",
          url: absoluteUrl("/guides"),
          inLanguage: "fr-FR",
          isPartOf: {
            "@type": "WebSite",
            name: "Débusk",
            url: absoluteUrl("/"),
          },
        }}
      />

      <header className="guide-topbar">
        <Link className="guide-brand" href="/" aria-label="Débusk, accueil">
          <span className="guide-brand-icon" aria-hidden="true">
            <Image src="/icon-192.png" alt="" width={42} height={42} />
          </span>
          <span>Débusk</span>
        </Link>
        <Link className="guide-hub-link" href="/#telecharger">
          Télécharger l’app
        </Link>
      </header>

      <header className="guide-index-hero">
        <p className="guide-eyebrow">Se déplacer à Aix-en-Provence</p>
        <h1>Les guides pour prendre le bus sereinement.</h1>
        <p>
          Des réponses claires pour choisir une ligne, vérifier un horaire,
          préparer un itinéraire et organiser les trajets scolaires de la
          rentrée 2026–2027.
        </p>
      </header>

      <section className="guide-index-list" aria-label="Guides Débusk">
        {guideLinks.map((guide, index) => (
          <Link className="guide-index-card" href={guide.href} key={guide.href}>
            <span className="guide-index-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p>{guide.label}</p>
              <h2>{guide.title}</h2>
              <span>{guide.description}</span>
            </div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        ))}
      </section>

      <footer className="guide-footer">
        <span>Débusk · Projet indépendant conçu à Aix-en-Provence</span>
        <nav aria-label="Informations légales">
          <Link href="/informations#confidentialite">Confidentialité</Link>
          <Link href="/informations#mentions">Mentions</Link>
          <Link href="/informations#sources">Sources</Link>
        </nav>
      </footer>
    </main>
  );
}
