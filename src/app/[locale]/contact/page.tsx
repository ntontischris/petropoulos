import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactInfo } from "@/components/ui/contact-info";

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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-primary-800">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-primary-800">
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
              <div className="mt-8 aspect-video overflow-hidden rounded-xl bg-secondary-100">
                <div className="flex h-full items-center justify-center text-secondary-400">
                  Google Maps
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
