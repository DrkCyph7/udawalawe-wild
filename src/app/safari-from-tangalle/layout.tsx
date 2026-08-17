import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Tangalle — Routes & Transport",
  description: "How to travel from Tangalle to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Tangalle",
    description: "Travel routes and safari packages from Tangalle.",
    url: "https://www.udawalawe-wild.com/safari-from-tangalle",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-tangalle",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
