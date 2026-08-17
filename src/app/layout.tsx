import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { ClientLayout } from "@/components/client-layout";
import "./globals.css";

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
  title: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka",
  description: "Book the best private safari in Udawalawe National Park, Sri Lanka. Verified local guides, ethical wildlife-first approach, transparent pricing. Morning & afternoon safaris, Elephant Transit Home combo. 4.9★ rated.",
  keywords: "Udawalawe safari, Udawalawe National Park, safari Sri Lanka, private safari Udawalawe, Elephant Transit Home, wildlife safari Sri Lanka, best safari Sri Lanka, Udawalawe jeep safari, morning safari Udawalawe, ethical safari Sri Lanka, Udawalawe elephant safari, Sri Lanka national parks, wildlife photography Sri Lanka, family safari Udawalawe, afternoon safari Udawalawe, Udawalawe safari price, sustainable safari Sri Lanka, leopard sighting Udawalawe, bird watching Udawalawe, Udawalawe jeep hire, safari booking Sri Lanka, Udawalawe Safari tours",
  authors: [{ name: "Udawalawe Wild" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    siteName: "Udawalawe Wild",
    url: "https://www.udawalawe-wild.com",
    title: "Udawalawe Wild — #1 Private Safari in Udawalawe, Sri Lanka",
    description: "Book the best private safari in Udawalawe National Park, Sri Lanka. Verified local guides, ethical wildlife approach, transparent pricing. 4.9★ rated by 500+ travellers.",
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
    description: "Private, wildlife-first safaris in Udawalawe National Park with verified local guides. Transparent pricing, ethical approach. Book online.",
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
    <html lang="en" className="bg-[#2a3d2a] text-[#333a33]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: "Udawalawe Wild",
              description:
                "The #1 rated private jeep safari experience in Udawalawe National Park, Sri Lanka.",
              url: "https://www.udawalawe-wild.com",
              telephone: "+94701234567",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Udawalawe",
                addressRegion: "Sabaragamuwa Province",
                addressCountry: "LK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.435,
                longitude: 80.887,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "524",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "35",
                highPrice: "150",
                offerCount: "4",
              },
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
