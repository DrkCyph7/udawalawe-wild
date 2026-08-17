import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Kandy — Routes & Transport",
  description: "How to travel from Kandy to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Kandy",
    description: "Travel routes and safari packages from Kandy.",
    url: "https://www.udawalawe-wild.com/safari-from-kandy",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-kandy",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
