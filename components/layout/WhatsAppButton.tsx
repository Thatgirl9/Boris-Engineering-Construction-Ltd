import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg shadow-accent/30 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
    </a>
  );
}
