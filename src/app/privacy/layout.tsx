import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy Policy - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/privacy",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/privacy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
