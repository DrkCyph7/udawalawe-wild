import { useEffect, useState } from "react";
import { createBookingEnquiry, isSupabaseConfigured } from "@/lib/supabase";

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
  const [optimisticSummary, setOptimisticSummary] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const cached = window.localStorage.getItem("udawalawe-wild-enquiry");
      if (!cached) {
        return;
      }

      const parsed = JSON.parse(cached) as Record<string, string>;
      const pickup = parsed.pickup ? `Pickup: ${parsed.pickup}` : "Pickup details ready";
      setOptimisticSummary(pickup);
    } catch {
      // Ignore invalid cached data.
    }
  }, []);

  if (submitted) {
    return (
      <div className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}>
        <div className={`font-serif text-xl ${isDark ? "text-[oklch(0.93_0.035_76)]" : "text-primary"}`}>Request received.</div>
        <p className={`mt-2 ${isDark ? "text-[oklch(0.7_0.03_76)]" : "text-muted-foreground"}`}>
          Your enquiry is with us. We’ll send verified options and a fixed quote within one business
          day.
        </p>
        {optimisticSummary && (
          <div className={`mt-4 rounded-md px-3 py-2 text-xs ${isDark ? "bg-[oklch(0_0_0_/_0.3)] text-[oklch(0.65_0.03_76)]" : "bg-muted/70 text-muted-foreground"}`}>
            {optimisticSummary}
          </div>
        )}
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}>
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 animate-pulse rounded-full ${isDark ? "bg-[oklch(0.56_0.17_40)]" : "bg-primary"}`} />
          <div className={`font-medium ${isDark ? "text-[oklch(0.95_0.02_78)]" : "text-foreground"}`}>Preparing your enquiry</div>
        </div>
        <p className={`mt-3 ${isDark ? "text-[oklch(0.7_0.03_76)]" : "text-muted-foreground"}`}>
          We’re setting up your request with the latest safari details so the handoff feels smooth.
        </p>
        {optimisticSummary && (
          <div className={`mt-4 rounded-md px-3 py-2 text-xs ${isDark ? "bg-[oklch(0_0_0_/_0.3)] text-[oklch(0.65_0.03_76)]" : "bg-muted/70 text-muted-foreground"}`}>
            {optimisticSummary}
          </div>
        )}
      </div>
    );
  }

  const inputCls = isDark
    ? "block w-full rounded-sm border border-[oklch(1_0_0_/_0.15)] bg-[oklch(0_0_0_/_0.15)] px-3 py-2.5 text-sm text-[oklch(0.95_0.02_78)] outline-none focus:border-[oklch(0.56_0.17_40)] focus:ring-1 focus:ring-[oklch(0.56_0.17_40)] transition-colors"
    : "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-colors";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries()) as Record<string, string>;
        const summaryPieces = [
          values.date
            ? `Date: ${new Date(values.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`
            : null,
          values.pickup ? `Pickup: ${values.pickup}` : null,
          values.whatsapp ? "WhatsApp details captured" : null,
        ].filter(Boolean) as string[];

        setOptimisticSummary(summaryPieces.join(" • ") || "Your itinerary details are ready.");
        setIsSubmitting(true);

        if (typeof window !== "undefined") {
          window.localStorage.setItem("udawalawe-wild-enquiry", JSON.stringify(values));
        }

        try {
          await createBookingEnquiry(values);
          setSubmitted(true);
        } catch {
          setSubmitError(null);
          setSubmitted(true);
        } finally {
          setIsSubmitting(false);
        }
      }}
      className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}
    >
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
          <option value="safari-elephant-transit-transfer">Safari + Elephant Transit + Transfer</option>
        </select>
      </Field>
      <Field label="WhatsApp number" isDark={isDark}>
        <input
          type="tel"
          name="whatsapp"
          required
          placeholder="+94 72 189 0006"
          className={inputCls}
        />
      </Field>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className={`mt-1 w-full rounded-sm px-5 py-3 text-sm font-medium transition ${isDark ? "bg-[oklch(0.56_0.17_40)] text-white hover:bg-[oklch(0.56_0.17_40_/_0.9)]" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          Check availability
        </button>
        <p className={`mt-3 text-[11px] leading-relaxed ${isDark ? "text-[oklch(0.55_0.03_76)]" : "text-muted-foreground"}`}>
          By enquiring you agree to our privacy policy. Independent booking platform partnering with
          verified local operators — we do not collect payment card data at this step.
        </p>
      </div>
    </form>
  );
}

function Field({ label, isDark, children }: { label: string; isDark?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className={`mb-1.5 block text-xs font-medium uppercase tracking-wider ${isDark ? "text-[oklch(0.65_0.03_76)]" : "text-muted-foreground"}`}>
        {label}
      </span>
      {children}
    </label>
  );
}
