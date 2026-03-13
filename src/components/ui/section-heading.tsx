import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  decorated?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  decorated = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" && "text-center",
        decorated && "accent-bar",
        decorated && align === "center" && "accent-bar-center",
        className,
      )}
    >
      <h2 className="text-3xl font-bold text-primary-800 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
