import { FaApple, FaGooglePlay } from "react-icons/fa6";
import Image from "next/image";
import { AppShowcase } from "./AppShowcase";
import { SiteHeader } from "./SiteHeader";

const storeLinks = [
  {
    eyebrow: "Télécharger sur",
    label: "l’App Store",
    href: "https://apps.apple.com/fr/search?term=AixBusLive",
    Icon: FaApple,
  },
  {
    eyebrow: "Disponible sur",
    label: "Google Play",
    href: "https://play.google.com/store/search?q=AixBusLive&c=apps",
    Icon: FaGooglePlay,
  },
];

const faqs = [
  {
    question: "Le suivi est-il anonyme ?",
    answer:
      "Oui. Aucun nom n’apparaît sur la carte : seule la position utile du bus est partagée.",
  },
  {
    question: "Quand le partage s’arrête-t-il ?",
    answer:
      "Dès que vous touchez « Je descends » ou que vous quittez le mode conduite.",
  },
  {
    question: "D’où viennent les informations ?",
    answer:
      "Des horaires et perturbations publiés par Aix en Bus, complétés par les voyageurs à bord.",
  },
  {
    question: "Puis-je simplement consulter ?",
    answer:
      "Oui. Le partage reste volontaire : vous pouvez voir les départs sans activer le suivi.",
  },
];

function StoreButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`store-actions ${compact ? "store-actions-compact" : ""}`}
      aria-label="Télécharger AixBusLive"
    >
      {storeLinks.map((store, index) => {
        const Icon = store.Icon;

        return (
          <a
            className={`store-button ${index === 0 ? "store-button-primary" : ""}`}
            href={store.href}
            key={store.label}
            target="_blank"
            rel="noreferrer"
            aria-label={`${store.eyebrow} ${store.label}`}
            data-cursor-theme={index === 0 ? "dark" : undefined}
          >
            <span className="store-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="store-copy">
              <span className="store-eyebrow">{store.eyebrow}</span>
              <span className="store-name">{store.label}</span>
            </span>
            <span className="store-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <main className="landing">
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">Le réseau, c’est vous.</p>
          <h1 id="hero-title">
            <span className="headline-first">Partez au</span>
            <span className="headline-accent">bon moment&nbsp;!</span>
          </h1>

          <StoreButtons />
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
          <p className="community-privacy">
            Volontaire · Anonyme sur la carte · Limité au trajet
          </p>
        </div>
      </section>

      <section
        className="faq-section content-section"
        id="questions"
        aria-labelledby="faq-title"
      >
        <div className="faq-heading">
          <p className="section-eyebrow">L’essentiel</p>
          <h2 id="faq-title">
            Vos questions.
            <span>Nos réponses.</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question}>
              <summary>
                <span className="faq-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{faq.question}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

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
            />
          </span>
          <p className="section-eyebrow">AixBusLive</p>
          <h2 id="download-title">
            Aix avance.
            <span>Vous aussi.</span>
          </h2>
          <StoreButtons compact />
        </div>

        <footer className="site-footer">
          <div className="footer-brand">
            <span>AixBusLive</span>
            <span>Projet indépendant fait pour Aix-en-Provence.</span>
          </div>
          <nav aria-label="Informations">
            <a href="/informations#confidentialite">Confidentialité</a>
            <a href="/informations#mentions">Mentions</a>
            <a href="/informations#sources">Sources</a>
            <a href="#contact">Nous contacter</a>
          </nav>
        </footer>
      </section>
    </main>
  );
}
