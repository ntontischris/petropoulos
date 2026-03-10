import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
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
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary-100">
            <span className="text-primary-400">No image</span>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant={category === "renovation" ? "default" : "accent"}>
            {categoryLabel}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary-800">{title}</h3>
        <div className="mt-2 flex items-center gap-1 text-sm text-secondary-500">
          <MapPin className="h-4 w-4" />
          {location}
        </div>
      </div>
    </Link>
  );
}
