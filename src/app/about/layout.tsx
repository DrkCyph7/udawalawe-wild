import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Udawalawe Wild — Who we are",
  description: "We are local planners and guides dedicated to ethical wildlife experiences in Udawalawe National Park.",
  openGraph: {
    title: "About Udawalawe Wild",
    description: "Local experts for Udawalawe National Park safaris.",
    url: "https://www.udawalawe-wild.com/about",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
