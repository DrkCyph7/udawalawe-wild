import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Ella — Routes & Transport",
  description: "How to travel from Ella to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Ella",
    description: "Travel routes and safari packages from Ella.",
    url: "https://www.udawalawe-wild.com/safari-from-ella",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-ella",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
