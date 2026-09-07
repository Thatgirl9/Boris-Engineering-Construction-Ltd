import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Badge";

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold font-archivo leading-tight tracking-tight sm:text-[2.25rem]",
          tone === "dark" ? "text-on-primary" : "text-primary-text"
        )}
      >
        {heading}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed font-ibm", tone === "dark" ? "text-on-primary/80" : "text-secondary-text")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
