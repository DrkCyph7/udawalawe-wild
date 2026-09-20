import { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

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
    <GuideArticle
      eyebrow="Safari Planning"
      title="Morning vs Afternoon Safari: Which is Best?"
      breadcrumbs={[
        { name: "Guide", url: "/guide" },
        { name: "Morning vs Afternoon", url: "/guide/morning-vs-afternoon" },
      ]}
      cta={{ label: "View Safari Packages", href: "/safaris" }}
    >
      <p>
        When booking your private Udawalawe safari, you'll need to choose between a morning or an
        afternoon session. Both times offer exceptional wildlife viewing, but the atmosphere and
        experience differ. Here is a breakdown to help you decide.
      </p>

      <h3>At a Glance</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Morning Safari (6 AM)</th>
              <th>Afternoon Safari (3 PM)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Temperature</strong></td>
              <td>Cool, crisp air early on. Warms up significantly by the end.</td>
              <td>Starts hot, gradually cools down towards sunset.</td>
            </tr>
            <tr>
              <td><strong>Wildlife Activity</strong></td>
              <td>Excellent for birds and general activity before the heat sets in.</td>
              <td>Excellent for elephants gathering near water sources.</td>
            </tr>
            <tr>
              <td><strong>Light</strong></td>
              <td>Soft, cool dawn light turning bright and harsh by 9 AM.</td>
              <td>Bright initially, softening into warm, golden hour light.</td>
            </tr>
            <tr>
              <td><strong>Crowds</strong></td>
              <td>Generally quieter tracks.</td>
              <td>Can be slightly busier, especially on weekends.</td>
            </tr>
            <tr>
              <td><strong>Best For</strong></td>
              <td>Early risers, bird watchers, avoiding the midday heat.</td>
              <td>Photographers (golden hour), watching elephants bathe.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>The Morning Safari Experience</h3>
      <p>
        Morning safaris require an early start (often leaving your accommodation by 5:30 AM), but the
        reward is entering the park as it wakes up. The air is cool, and the dawn light provides a
        calm atmosphere. Birds are highly active, and animals are often on the move before the day's
        heat drives them into the shade. If you value quieter tracks and don't mind an early alarm,
        mornings are fantastic.
      </p>

      <h3>The Afternoon Safari Experience</h3>
      <p>
        Afternoon safaris begin around 3:00 PM. It will be hot when you enter the park, but as the
        afternoon progresses, the temperature drops. This is a prime time for spotting elephants, as
        they frequently move towards the reservoir and waterholes to drink and cool off. The late
        afternoon light — the "golden hour" — is exceptional for photography, culminating in a
        beautiful sunset over the park.
      </p>

      <h3>The Verdict</h3>
      <p>
        There is no wrong choice. If your itinerary allows, a Full-Day Safari (which includes both
        morning and afternoon sessions with a midday break) offers the most comprehensive experience.
        If you must choose one, pick the time that best suits your travel schedule and personal
        preferences regarding early mornings or afternoon heat.
      </p>
    </GuideArticle>
  );
}
