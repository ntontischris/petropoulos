import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { BookingWizard } from "@/components/booking/booking-wizard";
import type { Locale } from "@/types/common";

interface BookingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("bookingTitle"),
    description: t("bookingDescription"),
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");

  const supabase = await createSupabaseServer();
  const { data: bookingTypes } = await supabase
    .from("booking_types")
    .select(
      "id, slug, name_el, name_en, description_el, description_en, duration_minutes, price_cents, is_active, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20">
        <Container>
          <BookingWizard
            bookingTypes={bookingTypes ?? []}
            locale={locale as Locale}
          />
        </Container>
      </section>
    </>
  );
}
