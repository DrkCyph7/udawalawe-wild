import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Galle — Routes & Transport",
  description: "How to travel from Galle to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Galle",
    description: "Travel routes and safari packages from Galle.",
    url: "https://www.udawalawe-wild.com/safari-from-galle",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-galle",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
