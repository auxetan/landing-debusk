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
  structuredType?: "Article" | "AboutPage";
  breadcrumbParent?: {
    href: string;
    label: string;
  } | null;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  children: ReactNode;
};

const updatedLabel = "16 août 2026";

export function GuidePage({
  path,
  title,
  intro,
  structuredType = "Article",
  breadcrumbParent = { href: "/guides", label: "Guides" },
  image,
  children,
}: GuidePageProps) {
  const currentUrl = absoluteUrl(path);
  const relatedGuides = guideLinks.filter((guide) => guide.href !== path);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": structuredType,
      "@id":
        currentUrl + (structuredType === "Article" ? "#article" : "#webpage"),
      url: currentUrl,
      ...(structuredType === "Article" ? { headline: title } : { name: title }),
      ...(structuredType === "AboutPage"
        ? { mainEntity: { "@id": absoluteUrl("/#application") } }
        : {}),
      description: intro,
      datePublished: UPDATED_AT,
      dateModified: UPDATED_AT,
      inLanguage: "fr-FR",
      ...(structuredType === "Article" ? { mainEntityOfPage: currentUrl } : {}),
      ...(image
        ? {
            image: {
              "@type": "ImageObject",
              url: absoluteUrl(image.url),
              width: image.width,
              height: image.height,
              caption: image.alt,
            },
          }
        : {}),
      author: {
        "@id": absoluteUrl("/#organization"),
      },
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
      isPartOf: { "@id": absoluteUrl("/#website") },
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
        ...(breadcrumbParent
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: breadcrumbParent.label,
                item: absoluteUrl(breadcrumbParent.href),
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: breadcrumbParent ? 3 : 2,
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
            <Image
              src="/icon-192.png"
              alt="Logo Débusk"
              width={42}
              height={42}
            />
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
          {breadcrumbParent ? (
            <>
              <span aria-hidden="true">/</span>
              <Link href={breadcrumbParent.href}>{breadcrumbParent.label}</Link>
            </>
          ) : null}
        </nav>

        <header className="guide-hero">
          <h1>{title}</h1>
          <p className="guide-intro">{intro}</p>
        </header>

        <div className="guide-body">{children}</div>
      </article>

      <aside className="guide-download" aria-labelledby="guide-download-title">
        <div>
          <h2 id="guide-download-title">Débusk à portée de main.</h2>
          <p>
            Horaires, itinéraires, lignes favorites, perturbations et suivi
            communautaire des bus d’Aix-en-Provence.
          </p>
        </div>
        <StoreButtons compact />
      </aside>

      <section className="related-guides" aria-labelledby="related-guides-title">
        <div className="related-guides-heading">
          <h2 id="related-guides-title">À lire ensuite.</h2>
        </div>
        <div className="guide-card-grid">
          {relatedGuides.slice(0, 4).map((guide) => (
            <Link className="guide-card" href={guide.href} key={guide.href}>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <strong aria-hidden="true">→</strong>
            </Link>
          ))}
        </div>
      </section>

      <footer className="guide-footer">
        <span>
          Débusk · Projet indépendant · Vérifié le{" "}
          <time dateTime={UPDATED_AT}>{updatedLabel}</time>
        </span>
        <nav aria-label="Informations légales">
          <Link href="/a-propos-debusk">À propos</Link>
          <Link href="/donnees-couverture-debusk">Données et couverture</Link>
          <Link href="/informations#confidentialite">Confidentialité</Link>
          <Link href="/informations#mentions">Mentions</Link>
          <Link href="/informations#sources">Sources</Link>
        </nav>
      </footer>
    </main>
  );
}
