import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Udawalawe Wild",
  description: "Terms and conditions for booking a safari through Udawalawe Wild.",
  openGraph: {
    title: "Terms of Use",
    description: "Terms of use for the Udawalawe Wild booking platform.",
    url: "https://www.udawalawe-wild.com/terms",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
