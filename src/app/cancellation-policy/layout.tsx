import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy — Udawalawe Wild",
  description: "Read our fair cancellation and rescheduling policy for safaris in Udawalawe National Park.",
  openGraph: {
    title: "Cancellation Policy",
    description: "Cancellation and rescheduling policy for Udawalawe Wild.",
    url: "https://www.udawalawe-wild.com/cancellation-policy",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/cancellation-policy",
  },
};

export default function CancellationPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
