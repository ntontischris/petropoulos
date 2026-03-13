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
        "group rounded-xl border border-secondary-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:border-accent/20",
        className,
      )}
    >
      {imageSrc && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 transition-all duration-300 group-hover:from-accent-50 group-hover:to-accent-100 group-hover:text-accent-dark">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-primary-800">{title}</h3>
      {description && (
        <p className="mt-2 leading-relaxed text-secondary-500">{description}</p>
      )}
      {children}
    </div>
  );
}
