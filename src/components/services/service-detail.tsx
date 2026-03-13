"use client";

import {
  TrendingUp,
  Hammer,
  Building2,
  Calculator,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp className="h-10 w-10" />,
  hammer: <Hammer className="h-10 w-10" />,
  "building-2": <Building2 className="h-10 w-10" />,
  calculator: <Calculator className="h-10 w-10" />,
  handshake: <Handshake className="h-10 w-10" />,
};

interface ServiceDetailProps {
  title: string;
  description: string;
  icon: string;
  isReversed: boolean;
  index: number;
}

export function ServiceDetail({
  title,
  description,
  icon,
  isReversed,
  index,
}: ServiceDetailProps) {
  return (
    <ScrollReveal direction={isReversed ? "right" : "left"}>
      <div
        className={cn(
          "relative flex flex-col items-center gap-8 py-14 md:flex-row md:gap-16",
          isReversed && "md:flex-row-reverse",
        )}
      >
        {/* Icon area */}
        <div className="relative flex h-56 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 md:w-1/2">
          <span className="absolute left-6 top-4 text-6xl font-bold text-primary-100/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="text-primary-600">
            {iconMap[icon] ?? <Building2 className="h-10 w-10" />}
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-primary-800">{title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-secondary-500">
            {description}
          </p>
        </div>
      </div>
      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="h-px flex-1 bg-secondary-100" />
        <div className="mx-4 h-2 w-2 rounded-full bg-accent" />
        <div className="h-px flex-1 bg-secondary-100" />
      </div>
    </ScrollReveal>
  );
}
