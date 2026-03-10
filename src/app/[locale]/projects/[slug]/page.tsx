import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getLocalizedField } from "@/lib/utils/get-localized-field";
import { MapPin, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/types/common";

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  try {
    const supabase = await createSupabaseServer();
    const { data: projects } = await supabase.from("projects").select("slug");

    return (projects ?? []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createSupabaseServer();
  const { data: project } = await supabase
    .from("projects")
    .select("title_el, title_en, description_el, description_en")
    .eq("slug", slug)
    .single();

  if (!project) return { title: "Project Not Found" };

  return {
    title: getLocalizedField(project, "title", locale as Locale),
    description: getLocalizedField(project, "description", locale as Locale),
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const supabase = await createSupabaseServer();

  const { data: project } = await supabase
    .from("projects")
    .select(
      "id, slug, title_el, title_en, description_el, description_en, location_el, location_en, duration, category, sort_order, project_images(id, image_url, is_before, sort_order, alt_text_el, alt_text_en)",
    )
    .eq("slug", slug)
    .single();

  if (!project) notFound();

  // Get prev/next projects for navigation
  const { data: allProjects } = await supabase
    .from("projects")
    .select("slug, title_el, title_en, sort_order")
    .order("sort_order");

  const projectList = allProjects ?? [];
  const currentIndex = projectList.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectList.length - 1
      ? projectList[currentIndex + 1]
      : null;

  const beforeImages = (project.project_images ?? [])
    .filter((img) => img.is_before)
    .sort((a, b) => a.sort_order - b.sort_order);
  const afterImages = (project.project_images ?? [])
    .filter((img) => !img.is_before)
    .sort((a, b) => a.sort_order - b.sort_order);

  const categoryLabels: Record<string, string> = {
    renovation: t("filterRenovation"),
    investment: t("filterInvestment"),
  };

  return (
    <>
      <section className="bg-primary-900 py-16">
        <Container>
          <Link
            href="/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm text-primary-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("title")}
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {getLocalizedField(project, "title", locale as Locale)}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Badge
              variant={project.category === "renovation" ? "default" : "accent"}
            >
              {categoryLabels[project.category] ?? project.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-primary-300">
              <MapPin className="h-4 w-4" />
              {getLocalizedField(project, "location", locale as Locale)}
            </span>
            <span className="flex items-center gap-1 text-sm text-primary-300">
              <Clock className="h-4 w-4" />
              {project.duration}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {/* Description */}
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-secondary-600">
              {getLocalizedField(project, "description", locale as Locale)}
            </p>
          </div>

          {/* Before / After */}
          {(beforeImages.length > 0 || afterImages.length > 0) && (
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {beforeImages.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-primary-800">
                    {t("before")}
                  </h3>
                  <div className="grid gap-4">
                    {beforeImages.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl"
                      >
                        <Image
                          src={img.image_url}
                          alt={
                            getLocalizedField(
                              img as Record<string, unknown>,
                              "alt_text",
                              locale as Locale,
                            ) || t("before")
                          }
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {afterImages.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-primary-800">
                    {t("after")}
                  </h3>
                  <div className="grid gap-4">
                    {afterImages.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl"
                      >
                        <Image
                          src={img.image_url}
                          alt={
                            getLocalizedField(
                              img as Record<string, unknown>,
                              "alt_text",
                              locale as Locale,
                            ) || t("after")
                          }
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prev / Next Navigation */}
          <div className="mt-16 flex items-center justify-between border-t border-secondary-200 pt-8">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-primary-800 hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                {getLocalizedField(prevProject, "title", locale as Locale)}
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-primary-800 hover:text-accent"
              >
                {getLocalizedField(nextProject, "title", locale as Locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
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
