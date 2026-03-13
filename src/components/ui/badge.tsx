import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "success" | "accent" | "glass";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary-100 text-primary-800 border border-primary-200/50",
  success: "bg-green-50 text-green-700 border border-green-200/50",
  accent: "bg-accent-50 text-accent-900 border border-accent-200/50",
  glass:
    "backdrop-blur-md bg-white/20 text-white border border-white/20 shadow-sm",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
