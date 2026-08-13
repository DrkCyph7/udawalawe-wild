import { useState } from "react";
import { MessagingPicker } from "@/components/messaging-picker";

type Props = {
  compact?: boolean;
  defaultSafari?: string;
  defaultPickup?: string;
  theme?: "light" | "dark";
};

export function EnquiryForm({ compact, defaultSafari, defaultPickup, theme = "light" }: Props) {
  const isDark = theme === "dark";
  const [submitted, setSubmitted] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (submitted) {
    return (
      <div
        className={`rounded-sm border p-6 text-sm shadow-sm ${isDark ? "border-[oklch(1_0_0_/_0.1)] bg-[oklch(0_0_0_/_0.2)]" : "border-border bg-card"}`}
      >
        <div
          className={`font-serif text-xl ${isDark ? "text-[oklch(0.98_0.005_95)]" : "text-primary"}`}
        >
          Message sent!
        </div>
        <p className={`mt-2 ${isDark ? "text-[oklch(0.70_0.01_135)]" : "text-muted-foreground"}`}>
          Thanks for reaching out. We'll reply in the chat you just opened with verified options and
          a fixed quote.
        </p>
      </div>
    );
  }

  const inputCls = isDark
    ? "block w-full rounded-sm border border-[oklch(1_0_0_/_0.15)] bg-[oklch(0_0_0_/_0.15)] px-3 py-2.5 text-sm text-[oklch(0.98_0.005_95)] outline-none focus:border-[oklch(0.70_0.12_85)] focus:ring-1 focus:ring-[oklch(0.70_0.12_85)] transition-colors"
    : "block w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-colors";

  return (
    <>
      <MessagingPicker
        data={formData}
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSent={() => {
          setPickerOpen(false);
          setSubmitted(true);
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const values = Object.fromEntries(fd.entries()) as Record<string, string>;
          setFormData(values);
          setPickerOpen(true);
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
    </>
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
