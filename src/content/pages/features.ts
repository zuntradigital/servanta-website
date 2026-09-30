import type { Locale } from "@/i18n/locales";
import type { FeatureItem } from "../types";
import { getProductModules } from "./modules";

/**
 * Features page copy.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
type DetailSection = { eyebrow: string; heading: string; paragraphs: string[]; bullets: string[] };

export type FeaturesContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  modules: { heading: string; subheading: string; items: FeatureItem[] };
  contractLifecycle: DetailSection;
  fieldOperations: DetailSection;
  financialOperations: DetailSection;
  faq: { heading: string };
};

export function getFeaturesContent(locale: Locale): FeaturesContent {
  const content: Record<Locale, FeaturesContent> = {
    en: {
      meta: {
        title: "Features",
        description:
          "Every module of the platform — customers, contracts, scheduling, work orders, billing, payments and collections — working as one connected system.",
      },
      intro: {
        title: "Every part of your operation connected",
        subtitle:
          "Each module shares the same customer, contract and work records, so information entered once is available everywhere it is needed.",
      },
      modules: {
        heading: "All modules",
        subheading: "One platform, one set of records, no separate tools to reconcile.",
        items: getProductModules("en"),
      },
      contractLifecycle: {
        eyebrow: "Contract lifecycle",
        heading: "From signed agreement to renewal",
        paragraphs: [
          "Capture the terms once and let them drive what happens next: which services are due, how they are billed, and when the contract needs renewing.",
        ],
        bullets: ["Contract value, term and billing frequency", "Covered services and sites", "Renewal dates surfaced before they pass"],
      },
      fieldOperations: {
        eyebrow: "Field operations",
        heading: "Work that is assigned, done and verified",
        paragraphs: [
          "Work orders go to the right team with the site and contract attached. Completion is recorded on site, so the office sees verified work rather than a phone call.",
        ],
        bullets: ["Assignment to field teams", "On-site checklists and notes", "Completion status visible to the office"],
      },
      financialOperations: {
        eyebrow: "Financial operations",
        heading: "Invoices that trace back to the work",
        paragraphs: [
          "Bill against completed work orders under the right contract, record payments as they arrive, and keep an eye on what is overdue.",
        ],
        bullets: ["Invoices built from verified work", "Payments recorded against invoices", "Overdue balances surfaced for follow-up"],
      },
      faq: { heading: "Feature questions" },
    },
    ar: {
      meta: {
        title: "المزايا",
        description:
          "جميع وحدات المنصة — العملاء والعقود والجدولة وأوامر العمل والفوترة والمدفوعات والتحصيل — تعمل معًا كنظام واحد متكامل.",
      },
      intro: {
        title: "كل جزء من عملياتك، متصل",
        subtitle:
          "تتشارك جميع الوحدات سجلات العملاء والعقود والأعمال نفسها، فتصبح المعلومات المُدخلة مرة واحدة متاحة في كل مكان تحتاج إليها فيه.",
      },
      modules: {
        heading: "جميع الوحدات",
        subheading: "منصة واحدة ومجموعة واحدة من السجلات، دون أدوات منفصلة تحتاج إلى مطابقة.",
        items: getProductModules("ar"),
      },
      contractLifecycle: {
        eyebrow: "دورة حياة العقد",
        heading: "من توقيع الاتفاقية حتى التجديد",
        paragraphs: [
          "سجّل الشروط مرة واحدة ودعها توجّه ما يليها: الخدمات المستحقة، وطريقة فوترتها، وموعد تجديد العقد.",
        ],
        bullets: ["قيمة العقد ومدته ودورية الفوترة", "الخدمات والمواقع المشمولة", "إبراز مواعيد التجديد قبل فواتها"],
      },
      fieldOperations: {
        eyebrow: "العمليات الميدانية",
        heading: "عمل يُسنَد ويُنجَز ويُتحقَّق منه",
        paragraphs: [
          "تصل أوامر العمل إلى الفريق المناسب مرفقةً بالموقع والعقد. ويُسجَّل الإنجاز في الموقع، فيرى المكتب عملًا تم التحقق منه بدلًا من مجرد مكالمة هاتفية.",
        ],
        bullets: ["الإسناد إلى الفرق الميدانية", "قوائم تحقق وملاحظات في الموقع", "حالة الإنجاز مرئية للمكتب"],
      },
      financialOperations: {
        eyebrow: "العمليات المالية",
        heading: "فواتير ترتبط بالعمل المنجز",
        paragraphs: [
          "أصدر الفواتير مقابل أوامر العمل المكتملة ضمن العقد الصحيح، وسجّل المدفوعات فور ورودها، وتابع ما تأخر سداده.",
        ],
        bullets: ["فواتير مبنية على عمل تم التحقق منه", "مدفوعات مسجّلة مقابل الفواتير", "إبراز الأرصدة المتأخرة لمتابعتها"],
      },
      faq: { heading: "أسئلة حول المزايا" },
    },
  };
  return content[locale];
}
