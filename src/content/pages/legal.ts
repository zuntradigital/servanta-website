import type { Locale } from "@/i18n/locales";
import type { RichBlock } from "../blog";

/**
 * Legal Center catalog (MOD-LEGAL-CENTER-WEB §10, §42).
 *
 * The SRS authors no legal wording (§1, §43): every document is in
 * LEGAL_REVIEW until qualified Saudi counsel approves its text. Until then a
 * document has no version or effective date and its page shows only the
 * "pending legal review" notice. No clause, deadline, retention period,
 * governing law or other legal conclusion is written here (§39).
 *
 * To publish a document once counsel approves it: set `status` to "PUBLISHED",
 * fill `version`, `effectiveFrom` and `lastUpdated`, and replace `body` with the
 * approved text for each locale. A published version is never edited in place;
 * a change creates a new version (§8).
 *
 * Section structures and the counsel review checklist live in
 * docs/website/23-WEBSITE-LEGAL-CENTER-SRS.md, never in public pages (§21).
 *
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 * The Arabic bodies translate the placeholder notice only; they are not legal text.
 */

export type LegalStatus = "DRAFT" | "LEGAL_REVIEW" | "APPROVED" | "SCHEDULED" | "PUBLISHED" | "SUPERSEDED" | "ARCHIVED";
export type LegalCategory = "platform" | "privacy" | "contracts" | "contact";
export type LegalVisibility = "public" | "authenticated" | "not_published";

export type LegalDocKey =
  | "terms_of_service"
  | "subscription_terms"
  | "privacy_policy"
  | "cookie_policy"
  | "acceptable_use"
  | "electronic_transactions_notice"
  | "contract_library_disclaimer"
  | "intermediary_disclosure"
  | "third_party_services"
  | "data_processing_addendum"
  | "refund_cancellation"
  | "legal_contact"
  | "security_disclosure"
  | "data_retention_notice";

type Bi<T> = Record<Locale, T>;

export type LegalCatalogEntry = {
  key: LegalDocKey;
  /** Stable public slug under /{locale}/legal/ (§5, §42). */
  slug: string;
  category: LegalCategory;
  priority: "P0" | "P1" | "P2";
  legalReview: "REQUIRED" | "CONDITIONAL" | "REQUIRED_IF_APPLICABLE" | "OPTIONAL";
  /** §21: only public documents appear in the Legal Center. */
  visibility: LegalVisibility;
  jurisdiction: "SA";
  status: LegalStatus;
  version: string | null;
  effectiveFrom: string | null;
  lastUpdated: string | null;
  title: Bi<string>;
  /** Neutral one-line description of what the document is (not what it says). */
  description: Bi<string>;
};

export const legalCatalog: LegalCatalogEntry[] = [
  {
    key: "terms_of_service",
    slug: "terms",
    category: "platform",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Terms of Service", ar: "شروط الخدمة" },
    description: { en: "The terms that apply to using the SERVANTA platform and this website.", ar: "الشروط التي تنطبق على استخدام منصة SERVANTA وهذا الموقع." },
  },
  {
    key: "subscription_terms",
    slug: "subscription",
    category: "platform",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Subscription Terms", ar: "شروط الاشتراك" },
    description: { en: "The commercial terms for SERVANTA subscriptions.", ar: "الشروط التجارية لاشتراكات SERVANTA." },
  },
  {
    key: "acceptable_use",
    slug: "acceptable-use",
    category: "platform",
    priority: "P1",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Acceptable Use Policy", ar: "سياسة الاستخدام المقبول" },
    description: { en: "How the platform may and may not be used.", ar: "أوجه الاستخدام المسموح بها وغير المسموح بها للمنصة." },
  },
  {
    key: "refund_cancellation",
    slug: "refunds-cancellation",
    category: "platform",
    priority: "P1",
    legalReview: "REQUIRED_IF_APPLICABLE",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Refund & Cancellation Policy", ar: "سياسة الاسترداد والإلغاء" },
    description: { en: "Refund and cancellation terms for subscriptions.", ar: "شروط الاسترداد والإلغاء للاشتراكات." },
  },
  {
    key: "privacy_policy",
    slug: "privacy",
    category: "privacy",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    description: { en: "How personal data is collected, used and protected.", ar: "كيف تُجمع البيانات الشخصية وتُستخدم وتُحمى." },
  },
  {
    key: "cookie_policy",
    slug: "cookies",
    category: "privacy",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Cookie Policy", ar: "سياسة ملفات تعريف الارتباط" },
    description: { en: "How this website uses cookies and similar technologies.", ar: "كيف يستخدم هذا الموقع ملفات تعريف الارتباط والتقنيات المشابهة." },
  },
  {
    key: "third_party_services",
    slug: "third-party-services",
    category: "privacy",
    priority: "P1",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Third-Party Services Disclosure", ar: "الإفصاح عن خدمات الأطراف الثالثة" },
    description: { en: "Categories of third-party services the platform relies on.", ar: "فئات خدمات الأطراف الثالثة التي تعتمد عليها المنصة." },
  },
  {
    key: "electronic_transactions_notice",
    slug: "electronic-transactions",
    category: "contracts",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Electronic Transactions & Electronic Signature Notice", ar: "إشعار المعاملات الإلكترونية والتوقيع الإلكتروني" },
    description: { en: "Information about electronic records, identity verification and electronic signatures on the platform.", ar: "معلومات حول السجلات الإلكترونية والتحقق من الهوية والتوقيع الإلكتروني على المنصة." },
  },
  {
    key: "contract_library_disclaimer",
    slug: "contract-library-disclaimer",
    category: "contracts",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Contract Library Disclaimer", ar: "إخلاء المسؤولية لمكتبة العقود" },
    description: { en: "Information about using the contract templates and clauses in the Legal Contract Library.", ar: "معلومات حول استخدام نماذج العقود والبنود في مكتبة العقود القانونية." },
  },
  {
    key: "intermediary_disclosure",
    slug: "intermediary-disclosure",
    category: "contracts",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Platform Intermediary Disclosure", ar: "الإفصاح عن دور المنصة كوسيط تقني" },
    description: { en: "SERVANTA's role as a technology platform, and how it relates to contracts between platform users and their counterparties.", ar: "دور SERVANTA كمنصة تقنية، وعلاقتها بالعقود المبرمة بين مستخدمي المنصة والأطراف المتعاقدة معهم." },
  },
  {
    key: "legal_contact",
    slug: "contact",
    category: "contact",
    priority: "P0",
    legalReview: "REQUIRED",
    visibility: "public",
    jurisdiction: "SA",
    status: "LEGAL_REVIEW",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Legal & Privacy Requests", ar: "الطلبات القانونية وطلبات الخصوصية" },
    description: { en: "Send a legal inquiry, privacy or data request, legal notice or complaint.", ar: "أرسل استفسارًا قانونيًا أو طلبًا يتعلق بالخصوصية أو البيانات أو إشعارًا قانونيًا أو شكوى." },
  },
  // Not public until counsel decides (§19, §21, §42): listed here so the catalog is complete.
  {
    key: "data_processing_addendum",
    slug: "dpa",
    category: "privacy",
    priority: "P1",
    legalReview: "CONDITIONAL",
    visibility: "authenticated",
    jurisdiction: "SA",
    status: "DRAFT",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Data Processing Addendum", ar: "ملحق معالجة البيانات" },
    description: { en: "Data processing terms between SERVANTA and its customers.", ar: "شروط معالجة البيانات بين SERVANTA وعملائها." },
  },
  {
    key: "data_retention_notice",
    slug: "data-retention",
    category: "privacy",
    priority: "P1",
    legalReview: "CONDITIONAL",
    visibility: "not_published",
    jurisdiction: "SA",
    status: "DRAFT",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Data Retention & Deletion Notice", ar: "إشعار الاحتفاظ بالبيانات وحذفها" },
    description: { en: "How long data is kept and how it is deleted.", ar: "مدة الاحتفاظ بالبيانات وكيفية حذفها." },
  },
  {
    key: "security_disclosure",
    slug: "security",
    category: "contact",
    priority: "P2",
    legalReview: "OPTIONAL",
    visibility: "not_published",
    jurisdiction: "SA",
    status: "DRAFT",
    version: null,
    effectiveFrom: null,
    lastUpdated: null,
    title: { en: "Security & Responsible Disclosure Notice", ar: "إشعار الأمان والإفصاح المسؤول" },
    description: { en: "How to report a security issue.", ar: "كيفية الإبلاغ عن مشكلة أمنية." },
  },
];

export const legalCategoryOrder: LegalCategory[] = ["platform", "privacy", "contracts", "contact"];

/** Documents shown in the public Legal Center (§21). The legal contact page has its own route. */
export function publicLegalDocuments(): LegalCatalogEntry[] {
  return legalCatalog.filter((doc) => doc.visibility === "public");
}

export function getLegalEntry(slug: string): LegalCatalogEntry | undefined {
  return publicLegalDocuments().find((doc) => doc.slug === slug && doc.key !== "legal_contact");
}

export function isLegalPublished(doc: LegalCatalogEntry): boolean {
  return doc.status === "PUBLISHED" && Boolean(doc.version && doc.effectiveFrom);
}

/* ------------------------------------------------------------------ */
/* Page model used by LegalPage                                        */
/* ------------------------------------------------------------------ */

export type LegalDoc = {
  title: string;
  description: string;
  version: string | null;
  effectiveFrom: string | null;
  lastUpdated: string | null;
  body: RichBlock[];
};

// Approved text replaces this per document once counsel publishes it (§43: no invented prose).
const pending = (title: string, locale: Locale): RichBlock[] =>
  locale === "ar"
    ? [{ type: "p", text: `يجري إعداد ${title}، وهي خاضعة للمراجعة القانونية. سيُنشر النص النهائي على هذه الصفحة.` }]
    : [{ type: "p", text: `This ${title} is being prepared and is subject to legal review. The final text will be published on this page.` }];

export function getLegalDoc(locale: Locale, entry: LegalCatalogEntry): LegalDoc {
  return {
    title: entry.title[locale],
    description: entry.description[locale],
    version: isLegalPublished(entry) ? entry.version : null,
    effectiveFrom: isLegalPublished(entry) ? entry.effectiveFrom : null,
    lastUpdated: isLegalPublished(entry) ? entry.lastUpdated : null,
    body: pending(entry.title[locale], locale),
  };
}

/* ------------------------------------------------------------------ */
/* Fixed labels                                                        */
/* ------------------------------------------------------------------ */

export const legalLabels: Record<
  Locale,
  {
    lastUpdated: string;
    version: string;
    effective: string;
    pendingReview: string;
    pendingBadge: string;
    contactPrefix: string;
    contactLink: string;
    allDocuments: string;
  }
> = {
  en: {
    lastUpdated: "Last updated",
    version: "Version",
    effective: "Effective",
    pendingReview: "Final text pending legal review.",
    pendingBadge: "Pending legal review",
    contactPrefix: "If you have a question in the meantime, please contact us using the",
    contactLink: "legal & privacy request form",
    allDocuments: "All legal documents",
  },
  ar: {
    lastUpdated: "آخر تحديث",
    version: "الإصدار",
    effective: "تاريخ السريان",
    pendingReview: "النص النهائي قيد المراجعة القانونية.",
    pendingBadge: "قيد المراجعة القانونية",
    contactPrefix: "إذا كان لديك أي استفسار في هذه الأثناء، يُرجى التواصل معنا عبر",
    contactLink: "نموذج الطلبات القانونية وطلبات الخصوصية",
    allDocuments: "جميع الوثائق القانونية",
  },
};

/** Legal Center landing copy (§6): neutral introduction and the two required notices. */
export const legalCenterContent: Record<
  Locale,
  {
    title: string;
    metaDescription: string;
    intro: string;
    effectiveDatesNote: string;
    userDocumentsNote: string;
    categories: Record<LegalCategory, string>;
    contactHeading: string;
    contactBody: string;
    contactLink: string;
  }
> = {
  en: {
    title: "Legal Center",
    metaDescription: "SERVANTA's platform legal documents: terms, subscription, privacy, cookies, electronic transactions and more.",
    intro: "SERVANTA's platform legal documents in one place.",
    effectiveDatesNote: "Each document shows its own version and effective date once it is published. Documents may have different effective dates.",
    userDocumentsNote:
      "These documents cover the SERVANTA platform and this website. Contracts and documents that platform users create for their own customers and counterparties are separate from these platform documents.",
    categories: {
      platform: "Platform & subscription",
      privacy: "Privacy & data",
      contracts: "Contracts & electronic transactions",
      contact: "Legal contact",
    },
    contactHeading: "Legal and privacy requests",
    contactBody: "For legal inquiries, privacy and data requests, legal notices or complaints, use the request form.",
    contactLink: "Open the request form",
  },
  ar: {
    title: "المركز القانوني",
    metaDescription: "الوثائق القانونية لمنصة SERVANTA: الشروط والاشتراك والخصوصية وملفات تعريف الارتباط والمعاملات الإلكترونية وغيرها.",
    intro: "الوثائق القانونية لمنصة SERVANTA في مكان واحد.",
    effectiveDatesNote: "تعرض كل وثيقة إصدارها وتاريخ سريانها عند نشرها، وقد تختلف تواريخ السريان من وثيقة إلى أخرى.",
    userDocumentsNote:
      "تخص هذه الوثائق منصة SERVANTA وهذا الموقع. أما العقود والمستندات التي ينشئها مستخدمو المنصة لعملائهم والأطراف المتعاقدة معهم، فهي منفصلة عن وثائق المنصة هذه.",
    categories: {
      platform: "المنصة والاشتراك",
      privacy: "الخصوصية والبيانات",
      contracts: "العقود والمعاملات الإلكترونية",
      contact: "التواصل القانوني",
    },
    contactHeading: "الطلبات القانونية وطلبات الخصوصية",
    contactBody: "للاستفسارات القانونية وطلبات الخصوصية والبيانات والإشعارات القانونية والشكاوى، استخدم نموذج الطلبات.",
    contactLink: "افتح نموذج الطلبات",
  },
};
