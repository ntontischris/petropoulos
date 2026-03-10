export const BRAND = {
  name: "Group 110",
  fullName: "Group 110 Real Estate & Consulting",
  tagline: "Smart Real Estate Investments",
  domain: "group110.gr",
  url: "https://group110.gr",
} as const;

export const COLORS = {
  primary: {
    50: "#f0f3f8",
    100: "#d9e0ed",
    200: "#b3c1db",
    300: "#8da2c9",
    400: "#6783b7",
    500: "#4164a5",
    600: "#344f84",
    700: "#273b63",
    800: "#1b2a4a",
    900: "#111b30",
    950: "#0a1019",
  },
  secondary: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  accent: "#c8a96e",
  accentLight: "#d4bc8a",
  accentDark: "#b08f4f",
} as const;

export const BOOKING_CONFIG = {
  availableDays: [1, 2, 3, 4, 5] as const, // Mon-Fri
  startHour: 10,
  endHour: 18,
  slotDurationMinutes: 30,
  timezone: "Europe/Athens",
} as const;

export const SESSION_METHODS = ["video_call", "phone", "in_person"] as const;
export type SessionMethod = (typeof SESSION_METHODS)[number];

export const LOCALES = ["el", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "el";
