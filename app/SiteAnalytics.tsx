"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export type SiteAnalyticsEvent =
  | "page_view"
  | "store_click"
  | "contact_open"
  | "contact_submit"
  | "guide_open"
  | "web_vital"
  | "engagement"
  | "heartbeat";

export type SiteAnalyticsProperties = Record<string, string | number>;

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
const CONTACT_ANNOTATION_KEY = "debusk:site-analytics-contact:v1";
export const ANALYTICS_OPT_OUT_KEY = "debusk:site-analytics-opt-out:v1";
export const ANALYTICS_PREFERENCE_EVENT = "debusk:site-analytics-preference";
const SESSION_TIMEOUT_MS = 30 * 60 * 1_000;
const HEARTBEAT_INTERVAL_MS = 60_000;
const RETRY_DELAY_MS = 2_000;
const MAX_RETRY_QUEUE_SIZE = 20;
const MAX_NETWORK_RETRIES = 1;
const CONTACT_ANNOTATION_TTL_MS = 15_000;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

let memorySession: AnalyticsSession | null = null;
let memoryAttribution: StoredAttribution | null = null;
let memoryRetryQueue: RetryQueueEntry[] = [];
let retryTimer: number | null = null;
let retryFlushInProgress = false;

export function browserPrivacySignalActive() {
  const privacyNavigator = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  return navigator.doNotTrack === "1" ||
    privacyNavigator.globalPrivacyControl === true;
}

export function siteAnalyticsOptedOut() {
  try {
    return localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

function analyticsAllowed() {
  return !browserPrivacySignalActive() && !siteAnalyticsOptedOut();
}

function clearAnalyticsTransientState() {
  memorySession = null;
  memoryAttribution = null;
  memoryRetryQueue = [];
  if (retryTimer !== null) {
    window.clearTimeout(retryTimer);
    retryTimer = null;
  }
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(ATTRIBUTION_KEY);
    sessionStorage.removeItem(RETRY_QUEUE_KEY);
    sessionStorage.removeItem(CONTACT_ANNOTATION_KEY);
  } catch {
    // Privacy state is still enforced in memory when storage is unavailable.
  }
}

export function setSiteAnalyticsOptOut(optOut: boolean) {
  try {
    if (optOut) localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
    else localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
  } catch {
    // The browser privacy signals still apply when persistent storage is blocked.
  }
  // Both disabling and re-enabling start from a clean anonymous session.
  clearAnalyticsTransientState();
  window.dispatchEvent(new Event(ANALYTICS_PREFERENCE_EVENT));
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
        if (!("session_id" in parsed) && validAttribution(parsed)) {
          memoryAttribution = { session_id: sessionId, properties: parsed };
          sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memoryAttribution));
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

function viewportBucket() {
  const width = window.innerWidth;
  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1_024) return "md";
  if (width < 1_440) return "lg";
  return "xl";
}

function currentPagePath() {
  return `${window.location.pathname}${window.location.search}`;
}

function rememberAnnotatedContactOpen() {
  try {
    sessionStorage.setItem(CONTACT_ANNOTATION_KEY, String(Date.now()));
  } catch {
    // In-memory delivery still works; dialog-level tracking may duplicate only
    // when browser storage itself is unavailable.
  }
}

function consumeAnnotatedContactOpen() {
  try {
    const raw = sessionStorage.getItem(CONTACT_ANNOTATION_KEY);
    sessionStorage.removeItem(CONTACT_ANNOTATION_KEY);
    if (!raw) return false;
    const annotatedAt = Number(raw);
    const age = Date.now() - annotatedAt;
    return Number.isFinite(annotatedAt) && age >= 0 &&
      age <= CONTACT_ANNOTATION_TTL_MS;
  } catch {
    return false;
  }
}

function validRetryEntry(value: unknown): value is RetryQueueEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<RetryQueueEntry>;
  return Boolean(candidate.id && UUID_PATTERN.test(candidate.id)) &&
    typeof candidate.body === "string" && candidate.body.length <= 2_048 &&
    Number.isInteger(candidate.retry_count) &&
    (candidate.retry_count as number) >= 0 &&
    (candidate.retry_count as number) < MAX_NETWORK_RETRIES;
}

function readRetryQueue() {
  try {
    const raw = sessionStorage.getItem(RETRY_QUEUE_KEY);
    if (!raw) return memoryRetryQueue;
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
  writeRetryQueue([
    ...readRetryQueue(),
    { id: crypto.randomUUID(), body, retry_count: 0 },
  ]);
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
    // Never retry after any HTTP response, especially an accepted 202. Without
    // a database idempotency key, only explicit network rejection is retried.
    return response.status === 202;
  } catch {
    enqueueNetworkFailure(body);
    scheduleRetry();
    return false;
  }
}

async function flushQueuedEvents() {
  if (retryFlushInProgress) return;
  if (!analyticsAllowed()) {
    clearAnalyticsTransientState();
    return;
  }
  if (navigator.onLine === false) return;

  retryFlushInProgress = true;
  try {
    for (const entry of [...readRetryQueue()]) {
      try {
        await postAnalytics(entry.body);
        removeRetryEntry(entry.id);
      } catch {
        if (entry.retry_count + 1 >= MAX_NETWORK_RETRIES) {
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
    clearAnalyticsTransientState();
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

function analyticsBody(
  eventName: SiteAnalyticsEvent,
  properties: SiteAnalyticsProperties,
  path = currentPagePath(),
) {
  const sessionId = analyticsSessionId();
  return JSON.stringify({
    event_name: eventName,
    session_id: sessionId,
    path,
    referrer: referrerHostname(),
    viewport: viewportBucket(),
    properties: eventName === "page_view"
      ? { ...readAttribution(sessionId), ...properties }
      : properties,
  });
}

export function trackSiteEvent(
  eventName: SiteAnalyticsEvent,
  properties: SiteAnalyticsProperties = {},
) {
  if (!analyticsAllowed()) {
    clearAnalyticsTransientState();
    return;
  }
  void deliverWithAcknowledgement(analyticsBody(eventName, properties));
}

export function trackContactDialogOpen() {
  if (!analyticsAllowed()) {
    clearAnalyticsTransientState();
    return;
  }
  if (consumeAnnotatedContactOpen()) return;
  trackSiteEvent("contact_open");
}

function sendEngagementOnDeparture(
  path: string,
  properties: SiteAnalyticsProperties,
) {
  if (!analyticsAllowed()) {
    clearAnalyticsTransientState();
    return;
  }
  const body = analyticsBody("engagement", properties, path);
  const queued = navigator.sendBeacon?.(
    "/api/analytics",
    new Blob([body], { type: "application/json" }),
  ) ?? false;
  if (!queued) void deliverWithAcknowledgement(body);
}

function scrollDepthBucket() {
  const totalHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body?.scrollHeight ?? 0,
  );
  if (totalHeight <= 0) return 0;
  const reached = Math.min(
    100,
    Math.max(0, ((window.scrollY + window.innerHeight) / totalHeight) * 100),
  );
  if (reached >= 100) return 100;
  if (reached >= 75) return 75;
  if (reached >= 50) return 50;
  if (reached >= 25) return 25;
  return 0;
}

function usePageEngagement(path: string, locationKey: string) {
  useEffect(() => {
    let activeMilliseconds = 0;
    let visibleSince = document.visibilityState === "visible"
      ? performance.now()
      : null;
    let maximumScrollDepth = scrollDepthBucket();
    let sent = false;

    const pause = () => {
      if (visibleSince === null) return;
      activeMilliseconds += performance.now() - visibleSince;
      visibleSince = null;
    };
    const resume = () => {
      if (visibleSince === null && document.visibilityState === "visible") {
        visibleSince = performance.now();
      }
    };
    const updateScrollDepth = () => {
      maximumScrollDepth = Math.max(maximumScrollDepth, scrollDepthBucket());
    };
    const sendSummary = (departure: boolean) => {
      if (sent) return;
      pause();
      const activeSeconds = Math.min(
        1_800,
        Math.floor(activeMilliseconds / 1_000),
      );
      if (activeSeconds < 1) return;
      sent = true;
      const properties = {
        active_seconds: activeSeconds,
        scroll_depth: maximumScrollDepth,
      };
      if (departure) sendEngagementOnDeparture(path, properties);
      else if (analyticsAllowed()) {
        void deliverWithAcknowledgement(
          analyticsBody("engagement", properties, path),
        );
      }
    };
    const visibilityChanged = () => {
      if (document.visibilityState === "visible") resume();
      else pause();
    };
    const privacyChanged = () => {
      activeMilliseconds = 0;
      maximumScrollDepth = scrollDepthBucket();
      sent = false;
      visibleSince = analyticsAllowed() && document.visibilityState === "visible"
        ? performance.now()
        : null;
    };
    const storedPreferenceChanged = (event: StorageEvent) => {
      if (event.key === ANALYTICS_OPT_OUT_KEY) privacyChanged();
    };
    const pageHidden = () => sendSummary(true);

    document.addEventListener("visibilitychange", visibilityChanged);
    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    window.addEventListener("pagehide", pageHidden);
    window.addEventListener(ANALYTICS_PREFERENCE_EVENT, privacyChanged);
    window.addEventListener("storage", storedPreferenceChanged);
    return () => {
      document.removeEventListener("visibilitychange", visibilityChanged);
      window.removeEventListener("scroll", updateScrollDepth);
      window.removeEventListener("pagehide", pageHidden);
      window.removeEventListener(ANALYTICS_PREFERENCE_EVENT, privacyChanged);
      window.removeEventListener("storage", storedPreferenceChanged);
      sendSummary(false);
    };
  }, [path, locationKey]);
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const locationKey = search ? `${pathname}?${search}` : pathname;
  const lastTrackedLocation = useRef<string | null>(null);
  const lastHeartbeatAt = useRef(0);

  usePageEngagement(locationKey, locationKey);

  useEffect(() => {
    if (lastTrackedLocation.current === locationKey) return;
    lastTrackedLocation.current = locationKey;
    trackSiteEvent("page_view");
  }, [locationKey]);

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
      if (eventName === "contact_open" && analyticsAllowed()) {
        rememberAnnotatedContactOpen();
      }
      trackSiteEvent(eventName, properties);
    };
    const flushWhenOnline = () => void flushQueuedEvents();
    const flushOnDeparture = () => flushQueuedEventsWithBeacon();
    const enforcePrivacy = () => {
      if (!analyticsAllowed()) clearAnalyticsTransientState();
    };
    const preferenceChanged = () => {
      if (!analyticsAllowed()) {
        clearAnalyticsTransientState();
        return;
      }
      // Re-enabling creates one fresh page view for the current URL. The
      // regular location effect will see the same key and cannot duplicate it.
      clearAnalyticsTransientState();
      lastTrackedLocation.current = currentPagePath();
      lastHeartbeatAt.current = 0;
      trackSiteEvent("page_view");
    };
    const storedPreferenceChanged = (event: StorageEvent) => {
      if (event.key === ANALYTICS_OPT_OUT_KEY) preferenceChanged();
    };

    document.addEventListener("click", trackAnnotatedClick, { capture: true });
    window.addEventListener("online", flushWhenOnline);
    window.addEventListener("pagehide", flushOnDeparture);
    window.addEventListener(ANALYTICS_PREFERENCE_EVENT, preferenceChanged);
    window.addEventListener("storage", storedPreferenceChanged);
    enforcePrivacy();
    if (analyticsAllowed()) void flushQueuedEvents();

    return () => {
      document.removeEventListener("click", trackAnnotatedClick, { capture: true });
      window.removeEventListener("online", flushWhenOnline);
      window.removeEventListener("pagehide", flushOnDeparture);
      window.removeEventListener(ANALYTICS_PREFERENCE_EVENT, preferenceChanged);
      window.removeEventListener("storage", storedPreferenceChanged);
      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
        retryTimer = null;
      }
    };
  }, []);

  useEffect(() => {
    const sendHeartbeatWhenDue = () => {
      if (document.visibilityState !== "visible") return;
      if (!analyticsAllowed()) {
        clearAnalyticsTransientState();
        return;
      }
      const now = Date.now();
      if (now - lastHeartbeatAt.current < HEARTBEAT_INTERVAL_MS) return;
      lastHeartbeatAt.current = now;
      trackSiteEvent("heartbeat");
    };
    const visibilityChanged = () => {
      if (document.visibilityState === "visible") sendHeartbeatWhenDue();
    };
    const storedPreferenceChanged = (event: StorageEvent) => {
      if (event.key === ANALYTICS_OPT_OUT_KEY) sendHeartbeatWhenDue();
    };

    sendHeartbeatWhenDue();
    const timer = window.setInterval(
      sendHeartbeatWhenDue,
      HEARTBEAT_INTERVAL_MS,
    );
    document.addEventListener("visibilitychange", visibilityChanged);
    window.addEventListener(ANALYTICS_PREFERENCE_EVENT, sendHeartbeatWhenDue);
    window.addEventListener("storage", storedPreferenceChanged);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", visibilityChanged);
      window.removeEventListener(
        ANALYTICS_PREFERENCE_EVENT,
        sendHeartbeatWhenDue,
      );
      window.removeEventListener("storage", storedPreferenceChanged);
    };
  }, []);

  return null;
}
