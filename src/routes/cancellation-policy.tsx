import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation policy — Udawalawe Wild" },
      {
        name: "description",
        content: "How cancellations and changes work for Udawalawe Wild safari bookings.",
      },
      { property: "og:title", content: "Cancellation policy — Udawalawe Wild" },
      { property: "og:description", content: "Cancellation and change policy." },
    ],
    links: [{ rel: "canonical", href: "/cancellation-policy" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Cancellation policy" />
      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>
          Because our safari operators are small local businesses, cancellation terms are set per
          booking and shared with your fixed quote before you confirm anything.
        </p>
        <p>
          We aim for flexible, fair terms — typically free changes with reasonable notice, and a
          modest fee for late cancellations to protect the operator's day.
        </p>
        <p>
          If wildlife activity or park access is disrupted for reasons outside your control, we will
          always try to reschedule rather than penalise.
        </p>
        <p className="text-xs text-muted-foreground">
          This document is a placeholder and should be reviewed by a qualified professional before
          it is treated as final.
        </p>
      </div>
    </Section>
  ),
});
