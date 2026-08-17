import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/section";
import { createBookingEnquiry } from "@/lib/supabase";
import { Magnetic } from "@/components/magnetic";
import { buildSafariMessage, waLink } from "@/lib/site";
import { fetchGeoInfo } from "@/lib/geo";

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
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/book" }],
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
        // Fetch geo info first (max 4 s timeout), then save to DB.
        // fetchGeoInfo() never throws — it always resolves with nulls on failure.
        const geo = await fetchGeoInfo();
        await createBookingEnquiry(data, geo);
        setStep(3);
      } catch (error) {
        // Stay on the form so the guest sees the error and can retry.
        const fallbackMessage =
          error instanceof Error 
            ? `Submission failed: ${error.message}. Please check your details or try again later.` 
            : "Oops! We couldn't submit your booking. Please check your internet connection and try again.";
        setSubmitError(fallbackMessage);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setStep((s) => s + 1);
  };


  return (
    <div className="section-dark min-h-[calc(100vh-80px)] pt-12 pb-24">
      <Section>
        <div className="mx-auto max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--ivory)]/70">
            Booking enquiry
          </div>
          <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">
            Plan your safari.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Four short steps. No payment yet — we reply with verified options and a fixed quote
            first.
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

          <div className="mt-10 rounded-3xl p-5 sm:p-8 card-glass">
            {submitError && (
              <div className="mb-4 rounded-sm border border-amber-300/60 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {submitError}
              </div>
            )}

            {/* ── Step 0: Dates & travellers ── */}
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

            {/* ── Step 1: Safari & pickup ── */}
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
                    <option value="safari-transfer">Safari + Transfer</option>
                    <option value="safari-elephant-transit-transfer">
                      Safari + Elephant Transit + Transfer
                    </option>
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

            {/* ── Step 2: Your details ── */}
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
                <Field label="Email (for our reply)">
                  <input
                    type="email"
                    required
                    defaultValue={data.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="WhatsApp number (optional)">
                  <input
                    type="tel"
                    placeholder="+94 74 380 7446"
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

            {/* ── Step 3: Confirmation ── */}
            {step === 3 && (
              <div className="py-8 text-center">
                {/* Success icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.70_0.12_85)]/15 ring-1 ring-[oklch(0.70_0.12_85)]/30">
                  <svg
                    className="h-8 w-8 text-[oklch(0.70_0.12_85)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="mt-5 font-serif text-3xl text-foreground">
                  Enquiry received!
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We've logged your safari request and will reply with verified options and a fixed
                  quote within one business day.
                </p>

                {/* Optional WhatsApp nudge */}
                <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-foreground">
                    Need a faster reply?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Drop us a WhatsApp message right now and we'll get back to you instantly.
                  </p>
                  <a
                    href={waLink(buildSafariMessage(data))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-105 hover:bg-[#22bf5b]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Also message us on WhatsApp
                  </a>
                </div>

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
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => void handleNext()}
                    disabled={isSubmitting}
                    className="rounded-xl bg-[oklch(0.70_0.12_85)] hover:bg-[oklch(0.80_0.08_85)] px-6 py-3 text-sm font-semibold text-[oklch(0.22_0.02_135)] shadow-[0_4px_20px_oklch(0.70_0.12_85_/_0.4)] transition-all duration-300 hover:scale-[1.03] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Sending…" : step === 2 ? "Send enquiry" : "Continue"}
                  </button>
                </Magnetic>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

const inputCls =
  "block w-full rounded-xl border border-input/20 bg-background/50 backdrop-blur-md px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--terracotta)]/50 focus:bg-background/80 focus:ring-2 focus:ring-[color:var(--terracotta)]/20";

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
