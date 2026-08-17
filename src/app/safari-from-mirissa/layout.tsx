import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Mirissa — Routes & Transport",
  description: "How to travel from Mirissa to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Mirissa",
    description: "Travel routes and safari packages from Mirissa.",
    url: "https://www.udawalawe-wild.com/safari-from-mirissa",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-mirissa",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
