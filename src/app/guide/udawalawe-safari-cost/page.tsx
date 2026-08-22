import { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: `Udawalawe Safari Cost ${new Date().getFullYear()} | Prices & Packages`,
    description:
      "Understand the true cost of a private Udawalawe safari. We break down park entrance fees, private jeep costs, ETH visits, and transfer pricing.",
    alternates: {
      canonical: "https://www.udawalawe-wild.com/guide/udawalawe-safari-cost",
    },
  };
}

export default function Page() {
  return (
    <main className="pb-16 pt-24 sm:pt-32 lg:pb-24">
      <Section>
        <Breadcrumbs
          items={[
            { name: "Guide", url: "/guide" },
            { name: "Udawalawe Safari Cost", url: "/guide/udawalawe-safari-cost" },
          ]}
        />

        <SectionHeading
          eyebrow="Safari Planning"
          title="How much does an Udawalawe Safari cost?"
          titleClass="text-forest-900"
        />

        <div className="mt-8 prose prose-forest max-w-none text-foreground/80">
          <p>
            When planning your visit to Udawalawe National Park, it's important to understand how
            safari pricing works. Unlike simple ticketed attractions, a safari cost is made up of
            several components: the park entrance fee, the private jeep hire, and any optional
            extras like transfers or visits to the Elephant Transit Home (ETH).
          </p>

          <h3>Park Entrance Fees</h3>
          <p>
            The Department of Wildlife Conservation (DWC) sets the park entrance fees. These fees
            are charged per person, with additional smaller fees for the jeep entry and local taxes.
            When you book a safari with Udawalawe Wild, our quotes always include these fees so you
            don't have to worry about cash at the gate.
          </p>

          <h3>Private Jeep Hire</h3>
          <p>
            We only offer private jeep safaris. This means you won't be sharing your vehicle with
            strangers. The cost of the jeep covers the vehicle, the licensed driver/guide, and fuel.
            Prices for the jeep remain the same whether you are a solo traveller or a group of six.
          </p>

          <h3>Morning vs. Afternoon Pricing</h3>
          <p>
            The cost for a morning or afternoon half-day safari is generally the same. Full-day
            safaris cost more as they require two park entry tickets and a full day of jeep hire.
          </p>

          <h3>What's Included in our Quotes</h3>
          <ul>
            <li>Private 4x4 safari jeep with a verified local driver</li>
            <li>All park entrance fees and taxes</li>
            <li>Coordination and booking management</li>
            <li>Strict adherence to our ethical wildlife-first guidelines</li>
          </ul>

          <h3>Payment and Cancellation</h3>
          <p>
            We believe in transparent pricing. Once you enquire, we provide a fixed quote. You pay
            your driver directly. Our cancellation policy is flexible and designed to be fair to
            both you and our local partners.
          </p>

          <div className="mt-12 bg-sand-200 p-6 rounded-xl border border-border">
            <h4 className="text-forest-900 font-serif mt-0">Get a fixed quote today</h4>
            <p className="text-sm">
              Ready to check exact pricing for your dates? Send us a quick enquiry on WhatsApp or
              via our booking form.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="/book"
                className="px-5 py-2.5 bg-[oklch(0.70_0.12_85)] text-[#222] font-semibold rounded-lg text-sm hover:scale-105 transition-transform inline-block"
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
