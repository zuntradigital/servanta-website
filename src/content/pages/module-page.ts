import type { Locale } from "@/i18n/locales";

/**
 * Fixed labels for the module page template (WEB-MKT-SRS-002 §103) and the
 * shared product-story sections. Module content itself lives in src/content/catalog.ts.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type ModulePageLabels = {
  breadcrumbs: string;
  home: string;
  features: string;
  capabilitiesHeading: string;
  workflowHeading: string;
  workflowSubheading: string;
  whereItFitsHeading: string;
  whereItFitsSubheading: string;
  journeyLabel: string;
  comingSoonHeading: string;
  comingSoonBody: string;
  relatedHeading: string;
  governanceHeading: string;
  governanceBody: string;
  securityLink: string;
  exploreHeading: string;
  howItWorksLink: string;
  solutionsLink: string;
  pricingLink: string;
  faqHeading: string;
  ctaHeading: string;
  dashboardHeading: string;
  dashboardSubheading: string;
  dashboardLink: string;
};

const labels: Record<Locale, ModulePageLabels> = {
  en: {
    breadcrumbs: "Breadcrumb",
    home: "Home",
    features: "Features",
    capabilitiesHeading: "Main capabilities",
    workflowHeading: "How it flows",
    workflowSubheading: "The stages a record moves through in this module.",
    whereItFitsHeading: "Where it fits",
    whereItFitsSubheading: "Every module works from the same connected records.",
    journeyLabel: "Connected product journey",
    comingSoonHeading: "Coming soon",
    comingSoonBody: "Approved for this module and planned for launch. Not available yet.",
    relatedHeading: "Related modules",
    governanceHeading: "Access and governance",
    governanceBody:
      "Like every module, it runs inside your own tenant, with role-based permissions and an audit layer for sensitive changes.",
    securityLink: "Security & Trust",
    exploreHeading: "Keep exploring",
    howItWorksLink: "How it works",
    solutionsLink: "Solutions",
    pricingLink: "Compare plans",
    faqHeading: "Questions",
    ctaHeading: "See it with your own operation in mind",
    dashboardHeading: "What the Command Center shows",
    dashboardSubheading: "The questions a manager asks every day, and where the answer comes from.",
    dashboardLink: "Explore the Command Center",
  },
  ar: {
    breadcrumbs: "مسار التنقل",
    home: "الرئيسية",
    features: "المزايا",
    capabilitiesHeading: "القدرات الرئيسية",
    workflowHeading: "كيف يسير العمل",
    workflowSubheading: "المراحل التي يمر بها السجل في هذه الوحدة.",
    whereItFitsHeading: "موقعها في المنظومة",
    whereItFitsSubheading: "تعمل كل وحدة من السجلات المتصلة نفسها.",
    journeyLabel: "رحلة المنتج المتصلة",
    comingSoonHeading: "قريبًا",
    comingSoonBody: "معتمدة لهذه الوحدة ومخطط إطلاقها، وليست متاحة بعد.",
    relatedHeading: "وحدات ذات صلة",
    governanceHeading: "الوصول والحوكمة",
    governanceBody: "كما في كل وحدة، تعمل داخل المستأجر الخاص بك، مع صلاحيات حسب الأدوار وطبقة تدقيق للتغييرات الحساسة.",
    securityLink: "الأمان والثقة",
    exploreHeading: "تابع الاستكشاف",
    howItWorksLink: "آلية العمل",
    solutionsLink: "الحلول",
    pricingLink: "قارن الباقات",
    faqHeading: "أسئلة",
    ctaHeading: "شاهدها وفق طبيعة عملياتك",
    dashboardHeading: "ما يعرضه مركز التحكم",
    dashboardSubheading: "الأسئلة التي يطرحها المدير كل يوم، ومن أين تأتي الإجابة.",
    dashboardLink: "استكشف مركز التحكم",
  },
};

export function getModulePageLabels(locale: Locale): ModulePageLabels {
  return labels[locale];
}
