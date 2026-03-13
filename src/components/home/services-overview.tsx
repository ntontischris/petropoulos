"use client";

import {
  TrendingUp,
  Hammer,
  Building2,
  Calculator,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/types/database";
import type { Locale } from "@/types/common";
import { getLocalizedField } from "@/lib/utils/get-localized-field";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp className="h-6 w-6" />,
  hammer: <Hammer className="h-6 w-6" />,
  "building-2": <Building2 className="h-6 w-6" />,
  calculator: <Calculator className="h-6 w-6" />,
  handshake: <Handshake className="h-6 w-6" />,
};

interface ServicesOverviewProps {
  services: Service[];
  locale: Locale;
  title: string;
  subtitle: string;
}

export function ServicesOverview({
  services,
  locale,
  title,
  subtitle,
}: ServicesOverviewProps) {
  return (
    <section className="bg-background-alt py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={title} subtitle={subtitle} />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <Link href="/services" className="block h-full">
                <Card
                  title={getLocalizedField(service, "title", locale)}
                  description={getLocalizedField(
                    service,
                    "description",
                    locale,
                  )}
                  icon={
                    iconMap[service.icon] ?? <Building2 className="h-6 w-6" />
                  }
                  className="h-full border-t-4 border-t-transparent transition-all hover:border-t-accent"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
