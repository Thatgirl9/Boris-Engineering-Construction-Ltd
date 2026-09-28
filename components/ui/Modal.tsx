"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

/**
 * Generic full-screen lightbox — used for both the image and video
 * modals in the project gallery. Closes on Escape, on backdrop click,
 * or via the close button. Renders through a portal so it always sits
 * above the page regardless of where it's mounted from.
 */
export function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90vh] w-[80%] h-full max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>,
    document.body
  );
};