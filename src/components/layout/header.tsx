import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { HeaderShell } from "./header-shell";

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
    <HeaderShell>
      <Container>
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1 text-xl font-bold text-primary-800"
          >
            <span>Group</span>
            <span className="gradient-text">110</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="nav-link-animated text-sm font-medium text-secondary-600 transition-colors hover:text-primary-800"
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
              className="btn-shimmer relative overflow-hidden rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-primary-900 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-glow"
            >
              {tCommon("bookAppointment")}
            </Link>
          </div>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </Container>
    </HeaderShell>
  );
}
