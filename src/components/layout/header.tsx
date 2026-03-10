import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/booking", key: "booking" },
  { href: "/contact", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b border-secondary-100 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary-800">
            Group 110
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-secondary-600 transition-colors hover:text-primary-800"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/booking"
              className="rounded-lg bg-primary-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-900"
            >
              {tCommon("bookAppointment")}
            </Link>
          </div>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
