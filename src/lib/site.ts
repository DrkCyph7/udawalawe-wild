export const SITE = {
  name: "Udawalawe Wild",
  domain: "udawalawewild.com",
  tagline: "Private, wildlife-first safaris in Sri Lanka.",
  whatsapp: "+94721890006",
  whatsappDisplay: "+94 72 189 0006",
  phone: "+94721890006",
  phoneDisplay: "+94 72 189 0006",
  email: "hello@udawalawewild.com",
  facebook: "https://facebook.com/udawalawewild",
  tripadvisor: "https://tripadvisor.com",
  location: "Udawalawe, Sabaragamuwa Province, Sri Lanka",
  disclaimer:
    "Independent booking platform partnering with verified local operators. Not affiliated with Udawalawe National Park.",
};

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}${
    msg ? `?text=${encodeURIComponent(msg)}` : ""
  }`;
