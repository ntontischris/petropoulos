import type { Locale } from "@/types/common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLocalizedField(
  item: any,
  field: string,
  locale: Locale,
): string {
  if (!item) return "";
  const key = `${field}_${locale}`;
  return (item[key] as string) ?? "";
}
