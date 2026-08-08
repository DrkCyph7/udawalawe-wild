import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";

// FIXED: was non-www, now matches canonical tags (https://www.udawalawe-wild.com)
const BASE_URL = "https://www.udawalawe-wild.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  images?: { loc: string; title: string; caption?: string }[];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastUpdated = "2026-08-08";
        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "weekly",
            priority: "1.0",
            lastmod: lastUpdated,
            images: [
              { loc: `${BASE_URL}/og-image.png`, title: "Wild elephants in Udawalawe National Park", caption: "Private jeep safari with elephants at golden hour" },
            ],
          },
          { path: "/safaris", changefreq: "weekly", priority: "0.95", lastmod: lastUpdated },
          { path: "/guide", changefreq: "monthly", priority: "0.90", lastmod: lastUpdated },
          { path: "/ethical-safari", changefreq: "monthly", priority: "0.80", lastmod: lastUpdated },
          { path: "/routes", changefreq: "monthly", priority: "0.75", lastmod: lastUpdated },
          { path: "/about", changefreq: "yearly", priority: "0.60", lastmod: lastUpdated },
          // High-value location-intent pages
          { path: "/safari-from-colombo", changefreq: "monthly", priority: "0.85", lastmod: lastUpdated },
          { path: "/safari-from-ella", changefreq: "monthly", priority: "0.85", lastmod: lastUpdated },
          { path: "/safari-from-mirissa", changefreq: "monthly", priority: "0.82", lastmod: lastUpdated },
          { path: "/safari-from-galle", changefreq: "monthly", priority: "0.82", lastmod: lastUpdated },
          { path: "/safari-from-kandy", changefreq: "monthly", priority: "0.82", lastmod: lastUpdated },
          { path: "/safari-from-hiriketiya", changefreq: "monthly", priority: "0.78", lastmod: lastUpdated },
          { path: "/safari-from-tangalle", changefreq: "monthly", priority: "0.78", lastmod: lastUpdated },
          { path: "/safari-from-nuwara-eliya", changefreq: "monthly", priority: "0.78", lastmod: lastUpdated },
          // Legal / utility
          { path: "/privacy", changefreq: "yearly", priority: "0.20", lastmod: lastUpdated },
          { path: "/terms", changefreq: "yearly", priority: "0.20", lastmod: lastUpdated },
          { path: "/cancellation-policy", changefreq: "yearly", priority: "0.30", lastmod: lastUpdated },
          // NOTE: /book intentionally excluded — page is noindex + disallowed
          // in robots.txt (booking form, not indexable marketing content).
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            ...(e.images ?? []).map((img) =>
              [
                `    <image:image>`,
                `      <image:loc>${img.loc}</image:loc>`,
                `      <image:title>${img.title}</image:title>`,
                img.caption ? `      <image:caption>${img.caption}</image:caption>` : null,
                `    </image:image>`,
              ].filter(Boolean).join("\n")
            ),
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400",
            // REMOVED: X-Robots-Tag: noindex
            // This header was telling crawlers not to index the sitemap.xml
            // response itself. It's not harmful (sitemaps aren't meant to be
            // "indexed" as a page), but it's unnecessary and was flagged as
            // a confusing signal — better to omit it entirely and let the
            // file serve as a standard, unrestricted sitemap feed.
          },
        });
      },
    },
  },
});
