import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Shield, Lightbulb, Target, Eye } from "lucide-react";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    {
      key: "reliability",
      icon: <Shield className="h-6 w-6" />,
      title: t("valueReliability"),
      description: t("valueReliabilityDesc"),
    },
    {
      key: "innovation",
      icon: <Lightbulb className="h-6 w-6" />,
      title: t("valueInnovation"),
      description: t("valueInnovationDesc"),
    },
    {
      key: "efficiency",
      icon: <Target className="h-6 w-6" />,
      title: t("valueEfficiency"),
      description: t("valueEfficiencyDesc"),
    },
    {
      key: "transparency",
      icon: <Eye className="h-6 w-6" />,
      title: t("valueTransparency"),
      description: t("valueTransparencyDesc"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20">
        <Container>
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            className="[&_h2]:text-white [&_p]:text-primary-200"
          />
        </Container>
      </section>

      {/* Story */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary-800">
              {t("storyTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-secondary-500">
              {t("storyText")}
            </p>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="bg-background-alt py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary-800">
              {t("visionTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-secondary-500">
              {t("visionText")}
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("valuesTitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card
                key={value.key}
                title={value.title}
                description={value.description}
                icon={value.icon}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-primary-800 py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "15+", label: t("statsProjects") },
              { value: "5+", label: t("statsYears") },
              { value: "50+", label: t("statsClients") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-accent">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-primary-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={t("ctaTitle")}
        buttonText={t("ctaButton")}
        href="/contact"
      />
    </>
  );
}
