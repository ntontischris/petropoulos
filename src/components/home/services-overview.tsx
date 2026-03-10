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
    <section className="py-20 bg-background-alt">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href="/services" className="block">
              <Card
                title={getLocalizedField(service, "title", locale)}
                description={getLocalizedField(service, "description", locale)}
                icon={
                  iconMap[service.icon] ?? <Building2 className="h-6 w-6" />
                }
                className="h-full transition-transform hover:-translate-y-1"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
