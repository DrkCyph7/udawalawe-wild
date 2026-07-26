import { waLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello Udawalawe Wild, I'd like help planning a safari.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.55_0.16_150)] text-white shadow-lg ring-1 ring-black/10 transition hover:scale-105 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.36c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.63.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.26-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.33 0 1.38 1 2.71 1.14 2.9.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"/>
        <path d="M26.68 5.31A15 15 0 0 0 5.36 25.32L4 30l4.83-1.28A15 15 0 1 0 26.68 5.31zm-10.7 22.98h-.01a12.5 12.5 0 0 1-6.36-1.74l-.46-.27-2.86.76.76-2.79-.3-.48A12.5 12.5 0 1 1 15.99 28.3z"/>
      </svg>
    </a>
  );
}