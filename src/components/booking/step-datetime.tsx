import { cn } from "@/lib/utils/cn";
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
  { key: "video_call" as const, icon: "📹" },
  { key: "phone" as const, icon: "📞" },
  { key: "in_person" as const, icon: "🤝" },
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
    <div className="space-y-8">
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
          className="w-full rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  selectedTime === slot
                    ? "border-primary-800 bg-primary-800 text-white"
                    : "border-secondary-200 text-secondary-600 hover:border-primary-300",
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
            {methods.map((method) => (
              <button
                key={method.key}
                onClick={() => onMethodChange(method.key)}
                className={cn(
                  "rounded-xl border-2 p-4 text-center transition-all",
                  selectedMethod === method.key
                    ? "border-primary-800 bg-primary-50"
                    : "border-secondary-200 hover:border-primary-300",
                )}
              >
                <span className="text-2xl">{method.icon}</span>
                <p className="mt-2 text-sm font-medium text-primary-800">
                  {
                    labels[
                      `method${method.key === "video_call" ? "VideoCall" : method.key === "phone" ? "Phone" : "InPerson"}` as keyof typeof labels
                    ]
                  }
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
