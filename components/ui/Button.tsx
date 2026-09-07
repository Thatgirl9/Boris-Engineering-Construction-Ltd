import { cn } from "@/lib/cn";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";

const base =
  "inline-flex items-center justify-center gap-2 font-ibm rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline-offset-4 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-secondary text-on-secondary hover:bg-secondary/90",
  secondary: "bg-white text-primary-text border border-border hover:bg-secondary",
  ghost: "bg-transparent text-on-primary border border-white/30 hover:bg-white/10",
  whatsapp: "bg-accent text-on-accent hover:bg-accent/90",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const rest = { ...(props as ButtonAsButton) };
  delete rest.href;
  delete rest.variant;
  delete rest.className;
  delete rest.children;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
