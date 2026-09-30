import type { Locale } from "@/i18n/locales";

/**
 * Resources hub (WEB-MKT-SRS-002 §7.2). Only resource types that exist are
 * listed: guides, case studies and downloads appear once real, approved
 * content exists ("Case Studies — only when real", "Downloads — only when approved").
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type ResourcesContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  sections: { heading: string; blog: { title: string; description: string }; faq: { title: string; description: string } };
  latest: string;
};

const content: Record<Locale, ResourcesContent> = {
  en: {
    meta: { title: "Resources", description: "Articles and answers about running a contract-based service business on one connected platform." },
    intro: { title: "Resources", subtitle: "Articles and answers to help you understand the platform and the operation it runs." },
    sections: {
      heading: "Browse resources",
      blog: { title: "Blog", description: "Articles on contracts, scheduling, field work, billing and collections." },
      faq: { title: "FAQ", description: "Answers about the platform, security, pricing and getting started." },
    },
    latest: "Latest articles",
  },
  ar: {
    meta: { title: "الموارد", description: "مقالات وإجابات حول إدارة شركة خدمات قائمة على العقود عبر منصة واحدة متكاملة." },
    intro: { title: "الموارد", subtitle: "مقالات وإجابات تساعدك على فهم المنصة والعمليات التي تديرها." },
    sections: {
      heading: "تصفّح الموارد",
      blog: { title: "المدونة", description: "مقالات حول العقود والجدولة والعمل الميداني والفوترة والتحصيل." },
      faq: { title: "الأسئلة الشائعة", description: "إجابات عن المنصة والأمان والأسعار والبدء." },
    },
    latest: "أحدث المقالات",
  },
};

export function getResourcesContent(locale: Locale): ResourcesContent {
  return content[locale];
}
