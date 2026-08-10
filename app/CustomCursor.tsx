"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaArrowPointer,
  FaEnvelope,
  FaHouse,
  FaLink,
  FaRegHandPointer,
} from "react-icons/fa6";

type CursorKind = "default" | "home" | "link" | "external" | "mail" | "text";

const isCursorKind = (value: string | null): value is CursorKind =>
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

    if (!finePointer.matches || reducedMotion.matches) return;

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

      if (isCursorKind(explicit ?? null)) {
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
    <div
      className={`custom-cursor cursor-kind-${kind}`}
      ref={cursorRef}
      aria-hidden="true"
    >
      <span className="cursor-icon">
        {kind === "link" ? (
          <FaRegHandPointer className="cursor-hand" />
        ) : kind === "text" ? (
          <span className="cursor-ibeam" />
        ) : (
          <ArrowCursor kind={kind} />
        )}
      </span>
    </div>
  );
}
