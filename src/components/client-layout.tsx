"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CookieConsent } from "@/components/cookie-consent";

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/superadmin");

  return (
    <>
      {!isAdmin && <SiteHeader />}

      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden relative">
        <div className="relative z-10 flex-1 bg-background">
          <main className="relative flex-1 overflow-x-hidden">{children}</main>
        </div>

        {!isAdmin && (
          <div className="sticky bottom-0 z-0">
            <SiteFooter />
          </div>
        )}

        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <CookieConsent />}
      </div>
    </>
  );
}
