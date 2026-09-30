import type { Locale } from "@/i18n/locales";
import type { Availability, FeatureEntitlement, PlanHighlight, PlanLimit, PublicPlan, PublicPlansResponse } from "@/lib/pricing-types";

/**
 * SEED DATA — stands in for GET /api/v1/public/plans until the pricing API
 * exists (set PRICING_API_BASE_URL to switch to the live API). It is shaped
 * exactly like the API response and read only through src/lib/pricing.ts;
 * no page or component authors a price, plan name or feature itself.
 *
 * Source: SRS-PRICING-PLANS-3-TIER v1.0 (§2.2, §3–6, §26). Arabic is the SRS
 * text; English is a translation drafted for this build and needs review.
 *
 * One deliberate reading of the SRS: §6 marks Signature Evidence and Contract
 * Finalization for Business as plain ✓, but §5 lists both under "when the
 * electronic signature module launches", and AC-PRICE-013/014 forbid showing
 * an unreleased feature as available. They are therefore marked "at_launch".
 */

type Bi = { en: string; ar: string };
type Cell = boolean | { level: Bi } | "launch" | { level: Bi; launch: true };

/** Comparison rows in §6 order; values are [Starter, Professional, Business]. */
const featureRows: Array<{ key: string; label: Bi; values: [Cell, Cell, Cell] }> = [
  { key: "customer_management", label: { en: "Customer management", ar: "إدارة العملاء" }, values: [true, true, true] },
  { key: "contract_management", label: { en: "Contract management", ar: "إدارة العقود" }, values: [true, true, true] },
  { key: "contract_renewals", label: { en: "Contract renewals", ar: "تجديد العقود" }, values: [false, true, true] },
  { key: "service_management", label: { en: "Service management", ar: "إدارة الخدمات" }, values: [true, true, true] },
  { key: "scheduling", label: { en: "Scheduling", ar: "الجدولة" }, values: [true, true, true] },
  { key: "work_orders", label: { en: "Work orders", ar: "أوامر العمل" }, values: [true, true, true] },
  { key: "field_operations", label: { en: "Field operations", ar: "العمليات الميدانية" }, values: [true, true, true] },
  { key: "invoicing", label: { en: "Invoicing", ar: "الفواتير" }, values: [true, true, true] },
  { key: "payments", label: { en: "Payments", ar: "المدفوعات" }, values: [true, true, true] },
  { key: "collections", label: { en: "Collections", ar: "التحصيل" }, values: [{ level: { en: "Basic", ar: "أساسي" } }, true, true] },
  { key: "basic_reports", label: { en: "Basic reports", ar: "التقارير الأساسية" }, values: [true, true, true] },
  { key: "expanded_reports", label: { en: "Expanded reports", ar: "التقارير الموسعة" }, values: [false, true, true] },
  {
    key: "advanced_reports",
    label: { en: "Advanced reports", ar: "التقارير المتقدمة" },
    values: [false, { level: { en: "Subject to feature launch", ar: "حسب إطلاق الميزة" } }, { level: { en: "Advanced", ar: "متقدمة" }, launch: true }],
  },
  {
    key: "command_center",
    label: { en: "Command Center", ar: "Command Center" },
    values: [{ level: { en: "Basic", ar: "أساسي" } }, { level: { en: "Expanded", ar: "موسع" } }, { level: { en: "Full", ar: "كامل" } }],
  },
  { key: "notifications", label: { en: "Notifications", ar: "الإشعارات" }, values: [true, true, true] },
  { key: "audit_logs", label: { en: "Audit logs", ar: "Audit Logs" }, values: [true, true, true] },
  {
    key: "contract_library",
    label: { en: "Contract library", ar: "مكتبة العقود" },
    values: [{ level: { en: "Basic", ar: "أساسية" } }, { level: { en: "Expanded", ar: "موسعة" } }, { level: { en: "Full", ar: "كاملة" } }],
  },
  { key: "custom_templates", label: { en: "Custom templates", ar: "القوالب المخصصة" }, values: [false, true, true] },
  { key: "legal_clauses", label: { en: "Legal clauses", ar: "Legal Clauses" }, values: [false, false, "launch"] },
  { key: "electronic_signature", label: { en: "Electronic signature", ar: "Electronic Signature" }, values: [false, false, "launch"] },
  { key: "multi_party_signing", label: { en: "Multi-party signing", ar: "Multi-Party Signing" }, values: [false, false, "launch"] },
  { key: "signature_evidence", label: { en: "Signature evidence", ar: "Signature Evidence" }, values: [false, false, "launch"] },
  { key: "contract_finalization", label: { en: "Contract finalization", ar: "Contract Finalization" }, values: [false, false, "launch"] },
  { key: "contract_sharing", label: { en: "Contract sharing", ar: "Contract Sharing" }, values: [true, true, true] },
  { key: "distribution_tracking", label: { en: "Distribution tracking", ar: "Distribution Tracking" }, values: [false, true, true] },
];

/** Limits from §3–5; values are [Starter, Professional, Business]. */
const limitRows: Array<{ key: string; label: Bi; values: [number, number, number]; unit?: "GB"; period?: "month" }> = [
  { key: "users", label: { en: "Users", ar: "المستخدمون" }, values: [2, 10, 25] },
  { key: "customers", label: { en: "Customers", ar: "العملاء" }, values: [100, 500, 2000] },
  { key: "contracts", label: { en: "Contracts", ar: "العقود" }, values: [100, 500, 2000] },
  { key: "work_orders", label: { en: "Work orders", ar: "أوامر العمل" }, values: [100, 500, 2000], period: "month" },
  { key: "branches", label: { en: "Branches", ar: "الفروع" }, values: [1, 3, 10] },
  { key: "storage", label: { en: "Storage", ar: "التخزين" }, values: [5, 25, 100], unit: "GB" },
];

type Highlight = { label: Bi; launch?: boolean };

const plans: Array<{
  code: string;
  name: string;
  description: Bi;
  display_description: Bi;
  annual_price: number;
  includes_plan: string | null;
  library_level: "basic" | "expanded" | "full";
  highlights: Highlight[];
}> = [
  {
    code: "starter",
    name: "Starter",
    description: { en: "For individuals and small businesses", ar: "الأفراد والمنشآت الصغيرة" },
    display_description: { en: "Start organizing your business", ar: "ابدأ بتنظيم أعمالك" },
    annual_price: 600,
    includes_plan: null,
    library_level: "basic",
    highlights: [
      { label: { en: "Customer management and customer profiles", ar: "إدارة العملاء وملف العميل" } },
      { label: { en: "Contracts with status, start and end date tracking", ar: "إدارة العقود وحالاتها وتواريخ البداية والنهاية" } },
      { label: { en: "Services linked to customers and contracts", ar: "إنشاء الخدمات وربطها بالعملاء والعقود" } },
      { label: { en: "Work orders and basic scheduling", ar: "أوامر العمل والجدولة الأساسية" } },
      { label: { en: "Invoices, payment recording and receivables", ar: "الفواتير وتسجيل المدفوعات ومتابعة المستحقات" } },
      { label: { en: "Basic reports, alerts and audit log", ar: "التقارير الأساسية والتنبيهات وسجل العمليات" } },
    ],
  },
  {
    code: "professional",
    name: "Professional",
    description: { en: "For growing companies", ar: "الشركات النامية" },
    display_description: { en: "Grow how you manage your business and contracts", ar: "طوّر إدارة أعمالك وعقودك" },
    annual_price: 1200,
    includes_plan: "starter",
    library_level: "expanded",
    highlights: [
      { label: { en: "Contract renewal tracking and expiry alerts", ar: "متابعة تجديد العقود وتنبيهات قرب الانتهاء" } },
      { label: { en: "Legal contract library with ready templates to copy and edit", ar: "مكتبة العقود القانونية ونماذج جاهزة للنسخ والتعديل" } },
      { label: { en: "Team management with role-based permissions", ar: "إدارة الفريق وتوزيع الصلاحيات حسب الأدوار" } },
      { label: { en: "Advanced scheduling and basic branch management", ar: "جدولة متقدمة وإدارة الفروع الأساسية" } },
      { label: { en: "Collections tracking and financial indicators", ar: "متابعة التحصيل والمؤشرات المالية" } },
      { label: { en: "Expanded reports and Command Center indicators", ar: "تقارير تشغيلية موسعة ومؤشرات Command Center" } },
    ],
  },
  {
    code: "business",
    name: "Business",
    description: { en: "For companies and operations teams", ar: "الشركات والفرق التشغيلية" },
    display_description: { en: "Run the full contract and operations cycle professionally", ar: "أدر دورة العقود والتشغيل باحترافية متكاملة" },
    annual_price: 2400,
    includes_plan: "professional",
    library_level: "full",
    highlights: [
      { label: { en: "Full contract library and custom company templates", ar: "مكتبة العقود الكاملة والقوالب المخصصة للشركة" } },
      { label: { en: "Electronic and multi-party signing", ar: "التوقيع الإلكتروني وتوقيع الأطراف المتعددة" }, launch: true },
      { label: { en: "Signature evidence and contract finalization", ar: "أدلة التوقيع وإصدار النسخة النهائية للعقد" }, launch: true },
      { label: { en: "Contract sharing with delivery and distribution tracking", ar: "مشاركة العقود وتتبع الإرسال والتوزيع" } },
      { label: { en: "Full Command Center and detailed team permissions", ar: "Command Center الكامل وصلاحيات أكثر تفصيلًا" } },
      { label: { en: "Advanced business reports", ar: "تقارير أعمال متقدمة" }, launch: true },
    ],
  },
];

function entitlement(row: (typeof featureRows)[number], index: number, locale: Locale): FeatureEntitlement {
  const cell = row.values[index];
  const availability: Availability = cell === "launch" || (typeof cell === "object" && "launch" in cell) ? "at_launch" : "available";
  const level = typeof cell === "object" ? cell.level[locale] : null;
  return { key: row.key, label: row.label[locale], included: cell !== false, level_label: level, availability };
}

function limit(row: (typeof limitRows)[number], index: number, locale: Locale): PlanLimit {
  return { key: row.key, label: row.label[locale], value: row.values[index], unit: row.unit ?? null, period: row.period ?? null };
}

function build(locale: Locale): PublicPlansResponse {
  return {
    plans: plans.map(
      (plan, index): PublicPlan => ({
        code: plan.code,
        name: plan.name,
        description: plan.description[locale],
        display_description: plan.display_description[locale],
        currency: "SAR",
        visibility: "public",
        status: "published",
        sort_order: index + 1,
        is_popular: false,
        is_recommended: false,
        version: {
          version: 1,
          effective_date: null,
          monthly_price: null,
          annual_price: plan.annual_price,
          includes_plan: plan.includes_plan,
          highlights: plan.highlights.map((h): PlanHighlight => ({ label: h.label[locale], availability: h.launch ? "at_launch" : "available" })),
          feature_entitlements: featureRows.map((row) => entitlement(row, index, locale)),
          service_entitlements: [],
          limits: limitRows.map((row) => limit(row, index, locale)),
          contract_template_entitlements: { library_level: plan.library_level, custom_templates: plan.code !== "starter" },
        },
      }),
    ),
  };
}

const seed: Record<Locale, PublicPlansResponse> = { en: build("en"), ar: build("ar") };

/** Seed response for GET /api/v1/public/plans in the given language. */
export function getSeedPlans(locale: Locale): PublicPlansResponse {
  return seed[locale];
}
