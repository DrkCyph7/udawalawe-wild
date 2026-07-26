import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/section";
import { createBookingEnquiry } from "@/lib/supabase";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Request availability — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Send a booking enquiry for a private Udawalawe safari. We'll reply with verified options and a fixed quote within one business day.",
      },
      { property: "og:title", content: "Request availability — Udawalawe Wild" },
      { property: "og:description", content: "Send an enquiry for a private Udawalawe safari." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const steps = ["Dates & travellers", "Safari & pickup", "Your details", "Confirmed"];

function BookPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const handleNext = async () => {
    if (step === 2) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await createBookingEnquiry(data);
        setStep(3);
      } catch (error) {
        // Stay on the form (do NOT advance to the "confirmed" step) so the guest
        // sees the real error and can retry, instead of a false success screen.
        const fallbackMessage = error instanceof Error ? error.message : "Unable to submit enquiry";
        setSubmitError(fallbackMessage);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setStep((s) => s + 1);
  };

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
          Booking enquiry
        </div>
        <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">Plan your safari.</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Four short steps. No payment yet — we reply with verified options and a fixed quote first.
        </p>

        <ol className="mt-10 flex items-center gap-3 text-xs">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-3">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] ${
                  i <= step
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden truncate sm:block ${
                  i === step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-sm border border-border bg-card p-5 sm:p-8">
          {submitError && (
            <div className="mb-4 rounded-sm border border-amber-300/60 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {submitError}
            </div>
          )}

          {step === 0 && (
            <div className="grid gap-4">
              <Field label="Preferred safari date">
                <input
                  type="date"
                  required
                  onChange={(e) => setField("date", e.target.value)}
                  defaultValue={data.date}
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Adults">
                  <input
                    type="number"
                    min={1}
                    defaultValue={data.adults ?? "2"}
                    onChange={(e) => setField("adults", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Children">
                  <input
                    type="number"
                    min={0}
                    defaultValue={data.children ?? "0"}
                    onChange={(e) => setField("children", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              <Field label="Safari preference">
                <select
                  defaultValue={data.type ?? ""}
                  onChange={(e) => setField("type", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Not sure yet — recommend for me</option>
                  <option value="morning-private-safari">Morning Private Safari</option>
                  <option value="afternoon-private-safari">Afternoon Private Safari</option>
                  <option value="full-day-wildlife-safari">Full-Day Wildlife Safari</option>
                  <option value="safari-ella-transfer">Safari + Ella Transfer</option>
                </select>
              </Field>
              <Field label="Pickup location">
                <input
                  type="text"
                  placeholder="Hotel, town, or airport"
                  defaultValue={data.pickup}
                  onChange={(e) => setField("pickup", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Drop-off location">
                <input
                  type="text"
                  placeholder="Same as pickup, or next hotel"
                  defaultValue={data.dropoff}
                  onChange={(e) => setField("dropoff", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Full name">
                <input
                  type="text"
                  required
                  defaultValue={data.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  required
                  defaultValue={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="WhatsApp number">
                <input
                  type="tel"
                  required
                  placeholder="+94 72 189 0006"
                  defaultValue={data.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Hotel name (if known)">
                <input
                  type="text"
                  defaultValue={data.hotel}
                  onChange={(e) => setField("hotel", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Special requests">
                <textarea
                  rows={4}
                  defaultValue={data.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[color:var(--terracotta)]/15 text-[color:var(--terracotta)]">
                ✓
              </div>
              <h2 className="mt-5 font-serif text-3xl text-foreground">Your request is with us.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                We will send verified options and a fixed quote within one business day. In the
                meantime, feel free to message us on WhatsApp for anything urgent.
              </p>
              <p className="mx-auto mt-6 max-w-md text-xs text-muted-foreground">
                Independent booking platform partnering with verified local operators. No payment
                card data is collected at this step.
              </p>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm text-muted-foreground disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => void handleNext()}
                disabled={isSubmitting}
                className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? "Sending…" : step === 2 ? "Send enquiry" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

const inputCls =
  "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
