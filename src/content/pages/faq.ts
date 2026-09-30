import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/locales";
import type { FaqItem } from "../types";

/**
 * Full FAQ, grouped by the WEB-MKT-SRS-002 §69 categories that have reviewed
 * answers (Features and Roadmap have none yet, so they are not shown; §124).
 * Grouped by category (website_faqs.category). The visual
 * accordion and FAQPage JSON-LD are generated from this same data.
 * Answers state only documented product facts; anything commercial points
 * to the sales team rather than making a claim.
 *
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

type Bilingual<T> = Record<Locale, T>;
type FaqEntry = { id: string } & Bilingual<FaqItem>;
type FaqGroupSource = { id: string; title: Bilingual<string>; items: FaqEntry[] };

const faqSource: FaqGroupSource[] = [
  {
    id: "product",
    title: { en: "Product", ar: "المنتج" },
    items: [
      {
        id: "coverage",
        en: {
          question: "Which parts of the business does the platform cover?",
          answer:
            "Customers, contracts, services and scheduling, work orders and field execution, billing and payments, and collections, with a Command Center that highlights what needs attention.",
        },
        ar: {
          question: "ما جوانب العمل التي تغطيها المنصة؟",
          answer:
            "العملاء والعقود، والخدمات والجدولة، وأوامر العمل والتنفيذ الميداني، والفوترة والمدفوعات، والتحصيل، مع مركز تحكم يُبرز ما يحتاج إلى متابعة.",
        },
      },
    ],
  },
  {
    id: "security",
    title: { en: "Security", ar: "الأمان" },
    items: [
      {
        id: "multi-tenant-secure",
        en: {
          question: `Is ${brand.name} multi-tenant and secure by design?`,
          answer:
            "Yes. The platform is built as a multi-tenant system in which each company's data is isolated from every other company's. Access is controlled by role, and key actions are recorded in an audit log.",
        },
        ar: {
          question: `هل ${brand.nameAr} متعددة المستأجرين وآمنة من حيث التصميم؟`,
          answer: "نعم. المنصة مبنية بنموذج متعدد المستأجرين تُعزل فيه بيانات كل شركة عن غيرها، ويخضع الوصول لصلاحيات الأدوار، وتُسجّل الإجراءات المهمة في سجل تدقيق.",
        },
      },
    ],
  },
  {
    id: "languages",
    title: { en: "Languages", ar: "اللغات" },
    items: [
      {
        id: "arabic",
        en: {
          question: "Is the platform available in Arabic?",
          answer: "Yes. The platform is fully bilingual in Arabic and English, with right-to-left layouts for Arabic.",
        },
        ar: {
          question: "هل المنصة متاحة باللغة العربية؟",
          answer: "نعم. المنصة ثنائية اللغة بالكامل بالعربية والإنجليزية، مع واجهات من اليمين إلى اليسار للعربية.",
        },
      },
    ],
  },
  {
    id: "operations",
    title: { en: "Operations", ar: "العمليات" },
    items: [
      {
        id: "recurring-and-one-time",
        en: {
          question: "Can I manage recurring and one-time services together?",
          answer: `Yes — ${brand.name}'s scheduling engine supports both recurring contract-based services and one-off on-demand work within the same operational view.`,
        },
        ar: {
          question: "هل يمكنني إدارة الخدمات الدورية والخدمات لمرة واحدة معًا؟",
          answer: `نعم. يدعم محرك الجدولة في ${brand.nameAr} الخدمات الدورية القائمة على العقود والأعمال لمرة واحدة عند الطلب ضمن العرض التشغيلي نفسه.`,
        },
      },
      {
        id: "invoices-and-work",
        en: {
          question: "How do invoices relate to the work we deliver?",
          answer: "Invoices are raised against completed, verified work, and each one traces back to the work order and contract it belongs to.",
        },
        ar: {
          question: "ما علاقة الفواتير بالأعمال التي ننفذها؟",
          answer: "تُصدر الفواتير مقابل الأعمال المنجزة والمتحقق منها، ويمكن تتبّع كل فاتورة إلى أمر العمل والعقد اللذين تنتمي إليهما.",
        },
      },
      {
        id: "field-on-site",
        en: {
          question: "Can field teams record work on site?",
          answer: "Yes. Work orders are assigned to the field, and completion is recorded against the work order so it can be verified before billing.",
        },
        ar: {
          question: "هل يمكن للفرق الميدانية تسجيل الأعمال في الموقع؟",
          answer: "نعم. تُسند أوامر العمل إلى الفرق الميدانية، ويُسجَّل الإنجاز على أمر العمل نفسه ليتسنى التحقق منه قبل الفوترة.",
        },
      },
    ],
  },
  {
    id: "pricing",
    title: { en: "Pricing & plans", ar: "الأسعار والباقات" },
    items: [
      {
        id: "pricing-scale",
        en: {
          question: "Does pricing scale with my team?",
          answer:
            "Plans differ in the capabilities and number of users they include, so you can start with what you need and move up as you grow. See Pricing for current plans, or talk to our team about your operation.",
        },
        ar: {
          question: "هل تتناسب الأسعار مع حجم فريقي؟",
          answer:
            "تختلف الباقات في القدرات وعدد المستخدمين المشمولين، لتبدأ بما تحتاجه وتتوسع مع نموك. اطّلع على صفحة الأسعار لمعرفة الباقات الحالية، أو تحدّث مع فريقنا عن طبيعة عملياتك.",
        },
      },
      {
        id: "change-plans",
        en: {
          question: "Can I change plans later?",
          answer: "Talk to our team about moving between plans; they can walk you through what changes and when.",
        },
        ar: {
          question: "هل يمكنني تغيير الباقة لاحقًا؟",
          answer: "تحدّث مع فريقنا بشأن الانتقال بين الباقات، وسيوضحون لك ما الذي يتغير ومتى.",
        },
      },
      {
        id: "what-is-a-user",
        en: {
          question: "What counts as a user?",
          answer: "A user is a person who signs in to the platform. Talk to our team if you are unsure how this applies to your operation.",
        },
        ar: {
          question: "من يُحتسب مستخدمًا؟",
          answer: "المستخدم هو كل شخص يسجّل الدخول إلى المنصة. تحدّث مع فريقنا إن لم تكن متأكدًا من كيفية تطبيق ذلك على عملياتك.",
        },
      },
    ],
  },
  {
    id: "implementation",
    title: { en: "Implementation", ar: "التطبيق والإعداد" },
    items: [
      {
        id: "onboarding",
        en: {
          question: "Do you help with onboarding?",
          answer: "Yes. Onboarding and implementation support are part of working with us; see Services for how we engage.",
        },
        ar: {
          question: "هل تساعدوننا في الإعداد والتهيئة؟",
          answer: "نعم. دعم الإعداد والتنفيذ جزء من العمل معنا؛ اطّلع على صفحة الخدمات لمعرفة آلية تعاوننا.",
        },
      },
    ],
  },
  {
    id: "demo-sales",
    title: { en: "Demo & sales", ar: "العرض التوضيحي والمبيعات" },
    items: [
      {
        id: "get-started",
        en: {
          question: "How do I get started?",
          answer: "Request a demo. We will walk through your operation with you and recommend the right plan and onboarding path.",
        },
        ar: {
          question: "كيف أبدأ؟",
          answer: "اطلب عرضًا توضيحيًا. سنستعرض معك طبيعة عملياتك ونوصي بالباقة ومسار الإعداد المناسبين.",
        },
      },
    ],
  },
];

export function getFaqGroups(locale: Locale): FaqGroup[] {
  return faqSource.map((group) => ({ id: group.id, title: group.title[locale], items: group.items.map((item) => item[locale]) }));
}

/** English FAQ groups (kept for existing callers). */
export const faqGroups: FaqGroup[] = getFaqGroups("en");

export const pricingFaqIds = ["Does pricing scale with my team?", "Can I change plans later?", "What counts as a user?"];

/** Looks items up by their English question text and returns them in the requested locale. */
export function faqsByQuestion(questions: string[], locale: Locale = "en"): FaqItem[] {
  const all = faqSource.flatMap((g) => g.items);
  return questions
    .map((q) => all.find((item) => item.en.question === q)?.[locale])
    .filter((item): item is FaqItem => Boolean(item));
}
