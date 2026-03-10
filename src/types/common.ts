import type { LOCALES } from "@/lib/constants";

export type Locale = (typeof LOCALES)[number];

export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };
