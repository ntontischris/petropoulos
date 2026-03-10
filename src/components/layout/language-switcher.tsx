"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "el" ? "en" : "el";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-primary-800 transition-colors hover:bg-primary-50"
      aria-label={`Switch to ${otherLocale === "el" ? "Greek" : "English"}`}
    >
      <span className={locale === "el" ? "font-bold" : "text-secondary-400"}>
        EL
      </span>
      <span className="text-secondary-300">|</span>
      <span className={locale === "en" ? "font-bold" : "text-secondary-400"}>
        EN
      </span>
    </button>
  );
}
