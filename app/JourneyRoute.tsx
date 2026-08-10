"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Curve = {
  start: Point;
  controlOne: Point;
  controlTwo: Point;
  end: Point;
};

const sectionIds = [
  "top",
  "comment-ca-marche",
  "communaute",
  "telecharger",
] as const;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const pointOnCurve = (curve: Curve, t: number) => {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const tSquared = t * t;

  return {
    x:
      inverseSquared * inverse * curve.start.x +
      3 * inverseSquared * t * curve.controlOne.x +
      3 * inverse * tSquared * curve.controlTwo.x +
      tSquared * t * curve.end.x,
    y:
      inverseSquared * inverse * curve.start.y +
      3 * inverseSquared * t * curve.controlOne.y +
      3 * inverse * tSquared * curve.controlTwo.y +
      tSquared * t * curve.end.y,
  };
};

const tangentOnCurve = (curve: Curve, t: number) => {
  const inverse = 1 - t;

  return {
    x:
      3 * inverse * inverse * (curve.controlOne.x - curve.start.x) +
      6 * inverse * t * (curve.controlTwo.x - curve.controlOne.x) +
      3 * t * t * (curve.end.x - curve.controlTwo.x),
    y:
      3 * inverse * inverse * (curve.controlOne.y - curve.start.y) +
      6 * inverse * t * (curve.controlTwo.y - curve.controlOne.y) +
      3 * t * t * (curve.end.y - curve.controlTwo.y),
  };
};

export function JourneyRoute() {
  const routeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const busRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const route = routeRef.current;
    const canvas = canvasRef.current;
    const bus = busRef.current;
    const page = route?.parentElement;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!route || !canvas || !bus || !page || sections.length !== sectionIds.length) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let curves: Curve[] = [];
    let routeTop = 0;
    let targetY = 0;
    let currentY = 0;
    let hasPosition = false;
    let animationFrame = 0;
    let resizeFrame = 0;
    let previousTime = performance.now();

    const updateTarget = () => {
      targetY = clamp(
        window.scrollY + window.innerHeight * 0.58 - routeTop,
        curves[0]?.start.y ?? 0,
        curves.at(-1)?.end.y ?? 0,
      );
    };

    const positionBus = (y: number) => {
      if (!curves.length) return;

      const curve =
        curves.find((candidate) => y <= candidate.end.y) ?? curves[curves.length - 1];
      const progress = clamp(
        (y - curve.start.y) / Math.max(1, curve.end.y - curve.start.y),
        0,
        1,
      );
      const point = pointOnCurve(curve, progress);
      const tangent = tangentOnCurve(curve, progress);
      const angle = Math.atan2(tangent.y, tangent.x);

      bus.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
    };

    const animateBus = (time: number) => {
      animationFrame = 0;
      const elapsed = Math.min(time - previousTime, 48);
      previousTime = time;
      currentY += (targetY - currentY) * (1 - Math.exp(-elapsed / 90));
      positionBus(currentY);

      if (Math.abs(targetY - currentY) > 0.2) {
        animationFrame = window.requestAnimationFrame(animateBus);
      }
    };

    const handleScroll = () => {
      if (reduceMotion.matches) return;

      updateTarget();
      if (!animationFrame) {
        previousTime = performance.now();
        animationFrame = window.requestAnimationFrame(animateBus);
      }
    };

    const drawRoute = () => {
      const width = page.clientWidth;
      const height = page.scrollHeight;
      const isMobile = width <= 680;
      const gutter = isMobile ? 22 : Math.max(44, width * 0.055);
      const bend = isMobile
        ? Math.min(84, window.innerHeight * 0.1)
        : Math.min(124, window.innerHeight * 0.12);
      const right = width - gutter;
      const overshoot = isMobile ? 58 : 96;
      const [hero, how, community, download] = sections;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const howBottom = how.offsetTop + how.offsetHeight;
      const communityBottom = community.offsetTop + community.offsetHeight;
      const downloadBottom = download.offsetTop + download.offsetHeight;
      const points: Point[] = [
        {
          x: width + overshoot,
          y: hero.offsetTop + hero.offsetHeight * 0.27,
        },
        { x: right, y: heroBottom - bend },
        { x: gutter, y: how.offsetTop + bend },
        { x: gutter, y: howBottom - bend },
        { x: right, y: community.offsetTop + bend },
        { x: right, y: communityBottom - bend },
        { x: gutter, y: download.offsetTop + bend },
        {
          x: gutter,
          y: downloadBottom - Math.max(164, bend * 1.55),
        },
        {
          x: width + overshoot,
          y: downloadBottom - Math.max(88, bend * 0.82),
        },
      ];

      curves = points.slice(0, -1).map((start, index) => {
        const end = points[index + 1];
        const verticalDistance = end.y - start.y;

        return {
          start,
          controlOne: {
            x: start.x,
            y: start.y + verticalDistance / 3,
          },
          controlTwo: {
            x: end.x,
            y: start.y + (verticalDistance * 2) / 3,
          },
          end,
        };
      });

      route.style.height = `${height}px`;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";
      context.lineJoin = "round";

      const tracePath = () => {
        context.beginPath();
        context.moveTo(curves[0].start.x, curves[0].start.y);
        curves.forEach((curve) => {
          context.bezierCurveTo(
            curve.controlOne.x,
            curve.controlOne.y,
            curve.controlTwo.x,
            curve.controlTwo.y,
            curve.end.x,
            curve.end.y,
          );
        });
      };

      tracePath();
      context.strokeStyle = "rgba(251, 250, 246, 0.72)";
      context.lineWidth = isMobile ? 14 : 20;
      context.shadowColor = "rgba(17, 17, 19, 0.08)";
      context.shadowBlur = isMobile ? 5 : 8;
      context.shadowOffsetY = isMobile ? 2 : 3;
      context.stroke();

      tracePath();
      context.strokeStyle = "rgba(17, 17, 19, 0.12)";
      context.lineWidth = isMobile ? 8 : 11;
      context.shadowColor = "transparent";
      context.shadowBlur = 0;
      context.shadowOffsetY = 0;
      context.stroke();

      const stopColors = ["#ff4f2f", "#08b989", "#111113"];
      points.slice(1, -1).forEach((point, index) => {
        context.beginPath();
        context.arc(point.x, point.y, isMobile ? 9 : 12, 0, Math.PI * 2);
        context.fillStyle = "rgba(251, 250, 246, 0.96)";
        context.fill();
        context.strokeStyle = "rgba(17, 17, 19, 0.08)";
        context.lineWidth = 1;
        context.stroke();

        context.beginPath();
        context.arc(point.x, point.y, isMobile ? 3.5 : 5, 0, Math.PI * 2);
        context.fillStyle = stopColors[index % stopColors.length];
        context.fill();
      });

      routeTop = route.getBoundingClientRect().top + window.scrollY;
      updateTarget();
      currentY = targetY;
      hasPosition = true;
      positionBus(currentY);
    };

    const scheduleDraw = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(drawRoute);
    };

    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(page);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("resize", scheduleDraw, { passive: true });

    if (!reduceMotion.matches) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    drawRoute();
    if (!hasPosition) positionBus(targetY);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleDraw);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, []);

  return (
    <div className="journey-route" ref={routeRef} aria-hidden="true">
      <canvas className="journey-track" ref={canvasRef} />
      <span className="journey-bus" ref={busRef}>
        <span />
        <span />
      </span>
    </div>
  );
}
