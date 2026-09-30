export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Localised strings for content that exists in some locales only. */
export type Localized<T> = { en: T } & Partial<Record<Exclude<Locale, "en">, T>>;
