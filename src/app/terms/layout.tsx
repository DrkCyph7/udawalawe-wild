import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Terms of Service",
    description: "Terms of Service - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/terms",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
