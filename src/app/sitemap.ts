import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.udawalawe-wild.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/about',
    '/safaris',
    '/book',
    '/guide',
    '/routes',
    '/ethical-safari',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic safari location routes
  const locationRoutes = [
    '/safari-from-ella',
    '/safari-from-mirissa',
    '/safari-from-galle',
    '/safari-from-colombo',
    '/safari-from-kandy',
    '/safari-from-tangalle',
    '/safari-from-hiriketiya',
    '/safari-from-nuwara-eliya',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Legal routes
  const legalRoutes = [
    '/privacy',
    '/terms',
    '/cancellation-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...locationRoutes, ...legalRoutes];
}
