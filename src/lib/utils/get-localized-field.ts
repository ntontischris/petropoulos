import type { Locale } from "@/types/common";

export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale,
): string {
  const key = `${field}_${locale}` as keyof T;
  return (item[key] as string) ?? "";
}
