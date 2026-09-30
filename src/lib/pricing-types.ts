/**
 * Public Pricing API contract (SRS-PRICING-PLANS-3-TIER §8, §15, §20).
 *
 *   GET /api/v1/public/plans          → PublicPlansResponse (published plans only)
 *   GET /api/v1/public/plans/{code}   → PublicPlanResponse
 *
 * Text fields (names, descriptions, feature labels) are returned in the
 * language asked for with Accept-Language. Nothing in this file is plan
 * data; plan names, prices, features and limits only ever come from the API
 * (or, until it exists, from the seed that mirrors it: src/content/pricing.ts).
 */

export type PlanStatus = "draft" | "published" | "archived";
export type PlanVisibility = "public" | "private";

/** "at_launch": part of the plan, but the platform module is not released yet (AC-PRICE-013/014). */
export type Availability = "available" | "at_launch";

/** One row of the plan comparison (§6). `level_label` carries graded values such as "Basic" / "Full". */
export type FeatureEntitlement = {
  key: string;
  label: string;
  included: boolean;
  level_label: string | null;
  availability: Availability;
};

/** Numeric plan limit (§3–5). `period` is set for per-period quotas, e.g. work orders per month. */
export type PlanLimit = {
  key: string;
  label: string;
  value: number;
  unit: "GB" | null;
  period: "month" | null;
};

/** Short selling points for the plan card: the plan's top 4–6 features (§15). */
export type PlanHighlight = { label: string; availability: Availability };

export type ContractTemplateEntitlements = {
  library_level: "basic" | "expanded" | "full";
  custom_templates: boolean;
};

/** A published PlanVersion is immutable; a commercial change creates a new version (§8.2, §18). */
export type PlanVersion = {
  version: number;
  /** ISO date, or null until the version is published. */
  effective_date: string | null;
  /** Only set if a separate monthly subscription is approved (§9, §28). Never a derived value. */
  monthly_price: number | null;
  annual_price: number;
  /** Code of the plan whose features this one includes ("Everything in Starter, plus"). */
  includes_plan: string | null;
  highlights: PlanHighlight[];
  feature_entitlements: FeatureEntitlement[];
  service_entitlements: FeatureEntitlement[];
  limits: PlanLimit[];
  contract_template_entitlements: ContractTemplateEntitlements;
};

/** Plan (§8.1) with its current published version. */
export type PublicPlan = {
  code: string;
  name: string;
  /** Short description: who the plan is for (§2.2). */
  description: string;
  /** Marketing message shown on the card (§26). */
  display_description: string;
  currency: string;
  visibility: PlanVisibility;
  status: PlanStatus;
  sort_order: number;
  is_popular: boolean;
  is_recommended: boolean;
  version: PlanVersion;
};

export type PublicPlansResponse = { plans: PublicPlan[] };
export type PublicPlanResponse = { plan: PublicPlan };

/** Lowest annual price a public plan may be published at (§2.1, AC-PRICE-001). */
export const MIN_ANNUAL_PRICE = 600;

/** Display-only monthly equivalent, always derived, never stored (§9). */
export function monthlyEquivalent(plan: PublicPlan): number {
  return plan.version.annual_price / 12;
}
