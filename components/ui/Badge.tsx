import { cn } from "@/lib/cn";
import { ReactNode } from "react";

export function Eyebrow({ children, tone = "light", divider, }: { children: ReactNode; tone?: "light" | "dark"; divider?: Boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-semibold font-archivo uppercase leading-4",
        tone === "light" ? "text-secondary" : "text-secondary",
        divider ? "tracking-[2.88]" : "tracking-[2.64]"
      )}
    >
      {divider && (
        <span className="inline-block h-3.5 w-[2.67px] bg-secondary" aria-hidden="true" />
      )}
      
      {children}
    </p>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-on-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
