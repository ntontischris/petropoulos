"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { MapPin, ArrowRight } from "lucide-react";
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
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={title} subtitle={subtitle} />
        </ScrollReveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const firstImage = project.project_images[0];
            return (
              <ScrollReveal key={project.id} delay={index * 0.12}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-xl border border-secondary-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/20 hover:shadow-card-hover"
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
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-primary-100">
                        <span className="text-primary-400">No image</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1 text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <MapPin className="h-4 w-4" />
                      {getLocalizedField(project, "location", locale)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <h3 className="text-lg font-semibold text-primary-800">
                      {getLocalizedField(project, "title", locale)}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-secondary-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-14 text-center">
            <Link href="/projects">
              <Button variant="outline">{ctaText}</Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
