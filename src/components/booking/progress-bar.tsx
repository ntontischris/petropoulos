import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";
import { WIZARD_STEPS, type WizardStep } from "@/types/booking";

interface ProgressBarProps {
  currentStep: WizardStep;
  labels: Record<WizardStep, string>;
}

export function ProgressBar({ currentStep, labels }: ProgressBarProps) {
  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                    isCompleted &&
                      "bg-accent text-white shadow-md shadow-accent/20",
                    isActive &&
                      "bg-primary-800 text-white shadow-lg shadow-primary-800/30 ring-4 ring-primary-200/30",
                    !isCompleted &&
                      !isActive &&
                      "bg-secondary-100 text-secondary-400",
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-3 hidden text-xs font-medium sm:block",
                    isActive
                      ? "text-primary-800"
                      : isCompleted
                        ? "text-accent-dark"
                        : "text-secondary-400",
                  )}
                >
                  {labels[step]}
                </span>
              </div>
              {index < WIZARD_STEPS.length - 1 && (
                <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-secondary-100">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-500",
                      index < currentIndex ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
