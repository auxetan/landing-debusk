"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { appScreens, appScreenStructuredData } from "./app-screen-data";
import { StructuredData } from "./StructuredData";

export function AppShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((requestedIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex =
      (requestedIndex + appScreens.length) % appScreens.length;
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
      <StructuredData data={appScreenStructuredData} />
      <div
        className="showcase-track"
        ref={trackRef}
        onScroll={syncActiveSlide}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Galerie des écrans de l’application Débusk"
      >
        {appScreens.map((screen, index) => (
          <figure
            className="showcase-slide"
            key={screen.src}
            role="group"
            aria-roledescription="diapositive"
            style={{ margin: 0 }}
            aria-label={
              String(index + 1) +
              " sur " +
              String(appScreens.length) +
              " : " +
              screen.title
            }
          >
            <div className="showcase-phone-column">
              <div className="iphone-frame">
                <span className="iphone-island" aria-hidden="true" />
                <Image
                  src={screen.src}
                  width={screen.width}
                  height={screen.height}
                  alt={screen.alt}
                  sizes="(max-width: 440px) 44vw, (max-width: 680px) 194px, (max-width: 1416px) 24vw, 340px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>

            <figcaption className="showcase-copy">
              <h3>{screen.title}</h3>
              <p>{screen.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="showcase-navigation">
        <button
          className="showcase-arrow"
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          aria-label="Voir l’écran précédent"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="showcase-dots" aria-label="Choisir un écran">
          {appScreens.map((screen, index) => (
            <button
              type="button"
              key={screen.src}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => scrollToIndex(index)}
              aria-label={
                "Afficher l’écran " + String(index + 1) + " : " + screen.title
              }
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          className="showcase-arrow"
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          aria-label="Voir l’écran suivant"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
