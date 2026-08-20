import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Routes",
  description: "Travel Routes - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Travel Routes",
    description: "Travel Routes - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/routes",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/routes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
