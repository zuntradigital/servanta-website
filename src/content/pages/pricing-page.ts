import type { PricingLabels } from "@/components/pricing/PricingPlans";
import type { Locale } from "@/i18n/locales";

/**
 * Pricing page copy. Arabic copy drafted for this build; needs review by a
 * native Arabic copy editor before launch.
 */
export type PricingPageContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  plansHeading: string;
  loading: string;
  error: { title: string; body: string };
  empty: { title: string; body: string };
  compare: { heading: string; featuresCaption: string; limitsCaption: string; firstColumn: string; limitColumn: string; included: string; notIncluded: string };
  notes: string[];
  faqHeading: string;
  labels: PricingLabels;
};

const content: Record<Locale, PricingPageContent> = {
  en: {
    meta: {
      title: "Pricing",
      description: "Compare plans and see what each one includes. Talk to our team to find the right fit for your operation.",
    },
    intro: {
      title: "Simple, transparent pricing",
      subtitle: "Start with what you need. Every plan is enforced by the platform itself — never a limitation that exists only in the interface.",
    },
    plansHeading: "Plans",
    loading: "Loading plans",
    error: {
      title: "Pricing is temporarily unavailable",
      body: "Please contact us and we will share current plans and pricing with you.",
    },
    empty: {
      title: "No plans are published right now",
      body: "Please contact us and we will walk you through the options for your operation.",
    },
    compare: {
      heading: "Compare plans",
      featuresCaption: "Features by plan",
      limitsCaption: "Limits by plan",
      firstColumn: "Feature",
      limitColumn: "Limit",
      included: "Included",
      notIncluded: "Not included",
    },
    notes: [
      "Prices are in Saudi riyals (SAR) and billed annually. The monthly amount is the annual price divided by 12, shown for comparison.",
    ],
    faqHeading: "Pricing questions",
    labels: {
      perYear: "/year",
      monthlyEquivalent: "{amount} per month, billed annually",
      everythingIn: "Everything in {plan}, plus:",
      keyLimits: "Key limits",
      perMonth: "/ month",
      popular: "Most popular",
      recommended: "Recommended",
      recommendedHidden: "recommended plan",
      currentPlan: "Current plan",
      currentPlanCta: "Your current plan",
      requestPlan: "Request this plan",
    },
  },
  ar: {
    meta: {
      title: "الأسعار",
      description: "قارن بين الباقات واطّلع على ما تتضمنه كل باقة. تحدّث مع فريقنا لاختيار الأنسب لعملك.",
    },
    intro: {
      title: "أسعار واضحة وبسيطة",
      subtitle: "ابدأ بما تحتاجه. المنصة نفسها تطبّق حدود كل باقة — وليست قيودًا موجودة في الواجهة فقط.",
    },
    plansHeading: "الباقات",
    loading: "جارٍ تحميل الباقات",
    error: {
      title: "الأسعار غير متاحة مؤقتًا",
      body: "يرجى التواصل معنا وسنشاركك الباقات والأسعار الحالية.",
    },
    empty: {
      title: "لا توجد باقات منشورة حاليًا",
      body: "يرجى التواصل معنا وسنستعرض معك الخيارات المناسبة لعملك.",
    },
    compare: {
      heading: "قارن الباقات",
      featuresCaption: "المميزات حسب الباقة",
      limitsCaption: "الحدود حسب الباقة",
      firstColumn: "الميزة",
      limitColumn: "الحد",
      included: "متضمنة",
      notIncluded: "غير متضمنة",
    },
    notes: [
      "الأسعار بالريال السعودي وتُدفع سنويًا. المبلغ الشهري هو السعر السنوي مقسومًا على 12، ويُعرض للمقارنة فقط.",
    ],
    faqHeading: "أسئلة عن الأسعار",
    labels: {
      perYear: "/سنويًا",
      monthlyEquivalent: "{amount} شهريًا عند الدفع السنوي",
      everythingIn: "كل مميزات {plan} بالإضافة إلى:",
      keyLimits: "الحدود الرئيسية",
      perMonth: "/ شهر",
      popular: "الأكثر استخدامًا",
      recommended: "الموصى بها",
      recommendedHidden: "الباقة الموصى بها",
      currentPlan: "باقتك الحالية",
      currentPlanCta: "باقتك الحالية",
      requestPlan: "اطلب هذه الباقة",
    },
  },
};

export function getPricingPageContent(locale: Locale): PricingPageContent {
  return content[locale];
}
