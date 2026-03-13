import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceDetail } from "@/components/services/service-detail";
import { CtaBanner } from "@/components/ui/cta-banner";
import { getLocalizedField } from "@/lib/utils/get-localized-field";
import type { Locale } from "@/types/common";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const supabase = await createSupabaseServer();
  const { data: services } = await supabase
    .from("services")
    .select(
      "id, slug, title_el, title_en, description_el, description_en, icon, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20">
        <Container>
          {(services ?? []).map((service, index) => (
            <ServiceDetail
              key={service.id}
              title={getLocalizedField(service, "title", locale as Locale)}
              description={getLocalizedField(
                service,
                "description",
                locale as Locale,
              )}
              icon={service.icon}
              isReversed={index % 2 === 1}
              index={index}
            />
          ))}
        </Container>
      </section>

      <CtaBanner
        title={t("ctaTitle")}
        buttonText={t("ctaButton")}
        href="/booking"
      />
    </>
  );
}
