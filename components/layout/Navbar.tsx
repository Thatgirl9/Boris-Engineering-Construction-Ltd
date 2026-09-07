"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NavLink, CompanyInfo } from "@/lib/types";
import { cn } from "@/lib/cn";
import IconWithoutLtd from "@/public/images/logo/Logo without Ltd.png";

export function Navbar({ links, company }: { links: NavLink[]; company: CompanyInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-19 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={IconWithoutLtd} alt="Boris Engineering logo" className="h-12 w-12" />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight font-archivo text-primary-text sm:text-base">
              {company.shortName.toUpperCase()}
            </span>
            <span className="block text-[10px] font-regular font-ibm uppercase tracking-wide text-secondary-text sm:text-xs">
              &amp; Construction Ltd
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b-2 pb-1 text-sm font-medium text-primary-text/90 transition-colors hover:text-primary-text hover:border-secondary ease-in-out",
                  active ? "border-secondary text-primary-text" : "border-transparent text-secondary-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={company.phoneHref} variant="secondary" className="px-4 py-2.5 h-10 shadow-md">
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            Call Us
          </Button>
          <Button href="/contact" variant="primary" className="px-4 py-2.5 h-10 shadow-md">
            Request a Quote
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium border-b border-border",
                  pathname === link.href
                    ? "bg-primary/10 text-primary-text"
                    : "text-secondary-text hover:bg-bg-sec/60"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button href={company.phoneHref} variant="secondary" className="shadow-md h-10">
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Call Us
              </Button>
              <Button href="/contact" variant="primary" className="shadow-md h-10">
                Request a Quote
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
