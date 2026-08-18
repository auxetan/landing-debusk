"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackSiteEvent } from "./SiteAnalytics";

type WebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const SUPPORTED_METRICS = new Set(["LCP", "CLS", "INP", "TTFB"]);
const SUPPORTED_RATINGS = new Set(["good", "needs-improvement", "poor"]);

const reportWebVital: WebVitalsCallback = (metric) => {
  if (!SUPPORTED_METRICS.has(metric.name)) return;
  if (!SUPPORTED_RATINGS.has(metric.rating)) return;
  if (!Number.isFinite(metric.value)) return;

  const maximum = metric.name === "CLS"
    ? 10
    : metric.name === "INP"
      ? 60_000
      : 120_000;
  const bounded = Math.min(maximum, Math.max(0, metric.value));
  const value = metric.name === "CLS"
    ? Number(bounded.toFixed(3))
    : Math.round(bounded);

  trackSiteEvent("web_vital", {
    metric: metric.name,
    value,
    rating: metric.rating,
  });
};

export function WebVitals() {
  useReportWebVitals(reportWebVital);
  return null;
}
