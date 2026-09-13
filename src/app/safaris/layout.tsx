import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safari Packages | Udawalawe & Udawalawa Jeep Safaris Sri Lanka",
  description:
    "Compare private morning, afternoon, and full-day jeep safari packages in Udawalawe National Park. Book an Udawalawa safari with expert local guides — elephant safaris, wild Asia wildlife, no shared vehicles.",
  keywords: [
    "Udawalawe safari packages", "Udawalawa safari packages",
    "jeep safari Udawalawe", "jeep safari Udawalawa",
    "elephant safari Sri Lanka", "private safari Udawalawe",
    "morning safari Udawalawe", "afternoon safari Udawalawa",
    "full day safari Sri Lanka", "wild Asia safari",
  ],
  openGraph: {
    title: "Udawalawe & Udawalawa Safari Packages | Private Jeep Safari Sri Lanka",
    description: "Private morning, afternoon, and full-day jeep safari packages in Udawalawe National Park. Expert local guides, 100% private vehicles.",
    url: "https://www.udawalawe-wild.com/safaris",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safaris",
  },
};

export default function SafarisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
