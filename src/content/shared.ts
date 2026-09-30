import type { Locale } from "@/i18n/locales";
import { brand } from "@/config/brand";

/** Standard closing CTA band copy, reused by every marketing page. */
export function closingCta(locale: Locale) {
  return locale === "ar"
    ? { heading: `هل أنت مستعد لتجربة ${brand.nameAr}؟` }
    : { heading: `Ready to see ${brand.name} in action?` };
}

/** Caption used on every illustrative UI composition (Design Gap DG-005). */
export const illustrativeCaption = "Illustrative product view — not a finished screenshot";

/** Localised variant of `illustrativeCaption`. */
export function illustrativeCaptionFor(locale: Locale): string {
  return locale === "ar" ? "تصور توضيحي للمنتج — ليس لقطة شاشة نهائية" : illustrativeCaption;
}
