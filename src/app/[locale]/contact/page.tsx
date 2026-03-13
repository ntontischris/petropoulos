import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactInfo } from "@/components/ui/contact-info";
import { MapPin } from "lucide-react";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-secondary-100 bg-white p-8 shadow-card">
              <h2 className="mb-8 text-2xl font-bold text-primary-800">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-primary-800">
                {t("infoTitle")}
              </h2>
              <ContactInfo
                phone="+30 210 000 0000"
                email="info@group110.gr"
                address="Αθήνα, Ελλάδα"
                hours={t("hoursValue")}
                labels={{
                  phone: tCommon("phone"),
                  email: tCommon("email"),
                  address: tCommon("address"),
                  hours: t("hours"),
                }}
              />

              {/* Map Placeholder */}
              <div className="mt-8 overflow-hidden rounded-xl border border-secondary-100 shadow-card">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-secondary-50 to-secondary-100">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-accent" />
                    <p className="text-sm font-medium text-secondary-500">
                      Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
