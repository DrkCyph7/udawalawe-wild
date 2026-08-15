/**
 * geo.ts — lightweight client-side geo-IP lookup.
 *
 * Uses ipapi.co (free tier: 30 k req/month, no API key required).
 * Falls back gracefully with nulls if the request fails or is blocked
 * (e.g. ad-blockers, VPNs, or network errors).
 *
 * The lookup runs CONCURRENTLY with the Supabase insert so it adds
 * zero latency to the perceived booking flow.
 */

export interface GeoInfo {
  ip: string | null;
  country_code: string | null; // ISO 3166-1 alpha-2, e.g. "DE"
  country_name: string | null; // e.g. "Germany"
  city: string | null;
}

const GEO_TIMEOUT_MS = 4000; // give up after 4 s

/**
 * Fetch the visitor's public IP and country.
 * Always resolves — never rejects.
 */
export async function fetchGeoInfo(): Promise<GeoInfo> {
  const empty: GeoInfo = {
    ip: null,
    country_code: null,
    country_name: null,
    city: null,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      // No credentials, no cookies — pure IP lookup.
      credentials: "omit",
      cache: "no-store",
    });

    clearTimeout(timer);

    if (!res.ok) return empty;

    // ipapi.co returns an error field when rate-limited or blocked.
    const json = (await res.json()) as Record<string, unknown>;
    if (json.error) return empty;

    return {
      ip: typeof json.ip === "string" ? json.ip : null,
      country_code: typeof json.country_code === "string" ? json.country_code : null,
      country_name: typeof json.country_name === "string" ? json.country_name : null,
      city: typeof json.city === "string" ? json.city : null,
    };
  } catch {
    // AbortError, NetworkError, JSON parse error — all silently ignored.
    return empty;
  }
}
