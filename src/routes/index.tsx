import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  Binoculars,
  CalendarCheck,
  Car,
  ChevronRight,
  Footprints,
  MapPin,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  TreePine,
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
import { safaris, faqs, routes as travelRoutes } from "@/lib/content";
import reviewsData from "@/lib/reviews.json";
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
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});


/* ═══════════════════ ETHICS RULES ═════════════════════════════════════ */
const ethicsRules = [
  { icon: Binoculars, r: "Keep a respectful distance at all times" },
  { icon: Car, r: "No chasing or crowding animals with the jeep" },
  { icon: Footprints, r: "No feeding wildlife under any circumstance" },
  { icon: Star, r: "No false promises of sightings" },
  { icon: TreePine, r: "Calm, considered driving throughout the park" },
];

/* ═══════════════════ BENEFITS ═════════════════════════════════════════ */
const benefits = [
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
  {
    t: "Private experience",
    d: "Your jeep, your pace. No sharing with strangers.",
  },
];

/* ═══════════════════ HOME PAGE ═════════════════════════════════════════ */
function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["home-page-content"],
    queryFn: async () => ({
      safaris,
      faqs,
      routes: travelRoutes,
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const visibleSafaris = data?.safaris ?? safaris;
  const visibleFaqs = data?.faqs ?? faqs;
  const visibleRoutes = data?.routes ?? travelRoutes;

  /* Duplicate reviews for infinite marquee */
  const allReviews = [...reviewsData, ...reviewsData];

  /* Mobile safari scroll dot tracker */
  const safariScrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const el = safariScrollRef.current;
    if (!el) return;
    const handler = () => {
      const idx = Math.round(el.scrollLeft / (el.offsetWidth * 0.72 + 16));
      setActiveDot(Math.max(0, Math.min(idx, visibleSafaris.length - 1)));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [visibleSafaris.length]);

  return (
    <>
      {/* ═══════════════════════ HERO ══════════════════════════════════ */}
      <section className="relative isolate overflow-hidden min-h-[90svh] flex items-center">
        {/* Bg image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Wild elephant in the grasslands of Udawalawe at dawn"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.035_155_/_0.65)] via-[oklch(0.22_0.035_155_/_0.4)] to-[oklch(0.22_0.035_155_/_0.88)]" />
        </div>

        <div className="mx-auto w-full grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-16">
          {/* Left: headline */}
          <div className="text-[color:var(--ivory)]">
            {/* Location badge */}
            <div
              className="reveal reveal-visible inline-flex items-center gap-2 rounded-full border border-[color:var(--ivory)]/30 bg-[color:var(--ivory)]/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--ivory)]/90"
            >
              <MapPin className="h-3 w-3 text-[color:var(--terracotta)]" aria-hidden="true" />
              Udawalawe · Sri Lanka
            </div>

            <h1
              className="reveal reveal-visible mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ transitionDelay: "80ms" }}
            >
              Experience<br />
              Udawalawe,{" "}
              <em className="italic text-[color:var(--sand)]">wildly.</em>
            </h1>

            <p
              className="reveal reveal-visible mt-5 max-w-lg text-base leading-relaxed text-[color:var(--ivory)]/85 sm:text-lg"
              style={{ transitionDelay: "160ms" }}
            >
              Private, wildlife-first safaris with verified local partners, transparent pricing, and
              simple planning.
            </p>

            {/* CTAs */}
            <div
              className="reveal reveal-visible mt-8 flex flex-wrap gap-3"
              style={{ transitionDelay: "240ms" }}
            >
              <Link
                to="/book"
                className="flex items-center gap-2 rounded-xl bg-[color:var(--terracotta)] px-6 py-3.5 text-sm font-semibold text-[color:var(--ivory)] shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] hover:shadow-xl"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
              <a
                href={waLink("Hi Udawalawe Wild, I'd like to plan a safari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[color:var(--ivory)]/40 px-6 py-3.5 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/15 hover:border-[color:var(--ivory)]/70"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: enquiry glass card */}
          <div
            className="reveal reveal-visible"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="glass rounded-2xl p-5 sm:p-7">
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

      {/* ═══════════════════ TRUST STRIP ═══════════════════════════════ */}
      <div className="border-y border-border bg-[color:var(--sand)]/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {[
            "Verified local partners",
            "Private jeeps only",
            "Transparent pricing",
            "Ethical safari code",
          ].map((label) => (
            <div
              key={label}
              className="px-5 py-5 text-center text-xs font-medium uppercase tracking-widest text-foreground/60 sm:py-6"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SAFARIS ════════════════════════════════════ */}
      <Section>
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Safari options"
              title="Four ways to explore the park."
              intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
            />
            <Link
              to="/safaris"
              className="link-underline flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
            >
              Compare all options
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* Mobile: horizontal snap scroll | Desktop: 4-col grid */}
        <div className="mt-10">
          {/* Mobile scroll container */}
          <div
            ref={safariScrollRef}
            className="flex gap-4 overflow-x-auto scroll-snap-x pb-2 sm:hidden"
          >
            {isPending
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="safari-snap-card overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <Skeleton className="aspect-[3/2] w-full" />
                    <div className="space-y-3 p-4">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              : visibleSafaris.map((s, i) => (
                  <article
                    key={s.slug}
                    className="safari-snap-card card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-muted">
                      <img
                        src={[elephantPortrait, safariJeep, wildlife, landscape][i]}
                        alt={s.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <Binoculars className="h-3 w-3" aria-hidden="true" />
                        {s.duration}
                      </div>
                      <h3 className="mt-1.5 font-serif text-lg text-foreground">{s.name}</h3>
                      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                        {s.short}
                      </p>
                      <Link
                        to="/safaris"
                        className="link-underline mt-3 flex items-center gap-1 text-xs font-medium text-primary"
                      >
                        Learn more
                        <ChevronRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
          </div>

          {/* Scroll dots (mobile only) */}
          {!isPending && (
            <div className="snap-dots sm:hidden">
              {visibleSafaris.map((_, i) => (
                <div
                  key={i}
                  className={`snap-dot text-[color:var(--forest)] ${i === activeDot ? "active" : ""}`}
                />
              ))}
            </div>
          )}

          {/* Desktop grid */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {isPending
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <article
                    key={idx}
                    className="overflow-hidden rounded-xl border border-border bg-card"
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
                  <Reveal key={s.slug} delay={i * 70} className="h-full">
                    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                      <div className="aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={[elephantPortrait, safariJeep, wildlife, landscape][i]}
                          alt={s.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
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
        </div>
      </Section>

      {/* ═══════════════════ BENEFITS ═══════════════════════════════════ */}
      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Why Udawalawe Wild"
              title="A better way to explore the wild."
              intro="We're small on purpose. Our job is to make your safari calmer, clearer, and kinder to the wildlife you came to see."
            />
          </Reveal>

          {/* Equal-height grid, no icons */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 75}>
                <div className="benefit-tile h-full">
                  <div className="font-serif text-xl text-foreground">{b.t}</div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══════════════════ ETHICAL ════════════════════════════════════ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="grain overflow-hidden rounded-2xl">
            <img
              src={wildlife}
              alt="Peacock and buffalo in a green Sri Lankan grassland"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <Reveal delay={120} direction="right">
            <SectionHeading
              eyebrow="Ethical safari code"
              title="Wildlife comes first."
              intro="Great sightings happen when animals feel unbothered. Our partners agree to a simple, non-negotiable code."
            />
            <ul className="mt-6 space-y-3.5">
              {ethicsRules.map(({ icon: Icon, r }, i) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-sm text-foreground/85"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--terracotta)]/10">
                    <Icon className="h-3.5 w-3.5 text-[color:var(--terracotta)]" aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <Link
              to="/ethical-safari"
              className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Read the full standard
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════ ROUTES ═════════════════════════════════════ */}
      <div className="bg-[color:var(--forest-deep)] text-[color:var(--ivory)]">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Getting there" title="Coming from the coast or the hills?" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isPending
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="rounded-xl border border-[color:var(--ivory)]/15 p-5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="mt-3 h-7 w-24" />
                    <Skeleton className="mt-3 h-3 w-full" />
                  </div>
                ))
              : visibleRoutes.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 70}>
                    <Link
                      to={`/${r.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-[color:var(--ivory)]/15 p-5 transition-all duration-250 hover:bg-[color:var(--ivory)]/8 hover:border-[color:var(--ivory)]/35 hover:-translate-y-1"
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

      {/* ═══════════════════ REVIEWS — Marquee ══════════════════════════ */}
      <section className="overflow-hidden border-y border-border py-16 sm:py-20">
        <Reveal>
          <div className="mb-10 px-5 sm:px-8">
            <SectionHeading
              eyebrow="What guests say"
              title="Real voices, real safaris."
              intro="Every review comes from a confirmed traveller. We don't publish fakes."
            />
          </div>
        </Reveal>

        {/* Infinite marquee track */}
        <div className="select-none" aria-label="Guest reviews carousel">
          <div className="reviews-track">
            {allReviews.map((r, i) => (
              <div
                key={i}
                className="card-lift w-80 shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-[color:var(--terracotta)] text-[color:var(--terracotta)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="h-4 w-4 text-[color:var(--terracotta)]/40 mb-2" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-foreground/75 italic">
                  "{r.body}"
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{r.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                      {r.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.safari}</div>
                    <div className="text-[10px] text-muted-foreground/70">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ════════════════════════════════════════ */}
      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          </Reveal>
          <div className="mt-8">
            <FaqList items={visibleFaqs} />
          </div>
        </Section>
      </div>

      {/* ═══════════════════ FINAL CTA ══════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.82)]" />

        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[color:var(--ivory)] sm:px-8 sm:py-32">
          <Reveal direction="scale">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--ivory)]/25 bg-[color:var(--ivory)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[color:var(--ivory)]/75">
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
                className="flex items-center gap-2 rounded-xl bg-[color:var(--terracotta)] px-7 py-4 text-sm font-semibold text-[color:var(--ivory)] shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.03] hover:shadow-2xl"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[color:var(--ivory)]/50 px-7 py-4 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/15 hover:border-[color:var(--ivory)]/80"
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
