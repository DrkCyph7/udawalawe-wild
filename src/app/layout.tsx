import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { ClientLayout } from "@/components/client-layout";
import "./globals.css";

import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2a3d2a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.udawalawe-wild.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Udawalawe Wild",
    default: "Udawalawe Safari | Private Jeep Safari Sri Lanka | Udawalawe Wild",
  },
  description:
    "Book a private Udawalawe safari in Sri Lanka — the best elephant safari in Asia. Udawalawa Wild offers exclusive jeep safaris in Udawalawe National Park with expert local guides. No shared vehicles, no hidden fees.",
  keywords: [
    // Primary brand spellings (both correct & common misspelling)
    "Udawalawe", "Udawalawa",
    "Udawalawe Wild", "Udawalawa Wild",
    // Safari — core terms
    "Udawalawe safari", "Udawalawa safari",
    "Udawalawe safaris", "Udawalawa safaris",
    "Udawalawe wild safari", "Udawalawa wild safari",
    // Service type
    "Udawalawe safari service", "Udawalawa safari service",
    "Udawalawe jeep safari", "Udawalawa jeep safari",
    "Udawalawe private safari", "Udawalawa private safari",
    // Geographic / regional
    "safari Sri Lanka", "Safari Sri Lanka",
    "Udawalawe Sri Lanka", "Udawalawa Sri Lanka",
    // Animal / experience keywords
    "Wild Asia", "elephant safari", "elephant safari Sri Lanka",
    "Udawalawe elephant safari", "Udawalawa elephant safari",
    // Long-tail variations
    "Udawalawe National Park", "private jeep safari Sri Lanka",
    "best safari Sri Lanka", "Sri Lanka wildlife safari",
    "Elephant Transit Home", "ethical safari Sri Lanka",
    "morning safari Udawalawe", "afternoon safari Udawalawe",
    "Udawalawe safari price", "Udawalawe safari cost",
    "safari booking Sri Lanka", "wildlife photography Sri Lanka",
    "leopard sighting Sri Lanka", "bird watching Udawalawe",
    "family safari Udawalawe", "Udawalawe jeep hire",
    "sustainable safari Sri Lanka", "Wild Asia safari",
  ],
  authors: [{ name: "Udawalawe Wild" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    siteName: "Udawalawe Wild",
    url: "https://www.udawalawe-wild.com",
    title: "Udawalawe Wild — Private Jeep Safari in Udawalawe, Sri Lanka",
    description:
      "Book a private Udawalawe safari in Sri Lanka — the best elephant safari in Asia. Expert local guides, 100% private jeeps, no hidden fees. Udawalawa Wild safari service.",
    images: [
      {
        url: "https://www.udawalawe-wild.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wild elephants in Udawalawe National Park, Sri Lanka — Udawalawa Wild Safari",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Wild — Private Jeep Safari Sri Lanka",
    description:
      "Book a private Udawalawe safari in Sri Lanka — the best elephant safari in Asia. Expert local guides, 100% private jeeps, no hidden fees. Udawalawa Wild safari service.",
    images: ["https://www.udawalawe-wild.com/og-image.png"],
    site: "@udawalawewild",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Udawalawe Wild",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-[#2a3d2a] text-[#333a33] ${fraunces.variable} ${inter.variable}`}
    >
      <head></head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.udawalawe-wild.com/#organization",
                  name: "Udawalawe Wild",
                  alternateName: ["Udawalawa Wild", "Udawalawe Wild Safari", "Udawalawa Wild Safari"],
                  url: "https://www.udawalawe-wild.com",
                  logo: "https://www.udawalawe-wild.com/og-image.png",
                  telephone: "+94701234567",
                  email: "hello@udawalawe-wild.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Udawalawe",
                    addressRegion: "Uva Province",
                    addressCountry: "LK",
                  },
                  sameAs: [
                    "https://maps.app.goo.gl/FMj8GgqVGXFyc9zQ7",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.udawalawe-wild.com/#website",
                  url: "https://www.udawalawe-wild.com",
                  name: "Udawalawe Wild",
                  alternateName: "Udawalawa Wild",
                  publisher: {
                    "@id": "https://www.udawalawe-wild.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.udawalawe-wild.com/guide?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": ["LocalBusiness", "TouristInformationCenter"],
                  "@id": "https://www.udawalawe-wild.com/#localbusiness",
                  name: "Udawalawe Wild",
                  alternateName: ["Udawalawa Wild", "Udawalawa Safari Service", "Udawalawe Safari Service"],
                  description: "Private jeep safari operator in Udawalawe National Park, Sri Lanka. Specialising in elephant safaris and wildlife experiences.",
                  url: "https://www.udawalawe-wild.com",
                  telephone: "+94701234567",
                  email: "hello@udawalawe-wild.com",
                  priceRange: "$$",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Udawalawe",
                    addressRegion: "Uva Province",
                    addressCountry: "LK",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 6.435,
                    longitude: 80.887,
                  },
                  areaServed: {
                    "@type": "Place",
                    name: "Udawalawe National Park, Sri Lanka",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Safari Packages",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Udawalawe Jeep Safari" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Morning Elephant Safari Udawalawe" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Day Wildlife Safari Sri Lanka" } },
                    ],
                  },
                  sameAs: [
                    "https://maps.app.goo.gl/FMj8GgqVGXFyc9zQ7",
                  ],
                },
              ],
            }),
          }}
        />
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
