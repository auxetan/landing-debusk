"use client";

/* Screenshots are intentionally rendered as raw images inside the CSS phone
   frame so their exact pixels and proportions stay untouched. */
/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const slides = [
  {
    image: "/app-screens/main-screen.png",
    width: 778,
    height: 1672,
    title: "Les bus autour de vous",
    copy: "Repérez les lignes sur la carte et accédez aux prochains départs.",
    alt: "Carte AixBusLive affichant les bus autour de l’utilisateur",
  },
  {
    image: "/app-screens/favoris-choix-bus.png",
    width: 772,
    height: 1676,
    title: "Vos départs en un coup d’œil",
    copy: "Retrouvez vos arrêts favoris, vos lignes et les prochains bus à proximité.",
    alt: "Liste des arrêts favoris, des lignes et des prochains départs",
  },
  {
    image: "/app-screens/perturbations-officielles.png",
    width: 768,
    height: 1676,
    title: "Les infos officielles",
    copy: "Consultez les perturbations publiées par Aix en Bus, ligne par ligne.",
    alt: "Liste des perturbations officielles du réseau Aix en Bus",
  },
  {
    image: "/app-screens/mode-itineraire.png",
    width: 774,
    height: 1666,
    title: "Votre trajet, étape par étape",
    copy: "Visualisez le tracé, la durée et chaque étape avant de démarrer.",
    alt: "Itinéraire détaillé entre le Stade Carcassonne et la Rotonde",
  },
  {
    image: "/app-screens/mode-conduite.png",
    width: 770,
    height: 1674,
    title: "À bord, suivez le trajet",
    copy: "Le mode conduite affiche votre ligne, le parcours et le prochain arrêt.",
    alt: "Mode conduite suivant un bus de la ligne 25 sur la carte",
  },
  {
    image: "/app-screens/contribution-communautaire.png",
    width: 776,
    height: 1666,
    title: "Prévenez la communauté",
    copy: "Signalez rapidement un retard, un bus complet ou un incident sur le réseau.",
    alt: "Choix d’un signalement communautaire dans AixBusLive",
  },
  {
    image: "/app-screens/progression-communautaire.png",
    width: 772,
    height: 1674,
    title: "Vos contributions comptent",
    copy: "Suivez vos points, vos validations et votre progression dans la communauté.",
    alt: "Écran de progression des contributions communautaires",
  },
] as const;

export function AppShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((requestedIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = (requestedIndex + slides.length) % slides.length;
    const target = track.children.item(nextIndex) as HTMLElement | null;
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: target.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  }, []);

  const syncActiveSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const slide = child as HTMLElement;
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  }, []);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <div className="app-showcase">
      <div
        className="showcase-track"
        ref={trackRef}
        onScroll={syncActiveSlide}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Découvrir les écrans d’AixBusLive"
      >
        {slides.map((slide, index) => (
          <article
            className="showcase-slide"
            key={slide.image}
            aria-label={
              String(index + 1) + " sur " + String(slides.length) + " : " + slide.title
            }
          >
            <div className="showcase-phone-column">
              <div className="iphone-frame">
                <span className="iphone-island" aria-hidden="true" />
                <img
                  src={slide.image}
                  width={slide.width}
                  height={slide.height}
                  alt={slide.alt}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>

            <div className="showcase-copy">
              <p className="showcase-index">
                Écran {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{slide.title}</h3>
              <p>{slide.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="showcase-navigation">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          aria-label="Voir l’écran précédent"
        >
          <span aria-hidden="true">←</span>
        </button>

        <p aria-live="polite" aria-atomic="true">
          {String(activeIndex + 1).padStart(2, "0")}
          <span> / {String(slides.length).padStart(2, "0")}</span>
        </p>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          aria-label="Voir l’écran suivant"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="showcase-dots" aria-label="Choisir un écran">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.image}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => scrollToIndex(index)}
            aria-label={
              "Afficher l’écran " + String(index + 1) + " : " + slide.title
            }
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>

      <p className="showcase-swipe-hint">Glissez pour explorer</p>
    </div>
  );
}
