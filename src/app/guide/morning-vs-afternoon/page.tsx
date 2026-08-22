import { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Morning vs Afternoon Safari in Udawalawe | Udawalawe Wild",
  description:
    "Comparing morning and afternoon safaris in Udawalawe National Park. Learn which time offers the best lighting, wildlife activity, and comfort.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide/morning-vs-afternoon",
  },
};

export default function Page() {
  return (
    <main className="pb-16 pt-24 sm:pt-32 lg:pb-24">
      <Section>
        <Breadcrumbs
          items={[
            { name: "Guide", url: "/guide" },
            { name: "Morning vs Afternoon", url: "/guide/morning-vs-afternoon" },
          ]}
        />

        <SectionHeading
          eyebrow="Safari Planning"
          title="Morning vs Afternoon Safari: Which is Best?"
          titleClass="text-forest-900"
        />

        <div className="mt-8 prose prose-forest max-w-none text-foreground/80">
          <p>
            When booking your private Udawalawe safari, you'll need to choose between a morning or
            an afternoon session. Both times offer exceptional wildlife viewing, but the atmosphere
            and experience differ. Here is a breakdown to help you decide.
          </p>

          <h3>At a Glance</h3>
          <div className="overflow-x-auto my-8">
            <table className="min-w-full text-sm text-left border-collapse border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 border border-border">Factor</th>
                  <th className="px-4 py-3 border border-border">Morning Safari (6 AM)</th>
                  <th className="px-4 py-3 border border-border">Afternoon Safari (3 PM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border border-border font-medium">Temperature</td>
                  <td className="px-4 py-3 border border-border">
                    Cool, crisp air early on. Warms up significantly by the end.
                  </td>
                  <td className="px-4 py-3 border border-border">
                    Starts hot, gradually cools down towards sunset.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-border font-medium">Wildlife Activity</td>
                  <td className="px-4 py-3 border border-border">
                    Excellent for birds and general activity before the heat sets in.
                  </td>
                  <td className="px-4 py-3 border border-border">
                    Excellent for elephants gathering near water sources.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-border font-medium">Light</td>
                  <td className="px-4 py-3 border border-border">
                    Soft, cool dawn light turning bright and harsh by 9 AM.
                  </td>
                  <td className="px-4 py-3 border border-border">
                    Bright initially, softening into warm, golden hour light.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-border font-medium">Crowds</td>
                  <td className="px-4 py-3 border border-border">Generally quieter tracks.</td>
                  <td className="px-4 py-3 border border-border">
                    Can be slightly busier, especially on weekends.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-border font-medium">Best For</td>
                  <td className="px-4 py-3 border border-border">
                    Early risers, bird watchers, avoiding the midday heat.
                  </td>
                  <td className="px-4 py-3 border border-border">
                    Photographers (golden hour), watching elephants bathe.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>The Morning Safari Experience</h3>
          <p>
            Morning safaris require an early start (often leaving your accommodation by 5:30 AM),
            but the reward is entering the park as it wakes up. The air is cool, and the dawn light
            provides a calm atmosphere. Birds are highly active, and animals are often on the move
            before the day's heat drives them into the shade. If you value quieter tracks and don't
            mind an early alarm, mornings are fantastic.
          </p>

          <h3>The Afternoon Safari Experience</h3>
          <p>
            Afternoon safaris begin around 3:00 PM. It will be hot when you enter the park, but as
            the afternoon progresses, the temperature drops. This is a prime time for spotting
            elephants, as they frequently move towards the reservoir and waterholes to drink and
            cool off. The late afternoon light—the "golden hour"—is exceptional for photography,
            culminating in a beautiful sunset over the park.
          </p>

          <h3>The Verdict</h3>
          <p>
            There is no wrong choice. If your itinerary allows, a Full-Day Safari (which includes
            both morning and afternoon sessions with a midday break) offers the most comprehensive
            experience. If you must choose one, pick the time that best suits your travel schedule
            and personal preferences regarding early mornings or afternoon heat.
          </p>

          <div className="mt-12 bg-sand-200 p-6 rounded-xl border border-border">
            <h4 className="text-forest-900 font-serif mt-0">Book your preferred time</h4>
            <p className="text-sm">We offer private morning, afternoon, and full-day safaris.</p>
            <div className="mt-4 flex gap-4">
              <a
                href="/safaris"
                className="px-5 py-2.5 bg-[oklch(0.70_0.12_85)] text-[#222] font-semibold rounded-lg text-sm hover:scale-105 transition-transform inline-block"
              >
                View Safari Packages
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
