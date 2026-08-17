import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safaris in Udawalawe — Half-day & Full-day Options",
  description: "Compare morning, afternoon, and full-day safari options in Udawalawe National Park.",
  openGraph: {
    title: "Safaris in Udawalawe National Park",
    description: "Ethical safari options from Udawalawe Wild.",
    url: "https://www.udawalawe-wild.com/safaris",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/safaris",
  },
};

export default function SafarisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
