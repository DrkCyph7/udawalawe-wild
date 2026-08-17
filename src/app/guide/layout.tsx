import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Visitor Guide & FAQ",
  description: "Everything you need to know before visiting Udawalawe National Park. Best times, what to wear, and wildlife expectations.",
  openGraph: {
    title: "Udawalawe Visitor Guide",
    description: "Expert advice for visiting Udawalawe National Park.",
    url: "https://www.udawalawe-wild.com/guide",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
