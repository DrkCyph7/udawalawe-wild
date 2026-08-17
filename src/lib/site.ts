export const SITE = {
  name: "Udawalawe Wild",
  domain: "www.udawalawe-wild.com",
  url: "https://www.udawalawe-wild.com",
  tagline: "Private, wildlife-first safaris in Sri Lanka.",
  whatsapp: "+94743807446",
  whatsappDisplay: "+94 74 380 7446",
  phone: "+94743807446",
  phoneDisplay: "+94 74 380 7446",
  email: "hello@udawalawe-wild.com",
  telegram: "+94743807446",
  telegramDisplay: "+94 74 380 7446",
  facebook: "https://facebook.com/udawalawe-wild",
  tripadvisor: "https://tripadvisor.com",
  location: "Udawalawe, Sabaragamuwa Province, Sri Lanka",
  disclaimer:
    "Independent booking platform partnering with verified local operators. Not affiliated with Udawalawe National Park.",
};

/** WhatsApp deep-link with optional pre-filled message text. */
export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}${
    msg ? `?text=${encodeURIComponent(msg)}` : ""
  }`;

/** Telegram deep-link — opens the chat.
 *  Also tries the tg:// app scheme which pre-fills text on most mobile clients. */
export const tgLink = (msg?: string) => {
  const target = SITE.telegram.startsWith("+") ? SITE.telegram : `@${SITE.telegram}`;
  if (msg) {
    // tg:// scheme pre-fills message in the native Telegram app (iOS & Android).
    return `tg://msg?to=${target}&text=${encodeURIComponent(msg)}`;
  }
  return `https://t.me/${SITE.telegram.replace("+", "")}`;
};

// ─── Safari label map ────────────────────────────────────────────────────────
const SAFARI_LABELS: Record<string, string> = {
  "morning-private-safari": "Morning Private Safari",
  "afternoon-private-safari": "Afternoon Private Safari",
  "full-day-wildlife-safari": "Full-Day Wildlife Safari",
  "safari-transfer": "Safari + Transfer",
  "safari-elephant-transit-transfer": "Safari + Elephant Transit + Transfer",
};

/**
 * Build the pre-filled message body sent via WhatsApp / Telegram.
 * Blank / missing fields are silently omitted so the message stays tidy.
 */
export const buildSafariMessage = (data: Record<string, string>): string => {
  const adults = parseInt(data.adults || "2", 10);
  const children = parseInt(data.children || "0", 10);
  const guestStr = `${adults} adult${adults !== 1 ? "s" : ""}${
    children > 0 ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""
  }`;

  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const safariLabel =
    data.type && SAFARI_LABELS[data.type]
      ? SAFARI_LABELS[data.type]
      : "Not sure yet — recommend for me";

  const push = (lines: string[], value: string | null | undefined) => {
    if (value?.trim()) lines.push(value.trim());
  };

  const lines: string[] = ["🦁 *Safari Enquiry — Udawalawe Wild*", ""];

  push(lines, data.name ? `👤 *Name:* ${data.name}` : null);
  push(lines, dateStr ? `📅 *Date:* ${dateStr}` : null);
  lines.push(`🧑 *Guests:* ${guestStr}`);
  lines.push(`🌅 *Safari:* ${safariLabel}`);
  push(lines, data.pickup ? `📍 *Pickup:* ${data.pickup}` : null);
  push(
    lines,
    data.dropoff && data.dropoff !== data.pickup
      ? `🏁 *Drop-off:* ${data.dropoff}`
      : null,
  );
  push(lines, data.hotel ? `🏨 *Hotel:* ${data.hotel}` : null);
  push(lines, data.email ? `✉️ *Email:* ${data.email}` : null);

  if (data.notes?.trim()) {
    lines.push("", "📝 *Notes:*", data.notes.trim());
  }

  lines.push("", "──────────────────────", "Sent via udawalawe-wild.com");

  return lines.join("\n");
};
