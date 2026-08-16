import { FaApple, FaGooglePlay } from "react-icons/fa6";

export const storeLinks = [
  {
    eyebrow: "Télécharger sur",
    label: "l’App Store",
    href: "https://apps.apple.com/fr/search?term=D%C3%A9busk",
    Icon: FaApple,
  },
  {
    eyebrow: "Disponible sur",
    label: "Google Play",
    href: "https://play.google.com/store/search?q=D%C3%A9busk&c=apps",
    Icon: FaGooglePlay,
  },
] as const;

export function StoreButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`store-actions ${compact ? "store-actions-compact" : ""}`}
      aria-label="Télécharger l’application Débusk"
    >
      {storeLinks.map((store, index) => {
        const Icon = store.Icon;

        return (
          <a
            className={`store-button ${index === 0 ? "store-button-primary" : ""}`}
            href={store.href}
            key={store.label}
            target="_blank"
            rel="noopener noreferrer"
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

