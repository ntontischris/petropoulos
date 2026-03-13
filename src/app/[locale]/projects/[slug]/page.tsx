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
      {/* Hero header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-20 md:py-28">
        <div className="geometric-pattern absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" />
        <Container className="relative z-10">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-700/50 px-4 py-1.5 text-sm text-primary-300 transition-all hover:border-accent/50 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("title")}
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {getLocalizedField(project, "title", locale as Locale)}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="glass">
              {categoryLabels[project.category] ?? project.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm text-primary-300/80">
              <MapPin className="h-4 w-4" />
              {getLocalizedField(project, "location", locale as Locale)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-primary-300/80">
              <Clock className="h-4 w-4" />
              {project.duration}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {/* Description */}
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-secondary-600">
              {getLocalizedField(project, "description", locale as Locale)}
            </p>
          </div>

          {/* Before / After */}
          {(beforeImages.length > 0 || afterImages.length > 0) && (
            <div className="mt-20 grid gap-10 md:grid-cols-2">
              {beforeImages.length > 0 && (
                <div>
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-primary-800">
                    <span className="inline-block h-0.5 w-8 bg-secondary-300" />
                    {t("before")}
                  </h3>
                  <div className="grid gap-4">
                    {beforeImages.map((img) => (
                      <div
                        key={img.id}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-secondary-100 shadow-card"
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
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {afterImages.length > 0 && (
                <div>
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-primary-800">
                    <span className="inline-block h-0.5 w-8 bg-accent" />
                    {t("after")}
                  </h3>
                  <div className="grid gap-4">
                    {afterImages.map((img) => (
                      <div
                        key={img.id}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-secondary-100 shadow-card"
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
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          <div className="mt-20 flex items-stretch justify-between gap-4 border-t border-secondary-200 pt-10">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-secondary-100 bg-white px-6 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-card-hover"
              >
                <ArrowLeft className="h-4 w-4 text-secondary-400 transition-transform group-hover:-translate-x-1 group-hover:text-accent" />
                <span className="text-sm font-medium text-primary-800">
                  {getLocalizedField(prevProject, "title", locale as Locale)}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-secondary-100 bg-white px-6 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-card-hover"
              >
                <span className="text-sm font-medium text-primary-800">
                  {getLocalizedField(nextProject, "title", locale as Locale)}
                </span>
                <ArrowRight className="h-4 w-4 text-secondary-400 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
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
