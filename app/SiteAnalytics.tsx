"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type SiteAnalyticsEvent =
  | "page_view"
  | "store_click"
  | "contact_open"
  | "contact_submit"
  | "guide_open";

type SiteAnalyticsProperties = Record<string, string>;

const SESSION_KEY = "debusk:site-analytics-session:v1";
const ATTRIBUTION_KEY = "debusk:site-analytics-attribution:v1";
const trackedPageViews = new Set<string>();
let memorySessionId: string | null = null;
let memoryAttribution: SiteAnalyticsProperties | null = null;

function analyticsAllowed() {
  const privacyNavigator = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  return navigator.doNotTrack !== "1" && privacyNavigator.globalPrivacyControl !== true;
}

function analyticsSessionId() {
  if (memorySessionId) return memorySessionId;
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored && /^[0-9a-f-]{36}$/i.test(stored)) {
      memorySessionId = stored;
      return stored;
    }
  } catch {
    // A blocked storage API must never affect the site itself.
  }

  memorySessionId = crypto.randomUUID();
  try {
    sessionStorage.setItem(SESSION_KEY, memorySessionId);
  } catch {
    // The in-memory ID still scopes this tab until it is closed.
  }
  return memorySessionId;
}

function readAttribution() {
  if (memoryAttribution) return memoryAttribution;
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        memoryAttribution = parsed as SiteAnalyticsProperties;
        return memoryAttribution;
      }
    }
  } catch {
    // Ignore malformed or unavailable browser storage.
  }

  const query = new URLSearchParams(window.location.search);
  const attribution: SiteAnalyticsProperties = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    const value = query.get(key)?.trim();
    if (value) attribution[key] = value.slice(0, 80);
  }
  memoryAttribution = attribution;
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution remains available in memory for this page lifetime.
  }
  return attribution;
}

function referrerHostname() {
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname.toLowerCase();
    return host === window.location.hostname.toLowerCase() ? null : host;
  } catch {
    return null;
  }
}

function coarseDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/android|iphone|ipod|mobile/.test(ua)) return "mobile";
  return "desktop";
}

export function trackSiteEvent(
  eventName: SiteAnalyticsEvent,
  properties: SiteAnalyticsProperties = {},
) {
  if (!analyticsAllowed()) return;

  const body = JSON.stringify({
    event_name: eventName,
    session_id: analyticsSessionId(),
    path: window.location.pathname,
    referrer: referrerHostname(),
    device: coarseDevice(),
    properties: eventName === "page_view"
      ? { ...readAttribution(), ...properties }
      : properties,
  });

  try {
    if (navigator.sendBeacon) {
      const queued = navigator.sendBeacon(
        "/api/analytics",
        new Blob([body], { type: "application/json" }),
      );
      if (queued) return;
    }
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    });
  } catch {
    // Analytics is best-effort and must remain invisible to visitors.
  }
}

export function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const key = `${pathname}:${window.location.search}`;
    if (trackedPageViews.has(key)) return;
    trackedPageViews.add(key);
    trackSiteEvent("page_view");
  }, [pathname]);

  useEffect(() => {
    const trackAnnotatedClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-site-event]")
        : null;
      const eventName = target?.dataset.siteEvent as SiteAnalyticsEvent | undefined;
      if (!target || !eventName) return;

      const properties: SiteAnalyticsProperties = {};
      if (target.dataset.siteStore) properties.store = target.dataset.siteStore;
      if (target.dataset.siteGuide) properties.guide = target.dataset.siteGuide;
      trackSiteEvent(eventName, properties);
    };

    document.addEventListener("click", trackAnnotatedClick, { capture: true });
    return () => document.removeEventListener("click", trackAnnotatedClick, { capture: true });
  }, []);

  return null;
}
