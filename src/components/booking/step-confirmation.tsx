import { Check } from "lucide-react";
import type { BookingWizardState } from "@/types/booking";
import type { Locale } from "@/types/common";
import { getLocalizedField } from "@/lib/utils/get-localized-field";
import { formatPrice } from "@/lib/utils/format-price";

interface StepConfirmationProps {
  state: BookingWizardState;
  locale: Locale;
  labels: {
    confirmTitle: string;
    confirmType: string;
    confirmDate: string;
    confirmTime: string;
    confirmMethod: string;
    confirmName: string;
    confirmEmail: string;
    confirmPhone: string;
    confirmPayment: string;
    successTitle: string;
    successMessage: string;
    methodVideoCall: string;
    methodPhone: string;
    methodInPerson: string;
  };
  isSubmitted: boolean;
}

export function StepConfirmation({
  state,
  locale,
  labels,
  isSubmitted,
}: StepConfirmationProps) {
  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-primary-800">
          {labels.successTitle}
        </h3>
        <p className="mt-4 text-lg text-secondary-500">
          {labels.successMessage}
        </p>
      </div>
    );
  }

  const methodLabels = {
    video_call: labels.methodVideoCall,
    phone: labels.methodPhone,
    in_person: labels.methodInPerson,
  };

  const rows = [
    {
      label: labels.confirmType,
      value: state.selectedType
        ? getLocalizedField(state.selectedType, "name", locale)
        : "",
    },
    { label: labels.confirmDate, value: state.preferredDate ?? "" },
    { label: labels.confirmTime, value: state.preferredTime ?? "" },
    {
      label: labels.confirmMethod,
      value: state.sessionMethod ? methodLabels[state.sessionMethod] : "",
    },
    { label: labels.confirmName, value: state.customerName },
    { label: labels.confirmEmail, value: state.customerEmail },
    { label: labels.confirmPhone, value: state.customerPhone },
    {
      label: labels.confirmPayment,
      value: state.selectedType
        ? formatPrice(state.selectedType.price_cents, locale)
        : "",
    },
  ];

  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold text-primary-800">
        {labels.confirmTitle}
      </h3>
      <div className="divide-y divide-secondary-100 rounded-xl border border-secondary-200">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3"
          >
            <span className="text-sm text-secondary-500">{row.label}</span>
            <span className="font-medium text-primary-800">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
