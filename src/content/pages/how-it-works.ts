import type { Locale } from "@/i18n/locales";

/**
 * How It Works page copy. The stages themselves come from the shared journey
 * (src/content/journey.ts, WEB-MKT-SRS-002 §60), so the homepage chain and this
 * page can't drift apart.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type HowItWorksContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  steps: { heading: string; moduleLink: string };
  faq: { heading: string };
};

export function getHowItWorksContent(locale: Locale): HowItWorksContent {
  const content: Record<Locale, HowItWorksContent> = {
    en: {
      meta: {
        title: "How It Works",
        description: "A stage-by-stage walkthrough: customer, contract, services, scheduling, field work, evidence, verification, billing, payment, collections, reporting and renewal.",
      },
      intro: {
        title: "How it works",
        subtitle: "From the first customer record to renewal, each stage builds on the record created before it.",
      },
      steps: { heading: "Stages", moduleLink: "View module" },
      faq: { heading: "Process questions" },
    },
    ar: {
      meta: {
        title: "آلية العمل",
        description: "شرح مرحلة بمرحلة: العميل والعقد والخدمات والجدولة والعمل الميداني والأدلة والتحقق والفوترة والدفع والتحصيل والتقارير والتجديد.",
      },
      intro: {
        title: "آلية العمل",
        subtitle: "من أول سجل للعميل حتى التجديد، تُبنى كل مرحلة على السجل الذي أُنشئ قبلها.",
      },
      steps: { heading: "المراحل", moduleLink: "عرض الوحدة" },
      faq: { heading: "أسئلة حول آلية العمل" },
    },
  };
  return content[locale];
}
