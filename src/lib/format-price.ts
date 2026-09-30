import type { Locale } from "@/i18n/locales";

const arabicCurrencyNames: Record<string, string> = { SAR: "ريال" };

/** "SAR 1,200" in English, "1,200 ريال" in Arabic (the SRS wording). Western digits in both. */
export function formatPrice(amount: number, currency: string, locale: Locale): string {
  const number = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
  return locale === "ar" ? `${number} ${arabicCurrencyNames[currency] ?? currency}` : `${currency} ${number}`;
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
