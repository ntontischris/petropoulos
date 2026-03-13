"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

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
      className="flex items-center gap-0.5 rounded-full border border-secondary-200 px-1 py-0.5 text-sm font-medium transition-all duration-300 hover:border-primary-300"
      aria-label={`Switch to ${otherLocale === "el" ? "Greek" : "English"}`}
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-all duration-300",
          locale === "el"
            ? "bg-primary-800 text-white"
            : "text-secondary-400 hover:text-secondary-600",
        )}
      >
        EL
      </span>
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-all duration-300",
          locale === "en"
            ? "bg-primary-800 text-white"
            : "text-secondary-400 hover:text-secondary-600",
        )}
      >
        EN
      </span>
    </button>
  );
}
