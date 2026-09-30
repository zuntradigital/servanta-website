import type { Locale } from "@/i18n/locales";

/**
 * FAQ page chrome (metadata, intro, category nav label, closing band).
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type FaqPageContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  tocLabel: string;
  cta: { heading: string; body: string };
};

const content: Record<Locale, FaqPageContent> = {
  en: {
    meta: {
      title: "Frequently asked questions",
      description: "Answers to common questions about the platform, day-to-day operations, pricing and getting started.",
    },
    intro: {
      title: "Frequently asked questions",
      subtitle: "Answers to the questions we hear most about the platform, operations, pricing and getting started.",
    },
    tocLabel: "FAQ categories",
    cta: { heading: "Still have questions?", body: "Our team is happy to help with anything not covered here." },
  },
  ar: {
    meta: {
      title: "الأسئلة الشائعة",
      description: "إجابات عن الأسئلة الشائعة حول المنصة والعمليات اليومية والأسعار وكيفية البدء.",
    },
    intro: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات عن أكثر الأسئلة التي تصلنا حول المنصة والعمليات والأسعار وكيفية البدء.",
    },
    tocLabel: "فئات الأسئلة الشائعة",
    cta: { heading: "هل لديك أسئلة أخرى؟", body: "يسعد فريقنا مساعدتك في أي أمر لم تتناوله هذه الصفحة." },
  },
};

export function getFaqPageContent(locale: Locale): FaqPageContent {
  return content[locale];
}
