import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-2 border-accent/30 bg-gradient-to-b from-primary-900 to-primary-950 py-16 text-primary-200">
      <div className="dot-pattern absolute inset-0" />
      <Container className="relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 flex items-center gap-1 text-lg font-bold text-white">
              <span>Group</span>
              <span className="gradient-text">110</span>
            </h3>
            <p className="text-sm leading-relaxed text-primary-300/80">
              Smart Real Estate Investments
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-700 text-primary-400 transition-all duration-300 hover:border-accent hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-700 text-primary-400 transition-all duration-300 hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-700 text-primary-400 transition-all duration-300 hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("servicesTitle")}
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/services"
                className="nav-link-animated w-fit text-sm text-primary-300/80 transition-colors hover:text-white"
              >
                {tNav("services")}
              </Link>
              <Link
                href="/projects"
                className="nav-link-animated w-fit text-sm text-primary-300/80 transition-colors hover:text-white"
              >
                {tNav("projects")}
              </Link>
              <Link
                href="/booking"
                className="nav-link-animated w-fit text-sm text-primary-300/80 transition-colors hover:text-white"
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
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/about"
                className="nav-link-animated w-fit text-sm text-primary-300/80 transition-colors hover:text-white"
              >
                {tNav("about")}
              </Link>
              <Link
                href="/contact"
                className="nav-link-animated w-fit text-sm text-primary-300/80 transition-colors hover:text-white"
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
            <div className="flex flex-col gap-2.5 text-sm text-primary-300/80">
              <p>info@group110.gr</p>
              <p>+30 210 000 0000</p>
              <p>Αθήνα, Ελλάδα</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-primary-800/60 pt-8 text-center text-sm text-primary-400/70">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </Container>
    </footer>
  );
}
