import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Udawalawe Wild | Local Udawalawa Safari Experts Sri Lanka",
  description:
    "Meet the team behind Udawalawe Wild — your trusted local Udawalawa and Udawalawe safari experts in Sri Lanka. Ethical guides, private jeeps, years of wild Asia wildlife experience.",
  keywords: [
    "Udawalawe Wild team", "Udawalawa safari experts",
    "local safari guides Sri Lanka", "ethical safari operators Udawalawe",
    "about Udawalawa Wild",
  ],
  openGraph: {
    title: "About Udawalawe Wild | Local Udawalawa Safari Experts Sri Lanka",
    description: "Meet the local Udawalawa and Udawalawe safari team — ethical guides, private jeeps, wild Asia wildlife.",
    url: "https://www.udawalawe-wild.com/about",
  },
  alternates: {
    canonical: "https://www.udawalawe-wild.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
