import { cn } from "@/lib/utils/cn";
import { WIZARD_STEPS, type WizardStep } from "@/types/booking";

interface ProgressBarProps {
  currentStep: WizardStep;
  labels: Record<WizardStep, string>;
}

export function ProgressBar({ currentStep, labels }: ProgressBarProps) {
  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {WIZARD_STEPS.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  index <= currentIndex
                    ? "bg-primary-800 text-white"
                    : "bg-secondary-200 text-secondary-500",
                )}
              >
                {index + 1}
              </div>
              <span className="mt-2 hidden text-xs font-medium text-secondary-500 sm:block">
                {labels[step]}
              </span>
            </div>
            {index < WIZARD_STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  index < currentIndex ? "bg-primary-800" : "bg-secondary-200",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
