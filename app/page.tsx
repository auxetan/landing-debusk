import { FaApple, FaGooglePlay } from "react-icons/fa6";
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

const steps = [
  {
    number: "01",
    title: "Repérez votre départ.",
    copy: "Les prochains passages autour de vous s’affichent par arrêt et par ligne.",
  },
  {
    number: "02",
    title: "Suivez votre bus.",
    copy: "Position, prochain arrêt et perturbations : vous savez ce qui arrive avant de partir.",
  },
  {
    number: "03",
    title: "Passez le relais.",
    copy: "À bord, activez le suivi : votre trajet met la carte à jour et aide les voyageurs après vous.",
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

        <div className="steps-list">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
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
      </section>

      <section
        className="download-section content-section"
        id="telecharger"
        aria-labelledby="download-title"
      >
        <div className="download-copy">
          <span className="download-logo-frame" aria-hidden="true">
            <img
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

        <footer>
          <span>AixBusLive</span>
          <span>Fait pour Aix-en-Provence.</span>
        </footer>
      </section>
    </main>
  );
}
