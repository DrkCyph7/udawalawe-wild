import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Colombo — Routes & Transport",
  description: "How to travel from Colombo to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Colombo",
    description: "Travel routes and safari packages from Colombo.",
    url: "https://www.udawalawe-wild.com/safari-from-colombo",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-colombo",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
