import { setRequestLocale, getTranslations } from "next-intl/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { AboutPreview } from "@/components/home/about-preview";
import { CtaBanner } from "@/components/ui/cta-banner";
import type { Locale } from "@/types/common";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const supabase = await createSupabaseServer();

  const [servicesResult, projectsResult] = await Promise.all([
    supabase
      .from("services")
      .select(
        "id, slug, title_el, title_en, description_el, description_en, icon, sort_order, is_active, created_at, updated_at",
      )
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("projects")
      .select(
        "id, slug, title_el, title_en, description_el, description_en, location_el, location_en, duration, category, is_featured, sort_order, created_at, updated_at, project_images(image_url, alt_text_el, alt_text_en)",
      )
      .eq("is_featured", true)
      .order("sort_order")
      .limit(4),
  ]);

  const services = servicesResult.data ?? [];
  const projects = projectsResult.data ?? [];

  return (
    <>
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("heroCta")}
        ctaSecondary={t("heroCtaSecondary")}
      />

      <ServicesOverview
        services={services}
        locale={locale as Locale}
        title={t("servicesTitle")}
        subtitle={t("servicesSubtitle")}
      />

      {projects.length > 0 && (
        <FeaturedProjects
          projects={projects}
          locale={locale as Locale}
          title={t("featuredTitle")}
          subtitle={t("featuredSubtitle")}
          ctaText={t("featuredCta")}
        />
      )}

      <AboutPreview
        title={t("aboutTitle")}
        description={t("aboutDescription")}
        stats={[
          { value: "15+", label: t("statsProjects") },
          { value: "5+", label: t("statsYears") },
          { value: "50+", label: t("statsClients") },
        ]}
      />

      <CtaBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        buttonText={t("ctaButton")}
        href="/booking"
      />
    </>
  );
}
