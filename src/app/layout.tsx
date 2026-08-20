import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
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
    default: "Udawalawe Safari | Private Jeep Safari in Sri Lanka",
  },
  description: "Book a private Udawalawe safari in Sri Lanka. Explore Udawalawe National Park, elephants and wildlife with local safari operators focused on responsible, ethical experiences.",
  keywords: "Udawalawe safari, Udawalawe National Park, safari Sri Lanka, private safari Udawalawe, Elephant Transit Home, wildlife safari Sri Lanka, best safari Sri Lanka, Udawalawe jeep safari, morning safari Udawalawe, ethical safari Sri Lanka, Udawalawe elephant safari, Sri Lanka national parks, wildlife photography Sri Lanka, family safari Udawalawe, afternoon safari Udawalawe, Udawalawe safari price, sustainable safari Sri Lanka, leopard sighting Udawalawe, bird watching Udawalawe, Udawalawe jeep hire, safari booking Sri Lanka, Udawalawe Safari tours",
  authors: [{ name: "Udawalawe Wild" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    siteName: "Udawalawe Wild",
    url: "https://www.udawalawe-wild.com",
    title: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka",
    description: "Book a private Udawalawe safari in Sri Lanka. Explore Udawalawe National Park, elephants and wildlife with local safari operators focused on responsible, ethical experiences.",
    images: [
      {
        url: "https://www.udawalawe-wild.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wild elephants in Udawalawe National Park at golden hour",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka",
    description: "Book a private Udawalawe safari in Sri Lanka. Explore Udawalawe National Park, elephants and wildlife with local safari operators focused on responsible, ethical experiences.",
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
    <html lang="en" className={`bg-[#2a3d2a] text-[#333a33] ${fraunces.variable} ${inter.variable}`}>
      <head>

      </head>
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
      "name": "Udawalawe Wild",
      "url": "https://www.udawalawe-wild.com",
      "logo": "https://www.udawalawe-wild.com/og-image.png",
      "telephone": "+94701234567",
      "email": "hello@udawalawe-wild.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Udawalawe",
        "addressRegion": "Sabaragamuwa Province",
        "addressCountry": "LK"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.udawalawe-wild.com/#website",
      "url": "https://www.udawalawe-wild.com",
      "name": "Udawalawe Wild",
      "publisher": {
        "@id": "https://www.udawalawe-wild.com/#organization"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.udawalawe-wild.com/#localbusiness",
      "name": "Udawalawe Wild",
      "url": "https://www.udawalawe-wild.com",
      "telephone": "+94701234567",
      "email": "hello@udawalawe-wild.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Udawalawe",
        "addressRegion": "Sabaragamuwa Province",
        "addressCountry": "LK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.435,
        "longitude": 80.887
      }
    }
  ]
}),
          }}
        />
        <Providers>
          <ClientLayout>{children}</ClientLayout>
          <StickyMobileCTA />
        </Providers>
      </body>
    </html>
  );
}
