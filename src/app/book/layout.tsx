import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Safari",
  description: "Book Your Safari - Udawalawe Wild private safari tours.",
  openGraph: {
    title: "Book Your Safari",
    description: "Book Your Safari - Udawalawe Wild private safari tours.",
    url: "https://www.udawalawe-wild.com/book",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/book",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
