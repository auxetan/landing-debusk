"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaArrowPointer,
  FaEnvelope,
  FaHandPointer,
  FaHouse,
  FaLink,
} from "react-icons/fa6";

type CursorKind = "default" | "home" | "link" | "external" | "mail" | "text";

const isCursorKind = (
  value: string | null | undefined,
): value is CursorKind =>
  value === "default" ||
  value === "home" ||
  value === "link" ||
  value === "external" ||
  value === "mail" ||
  value === "text";

function ArrowCursor({ kind }: { kind: CursorKind }) {
  const BadgeIcon =
    kind === "home" ? FaHouse : kind === "mail" ? FaEnvelope : FaLink;

  return (
    <span className="cursor-arrow-wrap">
      <FaArrowPointer className="cursor-main-arrow" />
      {kind !== "default" && (
        <span className="cursor-badge">
          <BadgeIcon />
        </span>
      )}
    </span>
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const currentKindRef = useRef<CursorKind>("default");
  const [kind, setKind] = useState<CursorKind>("default");

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");

    if (!finePointer.matches || reducedMotion.matches || forcedColors.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const handleMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");

      const element = event.target instanceof Element ? event.target : null;
      const explicit = element
        ?.closest("[data-cursor-kind]")
        ?.getAttribute("data-cursor-kind");

      let nextKind: CursorKind = "default";

      if (isCursorKind(explicit)) {
        nextKind = explicit;
      } else if (element?.closest('a[href^="mailto:"]')) {
        nextKind = "mail";
      } else if (element?.closest('a[target="_blank"]')) {
        nextKind = "external";
      } else if (element?.closest("a, button")) {
        nextKind = "link";
      } else if (
        element?.closest("p, h1, h2, h3, input, textarea, [contenteditable='true']")
      ) {
        nextKind = "text";
      }

      if (nextKind !== currentKindRef.current) {
        currentKindRef.current = nextKind;
        setKind(nextKind);
      }

      const themedSurface = element?.closest("[data-cursor-theme]");
      const explicitTheme = themedSurface?.getAttribute("data-cursor-theme");
      const isOnDark = explicitTheme
        ? explicitTheme === "dark"
        : Boolean(element?.closest(".menu-panel, .site-header.menu-is-open"));

      cursor.classList.toggle("is-on-dark", isOnDark);
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible", "is-pressed");
    };
    const handleDown = () => cursor.classList.add("is-pressed");
    const handleUp = () => cursor.classList.remove("is-pressed");

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerdown", handleDown, { passive: true });
    document.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("pointercancel", handleUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor cursor-kind-${kind}`}
      ref={cursorRef}
      aria-hidden="true"
    >
      <span className="cursor-icon">
        {kind === "link" ? (
          <FaHandPointer className="cursor-hand" />
        ) : kind === "text" ? (
          <span className="cursor-ibeam" />
        ) : (
          <ArrowCursor kind={kind} />
        )}
      </span>
    </div>
  );
}
