import Image from "next/image";
import Link from "next/link";
import { AppShowcase } from "./AppShowcase";
import { appScreenImageUrls } from "./app-screen-data";
import { FaqSection } from "./FaqSection";
import { faqs } from "./faq-data";
import { featuredGuideLinks } from "./guide-data";
import { absoluteUrl } from "./seo";
import { SiteHeader } from "./SiteHeader";
import { StoreButtons } from "./StoreButtons";
import { StructuredData } from "./StructuredData";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": absoluteUrl("/#application"),
    name: "Débusk",
    alternateName: ["Debusk", "Application Débusk"],
    url: absoluteUrl("/application-bus-aix-en-provence"),
    mainEntityOfPage: absoluteUrl("/application-bus-aix-en-provence"),
    description:
      "Application de bus à Aix-en-Provence pour consulter les horaires, itinéraires, lignes, perturbations et le suivi communautaire.",
    applicationCategory: "TravelApplication",
    operatingSystem: "iOS, Android",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    image: absoluteUrl("/icon-192.png"),
    screenshot: appScreenImageUrls,
    publisher: { "@id": absoluteUrl("/#organization") },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
    },
    featureList: [
      "Horaires et prochains départs",
      "Calcul d’itinéraires",
      "Lignes et arrêts favoris",
      "Perturbations officielles",
      "Suivi communautaire volontaire des bus",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <main className="landing">
      <StructuredData data={homeStructuredData} />
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">
            Horaires et itinéraires de bus à Aix-en-Provence
          </p>
          <h1 id="hero-title">
            <span className="headline-first">Le bus à Aix.</span>
            <span className="headline-accent">Au bon moment&nbsp;!</span>
          </h1>
          <p className="hero-description">
            Retrouvez les prochains départs, calculez votre trajet, consultez
            les lignes et les perturbations. Lorsqu’un voyageur contribue, voyez
            aussi le bus progresser sur la carte.
          </p>

          <StoreButtons />
          <p className="hero-proof">
            Gratuit · indépendant · consultation sans compte
          </p>
        </div>

        <div className="route-art" aria-hidden="true">
          <div className="route-leg route-leg-left" />
          <div className="route-leg route-leg-right" />
          <div className="route-bridge">
            <span className="route-stop route-stop-one" />
            <span className="route-stop route-stop-two" />
            <span className="route-stop route-stop-three" />
            <span className="moving-bus">
              <span />
              <span />
            </span>
          </div>
          <div className="route-terminal route-terminal-left" />
          <div className="route-terminal route-terminal-right" />
        </div>

      </section>

      <section
        className="how-section content-section"
        id="comment-ca-marche"
        aria-labelledby="how-title"
      >
        <div className="section-heading">
          <p className="section-eyebrow">Comment ça marche ?</p>
          <h2 id="how-title">
            Votre bus arrive.
            <span>Vous le voyez venir.</span>
          </h2>
        </div>

        <AppShowcase />
        <Link className="showcase-detail-link" href="/application-bus-aix-en-provence">
          Découvrir tous les écrans et le périmètre de Débusk
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section
        className="community-section content-section"
        id="communaute"
        aria-labelledby="community-title"
      >
        <div className="community-orbit" aria-hidden="true">
          <span className="orbit-stop orbit-stop-one" />
          <span className="orbit-stop orbit-stop-two" />
          <span className="orbit-stop orbit-stop-three" />
          <span className="orbit-stop orbit-stop-four" />
        </div>

        <div className="community-copy">
          <p className="section-eyebrow">Le suivi communautaire</p>
          <h2 id="community-title">
            Chaque contribution
            <span>aide le suivant.</span>
          </h2>
          <p className="community-description">
            Quand un passager active le suivi, sa position actualise le bus sur
            la carte. À l’arrêt, les autres voyageurs le voient approcher.
          </p>
        </div>

        <p className="community-privacy">
          Volontaire · identité non affichée · limité au trajet
        </p>
      </section>

      <section
        className="guides-section content-section"
        id="guides"
        aria-labelledby="guides-title"
      >
        <div className="guides-heading">
          <p className="section-eyebrow">Préparer son trajet</p>
          <h2 id="guides-title">
            Toutes les réponses.
            <span>Avant de partir.</span>
          </h2>
          <p>
            Horaires, itinéraires, lignes et abonnement scolaire : des guides
            vérifiés pour les voyageurs et les familles d’Aix-en-Provence.
          </p>
        </div>
        <div className="home-guide-grid">
          {featuredGuideLinks.map((guide, index) => (
            <Link className="home-guide-card" href={guide.href} key={guide.href}>
              <span className="home-guide-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{guide.label}</p>
              <h3>{guide.title}</h3>
              <strong aria-hidden="true">→</strong>
            </Link>
          ))}
        </div>
        <Link className="guides-all-link" href="/guides">
          Voir tous les guides <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <FaqSection />

      <section
        className="download-section content-section"
        id="telecharger"
        aria-labelledby="download-title"
      >
        <div className="download-copy">
          <span className="download-logo-frame" aria-hidden="true">
            <Image
              className="download-logo"
              src="/icon-192.png"
              alt=""
              width="96"
              height="96"
              unoptimized
            />
          </span>
          <p className="section-eyebrow">Débusk</p>
          <h2 id="download-title">
            Aix avance.
            <span>Vous aussi.</span>
          </h2>
          <StoreButtons compact />
        </div>

        <footer className="site-footer">
          <div className="footer-brand">
            <span>Débusk</span>
            <span>Projet indépendant fait pour Aix-en-Provence.</span>
          </div>
          <nav aria-label="Informations">
            <Link href="/guides">Guides bus</Link>
            <Link href="/a-propos-debusk">À propos de Débusk</Link>
            <Link href="/donnees-couverture-debusk">Données et couverture</Link>
            <Link href="/informations#confidentialite">Confidentialité</Link>
            <Link href="/informations#mentions">Mentions</Link>
            <Link href="/informations#sources">Sources</Link>
            <a href="#contact">Contact</a>
          </nav>
        </footer>
      </section>
    </main>
  );
}
