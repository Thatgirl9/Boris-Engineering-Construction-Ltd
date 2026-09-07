import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ReactNode } from "react";

type Background = "default" | "muted" | "primary" | "white";

const backgrounds: Record<Background, string> = {
  default: "bg-background",
  muted: "bg-bg-sec/40",
  primary: "bg-primary",
  white: "bg-white",
};

export function Section({
  children,
  background = "default",
  className,
  containerClassName,
  id,
}: {
  children: ReactNode;
  background?: Background;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", backgrounds[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
