import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      <h2 className="text-3xl font-bold text-primary-800 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-secondary-500">{subtitle}</p>
      )}
    </div>
  );
}
