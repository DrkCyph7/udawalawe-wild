"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CookieConsent } from "@/components/cookie-consent";
import { AnimatePresence, motion } from "framer-motion";

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/superadmin");

  return (
    <>
      {!isAdmin && <SiteHeader />}
      
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden relative">
        <div className="relative z-10 flex-1 bg-background">
          <main className="relative flex-1 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
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
