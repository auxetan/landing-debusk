"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { ContactDialog } from "./ContactDialog";

type NavigationItem = {
  label: string;
  href: string;
  contact?: boolean;
  page?: boolean;
};

const navigation: NavigationItem[] = [
  { label: "Accueil", href: "#top" },
  { label: "Comment ça marche ?", href: "#comment-ca-marche" },
  { label: "La communauté", href: "#communaute" },
  { label: "Guides bus & rentrée", href: "/guides", page: true },
  { label: "Questions fréquentes", href: "#questions" },
  { label: "Télécharger", href: "#telecharger" },
  {
    label: "Nous contacter",
    href: "#contact",
    contact: true,
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const contactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", isOpen);

    return () => document.documentElement.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(
    () => () => {
      if (contactTimerRef.current !== null) {
        window.clearTimeout(contactTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    let frame: number | null = null;

    const openContactFromHash = () => {
      if (window.location.hash !== "#contact") return;
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsOpen(false);
        setIsContactOpen(true);
      });
    };

    openContactFromHash();
    window.addEventListener("hashchange", openContactFromHash);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openContactFromHash);
    };
  }, []);

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

  const openContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(false);
    window.history.replaceState(null, "", "#contact");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contactTimerRef.current = window.setTimeout(
      () => setIsContactOpen(true),
      reduceMotion ? 0 : 280,
    );
  };

  const closeContact = useCallback(() => {
    setIsContactOpen(false);
    if (window.location.hash === "#contact") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  return (
    <header className={`site-header ${isOpen ? "menu-is-open" : ""}`}>
      <div className="header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label="Débusk, accueil"
          data-cursor-kind="home"
          onClick={(event) => navigateTo(event, "#top")}
        >
          <span className="brand-logo-frame" aria-hidden="true">
            <Image
              className="brand-logo"
              src="/icon-192.png"
              alt="Logo Débusk"
              width="48"
              height="48"
              unoptimized
            />
          </span>
          <span>Débusk</span>
        </a>

        <div className="header-actions">
          <button
            className={`menu-toggle ${isOpen ? "is-open" : ""}`}
            ref={menuButtonRef}
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
              data-site-event={item.contact ? "contact_open" : item.page ? "guide_open" : undefined}
              data-site-guide={item.page ? item.href.replace(/^\//, "") : undefined}
              ref={index === 0 ? firstLinkRef : undefined}
              tabIndex={isOpen ? 0 : -1}
              onClick={
                item.contact
                  ? openContact
                  : item.page
                    ? () => setIsOpen(false)
                  : (event) => navigateTo(event, item.href)
              }
              style={{ "--menu-delay": `${index * 70}ms` } as CSSProperties}
            >
              <span className="menu-index">0{index + 1}</span>
              <span className={item.contact ? "menu-contact-label" : undefined}>
                {item.label}
              </span>
              <span className="menu-arrow" aria-hidden="true">
                {item.contact ? "↗" : "↘"}
              </span>
            </a>
          ))}
        </div>

        <p className="menu-signature">Aix-en-Provence · Ensemble, en direct.</p>
      </nav>

      {isContactOpen && (
        <ContactDialog isOpen onClose={closeContact} />
      )}
    </header>
  );
}
