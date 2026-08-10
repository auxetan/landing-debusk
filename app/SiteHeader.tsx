"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

const navigation = [
  { label: "Accueil", href: "#top" },
  { label: "Comment ça marche ?", href: "#comment-ca-marche" },
  { label: "La communauté", href: "#communaute" },
  { label: "Télécharger", href: "#telecharger" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 420);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    }, reduceMotion ? 0 : 260);
  };

  return (
    <header className={`site-header ${isOpen ? "menu-is-open" : ""}`}>
      <div className="header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label="AixBusLive, accueil"
          onClick={(event) => navigateTo(event, "#top")}
        >
          AixBusLive
        </a>

        <div className="header-actions">
          <a
            className="brand-logo-link"
            href="#top"
            aria-label="Revenir à l’accueil"
            onClick={(event) => navigateTo(event, "#top")}
          >
            <img
              className="brand-logo"
              src="/icon-192.png"
              alt=""
              width="48"
              height="48"
            />
          </a>

          <button
            className={`menu-toggle ${isOpen ? "is-open" : ""}`}
            type="button"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="site-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`menu-panel ${isOpen ? "is-open" : ""}`}
        id="site-menu"
        aria-label="Navigation principale"
        aria-hidden={!isOpen}
      >
        <div className="menu-route" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="menu-links">
          {navigation.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              tabIndex={isOpen ? 0 : -1}
              onClick={(event) => navigateTo(event, item.href)}
              style={{ "--menu-delay": `${index * 70}ms` } as CSSProperties}
            >
              <span className="menu-index">0{index + 1}</span>
              <span>{item.label}</span>
              <span className="menu-arrow" aria-hidden="true">↘</span>
            </a>
          ))}
        </div>

        <p className="menu-signature">Aix-en-Provence · Ensemble, en direct.</p>
      </nav>
    </header>
  );
}
