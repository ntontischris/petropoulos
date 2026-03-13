import { cn } from "@/lib/utils/cn";
import { Video, Phone, Users } from "lucide-react";
import { BOOKING_CONFIG } from "@/lib/constants";

interface StepDatetimeProps {
  selectedDate: string | null;
  selectedTime: string | null;
  selectedMethod: "video_call" | "phone" | "in_person" | null;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onMethodChange: (method: "video_call" | "phone" | "in_person") => void;
  labels: {
    selectDate: string;
    selectTime: string;
    selectMethod: string;
    methodVideoCall: string;
    methodPhone: string;
    methodInPerson: string;
  };
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = BOOKING_CONFIG.startHour; h < BOOKING_CONFIG.endHour; h++) {
    for (let m = 0; m < 60; m += BOOKING_CONFIG.slotDurationMinutes) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

const timeSlots = generateTimeSlots();

const methods = [
  { key: "video_call" as const, icon: Video, labelKey: "methodVideoCall" },
  { key: "phone" as const, icon: Phone, labelKey: "methodPhone" },
  { key: "in_person" as const, icon: Users, labelKey: "methodInPerson" },
];

export function StepDatetime({
  selectedDate,
  selectedTime,
  selectedMethod,
  onDateChange,
  onTimeChange,
  onMethodChange,
  labels,
}: StepDatetimeProps) {
  return (
    <div className="space-y-10">
      {/* Date */}
      <div>
        <label className="mb-3 block text-sm font-medium text-primary-800">
          {labels.selectDate}
        </label>
        <input
          type="date"
          min={getMinDate()}
          value={selectedDate ?? ""}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-xl border border-secondary-200 bg-secondary-50 px-4 py-3 text-primary-800 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <label className="mb-3 block text-sm font-medium text-primary-800">
            {labels.selectTime}
          </label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => onTimeChange(slot)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  selectedTime === slot
                    ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                    : "border-secondary-200 bg-white text-secondary-600 hover:border-accent/30 hover:bg-accent-50",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Session Method */}
      {selectedTime && (
        <div>
          <label className="mb-3 block text-sm font-medium text-primary-800">
            {labels.selectMethod}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.key}
                  onClick={() => onMethodChange(method.key)}
                  className={cn(
                    "rounded-xl border-2 p-5 text-center transition-all duration-300 hover:-translate-y-0.5",
                    selectedMethod === method.key
                      ? "border-accent bg-accent-50 shadow-md shadow-accent/10"
                      : "border-secondary-200 bg-white hover:border-accent/30",
                  )}
                >
                  <Icon
                    className={cn(
                      "mx-auto h-7 w-7",
                      selectedMethod === method.key
                        ? "text-accent-dark"
                        : "text-secondary-400",
                    )}
                  />
                  <p className="mt-3 text-sm font-medium text-primary-800">
                    {labels[method.labelKey as keyof typeof labels]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
