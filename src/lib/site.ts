export const SITE = {
  name: "Udawalawe Wild",
  domain: "udawalawewild.com",
  tagline: "Private, wildlife-first safaris in Sri Lanka.",
  whatsapp: "+94721890006",
  whatsappDisplay: "+94 72 189 0006",
  email: "hello@udawalawewild.com",
  disclaimer:
    "Independent booking platform partnering with verified local operators. Not affiliated with Udawalawe National Park.",
};

export const waLink = (msg?: string) => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const defaultText = msg || "Hello Udawalawe Wild! I'd like help planning a safari.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
};
