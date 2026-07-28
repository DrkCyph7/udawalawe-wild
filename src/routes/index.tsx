import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-elephant.jpg";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import landscape from "@/assets/landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import { EnquiryForm } from "@/components/enquiry-form";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { Skeleton } from "@/components/ui/skeleton";
import { ParkStatusBanner } from "@/components/park-status-banner";
import { SafariCalculator } from "@/components/safari-calculator";
import { WildlifeSpotter } from "@/components/wildlife-spotter";
import { safaris, faqs, placeholderReviews, routes as travelRoutes } from "@/lib/content";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udawalawe Wild — Private safaris in Udawalawe, Sri Lanka" },
      {
        name: "description",
        content:
          "Private, wildlife-first safaris with verified local partners, transparent pricing, and simple planning in Udawalawe National Park.",
      },
      { property: "og:title", content: "Udawalawe Wild — Private safaris in Udawalawe" },
      {
        property: "og:description",
        content:
          "Verified local partners. Private jeeps. Transparent quotes. Wildlife-first experiences.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["home-page-content"],
    queryFn: async () => ({
      safaris,
      faqs,
      placeholderReviews,
      routes: travelRoutes,
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const visibleSafaris = data?.safaris ?? safaris;
  const visibleFaqs = data?.faqs ?? faqs;
  const visibleReviews = data?.placeholderReviews ?? placeholderReviews;
  const visibleRoutes = data?.routes ?? travelRoutes;

  return (
    <>
      {/* PARK STATUS TICKER */}
      <ParkStatusBanner />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Wild elephant in the grasslands of Udawalawe at dawn"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-32">
          <div className="text-[color:var(--ivory)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur text-amber-200">
              <span>🐘 Udawalawe · Sri Lanka</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white drop-shadow-md">
              Experience Udawalawe,
              <br />
              <em className="italic text-amber-300 font-normal">wildly.</em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
              Private, wildlife-first safaris with verified local partners, transparent pricing, and
              simple planning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110 hover:scale-105"
              >
                Plan my safari
              </Link>
              <a
                href={waLink("Hi Udawalawe Wild, I'd like to plan a safari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div id="booking-form" className="rounded-2xl border border-border/80 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-4">
              <Eyebrow>Check availability</Eyebrow>
              <div className="font-serif text-2xl text-foreground font-medium">Start with your dates.</div>
              <p className="mt-1 text-xs text-muted-foreground">
                A real person will reply with verified options within one business day.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="border-y border-border/80 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 text-center text-xs uppercase tracking-widest text-foreground/80 font-medium sm:grid-cols-4 sm:px-8 sm:text-sm">
          <div className="flex items-center justify-center gap-1.5">✓ Verified local partners</div>
          <div className="flex items-center justify-center gap-1.5">✓ 100% Private jeeps</div>
          <div className="flex items-center justify-center gap-1.5">✓ Guaranteed quotes</div>
          <div className="flex items-center justify-center gap-1.5">✓ Ethical wildlife code</div>
        </div>
      </div>

      {/* INSTANT CALCULATOR SECTION */}
      <Section className="py-16">
        <SafariCalculator />
      </Section>

      {/* WILDLIFE SPOTTER SHOWCASE */}
      <Section className="py-12 bg-secondary/20">
        <SectionHeading
          eyebrow="Wildlife Explorer"
          title="What will you spot in Udawalawe?"
          intro="Over 600 wild elephants roam free across open grasslands and wetlands. Explore real species sighting probabilities."
        />
        <div className="mt-8">
          <WildlifeSpotter />
        </div>
      </Section>

      {/* SAFARIS */}
      <Section>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Safari options"
            title="Four ways to explore the park."
            intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
          />
          <Link
            to="/safaris"
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            Compare all options →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <article
                  key={index}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <Skeleton className="aspect-[4/5] w-full" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </article>
              ))
            : visibleSafaris.map((s, i) => (
                <article
                  key={s.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                    <img
                      src={[elephantPortrait, safariJeep, wildlife, landscape][i]}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
                      {s.duration}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl text-foreground font-medium">{s.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <Link
                      to="/safaris"
                      className="mt-4 text-xs font-semibold text-primary underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Learn details & schedule</span> →
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </Section>

      {/* BENEFITS */}
      <div className="bg-secondary/30 border-y border-border/80">
        <Section>
          <SectionHeading
            eyebrow="Why Udawalawe Wild"
            title="A better way to explore the wild."
            intro="We're small on purpose. Our job is to make your safari calmer, clearer, and kinder to the wildlife you came to see."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Clear pricing",
                d: "Fixed quotes before you confirm. No surprise fees at the gate.",
              },
              {
                t: "Carefully selected partners",
                d: "Every operator is licensed, insured, and vetted for conduct.",
              },
              {
                t: "Responsive planning",
                d: "Real replies on WhatsApp — usually within a few hours.",
              },
              { t: "Private experience", d: "Your jeep, your pace. No sharing with strangers." },
            ].map((b) => (
              <div key={b.t} className="border-t border-primary/30 pt-5">
                <div className="font-serif text-lg text-foreground font-medium">{b.t}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ETHICAL */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grain overflow-hidden rounded-2xl border border-border/80 shadow-md">
            <img
              src={wildlife}
              alt="Peacock and buffalo in a green Sri Lankan grassland"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Ethical safari code"
              title="Wildlife comes first."
              intro="Great sightings happen when animals feel unbothered. Our partners agree to a simple, non-negotiable code."
            />
            <ul className="mt-6 space-y-3 text-sm text-foreground/85">
              {[
                "Keep a respectful distance at all times",
                "No chasing or crowding animals with the jeep",
                "No feeding wildlife under any circumstance",
                "No false promises of sightings",
                "Calm, considered driving throughout the park",
              ].map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
            <Link
              to="/ethical-safari"
              className="mt-8 inline-block text-sm font-semibold text-primary underline underline-offset-4"
            >
              Read the full standard →
            </Link>
          </div>
        </div>
      </Section>

      {/* ROUTES */}
      <div className="bg-primary text-primary-foreground">
        <Section>
          <SectionHeading eyebrow="Getting there" title="Coming from the coast or the hills?" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border border-primary-foreground/20 p-5 rounded-xl">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="mt-3 h-7 w-24" />
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-4/5" />
                  </div>
                ))
              : visibleRoutes.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/${r.slug}`}
                    className="group border border-primary-foreground/20 rounded-xl p-5 transition hover:bg-primary-foreground/10"
                  >
                    <div className="text-[11px] uppercase tracking-widest opacity-70">
                      From
                    </div>
                    <div className="mt-1 font-serif text-2xl font-medium">{r.from}</div>
                    <div className="mt-2 text-xs opacity-80">{r.drive}</div>
                    <div className="mt-4 text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                      View route details →
                    </div>
                  </Link>
                ))}
          </div>
        </Section>
      </div>

      {/* REVIEWS PLACEHOLDER */}
      <Section>
        <SectionHeading
          eyebrow="Guest reviews coming soon"
          title="Only real voices, when they arrive."
          intro="We don't publish fake testimonials. Real guest reviews will appear here as we collect them from confirmed travellers."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border border-dashed border-border p-6 rounded-xl">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                  <Skeleton className="mt-5 h-3 w-24" />
                </div>
              ))
            : visibleReviews.map((r, i) => (
                <div key={i} className="border border-dashed border-border/80 rounded-2xl p-6 text-sm bg-card/50">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Verified Traveller
                  </div>
                  <p className="mt-3 italic leading-relaxed text-foreground/80">"{r.body}"</p>
                  <div className="mt-4 text-xs font-medium text-muted-foreground">— {r.location}</div>
                </div>
              ))}
        </div>
      </Section>

      {/* FAQ */}
      <div className="bg-secondary/30 border-t border-border/80">
        <Section>
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          <div className="mt-8">
            {isPending ? (
              <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-2 border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : (
              <FaqList items={visibleFaqs} />
            )}
          </div>
        </Section>
      </div>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/75" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-white sm:px-8 sm:py-32">
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl font-light">
            Ready to plan your safari?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            Send us your dates. We'll come back with verified options and a fixed quote within one
            business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
            >
              Plan my safari
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

