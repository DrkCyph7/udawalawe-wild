import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel routes to Udawalawe — Udawalawe Wild",
  description: "Reaching Udawalawe from Ella, Mirissa, Galle, Hiriketiya, Colombo, Kandy, Tangalle, and Nuwara Eliya. Route notes, timings, and safari + transfer options.",
  openGraph: {
    title: "Travel routes to Udawalawe",
    description: "How to reach Udawalawe from popular Sri Lankan bases.",
    type: "website",
    url: "https://www.udawalawe-wild.com/routes",
    images: ["https://www.udawalawe-wild.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.udawalawe-wild.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/routes",
  },
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
