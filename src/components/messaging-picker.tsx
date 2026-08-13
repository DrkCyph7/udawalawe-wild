import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildSafariMessage, waLink, tgLink, SITE } from "@/lib/site";

type Platform = "whatsapp" | "telegram";

interface Props {
  /** Collected form data — passed straight to buildSafariMessage. */
  data: Record<string, string>;
  open: boolean;
  onClose: () => void;
  /** Called after the user taps "Send via …" to trigger the confirmation screen. */
  onSent: () => void;
}

export function MessagingPicker({ data, open, onClose, onSent }: Props) {
  const [selected, setSelected] = useState<Platform | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewCopied, setPreviewCopied] = useState(false);

  const message = buildSafariMessage(data);

  // Reset state each time the sheet opens.
  useEffect(() => {
    if (!open) {
      setSelected(null);
      setCopied(false);
      setPreviewCopied(false);
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch {
      return false;
    }
  };

  const handleSend = async (platform: Platform) => {
    if (platform === "whatsapp") {
      window.open(waLink(message), "_blank", "noopener,noreferrer");
    } else {
      // Copy to clipboard as insurance (tg:// pre-fill isn't reliable everywhere).
      await copyMessage();
      setCopied(true);
      // Try the tg:// app scheme first (pre-fills on most native clients).
      window.open(tgLink(message), "_blank", "noopener,noreferrer");
      // Short delay — fall back to https URL if app scheme didn't fire.
      setTimeout(() => {
        window.open(`https://t.me/${SITE.telegram}`, "_blank", "noopener,noreferrer");
      }, 600);
    }
    // Delay so the state feels intentional before closing.
    setTimeout(() => {
      onClose();
      onSent();
    }, 700);
  };

  const handlePreviewCopy = async () => {
    const ok = await copyMessage();
    if (ok) {
      setPreviewCopied(true);
      setTimeout(() => setPreviewCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal — bottom sheet on mobile, centred dialog on sm+ */}
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Choose messaging platform"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto sm:inset-x-auto sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            <div className="overflow-hidden rounded-t-[24px] sm:rounded-2xl border border-white/10 bg-[oklch(0.18_0.015_135)] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">

              {/* Drag handle (mobile only) */}
              <div className="flex justify-center pt-3 pb-0 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-5 pb-4">
                <div>
                  <h2 className="font-serif text-[1.35rem] leading-snug text-[oklch(0.98_0.005_95)]">
                    Send your enquiry via…
                  </h2>
                  <p className="mt-1 text-[13px] text-[oklch(0.58_0.01_135)]">
                    We'll open the chat with your details ready.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="mt-0.5 ml-3 flex-shrink-0 rounded-full p-1.5 text-[oklch(0.55_0.01_135)] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Platform cards */}
              <div className="grid grid-cols-2 gap-3 px-5">
                <PlatformCard
                  id="whatsapp"
                  name="WhatsApp"
                  hint="Message pre-filled automatically"
                  accentColor="#25D366"
                  glowColor="rgba(37,211,102,0.28)"
                  selected={selected === "whatsapp"}
                  onClick={() => setSelected("whatsapp")}
                  icon={<WhatsAppIcon />}
                />
                <PlatformCard
                  id="telegram"
                  name="Telegram"
                  hint="Message copied — paste to send"
                  accentColor="#2AABEE"
                  glowColor="rgba(42,171,238,0.28)"
                  selected={selected === "telegram"}
                  onClick={() => setSelected("telegram")}
                  icon={<TelegramIcon />}
                />
              </div>

              {/* Message preview */}
              <div className="mx-5 mt-4 overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.13_0.01_135)]">
                <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.48_0.008_135)]">
                    Message preview
                  </span>
                  <button
                    onClick={handlePreviewCopy}
                    className="text-[11px] font-medium text-[oklch(0.70_0.12_85)] transition-colors hover:text-[oklch(0.82_0.10_85)]"
                  >
                    {previewCopied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="max-h-[160px] overflow-y-auto px-3.5 py-3">
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-[1.6] text-[oklch(0.62_0.008_135)]">
                    {message}
                  </pre>
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 pt-4 pb-6">
                <motion.button
                  onClick={() => selected && void handleSend(selected)}
                  disabled={!selected}
                  animate={{
                    backgroundColor:
                      selected === "whatsapp"
                        ? "#25D366"
                        : selected === "telegram"
                          ? "#2AABEE"
                          : "oklch(0.26 0.018 135)",
                    boxShadow:
                      selected === "whatsapp"
                        ? "0 6px 24px rgba(37,211,102,0.40)"
                        : selected === "telegram"
                          ? "0 6px 24px rgba(42,171,238,0.40)"
                          : "none",
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {!selected && (
                    <span className="text-[oklch(0.50_0.008_135)]">Select a platform above</span>
                  )}
                  {selected === "whatsapp" && (
                    <>
                      <WhatsAppIcon small />
                      <span>Open WhatsApp →</span>
                    </>
                  )}
                  {selected === "telegram" && (
                    <>
                      <TelegramIcon small />
                      <span>{copied ? "Copied! Opening Telegram…" : "Copy & Open Telegram →"}</span>
                    </>
                  )}
                </motion.button>

                {selected === "telegram" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-center text-[10px] text-[oklch(0.48_0.008_135)]"
                  >
                    Your message is copied to clipboard — paste it once the chat opens.
                  </motion.p>
                )}

                <p className="mt-3 text-center text-[10px] text-[oklch(0.40_0.006_135)]">
                  No payment collected at this step · udawalawe-wild.com
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Platform Card ────────────────────────────────────────────────────────────

interface PlatformCardProps {
  id: string;
  name: string;
  hint: string;
  accentColor: string;
  glowColor: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function PlatformCard({
  id,
  name,
  hint,
  accentColor,
  glowColor,
  selected,
  onClick,
  icon,
}: PlatformCardProps) {
  return (
    <motion.button
      id={`platform-${id}`}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      animate={{
        borderColor: selected ? accentColor : "rgba(255,255,255,0.10)",
        boxShadow: selected
          ? `0 0 0 1px ${accentColor}, 0 8px 24px ${glowColor}`
          : "none",
        backgroundColor: selected
          ? `color-mix(in srgb, ${accentColor} 8%, oklch(0.20 0.012 135))`
          : "oklch(0.22 0.014 135)",
      }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-opacity hover:opacity-90 active:scale-[0.98]"
    >
      <motion.span
        animate={{ scale: selected ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${accentColor}22` }}
      >
        {icon}
      </motion.span>
      <span className="text-sm font-semibold text-[oklch(0.95_0.005_95)]">{name}</span>
      <span className="text-[10px] leading-snug text-[oklch(0.52_0.008_135)]">{hint}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-bold"
          style={{ backgroundColor: accentColor }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ small }: { small?: boolean }) {
  const size = small ? "h-4 w-4" : "h-6 w-6";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ small }: { small?: boolean }) {
  const size = small ? "h-4 w-4" : "h-6 w-6";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2AABEE" className={size} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
