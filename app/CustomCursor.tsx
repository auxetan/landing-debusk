"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const core = coreRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;

    if (!cursor || !core || !trail || !label) return;

    const pointer: Point = { x: -100, y: -100 };
    const follower: Point = { x: -100, y: -100 };
    let frame = 0;
    let clickTimer = 0;
    let activeTarget: Element | null = null;

    document.documentElement.classList.add("custom-cursor-enabled");

    const updateTarget = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest("a, button, [data-cursor]") ?? null;

      if (interactive === activeTarget) return;
      activeTarget = interactive;

      if (!interactive) {
        cursor.classList.remove("is-hovering");
        label.textContent = "";
        return;
      }

      const customLabel = interactive.getAttribute("data-cursor-label");
      label.textContent = customLabel || "GO";
      cursor.classList.add("is-hovering");
    };

    const render = () => {
      follower.x += (pointer.x - follower.x) * 0.17;
      follower.y += (pointer.y - follower.y) * 0.17;

      core.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      trail.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor.classList.add("is-visible");
      updateTarget(event.target);
    };

    const handleLeave = () => cursor.classList.remove("is-visible");

    const handleDown = () => {
      window.clearTimeout(clickTimer);
      cursor.classList.remove("is-clicking");
      void cursor.offsetWidth;
      cursor.classList.add("is-pressed", "is-clicking");
      clickTimer = window.setTimeout(
        () => cursor.classList.remove("is-clicking"),
        360,
      );
    };

    const handleUp = () => cursor.classList.remove("is-pressed");

    frame = window.requestAnimationFrame(render);
    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerdown", handleDown, { passive: true });
    document.addEventListener("pointerup", handleUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(clickTimer);
      document.documentElement.classList.remove("custom-cursor-enabled");
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-trail-anchor" ref={trailRef}>
        <span className="cursor-trail-visual">
          <span className="cursor-label" ref={labelRef} />
        </span>
      </span>
      <span className="cursor-core-anchor" ref={coreRef}>
        <span className="cursor-core-visual" />
      </span>
    </div>
  );
}
