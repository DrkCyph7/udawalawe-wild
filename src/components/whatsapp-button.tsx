import { MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Desktop Hover Label */}
      <a
        href={waLink("Hello Udawalawe Wild, I'd like help planning a safari.")}
        target="_blank"
        rel="noopener noreferrer"
        className="group hidden items-center gap-2.5 rounded-full border border-emerald-500/30 bg-card/90 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-card hover:border-emerald-500 sm:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Chat on WhatsApp</span>
        <span className="text-[10px] text-muted-foreground font-mono font-normal">
          ({SITE.whatsappDisplay})
        </span>
      </a>

      {/* Floating Action Button */}
      <a
        href={waLink("Hello Udawalawe Wild, I'd like help planning a safari.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with us on WhatsApp at ${SITE.whatsappDisplay}`}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      >
        {/* Animated Ping Ring */}
        <span className="absolute -inset-1 animate-ping rounded-full bg-emerald-500/30 duration-1000 pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  );
}
