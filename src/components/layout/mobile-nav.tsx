"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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
        className="rounded-lg p-2 text-primary-800 transition-colors hover:bg-primary-50"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-primary-950/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
                <span className="flex items-center gap-1 text-xl font-bold text-primary-800">
                  <span>Group</span>
                  <span className="gradient-text">110</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-primary-800 transition-colors hover:bg-primary-50"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block border-b border-secondary-50 py-4 text-lg font-medium text-primary-800 transition-colors hover:text-accent"
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-8 flex items-center justify-center"
                >
                  <LanguageSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/booking"
                    onClick={() => setIsOpen(false)}
                    className="btn-shimmer relative mt-6 block overflow-hidden rounded-lg bg-accent px-6 py-3.5 text-center font-semibold text-primary-900 shadow-md transition-all duration-300 hover:bg-accent-dark hover:shadow-glow"
                  >
                    {t("booking")}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
