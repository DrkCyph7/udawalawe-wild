import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, ShieldCheck, Heart, Sparkles, ArrowUpRight, CheckCircle2, MapPin, Users, TreePine } from "lucide-react";
import heroImg from "@/assets/hero-elephant.jpg";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import landscape from "@/assets/landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import { EnquiryForm } from "@/components/enquiry-form";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { Skeleton } from "@/components/ui/skeleton";
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
          "Private, wildlife-first safaris with verified local partners and simple planning in Udawalawe National Park.",
      },
      { property: "og:title", content: "Udawalawe Wild — Private safaris in Udawalawe" },
      {
        property: "og:description",
        content:
          "Verified local partners. Private jeeps. Wildlife-first experiences.",
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
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Wild elephant in the grasslands of Udawalawe at dawn"
            width={1920}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-28">
          <div className="text-[color:var(--ivory)] flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur text-amber-200 w-fit">
              <Compass className="h-3.5 w-3.5" />
              <span>Udawalawe · Sri Lanka</span>
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white drop-shadow-md">
              Experience Udawalawe,
              <br />
              <em className="italic text-amber-300 font-normal">wildly.</em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
              Private, wildlife-first safaris with verified local drivers, ethical conduct standards, and simple planning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition duration-300 hover:scale-105 hover:brightness-110"
              >
                <span>Plan My Safari</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink("Hi Udawalawe Wild, I'd like to check safari availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition duration-300 hover:bg-white/20"
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
                A real local host will reply with verified jeep options within one business day.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="border-y border-border/80 bg-secondary/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 text-center text-xs uppercase tracking-widest text-foreground/80 font-medium sm:grid-cols-4 sm:px-8">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
            <span>Verified Local Hosts</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <span>100% Private Jeeps</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Simple Booking Handoff</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <TreePine className="h-4 w-4 text-primary shrink-0" />
            <span>Ethical Wildlife Standard</span>
          </div>
        </div>
      </div>

      {/* SAFARIS SECTION */}
      <Section className="py-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Safari Options"
            title="Four ways to explore the national park."
            intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
          />
          <Link
            to="/safaris"
            className="text-sm font-semibold text-primary underline underline-offset-4 flex items-center gap-1 hover:text-accent transition"
          >
            <span>Compare all safari options</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <article
                  key={index}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Skeleton className="aspect-[4/5] w-full" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </article>
              ))
            : visibleSafaris.map((s, i) => (
                <article
                  key={s.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                    <img
                      src={[elephantPortrait, safariJeep, wildlife, landscape][i]}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
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
                      <span>Explore details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </Section>

      {/* WILDLIFE EXPLORER */}
      <Section className="py-16 bg-secondary/20 border-y border-border/60">
        <SectionHeading
          eyebrow="Wildlife Guide"
          title="What will you spot in Udawalawe?"
          intro="Over 600 wild Asian elephants roam free across open grasslands and wetlands. Explore real species sighting probabilities."
        />
        <div className="mt-8">
          <WildlifeSpotter />
        </div>
      </Section>

      {/* WHY UDAWALAWE WILD */}
      <Section className="py-16">
        <SectionHeading
          eyebrow="Why Udawalawe Wild"
          title="A calmer, clearer way to explore."
          intro="We're small on purpose. Our job is to make your safari experience calm, seamless, and respectful to the park."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Clear quotes upon request",
              d: "Receive guaranteed quotes before you confirm. No surprise gate fees.",
              icon: ShieldCheck,
            },
            {
              t: "Selected local partners",
              d: "Every operator is licensed, experienced, and vetted for conduct.",
              icon: Compass,
            },
            {
              t: "Responsive host planning",
              d: "Real replies on WhatsApp — usually within a few business hours.",
              icon: Sparkles,
            },
            {
              t: "100% Private experience",
              d: "Your jeep, your pace. No crowding or sharing with strangers.",
              icon: Users,
            },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="rounded-2xl border border-border/70 bg-card/60 p-6 shadow-xs transition hover:border-primary/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-serif text-lg text-foreground font-medium">{b.t}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ETHICAL CODE */}
      <Section className="py-16 bg-secondary/30 border-t border-border/80">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grain overflow-hidden rounded-2xl border border-border/80 shadow-md">
            <img
              src={wildlife}
              alt="Peacock and buffalo in a green Sri Lankan grassland"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Ethical Safari Code"
              title="Wildlife comes first."
              intro="Great sightings happen when animals feel unbothered. Our partners agree to a strict, non-negotiable code."
            />
            <ul className="mt-6 space-y-3 text-xs text-foreground/85">
              {[
                "Keep a respectful distance at all times",
                "No chasing or crowding animals with the jeep",
                "No feeding wildlife under any circumstance",
                "No false promises of rare sightings",
                "Calm, considered driving throughout the park",
              ].map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/ethical-safari"
              className="mt-8 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-accent transition"
            >
              <span>Read our full ethical standard</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ROUTES */}
      <Section className="py-16">
        <SectionHeading eyebrow="Getting There" title="Coming from the coast or the hills?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-border p-5 rounded-2xl">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-3 h-7 w-24" />
                  <Skeleton className="mt-3 h-3 w-full" />
                </div>
              ))
            : visibleRoutes.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="group border border-border/80 rounded-2xl p-5 bg-card/60 transition duration-300 hover:border-primary hover:bg-card hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      From
                    </div>
                    <MapPin className="h-4 w-4 text-accent transition group-hover:scale-110" />
                  </div>
                  <div className="mt-2 font-serif text-2xl font-medium text-foreground">{r.from}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{r.drive}</div>
                  <div className="mt-4 text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                    <span>View route details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
        </div>
      </Section>

      {/* FAQ */}
      <div className="bg-secondary/30 border-t border-border/80">
        <Section className="py-16">
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          <div className="mt-8">
            {isPending ? (
              <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-2 border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
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
            Send us your dates. We'll come back with verified jeep availability and clear quotes within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110 hover:scale-105"
            >
              Plan My Safari
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
