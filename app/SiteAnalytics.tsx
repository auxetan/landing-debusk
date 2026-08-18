"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export type SiteAnalyticsEvent =
  | "page_view"
  | "store_click"
  | "contact_open"
  | "contact_submit"
  | "guide_open";

type SiteAnalyticsProperties = Record<string, string>;

type AnalyticsSession = {
  id: string;
  last_activity_at: number;
};

type StoredAttribution = {
  session_id: string;
  properties: SiteAnalyticsProperties;
};

type RetryQueueEntry = {
  id: string;
  body: string;
  retry_count: number;
};

const SESSION_KEY = "debusk:site-analytics-session:v1";
const ATTRIBUTION_KEY = "debusk:site-analytics-attribution:v1";
const RETRY_QUEUE_KEY = "debusk:site-analytics-retry:v1";
const SESSION_TIMEOUT_MS = 30 * 60 * 1_000;
const RETRY_DELAY_MS = 2_000;
const MAX_RETRY_QUEUE_SIZE = 20;
const MAX_NETWORK_RETRIES = 1;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

let memorySession: AnalyticsSession | null = null;
let memoryAttribution: StoredAttribution | null = null;
let memoryRetryQueue: RetryQueueEntry[] = [];
let retryTimer: number | null = null;
let retryFlushInProgress = false;

function analyticsAllowed() {
  const privacyNavigator = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  return navigator.doNotTrack !== "1" && privacyNavigator.globalPrivacyControl !== true;
}

function persistSession(session: AnalyticsSession) {
  memorySession = session;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // The in-memory session still scopes this tab while storage is unavailable.
  }
}

function storedSession(now: number) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    // Keep sessions created by the first tracker version, which stored only
    // the UUID, and upgrade them to the inactivity-aware representation.
    if (UUID_PATTERN.test(raw)) {
      return { id: raw, last_activity_at: now } satisfies AnalyticsSession;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const candidate = parsed as Partial<AnalyticsSession>;
    if (!candidate.id || !UUID_PATTERN.test(candidate.id)) return null;
    if (!Number.isFinite(candidate.last_activity_at)) return null;
    if (
      now < (candidate.last_activity_at as number) ||
      now - (candidate.last_activity_at as number) >= SESSION_TIMEOUT_MS
    ) {
      return null;
    }
    return candidate as AnalyticsSession;
  } catch {
    return null;
  }
}

function analyticsSessionId() {
  const now = Date.now();
  let session = memorySession;
  if (
    !session ||
    now < session.last_activity_at ||
    now - session.last_activity_at >= SESSION_TIMEOUT_MS
  ) {
    session = storedSession(now) ?? {
      id: crypto.randomUUID(),
      last_activity_at: now,
    };
  }
  session.last_activity_at = now;
  persistSession(session);
  return session.id;
}

function validAttribution(value: unknown): value is SiteAnalyticsProperties {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(
    ([key, item]) =>
      ["utm_source", "utm_medium", "utm_campaign"].includes(key) &&
      typeof item === "string",
  );
}

function currentAttribution() {
  const query = new URLSearchParams(window.location.search);
  const attribution: SiteAnalyticsProperties = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    const value = query.get(key)?.trim();
    if (value) attribution[key] = value.slice(0, 80);
  }
  return attribution;
}

function readAttribution(sessionId: string) {
  if (memoryAttribution?.session_id === sessionId) {
    return memoryAttribution.properties;
  }

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const candidate = parsed as Partial<StoredAttribution>;
        if (
          candidate.session_id === sessionId &&
          validAttribution(candidate.properties)
        ) {
          memoryAttribution = candidate as StoredAttribution;
          return memoryAttribution.properties;
        }

        // Upgrade the first tracker version, which stored the UTM object
        // directly, while the associated legacy session is still active.
        if (!("session_id" in parsed) && validAttribution(parsed)) {
          memoryAttribution = { session_id: sessionId, properties: parsed };
          sessionStorage.setItem(
            ATTRIBUTION_KEY,
            JSON.stringify(memoryAttribution),
          );
          return memoryAttribution.properties;
        }
      }
    }
  } catch {
    // Ignore malformed or unavailable browser storage.
  }

  memoryAttribution = {
    session_id: sessionId,
    properties: currentAttribution(),
  };
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memoryAttribution));
  } catch {
    // Attribution remains available in memory for this page lifetime.
  }
  return memoryAttribution.properties;
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

function validRetryEntry(value: unknown): value is RetryQueueEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<RetryQueueEntry>;
  return Boolean(candidate.id && UUID_PATTERN.test(candidate.id)) &&
    typeof candidate.body === "string" &&
    candidate.body.length <= 2_048 &&
    Number.isInteger(candidate.retry_count) &&
    (candidate.retry_count as number) >= 0 &&
    (candidate.retry_count as number) < MAX_NETWORK_RETRIES;
}

function readRetryQueue() {
  try {
    const raw = sessionStorage.getItem(RETRY_QUEUE_KEY);
    if (!raw) {
      memoryRetryQueue = [];
      return memoryRetryQueue;
    }
    const parsed = JSON.parse(raw) as unknown;
    memoryRetryQueue = Array.isArray(parsed)
      ? parsed.filter(validRetryEntry).slice(-MAX_RETRY_QUEUE_SIZE)
      : [];
  } catch {
    // Fall back to the in-memory queue when storage is blocked.
  }
  return memoryRetryQueue;
}

function writeRetryQueue(queue: RetryQueueEntry[]) {
  memoryRetryQueue = queue.slice(-MAX_RETRY_QUEUE_SIZE);
  try {
    if (memoryRetryQueue.length === 0) {
      sessionStorage.removeItem(RETRY_QUEUE_KEY);
    } else {
      sessionStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(memoryRetryQueue));
    }
  } catch {
    // The bounded in-memory queue remains available for this page lifetime.
  }
}

function removeRetryEntry(id: string) {
  writeRetryQueue(readRetryQueue().filter((entry) => entry.id !== id));
}

function enqueueNetworkFailure(body: string) {
  const queue = readRetryQueue();
  const entry: RetryQueueEntry = {
    id: crypto.randomUUID(),
    body,
    retry_count: 0,
  };
  writeRetryQueue([...queue, entry]);
}

function postAnalytics(body: string) {
  return fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
    cache: "no-store",
  });
}

function scheduleRetry() {
  if (retryTimer !== null) return;
  retryTimer = window.setTimeout(() => {
    retryTimer = null;
    void flushQueuedEvents();
  }, RETRY_DELAY_MS);
}

async function deliverWithAcknowledgement(body: string) {
  try {
    const response = await postAnalytics(body);
    // Any HTTP response proves the server answered. In particular, a 202 is
    // already accepted and must never be retried. Non-2xx responses are also
    // not retried because this tracker has no database idempotency key yet.
    return response.status === 202;
  } catch {
    // Only an explicit network rejection enters the one-shot retry queue.
    enqueueNetworkFailure(body);
    scheduleRetry();
    return false;
  }
}

async function flushQueuedEvents() {
  if (retryFlushInProgress) return;
  if (!analyticsAllowed()) {
    writeRetryQueue([]);
    return;
  }
  if (navigator.onLine === false) return;

  retryFlushInProgress = true;
  try {
    for (const entry of [...readRetryQueue()]) {
      try {
        await postAnalytics(entry.body);
        // A response, accepted or rejected, completes this one-shot retry.
        removeRetryEntry(entry.id);
      } catch {
        const retryCount = entry.retry_count + 1;
        if (retryCount >= MAX_NETWORK_RETRIES) {
          removeRetryEntry(entry.id);
        }
      }
    }
  } finally {
    retryFlushInProgress = false;
  }
}

function flushQueuedEventsWithBeacon() {
  if (!analyticsAllowed()) {
    writeRetryQueue([]);
    return;
  }
  if (!navigator.sendBeacon) return;

  for (const entry of [...readRetryQueue()]) {
    const queued = navigator.sendBeacon(
      "/api/analytics",
      new Blob([entry.body], { type: "application/json" }),
    );
    if (queued) removeRetryEntry(entry.id);
  }
}

export function trackSiteEvent(
  eventName: SiteAnalyticsEvent,
  properties: SiteAnalyticsProperties = {},
) {
  if (!analyticsAllowed()) return;

  const sessionId = analyticsSessionId();
  const body = JSON.stringify({
    event_name: eventName,
    session_id: sessionId,
    path: window.location.pathname,
    referrer: referrerHostname(),
    device: coarseDevice(),
    properties: eventName === "page_view"
      ? { ...readAttribution(sessionId), ...properties }
      : properties,
  });

  void deliverWithAcknowledgement(body);
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const lastTrackedLocation = useRef<string | null>(null);

  useEffect(() => {
    const key = search ? `${pathname}?${search}` : pathname;
    if (lastTrackedLocation.current === key) return;
    lastTrackedLocation.current = key;
    trackSiteEvent("page_view");
  }, [pathname, search]);

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
    const flushWhenOnline = () => void flushQueuedEvents();
    const flushOnDeparture = () => flushQueuedEventsWithBeacon();

    document.addEventListener("click", trackAnnotatedClick, { capture: true });
    window.addEventListener("online", flushWhenOnline);
    window.addEventListener("pagehide", flushOnDeparture);
    void flushQueuedEvents();

    return () => {
      document.removeEventListener("click", trackAnnotatedClick, { capture: true });
      window.removeEventListener("online", flushWhenOnline);
      window.removeEventListener("pagehide", flushOnDeparture);
      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
        retryTimer = null;
      }
    };
  }, []);

  return null;
}
