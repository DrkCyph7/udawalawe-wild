import type { ReactNode } from "react";
import { TransitionLink as Link } from "@/components/transition-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface CtaProps {
  label: string;
  href: string;
}

export function GuideArticle({
  eyebrow,
  title,
  breadcrumbs,
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  cta?: CtaProps;
  children: ReactNode;
}) {
  return (
    <main
      className="min-h-screen pb-20 pt-24 sm:pt-32"
      style={{ background: "oklch(0.98 0.005 90)" }}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Eyebrow + Title */}
        <div className="mt-6">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "oklch(0.60 0.12 85)" }}
          >
            {eyebrow}
          </p>
          <h1
            className="font-serif text-3xl leading-tight sm:text-5xl"
            style={{ color: "oklch(0.22 0.04 135)" }}
          >
            {title}
          </h1>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: "oklch(0.70 0.12 85 / 0.2)" }}
        />

        {/* Article body */}
        <article className="guide-article">{children}</article>

        {/* CTA card */}
        {cta && (
          <div
            className="mt-16 rounded-2xl p-6 sm:p-8"
            style={{
              background: "oklch(0.94 0.04 85 / 0.4)",
              border: "1px solid oklch(0.70 0.12 85 / 0.22)",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.60 0.12 85)" }}
            >
              Ready to go?
            </p>
            <Link
              to={cta.href}
              className="group mt-3 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.70 0.12 85)",
                color: "oklch(0.18 0.04 135)",
              }}
            >
              {cta.label}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}

        {/* Back to guide */}
        <div className="mt-12">
          <Link
            to="/guide"
            className="text-sm font-medium hover:underline"
            style={{ color: "oklch(0.50 0.04 135)" }}
          >
            ← Back to Safari Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
