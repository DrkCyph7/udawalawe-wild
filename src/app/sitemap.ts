import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.udawalawe-wild.com";

  // Core static routes
  const staticRoutes = [
    "",
    "/about",
    "/safaris",
    "/book",
    "/guide",
    "/routes",
    "/ethical-safari",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const guideRoutes = [
    "/guide/udawalawe-safari-cost",
    "/guide/best-time",
    "/guide/morning-vs-afternoon",
    "/guide/animals",
    "/guide/what-to-bring",
    "/guide/udawalawe-vs-yala",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic safari location routes
  const locationRoutes = [
    "/routes/ella-to-udawalawe",
    "/routes/mirissa-to-udawalawe",
    "/routes/galle-to-udawalawe",
    "/routes/colombo-to-udawalawe",
    "/routes/kandy-to-udawalawe",
    "/routes/tangalle-to-udawalawe",
    "/routes/hiriketiya-to-udawalawe",
    "/routes/nuwara-eliya-to-udawalawe",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Legal routes
  const legalRoutes = ["/privacy", "/terms", "/cancellation-policy"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...guideRoutes, ...locationRoutes, ...legalRoutes];
}
