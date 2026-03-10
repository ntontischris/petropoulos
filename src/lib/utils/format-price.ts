import type { Locale } from "@/types/common";

export function formatPrice(cents: number, locale: Locale): string {
  if (cents === 0) {
    return locale === "el" ? "Δωρεάν" : "Free";
  }

  return new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
