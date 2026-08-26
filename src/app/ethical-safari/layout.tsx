import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethical Safari",
  description: "Ethical Safari - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Ethical Safari",
    description: "Ethical Safari - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/ethical-safari",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/ethical-safari",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
