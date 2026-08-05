import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useLocation,
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
      { title: "Udawalawe Wild — Private safaris in Udawalawe, Sri Lanka" },
      {
        name: "description",
        content:
          "Private, wildlife-first safaris in Udawalawe National Park. Verified local partners, transparent quotes, and simple planning.",
      },
      { name: "author", content: "Udawalawe Wild" },
      { property: "og:site_name", content: "Udawalawe Wild" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://udawalawe-wild.com" },
      { property: "og:title", content: "Udawalawe Wild — Private safaris in Udawalawe, Sri Lanka" },
      {
        property: "og:description",
        content:
          "Private, wildlife-first safaris in Udawalawe National Park. Verified local partners, transparent quotes, and simple planning.",
      },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Udawalawe Wild — Private safaris in Udawalawe, Sri Lanka" },
      {
        name: "twitter:description",
        content:
          "Private, wildlife-first safaris in Udawalawe National Park. Verified local partners, transparent quotes, and simple planning.",
      },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://udawalawe-wild.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
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
    "url": "https://udawalawe-wild.com",
    "logo": "https://udawalawe-wild.com/logo.png",
    "image": "https://udawalawe-wild.com/og-image.png",
    "telephone": "+94721890006",
    "email": "hello@udawalawe-wild.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Udawalawe",
      "addressRegion": "Sabaragamuwa Province",
      "addressCountry": "LK"
    },
    "description": "Private, wildlife-first safaris in Udawalawe National Park with verified local partners and transparent pricing.",
    "sameAs": [
      "https://facebook.com/udawalawe-wild",
      "https://tripadvisor.com"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Udawalawe Wild",
    "url": "https://udawalawe-wild.com"
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
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Show splash screen for 1.8 seconds on initial load
    const timer = setTimeout(() => setInitialLoad(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const showLoader = initialLoad;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden relative">
        <SiteHeader />
        
        <AnimatePresence>
          {showLoader && <SafariLoader />}
        </AnimatePresence>

        <main className="flex-1 overflow-x-hidden relative">
          <Outlet />
        </main>
        
        <SiteFooter />
        <WhatsAppButton />
      </div>
    </QueryClientProvider>
  );
}
