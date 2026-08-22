"use client";
import { useEffect, useState } from "react";
import { createBookingEnquiry, isSupabaseConfigured } from "@/lib/supabase";
import { buildSafariMessage, waLink } from "@/lib/site";
import { fetchGeoInfo } from "@/lib/geo";

type Props = {
  compact?: boolean;
  defaultSafari?: string;
  defaultPickup?: string;
  theme?: "light" | "dark";
};

export function EnquiryForm({ compact, defaultSafari, defaultPickup, theme = "light" }: Props) {
  const isDark = theme === "dark";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cached = window.localStorage.getItem("udawalawe-wild-enquiry");
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, string>;
        setSubmittedData(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  if (submitted) {
    return (
      <div
        className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}
      >
        <div
          className={`font-serif text-xl ${isDark ? "text-[oklch(0.98_0.005_95)]" : "text-primary"}`}
        >
          Request received ✓
        </div>
        <p className={`mt-2 ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
          We'll contact you on WhatsApp with availability and pricing. We typically reply within a
          few hours.
        </p>

        {/* Optional WhatsApp nudge */}
        <div
          className={`mt-4 rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-border bg-muted/30"}`}
        >
          <p
            className={`text-xs font-medium ${isDark ? "text-[oklch(0.85_0.005_95)]" : "text-foreground"}`}
          >
            Need a faster reply?
          </p>
          <a
            href={waLink(buildSafariMessage(submittedData))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-[#22bf5b]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Also message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div
        className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-2.5 w-2.5 animate-pulse rounded-full ${isDark ? "bg-[oklch(0.70_0.12_85)]" : "bg-primary"}`}
          />
          <div
            className={`font-medium ${isDark ? "text-[oklch(0.98_0.005_95)]" : "text-foreground"}`}
          >
            Sending your enquiry…
          </div>
        </div>
        <p className={`mt-3 ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
          Saving your request — this only takes a moment.
        </p>
      </div>
    );
  }

  const inputCls = isDark
    ? "block w-full rounded-sm border border-[oklch(1_0_0_/_0.15)] bg-[oklch(0_0_0_/_0.15)] px-3 py-2.5 text-sm text-[oklch(0.98_0.005_95)] outline-none focus:border-[oklch(0.70_0.12_85)] focus:ring-1 focus:ring-[oklch(0.70_0.12_85)] transition-colors"
    : "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-colors";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries()) as Record<string, string>;

        setSubmittedData(values);
        setIsSubmitting(true);

        if (typeof window !== "undefined") {
          window.localStorage.setItem("udawalawe-wild-enquiry", JSON.stringify(values));
        }

        try {
          // fetchGeoInfo never throws — resolves with nulls on any failure.
          const geo = await fetchGeoInfo();
          await createBookingEnquiry(values, geo);
          setSubmitted(true);
        } catch (err) {
          if (isSupabaseConfigured) {
            const msg =
              err instanceof Error
                ? `Submission failed: ${err.message}. Please verify your details or try again.`
                : "Oops! We couldn't check availability right now. Please verify your connection and try again.";
            setSubmitError(msg);
          } else {
            // Supabase not configured in this environment — still show success.
            setSubmitted(true);
          }
        } finally {
          setIsSubmitting(false);
        }
      }}
      className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}
    >
      {submitError && (
        <div className="sm:col-span-2 rounded-sm border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {submitError}
        </div>
      )}

      <Field label="Preferred safari date" isDark={isDark}>
        <input type="date" name="date" required className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Adults" isDark={isDark}>
          <input
            type="number"
            name="adults"
            min={1}
            defaultValue={2}
            required
            className={inputCls}
          />
        </Field>
        <Field label="Children" isDark={isDark}>
          <input type="number" name="children" min={0} defaultValue={0} className={inputCls} />
        </Field>
      </div>
      <Field label="Pickup location" isDark={isDark}>
        <input
          type="text"
          name="pickup"
          placeholder="Hotel or town"
          defaultValue={defaultPickup}
          className={inputCls}
        />
      </Field>
      <Field label="Safari type" isDark={isDark}>
        <select name="type" defaultValue={defaultSafari ?? ""} className={inputCls}>
          <option value="">Not sure yet</option>
          <option value="morning-private-safari">Morning Private Safari</option>
          <option value="afternoon-private-safari">Afternoon Private Safari</option>
          <option value="full-day-wildlife-safari">Full-Day Wildlife Safari</option>
          <option value="safari-transfer">Safari + Transfer</option>
          <option value="safari-elephant-transit-transfer">
            Safari + Elephant Transit + Transfer
          </option>
        </select>
      </Field>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className={`mt-1 w-full rounded-sm px-5 py-3 text-sm font-medium transition ${isDark ? "bg-[oklch(0.70_0.12_85)] text-[oklch(0.22_0.02_135)] hover:bg-[oklch(0.70_0.12_85_/_0.9)]" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          Check availability
        </button>
        <p
          className={`mt-3 text-[11px] leading-relaxed ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}
        >
          By enquiring you agree to our privacy policy. Independent booking platform partnering with
          verified local operators — we do not collect payment card data at this step.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  isDark,
  children,
}: {
  label: string;
  isDark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span
        className={`mb-1.5 block text-xs font-medium uppercase tracking-wider ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
