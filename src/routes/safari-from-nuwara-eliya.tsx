import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-nuwara-eliya")!;

export const Route = createFileRoute("/safari-from-nuwara-eliya")({
  head: () => ({
    meta: [
      { title: "Safari from Nuwara Eliya to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Nuwara Eliya. Tea country descent route notes, timings, and safari + transfer options.",
      },
      { property: "og:title", content: "Safari from Nuwara Eliya to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Nuwara Eliya with verified local operators.",
      },
    ],
    links: [{ rel: "canonical", href: "/safari-from-nuwara-eliya" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
