import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import { cx } from "@/lib/cx";
import { formatCount, formatPrice } from "@/lib/format-price";
import { monthlyEquivalent, type PlanLimit, type PublicPlan } from "@/lib/pricing-types";
import styles from "./Pricing.module.css";

export type PricingLabels = {
  perYear: string;
  /** "{amount}" is replaced with the monthly equivalent. */
  monthlyEquivalent: string;
  /** "{plan}" is replaced with the included plan's name. */
  everythingIn: string;
  keyLimits: string;
  perMonth: string;
  popular: string;
  recommended: string;
  recommendedHidden: string;
  currentPlan: string;
  currentPlanCta: string;
  requestPlan: string;
};

type PricingPlansProps = {
  plans: PublicPlan[];
  locale: Locale;
  labels: PricingLabels;
  /** Href for a plan's CTA (the Contact Sales form with the plan preselected). */
  ctaHref: (plan: PublicPlan) => string;
  /**
   * Code of the visitor's current plan (§15 "current plan state"). BACKEND-DEPENDENT:
   * needs a signed-in tenant and GET /api/v1/tenant/subscription; the public site
   * has neither, so this is not passed yet.
   */
  currentPlanCode?: string;
};

export function formatLimit(limit: PlanLimit, perMonth: string): string {
  const value = `${formatCount(limit.value)}${limit.unit ? ` ${limit.unit}` : ""}`;
  return limit.period === "month" ? `${value} ${perMonth}` : value;
}

/**
 * Plan cards (§15): name, short description, annual price, derived monthly
 * equivalent, top features, key limits, CTA, current-plan state and a badge
 * only when the plan data sets one. Everything shown comes from the plan data.
 */
export function PricingPlans({ plans, locale, labels, ctaHref, currentPlanCode }: PricingPlansProps) {
  const nameOf = (code: string | null) => plans.find((p) => p.code === code)?.name;

  return (
    <ul role="list" className={cx(styles.plans, plans.length === 4 && styles.plans4, plans.length <= 2 && styles.plansFew)}>
      {plans.map((plan, index) => {
        const current = plan.code === currentPlanCode;
        const highlighted = plan.is_recommended || plan.is_popular;
        const badge = current ? labels.currentPlan : plan.is_popular ? labels.popular : plan.is_recommended ? labels.recommended : null;
        const includes = nameOf(plan.version.includes_plan);
        return (
          <li
            key={plan.code}
            className={cx(styles.plan, highlighted && styles.recommended)}
            data-plan={plan.code}
            data-reveal
            style={{ ["--reveal-index" as string]: index }}
          >
            {badge && (
              <Badge tone={current ? "success" : "accent"} className={styles.badge}>
                {badge}
              </Badge>
            )}
            <h3 className={styles.planName}>
              {plan.name}
              {highlighted && !current && <span className="visually-hidden"> ({labels.recommendedHidden})</span>}
            </h3>
            <p className={styles.planAudience}>{plan.description}</p>
            <p className={styles.planDesc}>{plan.display_description}</p>

            <div className={styles.priceBlock}>
              <p className={styles.price}>
                <span className="ltr-number">{formatPrice(plan.version.annual_price, plan.currency, locale)}</span>
                <small>{labels.perYear}</small>
              </p>
              <p className={styles.priceNote}>
                {labels.monthlyEquivalent.replace("{amount}", formatPrice(monthlyEquivalent(plan), plan.currency, locale))}
              </p>
            </div>

            {includes && <p className={styles.includes}>{labels.everythingIn.replace("{plan}", includes)}</p>}
            <ul role="list" className={cx(styles.features, includes && styles.featuresAfterIncludes)}>
              {plan.version.highlights.map((highlight) => (
                <li key={highlight.label}>
                  <Check className={styles.check} size={16} strokeWidth={2.25} aria-hidden="true" />
                  <span>{highlight.label}</span>
                </li>
              ))}
            </ul>

            <div className={styles.limits}>
              <p className={styles.limitsTitle}>{labels.keyLimits}</p>
              <dl className={styles.limitsList}>
                {plan.version.limits.map((limit) => (
                  <div key={limit.key} className={styles.limitRow}>
                    <dt>{limit.label}</dt>
                    <dd className="ltr-number">{formatLimit(limit, labels.perMonth)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {current ? (
              <Button variant="secondary" fullWidth disabled aria-disabled="true">
                {labels.currentPlanCta}
              </Button>
            ) : (
              <Button href={ctaHref(plan)} variant={highlighted ? "primary" : "secondary"} fullWidth data-plan-cta={plan.code}>
                {labels.requestPlan}
                <span className="visually-hidden">: {plan.name}</span>
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
