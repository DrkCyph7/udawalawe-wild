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
    default: "Udawalawe Safari Jeep | Book a Private Jeep Safari | Udawalawe Wild",
  },
  description:
    "Udawalawe safari jeep tours — 100% private jeeps, expert local drivers. WhatsApp: +94 74 380 7446. Competitive jeep safari prices, instant booking, wild elephant encounters in Udawalawe National Park.",
  keywords: [
    // Primary brand
    "Udawalawe", "Udawalawa", "Udawalawa Wild", "Udawalawe Wild",
    // TOP GSC queries (exact match)
    "udawalawe safari jeep",
    "udawalawe safari jeep service",
    "udawalawe safari jeep contact number",
    "udawalawe safari jeep price",
    "udawalawe jeep safari price",
    "udawalawe safari jeep tours",
    "udawalawe safari jeep price for locals",
    "udawalawe national park jeep",
    "udawalawe national park safari jeep",
    "jeep safari udawalawe",
    "safari jeep sri lanka",
    "jeep safari in sri lanka",
    "jeep safari near me",
    "safari jeep near me",
    "4x4 tours near me",
    "safari jeep tour",
    "udawalwa safari",
    "udawalawa safari",
    // Safari core terms
    "Udawalawe safari", "Udawalawa safari",
    "Udawalawe safaris", "Udawalawa safaris",
    "Udawalawe safari tours", "Udawalawa safari tours",
    "Udawalawe jeep safari", "Udawalawa jeep safari",
    "Udawalawe private safari", "Udawalawa private safari",
    "Udawalawe wild safari", "Udawalawa wild safari",
    "udawalawe wild safari tours",
    // Service & contact
    "Udawalawe safari service", "Udawalawa safari service",
    "Udawalawe national park booking",
    "Udawalawe national park safari booking",
    "safari booking Sri Lanka",
    // Pricing
    "Udawalawe safari price", "Udawalawe safari cost",
    "jeep safari price Sri Lanka",
    "Udawalawe safari price for locals",
    // Geographic
    "safari Sri Lanka", "Udawalawe Sri Lanka", "Udawalawa Sri Lanka",
    "safari udawalawe national park", "safari sri lanka udawalawe",
    "udawalawe national park safari",
    // Animal / experience
    "Wild Asia", "elephant safari", "elephant safari Sri Lanka",
    "elephant safari near me",
    "Udawalawe elephant safari", "Udawalawa elephant safari",
    "elephant conservation Sri Lanka",
    // Long-tail
    "Udawalawe National Park", "private jeep safari Sri Lanka",
    "best safari Sri Lanka", "Sri Lanka wildlife safari",
    "Elephant Transit Home", "ethical safari Sri Lanka",
    "morning safari Udawalawe", "afternoon safari Udawalawe",
    "wildlife photography Sri Lanka", "leopard sighting Sri Lanka",
    "bird watching Udawalawe", "family safari Udawalawe",
    "sustainable safari Sri Lanka",
  ],
  authors: [{ name: "Udawalawe Wild" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    siteName: "Udawalawe Wild",
    url: "https://www.udawalawe-wild.com",
    title: "Udawalawe Safari Jeep | Private Jeep Safari Sri Lanka | Udawalawe Wild",
    description:
      "Private safari jeep tours in Udawalawe National Park — wild elephants, expert local drivers. WhatsApp +94 74 380 7446. Competitive prices, instant booking.",
    images: [
      {
        url: "https://www.udawalawe-wild.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Private safari jeep in Udawalawe National Park, Sri Lanka — Udawalawe Wild",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Safari Jeep | Private Jeep Safari Sri Lanka",
    description:
      "Private safari jeep tours in Udawalawe National Park — wild elephants, expert local drivers. WhatsApp +94 74 380 7446. Competitive prices, instant booking.",
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
                  alternateName: ["Udawalawa Wild", "Udawalawe Wild Safari", "Udawalawa Wild Safari", "Udawalawe Safari Jeep"],
                  url: "https://www.udawalawe-wild.com",
                  logo: "https://www.udawalawe-wild.com/og-image.png",
                  telephone: "+94743807446",
                  email: "hello@udawalawe-wild.com",
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+94743807446",
                      contactType: "reservations",
                      areaServed: "LK",
                      availableLanguage: ["English", "Sinhala"],
                    },
                    {
                      "@type": "ContactPoint",
                      telephone: "+94743807446",
                      contactType: "customer service",
                      areaServed: "LK",
                      availableLanguage: ["English", "Sinhala"],
                    },
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Udawalawe",
                    addressRegion: "Uva Province",
                    addressCountry: "LK",
                  },
                  sameAs: [
                    "https://maps.app.goo.gl/FMj8GgqVGXFyc9zQ7",
                    "https://wa.me/94743807446",
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
                  alternateName: ["Udawalawa Wild", "Udawalawa Safari Service", "Udawalawe Safari Service", "Udawalawe Safari Jeep"],
                  description: "Private safari jeep tours in Udawalawe National Park, Sri Lanka. Expert local guides specialising in elephant safaris, wildlife photography, and responsible wild Asia experiences.",
                  url: "https://www.udawalawe-wild.com",
                  telephone: "+94743807446",
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
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+94743807446",
                      contactType: "reservations",
                      areaServed: "LK",
                      availableLanguage: ["English", "Sinhala"],
                    },
                  ],
                  areaServed: [
                    { "@type": "Place", name: "Udawalawe National Park, Sri Lanka" },
                    { "@type": "Place", name: "Udawalawa National Park, Sri Lanka" },
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Safari Jeep Packages",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Udawalawe Safari Jeep Tour" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Morning Elephant Safari Jeep Udawalawe" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Day Wildlife Safari Jeep Sri Lanka" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Udawalawa Safari Jeep Service" } },
                    ],
                  },
                  sameAs: [
                    "https://maps.app.goo.gl/FMj8GgqVGXFyc9zQ7",
                    "https://wa.me/94743807446",
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
