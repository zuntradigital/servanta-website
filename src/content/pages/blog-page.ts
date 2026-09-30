import type { BlogListingLabels } from "@/components/blog/BlogListing";
import type { Locale } from "@/i18n/locales";

/**
 * Blog listing and article chrome. Arabic copy drafted for this build;
 * needs review by a native Arabic copy editor before launch.
 */
export type BlogPageContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string };
  sectionLabel: string;
  latest: string;
  none: string;
  listing: Omit<BlogListingLabels, "readTime">;
  article: { breadcrumb: string; related: string; ctaHeading: string; modulesHeading: string };
};

const content: Record<Locale, BlogPageContent> = {
  en: {
    meta: {
      title: "Blog",
      description: "Insights on running a contract-based service business: operations, contracts, field service, billing and collections.",
    },
    intro: {
      title: "Insights on running a service business",
      subtitle: "Practical thinking on contracts, scheduling, field work, billing and collections.",
    },
    sectionLabel: "Articles",
    latest: "Latest articles",
    none: "No articles have been published yet. Check back soon.",
    listing: {
      filterLabel: "Filter by category",
      all: "All",
      empty: "No articles in this category yet.",
      emptyAction: "Show all articles",
      pagination: "Pagination",
      previous: "Previous page",
      next: "Next page",
      page: "Page",
    },
    article: { breadcrumb: "Breadcrumb", related: "Related articles", ctaHeading: "See how it works for your operation", modulesHeading: "Explore the modules behind this article" },
  },
  ar: {
    meta: {
      title: "المدونة",
      description: "رؤى حول إدارة شركات الخدمات القائمة على العقود: العمليات والعقود والخدمة الميدانية والفوترة والتحصيل.",
    },
    intro: {
      title: "رؤى حول إدارة شركات الخدمات",
      subtitle: "أفكار عملية حول العقود والجدولة والعمل الميداني والفوترة والتحصيل.",
    },
    sectionLabel: "المقالات",
    latest: "أحدث المقالات",
    none: "لم تُنشر أي مقالات بعد. عد قريبًا.",
    listing: {
      filterLabel: "التصفية حسب الفئة",
      all: "الكل",
      empty: "لا توجد مقالات في هذه الفئة بعد.",
      emptyAction: "عرض جميع المقالات",
      pagination: "التنقل بين الصفحات",
      previous: "الصفحة السابقة",
      next: "الصفحة التالية",
      page: "الصفحة",
    },
    article: { breadcrumb: "مسار التنقل", related: "مقالات ذات صلة", ctaHeading: "شاهد كيف يعمل مع طبيعة عملك", modulesHeading: "استكشف الوحدات المرتبطة بهذه المقالة" },
  },
};

export function getBlogPageContent(locale: Locale): BlogPageContent {
  return content[locale];
}
