import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CompanyInfo } from "@/lib/types";
import HeroConstruction from "@/public/images/hero/Hero Image.svg";

export function HeroSection({ company }: { company: CompanyInfo }) {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0">
        <Image
          src={HeroConstruction}
          alt="Hero construction background"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-primary/45" />
      </div>

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow divider={true}>Engineering Excellence. Built To Last</Eyebrow>
          <h1 className="mt-4 font-archivo text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            {company.name.toUpperCase()}
          </h1>
          <p className="mt-4 text-xl font-archivo font-semibold text-secondary">{company.tagline}</p>
          <p className="mt-6 text-base font-ibm leading-relaxed text-on-primary/80">
            Welcome to {company.name}, a Nigerian engineering and construction company committed
            to delivering quality, durable, and innovative construction solutions. We specialize
            in residential, commercial, and civil engineering projects, as well as renovation,
            building finishing, project management, and related construction services.
          </p>
          <p className="mt-4 text-base font-ibm leading-relaxed text-on-primary/80">
            Our approach is centered on quality workmanship, safety, professionalism, integrity,
            and customer satisfaction. We work closely with our clients to transform their ideas
            into functional, durable, and well-executed projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" className="h-10 w-42.75">
              Request a Quote
            </Button>
            <Button href="/contact" variant="ghost" className="w-33.75 h-10">
              Contact Us
            </Button>
            <Button href={company.whatsappHref} variant="whatsapp" target="_blank" rel="noopener noreferrer" className="w-52.25 h-10">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
