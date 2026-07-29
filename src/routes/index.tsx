import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type RefObject } from "react";
import {
  BadgeCheck,
  Binoculars,
  CalendarCheck,
  Car,
  ChevronRight,
  Footprints,
  Leaf,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  Users,
  Zap,
} from "lucide-react";
import heroImg from "@/assets/hero-elephant.jpg";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import landscape from "@/assets/landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import { EnquiryForm } from "@/components/enquiry-form";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { Skeleton } from "@/components/ui/skeleton";
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

/* ─── Scroll-reveal hook ─────────────────────────────────────────────── */
function useReveal(ref: RefObject<Element | null>, rootMargin = "0px 0px -60px 0px") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.unobserve(el);
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
}

/* ─── Reveal wrapper component ───────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Trust pillars data ─────────────────────────────────────────────── */
const trustPillars = [
  { icon: BadgeCheck, label: "Verified partners" },
  { icon: Car, label: "Private jeeps" },
  { icon: Sparkles, label: "Transparent quotes" },
  { icon: Leaf, label: "Ethical safari code" },
];

/* ─── Benefits data ─────────────────────────────────────────────────── */
const benefits = [
  {
    icon: Zap,
    t: "Clear pricing",
    d: "Fixed quotes before you confirm. No surprise fees at the gate.",
  },
  {
    icon: ShieldCheck,
    t: "Carefully selected partners",
    d: "Every operator is licensed, insured, and vetted for conduct.",
  },
  {
    icon: MessageCircle,
    t: "Responsive planning",
    d: "Real replies on WhatsApp — usually within a few hours.",
  },
  {
    icon: Users,
    t: "Private experience",
    d: "Your jeep, your pace. No sharing with strangers.",
  },
];

/* ─── Ethics rules ───────────────────────────────────────────────────── */
const ethicsRules = [
  { icon: Binoculars, r: "Keep a respectful distance at all times" },
  { icon: Car, r: "No chasing or crowding animals with the jeep" },
  { icon: Footprints, r: "No feeding wildlife under any circumstance" },
  { icon: Star, r: "No false promises of sightings" },
  { icon: TreePine, r: "Calm, considered driving throughout the park" },
];

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
      {/* ═══════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Wild elephant in the grasslands of Udawalawe at dawn"
            width={1920}
            height={1280}
            className="hero-img h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.035_155_/_0.6)] via-[oklch(0.22_0.035_155_/_0.35)] to-[oklch(0.22_0.035_155_/_0.88)]" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-32">
          {/* Left: headline */}
          <div className="text-[color:var(--ivory)]">
            <div
              className="reveal reveal-visible inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--ivory)]/80"
            >
              <MapPin className="h-3.5 w-3.5 text-[color:var(--terracotta)]" aria-hidden="true" />
              Udawalawe · Sri Lanka
            </div>

            <h1
              className="reveal reveal-visible mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ transitionDelay: "80ms" }}
            >
              Experience Udawalawe,
              <br />
              <em className="italic text-[color:var(--sand)]">wildly.</em>
            </h1>

            <p
              className="reveal reveal-visible mt-5 max-w-lg text-base leading-relaxed text-[color:var(--ivory)]/85 sm:text-lg"
              style={{ transitionDelay: "160ms" }}
            >
              Private, wildlife-first safaris with verified local partners, transparent pricing, and
              simple planning.
            </p>

            {/* Trust pills */}
            <div
              className="reveal reveal-visible mt-6 flex flex-wrap gap-2"
              style={{ transitionDelay: "220ms" }}
            >
              {trustPillars.map(({ icon: Icon, label }) => (
                <span key={label} className="trust-pill text-[color:var(--ivory)]/80">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="reveal reveal-visible mt-8 flex flex-wrap gap-3"
              style={{ transitionDelay: "300ms" }}
            >
              <Link
                to="/book"
                className="flex items-center gap-2 rounded-lg bg-[color:var(--terracotta)] px-6 py-3 text-sm font-semibold text-[color:var(--ivory)] shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] hover:shadow-xl"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
              <a
                href={waLink("Hi Udawalawe Wild, I'd like to plan a safari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[color:var(--ivory)]/40 px-6 py-3 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/12 hover:border-[color:var(--ivory)]/70"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: enquiry card */}
          <div className="reveal reveal-visible" style={{ transitionDelay: "200ms" }}>
            <div className="rounded-xl border border-[color:var(--ivory)]/15 bg-[color:var(--ivory)]/97 p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="mb-4">
                <Eyebrow>Check availability</Eyebrow>
                <div className="font-serif text-2xl text-foreground">Start with your dates.</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  A real person will reply with verified options within one business day.
                </p>
              </div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST STRIP ══════════════════════════════ */}
      <div className="border-y border-border bg-[color:var(--sand)]/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 px-5 sm:grid-cols-4 sm:px-8">
          {trustPillars.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center gap-2 py-5 text-center text-xs font-medium uppercase tracking-widest text-foreground/70 transition-colors duration-200 hover:text-foreground ${i < 3 ? "sm:border-r border-border/60" : ""} ${i < 2 ? "border-r border-border/60 sm:border-r-0" : ""}`}
            >
              <Icon className="h-5 w-5 text-[color:var(--terracotta)]/80" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SAFARIS ══════════════════════════════════ */}
      <Section>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Safari options"
              title="Four ways to explore the park."
              intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
            />
            <Link
              to="/safaris"
              className="link-underline flex items-center gap-1 text-sm font-medium text-primary"
            >
              Compare all options
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="overflow-hidden rounded-xl border border-border bg-card">
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
                <Reveal key={s.slug} delay={i * 70} className="h-full">
                  <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={[elephantPortrait, safariJeep, wildlife, landscape][i]}
                        alt={s.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                        <Binoculars className="h-3 w-3" aria-hidden="true" />
                        {s.duration}
                      </div>
                      <h3 className="mt-2 font-serif text-xl text-foreground">{s.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.short}
                      </p>
                      <Link
                        to="/safaris"
                        className="link-underline mt-4 flex items-center gap-1 text-sm font-medium text-primary"
                      >
                        Learn more
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>
      </Section>

      {/* ═══════════════════ BENEFITS ═════════════════════════════════ */}
      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Why Udawalawe Wild"
              title="A better way to explore the wild."
              intro="We're small on purpose. Our job is to make your safari calmer, clearer, and kinder to the wildlife you came to see."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="group rounded-xl border border-border/60 bg-background p-6 transition-all duration-250 hover:border-[color:var(--terracotta)]/40 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--terracotta)]/10 transition-transform duration-200 group-hover:scale-110">
                    <b.icon className="h-5 w-5 text-[color:var(--terracotta)]" aria-hidden="true" />
                  </div>
                  <div className="mt-4 font-serif text-lg text-foreground">{b.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══════════════════ ETHICAL ══════════════════════════════════ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal className="grain overflow-hidden rounded-xl">
            <img
              src={wildlife}
              alt="Peacock and buffalo in a green Sri Lankan grassland"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Ethical safari code"
              title="Wildlife comes first."
              intro="Great sightings happen when animals feel unbothered. Our partners agree to a simple, non-negotiable code."
            />
            <ul className="mt-6 space-y-3">
              {ethicsRules.map(({ icon: Icon, r }, i) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--terracotta)]/10">
                    <Icon className="h-3.5 w-3.5 text-[color:var(--terracotta)]" aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <Link
              to="/ethical-safari"
              className="link-underline mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Read the full standard
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════ ROUTES ═══════════════════════════════════ */}
      <div className="bg-[color:var(--forest-deep)] text-[color:var(--ivory)]">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Getting there" title="Coming from the coast or the hills?" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border border-[color:var(--ivory)]/15 rounded-xl p-5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="mt-3 h-7 w-24" />
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-4/5" />
                  </div>
                ))
              : visibleRoutes.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 70}>
                    <Link
                      to={`/${r.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-[color:var(--ivory)]/15 p-5 transition-all duration-200 hover:bg-[color:var(--ivory)]/8 hover:border-[color:var(--ivory)]/35"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[color:var(--ivory)]/55">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        From
                      </div>
                      <div className="font-serif text-2xl">{r.from}</div>
                      <div className="text-xs text-[color:var(--ivory)]/65">{r.drive}</div>
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-[color:var(--terracotta)]/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        View route
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </Link>
                  </Reveal>
                ))}
          </div>
        </Section>
      </div>

      {/* ═══════════════════ REVIEWS ══════════════════════════════════ */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Guest reviews coming soon"
            title="Only real voices, when they arrive."
            intro="We don't publish fake testimonials. Real guest reviews will appear here as we collect them from confirmed travellers."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-dashed border-border p-6">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                  <Skeleton className="mt-5 h-3 w-24" />
                </div>
              ))
            : visibleReviews.map((r, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group rounded-xl border border-dashed border-border bg-card p-6 text-sm transition-all duration-200 hover:border-[color:var(--terracotta)]/40 hover:shadow-md">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                      <Star className="h-3 w-3 text-[color:var(--sand-deep)]" aria-hidden="true" />
                      Placeholder
                    </div>
                    <p className="mt-3 italic leading-relaxed text-foreground/70">"{r.body}"</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" aria-hidden="true" />— {r.location}
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
      </Section>

      {/* ═══════════════════ FAQ ══════════════════════════════════════ */}
      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          </Reveal>
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

      {/* ═══════════════════ FINAL CTA ════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.80)]" />

        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[color:var(--ivory)] sm:px-8 sm:py-32">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--ivory)]/20 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[color:var(--ivory)]/70">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--terracotta)]" aria-hidden="true" />
              Start planning today
            </div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Ready to plan your safari?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[color:var(--ivory)]/80">
              Send us your dates. We'll come back with verified options and a fixed quote within one
              business day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/book"
                className="flex items-center gap-2 rounded-lg bg-[color:var(--terracotta)] px-7 py-3.5 text-sm font-semibold text-[color:var(--ivory)] shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.03] hover:shadow-xl"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[color:var(--ivory)]/50 px-7 py-3.5 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/12 hover:border-[color:var(--ivory)]/80"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
