import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Get to Udawalawe | Travel Routes to Udawalawa Safari Sri Lanka",
  description:
    "How to travel to Udawalawe National Park from Colombo, Ella, Kandy, Galle, Mirissa and more. All routes to your Udawalawa safari in Sri Lanka with transfer options.",
  keywords: [
    "how to get to Udawalawe", "how to get to Udawalawa",
    "travel routes to Udawalawe safari", "Colombo to Udawalawe",
    "Ella to Udawalawa", "Kandy to Udawalawe safari",
    "getting to Udawalawe National Park Sri Lanka",
  ],
  openGraph: {
    title: "How to Get to Udawalawe | Travel Routes to Udawalawa Sri Lanka",
    description: "Travel routes from Colombo, Ella, Kandy, Galle and more to Udawalawe National Park safari.",
    url: "https://www.udawalawe-wild.com/routes",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/routes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
