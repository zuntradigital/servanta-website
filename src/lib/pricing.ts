import "server-only";
import { getSeedPlans } from "@/content/pricing";
import type { Locale } from "@/i18n/locales";
import { MIN_ANNUAL_PRICE, type PublicPlan, type PublicPlanResponse, type PublicPlansResponse } from "@/lib/pricing-types";

/**
 * Pricing API client (SRS-PRICING-PLANS-3-TIER §15, §20).
 *
 * With PRICING_API_BASE_URL set, plans come live from
 *   GET {base}/api/v1/public/plans and GET {base}/api/v1/public/plans/{code}
 * (revalidated every 5 minutes, language via Accept-Language).
 * Without it, the seed in src/content/pricing.ts is served through the same
 * code path. BACKEND-DEPENDENT: the endpoints do not exist yet.
 *
 * Throws on network or shape errors so the page can show its error state.
 */

const REVALIDATE_SECONDS = 300;

function baseUrl(): string | null {
  const base = process.env.PRICING_API_BASE_URL?.trim();
  return base ? base.replace(/\/$/, "") : null;
}

async function request<T>(path: string, locale: Locale): Promise<T | null> {
  const base = baseUrl();
  if (!base) return null;
  const response = await fetch(`${base}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { accept: "application/json", "accept-language": locale },
  });
  if (response.status === 404) throw new PlanNotFoundError(path);
  if (!response.ok) throw new Error(`Pricing API responded ${response.status} for ${path}`);
  return (await response.json()) as T;
}

export class PlanNotFoundError extends Error {}

function isPlanShape(plan: unknown): plan is PublicPlan {
  const p = plan as PublicPlan;
  return (
    typeof p?.code === "string" &&
    typeof p.name === "string" &&
    typeof p.currency === "string" &&
    typeof p.version?.annual_price === "number" &&
    Array.isArray(p.version.highlights) &&
    Array.isArray(p.version.feature_entitlements) &&
    Array.isArray(p.version.limits)
  );
}

/**
 * Only public, published plans at or above the price floor are shown
 * (AC-PRICE-001, AC-PRICE-006). The API is expected to enforce this already;
 * this is a defensive second check so a bad record never reaches visitors.
 */
function isDisplayable(plan: PublicPlan): boolean {
  const ok = plan.status === "published" && plan.visibility === "public" && plan.version.annual_price >= MIN_ANNUAL_PRICE;
  if (!ok) console.warn(`[pricing] plan "${plan.code}" skipped: not public/published or below the ${MIN_ANNUAL_PRICE} annual floor`);
  return ok;
}

/** Published plans for the pricing page, in `sort_order`. */
export async function getPublicPlans(locale: Locale): Promise<PublicPlan[]> {
  const data = (await request<PublicPlansResponse>("/api/v1/public/plans", locale)) ?? getSeedPlans(locale);
  if (!Array.isArray(data?.plans) || !data.plans.every(isPlanShape)) {
    throw new Error("Pricing API returned an unexpected shape");
  }
  return data.plans.filter(isDisplayable).sort((a, b) => a.sort_order - b.sort_order);
}

/** One published plan by code, or null when there is no such public plan. */
export async function getPublicPlan(code: string, locale: Locale): Promise<PublicPlan | null> {
  if (!/^[a-z0-9_-]{1,64}$/i.test(code)) return null;
  try {
    const data = await request<PublicPlanResponse>(`/api/v1/public/plans/${encodeURIComponent(code)}`, locale);
    const plan = data ? data.plan : getSeedPlans(locale).plans.find((p) => p.code === code);
    return plan && isPlanShape(plan) && isDisplayable(plan) ? plan : null;
  } catch (error) {
    if (error instanceof PlanNotFoundError) return null;
    throw error;
  }
}
