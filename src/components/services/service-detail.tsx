import {
  TrendingUp,
  Hammer,
  Building2,
  Calculator,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp className="h-8 w-8" />,
  hammer: <Hammer className="h-8 w-8" />,
  "building-2": <Building2 className="h-8 w-8" />,
  calculator: <Calculator className="h-8 w-8" />,
  handshake: <Handshake className="h-8 w-8" />,
};

interface ServiceDetailProps {
  title: string;
  description: string;
  icon: string;
  isReversed: boolean;
}

export function ServiceDetail({
  title,
  description,
  icon,
  isReversed,
}: ServiceDetailProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 py-12 md:flex-row md:gap-16",
        isReversed && "md:flex-row-reverse",
      )}
    >
      {/* Icon / Image placeholder */}
      <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-primary-50 md:w-1/2">
        <div className="text-primary-600">
          {iconMap[icon] ?? <Building2 className="h-8 w-8" />}
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
  );
}
