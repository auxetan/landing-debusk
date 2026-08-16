import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { guideLinks } from "./guide-data";
import { absoluteUrl, UPDATED_AT } from "./seo";
import { StoreButtons } from "./StoreButtons";
import { StructuredData } from "./StructuredData";

type GuidePageProps = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

const updatedLabel = "16 août 2026";

export function GuidePage({
  path,
  eyebrow,
  title,
  intro,
  children,
}: GuidePageProps) {
  const currentUrl = absoluteUrl(path);
  const relatedGuides = guideLinks.filter((guide) => guide.href !== path);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: intro,
      datePublished: UPDATED_AT,
      dateModified: UPDATED_AT,
      inLanguage: "fr-FR",
      mainEntityOfPage: currentUrl,
      author: {
        "@type": "Organization",
        name: "Débusk",
        url: absoluteUrl("/"),
      },
      publisher: {
        "@type": "Organization",
        name: "Débusk",
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon-192.png"),
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: absoluteUrl("/guides"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: currentUrl,
        },
      ],
    },
  ];

  return (
    <main className="guide-page">
      <StructuredData data={structuredData} />

      <header className="guide-topbar">
        <Link className="guide-brand" href="/" aria-label="Débusk, accueil">
          <span className="guide-brand-icon" aria-hidden="true">
            <Image src="/icon-192.png" alt="" width={42} height={42} />
          </span>
          <span>Débusk</span>
        </Link>
        <Link className="guide-hub-link" href="/guides">
          Tous les guides
        </Link>
      </header>

      <article>
        <nav className="breadcrumbs" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link href="/guides">Guides</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>

        <header className="guide-hero">
          <p className="guide-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="guide-intro">{intro}</p>
          <p className="guide-updated">
            Vérifié le <time dateTime={UPDATED_AT}>{updatedLabel}</time>
          </p>
        </header>

        <div className="guide-body">{children}</div>
      </article>

      <aside className="guide-download" aria-labelledby="guide-download-title">
        <div>
          <p className="guide-eyebrow">L’app Débusk</p>
          <h2 id="guide-download-title">Gardez les trajets à portée de main.</h2>
          <p>
            Horaires, itinéraires, lignes favorites, perturbations et suivi
            communautaire des bus d’Aix-en-Provence.
          </p>
        </div>
        <StoreButtons compact />
      </aside>

      <section className="related-guides" aria-labelledby="related-guides-title">
        <div className="related-guides-heading">
          <p className="guide-eyebrow">À lire ensuite</p>
          <h2 id="related-guides-title">Préparez tout le trajet.</h2>
        </div>
        <div className="guide-card-grid">
          {relatedGuides.slice(0, 4).map((guide) => (
            <Link className="guide-card" href={guide.href} key={guide.href}>
              <span>{guide.label}</span>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <strong aria-hidden="true">→</strong>
            </Link>
          ))}
        </div>
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

