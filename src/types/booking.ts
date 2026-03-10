import type { BookingType } from "./database";

export type WizardStep = "service" | "datetime" | "details" | "confirmation";

export interface BookingWizardState {
  step: WizardStep;
  bookingTypeId: string | null;
  selectedType: BookingType | null;
  preferredDate: string | null;
  preferredTime: string | null;
  sessionMethod: "video_call" | "phone" | "in_person" | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

export const INITIAL_WIZARD_STATE: BookingWizardState = {
  step: "service",
  bookingTypeId: null,
  selectedType: null,
  preferredDate: null,
  preferredTime: null,
  sessionMethod: null,
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  notes: "",
};

export const WIZARD_STEPS: WizardStep[] = [
  "service",
  "datetime",
  "details",
  "confirmation",
];
