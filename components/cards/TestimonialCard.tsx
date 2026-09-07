import { User, Quote } from "lucide-react";
import { TestimonialItem } from "@/lib/types";

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <Quote className="h-6 w-6 text-secondary" strokeWidth={1.75} />
      <p className="mt-4 text-sm font-ibm leading-relaxed text-secondary-text">{item.quote}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-sec text-secondary-text">
          <User className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="text-sm font-semibold font-ibm text-primary-text">
          {item.pending ? "Awaiting client" : item.author}
        </span>
      </div>
    </div>
  );
}
