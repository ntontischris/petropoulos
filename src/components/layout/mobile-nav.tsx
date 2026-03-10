"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/booking", key: "booking" },
  { href: "/contact", key: "contact" },
] as const;

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md p-2 text-primary-800 hover:bg-primary-50"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-xl font-bold text-primary-800">
              Group 110
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-primary-800 hover:bg-primary-50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col px-4 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-secondary-100 py-4 text-lg font-medium text-primary-800 transition-colors hover:text-accent"
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="mt-8 flex items-center justify-center">
              <LanguageSwitcher />
            </div>

            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-lg bg-primary-800 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-900"
            >
              {t("booking")}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
