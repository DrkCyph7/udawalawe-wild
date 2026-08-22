import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawe Safari Guide | Planning Your Sri Lanka Safari",
  description:
    "Udawalawe Safari Guide | Planning Your Sri Lanka Safari - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Udawalawe Safari Guide | Planning Your Sri Lanka Safari",
    description:
      "Udawalawe Safari Guide | Planning Your Sri Lanka Safari - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/guide",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
