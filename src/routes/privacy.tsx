import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Udawalawe Wild" },
      {
        name: "description",
        content:
          "How Udawalawe Wild collects and handles personal information for safari booking enquiries.",
      },
      { property: "og:title", content: "Privacy policy — Udawalawe Wild" },
      { property: "og:description", content: "How we handle enquiry data." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Privacy policy" />
      <div className="prose mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>
          This is a placeholder privacy policy for Udawalawe Wild. We collect only the information
          you provide through our enquiry forms — name, email, WhatsApp number, hotel, and trip
          preferences — so we can respond to your safari request.
        </p>
        <p>
          We share your enquiry with the licensed local operator we recommend for your dates. We do
          not sell your data.
        </p>
        <p>
          We do not collect payment card data on this website. If a booking proceeds, payment
          details are handled directly with your assigned operator or through a separate secure
          channel disclosed at that time.
        </p>
        <p>
          Contact us at hello@udawalawewild.com to request a copy of your data or ask for it to be
          deleted.
        </p>
        <p className="text-xs text-muted-foreground">
          This document is a placeholder and should be reviewed by a qualified professional before
          it is treated as final.
        </p>
      </div>
    </Section>
  ),
});
