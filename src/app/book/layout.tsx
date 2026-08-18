import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Udawalawe Safari — Udawalawe Wild",
  description: "Book an ethical, private safari in Udawalawe National Park. Get verified local options, fixed quotes, and transparent pricing in one business day.",
  openGraph: {
    title: "Book Your Udawalawe Safari",
    description: "Plan your ethical safari in Udawalawe National Park with verified local drivers.",
    url: "https://www.udawalawe-wild.com/book",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
