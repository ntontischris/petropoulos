import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import type { Project, ProjectImage } from "@/types/database";
import type { Locale } from "@/types/common";
import { getLocalizedField } from "@/lib/utils/get-localized-field";

interface ProjectWithFirstImage extends Project {
  project_images: Pick<
    ProjectImage,
    "image_url" | "alt_text_el" | "alt_text_en"
  >[];
}

interface FeaturedProjectsProps {
  projects: ProjectWithFirstImage[];
  locale: Locale;
  title: string;
  subtitle: string;
  ctaText: string;
}

export function FeaturedProjects({
  projects,
  locale,
  title,
  subtitle,
  ctaText,
}: FeaturedProjectsProps) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const firstImage = project.project_images[0];
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.image_url}
                      alt={
                        getLocalizedField(
                          firstImage as Record<string, unknown>,
                          "alt_text",
                          locale,
                        ) || getLocalizedField(project, "title", locale)
                      }
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary-100">
                      <span className="text-primary-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary-800">
                    {getLocalizedField(project, "title", locale)}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-secondary-500">
                    <MapPin className="h-4 w-4" />
                    {getLocalizedField(project, "location", locale)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline">{ctaText}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
