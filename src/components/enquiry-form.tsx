import { useEffect, useState } from "react";
import { createBookingEnquiry, isSupabaseConfigured } from "@/lib/supabase";

type Props = {
  compact?: boolean;
  defaultSafari?: string;
  defaultPickup?: string;
};

export function EnquiryForm({ compact, defaultSafari, defaultPickup }: Props) {
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
      <div className="rounded-sm border border-border bg-card p-6 text-sm shadow-sm">
        <div className="font-serif text-xl text-primary">Request received.</div>
        <p className="mt-2 text-muted-foreground">
          Your enquiry is with us. We’ll send verified options and a fixed quote within one business
          day.
        </p>
        {submitError && (
          <div className="mt-4 rounded-md border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {submitError}
          </div>
        )}
        {optimisticSummary && (
          <div className="mt-4 rounded-md bg-muted/70 px-3 py-2 text-xs text-muted-foreground">
            {optimisticSummary}
          </div>
        )}
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="rounded-sm border border-border bg-card p-6 text-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
          <div className="font-medium text-foreground">Preparing your enquiry</div>
        </div>
        <p className="mt-3 text-muted-foreground">
          We’re setting up your request with the latest safari details so the handoff feels smooth.
        </p>
        {optimisticSummary && (
          <div className="mt-4 rounded-md bg-muted/70 px-3 py-2 text-xs text-muted-foreground">
            {optimisticSummary}
          </div>
        )}
      </div>
    );
  }

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
        } catch (error) {
          const fallbackMessage =
            error instanceof Error
              ? error.message
              : "We couldn't sync the enquiry to the database yet.";
          setSubmitError(
            isSupabaseConfigured
              ? fallbackMessage
              : "Your enquiry was saved locally for now. Connect Supabase to push it into the admin dashboard.",
          );
          setSubmitted(true);
        } finally {
          setIsSubmitting(false);
        }
      }}
      className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}
    >
      <Field label="Preferred safari date">
        <input type="date" name="date" required className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Adults">
          <input
            type="number"
            name="adults"
            min={1}
            defaultValue={2}
            required
            className={inputCls}
          />
        </Field>
        <Field label="Children">
          <input type="number" name="children" min={0} defaultValue={0} className={inputCls} />
        </Field>
      </div>
      <Field label="Pickup location">
        <input
          type="text"
          name="pickup"
          placeholder="Hotel or town"
          defaultValue={defaultPickup}
          className={inputCls}
        />
      </Field>
      <Field label="Safari type">
        <select name="type" defaultValue={defaultSafari ?? ""} className={inputCls}>
          <option value="">Not sure yet</option>
          <option value="morning-private-safari">Morning Private Safari</option>
          <option value="afternoon-private-safari">Afternoon Private Safari</option>
          <option value="full-day-wildlife-safari">Full-Day Wildlife Safari</option>
          <option value="safari-ella-transfer">Safari + Ella Transfer</option>
        </select>
      </Field>
      <Field label="WhatsApp number">
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
          className="mt-1 w-full rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Check availability
        </button>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          By enquiring you agree to our privacy policy. Independent booking platform partnering with
          verified local operators — we do not collect payment card data at this step.
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none ring-primary/30 focus:border-primary focus:ring-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
