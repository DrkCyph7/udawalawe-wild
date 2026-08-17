import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Ethical Safari Standard — Udawalawe Wild",
  description: "Learn about our commitment to wildlife-first safaris, fair wages for guides, and sustainable tourism in Udawalawe.",
  openGraph: {
    title: "Ethical Safari Standard",
    description: "Wildlife comes first at Udawalawe Wild.",
    url: "https://www.udawalawe-wild.com/ethical-safari",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/ethical-safari",
  },
};

export default function EthicalSafariLayout({ children }: { children: React.ReactNode }) {
  return children;
}
