import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SafariLoader } from "@/components/safari-loader";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka" },
      {
        name: "description",
        content:
          "Book the best private safari in Udawalawe National Park, Sri Lanka. Verified local guides, ethical wildlife-first approach, transparent pricing. Morning & afternoon safaris, Elephant Transit Home combo. 4.9★ rated.",
      },
      {
        name: "keywords",
        content:
          "Udawalawe safari, Udawalawe National Park, safari Sri Lanka, private safari Udawalawe, Elephant Transit Home, wildlife safari Sri Lanka, best safari Sri Lanka, Udawalawe jeep safari, morning safari Udawalawe, ethical safari Sri Lanka",
      },
      { name: "author", content: "Udawalawe Wild" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#2a3d2a" },
      { name: "geo.region", content: "LK" },
      { name: "geo.placename", content: "Udawalawe, Sri Lanka" },
      { name: "geo.position", content: "6.4710;80.8936" },
      { name: "ICBM", content: "6.4710, 80.8936" },
      { name: "language", content: "English" },
      { name: "revisit-after", content: "7 days" },
      { property: "og:site_name", content: "Udawalawe Wild" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com" },
      { property: "og:title", content: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka" },
      {
        property: "og:description",
        content:
          "Book the best private safari in Udawalawe National Park, Sri Lanka. Verified local guides, ethical wildlife approach, transparent pricing. 4.9★ rated by 500+ travellers.",
      },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Wild elephants in Udawalawe National Park at golden hour" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka" },
      {
        name: "twitter:description",
        content:
          "Private, wildlife-first safaris in Udawalawe National Park with verified local guides. Transparent pricing, ethical approach. Book online.",
      },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:site", content: "@udawalawewild" },
    ],
    links: [
      { rel: "canonical", href: "https://www.udawalawe-wild.com" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "icon", href: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const agencyJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Udawalawe Wild",
    "url": "https://www.udawalawe-wild.com",
    "logo": "https://www.udawalawe-wild.com/logo.png",
    "image": ["https://www.udawalawe-wild.com/og-image.png"],
    "telephone": "+94721890006",
    "email": "hello@udawalawe-wild.com",
    "priceRange": "$$",
    "currenciesAccepted": "USD, LKR, EUR, GBP",
    "paymentAccepted": "Cash, Bank Transfer, Online Payment",
    "openingHours": "Mo-Su 05:00-20:00",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Udawalawe",
      "addressRegion": "Sabaragamuwa Province",
      "addressCountry": "LK",
      "postalCode": "70190"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.4710,
      "longitude": 80.8936
    },
    "description": "Book the best private safari in Udawalawe National Park, Sri Lanka. Verified local guides, ethical wildlife-first approach, transparent pricing. Morning & afternoon jeep safaris, Elephant Transit Home combo. 4.9\u2605 rated by 500+ travellers.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Udawalawe Safari Packages",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "TouristTrip", "name": "Morning Safari Udawalawe", "description": "Private 3-4 hour morning jeep safari in Udawalawe National Park" } },
        { "@type": "Offer", "itemOffered": { "@type": "TouristTrip", "name": "Afternoon Safari Udawalawe", "description": "Private 3-4 hour afternoon jeep safari in Udawalawe National Park" } },
        { "@type": "Offer", "itemOffered": { "@type": "TouristTrip", "name": "Full Day Safari Udawalawe", "description": "Full day private jeep safari covering all zones of Udawalawe National Park" } },
        { "@type": "Offer", "itemOffered": { "@type": "TouristTrip", "name": "Safari + Elephant Transit Home Combo", "description": "Safari plus visit to ETH elephant rehabilitation centre" } }
      ]
    },
    "sameAs": [
      "https://facebook.com/udawalawe-wild",
      "https://tripadvisor.com"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Udawalawe Wild",
    "url": "https://www.udawalawe-wild.com",
    "description": "Private safari booking platform for Udawalawe National Park, Sri Lanka",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.udawalawe-wild.com/safaris?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Udawalawe Wild", "item": "https://www.udawalawe-wild.com" },
      { "@type": "ListItem", "position": 2, "name": "Safari Options", "item": "https://www.udawalawe-wild.com/safaris" },
      { "@type": "ListItem", "position": 3, "name": "Visitor Guide", "item": "https://www.udawalawe-wild.com/guide" }
    ]
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showReactLoader, setShowReactLoader] = useState(true);

  useEffect(() => {
    // Show the richer React loader for an additional ~1.8s after hydration
    const timer = setTimeout(() => setShowReactLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden relative">
        <SafariLoader visible={showReactLoader} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showReactLoader ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex min-h-screen flex-col"
        >
          <SiteHeader />
          <main className="flex-1 overflow-x-hidden relative">
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </motion.div>
      </div>
    </QueryClientProvider>
  );
}

