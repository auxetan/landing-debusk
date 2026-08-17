const ALLOWED_EVENTS = new Set([
  "page_view",
  "store_click",
  "contact_open",
  "contact_submit",
  "guide_open",
]);

const PRODUCTION_ORIGINS = new Set([
  "https://debusk.fr",
  "https://www.debusk.fr",
]);

type AnalyticsPayload = {
  event_name: string;
  session_id: string;
  path?: string;
  referrer?: string | null;
  device?: string;
  properties?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validPayload(value: unknown): value is AnalyticsPayload {
  if (!isRecord(value)) return false;
  return typeof value.event_name === "string"
    && ALLOWED_EVENTS.has(value.event_name)
    && typeof value.session_id === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.session_id)
    && (value.path === undefined || typeof value.path === "string")
    && (value.referrer === undefined || value.referrer === null || typeof value.referrer === "string")
    && (value.device === undefined || typeof value.device === "string")
    && (value.properties === undefined || isRecord(value.properties));
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

export async function POST(request: Request) {
  if (!requestIsSameSite(request)) {
    return new Response(null, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 2_048) {
    return new Response(null, { status: 413 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 2_048) return new Response(null, { status: 413 });
    payload = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!validPayload(payload)) return new Response(null, { status: 400 });

  const supabaseUrl = process.env.DEBUSK_ANALYTICS_SUPABASE_URL;
  const supabaseAnonKey = process.env.DEBUSK_ANALYTICS_SUPABASE_ANON_KEY;
  const ingestToken = process.env.DEBUSK_ANALYTICS_INGEST_TOKEN;
  if (!supabaseUrl || !supabaseAnonKey || !ingestToken) {
    // A missing deployment setting disables collection without affecting pages.
    return new Response(null, { status: 204 });
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/rpc_track_site_event`,
      {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_event_name: payload.event_name,
          p_ingest_token: ingestToken,
          p_session_id: payload.session_id,
          p_path: payload.path ?? "/",
          p_referrer: payload.referrer ?? null,
          p_device: payload.device ?? "unknown",
          p_properties: payload.properties ?? {},
        }),
      },
    );
    if (!response.ok) return new Response(null, { status: 502 });
    return new Response(null, { status: 202 });
  } catch {
    return new Response(null, { status: 502 });
  }
}
