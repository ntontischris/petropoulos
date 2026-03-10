"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./progress-bar";
import { StepServiceSelect } from "./step-service-select";
import { StepDatetime } from "./step-datetime";
import { StepDetails } from "./step-details";
import { StepConfirmation } from "./step-confirmation";
import { createBooking } from "@/app/[locale]/booking/actions";
import {
  INITIAL_WIZARD_STATE,
  WIZARD_STEPS,
  type BookingWizardState,
  type WizardStep,
} from "@/types/booking";
import type { BookingType } from "@/types/database";
import type { Locale } from "@/types/common";

interface BookingWizardProps {
  bookingTypes: BookingType[];
  locale: Locale;
}

export function BookingWizard({ bookingTypes, locale }: BookingWizardProps) {
  const [state, setState] = useState<BookingWizardState>(INITIAL_WIZARD_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("booking");
  const tCommon = useTranslations("common");

  const currentStepIndex = WIZARD_STEPS.indexOf(state.step);

  function updateState(updates: Partial<BookingWizardState>) {
    setState((prev) => ({ ...prev, ...updates }));
  }

  function goNext() {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < WIZARD_STEPS.length) {
      updateState({ step: WIZARD_STEPS[nextIndex] });
    }
  }

  function goBack() {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      updateState({ step: WIZARD_STEPS[prevIndex] });
    }
  }

  function isStepValid(): boolean {
    switch (state.step) {
      case "service":
        return state.bookingTypeId !== null;
      case "datetime":
        return (
          state.preferredDate !== null &&
          state.preferredTime !== null &&
          state.sessionMethod !== null
        );
      case "details":
        return (
          state.customerName.length >= 2 &&
          state.customerEmail.includes("@") &&
          state.customerPhone.length >= 5
        );
      case "confirmation":
        return true;
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);

    const result = await createBooking({
      booking_type_id: state.bookingTypeId,
      customer_name: state.customerName,
      customer_email: state.customerEmail,
      customer_phone: state.customerPhone,
      preferred_date: state.preferredDate,
      preferred_time: state.preferredTime,
      session_method: state.sessionMethod,
      notes: state.notes || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  const stepLabels: Record<WizardStep, string> = {
    service: t("step1Title"),
    datetime: t("step2Title"),
    details: t("step3Title"),
    confirmation: t("step5Title"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar currentStep={state.step} labels={stepLabels} />

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Steps */}
      {state.step === "service" && (
        <StepServiceSelect
          bookingTypes={bookingTypes}
          locale={locale}
          selectedId={state.bookingTypeId}
          onSelect={(type) =>
            updateState({ bookingTypeId: type.id, selectedType: type })
          }
          freeLabel={tCommon("free")}
          popularLabel={tCommon("popular")}
          minutesLabel={t("minutes")}
        />
      )}

      {state.step === "datetime" && (
        <StepDatetime
          selectedDate={state.preferredDate}
          selectedTime={state.preferredTime}
          selectedMethod={state.sessionMethod}
          onDateChange={(date) => updateState({ preferredDate: date })}
          onTimeChange={(time) => updateState({ preferredTime: time })}
          onMethodChange={(method) => updateState({ sessionMethod: method })}
          labels={{
            selectDate: t("selectDate"),
            selectTime: t("selectTime"),
            selectMethod: t("selectMethod"),
            methodVideoCall: t("methodVideoCall"),
            methodPhone: t("methodPhone"),
            methodInPerson: t("methodInPerson"),
          }}
        />
      )}

      {state.step === "details" && (
        <StepDetails
          customerName={state.customerName}
          customerEmail={state.customerEmail}
          customerPhone={state.customerPhone}
          notes={state.notes}
          onChange={(field, value) => updateState({ [field]: value })}
          labels={{
            nameLabel: t("nameLabel"),
            namePlaceholder: t("namePlaceholder"),
            emailLabel: t("emailLabel"),
            emailPlaceholder: t("emailPlaceholder"),
            phoneLabel: t("phoneLabel"),
            phonePlaceholder: t("phonePlaceholder"),
            notesLabel: t("notesLabel"),
            notesPlaceholder: t("notesPlaceholder"),
          }}
        />
      )}

      {state.step === "confirmation" && (
        <StepConfirmation
          state={state}
          locale={locale}
          isSubmitted={isSubmitted}
          labels={{
            confirmTitle: t("confirmTitle"),
            confirmType: t("confirmType"),
            confirmDate: t("confirmDate"),
            confirmTime: t("confirmTime"),
            confirmMethod: t("confirmMethod"),
            confirmName: t("confirmName"),
            confirmEmail: t("confirmEmail"),
            confirmPhone: t("confirmPhone"),
            confirmPayment: t("confirmPayment"),
            successTitle: t("successTitle"),
            successMessage: t("successMessage"),
            methodVideoCall: t("methodVideoCall"),
            methodPhone: t("methodPhone"),
            methodInPerson: t("methodInPerson"),
          }}
        />
      )}

      {/* Navigation Buttons */}
      {!isSubmitted && (
        <div className="mt-10 flex items-center justify-between">
          {currentStepIndex > 0 ? (
            <Button variant="outline" onClick={goBack}>
              {tCommon("back")}
            </Button>
          ) : (
            <div />
          )}

          {state.step === "confirmation" ? (
            <Button onClick={handleSubmit} isLoading={isSubmitting}>
              {tCommon("bookAppointment")}
            </Button>
          ) : (
            <Button onClick={goNext} disabled={!isStepValid()}>
              {tCommon("next")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
