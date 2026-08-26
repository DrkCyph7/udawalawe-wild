"use client";
import { useEffect, useRef, useState } from "react";
import { createBookingEnquiry, isSupabaseConfigured } from "@/lib/supabase";
import { buildSafariMessage, waLink } from "@/lib/site";
import { fetchGeoInfo } from "@/lib/geo";

/* ─── COUNTRY CODES ─────────────────────────────────────────────────── */
const COUNTRY_CODES = [
  { code: "+94", label: "🇱🇰 +94" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+60", label: "🇲🇾 +60" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+46", label: "🇸🇪 +46" },
  { code: "+47", label: "🇳🇴 +47" },
  { code: "+45", label: "🇩🇰 +45" },
  { code: "+358", label: "🇫🇮 +358" },
  { code: "+48", label: "🇵🇱 +48" },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+27", label: "🇿🇦 +27" },
  { code: "+64", label: "🇳🇿 +64" },
  { code: "+63", label: "🇵🇭 +63" },
  { code: "+66", label: "🇹🇭 +66" },
  { code: "+62", label: "🇮🇩 +62" },
  { code: "+84", label: "🇻🇳 +84" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+20", label: "🇪🇬 +20" },
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+254", label: "🇰🇪 +254" },
];

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
function isValidPhone(v: string) {
  const digits = v.replace(/[\s\-().]/g, "");
  return /^\d{6,14}$/.test(digits);
}

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

  const [email, setEmail] = useState("");
  const [phoneCC, setPhoneCC] = useState("+94");
  const [phone, setPhone] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [contactErr, setContactErr] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cached = window.localStorage.getItem("udawalawe-wild-enquiry");
      if (cached) setSubmittedData(JSON.parse(cached) as Record<string, string>);
    } catch { /**/ }
  }, []);

  function validateContact(): boolean {
    setEmailErr(""); setPhoneErr(""); setContactErr("");
    const hasEmail = email.trim().length > 0;
    const hasPhone = phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      setContactErr("Please provide at least one — email or WhatsApp/mobile number.");
      return false;
    }
    let ok = true;
    if (hasEmail && !isValidEmail(email)) {
      setEmailErr("Please enter a valid email address (e.g. you@example.com).");
      ok = false;
    }
    if (hasPhone && !isValidPhone(phone)) {
      setPhoneErr("Enter digits only — 6 to 14 numbers (e.g. 74 380 7446).");
      ok = false;
    }
    return ok;
  }

  const inputCls = isDark
    ? "block w-full rounded-sm border border-[oklch(1_0_0_/_0.15)] bg-[oklch(0_0_0_/_0.15)] px-3 py-2.5 text-sm text-[oklch(0.98_0.005_95)] outline-none focus:border-[oklch(0.70_0.12_85)] focus:ring-1 focus:ring-[oklch(0.70_0.12_85)] transition-colors"
    : "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-colors";

  const inputErrCls = isDark
    ? "block w-full rounded-sm border border-red-400/60 bg-[oklch(0_0_0_/_0.15)] px-3 py-2.5 text-sm text-[oklch(0.98_0.005_95)] outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/50 transition-colors"
    : "block w-full rounded-sm border border-red-400 bg-red-50/30 px-3 py-2.5 text-sm text-foreground outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-colors";

  const labelCls = `mb-1.5 block text-xs font-medium uppercase tracking-wider ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`;
  const errCls = "mt-1 text-[11px] text-red-400 font-medium";

  if (submitted) {
    return (
      <div className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}>
        <div className={`font-serif text-xl ${isDark ? "text-[oklch(0.98_0.005_95)]" : "text-primary"}`}>
          Request received ✓
        </div>
        <p className={`mt-2 ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
          We&apos;ll contact you on WhatsApp or email with availability and pricing. We typically reply within a few hours.
        </p>
        <div className={`mt-4 rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-border bg-muted/30"}`}>
          <p className={`text-xs font-medium ${isDark ? "text-[oklch(0.85_0.005_95)]" : "text-foreground"}`}>
            Need a faster reply?
          </p>
          <a
            href={waLink(buildSafariMessage(submittedData))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-[#22bf5b]"
          >
            <WaIcon />
            Also message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}>
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 animate-pulse rounded-full ${isDark ? "bg-[oklch(0.70_0.12_85)]" : "bg-primary"}`} />
          <div className={`font-medium ${isDark ? "text-[oklch(0.98_0.005_95)]" : "text-foreground"}`}>
            Sending your enquiry…
          </div>
        </div>
        <p className={`mt-3 ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
          Saving your request — this only takes a moment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(null);
        if (!validateContact()) return;

        const fd = new FormData(e.currentTarget);
        const values = Object.fromEntries(fd.entries()) as Record<string, string>;

        if (phone.trim()) values.whatsapp = `${phoneCC}${phone.trim().replace(/^0+/, "")}`;
        values.email = email.trim();

        setSubmittedData(values);
        setIsSubmitting(true);

        if (typeof window !== "undefined") {
          window.localStorage.setItem("udawalawe-wild-enquiry", JSON.stringify(values));
        }

        try {
          const geo = await fetchGeoInfo();
          await createBookingEnquiry(values, geo);
          setSubmitted(true);
        } catch (err) {
          if (isSupabaseConfigured) {
            setSubmitError(
              err instanceof Error
                ? `Submission failed: ${err.message}. Please verify your details or try again.`
                : "Oops! We couldn't check availability right now. Please try again."
            );
          } else {
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

      {/* Name */}
      <div className="sm:col-span-2">
        <label className="block text-sm">
          <span className={labelCls}>Your name <span className="text-red-400 font-bold">*</span></span>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. James Cooper"
            className={inputCls}
          />
        </label>
      </div>

      {/* ── Contact section ── */}
      <div className={`sm:col-span-2 rounded-lg border px-3 pt-3 pb-3 space-y-3 ${isDark ? "border-white/10 bg-white/5" : "border-border bg-muted/20"}`}>
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-[oklch(0.65_0.01_135)]" : "text-muted-foreground"}`}>
          Contact details <span className="text-red-400">*</span> — provide email, WhatsApp/mobile, or both
        </p>

        {/* Email */}
        <div>
          <label className="block text-sm">
            <span className={labelCls}>Email address</span>
            <input
              type="text"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailErr(""); setContactErr(""); }}
              onBlur={() => { if (email && !isValidEmail(email)) setEmailErr("Please enter a valid email address."); }}
              placeholder="you@example.com"
              className={emailErr ? inputErrCls : inputCls}
            />
          </label>
          {emailErr && <p className={errCls}>⚠ {emailErr}</p>}
        </div>

        {/* Phone with country code */}
        <div>
          <label className="block text-sm">
            <span className={labelCls}>WhatsApp / Mobile number</span>
            <div className="flex gap-2">
              <select
                value={phoneCC}
                onChange={(e) => setPhoneCC(e.target.value)}
                className={inputCls.replace("block w-full", "w-[110px] flex-shrink-0 text-center px-1")}
                aria-label="Country dialling code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setPhoneErr(""); setContactErr(""); }}
                onBlur={() => { if (phone && !isValidPhone(phone)) setPhoneErr("Enter digits only — 6 to 14 numbers."); }}
                placeholder="74 380 7446"
                className={phoneErr ? inputErrCls.replace("block w-full", "flex-1 min-w-0") : inputCls.replace("block w-full", "flex-1 min-w-0")}
              />
            </div>
          </label>
          {phoneErr && <p className={errCls}>⚠ {phoneErr}</p>}
        </div>

        {contactErr && (
          <p className="text-[11px] font-medium text-red-400">⚠ {contactErr}</p>
        )}
      </div>

      {/* Date + party */}
      <Field label="Preferred safari date" isDark={isDark}>
        <input type="date" name="date" required className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Adults" isDark={isDark}>
          <input type="number" name="adults" min={1} defaultValue={2} required className={inputCls} />
        </Field>
        <Field label="Children" isDark={isDark}>
          <input type="number" name="children" min={0} defaultValue={0} className={inputCls} />
        </Field>
      </div>
      <Field label="Pickup location" isDark={isDark}>
        <input type="text" name="pickup" placeholder="Hotel or town" defaultValue={defaultPickup} className={inputCls} />
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

      <div className="sm:col-span-2">
        <button
          type="submit"
          className={`mt-1 w-full rounded-sm px-5 py-3 text-sm font-medium transition ${isDark ? "bg-[oklch(0.70_0.12_85)] text-[oklch(0.22_0.02_135)] hover:bg-[oklch(0.70_0.12_85_/_0.9)]" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          Check availability
        </button>
        <p className={`mt-3 text-[11px] leading-relaxed ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
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
      <span className={`mb-1.5 block text-xs font-medium uppercase tracking-wider ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
        {label}
      </span>
      {children}
    </label>
  );
}

function WaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
