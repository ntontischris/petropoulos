import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      languages: {
        el: `${SITE_CONFIG.url}/el`,
        en: `${SITE_CONFIG.url}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
