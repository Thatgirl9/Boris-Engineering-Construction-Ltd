import { ProcessStepItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProcessStepCard({ step }: { step: ProcessStepItem }) {
  return (
    <div className={cn("bg-primary/40 rounded-lg border border-border/10 p-6 w-full lg:h-50 max-h-50")}>
      <p className="font-archivo text-3xl font-bold text-secondary">
        {String(step.step).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-base font-archivo font-semibold text-on-primary">{step.title}</h3>
      <p className="mt-2 text-sm font-ibm leading-relaxed text-on-primary/70">{step.description}</p>
    </div>
  );
}
