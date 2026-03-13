import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  slug: string;
  title: string;
  location: string;
  category: string;
  categoryLabel: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function ProjectCard({
  slug,
  title,
  location,
  category,
  categoryLabel,
  imageUrl,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block overflow-hidden rounded-xl border border-secondary-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/20 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary-100">
            <span className="text-primary-400">No image</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-3 top-3">
          <Badge
            variant={category === "renovation" ? "glass" : "glass"}
            className="backdrop-blur-md"
          >
            {categoryLabel}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="text-lg font-semibold text-primary-800">{title}</h3>
          <div className="mt-1.5 flex items-center gap-1 text-sm text-secondary-500">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-secondary-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
      </div>
    </Link>
  );
}
