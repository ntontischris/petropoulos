import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 py-12 text-primary-200">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Group 110</h3>
            <p className="text-sm leading-relaxed text-primary-300">
              Smart Real Estate Investments
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("servicesTitle")}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/services"
                className="text-sm text-primary-300 transition-colors hover:text-white"
              >
                {tNav("services")}
              </Link>
              <Link
                href="/projects"
                className="text-sm text-primary-300 transition-colors hover:text-white"
              >
                {tNav("projects")}
              </Link>
              <Link
                href="/booking"
                className="text-sm text-primary-300 transition-colors hover:text-white"
              >
                {tNav("booking")}
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("company")}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-primary-300 transition-colors hover:text-white"
              >
                {tNav("about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-primary-300 transition-colors hover:text-white"
              >
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("contactTitle")}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-primary-300">
              <p>info@group110.gr</p>
              <p>+30 210 000 0000</p>
              <p>Αθήνα, Ελλάδα</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-primary-700 pt-8 text-center text-sm text-primary-400">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </Container>
    </footer>
  );
}
