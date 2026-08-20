import { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Hiriketiya to Udawalawe | Travel & Safari Guide | Udawalawe Wild",
  description: "Plan your journey from Hiriketiya to Udawalawe National Park. Estimated travel times, transport options, and safari planning advice.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/routes/hiriketiya-to-udawalawe",
  },
};

export default function Page() {
  return (
    <main className="pb-16 pt-24 sm:pt-32 lg:pb-24">
      <Section>
        <Breadcrumbs items={[{name: "Routes", url: "/routes"}, {name: "Hiriketiya to Udawalawe", url: "/routes/hiriketiya-to-udawalawe"}]} />

        <SectionHeading
          eyebrow="Travel Guide"
          title="Hiriketiya to Udawalawe Safari"
          titleClass="text-forest-900"
        />

        <div className="mt-8 prose prose-forest max-w-none text-foreground/80">
          <p className="text-lg">
            Quiet coves to open grasslands — one of the shortest coastal routes.
          </p>

          <h3>Route Overview</h3>
          <ul>
            <li><strong>Starting Point:</strong> Hiriketiya</li>
            <li><strong>Destination:</strong> Udawalawe National Park</li>
            <li><strong>Estimated Travel Time:</strong> Approx. 2 hrs by road (Depending on traffic and exact route)</li>
          </ul>

          <h3>Transport Options</h3>
          <p>
            You can reach Udawalawe from Hiriketiya via several transport methods:
          </p>
          <ul>
            <li><strong>Private Taxi / Transfer:</strong> The most comfortable and efficient option. We can arrange a reliable air-conditioned transfer combined with your safari.</li>
            <li><strong>Public Bus:</strong> The budget-friendly option, though it often requires transfers and takes significantly longer.</li>
            <li><strong>Tuk-Tuk:</strong> Possible for shorter distances, but generally not recommended for longer journeys with luggage due to comfort and safety.</li>
          </ul>

          <h3>Safari Planning and Timing</h3>
          <p>
            When travelling from Hiriketiya, it is crucial to align your arrival with the park's optimal wildlife viewing times (early morning or late afternoon).
          </p>
          <p>
            If you are aiming for a morning safari (which starts before dawn), we highly recommend arriving in Udawalawe the night before and staying locally. If you are doing an afternoon safari, you can depart Hiriketiya in the morning, arrive in Udawalawe for lunch, and then head straight into the park.
          </p>

          <h3>Safari + Onward Transfer</h3>
          <p>
            If you are checking out of your accommodation in Hiriketiya and heading to a new destination after your safari, our <strong>Safari + Transfer</strong> package is ideal. We manage your luggage during the safari and provide a seamless onward journey.
          </p>

          <div className="mt-12 bg-sand-200 p-6 rounded-xl border border-border">
            <h4 className="text-forest-900 font-serif mt-0">Plan your trip from Hiriketiya</h4>
            <p className="text-sm">Contact us to arrange your private Udawalawe safari and transport options.</p>
            <div className="mt-4 flex gap-4">
              <a href="/book" className="px-5 py-2.5 bg-[oklch(0.70_0.12_85)] text-[#222] font-semibold rounded-lg text-sm hover:scale-105 transition-transform inline-block">Request a Quote</a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
