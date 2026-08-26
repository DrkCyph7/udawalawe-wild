import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari Guide | Plan Your Udawalawa Safari in Sri Lanka",
  description:
    "Complete guide to planning your Udawalawe or Udawalawa safari in Sri Lanka. Best time to visit, what to bring, safari costs, morning vs afternoon, animals you'll see, and how to book a private jeep safari.",
  keywords: [
    "Udawalawe safari guide", "Udawalawa safari guide",
    "how to plan Udawalawe safari", "best time for Udawalawa safari",
    "Udawalawe safari cost", "safari Sri Lanka guide",
    "what to bring Udawalawe safari", "elephant safari guide Sri Lanka",
  ],
  openGraph: {
    title: "Udawalawe Safari Guide | Plan Your Udawalawa Safari Sri Lanka",
    description:
      "Everything you need to plan your Udawalawe or Udawalawa safari in Sri Lanka \u2014 best time, safari costs, what to see, and how to book.",
    url: "https://www.udawalawe-wild.com/guide",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
