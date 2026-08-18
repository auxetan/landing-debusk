const ALLOWED_EVENTS = new Set([
  "page_view",
  "store_click",
  "contact_open",
  "contact_submit",
  "guide_open",
  "web_vital",
  "engagement",
  "heartbeat",
]);

const PRODUCTION_ORIGINS = new Set([
  "https://debusk.fr",
  "https://www.debusk.fr",
]);
const SUPABASE_EDGE_RELAY =
  "https://qiclhepeypcgxawolaxk.supabase.co/functions/v1/track-site-event";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const VIEWPORTS = new Set(["xs", "sm", "md", "lg", "xl"]);
const BROWSERS = new Set([
  "chrome",
  "safari",
  "firefox",
  "edge",
  "opera",
  "samsung",
  "other",
  "bot",
  "unknown",
]);
const OPERATING_SYSTEMS = new Set([
  "ios",
  "android",
  "windows",
  "macos",
  "linux",
  "chromeos",
  "other",
  "unknown",
]);

type ClientAnalyticsPayload = {
  event_name: string;
  session_id: string;
  path?: string;
  referrer?: string | null;
  viewport?: string;
  properties?: Record<string, unknown>;
};

type ServerDimensions = {
  country_code: string | null;
  region_code: string | null;
  latitude_bucket: number | null;
  longitude_bucket: number | null;
  browser: string;
  os: string;
  language: string | null;
  device: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function response(status: number) {
  return new Response(null, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function requestIsSameSite(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;
  if (PRODUCTION_ORIGINS.has(origin)) return true;
  try {
    return origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function clientAllowsAnalytics(request: Request) {
  return request.headers.get("dnt") !== "1" &&
    request.headers.get("sec-gpc") !== "1";
}

function validClientPayload(value: unknown): value is ClientAnalyticsPayload {
  if (!isRecord(value)) return false;
  return typeof value.event_name === "string" &&
    ALLOWED_EVENTS.has(value.event_name) &&
    typeof value.session_id === "string" &&
    UUID_PATTERN.test(value.session_id) &&
    (value.path === undefined || typeof value.path === "string") &&
    (value.referrer === undefined || value.referrer === null ||
      typeof value.referrer === "string") &&
    (value.viewport === undefined || typeof value.viewport === "string") &&
    (value.properties === undefined || isRecord(value.properties));
}

function boundedString(
  value: unknown,
  maxLength: number,
  pattern?: RegExp,
) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, maxLength);
  if (!normalized || (pattern && !pattern.test(normalized))) return null;
  return normalized;
}

function sanitizeProperties(
  eventName: string,
  value: Record<string, unknown> | undefined,
): Record<string, string | number> | null {
  const properties = value ?? {};

  if (eventName === "page_view") {
    const result: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
      const item = boundedString(properties[key], 80);
      if (item) result[key] = item;
    }
    return result;
  }

  if (eventName === "store_click") {
    return properties.store === "app_store" || properties.store === "google_play"
      ? { store: properties.store }
      : null;
  }

  if (eventName === "guide_open") {
    const guide = boundedString(properties.guide, 160);
    return guide ? { guide } : null;
  }

  if (eventName === "contact_submit") {
    const category = boundedString(properties.category, 64);
    return category ? { category } : null;
  }

  if (eventName === "web_vital") {
    const metric = properties.metric;
    const rating = properties.rating;
    const valueNumber = properties.value;
    if (
      !["LCP", "CLS", "INP", "TTFB"].includes(String(metric)) ||
      !["good", "needs-improvement", "poor"].includes(String(rating)) ||
      typeof valueNumber !== "number" ||
      !Number.isFinite(valueNumber)
    ) {
      return null;
    }
    const maximum = metric === "CLS"
      ? 10
      : metric === "INP"
        ? 60_000
        : 120_000;
    if (valueNumber < 0 || valueNumber > maximum) return null;
    if (metric !== "CLS" && !Number.isInteger(valueNumber)) return null;
    if (metric === "CLS" && valueNumber !== Number(valueNumber.toFixed(3))) {
      return null;
    }
    return {
      metric: String(metric),
      value: valueNumber,
      rating: String(rating),
    };
  }

  if (eventName === "engagement") {
    const activeSeconds = properties.active_seconds;
    const scrollDepth = properties.scroll_depth;
    if (
      !Number.isInteger(activeSeconds) ||
      (activeSeconds as number) < 1 ||
      (activeSeconds as number) > 1_800 ||
      ![0, 25, 50, 75, 100].includes(scrollDepth as number)
    ) {
      return null;
    }
    return {
      active_seconds: activeSeconds as number,
      scroll_depth: scrollDepth as number,
    };
  }

  // contact_open and heartbeat deliberately carry no client properties.
  return {};
}

function normalizedCode(value: string | null, pattern: RegExp) {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return pattern.test(normalized) ? normalized : null;
}

function coordinateBucket(value: string | null, minimum: number, maximum: number) {
  if (!value) return null;
  const coordinate = Number(value);
  if (!Number.isFinite(coordinate) || coordinate < minimum || coordinate > maximum) {
    return null;
  }
  const rounded = Math.round(coordinate);
  return Object.is(rounded, -0) ? 0 : rounded;
}

function primaryLanguage(value: string | null) {
  if (!value) return null;
  const match = value.split(",", 1)[0]?.trim().match(/^([a-z]{2})(?:-|$)/i);
  return match?.[1]?.toLowerCase() ?? null;
}

function serverTechnology(userAgent: string | null) {
  if (!userAgent) {
    return { browser: "unknown", os: "unknown", device: "unknown" };
  }

  const ua = userAgent.toLowerCase();
  const isBot = /bot|crawler|spider|slurp|headless|lighthouse|pagespeed/.test(ua);
  if (isBot) return { browser: "bot", os: "unknown", device: "bot" };

  let browser = "other";
  if (/edg(?:e|a|ios)?\//.test(ua)) browser = "edge";
  else if (/opr\/|opera/.test(ua)) browser = "opera";
  else if (/samsungbrowser\//.test(ua)) browser = "samsung";
  else if (/firefox\/|fxios\//.test(ua)) browser = "firefox";
  else if (/chrome\/|crios\//.test(ua)) browser = "chrome";
  else if (/safari\//.test(ua)) browser = "safari";

  let os = "other";
  if (/iphone|ipad|ipod/.test(ua)) os = "ios";
  else if (/android/.test(ua)) os = "android";
  else if (/windows nt/.test(ua)) os = "windows";
  else if (/cros/.test(ua)) os = "chromeos";
  else if (/mac os x|macintosh/.test(ua)) os = "macos";
  else if (/linux/.test(ua)) os = "linux";

  let device = "desktop";
  if (/ipad|tablet|android(?!.*mobile)/.test(ua)) device = "tablet";
  else if (/mobile|iphone|ipod|android/.test(ua)) device = "mobile";

  return {
    browser: BROWSERS.has(browser) ? browser : "other",
    os: OPERATING_SYSTEMS.has(os) ? os : "other",
    device,
  };
}

function serverDimensions(request: Request): ServerDimensions {
  const technology = serverTechnology(request.headers.get("user-agent"));
  const latitude = coordinateBucket(
    request.headers.get("x-vercel-ip-latitude"),
    -90,
    90,
  );
  const longitude = coordinateBucket(
    request.headers.get("x-vercel-ip-longitude"),
    -180,
    180,
  );
  const hasCoordinatePair = latitude !== null && longitude !== null;
  return {
    country_code: normalizedCode(
      request.headers.get("x-vercel-ip-country"),
      /^[A-Z]{2}$/,
    ),
    region_code: normalizedCode(
      request.headers.get("x-vercel-ip-country-region"),
      /^[A-Z0-9]{1,3}$/,
    ),
    latitude_bucket: hasCoordinatePair ? latitude : null,
    longitude_bucket: hasCoordinatePair ? longitude : null,
    browser: technology.browser,
    os: technology.os,
    language: primaryLanguage(request.headers.get("accept-language")),
    device: technology.device,
  };
}

export async function POST(request: Request) {
  if (!requestIsSameSite(request)) return response(403);
  if (!clientAllowsAnalytics(request)) return response(204);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 2_048) {
    return response(413);
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 2_048) return response(413);
    payload = JSON.parse(raw);
  } catch {
    return response(400);
  }
  if (!validClientPayload(payload)) return response(400);

  const properties = sanitizeProperties(payload.event_name, payload.properties);
  if (!properties) return response(400);

  const origin = request.headers.get("origin") ?? "";
  if (!PRODUCTION_ORIGINS.has(origin)) {
    // Preview and local builds stay inert.
    return response(204);
  }

  const dimensions = serverDimensions(request);
  // Rebuild the relay body field by field. Client-supplied geo, user-agent,
  // language, browser, OS and device fields are never forwarded.
  const enrichedPayload = {
    event_name: payload.event_name,
    session_id: payload.session_id,
    path: payload.path ?? "/",
    referrer: payload.referrer ?? null,
    device: dimensions.device,
    properties,
    country_code: dimensions.country_code,
    region_code: dimensions.region_code,
    latitude_bucket: dimensions.latitude_bucket,
    longitude_bucket: dimensions.longitude_bucket,
    browser: dimensions.browser,
    os: dimensions.os,
    language: dimensions.language,
    viewport: payload.viewport && VIEWPORTS.has(payload.viewport)
      ? payload.viewport
      : "unknown",
  };

  try {
    const edgeResponse = await fetch(SUPABASE_EDGE_RELAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify(enrichedPayload),
      cache: "no-store",
    });
    return response(edgeResponse.ok ? 202 : 502);
  } catch {
    return response(502);
  }
}
