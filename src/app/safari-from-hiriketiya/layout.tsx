import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari from Hiriketiya — Routes & Transport",
  description: "How to travel from Hiriketiya to Udawalawe National Park. Safari packages, taxi transfers, and travel times.",
  openGraph: {
    title: "Udawalawe Safari from Hiriketiya",
    description: "Travel routes and safari packages from Hiriketiya.",
    url: "https://www.udawalawe-wild.com/safari-from-hiriketiya",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safari-from-hiriketiya",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
