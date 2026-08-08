import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SafariLoader } from "@/components/safari-loader";
import { CurtainProvider } from "@/components/curtain-provider";
import { TransitionLink as Link } from "@/components/transition-link";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import notFoundBg from "@/assets/wildlife.jpg";
import { Compass } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[oklch(0.1_0.02_150)] text-white selection:bg-primary/30">
      {/* Background Image with animated scale and overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={notFoundBg}
          alt="Lost in the wild"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[oklch(0.97_0.018_80)] backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-primary" />
            Error 404
          </span>
          <h1 className="mt-6 font-serif text-6xl tracking-tight sm:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Lost in the wild.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            It looks like you've wandered off the trail. The page you're looking for has been moved or doesn't exist.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground shadow-xl transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative z-10">Return to camp</span>
          </Link>
          <Link
            to="/safaris"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            Explore safaris
          </Link>
        </motion.div>
      </div>
      
      {/* Footer minimal logo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <Link to="/" className="group">
          <img src="/logo.png" alt="Udawalawe Wild" className="h-10 w-10 rounded-full border border-white/20 opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" />
        </Link>
      </motion.div>
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
      <CurtainProvider>
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
      </CurtainProvider>
    </QueryClientProvider>
  );
}
