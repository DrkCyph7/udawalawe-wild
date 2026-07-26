export const SITE = {
  name: "Udawalawe Wild",
  domain: "udawalawewild.com",
  tagline: "Private, wildlife-first safaris in Sri Lanka.",
  whatsapp: "+94721890006",
  whatsappDisplay: "+94 71 234 5678",
  email: "hello@udawalawewild.com",
  disclaimer:
    "Independent booking platform partnering with verified local operators. Not affiliated with Udawalawe National Park.",
};

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}${
    msg ? `?text=${encodeURIComponent(msg)}` : ""
  }`;
