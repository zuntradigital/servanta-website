import type { NewsletterLabels } from "@/components/forms/NewsletterForm";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { getForms } from "./forms";

/** Newsletter copy: its own strings plus the shared form error and privacy text. */
export function getNewsletterLabels(locale: Locale): NewsletterLabels {
  const { newsletter } = getDictionary(locale);
  const shared = getForms(locale).contact.messages;
  return {
    ...newsletter,
    errorTitle: locale === "ar" ? "تعذّر إتمام الاشتراك." : "We couldn't subscribe you.",
    errorBody: shared.errorBody,
    notConfiguredTitle: shared.notConfiguredTitle,
    notConfiguredBody: shared.notConfiguredBody,
    privacyPrefix: shared.privacyPrefix,
    privacyLink: shared.privacyLink,
  };
}
