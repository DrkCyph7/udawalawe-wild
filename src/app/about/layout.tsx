import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "About Us",
    description: "About Us - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/about",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
