"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const handleMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");

      const element = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(
        element?.closest("a, button, [data-cursor]"),
      );
      cursor.classList.toggle("is-hovering", isInteractive);
      cursor.classList.toggle(
        "is-on-dark",
        Boolean(element?.closest(".menu-panel")),
      );
    };

    const handleLeave = () => cursor.classList.remove("is-visible");
    const handleDown = () => cursor.classList.add("is-pressed");
    const handleUp = () => cursor.classList.remove("is-pressed");

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerdown", handleDown, { passive: true });
    document.addEventListener("pointerup", handleUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-glyph">
        <span className="cursor-axis cursor-axis-horizontal" />
        <span className="cursor-axis cursor-axis-vertical" />
        <span className="cursor-accent" />
      </span>
    </div>
  );
}
