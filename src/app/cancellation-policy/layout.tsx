import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Cancellation Policy - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Cancellation Policy",
    description: "Cancellation Policy - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/cancellation-policy",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/cancellation-policy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
