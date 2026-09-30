/**
 * Brand settings — the single configuration record for every public-facing
 * identity value (22-WEBSITE-BRAND-INDEPENDENCE-SPECIFICATION §4).
 * Components read the brand from here and never hardcode it.
 * Leave a value empty to hide it; nothing falls back to invented data.
 */
type BrandSettings = {
  name: string;
  nameAr: string;
  legalEntityName: string;
  domain: string;
  tagline: { en: string; ar?: string };
  defaultDescription: { en: string; ar: string };
  contact: { email: string; phone: string; address: { en: string; ar: string } };
  social: Partial<Record<"linkedin" | "x" | "youtube" | "instagram", string>>;
};

export const brand: BrandSettings = {
  name: "SERVANTA",
  /** The Arabic rendering keeps the Latin wordmark (44A §1.3, proposed). */
  nameAr: "SERVANTA",
  /**
   * Approved legal name for official legal places (WEB-MKT-SRS-002 §117).
   * The product name (SERVANTA vs ZynDesk) is still DECISION_REQUIRED and is not changed here.
   */
  legalEntityName: "Zyntra Digital",
  domain: "servanta.systems",
  tagline: {
    en: "The Operating System for Contract-Based Service Businesses.",
    ar: "نظام التشغيل لشركات الخدمات القائمة على العقود.",
  },
  defaultDescription: {
    en: "SERVANTA unifies customers, contracts, scheduling, field execution, billing, and collections in one connected system.",
    ar: "توحّد SERVANTA العملاء والعقود والجدولة والتنفيذ الميداني والفوترة والتحصيل في نظام واحد متكامل.",
  },
  /** Supply real values before launch; empty values are not rendered. */
  contact: {
    email: "",
    phone: "",
    address: { en: "", ar: "" },
  },
  /** e.g. { linkedin: "https://…", x: "https://…" } */
  social: {},
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${brand.domain}`).replace(/\/$/, "");

/**
 * The design shows the Trust Strip and Statistics sections in a labelled
 * placeholder state until real customers and measured figures exist
 * (Design Gap DG-003). Off: WEB-MKT-SRS-002 §1.1/§9/AC-016 forbid unverified
 * statistics on the public site, labelled or not. Turn on only for review builds.
 */
export const showContentPlaceholders = false;
