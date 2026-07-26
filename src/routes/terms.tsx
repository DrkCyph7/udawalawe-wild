import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Udawalawe Wild" },
      { name: "description", content: "Terms of use for the Udawalawe Wild booking platform." },
      { property: "og:title", content: "Terms of use — Udawalawe Wild" },
      {
        property: "og:description",
        content: "Terms of use for the Udawalawe Wild booking platform.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Terms of use" />
      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>
          Udawalawe Wild is an independent online booking platform. We facilitate introductions
          between travellers and licensed local safari operators in and around Udawalawe National
          Park, Sri Lanka. We are not the park authority.
        </p>
        <p>
          Safari services are delivered by the local operator assigned to your booking. Wildlife
          sightings cannot be guaranteed by us or by any operator.
        </p>
        <p>
          By submitting an enquiry you agree that we may share your information with the operator we
          recommend for your dates, and that our role is limited to that of a booking intermediary.
        </p>
        <p className="text-xs text-muted-foreground">
          This document is a placeholder and should be reviewed by a qualified professional before
          it is treated as final.
        </p>
      </div>
    </Section>
  ),
});
