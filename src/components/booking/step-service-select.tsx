import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Clock, Check } from "lucide-react";
import type { BookingType } from "@/types/database";
import type { Locale } from "@/types/common";
import { getLocalizedField } from "@/lib/utils/get-localized-field";
import { formatPrice } from "@/lib/utils/format-price";

interface StepServiceSelectProps {
  bookingTypes: BookingType[];
  locale: Locale;
  selectedId: string | null;
  onSelect: (type: BookingType) => void;
  freeLabel: string;
  popularLabel: string;
  minutesLabel: string;
}

export function StepServiceSelect({
  bookingTypes,
  locale,
  selectedId,
  onSelect,
  freeLabel,
  popularLabel,
  minutesLabel,
}: StepServiceSelectProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {bookingTypes.map((type) => {
        const isSelected = selectedId === type.id;
        const isFree = type.price_cents === 0;
        const isPopular = type.slug === "consultation-60";

        return (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className={cn(
              "relative rounded-xl border-2 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
              isSelected
                ? "border-accent bg-accent-50 shadow-md shadow-accent/10"
                : "border-secondary-200 bg-white hover:border-accent/30",
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <Check className="h-3.5 w-3.5" />
              </div>
            )}

            <div className="mb-3 flex items-center gap-2">
              {isFree && <Badge variant="success">{freeLabel}</Badge>}
              {isPopular && <Badge variant="accent">{popularLabel}</Badge>}
            </div>
            <h3 className="text-lg font-semibold text-primary-800">
              {getLocalizedField(type, "name", locale)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-secondary-500">
              {getLocalizedField(type, "description", locale)}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm text-secondary-400">
                <Clock className="h-4 w-4" />
                {type.duration_minutes} {minutesLabel}
              </span>
              <span
                className={cn(
                  "text-xl font-bold",
                  isFree ? "text-green-600" : "text-accent-dark",
                )}
              >
                {formatPrice(type.price_cents, locale)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
