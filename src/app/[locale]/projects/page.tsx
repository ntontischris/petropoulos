import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { CtaBanner } from "@/components/ui/cta-banner";
import { getLocalizedField } from "@/lib/utils/get-localized-field";
import type { Locale } from "@/types/common";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: ProjectsPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const supabase = await createSupabaseServer();

  let query = supabase
    .from("projects")
    .select(
      "id, slug, title_el, title_en, location_el, location_en, category, sort_order, project_images(image_url, alt_text_el, alt_text_en)",
    )
    .order("sort_order");

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data: projects } = await query;

  const filters = [
    { key: "all", label: t("filterAll") },
    { key: "renovation", label: t("filterRenovation") },
    { key: "investment", label: t("filterInvestment") },
  ];

  const categoryLabels: Record<string, string> = {
    renovation: t("filterRenovation"),
    investment: t("filterInvestment"),
  };

  return (
    <>
      <section className="bg-primary-900 py-20">
        <Container>
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            className="[&_h2]:text-white [&_p]:text-primary-200"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Suspense>
            <ProjectFilter filters={filters} />
          </Suspense>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(projects ?? []).map((project) => {
              const firstImage = project.project_images?.[0];
              return (
                <ProjectCard
                  key={project.id}
                  slug={project.slug}
                  title={getLocalizedField(project, "title", locale as Locale)}
                  location={getLocalizedField(
                    project,
                    "location",
                    locale as Locale,
                  )}
                  category={project.category}
                  categoryLabel={
                    categoryLabels[project.category] ?? project.category
                  }
                  imageUrl={firstImage?.image_url}
                  imageAlt={getLocalizedField(
                    firstImage as Record<string, unknown>,
                    "alt_text",
                    locale as Locale,
                  )}
                />
              );
            })}
          </div>

          {(projects ?? []).length === 0 && (
            <p className="py-20 text-center text-secondary-500">
              No projects found.
            </p>
          )}
        </Container>
      </section>

      <CtaBanner
        title={t("similarCta")}
        buttonText={t("filterAll")}
        href="/booking"
      />
    </>
  );
}
