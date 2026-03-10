import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  icon,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        className,
      )}
    >
      {imageSrc && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-primary-800">{title}</h3>
      {description && <p className="mt-2 text-secondary-500">{description}</p>}
      {children}
    </div>
  );
}
