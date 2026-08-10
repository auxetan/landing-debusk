const storeLinks = [
  {
    eyebrow: "Télécharger sur",
    label: "l’App Store",
    href: "https://apps.apple.com/fr/search?term=AixBusLive",
  },
  {
    eyebrow: "Disponible sur",
    label: "Google Play",
    href: "https://play.google.com/store/search?q=AixBusLive&c=apps",
  },
];

export default function Home() {
  return (
    <main className="landing">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="AixBusLive, accueil">
          <span className="brand-stop" aria-hidden="true" />
          AixBusLive
        </a>

        <div className="live-label" aria-label="Informations de bus en direct">
          <span className="live-dot" aria-hidden="true" />
          En direct
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">Votre bus, en temps réel.</p>
          <h1 id="hero-title">
            Partez.
            <span>Au bon moment.</span>
          </h1>

          <div className="store-actions" aria-label="Télécharger AixBusLive">
            {storeLinks.map((store, index) => (
              <a
                className={`store-button ${index === 0 ? "store-button-primary" : ""}`}
                href={store.href}
                key={store.label}
                target="_blank"
                rel="noreferrer"
                aria-label={`${store.eyebrow} ${store.label}`}
              >
                <span className="store-copy">
                  <span className="store-eyebrow">{store.eyebrow}</span>
                  <span className="store-name">{store.label}</span>
                </span>
                <span className="store-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
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
    </main>
  );
}
