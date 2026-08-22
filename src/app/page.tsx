import { TransitionLink as Link } from "@/components/transition-link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import {
  Binoculars,
  CalendarCheck,
  Car,
  ChevronRight,
  Footprints,
  Handshake,
  Leaf,
  MapPin,
  MessageCircle,
  PawPrint,
  Quote,
  Sparkles,
  Star,
  TreePine,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import landscape from "@/assets/landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import ethicalImg from "@/assets/ethical-safari-img.jpg";
import { EnquiryForm } from "@/components/enquiry-form";
import StatsCount from "@/components/ui/statscount";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { Magnetic } from "@/components/magnetic";
import { LogoTicker } from "@/components/ui/logo-ticker";
import { HeroEditorialStagger, HeroLine, HeroFadeIn } from "@/components/ui/hero-editorial-stagger";
import { StaggeredHero } from "@/components/ui/staggered-hero";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { SafariScroll } from "@/components/safari-scroll";
import { ReviewCarousel } from "@/components/review-carousel";
import { safaris, faqs, routes as travelRoutes } from "@/lib/content";
import reviewsData from "@/lib/reviews.json";
import { waLink } from "@/lib/site";

/* ------------------- ETHICS RULES ------------------------------------- */
const ethicsRules = [
  { icon: Binoculars, r: "Keep a respectful distance at all times" },
  { icon: Car, r: "No chasing or crowding animals with the jeep" },
  { icon: Footprints, r: "No feeding wildlife under any circumstance" },
  { icon: Star, r: "No false promises of sightings" },
  { icon: TreePine, r: "Calm, considered driving throughout the park" },
];

/* ------------------- BENEFITS ----------------------------------------- */
const benefits = [
  {
    t: "Clear pricing",
    d: "Fixed quotes before you confirm. No surprise fees at the gate.",
    icon: Wallet,
  },
  {
    t: "Carefully selected partners",
    d: "Every operator is licensed, insured, and vetted for conduct.",
    icon: Handshake,
  },
  {
    t: "Responsive planning",
    d: "Real replies on WhatsApp — usually within a few hours.",
    icon: MessageCircle,
  },
  {
    t: "Private experience",
    d: "Your jeep, your pace. No sharing with strangers.",
    icon: Car,
  },
];

/* ------------------- TRUST STRIP ---------------------------------------- */
const trustStatsForComponent = [
  { value: 100, suffix: "%", label: "Verified Local Partners" },
  { value: 0, label: "Shared Vehicles" },
  { value: 0, label: "Hidden Fees" },
  { value: 250, suffix: "+", label: "Species in the Park" },
];

/* ------------------- STAT PILLS ----------------------------------------- */
const statPills = [
  { label: "7+ Years Local Expertise", icon: Leaf },
  { label: "250+ Species Spotted", icon: PawPrint },
  { label: "100% Private Jeeps", icon: Car },
];

/* Helper: map safari card index to its image + srcSet */
function getSafariImage(i: number) {
  const idx = i % 5;
  const map = [elephantPortrait, ethicalImg, wildlife, landscape, elephantPortrait] as const;
  return map[idx];
}

/* ------------------- HOME PAGE ----------------------------------------- */
export default function Home() {
  const visibleSafaris = safaris;
  const visibleFaqs = faqs;
  const visibleRoutes = travelRoutes;

  /* Duplicate reviews for infinite marquee */
  const allReviews = [...reviewsData.reviews, ...reviewsData.reviews];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Udawalawe National Park Safari Tours",
    provider: {
      "@type": "LocalBusiness",
      name: "Udawalawe Wild",
    },
    description:
      "Private jeep safari tours in Udawalawe National Park with verified local operators.",
    areaServed: {
      "@type": "Place",
      name: "Udawalawe National Park",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Safari Packages",
      itemListElement: visibleSafaris.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
        },
        position: idx + 1,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* ----------------------- HERO ---------------------------------- */}
      {/* header is fixed+transparent, so hero fills full 100svh from top */}
      <section className="relative isolate z-10 overflow-hidden h-[100svh] min-h-[600px] sm:min-h-[680px] flex flex-col">
        {/* ── Background Slideshow & Static LCP ──────────────────────── */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={landscape}
            alt="Sweeping savanna landscape of Udawalawe National Park"
            title="Udawalawe Safari Jeep Booking - Best Private Safari Tours"
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            className="hidden sm:block object-cover object-center"
          />
          <Image
            src={elephantPortrait}
            alt="Close-up portrait of a Sri Lankan elephant during a morning safari in Udawalawe"
            title="Best time for elephant sightings in Udawalawe"
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            className="block sm:hidden object-cover object-center"
          />
          <HeroSlideshow />
          {/* Cinematic dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.015_135_/_0.92)] via-[oklch(0.18_0.015_135_/_0.48)] to-[oklch(0.18_0.015_135_/_0.15)] z-10" />
          {/* Left-side dark anchor so text always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.015_135_/_0.72)] via-[oklch(0.18_0.015_135_/_0.2)] to-transparent z-10" />
          {/* Golden-hour warm wash from right (hidden on mobile to prevent yellow tint) */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-l from-[oklch(0.70_0.12_85_/_0.1)] to-transparent z-10" />
        </div>

        {/* ── Wildlife ticker — rendered BELOW the fixed header (top-16) ─ */}
        {/* Header is ~64px tall + 16px offset = 80px, so we offset ticker by 88px */}
        <div
          className="absolute left-0 right-0 h-9 overflow-hidden flex items-center"
          style={{
            top: "88px",
            background: "oklch(0.18 0.015 135 / 0.55)",
            borderTop: "1px solid oklch(1 0 0 / 0.06)",
            borderBottom: "1px solid oklch(1 0 0 / 0.08)",
            backdropFilter: "blur(12px) saturate(1.4)",
          }}
        >
          <LogoTicker duration={32} pauseOnHover className="h-full w-full items-center">
            {[
              "🐘 Elephant",
              "🦅 Eagle",
              "🦊 Jackal",
              "🐊 Crocodile",
              "🦚 Peacock",
              "🦬 Buffalo",
              "🐆 Leopard",
              "🐦 Kingfisher",
            ].map((s, i) => (
              <span
                key={i}
                className="px-5 text-[10px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap text-white"
                style={{ color: "oklch(0.98 0.005 95 / 0.6)" }}
              >
                {s}
                <span className="ml-5 text-white/40">·</span>
              </span>
            ))}
          </LogoTicker>
        </div>

        {/* ── Live rating badge — liquid glass pill ───────────────── */}
        <HeroFadeIn className="absolute top-[120px] right-4 sm:right-8 hidden sm:flex items-center gap-2 rounded-full px-4 py-2.5 z-20">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2.5"
            style={{
              background: "oklch(1 0 0 / 0.08)",
              border: "1px solid oklch(1 0 0 / 0.18)",
              backdropFilter: "blur(20px) saturate(1.8)",
              boxShadow: "0 4px 24px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.15)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.70_0.12_85)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.70_0.12_85)]" />
            </span>
            <span className="text-xs font-semibold text-white" style={{ color: "oklch(0.98 0.005 95)" }}>
              {reviewsData.listingRating} ★ · {reviewsData.listingReviewCount} Google Reviews
            </span>
          </div>
        </HeroFadeIn>

        {/* ── Main content — centered; pt accounts for header (80px) + gap + ticker (36px) ── */}
        <div className="flex-1 flex items-center pt-[110px] sm:pt-[130px] pb-24 sm:pb-8">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-4 sm:py-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-center">
            {/* Left — headline + CTAs */}
            <div className="z-10">
              <HeroFadeIn>
                <div
                  className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    background: "oklch(1 0 0 / 0.1)",
                    border: "1px solid oklch(1 0 0 / 0.2)",
                    backdropFilter: "blur(20px) saturate(1.6)",
                    boxShadow: "0 2px 16px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.2)",
                  }}
                >
                  <Sparkles className="h-3 w-3" style={{ color: "oklch(0.80 0.08 85)" }} />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                    style={{ color: "oklch(0.98 0.005 95 / 0.85)" }}
                  >
                    Udawalawe, Sri Lanka
                  </span>
                </div>
              </HeroFadeIn>

              <StaggeredHero
                title="Private Udawalawe Safari Tours"
                subtitle="Experience Udawalawe wildly. Private, wildlife-first safaris with verified local partners, transparent pricing, and simple planning."
                className="text-white"
                style={{ color: "oklch(0.98 0.005 95)" }}
              >
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Magnetic className="w-full sm:w-auto" intensity={0.15}>
                    <Link
                      to="/book"
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                      style={{
                        background: "oklch(0.70 0.12 85)",
                        color: "oklch(0.22 0.02 135)",
                        boxShadow: "0 4px 24px oklch(0.70 0.12 85 / 0.4)",
                      }}
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Plan my safari
                    </Link>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto" intensity={0.15}>
                    <a
                      href={waLink("Hi Udawalawe Wild, I'd like to plan a safari.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-white"
                      style={{
                        border: "1px solid oklch(1 0 0 / 0.22)",
                        color: "oklch(0.98 0.005 95)",
                        background: "oklch(1 0 0 / 0.1)",
                        backdropFilter: "blur(20px) saturate(1.6)",
                        boxShadow:
                          "0 4px 20px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.2)",
                      }}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Chat on WhatsApp
                    </a>
                  </Magnetic>
                </div>

                {/* Stat pills — scrollable on mobile, wrap on desktop */}
                <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-2.5 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                  {statPills.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white"
                      style={{
                        background: "oklch(1 0 0 / 0.1)",
                        border: "1px solid oklch(1 0 0 / 0.18)",
                        color: "oklch(0.98 0.005 95)",
                        backdropFilter: "blur(20px) saturate(1.6)",
                        boxShadow:
                          "0 2px 12px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.18)",
                      }}
                    >
                      <Icon
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        style={{ color: "oklch(0.80 0.08 85)" }}
                        aria-hidden="true"
                      />
                      {label}
                    </div>
                  ))}
                </div>
              </StaggeredHero>
            </div>

            {/* Right — enquiry glass card */}
            <Reveal delay={300} direction="left" className="hidden sm:block">
              <div
                className="rounded-3xl p-6 sm:p-8 card-glass"
                style={{
                  boxShadow: "0 32px 80px oklch(0.18 0.015 135 / 0.4)",
                }}
              >
                <div className="mb-4">
                  <Eyebrow className="text-[oklch(0.70_0.01_135)]">Check availability</Eyebrow>
                  <div className="font-serif text-2xl text-[oklch(0.98_0.005_95)]">
                    Start with your dates.
                  </div>
                  <p className="mt-1 text-xs text-[oklch(0.70_0.01_135)]">
                    A real person will reply with verified options within one business day.
                  </p>
                </div>
                <EnquiryForm theme="dark" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Scroll cue ──────────────────────────────────────────── */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
          style={{ color: "oklch(0.98 0.005 95 / 0.5)" }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">Explore</span>
          <div
            className="h-8 w-5 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1.5px solid oklch(1 0 0 / 0.25)" }}
          >
            <div
              className="h-1.5 w-1 rounded-full animate-bounce"
              style={{ background: "oklch(0.70 0.12 85)" }}
            />
          </div>
        </div>
      </section>

      {/* ------------------- TRUST STRIP ------------------------------- */}
      <div className="relative overflow-hidden bg-sand-100 text-forest-900 border-b border-border">
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <StatsCount
          stats={trustStatsForComponent}
          title="TRUSTED BY ADVENTURERS WORLDWIDE"
          className="bg-sand-200 text-forest-900"
        />
      </div>

      {/* ------------------- SAFARIS ------------------------------------ */}
      <div className="section-forest-700">
        <Section style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Safari options"
                title="Five ways to explore the park."
                intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
              />
              <Link
                to="/safaris"
                className="link-underline flex shrink-0 items-center gap-1 text-sm font-medium text-accent"
              >
                Compare all options
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Mobile: horizontal snap scroll | Desktop: 5-col grid */}
          <div className="mt-10">
            <SafariScroll safaris={visibleSafaris} />
          </div>
        </Section>
      </div>

      {/* ------------------- BENEFITS ----------------------------------- */}
      <div className="bg-sand-100 text-forest-900">
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Why Udawalawe Wild"
              title="A better way to explore the wild."
              intro="We're small on purpose. Our job is to make your safari calmer, clearer, and kinder to the wildlife you came to see."
              titleClass="text-forest-900"
              introClass="text-text-muted-on-light"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 90}>
                <TiltCard intensity={6} className="h-full">
                  <div className="benefit-tile h-full" style={{ transformStyle: "preserve-3d" }}>
                    {/* Icon */}
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "oklch(0.70 0.12 85 / 0.18)",
                        border: "1px solid oklch(0.70 0.12 85 / 0.35)",
                      }}
                    >
                      <b.icon
                        className="h-4.5 w-4.5"
                        style={{ color: "oklch(0.80 0.08 85)" }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="font-serif text-xl text-forest-900">{b.t}</div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted-on-light">
                      {b.d}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* ------------------- ELEPHANT TRANSIT HOME ---------------------- */}
      <div className="section-forest-700">
        <Section>
          <Reveal>
            <div className="grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center card-glass">
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-light-on-dark)]/70">
                  Special Experience
                </div>
                <h2
                  className="mt-1 font-serif text-2xl sm:text-3xl"
                  style={{ color: "oklch(0.98 0.005 95)" }}
                >
                  Visit the Elephant Transit Home
                </h2>
                <p
                  className="mt-3 text-sm leading-relaxed sm:text-base"
                  style={{ color: "oklch(0.70 0.01 135)" }}
                >
                  Located right beside Udawalawe National Park, the Elephant Transit Home (ETH)
                  rehabilitates orphaned wild elephant calves until they are strong enough to be
                  released back into the wild. Combine your safari with a public feeding view for a
                  rare, ethical glimpse into elephant conservation.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    to="/safaris"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "oklch(0.70 0.12 85)",
                      color: "oklch(0.94 0.01 100)",
                      boxShadow: "0 4px 20px oklch(0.70 0.12 85 / 0.4)",
                    }}
                  >
                    Explore Combo Package
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/guide"
                    className="text-xs font-medium transition-colors hover:text-white"
                    style={{ color: "oklch(0.80 0.08 85)" }}
                  >
                    Learn about ETH in our guide →
                  </Link>
                </div>
              </div>
              <TiltCard intensity={5} className="overflow-hidden rounded-2xl aspect-[4/3] relative">
                <div
                  style={{
                    boxShadow: "0 16px 48px oklch(0 0 0 / 0.35)",
                    transformStyle: "preserve-3d",
                  }}
                  className="h-full w-full absolute inset-0"
                >
                  <Image
                    src={elephantPortrait}
                    alt="Orphaned elephant calf being rehabilitated at the Udawalawe Elephant Transit Home"
                    title="Udawalawe Elephant Transit Home feeding times and safari combo"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* ------------------- ETHICAL CODE ------------------------------- */}
      <div className="bg-sand-100 text-forest-900">
        <Section style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal
              direction="left"
              className="grain overflow-hidden rounded-2xl relative h-[280px] sm:h-[380px] lg:h-[480px] w-full"
            >
              <Image
                src={wildlife}
                alt="Peacock and water buffalo peacefully resting in Udawalawe National Park"
                title="Ethical Wildlife Safari in Udawalawe National Park"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </Reveal>

            <Reveal delay={120} direction="right">
              <SectionHeading
                eyebrow="Ethical safari code"
                title="Wildlife comes first."
                intro="Great sightings happen when animals feel unbothered. Our partners agree to a simple, non-negotiable code."
              />
              <ul className="mt-6 space-y-3">
                {ethicsRules.map(({ icon: Icon, r }, i) => (
                  <Reveal key={r} delay={i * 80} direction="right">
                    <li className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-900/5 border border-forest-900/20">
                        <Icon className="h-3.5 w-3.5 text-forest-900" aria-hidden="true" />
                      </span>
                      {r}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link
                to="/ethical-safari"
                className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
              >
                Read the full standard
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* ------------------- ROUTES ------------------------------------- */}
      <div
        className="section-forest-700"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "auto 600px",
        }}
      >
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Getting there"
              title="Coming from the coast or the hills?"
              titleClass="text-[oklch(0.98_0.005_95)]"
              introClass="text-[oklch(0.70_0.01_135)]"
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 items-stretch">
            {visibleRoutes.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70} className="h-full">
                <TiltCard className="h-full" intensity={6}>
                  <Link
                    to={`/${r.slug}`}
                    className="group flex h-full flex-col gap-1.5 rounded-xl p-4 transition-all duration-300 card-glass hover:border-[oklch(0.70_0.12_85_/_0.4)] hover:shadow-[0_0_0_1px_oklch(0.70_0.12_85_/_0.2),_0_16px_40px_oklch(0_0_0_/_0.3)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[color:var(--text-light-on-dark)]/70">
                      <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                      From
                    </div>
                    <div
                      className="font-serif text-base leading-tight sm:text-xl"
                      style={{ color: "oklch(0.98 0.005 95)" }}
                    >
                      {r.from}
                    </div>
                    <div className="text-xs leading-snug" style={{ color: "oklch(0.70 0.01 135)" }}>
                      {r.drive}
                    </div>
                    <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-medium transition-opacity duration-200 text-accent">
                      View route
                      <ChevronRight
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* ------------------- TESTIMONIALS ------------------------------- */}
      <section
        className="bg-sand-100 text-forest-900 overflow-hidden border-y border-border py-16 sm:py-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}
      >
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
        <ReviewCarousel allReviews={allReviews} />
      </section>

      {/* ------------------- FAQ ---------------------------------------- */}
      <div
        className="bg-sand-100 text-forest-900"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
      >
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          </Reveal>
          <div className="mt-8">
            <FaqList items={visibleFaqs} />
          </div>
        </Section>
      </div>

      {/* ------------------- FINAL CTA ---------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={landscape}
          alt="Golden hour sweeping savanna landscape in Udawalawe National Park"
          title="Udawalawe Safari Jeep Booking"
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.82)]" />

        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[color:var(--ivory)] sm:px-8 sm:py-32">
          <Reveal direction="scale">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--ivory)]/25 bg-[color:var(--ivory)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[color:var(--ivory)]/75">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--ivory)]/70" aria-hidden="true" />
              Start planning today
            </div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Ready to plan your safari?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[color:var(--ivory)]/80">
              Send us your dates. We'll come back with verified options and a fixed quote within one
              business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Magnetic className="w-full sm:w-auto">
                <Link
                  to="/book"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[oklch(0.70_0.12_85)] hover:bg-[oklch(0.80_0.08_85)] px-6 py-3 text-sm font-semibold text-[oklch(0.22_0.02_135)] shadow-md transition-all duration-200 active:scale-95"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Plan my safari
                </Link>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[color:var(--ivory)]/50 px-6 py-3 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/15 hover:border-[color:var(--ivory)]/80 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
