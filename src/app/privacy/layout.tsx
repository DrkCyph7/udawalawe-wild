import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Udawalawe Wild",
  description: "Learn how we collect, use, and protect your personal information on the Udawalawe Wild platform.",
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy policy for Udawalawe Wild.",
    url: "https://www.udawalawe-wild.com/privacy",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
