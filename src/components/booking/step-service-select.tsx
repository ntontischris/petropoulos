import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
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
              "relative rounded-xl border-2 p-6 text-left transition-all hover:shadow-md",
              isSelected
                ? "border-primary-800 bg-primary-50 shadow-md"
                : "border-secondary-200 bg-white hover:border-primary-300",
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              {isFree && <Badge variant="success">{freeLabel}</Badge>}
              {isPopular && <Badge variant="accent">{popularLabel}</Badge>}
            </div>
            <h3 className="text-lg font-semibold text-primary-800">
              {getLocalizedField(type, "name", locale)}
            </h3>
            <p className="mt-1 text-sm text-secondary-500">
              {getLocalizedField(type, "description", locale)}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm text-secondary-400">
                <Clock className="h-4 w-4" />
                {type.duration_minutes} {minutesLabel}
              </span>
              <span className="text-xl font-bold text-primary-800">
                {formatPrice(type.price_cents, locale)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
