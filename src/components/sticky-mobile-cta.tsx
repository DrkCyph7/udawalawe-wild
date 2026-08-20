"use client";

import { MessageCircle, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/lib/site";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();

  // Hide on certain paths like the booking page itself or admin
  if (pathname?.startsWith("/book") || pathname?.startsWith("/admin") || pathname?.startsWith("/superadmin")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden pb-safe">
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 border-t backdrop-blur-xl"
        style={{
          background: "oklch(0.22 0.02 135 / 0.85)",
          borderColor: "oklch(1 0 0 / 0.1)",
          boxShadow: "0 -4px 24px oklch(0 0 0 / 0.2)"
        }}
      >
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-semibold transition-all active:scale-95 border"
          style={{
            color: "oklch(0.98 0.005 95)",
            borderColor: "oklch(1 0 0 / 0.2)",
            background: "oklch(1 0 0 / 0.05)"
          }}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>

        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-semibold transition-all active:scale-95"
          style={{
            background: "oklch(0.70 0.12 85)",
            color: "oklch(0.22 0.02 135)",
            boxShadow: "0 4px 16px oklch(0.70 0.12 85 / 0.3)"
          }}
        >
          <CalendarCheck className="h-4 w-4" />
          Check Availability
        </Link>
      </div>
    </div>
  );
}
