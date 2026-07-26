import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Site base URL for absolute canonical links in the sitemap.
const BASE_URL = "https://udawalawe-wild.vercel.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  // ISO date (YYYY-MM-DD) this page's content last meaningfully changed.
  // Update this when you actually edit a page's content — search engines
  // use it as a freshness signal, so a stale/inaccurate date is worse than
  // omitting it entirely.
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Set to the date these pages' content was last actually edited.
        // Do NOT derive this from the current request time — a lastmod that
        // silently changes on every crawl looks fake to search engines and
        // defeats the point of the freshness signal. Bump it by hand (or
        // per-entry) when you actually change a page.
        const lastUpdated = "2026-07-26";
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: lastUpdated },
          { path: "/safaris", changefreq: "monthly", priority: "0.9", lastmod: lastUpdated },
          { path: "/ethical-safari", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/guide", changefreq: "monthly", priority: "0.8", lastmod: lastUpdated },
          { path: "/routes", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/safari-from-ella", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/safari-from-mirissa", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/safari-from-galle", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/safari-from-hiriketiya", changefreq: "monthly", priority: "0.7", lastmod: lastUpdated },
          { path: "/about", changefreq: "yearly", priority: "0.5", lastmod: lastUpdated },
          { path: "/privacy", changefreq: "yearly", priority: "0.2", lastmod: lastUpdated },
          { path: "/terms", changefreq: "yearly", priority: "0.2", lastmod: lastUpdated },
          { path: "/cancellation-policy", changefreq: "yearly", priority: "0.3", lastmod: lastUpdated },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
