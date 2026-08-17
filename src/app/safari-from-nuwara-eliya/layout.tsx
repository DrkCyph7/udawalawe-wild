import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Nuwara Eliya — Routes & Transport",
  description: "How to travel from Nuwara Eliya to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Nuwara Eliya",
    description: "Travel routes and safari packages from Nuwara Eliya.",
    url: "https://www.udawalawe-wild.com/safari-from-nuwara-eliya",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-nuwara-eliya",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
